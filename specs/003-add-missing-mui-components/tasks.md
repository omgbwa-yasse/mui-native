# Tasks: Add Missing MUI Components to mui-native

**Input**: Design documents from `/specs/003-add-missing-mui-components/`
**Branch**: `003-add-missing-mui-components`
**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅ · quickstart.md ✅

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase (different files, no unresolved deps)
- **[Story]**: Which user story this task belongs to (US1–US7)
- All paths are relative to repo root (`c:\wamp64_New\www\packages\Design`)

---

## Phase 1: Setup

**Purpose**: Establish folder scaffolding so every subsequent task has a valid target path.

- [ ] T001 Create all 11 component subdirectories and the `src/hooks/` directory: `src/components/CircularProgress/`, `src/components/LinearProgress/`, `src/components/Popover/`, `src/components/Fade/`, `src/components/Grow/`, `src/components/Slide/`, `src/components/Zoom/`, `src/components/Collapse/`, `src/components/Popper/`, `src/components/Masonry/`, `src/components/Timeline/`, `src/hooks/`

**Checkpoint**: `src/hooks/` and all 11 component subdirectories exist — implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Two shared hooks that multiple user stories depend on. Both are independent of each other and MUST be complete before the stories that consume them (US2, US3, US4).

**⚠️ CRITICAL**: `useTransition` must be complete before US3 (Transitions). `useAnchorPosition` must be complete before US2 (Popover) and US4 (Popper).

- [ ] T002 [P] Implement `useTransition` hook — ENTERING/ENTERED/EXITING/EXITED state machine, `withTiming` worklet, `reduceMotion` short-circuit — in `src/hooks/useTransition.ts`
- [ ] T003 [P] Implement `useAnchorPosition` hook — `ref.measure()` pattern (see `src/components/Menu/Menu.tsx`), returns `{ top, left, width, height }` — in `src/hooks/useAnchorPosition.ts`

**Checkpoint**: Both hooks exported and TypeScript-strict-clean — US2, US3, US4 can now proceed

---

## Phase 3: User Story 1 — Progress Indicators (Priority: P1) 🎯 MVP

**Goal**: Deliver `CircularProgress` and `LinearProgress` — fully animated, accessible, token-compliant progress feedback components.

**Independent Test**: Mount `<CircularProgress variant="indeterminate" />`, `<CircularProgress variant="determinate" value={75} />`, `<LinearProgress variant="buffer" value={60} valueBuffer={80} />` in isolation — all render without error, accessibility roles are set, no other new component needed.

- [ ] T004 [P] [US1] Create `CircularProgressProps` interface (variant, value, size, color, style) + barrel export in `src/components/CircularProgress/types.ts` and `src/components/CircularProgress/index.ts`
- [ ] T005 [P] [US1] Create `LinearProgressProps` interface (variant, value, valueBuffer, color, style) + barrel export in `src/components/LinearProgress/types.ts` and `src/components/LinearProgress/index.ts`
- [ ] T006 [P] [US1] Implement `CircularProgress` — indeterminate spinning `withRepeat` worklet, determinate arc via two-half-circle View clipping technique (`// RN-DEVIATION: no SVG`), value clamped to [0,100], `accessibilityRole="progressbar"`, `accessibilityValue` for determinate — in `src/components/CircularProgress/CircularProgress.tsx`
- [ ] T007 [P] [US1] Implement `LinearProgress` — three-layer absolute-positioned Views (track → buffer → fill), indeterminate two-staggered-bar animation (2100 ms loop + 715 ms delay), value/valueBuffer clamped, `accessibilityRole="progressbar"`, `accessibilityValue` for determinate — in `src/components/LinearProgress/LinearProgress.tsx`
- [ ] T008 [P] [US1] Write `CircularProgress` test suite — render test, indeterminate variant, determinate variant at `value={75}`, `color` prop, `size` prop, out-of-range value clamping, accessibility roles — in `src/components/CircularProgress/CircularProgress.test.tsx`
- [ ] T009 [P] [US1] Write `LinearProgress` test suite — render test, indeterminate variant, determinate variant at `value={40}`, buffer variant with `value={60} valueBuffer={80}`, `valueBuffer < value` edge case, accessibility roles — in `src/components/LinearProgress/LinearProgress.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=CircularProgress|LinearProgress` passes — US1 independently verified

