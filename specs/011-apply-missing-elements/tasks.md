# Tasks: 011 — Apply Missing MUI-Aligned Elements

**Input**: Design documents from `/specs/011-apply-missing-elements/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/api.md ✅, quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Exact file paths are included in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project conventions confirmation; no new infrastructure needed (existing library setup applies)

- [x] T001 Verify branch `011-apply-missing-elements` is active and baseline `npm test` passes (451 tests / 0 failures)
- [x] T002 Confirm `src/components/Accordion/Accordion.tsx`, `src/components/Stepper/Stepper.tsx`, `src/components/RadioButton/RadioGroup.tsx`, `src/components/List/index.ts`, and `src/index.ts` are readable and current

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared internal context files and type extensions that ALL composable user stories depend on. Must be complete before US2, US3, and US4 work begins.

**⚠️ CRITICAL**: US2 (Accordion), US3 (Stepper), and US4 (RadioGroup) all require their context files. US1 and US5 are independent and can start in parallel with this phase.

- [x] T003 [P] Create `src/components/Accordion/AccordionContext.ts` — internal context: `{ isExpanded: boolean; toggle: () => void; disabled: boolean }` typed with `createContext`; do not export from `index.ts`
- [x] T004 [P] Create `src/components/Stepper/StepperContext.ts` — internal context: `{ activeStep: number; orientation: 'horizontal' | 'vertical'; totalSteps: number }` typed with `createContext`; do not export from `index.ts`
- [x] T005 [P] Create `src/components/RadioButton/RadioGroupContext.ts` — internal context: `{ name?: string; value?: string; onChange?: (event: unknown, value: string) => void; row?: boolean; disabled?: boolean }` typed with `createContext`; creates this file unconditionally (supersedes any existing RadioButtonContext); do not export from `index.ts`
- [x] T006 [P] Extend `src/components/Accordion/types.ts` — add composable prop types (`AccordionComposableProps`, `AccordionSummaryProps`, `AccordionDetailsProps`, `AccordionActionsProps`) and update `AccordionProps` to a discriminated union of data-driven | composable shapes; keep all existing types unchanged
- [x] T007 [P] Extend `src/components/Stepper/types.ts` — add composable prop types (`StepperComposableProps`, `StepProps`, `StepLabelProps`, `StepContentProps`, `StepConnectorProps`, `MobileStepperProps`); update `StepperProps` to discriminated union; keep existing `StepItem` and data-driven types unchanged
- [x] T008 [P] Extend `src/components/RadioButton/types.ts` — add `RadioProps` (alias of `RadioButtonProps` extended with `value`, `onChange`, `checked`, `color`, `size`); extend `RadioGroupProps` with `name`, `defaultValue`, `onChange`, `row`; keep `onValueChange` for backward compat
- [x] T009 [P] Extend `src/components/List/types.ts` — add `ListItemButtonProps`, `ListItemIconProps`, `ListItemAvatarProps`, `ListItemTextProps`, `ListSubheaderProps` (see contracts/api.md for exact shapes)

**Checkpoint**: All context files and type extensions ready — US1–US5 can now proceed.

---

## Phase 3: User Story 1 — Composable List (Priority: P1) 🎯 MVP

**Goal**: Export `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` as first-class composable list primitives.

**Independent Test**: Render a settings `<List>` using all 5 new sub-components — all importable from the library with no custom wrappers.

**Acceptance Criteria**:
- `ListItemButton` renders with `role="button"` + `accessible={true}`
- `ListItemText` renders `primary` and `secondary` text in correct MUI typography variants
- `ListSubheader` renders as a non-pressable styled category label
- All 5 components compose correctly with existing `ListItem`

- [x] T010 [P] [US1] Create `src/components/List/ListItemButton.tsx` — `Pressable`-based row; `role="button"` + `accessible={true}` by default; supports `onPress`, `onLongPress`, `disabled`, `selected`, `dense`, `alignItems`, `disableRipple`, `sx` props; use `useTheme()` for colors/spacing; wrap in `React.memo`
- [x] T011 [P] [US1] Create `src/components/List/ListItemIcon.tsx` — `View` wrapper with left/right icon slot spacing per MD3; `sx` prop; `useTheme()`; `React.memo`
- [x] T012 [P] [US1] Create `src/components/List/ListItemAvatar.tsx` — `View` wrapper for `Avatar` slot with correct margin and alignment per MD3; `sx` prop; `useTheme()`; `React.memo`
- [x] T013 [P] [US1] Create `src/components/List/ListItemText.tsx` — renders `primary` and `secondary` stacked `Text` nodes with `theme.typography.body1`/`body2` variants; supports `primaryTypographyProps`, `secondaryTypographyProps`, `disableTypography`, `inset`; `React.memo`
- [x] T014 [P] [US1] Create `src/components/List/ListSubheader.tsx` — non-pressable styled `View` + `Text` label; MD3 `labelSmall` typography; `color` prop (`default` | `primary` | `inherit`); `disableGutters`; `inset`; `// RN-DEVIATION: sticky-header requires SectionList, out of scope`; `React.memo`
- [x] T015 [US1] Update `src/components/List/index.ts` — add exports for `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` and their prop types
- [x] T016 [US1] Update `src/index.ts` — re-export `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` and their types
- [x] T017 [P] [US1] Create `tests/unit/components/List/ListItemButton.test.tsx` — test: renders with `getByRole('button')`; fires `onPress`; respects `disabled`; applies `selected` style; snapshot
- [x] T018 [P] [US1] Create `tests/unit/components/List/ListItemText.test.tsx` — test: renders primary text; renders secondary text; `disableTypography` passes through; snapshot
- [x] T019 [P] [US1] Create `tests/unit/components/List/ListSubheader.test.tsx` — test: renders label; does not respond to press; applies `color` prop; snapshot
- [x] T020 [P] [US1] Create `tests/unit/components/List/ListItemIcon.test.tsx` — test: renders children inside icon slot; snapshot
- [x] T021 [P] [US1] Create `tests/unit/components/List/ListItemAvatar.test.tsx` — test: renders `Avatar` child with correct spacing; snapshot

