# Contract: Invitation System API

Feature: `004-invitation-multiagent` — Phase 1 output  
Branch: `004-invitation-multiagent`  
Base URL: `/api/v1/invitations`

---

## Authentication

All endpoints require a valid **user** Bearer JWT (`Authorization: Bearer <userToken>`) except where noted.  
Guest-scoped endpoints use a **guest** Bearer JWT issued by the auth service (see `GuestAuthAPI.md`).

---

## Endpoints

### POST `/api/v1/invitations`
Send an invitation to a recipient by email.

**Auth**: User JWT required

**Request body**:
```json
{
  "recipientEmail": "alice@example.com"
}
```

**Validation**:
- `recipientEmail` — required, RFC 5321 format, max 255 chars
- `recipientEmail` must not be the authenticated user's own email

**Success response** `201 Created`:
```json
{
  "id": "f8c3d2a1-...",
  "recipientEmail": "alice@example.com",
  "code": "4391827",
  "status": "active",
  "loginCount": 0,
  "createdAt": "2025-01-15T10:00:00Z",
  "expiresAt": "2025-02-14T10:00:00Z"
}
```

**Note**: `code` is returned ONCE here (in plaintext) for display to the inviter. Not stored in plaintext; not returned on any other endpoint.

**Error responses**:
| Status | Code | Condition |
|---|---|---|
| `400` | `INVALID_EMAIL` | Email format invalid |
| `409` | `ALREADY_INVITED` | Active invitation already exists for this recipient from this inviter |

---

### GET `/api/v1/invitations`
List all invitations sent by the authenticated user.

**Auth**: User JWT required

**Query parameters**:
| Param | Type | Default | Notes |
|---|---|---|---|
| `status` | `active\|expired\|revoked\|converted` | (all) | Filter by status |
| `page` | `integer` | `1` | 1-based pagination |
| `pageSize` | `integer` | `20` | Max 100 |

**Success response** `200 OK`:
```json
{
  "items": [
    {
      "id": "f8c3d2a1-...",
      "recipientEmail": "alice@example.com",
      "status": "active",
      "loginCount": 3,
      "createdAt": "2025-01-15T10:00:00Z",
      "expiresAt": "2025-02-14T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "pageSize": 20
}
```

**Note**: `code` is never returned by this endpoint (only on create).

---

### DELETE `/api/v1/invitations/:id`
Revoke an invitation.

**Auth**: User JWT required; user must be the `inviterId` of the invitation.

**Path param**: `id` — invitation UUID

**Business rule**: Revoking an invitation immediately invalidates all active `GuestSession` tokens for that invitation (checked on protected routes via `invitationId` claim in JWT).

**Success response** `200 OK`:
```json
{
  "id": "f8c3d2a1-...",
  "status": "revoked",
  "revokedAt": "2025-01-20T08:00:00Z"
}
```

**Error responses**:
| Status | Code | Condition |
|---|---|---|
| `403` | `FORBIDDEN` | Authenticated user is not the inviter |
| `404` | `NOT_FOUND` | Invitation does not exist |
| `409` | `ALREADY_TERMINAL` | Invitation already revoked/expired/converted |