---

## Phase 4: User Story 2 — Popover: Anchored Contextual Overlays (Priority: P1)

**Goal**: Deliver `Popover` — renders content anchored to a `View` ref, above all other content, with dismissal via backdrop tap.

**Independent Test**: Render a `View` with `ref={anchorRef}` and `<Popover open anchorRef={anchorRef} onClose={fn}>content</Popover>` — content is visible, `onClose` fires on outside tap, setting `open={false}` removes content.

**Depends on**: T003 (`useAnchorPosition`)

- [ ] T010 [US2] Create `PopoverProps` interface (open, anchorRef, onClose, anchorOrigin, transformOrigin, children, style) + barrel export in `src/components/Popover/types.ts` and `src/components/Popover/index.ts`
- [ ] T011 [US2] Implement `Popover` — `useAnchorPosition` for coordinates, `<Portal>` via `PortalContext`, backdrop `Pressable` calling `onClose`, `anchorOrigin`/`transformOrigin` positioning formula (vFactor/hFactor), `Fade` animation (once Fade exists — compose or inline `withTiming` opacity) — in `src/components/Popover/Popover.tsx`
- [ ] T012 [US2] Write `Popover` test suite — renders nothing when `open={false}`, renders content when `open={true}`, `onClose` called on outside tap, null `anchorRef` does not throw, `anchorOrigin` bottom-left alignment — in `src/components/Popover/Popover.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=Popover` passes — US2 independently verified

---

## Phase 5: User Story 3 — Transition Components (Priority: P2)

**Goal**: Deliver `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse` — composable visibility-animation wrappers driven by the shared `useTransition` hook.

**Independent Test**: Toggle `in` on each component and verify opacity/scale/position animates. Each component renders child mounted-but-hidden when `in={false}` (default), unmounts on exit only when `unmountOnExit={true}`.

**Depends on**: T002 (`useTransition`)

- [ ] T013 [P] [US3] Create `FadeProps` interface (in, timeout, mountOnEnter, unmountOnExit, children, style) + barrel in `src/components/Fade/types.ts` and `src/components/Fade/index.ts`
- [ ] T014 [P] [US3] Create `GrowProps` interface (same base + timeout) + barrel in `src/components/Grow/types.ts` and `src/components/Grow/index.ts`
- [ ] T015 [P] [US3] Create `SlideProps` interface (base + direction: `up|down|left|right`) + barrel in `src/components/Slide/types.ts` and `src/components/Slide/index.ts`
- [ ] T016 [P] [US3] Create `ZoomProps` interface (same base) + barrel in `src/components/Zoom/types.ts` and `src/components/Zoom/index.ts`
- [ ] T017 [P] [US3] Create `CollapseProps` interface (base + orientation: `horizontal|vertical`, collapsedSize: number default 0) + barrel in `src/components/Collapse/types.ts` and `src/components/Collapse/index.ts`
- [ ] T018 [P] [US3] Implement `Fade` — `useTransition` + `withTiming` opacity 0↔1 — in `src/components/Fade/Fade.tsx`
- [ ] T019 [P] [US3] Implement `Grow` — `useTransition` + `withTiming` scale 0.75↔1 + opacity 0↔1 (`// RN-DEVIATION: transform-origin is center-only`) — in `src/components/Grow/Grow.tsx`
- [ ] T020 [P] [US3] Implement `Slide` — `useTransition` + `withTiming` translateX/translateY from off-screen based on `direction` — in `src/components/Slide/Slide.tsx`
- [ ] T021 [P] [US3] Implement `Zoom` — `useTransition` + `withTiming` scale 0↔1 — in `src/components/Zoom/Zoom.tsx`
- [ ] T022 [P] [US3] Implement `Collapse` — `useTransition` + `onLayout` on inner container for natural size, `withTiming` height/width from `collapsedSize` to measured size, `orientation` toggles axis — in `src/components/Collapse/Collapse.tsx`
- [ ] T023 [P] [US3] Write `Fade` test suite — mounted-but-hidden default, `in={true}` visible, `unmountOnExit` removes child, `mountOnEnter` lazy mount — in `src/components/Fade/Fade.test.tsx`
- [ ] T024 [P] [US3] Write `Grow` test suite — renders child, `in` toggle, `timeout` prop, `unmountOnExit` — in `src/components/Grow/Grow.test.tsx`
- [ ] T025 [P] [US3] Write `Slide` test suite — renders child, `direction="up"` enters from bottom, `direction` prop variants — in `src/components/Slide/Slide.test.tsx`
- [ ] T026 [P] [US3] Write `Zoom` test suite — renders child, `in={true}` shows, `unmountOnExit` removes — in `src/components/Zoom/Zoom.test.tsx`
- [ ] T027 [P] [US3] Write `Collapse` test suite — renders child, `collapsedSize={40}` baseline height, `orientation="vertical"` default, double-toggle `unmountOnExit`+`mountOnEnter`, negative `collapsedSize` clamped to 0 — in `src/components/Collapse/Collapse.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=Fade|Grow|Slide|Zoom|Collapse` passes — US3 independently verified

