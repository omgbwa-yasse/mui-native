# Feature Specification: Email Invitation Access & Multi-Agent AI Processing

**Feature Branch**: `004-invitation-multiagent`  
**Created**: 2026-04-03  
**Status**: Clarified — Ready for Planning  
**Input**: User description: "Je veux que tu permet qu'un utilisateur peu inviter un utilisateur, pour acceder, il saisie juste son eamil et con code invitation recu par Email, 7 chiffrre pour se connecter. et il peut gener 10 le code pour se connecter et après il lui ets imposer de créé un compte. Ajoute ausis le monde multi agents dans un projet, Quand cela est activer uniquement pour abinnement par mois. Plusiuers Ianstance IA duscuter sur son texte, un agents créer des instance qui trvail sur des pens et lui font le rapport en continue et il finalise le traitement Présent el rapport de humanisation avec le document finale optenu. Selon la tail du document, sa complexité le'agent superviser peu crée Un ou 6 agents travail ansemble sur des volet differennt du Document, il se chagre de fait la synthèse et intégré dans le documents final."

## Clarifications

### Session 2026-04-03

- Q: Is the 10-use invitation code shared among 10 different people, or 10 logins by the same person? → A: Hybrid — the code is bound to the recipient's email address (only that person can use it) and allows up to 10 logins by that same individual before account creation is enforced.
- Q: How should the system protect against brute-force guessing of 7-digit invitation codes? → A: Lockout after 5 consecutive failed attempts per email address, with a 15-minute cooldown before further attempts are allowed.
- Q: What actions can a guest (invitee without an account) perform on the platform? → A: Guests can view, process, and export documents they are explicitly invited to access; they cannot create new projects, upload new documents from scratch, or send invitations to other users.
- Q: What are the numeric thresholds that determine how many worker agents the supervisor spawns? → A: ≤500 words → 1 agent; 501–2 000 words → 2–3 agents; 2 001–5 000 words → 4–5 agents; >5 000 words → 6 agents (complexity modifier can increase count within the band).
- Q: What does the humanization report contain? → A: Structured report with: (1) list of transformation types applied (e.g., sentence restructuring, synonym substitution, tone softening), (2) Flesch–Kincaid readability score before and after, (3) estimated AI-detection risk reduction percentage, (4) highlighted sections with the most significant changes.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Email Invitation & Guest Access (Priority: P1)

A registered user invites a non-member by email. The invitee receives a 7-digit numeric code and can access the platform immediately by entering their email address and that code — no account creation required. Each code allows up to 10 guest logins. After the 10th use, the guest is blocked from further logins and redirected to account creation.

**Why this priority**: Enables frictionless onboarding for new users and drives account creation through direct exposure to the product. This is the entry point that makes other features accessible to new users.

**Independent Test**: Can be fully tested by sending an invitation to a test email address, receiving the code, performing 10 successful logins, and verifying that the 11th attempt is blocked and redirects to account creation.

**Acceptance Scenarios**:

1. **Given** a registered user, **When** they enter a valid email address and send an invitation, **Then** the invitee receives an email containing exactly one 7-digit numeric code within 2 minutes.
2. **Given** an invitee with a valid code, **When** they enter their email and the correct 7-digit code, **Then** they gain guest access to the platform without creating an account.
3. **Given** an invitee who has used the code 9 times, **When** they log in for the 10th time, **Then** they gain access and see a clear warning that this is their last guest login.
4. **Given** an invitee who has used the code 10 times, **When** they attempt another login with the same code, **Then** access is denied and they are redirected to the account creation flow with an explanation.
5. **Given** an invitee submitting a wrong code or mismatched email, **When** the login is attempted, **Then** the system denies access with a generic error message that does not reveal which field is incorrect.
6. **Given** an invitation code older than 30 days, **When** an invitee attempts to use it, **Then** the system rejects it as expired and invites the user to request a new invitation.

---

### User Story 2 — Multi-Agent AI Document Processing (Priority: P2)

A user on a monthly subscription activates multi-agent mode on a project document. A supervisor AI agent analyzes the document's size and complexity, then spawns 1 to 6 worker agents in parallel — each handling a distinct section. Workers report progress in real time. When all workers finish, the supervisor synthesizes their outputs into a final coherent document and presents a humanization report alongside it.

**Why this priority**: Premium differentiating capability that justifies the monthly subscription. Delivers measurably higher quality and faster processing for large or complex documents.

**Independent Test**: Can be fully tested by uploading a multi-section document with a monthly-subscription account, activating multi-agent mode, and verifying: the correct number of agents is spawned, live per-agent progress is shown, the final document is complete and coherent, and the humanization report is displayed.

