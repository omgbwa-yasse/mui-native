# Tasks: Email Invitation Access & Multi-Agent AI Processing

**Input**: Design documents from `/specs/004-invitation-multiagent/`
**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅ · quickstart.md ✅

**Stack**: TypeScript 5.x strict — React Native 0.73 frontend + Node.js 20 LTS backend  
**Storage**: PostgreSQL (entities) + Redis (rate limiting)  
**Total tasks**: 61 across 6 phases

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[US1/US2/US3]**: User story this task belongs to
- No test tasks — tests not requested in specification. Components in `src/components/` are application-specific (feature-scoped); constitution DoD step 2 (unit tests) is formally waived for this feature.

---

## Phase 1: Setup

**Purpose**: Project structure and tooling initialization for both frontend and backend.

- [x] T001 Create project directory structure for api/ (modules/invitation, modules/auth, modules/subscription, modules/agent, middleware/, shared/, db/migrations/, tests/) per plan.md
- [x] T002 Initialize backend API in api/ with Node.js 20 LTS, TypeScript 5.x strict, Express 4 (or NestJS 10), jsonwebtoken, bcrypt, nodemailer, ioredis
- [x] T003 [P] Configure api/tsconfig.json with strict: true, target: ES2022, module: NodeNext
- [x] T004 [P] Configure ESLint + Prettier for api/ and src/ directories (extend existing repo config where available)
- [x] T005 [P] Set up typed environment variable schema in api/src/config/env.ts (DATABASE_URL, REDIS_URL, JWT_SECRET, JWT_GUEST_EXPIRY, EMAIL_FROM, AI_PROVIDER_API_KEY)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure MUST be complete before any user story work begins. All three user stories depend on this phase.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T006 Create PostgreSQL migrations for all 7 entities (Invitation, GuestSession, LoginAttemptLog, Subscription, AgentSession, WorkerAgent, HumanizationReport) with indexes per data-model.md in api/src/db/migrations/
- [x] T007 [P] Set up PostgreSQL connection pool (pg / typeorm) with env-driven config in api/src/db/index.ts
- [x] T008 [P] Implement Redis client singleton (ioredis) with env-driven config and graceful shutdown in api/src/shared/redis.ts
- [x] T009 Implement crypto helpers: `generateInvitationCode()` using crypto.randomInt(1_000_000, 9_999_999), `hashCode(code)`, `verifyCode(code, hash)` using bcrypt cost=12 in api/src/shared/crypto.ts (depends on T002)
- [x] T010 [P] Implement email service abstraction with `sendInvitationEmail(to, code)` and `send(to, subject, body)` in api/src/shared/email.ts
- [x] T011 [P] Implement JWT utilities: `signUserToken(userId)`, `signGuestToken(invitationId, loginAttemptNumber, scope: string[])`, `verifyToken(token)` in api/src/shared/jwt.ts
- [x] T012 Implement Redis-backed rate limiter middleware using atomic INCR+EXPIRE per `ratelimit:login:<email>` key — lockout after 5 failures within 900s in api/src/middleware/rateLimiter.ts (depends on T008)
- [x] T013 [P] Implement user auth guard middleware (verify user JWT, attach userId to request) in api/src/middleware/authGuard.ts
- [x] T014 Implement guest JWT revocation check middleware — on every guest route, query Invitation.status for the invitationId claim; reject if revoked/expired in api/src/middleware/guestRevocationGuard.ts (depends on T011, T007)
- [x] T015 [P] Implement Flesch–Kincaid readability scorer with `scoreText(text)` → `{ score, label }` and `syllableCount(word)` heuristic in api/src/shared/readability.ts

**Checkpoint**: Foundation ready — all user stories can now proceed independently.

---

## Phase 3: User Story 1 — Email Invitation & Guest Access (Priority: P1) 🎯 MVP

