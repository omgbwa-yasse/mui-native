# Contract: Multi-Agent Orchestration API

Feature: `004-invitation-multiagent` — Phase 1 output  
Branch: `004-invitation-multiagent`  
Base URL: `/api/v1/agent`

---

## Authentication

All endpoints require a valid **user** Bearer JWT. Guests do not have access to multi-agent features (scope check: `view` + `process` + `export` only — no `agent` scope in guest sessions).

A subscription check is also performed on session start: `status = 'active' AND billingEnd > now() AND multiAgentEnabled = true`.

---

## Endpoints

### POST `/api/v1/agent/sessions`
Submit a document for multi-agent processing. Starts analysis immediately.

**Auth**: User JWT required + active subscription check

**Request body**:
```json
{
  "document": "<full document text, up to 50,000 characters>"
}
```

**Validation**:
- `document` — required, non-empty, max 50,000 characters (~10,000 words)

**Processing (server-side)**:
1. Subscription guard (FR guard middleware)
2. Calculate `wordCount`
3. Determine `workerCount` from word-count band (R-006)
4. Insert `AgentSession` (status=`analyzing`)
5. Insert `workerCount` × `WorkerAgent` rows (status=`pending`)
6. Enqueue async orchestration job (returns immediately)
7. Return session summary

**Success response** `202 Accepted`:
```json
{
  "sessionId": "a1b2c3d4-...",
  "wordCount": 2845,
  "workerCount": 4,
  "status": "analyzing",
  "startedAt": "2025-01-15T10:00:00Z",
  "progressStreamUrl": "/api/v1/agent/sessions/a1b2c3d4-.../progress"
}
```

**Error responses**:
| Status | Code | Condition |
|---|---|---|
| `400` | `DOCUMENT_EMPTY` | Document is blank |
| `400` | `DOCUMENT_TOO_LONG` | Exceeds 50,000 characters |
| `403` | `SUBSCRIPTION_REQUIRED` | No active subscription or multiAgentEnabled=false |

---

### GET `/api/v1/agent/sessions/:sessionId/progress`
Subscribe to real-time progress updates via Server-Sent Events.

**Auth**: User JWT required

**Response**: `Content-Type: text/event-stream`

**Reconnection**: Client should set `Retry` field; server sends `retry: 3000` on connect.

**Event types**:

#### `worker-progress`
Emitted when a worker agent reports an update.
```
id: a1b2c3d4-w0-42
event: worker-progress
data: {"workerId":"w0-uuid","sectionIndex":0,"progressPercent":42,"status":"running","partialOutput":"The primary concern..."}
```

#### `supervisor-status`
Emitted when the supervisor changes overall session status.
```
event: supervisor-status
data: {"sessionId":"a1b2c3d4-...","status":"synthesizing","workersComplete":3,"workersTotal":4}
```

#### `session-complete`
Final event; client should close the SSE connection after receiving this.
```
event: session-complete
data: {"sessionId":"a1b2c3d4-...","reportId":"r9z8y7x6-...","synthesizedDocument":"...full text..."}
```

#### `session-failed`
Emitted if the session fails unrecoverably.
```
event: session-failed
data: {"sessionId":"a1b2c3d4-...","errorCode":"WORKER_TIMEOUT","message":"One or more workers did not complete within the time limit."}
```

**Error responses (for invalid sessions)**:
| Status | Code | Condition |
|---|---|---|
| `403` | `FORBIDDEN` | Session belongs to a different user |
| `404` | `NOT_FOUND` | Session does not exist |
| `410` | `GONE` | Session is already complete (use GET result endpoint instead) |

---

### GET `/api/v1/agent/sessions/:sessionId`
Get the current state of an agent session (polling alternative to SSE).

**Auth**: User JWT required

**Success response** `200 OK`:
```json
{
  "sessionId": "a1b2c3d4-...",
  "wordCount": 2845,
  "workerCount": 4,
  "status": "processing",
  "startedAt": "2025-01-15T10:00:00Z",
  "completedAt": null,
  "workers": [
    {
      "workerId": "w0-uuid",
      "sectionIndex": 0,
      "status": "complete",
      "progressPercent": 100
    },
    {
      "workerId": "w1-uuid",
      "sectionIndex": 1,
      "status": "running",
      "progressPercent": 67
    }
  ]
}
```

---

### GET `/api/v1/agent/sessions/:sessionId/report`
Retrieve the humanization report for a completed session.

**Auth**: User JWT required

**Business rule**: Only available when `AgentSession.status = 'complete'`.

**Success response** `200 OK`:
```json
{
  "reportId": "r9z8y7x6-...",
  "sessionId": "a1b2c3d4-...",
  "synthesizedDocument": "<full synthesized text>",
  "fleschKincaidBefore": 52.4,
  "fleschKincaidAfter": 71.2,
  "readabilityLabel": "Easy",
  "aiRiskReductionPercent": 34.7,
  "transformationsApplied": [
    { "type": "passive_to_active", "count": 12, "description": "Converted 12 passive constructions" },
    { "type": "lexical_simplification", "count": 8, "description": "Replaced 8 complex words with simpler equivalents" },
    { "type": "sentence_split", "count": 5, "description": "Split 5 long sentences" }
  ],
  "highlightedSections": [
    { "sectionIndex": 0, "changeType": "major", "changeCount": 14 },
    { "sectionIndex": 2, "changeType": "minor", "changeCount": 3 }
  ],
  "generatedAt": "2025-01-15T10:12:34Z"
}
```

**Error responses**:
| Status | Code | Condition |
|---|---|---|
| `403` | `FORBIDDEN` | Session belongs to another user |
| `404` | `NOT_FOUND` | Session not found |
| `409` | `NOT_COMPLETE` | Session is still in progress |

---

## Subscription Guard Contract

Applied as middleware on `POST /agent/sessions` only (not on progress/result reads per SC-005).

```
GET /api/v1/subscriptions/me → { status, billingEnd, multiAgentEnabled }
  if status != 'active' OR billingEnd <= now() OR multiAgentEnabled == false:
    → 403 SUBSCRIPTION_REQUIRED
```

**Lapse mid-session**: The guard is NOT applied to progress stream or result endpoints. Running sessions complete regardless of subscription lapse after start.