---

## Phase 4: User Story 2 — Composable Accordion (Priority: P1)

**Goal**: Export `AccordionSummary`, `AccordionDetails`, `AccordionActions` as composable children; update `Accordion` to a discriminated union that preserves the existing data-driven API.

**Independent Test**: Render 3 accordions using the composable pattern with custom `expandIcon` — all imported from the library. The data-driven API still works unchanged.

**Acceptance Criteria**:
- `AccordionSummary` press toggles expand/collapse with icon rotation
- `AccordionDetails` hidden when collapsed, visible when expanded (via `Collapse`)
- `AccordionActions` renders right-aligned at bottom of expanded panel
- Data-driven `<Accordion title="..." />` still works without modification

- [x] T022 [US2] Create `src/components/Accordion/AccordionSummary.tsx` — reads/writes `AccordionContext`; renders a `Pressable` row with `role="button"` + `accessible={true}`; animates `expandIcon` 0→180° via `useAnimatedStyle` (Reanimated) when `isExpanded` changes; accepts `expandIcon`, `sx`, `children`; `React.memo`
- [x] T023 [US2] Create `src/components/Accordion/AccordionDetails.tsx` — reads `AccordionContext.isExpanded`; delegates to existing `<Collapse in={isExpanded}>`; wraps `children` with padding from theme; `sx` prop; `React.memo`
- [x] T024 [US2] Create `src/components/Accordion/AccordionActions.tsx` — `View` with `flexDirection: 'row'`, `justifyContent: 'flex-end'`, theme padding; only rendered when accordion is in composable mode (no AccordionContext dependency — always renders); `disableSpacing` prop; `sx`; `React.memo`
- [x] T025 [US2] Update `src/components/Accordion/Accordion.tsx` — implement discriminated union: when `props.title !== undefined` use existing data-driven render path unchanged; when `props.title === undefined` provide `AccordionContext` value and render `children` directly; manage `isExpanded` state; support `defaultExpanded`, `expanded`, `onChange`, `disabled`
- [x] T026 [US2] Update `src/components/Accordion/index.ts` — add exports for `AccordionSummary`, `AccordionDetails`, `AccordionActions` and their prop types
- [x] T027 [US2] Update `src/index.ts` — re-export `AccordionSummary`, `AccordionDetails`, `AccordionActions` and their types
- [x] T028 [P] [US2] Create `tests/unit/components/Accordion/AccordionSummary.test.tsx` — test: renders with `getByRole('button')`; fires toggle on press; `expandIcon` rotates on expand; snapshot
- [x] T029 [P] [US2] Create `tests/unit/components/Accordion/AccordionDetails.test.tsx` — test: not visible when closed; visible when open; delegates to `Collapse`; snapshot
- [x] T030 [P] [US2] Create `tests/unit/components/Accordion/AccordionActions.test.tsx` — test: renders children right-aligned; `disableSpacing` removes padding; snapshot
- [x] T031 [US2] Add regression test for data-driven `Accordion` to `tests/unit/components/Accordion/Accordion.test.tsx` — verify `<Accordion title="..." />` still renders and toggles correctly (0 regressions)