**Goal**: Registered user sends a 7-digit code to an invitee by email. Invitee logs in with email + code (no account) for up to 10 sessions; 11th attempt redirects to account creation. Rate-limited to 5 failures / 15-min lockout. Codes expire after 30 days.

**Independent Test**: Send invitation to a test email, receive code, perform 10 successful logins, verify 11th is blocked with account-creation redirect. Verify 5 wrong codes trigger 429 lockout. Verify login with mismatched email fails generically.

### Backend

- [x] T016 [P] [US1] Implement Invitation repository with `create(inviterId, recipientEmail)`, `findActiveByEmail(email)` (lazily checks `expiry_date < NOW()` and transitions status→expired on first read — covers FR-008 without a scheduled sweep), `findById(id)`, `incrementLoginCount(id)`, `setStatus(id, status)` in api/src/modules/invitation/invitation.repository.ts
- [x] T017 [P] [US1] Implement GuestSession repository with `create(invitationId, loginAttemptNumber, sessionToken)`, `revokeByInvitationId(invitationId)` in api/src/modules/auth/guestSession.repository.ts
- [x] T018 [US1] Implement InvitationService: `sendInvitation(inviterId, recipientEmail)` — generate code via crypto.ts, hash, persist, send email; `getByInviter(inviterId, filters)` — paginated list; `revoke(inviterId, invitationId)` — ownership check then status=revoked in api/src/modules/invitation/invitation.service.ts (depends on T016, T009, T010)
- [x] T019 [US1] Implement GuestAuthService: `login(email, code)` — rate-limit check, bcrypt verify, atomically increment loginCount (enforce ≤10 using `SELECT ... FOR UPDATE` on the Invitation row to prevent concurrent 10th-use race), issue guest JWT with scope from invitation, create GuestSession; `getSession(token)` — decode and check revocation in api/src/modules/auth/guestAuth.service.ts (depends on T017, T011, T012, T018)
- [x] T020 [US1] Implement POST /api/v1/invitations controller — validate body (recipientEmail), call InvitationService.sendInvitation, return 201 with code (one-time) in api/src/modules/invitation/invitation.controller.ts (depends on T018, T013)
- [x] T021 [US1] Implement POST /api/v1/auth/guest/login controller — call GuestAuthService.login, return JWT + loginAttemptNumber + scope + expiresAt; surface RATE_LIMITED 429, INVITATION_CONVERTED 401, generic INVALID_CREDENTIALS 401 in api/src/modules/auth/guestAuth.controller.ts (depends on T019)
- [x] T022 [US1] Implement GET /api/v1/auth/guest/me controller — apply guestRevocationGuard; return email, loginAttemptNumber, scope, expiresAt from JWT claims in api/src/modules/auth/guestAuth.controller.ts (depends on T014, T021)
- [x] T060 [US1] Implement guest scope-enforcement middleware: read `scope` array from decoded guest JWT; return 403 SCOPE_INSUFFICIENT when guest requests project-create, document-upload, or invitation-send routes; register middleware on those route groups (FR-011b) in api/src/middleware/guestScopeGuard.ts (depends on T011, T014)

### Frontend

