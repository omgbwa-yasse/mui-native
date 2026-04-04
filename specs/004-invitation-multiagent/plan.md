# Implementation Plan: Email Invitation Access & Multi-Agent AI Processing

**Branch**: `004-invitation-multiagent` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-invitation-multiagent/spec.md`

## Summary

Two independent feature slices delivered against the same codebase:

1. **Invitation Guest Access** (P1): A registered user sends a 7-digit code to an invitee by email. The invitee logs in with email + code (no account needed) for up to 10 sessions, after which account creation is enforced. Rate-limited to 5 failed attempts / 15-min lockout. Codes expire after 30 days. Inviters can revoke codes.

2. **Multi-Agent AI Document Processing** (P2, monthly subscription only): A supervisor agent analyzes a document (word count + complexity), spawns 1–6 worker agents on distinct sections, aggregates their real-time progress, synthesizes a final document, and produces a structured humanization report (Flesch–Kincaid scores, transformation types, AI-detection risk reduction).

Technical approach: React Native (TypeScript 5.x strict) frontend with MD3 components from this library; Node.js / TypeScript backend API; Server-Sent Events for live agent progress; Redis-backed rate limiting; short-lived JWT guest sessions; AI orchestration via pluggable Supervisor/Worker interface.

---

## Technical Context

**Language/Version**: TypeScript 5.x strict — frontend (React Native 0.73) + backend (Node.js 20 LTS)
**Primary Dependencies**:
- Frontend: `react-native` 0.73, `react-native-reanimated` 3.x, `react-native-gesture-handler` 2.x, `@react-navigation/native`, existing mui-native component library (this repo)
- Backend: Node.js 20, Express 4 (or NestJS 10), `jsonwebtoken`, `bcrypt`, `nodemailer` (or existing email service), `ioredis` (rate limiting), `eventsource` / native SSE
**Storage**: PostgreSQL (relational — invitations, guest sessions, subscriptions, agent sessions); Redis (rate-limit counters + TTLs)
**Testing**: Jest 29 + `@testing-library/react-native` (frontend); Jest + Supertest (backend)
**Target Platform**: iOS 15+ and Android 10+ (React Native mobile); Node.js server (Linux)
**Project Type**: Mobile app (consumer) + REST/SSE API backend
**Performance Goals**: Invitation email delivered ≤2 min (SC-001); guest login flow ≤60 s (SC-002); agent progress updates ≤5 s latency (SC-006); humanization report ready ≤10 s post-synthesis (SC-008)
**Constraints**: 7-digit code must use cryptographically random generation (`crypto.randomInt`); codes stored hashed in DB; guest JWT expires in 24 h; agent count hard-capped at 6; backend concurrent AI calls bounded to prevent runaway spend
**Scale/Scope**: ~10k active users, dozens of concurrent agent sessions, 50+ screens

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Component Fidelity** — Feature adds application screens (not new generic components); all UI uses MD3 components from this library. No deviations expected; any custom screen element will be documented with `// RN-DEVIATION:` if it departs from MD3.
- [x] **II. Design Token Supremacy** — All screen colors via `useTheme()` → `theme.colorScheme.*`; no hardcoded hex or RGB literals in screen files.
- [x] **III. Theme-First Architecture** — All new screens wrapped in existing `ThemeProvider`; zero static palette imports in render paths.
- [x] **IV. Cross-Platform Parity** — Invitation form, guest login, agent progress view, and humanization report tested on both iOS and Android.
- [x] **V. Accessibility by Default** — `accessibilityLabel` on 7-digit input fields and code inputs; progress views expose `accessibilityValue`; all touch targets ≥48 dp; `reduceMotion` collapses progress animations to static bars.
- [x] **VI. Performance Contract** — Real-time agent progress bar uses `useAnimatedStyle` worklet; `React.memo` on `WorkerAgentRow` and `HumanizationReportScreen`.

**Constitution Check Result: PASS — no gate violations. Proceeding to Phase 0.**

---

## Project Structure

### Documentation (this feature)

```text
specs/004-invitation-multiagent/
├── plan.md           ← this file
├── research.md       ← Phase 0 output
├── data-model.md     ← Phase 1 output
├── quickstart.md     ← Phase 1 output
├── contracts/        ← Phase 1 output
│   ├── InvitationAPI.md
│   ├── GuestAuthAPI.md
│   └── MultiAgentAPI.md
└── tasks.md          ← Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code Layout

```text
# Frontend (React Native)
src/
├── screens/
│   ├── InviteScreen/          # US1 — send invitation
│   ├── GuestLoginScreen/      # US1 — enter email + 7-digit code
│   ├── InvitationListScreen/  # US3 — inviter dashboard
│   └── MultiAgent/
│       ├── MultiAgentSettingsScreen/   # US2 — toggle + subscription gate
│       ├── AgentProgressScreen/        # US2 — live worker progress
│       └── HumanizationReportScreen/   # US2 — final document + report
├── services/
│   ├── invitationService.ts   # API calls for invitation CRUD
│   ├── guestAuthService.ts    # guest login, token storage
│   └── agentService.ts        # submit doc, SSE subscription, result fetch
├── hooks/
│   ├── useGuestSession.ts     # read/write guest JWT
│   ├── useAgentProgress.ts    # SSE event → state
│   └── useSubscription.ts     # read subscription status
└── components/
    ├── CodeInput/             # 7-digit segmented input field
    ├── InvitationStatusBadge/ # active/expired/revoked/converted
    ├── WorkerAgentRow/        # per-agent progress row (memo)
    └── HumanizationScoreBar/  # before/after readability bar (Reanimated)

# Backend (Node.js / TypeScript)
api/
├── src/
│   ├── modules/
│   │   ├── invitation/        # invite CRUD, code gen, email dispatch
│   │   ├── auth/              # guest session JWT, lockout middleware
│   │   ├── subscription/      # read-only subscription status checks
│   │   └── agent/             # supervisor orchestration, SSE emitter
│   ├── middleware/
│   │   ├── rateLimiter.ts     # Redis-backed, per-email lockout
│   │   └── subscriptionGuard.ts
│   └── shared/
│       ├── email.ts           # email service abstraction
│       └── crypto.ts          # code generation, hashing
└── tests/
    ├── unit/
    └── integration/
```

**Structure Decision**: Mobile + API (Option 3). The feature requires a persistent backend for invitation state, rate limiting, and async AI orchestration — these cannot live in the stateless React Native client.

---

## Complexity Tracking

No constitution violations requiring justification.

| Decision | Rationale |
|---|---|
| SSE (not WebSocket) | Unidirectional server→client progress stream; SSE auto-reconnects, no binary overhead, simpler than WS for this case |
| Redis for rate limiting | Atomic `INCR`+`EXPIRE` pattern; in-memory counters with automatic TTL; no race condition on distributed nodes |
| Hashed invitation codes | Prevents DB theft exposing live codes; `bcrypt`/`argon2` on 7-digit code before storage |
| Supervisor/Worker interface | Decouples AI provider from orchestration logic; pluggable for LangChain, AutoGen, or custom LLM calls |