---

## Phase 6: User Story 4 — Popper: Low-Level Anchored Positioning (Priority: P2)

**Goal**: Deliver `Popper` — non-blocking anchored content overlay with 12-placement support; no backdrop; `disablePortal` opt-out.

**Independent Test**: Render `<Popper open anchorRef={ref} placement="bottom">content</Popper>` — content is visible below anchor, no backdrop intercepts touches, `open={false}` hides content.

**Depends on**: T003 (`useAnchorPosition`)

- [ ] T028 [US4] Create `PopperProps` interface + `PopperPlacement` enum (12 values: top/bottom/left/right + `-start`/`-end` variants) + barrel in `src/components/Popper/types.ts` and `src/components/Popper/index.ts`
- [ ] T029 [US4] Implement `Popper` — `useAnchorPosition`, 12-placement → origin mapping table (see `contracts/Popper.md`), `<Portal>` unless `disablePortal={true}`, NO backdrop Pressable — in `src/components/Popper/Popper.tsx`
- [ ] T030 [US4] Write `Popper` test suite — hidden when `open={false}`, visible when `open={true}`, `placement="bottom"` positions below anchor, `placement="top"` positions above, `disablePortal={true}` renders inline, null `anchorRef` does not throw — in `src/components/Popper/Popper.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=Popper` passes — US4 independently verified

---

## Phase 7: User Story 5 — Masonry Layout (Priority: P3)

**Goal**: Deliver `Masonry` — multi-column staggered layout container using `onLayout`-driven argmin column assignment.

**Independent Test**: Render `<Masonry columns={3}>` with 9 children — each column gets 3 children; with varying heights, next child goes to shortest column.

- [ ] T031 [US5] Create `MasonryProps` interface (columns: number, spacing: number, defaultColumns: number, children, style) + barrel in `src/components/Masonry/types.ts` and `src/components/Masonry/index.ts`
- [ ] T032 [US5] Implement `Masonry` — `defaultColumns` initial layout, `onLayout` per child to update column heights, argmin pick for placement (`// RN-DEVIATION: no CSS column-count`), `spacing` applied as gap — in `src/components/Masonry/Masonry.tsx`
- [ ] T033 [US5] Write `Masonry` test suite — renders empty container for zero children, 9 equal-height children in 3 columns, `spacing` prop, `defaultColumns` fallback — in `src/components/Masonry/Masonry.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=Masonry` passes — US5 independently verified

---

## Phase 8: User Story 6 — Timeline Component (Priority: P3)

**Goal**: Deliver all 7 `Timeline` sub-components — composable vertical event-sequence display with `TimelineContext` for position propagation.