- [x] T023 [P] [US1] Implement CodeInput component: 7-segment TextInput row, numeric keyboard, auto-advance on fill, accessibilityLabel per cell, 48dp minHeight, useTheme() colors — no hardcoded hex; include `// RN-DEVIATION: No MD3 equivalent for segmented numeric OTP input; follows MD3 TextField interaction pattern` at top of file (constitution Principle I) in src/components/CodeInput/CodeInput.tsx
- [x] T024 [P] [US1] Implement InvitationStatusBadge component: badge with active/expired/revoked/converted labels via useTheme() colorScheme tokens, accessibilityLabel in src/components/InvitationStatusBadge/InvitationStatusBadge.tsx
- [x] T025 [P] [US1] Implement guestAuthService: `login(email, code)` → POST /auth/guest/login, `getMe(token)` → GET /auth/guest/me, store/clear token via SecureStore in src/services/guestAuthService.ts
- [x] T026 [P] [US1] Implement invitationService: `send(recipientEmail)` → POST /invitations (attaches user token), `list(filters)` → GET /invitations in src/services/invitationService.ts
- [x] T027 [US1] Implement useGuestSession hook: read/write guest JWT from SecureStore, return `{ token, session, login, logout, isGuest }` in src/hooks/useGuestSession.ts (depends on T025)
- [x] T028 [US1] Implement GuestLoginScreen: email + CodeInput fields, submit calls useGuestSession.login, shows generic error on 401, shows lockout countdown on 429, on INVITATION_CONVERTED navigates to AccountCreation; all colors via useTheme() in src/screens/GuestLoginScreen/GuestLoginScreen.tsx (depends on T023, T027)
- [x] T029 [US1] Implement InviteScreen: email input field, send button, success confirmation with code display (prominently shown once), error handling; all colors via useTheme() in src/screens/InviteScreen/InviteScreen.tsx (depends on T026)

**Checkpoint**: US1 fully functional — invitation send, guest login (up to 10×), lockout, expiry, conversion redirect all working end-to-end.

---

## Phase 4: User Story 2 — Multi-Agent AI Document Processing (Priority: P2)

**Goal**: Monthly-subscription users activate multi-agent mode; supervisor spawns 1–6 workers per word-count band; real-time per-worker progress via SSE; supervisor synthesizes final document; humanization report with Flesch–Kincaid scores and transformation list displayed.

**Independent Test**: Upload 2,000-word document with active subscription → verify 2–3 workers spawned; SSE updates arrive ≤5 s; final document contains all sections; humanization report shows FK before/after, transformation types, aiRiskReductionPercent. Verify non-subscriber sees locked toggle with upgrade prompt.

### Backend

