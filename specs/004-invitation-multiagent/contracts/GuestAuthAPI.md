# Contract: Guest Authentication API

Feature: `004-invitation-multiagent` — Phase 1 output  
Branch: `004-invitation-multiagent`  
Base URL: `/api/v1/auth/guest`

---

## Overview

Guest authentication is a two-step system:
1. **Login** — submit email + 7-digit code → receive a short-lived guest JWT
2. **Protected access** — include guest JWT as Bearer token on guest-scoped routes

Guest JWTs are non-refreshable and expire in 24 hours. Each login creates a new guest session and increments the invitation's `loginCount`.

---

## Endpoints

### POST `/api/v1/auth/guest/login`
Exchange an email + invitation code for a guest session JWT.

**Auth**: None (public endpoint)

**Request body**:
```json
{
  "email": "alice@example.com",
  "code": "4391827"
}
```

**Validation**:
- `email` — required, RFC 5321 format, lowercase-normalised
- `code` — required, exactly 7 numeric digits (zero-padded if needed)

**Success response** `200 OK`:
```json
{
  "token": "<JWT>",
  "expiresAt": "2025-01-16T10:00:00Z",
  "loginAttemptNumber": 3,
  "scope": ["view", "process", "export"]
}
```

**Token payload** (decoded for documentation only — not sent in body):
```json
{
  "role": "guest",
  "invitationId": "f8c3d2a1-...",
  "loginAttemptNumber": 3,
  "scope": ["view", "process", "export"],
  "sub": "alice@example.com",
  "iat": 1720000000,
  "exp": 1720086400
}
```

**Processing sequence (server-side)**:
1. Normalise email to lowercase
2. Check Redis rate-limit counter `ratelimit:login:<email>` — if ≥5: return `429`
3. Look up active invitation: `WHERE recipientEmail = ? AND status = 'active' AND expiresAt > NOW()`
4. Verify `bcrypt.compare(code.padStart(7,'0'), invitation.codeHash)`
5. If invalid: `INCR` rate-limit counter (set `EXPIRE` on first); if counter ≥5 set `lockoutUntil`; return `401`
6. If valid: `DEL` rate-limit counter; atomically `UPDATE invitation SET loginCount = loginCount + 1 WHERE id = ?`
7. If `loginCount` after update = 10: `UPDATE invitation SET status = 'converted'`
8. Insert `GuestSession`; sign and return JWT

**Error responses**:
| Status | Code | Description |
|---|---|---|
| `400` | `INVALID_REQUEST` | Missing or malformed fields |
| `401` | `INVALID_CREDENTIALS` | Email/code combination invalid |
| `401` | `INVITATION_EXPIRED` | Invitation exists but has expired or been revoked |
| `401` | `INVITATION_CONVERTED` | Invitation used 10× — must create an account |
| `429` | `RATE_LIMITED` | 5 failed attempts — `lockoutUntil` in response |

**`429` response body**:
```json
{
  "code": "RATE_LIMITED",
  "lockoutUntil": "2025-01-15T10:15:00Z",
  "message": "Too many failed attempts. Try again after lockoutUntil."
}
```

---

### GET `/api/v1/auth/guest/me`
Return the current guest session info (for the client to display scope/expiry).

**Auth**: Guest JWT required

**Success response** `200 OK`:
```json
{
  "email": "alice@example.com",
  "loginAttemptNumber": 3,
  "expiresAt": "2025-01-16T10:00:00Z",
  "scope": ["view", "process", "export"]
}
```

**Error responses**:
| Status | Code | Condition |
|---|---|---|
| `401` | `UNAUTHORIZED` | Missing or invalid token |
| `401` | `SESSION_REVOKED` | Parent invitation has been revoked |

---

## Revocation Check Middleware

On every guest-JWT-protected route, the server MUST verify:
```
SELECT status FROM invitations WHERE id = <invitationId from JWT claim>
→ if status IN ('revoked', 'expired') → return 401 SESSION_REVOKED
```

This check is required because JWTs are stateless — revocation is not reflected in the token itself.