**Independent Test**: Render a full `<Timeline position="alternate">` wrapping three `<TimelineItem>` groups (each with Separator, Dot, Connector, Content, OppositeContent) — vertical layout, alternating sides, dot/connector visible.

- [ ] T034 [US6] Create all Timeline TypeScript types + `TimelineContext` (passes `position` + `itemIndex`) + barrel exporting all 7 sub-components in `src/components/Timeline/types.ts`, `src/components/Timeline/TimelineContext.ts`, `src/components/Timeline/index.ts`
- [ ] T035 [P] [US6] Implement `Timeline` (root container, provides `TimelineContext`, `position` prop: `left|right|alternate`) + `TimelineItem` (reads context for alignment) in `src/components/Timeline/Timeline.tsx` and `src/components/Timeline/TimelineItem.tsx`
- [ ] T036 [P] [US6] Implement `TimelineSeparator` (vertical flex column), `TimelineDot` (`React.memo`, `variant: filled|outlined`, `color` prop from theme, 48dp touch area) + `TimelineConnector` (`React.memo`, flex-grow vertical line) in `src/components/Timeline/TimelineSeparator.tsx`, `src/components/Timeline/TimelineDot.tsx`, `src/components/Timeline/TimelineConnector.tsx`
- [ ] T037 [P] [US6] Implement `TimelineContent` (flex-1 body column) + `TimelineOppositeContent` (mirror body, flex-1 opposite column) in `src/components/Timeline/TimelineContent.tsx` and `src/components/Timeline/TimelineOppositeContent.tsx`
- [ ] T038 [US6] Write `Timeline` test suite — renders 3 items in vertical order, dot + connector visible in separator, `TimelineDot color="primary"`, `TimelineDot variant="outlined"`, opposite content on both sides, `position="alternate"` alternates sides, single item with no connector renders cleanly — in `src/components/Timeline/Timeline.test.tsx`

**Checkpoint**: `npm test -- --testPathPattern=Timeline` passes — US6 independently verified

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Wire all new components into the public package API, verify strict TypeScript, confirm zero regressions across the full suite.

- [ ] T039 Add all new component exports and type exports to `src/index.ts` — `CircularProgress`, `LinearProgress`, `Popover`, `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`, `Popper`, `Masonry`, `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, `TimelineOppositeContent` plus all corresponding `*Props` types (FR-019)
- [ ] T040 Run `npm test` across full suite — confirm 0 failures, all 100 pre-existing tests still pass (zero regressions), every new `*.test.tsx` passes independently (SC-002, SC-006, FR-022)

**Checkpoint**: `npm test` exits 0 — feature accepted ✅

---

## Dependencies

```
T001 (folders)
  └─► T002 (useTransition)   ─────────────────────────────────────────► T018–T022 (Transitions impl)
  └─► T003 (useAnchorPosition) ──────────────────────────────────────► T011 (Popover impl)
                                                                        └─► T029 (Popper impl)

  T002 ready ──────────────────────►  T013–T017 (transition types)
                                       └─► T018–T022 (transition impl)
                                            └─► T023–T027 (transition tests)

  T003 ready ──────────────────────►  T010 (Popover types)
                                       └─► T011 (Popover impl)
                                            └─► T012 (Popover tests)

  T003 ready ──────────────────────►  T028 (Popper types)
                                       └─► T029 (Popper impl)
                                            └─► T030 (Popper tests)

  T004 ─► T006 ─► T008   (CircularProgress: types → impl → tests)
  T005 ─► T007 ─► T009   (LinearProgress:   types → impl → tests)

  T031 ─► T032 ─► T033   (Masonry:  types → impl → tests)

  T034 ─► T035 ─┐
           T036 ─┤─► T038   (Timeline: types+ctx → sub-components in parallel → tests)
           T037 ─┘

US1 complete + US2 complete + US3 complete + US4 complete + US5 complete + US6 complete
  └─► T039 (exports) ─► T040 (full test run)
