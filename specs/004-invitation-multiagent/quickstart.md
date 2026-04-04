# Quickstart: Feature 004 — Invitation System + Multi-Agent AI Processing

Feature: `004-invitation-multiagent` — Phase 1 output  
Branch: `004-invitation-multiagent`

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 20 LTS |
| npm | 10+ |
| PostgreSQL | 15+ |
| Redis | 7+ |
| React Native CLI | 0.73+ |
| iOS Simulator / Android Emulator | Xcode 15 / Android Studio |

---

## 1. Environment Setup

### 1.1 Install dependencies

```bash
# Monorepo root (React Native / component library)
npm install

# Backend API
cd api
npm install
```

### 1.2 Configure environment variables

```bash
# api/.env (copy from api/.env.example)
DATABASE_URL=postgresql://user:password@localhost:5432/invitation_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_GUEST_EXPIRY=86400       # 24 hours in seconds
EMAIL_SERVICE_URL=           # Your SMTP / SES endpoint
EMAIL_FROM=noreply@yourdomain.com
AI_PROVIDER_API_KEY=         # LLM provider key (e.g., OpenAI, Anthropic)
```

### 1.3 Database setup

```bash
cd api
# Run migrations
npm run db:migrate

# (Optional) Seed test data
npm run db:seed
```

---

## 2. Run the Backend API

```bash
cd api
npm run dev
# Server starts on http://localhost:3000
```

Verify:
```bash
curl http://localhost:3000/api/v1/health
# → { "status": "ok" }
```

---

## 3. Run the React Native App

```bash
# Start Metro bundler
npm start

# iOS
npm run ios

# Android
npm run android
```

---

## 4. Test the Invitation Flow (end-to-end)

### Step 1: Create a test user and get a token

```bash
# Register a test user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "inviter@test.com", "password": "Password123!"}'

# Login to get token
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "inviter@test.com", "password": "Password123!"}'
# → { "token": "<USER_TOKEN>" }
```

### Step 2: Send an invitation

```bash
curl -X POST http://localhost:3000/api/v1/invitations \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"recipientEmail": "guest@test.com"}'
# → { "id": "...", "code": "4391827", "status": "active", ... }
```

Note the `code` value — it is only returned once.

### Step 3: Guest login

```bash
curl -X POST http://localhost:3000/api/v1/auth/guest/login \
  -H "Content-Type: application/json" \
  -d '{"email": "guest@test.com", "code": "4391827"}'
# → { "token": "<GUEST_TOKEN>", "loginAttemptNumber": 1, "scope": [...] }
```

### Step 4: Verify rate limiting

```bash
# Send 5 wrong codes to trigger lockout
for i in 1 2 3 4 5; do
  curl -X POST http://localhost:3000/api/v1/auth/guest/login \
    -H "Content-Type: application/json" \
    -d '{"email": "guest@test.com", "code": "0000000"}'
done
# 5th attempt → 429 { "code": "RATE_LIMITED", "lockoutUntil": "..." }
```

---

## 5. Test Multi-Agent Processing (end-to-end)

### Step 1: Enable subscription for test user

```bash
# Seed subscription directly in DB (dev only)
npm run db:seed:subscription -- --userId=<USER_ID> --multiAgent=true
```

### Step 2: Submit a document

```bash
curl -X POST http://localhost:3000/api/v1/agent/sessions \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"document": "Insert a 500+ word document here..."}'
# → { "sessionId": "a1b2c3d4-...", "workerCount": 2, "progressStreamUrl": "..." }
```

### Step 3: Subscribe to progress via SSE

```bash
curl -N http://localhost:3000/api/v1/agent/sessions/a1b2c3d4-.../progress \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Accept: text/event-stream"
# → streams worker-progress events ... then session-complete
```

### Step 4: Fetch the humanization report

```bash
curl http://localhost:3000/api/v1/agent/sessions/a1b2c3d4-.../report \
  -H "Authorization: Bearer <USER_TOKEN>"
# → { "fleschKincaidBefore": 52.4, "fleschKincaidAfter": 71.2, "aiRiskReductionPercent": 34.7, ... }
```

---

## 6. Run Tests

```bash
# Frontend component tests
npm test

# Backend unit + integration tests
cd api
npm test

# Backend integration tests only (requires running DB + Redis)
cd api
npm run test:integration
```

---

## 7. Useful Dev Scripts

| Script | Description |
|---|---|
| `npm run db:migrate` | Run pending DB migrations |
| `npm run db:rollback` | Roll back last migration |
| `npm run db:seed` | Insert basic test fixture data |
| `npm run db:seed:subscription` | Seed subscription for a given userId |
| `npm run redis:flush` | Flush all Redis keys (clears rate limits) |
| `npm run agent:mock` | Start mock AI orchestrator (returns canned responses for dev) |

---

## 8. Mocking the AI Orchestrator

For development without spending LLM credits, start the mock orchestrator:

```bash
cd api
npm run agent:mock
# Mock AI server starts on http://localhost:3001
# Set AI_PROVIDER_URL=http://localhost:3001 in api/.env
```

The mock:
- Returns `progressPercent` increments of 10% each second
- Returns a canned `synthesizedDocument` with sample transformations
- Produces a deterministic `HumanizationReport` (FK before: 52.4, after: 71.2)