---

## Phase 5: User Story 3 — Composable Stepper (Priority: P2)

**Goal**: Export `Step`, `StepLabel`, `StepContent`, `StepConnector`, `MobileStepper`; update `Stepper` to a discriminated union preserving the existing data-driven API.

**Independent Test**: Three-step checkout with composable `<Stepper>` renders correctly; `<MobileStepper variant="dots" steps={5} activeStep={2} />` renders with correct dot highlight.

**Acceptance Criteria**:
- Step 0 = completed (checkmark), Step 1 = active, Step 2 = upcoming
- `StepContent` visible only when step is active (collapse animation via `Collapse`)
- `MobileStepper` dots/progress renders proportionally
- Data-driven `<Stepper steps={[...]} />` still works unchanged

- [x] T032 [P] [US3] Create `src/components/Stepper/Step.tsx` — context consumer of `StepperContext`; derives `active`, `completed`, `disabled` from `activeStep`; passes derived state to `StepLabel`/`StepContent` children via an inline local context (`StepContext` defined and used within `Step.tsx` only — no separate file, not exported); accepts `active`, `completed`, `disabled` override props; `React.memo`
- [x] T033 [P] [US3] Create `src/components/Stepper/StepLabel.tsx` — renders step number circle (or custom icon via `StepIconComponent`) + `children` as label text + optional `optional` sub-label; uses theme palette for active/completed/disabled states; `accessibilityLabel` support; `React.memo`
- [x] T034 [P] [US3] Create `src/components/Stepper/StepContent.tsx` — reads `StepContext.active`; delegates to existing `<Collapse in={active}>`; padding from theme; `TransitionComponent` prop (defaults to `Collapse`); `React.memo`
- [x] T035 [P] [US3] Create `src/components/Stepper/StepConnector.tsx` — renders a `View` line between steps; `orientation`-aware (horizontal bar vs vertical line); `active`, `completed` style variants; replaceable via `Stepper connector` prop; `React.memo`
- [x] T036 [P] [US3] Create `src/components/Stepper/MobileStepper.tsx` — `variant` prop (`dots` | `progress` | `text`); `steps`, `activeStep`, `backButton`, `nextButton`; dots: row of circles filled/outlined per active; progress: `LinearProgress` with `value={(activeStep / (steps - 1)) * 100}`; text: `"{activeStep + 1} / {steps}"`; `position` prop (`bottom` | `top` | `static`); `React.memo`
- [x] T037 [US3] Update `src/components/Stepper/Stepper.tsx` — implement discriminated union: when `props.steps !== undefined` use existing data-driven render path unchanged; when composable, provide `StepperContext` + insert `StepConnector` between `Step` children; support `activeStep`, `orientation`, `alternativeLabel`, `nonLinear`, `connector`
- [x] T038 [US3] Update `src/components/Stepper/index.ts` — add exports for `Step`, `StepLabel`, `StepContent`, `StepConnector`, `MobileStepper` and their types
- [x] T039 [US3] Update `src/index.ts` — re-export `Step`, `StepLabel`, `StepContent`, `StepConnector`, `MobileStepper` and their types
- [x] T040 [P] [US3] Create `tests/unit/components/Stepper/Step.test.tsx` — test: active/completed/disabled states render correct styles; derives state from context; snapshot
- [x] T041 [P] [US3] Create `tests/unit/components/Stepper/StepLabel.test.tsx` — test: renders step number; renders custom icon; renders `optional` sub-label; accessibility label; snapshot
- [x] T042 [P] [US3] Create `tests/unit/components/Stepper/StepContent.test.tsx` — test: hidden when step inactive; visible when active; delegates to `Collapse`; snapshot
- [x] T043 [P] [US3] Create `tests/unit/components/Stepper/MobileStepper.test.tsx` — test: `dots` renders correct filled dot; `progress` bar has correct fill value; `text` renders step fraction; `backButton`/`nextButton` press handlers; snapshot
- [x] T059 [P] [US3] Create `tests/unit/components/Stepper/StepConnector.test.tsx` — test: renders horizontal `View` line when orientation is `horizontal`; renders vertical line when orientation is `vertical`; applies `active` and `completed` style variants; snapshot — closes FR-027 gap (unit test for all new components)
- [x] T044 [US3] Add regression test for data-driven `Stepper` to `tests/unit/components/Stepper/Stepper.test.tsx` — verify `<Stepper steps={[...]} activeStep={1} />` still renders correctly (0 regressions)