**Acceptance Scenarios**:

1. **Given** a user with an active monthly subscription, **When** they open a project's processing settings, **Then** the multi-agent mode toggle is visible and available to enable.
2. **Given** a user without a monthly subscription, **When** they view the same settings, **Then** the multi-agent toggle is visible but locked, with a prompt to upgrade their plan.
3. **Given** multi-agent mode is active and a document is submitted, **When** the supervisor agent analyzes the document, **Then** it spawns between 1 and 6 worker agents; a short or simple document results in exactly 1 worker.
4. **Given** worker agents are running, **When** a worker completes or updates a section, **Then** the user sees a real-time progress update for that agent (section label, status, completion percentage) within 5 seconds.
5. **Given** all workers have reported completion, **When** the supervisor synthesizes their outputs, **Then** a single final document is produced with all sections integrated without duplication or contradiction.
6. **Given** the final document is ready, **When** the user views the result, **Then** a humanization report is displayed alongside it, describing the transformations applied to make the text sound natural and human-written.
7. **Given** a worker agent fails mid-processing, **When** the supervisor detects the failure, **Then** it automatically retries or reassigns the section, and notifies the user if a significant delay results.

---

### User Story 3 — Invitation Management for the Inviter (Priority: P3)

The registered user who sent an invitation can track its status, view how many times the code has been used, and revoke it at any time to immediately cut off guest access.

**Why this priority**: Provides control and auditability over shared access. Essential for trust and security — users need to be able to manage and revoke access they have granted.

**Independent Test**: Can be tested by sending an invitation, viewing the invitation dashboard, simulating multiple code uses, and confirming revocation immediately blocks further guest access.

**Acceptance Scenarios**:

1. **Given** a user who has sent invitations, **When** they view their invitation list, **Then** each entry shows: invitee email, date sent, use count (e.g., "3/10"), and status (active / expired / revoked / converted).
2. **Given** an active invitation, **When** the inviter clicks "Revoke", **Then** the code is immediately invalidated and all subsequent login attempts with that code are denied.
3. **Given** an invitee who created a permanent account after using the invitation, **When** the inviter views the invitation, **Then** it shows status "Converted" and the use counter is frozen at its last value.

---

### Edge Cases

- What happens when the same email address is invited by multiple different users simultaneously (each with their own code — are both valid concurrently)?
- If a guest is locked out for 15 minutes after 5 failed attempts, does the lockout also apply to the valid code (preventing legitimate access during the window)?
- What happens if two concurrent logins use the same code at exactly the 10th use — do both succeed or only one?
- What if the invitation email bounces or is never delivered to the invitee?
- What happens to an in-progress multi-agent session if the user's monthly subscription lapses mid-processing?
- How are document section boundaries determined when a document has no clear structural markers (headings, chapters)?
- What if two worker agents produce contradictory outputs for adjacent sections during synthesis?
- What happens if the supervisor agent fails before any workers are spawned?

---

## Requirements *(mandatory)*

### Functional Requirements

**Invitation System**

- **FR-001**: A registered user MUST be able to send an invitation by entering a recipient's email address.
- **FR-002**: The system MUST generate a unique 7-digit numeric code for each invitation sent.
- **FR-003**: The system MUST deliver the invitation code to the recipient's email address within 2 minutes of the invitation being created.
- **FR-004**: An invitee MUST be able to access the platform by providing their email address and the 7-digit code, without creating an account first.
- **FR-005**: The system MUST verify that the email address submitted at login matches the email address the invitation was sent to.
- **FR-006**: The system MUST track and increment the use count of each invitation code upon each successful guest login.
- **FR-007**: After exactly 10 successful uses of an invitation code, the system MUST block further guest logins with that code and redirect the user to the account creation flow.
- **FR-008**: The system MUST automatically expire invitation codes that are more than 30 days old.
- **FR-009**: Failed login attempts (wrong code or mismatched email) MUST return a generic error message that does not identify which field is incorrect.
- **FR-009b**: After 5 consecutive failed login attempts for a given email address, the system MUST lock that email from further attempts for 15 minutes; the error message MUST indicate the lockout and remaining wait time.
- **FR-010**: An inviter MUST be able to view a list of all their sent invitations including status and use count.
- **FR-011**: An inviter MUST be able to revoke any active invitation, causing immediate invalidation of the code.
- **FR-011b**: A guest user MUST be able to view, process, and export documents they are invited to access; they MUST NOT be able to create new projects, upload new documents from scratch, or send invitations.

**Multi-Agent AI Processing**