- [x] T030 [P] [US2] Implement subscription read service: `getSubscription(userId)` → query Subscription table, return `{ status, billingEnd, multiAgentEnabled }`; `isEligibleForMultiAgent(userId)` → status=active AND billingEnd>now() AND multiAgentEnabled=true in api/src/modules/subscription/subscription.service.ts
- [x] T031 [US2] Implement subscription guard middleware: call SubscriptionService.isEligibleForMultiAgent on req.userId; return 403 SUBSCRIPTION_REQUIRED if false in api/src/middleware/subscriptionGuard.ts (depends on T030, T013)
- [x] T032 [P] [US2] Define AgentOrchestrator interface: `analyze(doc)` → SectionPlan, `runWorker(section, onProgress)` → WorkerOutput, `synthesize(outputs)` → SynthesizedDocument, `humanize(original, synthesized)` → HumanizationReport in api/src/modules/agent/orchestrator.interface.ts
- [x] T033 [P] [US2] Implement section boundary detector: heading-first pass (regex ^#{1,3}), word-count chunking fallback with sentence-boundary snap, min 50 words per section in api/src/modules/agent/sectionDetector.ts
- [x] T034 [P] [US2] Implement `agentCountFromWordCount(wordCount: number, complexityBoost?: boolean): number` using the FR-015 word-count band table — default to lower bound of each range band (≤500→1, 501-2000→2, 2001-5000→4, >5000→6); if complexityBoost=true, return upper bound (501-2000→3, 2001-5000→5) in api/src/modules/agent/agentCount.ts
- [x] T035 [P] [US2] Implement AgentSession repository: `create(userId, documentSnapshot, wordCount, workerCount)`, `updateStatus(id, status)`, `setComplete(id, synthesizedDocument)`, `getById(id)` in api/src/modules/agent/agentSession.repository.ts
- [x] T036 [P] [US2] Implement WorkerAgent repository: `createBulk(agentSessionId, sections)`, `updateProgress(id, progressPercent, partialOutput)`, `setComplete(id, finalOutput)`, `setFailed(id, error)`, `getBySession(agentSessionId)` in api/src/modules/agent/workerAgent.repository.ts
- [x] T037 [US2] Implement SSE progress emitter: per-session event emitter, `emit(sessionId, event, data)`, `subscribe(sessionId, res)` (attach SSE headers, heartbeat keepalive), `unsubscribe(sessionId, res)` in api/src/modules/agent/progressEmitter.ts (depends on T035, T036)
- [x] T038 [US2] Implement AgentOrchestratorImpl (default implementation of AgentOrchestrator interface): runs analyze→workers via Promise.allSettled with onProgress callbacks wired to progressEmitter, retry on worker failure (max 1 retry per section per FR-020), synthesize, humanize with readability.ts in api/src/modules/agent/orchestratorImpl.ts (depends on T032, T033, T034, T037, T015)
- [x] T061 [US2] Configure AI provider concurrency limits and timeouts in orchestratorImpl.ts: max 6 concurrent AI requests per session, 30s per-worker timeout, overall session hard cap of 3 min (SC-004 benchmark for 10k-word 6-worker run); circuit-breaker triggers FR-020 worker retry on per-worker timeout in api/src/modules/agent/orchestratorImpl.ts (depends on T038)
- [x] T039 [US2] Implement POST /api/v1/agent/sessions: apply subscriptionGuard + authGuard; validate document; insert AgentSession + WorkerAgent rows; enqueue async orchestration via BullMQ queue backed by existing Redis instance (durable, crash-safe); return 202 with sessionId + progressStreamUrl in api/src/modules/agent/agent.controller.ts (depends on T061, T031, T035, T036)
- [x] T040 [US2] Implement GET /api/v1/agent/sessions/:id/progress SSE endpoint: set text/event-stream headers, retry:3000, subscribe to progressEmitter; emit stored progress on connect (catch-up); unsubscribe on client disconnect in api/src/modules/agent/agent.controller.ts (depends on T037, T039)
- [x] T041 [US2] Implement GET /api/v1/agent/sessions/:id endpoint: return session status + workers array (sectionIndex, status, progressPercent) in api/src/modules/agent/agent.controller.ts (depends on T039, T035, T036)
- [x] T042 [US2] Implement HumanizationReport generation (insert report row after synthesis) and GET /api/v1/agent/sessions/:id/report endpoint: return full report with fleschKincaidBefore/After, aiRiskReductionPercent, transformationsApplied, highlightedSections per contracts/MultiAgentAPI.md in api/src/modules/agent/agent.controller.ts (depends on T039, T038, T015, T035)

### Frontend

- [x] T043 [P] [US2] Implement useSubscription hook: fetch GET /subscriptions/me, return `{ isActive, multiAgentEnabled, billingEnd }`, cache in React state with 60s TTL (timestamp-based); re-fetch on screen focus via `useFocusEffect` in src/hooks/useSubscription.ts
- [x] T044 [P] [US2] Implement agentService: `submitDocument(document)` → POST /agent/sessions, `subscribeToProgress(sessionId, handlers)` → EventSource SSE with worker-progress/supervisor-status/session-complete/session-failed handlers + auto-reconnect, `getSession(sessionId)` → GET, `getReport(sessionId)` → GET in src/services/agentService.ts
- [x] T045 [US2] Implement useAgentProgress hook: call agentService.subscribeToProgress, aggregate workers[] state per workerId, return `{ workers, supervisorStatus, isComplete, report }`, cleanup SSE on unmount in src/hooks/useAgentProgress.ts (depends on T044)
- [x] T046 [P] [US2] Implement WorkerAgentRow component: React.memo, Reanimated useAnimatedStyle worklet for progress bar width, accessibilityValue with progress percent, 48dp row height, useTheme() colors in src/components/WorkerAgentRow/WorkerAgentRow.tsx
- [x] T047 [P] [US2] Implement HumanizationScoreBar component: Reanimated before/after bar, numeric FK score labels, reduceMotion guard (static bar fallback), useTheme() colorScheme tokens in src/components/HumanizationScoreBar/HumanizationScoreBar.tsx
- [x] T048 [US2] Implement MultiAgentSettingsScreen: toggle switch; if !multiAgentEnabled show disabled toggle + upgrade CTA (visible per FR-013, not hidden); if enabled show toggle + submit document button; useSubscription hook drives state in src/screens/MultiAgent/MultiAgentSettingsScreen/MultiAgentSettingsScreen.tsx (depends on T043)
- [x] T049 [US2] Implement AgentProgressScreen: renders WorkerAgentRow list per worker from useAgentProgress, supervisor status banner, navigates to HumanizationReportScreen on session-complete event in src/screens/MultiAgent/AgentProgressScreen/AgentProgressScreen.tsx (depends on T045, T046)
- [x] T050 [US2] Implement HumanizationReportScreen: synthesized document text, HumanizationScoreBar (FK before/after), transformation types list, aiRiskReductionPercent, highlighted sections list; React.memo on report view in src/screens/MultiAgent/HumanizationReportScreen/HumanizationReportScreen.tsx (depends on T047, T044)

**Checkpoint**: US2 fully functional — workers spawn, SSE progress flows, final document and humanization report displayed. Subscription gate enforced on session start only.

---

## Phase 5: User Story 3 — Invitation Management for the Inviter (Priority: P3)

**Goal**: Inviters see a dashboard of all sent invitations (email, date, use count X/10, status badge) and can revoke any active invitation with immediate effect.

**Independent Test**: Send 3 invitations, view dashboard — verify all show correct use counts and statuses. Click revoke on one; verify further guest logins with that code return 401. Verify a converted invitation shows "Converted" status and frozen count.

### Backend

- [x] T051 [US3] Implement GET /api/v1/invitations endpoint with pagination (page, pageSize) and status filter in api/src/modules/invitation/invitation.controller.ts (depends on T020, T018, T013)
- [x] T052 [US3] Implement DELETE /api/v1/invitations/:id endpoint — ownership check (inviterId = req.userId), call InvitationService.revoke, return 200 with updated status in api/src/modules/invitation/invitation.controller.ts (depends on T051, T018, T013)

### Frontend

- [x] T053 [US3] Implement InvitationListScreen: FlatList of invitation rows (recipientEmail, date sent, loginCount/10, InvitationStatusBadge), pull-to-refresh, revoke button on active rows with confirmation dialog, uses invitationService.list and invitationService API in src/screens/InvitationListScreen/InvitationListScreen.tsx (depends on T024, T026)

**Checkpoint**: All three user stories independently functional. US3 dashboard live-reflects US1 invitation state.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Navigation wiring, constitution compliance, mock tooling, cross-platform review.

- [x] T054 [P] Wire React Navigation routes for all 6 new screens (InviteScreen, GuestLoginScreen, InvitationListScreen, MultiAgentSettingsScreen, AgentProgressScreen, HumanizationReportScreen) in src/navigation/AppNavigator.tsx
- [x] T055 [P] Run constitution token audit — `grep -r '#[0-9A-Fa-f]' src/screens src/components` must return zero hits in any new file (Principle II)
- [x] T056 [P] Accessibility audit — verify accessibilityLabel/accessibilityRole and ≥48dp touch targets on: CodeInput digits, InviteScreen email input + send button, GuestLoginScreen submit button, InvitationListScreen revoke button, MultiAgentSettingsScreen toggle switch, WorkerAgentRow status, HumanizationScoreBar (Principle V)
- [x] T057 [P] Performance audit — confirm WorkerAgentRow and HumanizationReportScreen top-level view use React.memo; confirm HumanizationScoreBar and WorkerAgentRow progress animations use useAnimatedStyle worklet (no JS-thread animations) (Principle VI)
- [x] T058 [P] Implement mock AI orchestrator returning canned responses (incremental progress, deterministic FK scores FK=52.4→71.2) in api/src/modules/agent/orchestratorMock.ts for local development per quickstart.md
- [x] T059 Cross-platform visual review: run all 6 new screens (InviteScreen, GuestLoginScreen, InvitationListScreen, MultiAgentSettingsScreen, AgentProgressScreen, HumanizationReportScreen) on iOS simulator and Android emulator; confirm layout parity on each (Principle IV)

---

## Dependencies & Execution Order

### Phase Dependencies

| Phase | Depends on | May begin |
|---|---|---|
| Phase 1 (Setup) | None | Immediately |
| Phase 2 (Foundational) | Phase 1 complete | After T001–T005 |
| Phase 3 (US1) | Phase 2 complete | After T006–T015 |
| Phase 4 (US2) | Phase 2 complete | After T006–T015 (parallel with US1 if staffed) |
| Phase 5 (US3) | Phase 2 complete, US1 backend done (T018) | After T018–T022 |
| Phase 6 (Polish) | All desired stories complete | After chosen story phases |

### User Story Dependencies

- **US1 (P1)** — no dependency on US2 or US3; fully independent after Phase 2
- **US2 (P2)** — no dependency on US1 or US3; fully independent after Phase 2
- **US3 (P3)** — shares InvitationService (T018) with US1 backend; InvitationListScreen reuses InvitationStatusBadge (T024) and invitationService (T026) from US1 frontend

### Parallel Opportunities per Story

**Phase 1**: T003, T004, T005 can all run in parallel with T002.

**Phase 2**: T007, T008, T010, T011, T015 can all run in parallel. T009 (depends T002), T012 (depends T008), T013, T014 (depends T011) start after their dependencies.

**US1 backend**: T016 and T017 are parallel. T018 (depends T016 + T009 + T010), T019 (depends T017 + T011 + T012 + T018), T020 (depends T018 + T013), T021 (depends T019), T022 (depends T014 + T021).  
**US1 frontend**: T023, T024, T025, T026 all parallel. T027 (depends T025), T028 (depends T023 + T027), T029 (depends T026) — frontend can run fully in parallel with US1 backend.

**US2 backend**: T030, T032, T033, T034, T035, T036 all parallel. T031 (depends T030 + T013), T037 (depends T035 + T036), T038 (depends T032 + T033 + T034 + T037 + T015), T061 (depends T038), T039 (depends T061 + T031 + T035 + T036), T040 (depends T037 + T039), T041 (depends T039 + T035 + T036), T042 (depends T039 + T038 + T015 + T035).  
**US2 frontend**: T043, T044, T046, T047 all parallel. T045 (depends T044), T048 (depends T043), T049 (depends T045 + T046), T050 (depends T047 + T044).

**Phase 5 (US3)**: T051 → T052 sequential (same controller file; T052 depends T051). T053 frontend runs in parallel with T051/T052.

**Phase 6**: T054 through T058 are all parallel.

---

## Implementation Strategy

### MVP Scope (US1 only — ~30 tasks)

Deliver T001–T022 + T060 (setup + foundation + US1 backend + scope guard) + T023–T029 (US1 frontend) for a shippable invitation flow:
- Invitation send (email + code)
- Guest login (up to 10×, rate-limited, SELECT…FOR UPDATE on concurrent 10th-use)
- Expiry + revocation enforced (lazy status transition on read)
- Guest access scope: view/process/export only (enforced by guestScopeGuard middleware)

### Full v1 Scope (add US2 + US3 — 31 more tasks)

After MVP validation, add:
- US2 (T030–T050 + T061): multi-agent processing with SSE, humanization report, AI concurrency limits
- US3 (T051–T053): invitation management dashboard
- Polish (T054–T059): navigation, constitution compliance, cross-platform review