---

## Phase 6: User Story 4 — RadioGroup Wrapper (Priority: P2)

**Goal**: Extend `RadioGroup` with `onChange`, `name`, `defaultValue`, `row`; export `Radio` alias; preserve `onValueChange` backward compatibility.

**Independent Test**: `<RadioGroup name="plan" value={val} onChange={...}>` with three `<Radio>` children; selection changes correctly and `onChange` fires.

**Acceptance Criteria**:
- `onChange(event, value)` fires when a radio is pressed
- `row={true}` switches to `flexDirection: 'row'`
- `defaultValue` works as uncontrolled initial value
- `onValueChange` still fires (backward compat)
- `Radio` is a valid exported alias for `RadioButton`

- [x] T045 [US4] Update `src/components/RadioButton/RadioGroup.tsx` — provide `RadioGroupContext` with `{ name, value, onChange, row, disabled }`; manage `internalValue` state for `defaultValue` uncontrolled mode; when controlled (`value` prop present) use it; keep existing `onValueChange` firing; when `row={true}` set `flexDirection: 'row'` on container `View`
- [x] T046 [US4] Update the RadioButton component implementation (`src/components/RadioButton/RadioButton.tsx` or equivalent pressable component file) — verify and add `Radio`-compatible prop behavior: `onChange?: (event: unknown, checked: boolean) => void`, `checked?: boolean`, `color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`, `size?: 'small' | 'medium'`; use the `RadioProps` type already defined in T008; do NOT re-declare types (avoids duplication with T008)
- [x] T047 [US4] Update `src/components/RadioButton/index.ts` — add `Radio` export (alias: `export { RadioButton as Radio }`); add `RadioProps` type export
- [x] T048 [US4] Update `src/index.ts` — re-export `Radio`, `RadioProps` alongside existing `RadioButton`, `RadioGroup` exports
- [x] T049 [US4] Create `tests/unit/components/RadioButton/RadioGroup-extended.test.tsx` — test: `onChange` fires with correct value; `row` prop switches to horizontal layout; `defaultValue` sets initial selection; controlled `value` update reflects in children; `onValueChange` still fires (backward compat); snapshot

---

## Phase 7: User Story 5 — useMediaQuery Hook (Priority: P3)

**Goal**: Export `useMediaQuery(query)` hook accepting named breakpoints or raw `(min-width)`/`(max-width)` strings; returns reactive boolean.

**Independent Test**: `useMediaQuery("md")` returns `false` at 800 dp, `true` at 1000 dp; `useMediaQuery("(min-width: 600px)")` returns `true` at 800 dp.

**Acceptance Criteria**:
- Named breakpoints use theme values (`xs:0, sm:600, md:900, lg:1200, xl:1536`)
- `(min-width: NNNpx)` and `(max-width: NNNpx)` raw queries are supported
- Return value updates reactively on window resize / orientation change
- TypeScript: return type is `boolean`

- [x] T050 [US5] Create `src/hooks/useMediaQuery.ts` — consume `useWindowDimensions()` from react-native for reactive width; map named breakpoints (`xs/sm/md/lg/xl`) to theme values; parse raw queries with regex `/\((?:min|max)-width:\s*(\d+)px\)/`; `min-width` → `width >= value`; `max-width` → `width <= value`; return `boolean`; export as named export `useMediaQuery`
- [x] T051 [US5] Create `src/hooks/index.ts` if it does not exist, or update it if it does — add `useMediaQuery` as a named export; verify the file uses standard re-export syntax
- [x] T052 [US5] Update `src/index.ts` — re-export `useMediaQuery`
- [x] T053 [US5] Create `tests/unit/hooks/useMediaQuery.test.ts` — mock `useWindowDimensions`; test each named breakpoint threshold (below and above); test `(min-width: 600px)` raw query; test `(max-width: 899px)` raw query; test reactive update on dimension change; test portrait orientation mock (`width=375, height=812`) and landscape mock (`width=812, height=375`) to verify SC-005 (correct boolean for all 5 breakpoints in both orientations)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Wire all exports together, run full suite, verify alignment targets.