```

**Story independence**: US1, US5 have no shared-hook dependencies (start immediately after T001). US2 and US4 both depend on T003. US3 depends on T002. US6 has no hook dependency.

---

## Parallel Execution Examples

### Batch A — Run after T001 (immediately):
```
T002 (useTransition) || T003 (useAnchorPosition)
T004 (CircularProgress types) || T005 (LinearProgress types)
```

### Batch B — Run after T002 + T003 + T004 + T005:
```
T006 (CircularProgress impl) || T007 (LinearProgress impl)
T010 (Popover types)
T013 (Fade types) || T014 (Grow types) || T015 (Slide types) || T016 (Zoom types) || T017 (Collapse types)
T028 (Popper types)
T031 (Masonry types)
T034 (Timeline types+ctx)
```

### Batch C — All transition implementations (after T002 + T013–T017):
```
T018 (Fade) || T019 (Grow) || T020 (Slide) || T021 (Zoom) || T022 (Collapse)
```

### Batch D — Timeline sub-components (after T034):
```
T035 (Timeline+TimelineItem) || T036 (Separator+Dot+Connector) || T037 (Content+OppositeContent)
```

### Batch E — Tests (after their respective implementations):
```
T008 || T009 || T023 || T024 || T025 || T026 || T027 || T033
```

---

## Implementation Strategy

### MVP Scope (deliver first)
Implement **Phase 1 → Phase 2 → Phase 3** first. This delivers the two most-needed P1 components (`CircularProgress` + `LinearProgress`) with full tests, unblocking the feedback category that is currently 0% covered.

### Incremental Delivery Order
1. **T001–T003**: Setup + shared hooks (unblocks everything)
2. **US1** (T004–T009): Progress indicators — visible in ≤6 tasks
3. **US2** (T010–T012): Popover — highest-value P1 overlay
4. **US3** (T013–T027): All 5 transition components — large but fully parallelizable
5. **US4** (T028–T030): Popper — shares `useAnchorPosition`, low marginal effort after US2
6. **US5** (T031–T033): Masonry — self-contained, no dependencies
7. **US6** (T034–T038): Timeline — composable set, most complex layout logic
8. **T039–T040**: Exports + full test validation

### Key Implementation Notes (from research.md)
- **CircularProgress arc**: use two Views with `overflow: hidden` + `rotateZ` — no SVG, no new deps. Add `// RN-DEVIATION: determinate arc implemented via two-half-circle View clipping (no react-native-svg)`.
- **Transitions**: All 5 consume `useTransition(in, timeout, mountOnEnter, unmountOnExit)` from `src/hooks/useTransition.ts`. The hook returns `{ state, animatedStyle }`. Each component only applies its specific animated values.
- **Collapse**: measure natural height via `onLayout` on a hidden absolute container before animating.
- **Popover/Popper**: both call `anchorRef.current?.measure((x, y, w, h, pageX, pageY) => ...)`. The shared hook makes this a 1-liner in each component.
- **Masonry**: maintain `columnHeights: number[]` in state, pick `argmin(columnHeights)` per child on `onLayout`. Add `// RN-DEVIATION: column filling uses onLayout+state instead of CSS column-count`.
- **Timeline**: `TimelineContext` carries `{ position: 'left'|'right'|'alternate', itemIndex: number }`. Only `Timeline` writes context; sub-components read it.
- **No new dependencies**: zero `package.json` changes required across all 7 groups.

### Total Task Count: 40 tasks across 9 phases
| Phase | Story | Tasks | Parallelizable |
|-------|-------|-------|---------------|
| 1 Setup | — | 1 | — |
| 2 Foundational | — | 2 | 2 |
| 3 US1 Progress | P1 | 6 | 6 |
| 4 US2 Popover | P1 | 3 | 0 |
| 5 US3 Transitions | P2 | 15 | 13 |
| 6 US4 Popper | P2 | 3 | 0 |
| 7 US5 Masonry | P3 | 3 | 0 |
| 8 US6 Timeline | P3 | 5 | 3 |
| 9 Polish | — | 2 | 0 |
| **Total** | | **40** | **24** |