- **FR-012**: Multi-agent mode MUST only be activatable by users with an active monthly subscription.
- **FR-013**: Users without a monthly subscription MUST see the multi-agent option in a disabled state with an upgrade prompt; it MUST NOT be hidden.
- **FR-014**: When multi-agent mode is activated, a supervisor agent MUST analyze the submitted document's length and complexity before assigning workers.
- **FR-015**: The supervisor MUST spawn between 1 and 6 worker agents based on document word count and complexity: ≤500 words → 1 agent; 501–2 000 words → 2–3 agents; 2 001–5 000 words → 4–5 agents; >5 000 words → 6 agents. A complexity modifier (e.g., technical density, structural fragmentation) MAY increase the count within the applicable band.
- **FR-016**: Each worker agent MUST be assigned a distinct, non-overlapping section of the document.
- **FR-017**: Worker agents MUST report progress to the supervisor continuously; the user interface MUST reflect each agent's status, section label, and progress percentage within 5 seconds of each update.
- **FR-018**: Upon all workers completing their sections, the supervisor MUST synthesize all outputs into a single coherent final document.
- **FR-019**: The system MUST present a humanization report alongside the final document. The report MUST include: (1) a list of transformation types applied (e.g., sentence restructuring, synonym substitution, tone softening); (2) Flesch–Kincaid readability score before and after processing; (3) an estimated AI-detection risk reduction percentage; (4) a list of document sections with the most significant changes highlighted.
- **FR-020**: If a worker agent fails, the supervisor MUST attempt automatic retry or section reassignment before surfacing an error to the user.
- **FR-021**: A monthly subscription that lapses MUST NOT interrupt an already in-progress multi-agent session; new sessions MUST be blocked until the subscription is renewed.

### Key Entities

- **Invitation**: recipient email (unique per active invitation), 7-digit code (bound to recipient email — only that email may use it), inviter (user reference), created at, login count (0–10, incremented per successful login by the recipient), status (active / expired / revoked / converted), expiry date
- **GuestSession**: invitation reference, session token, login attempt number (1–10), created at, platform access scope
- **LoginAttemptLog**: email address (attempted), failure count within window, lockout-expires-at, created at (internal rate-limit audit table — not exposed via API; see FR-009b)
- **Subscription**: user reference, plan type (monthly), billing cycle start/end, status (active / lapsed / cancelled), multi-agent feature flag
- **AgentSession**: project reference, document snapshot, supervisor agent ID, worker count (1–6), overall status (analyzing / processing / synthesizing / complete / failed), started at, completed at
- **WorkerAgent**: agent session reference, assigned section identifier, section content boundaries, status (pending / running / complete / failed), partial output, progress percentage, last reported at
- **HumanizationReport**: agent session reference, list of transformations applied, final document reference, generated at

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of invitation emails are delivered and received within 2 minutes of being sent.
- **SC-002**: An invitee can go from opening the invitation email to active guest access in under 60 seconds.
- **SC-003**: At least 40% of invitees who have used their code 5 or more times complete account creation (guest-to-member conversion).
- **SC-004**: A 10,000-word document processed with 6 worker agents completes within 3 minutes end-to-end.
- **SC-005**: 95% of synthesized final documents pass a structural coherence check — no duplicated sections, no contradictions detectable between worker outputs.
- **SC-006**: Real-time progress updates reach the user interface within 5 seconds of each worker's report.
- **SC-007**: 90% of users complete the full invitation flow (send, receive, enter code, access) without requiring support.
- **SC-008**: The humanization report is available to the user within 10 seconds of the final document being generated.

---

## Assumptions

- The platform is an AI-assisted document writing and processing tool; users work with text documents organized in projects.
- "Humanization" refers to transforming AI-generated text to sound more natural, fluid, and human-written — including rephrasing, varying sentence structure, and removing robotic patterns.
- Invitation codes are bound to the recipient email address; a code cannot grant access when used with a different email than it was sent to.
- Guest access grants the same default feature set as a free registered account, excluding subscription-gated features.
- Monthly subscription billing and payment processing are managed by an existing billing system; this feature only reads subscription status.
- Worker agents operate independently; they do not communicate with each other — all coordination flows through the supervisor agent.
- Document section boundaries are determined automatically by the supervisor agent (by heading structure, word count, or semantic segmentation); users do not define sections manually.
- A "project" is an existing platform concept grouping documents and settings; multi-agent mode is a project-level setting applied per processing run.
- The maximum of 6 worker agents is a fixed hard cap regardless of document size beyond a complexity threshold.
- An existing email/notification service is available for sending invitation emails.
- Mobile support for the multi-agent live progress view is in scope for v1 (same feature set as web, responsive layout).