- [x] T054 Audit `src/index.ts` — verify every new component and hook from US1–US5 is re-exported; verify all new types are exported; run `tsc --noEmit` and confirm 0 errors
- [x] T055 [P] Run `npm test -- --coverage` — verify 0 regressions in 36 existing suites; verify new component files meet ≥80% branch coverage threshold per FR-027; fix any snapshot drift from modifications to `Accordion.tsx`, `Stepper.tsx`, `RadioGroup.tsx`
- [x] T056 [P] Run TypeScript strict check — `npx tsc --noEmit`; resolve any type errors in new files (no `any` in public APIs per FR-026)
- [x] T057 [P] Verify `sx` prop support on all new components (FR-028) — `ListItemButton`, `ListItemText`, `ListSubheader`, `ListItemIcon`, `ListItemAvatar`, `AccordionSummary`, `AccordionDetails`, `AccordionActions`, `Step`, `StepLabel`, `StepContent`, `StepConnector`, `MobileStepper`; add `useSx` / style merge if any are missing
- [x] T058 Update `docs/mui-comparison.md` — reclassify `List`, `Accordion`, `Stepper`, `RadioGroup` from ⚠️ to ✅; add `useMediaQuery` hook row; verify coverage improves to ≥ 94% (SC-006, SC-007)

---

## Dependencies

Story completion order and parallel opportunities:

```
Phase 1 (T001–T002) — sequential baseline verification
    ↓
Phase 2 (T003–T009) — parallel context + type setup
    ↙        ↓        ↘        ↘        ↘
  US1      US2        US3       US4       US5
(T010–T021) (T022–T031) (T032–T044) (T045–T049) (T050–T053)
  - fully  - requires  - requires  - requires  - fully
  independent AccordionCtx StepperCtx RadioGroupCtx independent
    ↘        ↓        ↙        ↙        ↙
             Phase 8 (T054–T058) — polish and sign-off
```

**US1** (List): No context dependency — can start immediately after T009 (types).  
**US2** (Accordion): Requires T003 (AccordionContext) + T006 (types).  
**US3** (Stepper): Requires T004 (StepperContext) + T007 (types).  
**US4** (Radio): Requires T005 (RadioGroupContext) + T008 (types).  
**US5** (useMediaQuery): Independent — can start any time after Phase 1.

**⚠️ `src/index.ts` sequential updates**: T016, T027, T039, T048, T052, and T054 all modify `src/index.ts`. These MUST be applied in phase order — if two phases are worked on concurrently, coordinate all `src/index.ts` edits through a single serialised task per session to avoid merge conflicts.

### Parallel Execution Examples

**Maximum parallelism (Phase 2 → US1/US5 start):**

```
Agent A: T003 AccordionContext → T006 AccordionTypes → T022 AccordionSummary → T023 AccordionDetails → ...
Agent B: T004 StepperContext   → T007 StepperTypes   → T032 Step            → T033 StepLabel       → ...
Agent C: T005 RadioContext     → T008 RadioTypes      → T045 RadioGroup      → T046 RadioBtnImpl    → ...
Agent D: T009 ListTypes        → T010 ListItemButton  → T011 ListItemIcon    → T013 ListItemText    → ...
Agent E: T050 useMediaQuery    → T051 hooks/index     → T052 src/index.ts    → T053 tests           → ...
```

---

## Implementation Strategy

**Recommended MVP scope**: US1 (List sub-components) + US2 (Accordion composable) — these are both P1, independently testable, and have the highest migration impact.

**Delivery increments**:
1. **Sprint 1**: Phase 1 + Phase 2 + US1 complete → settings screen migrates
2. **Sprint 2**: US2 + US3 complete → FAQ and checkout flows migrate
3. **Sprint 3**: US4 + US5 + Phase 8 → full MUI API parity, alignment report updated

**Total tasks**: 59 tasks  
**[P] parallelizable tasks**: 39  
**Tests included**: Yes (15 new test files — one per new component/hook — + 2 regression additions to existing test files = 17 total test task operations)
