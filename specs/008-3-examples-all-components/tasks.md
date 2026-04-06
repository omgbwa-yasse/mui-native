# Tasks: 3 Usage Examples for All Components

**Feature**: `008-3-examples-all-components` | **Date**: 2026-04-05
**Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

---

## Phase 1 — Setup

- [x] T001 Confirm `react-native-syntax-highlighter` is listed in `apps/showcase/package.json`
- [x] T002 Confirm `react-native-gifted-charts` is listed in `apps/showcase/package.json` (add if absent)
- [x] T003 Confirm T046 registry integrity test passes before any changes: `npm test -- --testPathPattern=registry`

---

## Phase 2 — Foundational: Bug Fixes (Phase 0 gate — SC-002)

**Story Goal**: 0 runtime errors across all 78 component pages before example authoring begins.

**Independent Test Criteria**: `npx react-native run-android --no-packager` builds successfully; every component detail page loads without a red screen or JS console error.

- [x] T004 [P] Fix `useTheme` circular import in `src/components/DatePicker/DatePicker.tsx` — change direct `../../theme/ThemeContext` import to `../../theme` index
- [x] T005 [P] Grep `src/` and `apps/showcase/src/` for any other direct `../../theme/ThemeContext` imports and fix each one
- [x] T006 [P] Replace all `accessibilityRole="listitem"` occurrences in `src/` and `apps/showcase/src/` with `"none"`
- [x] T007 [P] Replace all `accessibilityRole="navigation"` occurrences in `src/` and `apps/showcase/src/` with `"none"`
- [x] T008 Fix Accordion expand/collapse state or animation wiring in `src/components/Accordion/`
- [x] T009 Fix Modal open state management in its example file so the trigger button opens the overlay
- [x] T010 Fix Menu anchor/visibility state in its example file so the trigger button opens the menu
- [x] T011 Fix Drawer navigation/Reanimated animation in its example file so the drawer opens and closes correctly
- [x] T012 Fix Snackbar queue/visibility state in its example file so the trigger button shows the snackbar
- [x] T013 Fix SpeedDial FAB dial child visibility in its example file (children must appear when FAB is pressed)
- [x] T014 Fix Stepper step state management in its example file (Next/Back buttons must advance/retreat steps)
- [x] T015 Fix CircularProgress Reanimated animation value in its example file (determinate variant must animate)
- [x] T016 Fix TreeView tree item rendering in its example file (tree items must appear and expand)
- [x] T017 Fix Link invalid prop/href in its example file so it renders without a prop warning
- [x] T018 Fix Tabs image rendering and illustration display in its example file
- [x] T019 [P] Fix DataGrid data rendering/key props in its example file (rows must render with correct keys)
- [x] T020 [P] Fix DataTable data rendering/key props in its example file (rows must render with correct keys)
- [x] T021 Fix Skeleton text line props in its example file (remove or fix deprecated props)
- [x] T022 [P] Fix missing color props on Stack example in its example file
- [x] T023 [P] Fix missing color props on HumanizationScoreBar example in its example file
- [x] T024 [P] Fix Timeline render/layout issues in its example file
- [x] T025 [P] Fix Tooltip render/layout issues in its example file
- [x] T026 [P] Fix MaterialIcon render/alert issues in its example file
- [ ] T027 Verify Phase 2 exit criteria: build passes and all currently broken pages load without red screen

---

## Phase 3 — Foundational: Infrastructure (ExampleConfig + ExampleGallery)

**Story Goal**: TypeScript compiles with the new `code` field; `ExampleGallery` shows the syntax-highlighted snippet above each preview.

**Independent Test Criteria**: `tsc --noEmit` ? 0 errors; `npm run generate` succeeds; T046 passes.

- [x] T028 Add required `code: string` field to `ExampleConfig` interface in `apps/showcase/src/catalogue/types.ts`
- [x] T029 Insert `<SyntaxHighlighter code={example.code} language="tsx" style={vscodeDark} />` above the preview `View` in `apps/showcase/src/components/ExampleGallery.tsx`
- [x] T030 Add `code: ''` stub to every existing `ExampleConfig` entry in the current example files (15 priority component entries) to satisfy TypeScript compilation
- [x] T031 Verify Phase 3 exit criteria: `tsc --noEmit` 0 errors; T046 passes

---

## Phase 4 — Foundational: Missing Library Exports

**Story Goal**: `CodeInput`, `HumanizationScoreBar`, `InvitationStatusBadge`, `WorkerAgentRow` are importable from `@mui-native`.

**Independent Test Criteria**: `import { CodeInput, HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow } from '@mui-native'` compiles without error.

- [x] T032 [P] Add `export { CodeInput } from './components/CodeInput'` to `src/index.ts`
- [x] T033 [P] Add `export { HumanizationScoreBar } from './components/HumanizationScoreBar'` to `src/index.ts`
- [x] T034 [P] Add `export { InvitationStatusBadge } from './components/InvitationStatusBadge'` to `src/index.ts`
- [x] T035 [P] Add `export { WorkerAgentRow } from './components/WorkerAgentRow'` to `src/index.ts`
- [x] T036 Verify Phase 4 exit criteria: `tsc --noEmit` still 0 errors after new exports added

---

## Phase 5 — US1: Zero Placeholders — Inputs Category (22 tuples)

**Story Goal** [US1]: All 22 Inputs components show 3 live rendered examples with a CodeBlock snippet; no "coming soon" placeholder.

**Independent Test Criteria**: Open each Inputs component page in the showcase; confirm 3 examples visible with distinct labels and CodeBlock snippet. T046 passes. `tsc --noEmit` 0 errors.

- [x] T037 [P] Create `apps/showcase/src/catalogue/examples.inputs.tsx` with imports and file skeleton (no tuple content yet)
- [x] T038 [US1] Author `autocompleteExamples` tuple (Autocomplete) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default controlled, Multiple selection, Disabled
- [x] T039 [US1] Author `buttonGroupExamples` tuple (ButtonGroup) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Horizontal text buttons, Vertical outlined buttons, Mixed icon+text
- [x] T040 [P] [US1] Author `checkboxExamples` tuple (Checkbox) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants using `CheckboxExample` stateful wrapper: Default unchecked, Pre-checked, Disabled
- [x] T041 [P] [US1] Author `codeInputExamples` tuple (CodeInput) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: 4-digit PIN, 6-digit OTP, Secure hidden
- [x] T042 [P] [US1] Author `datePickerExamples` tuple (DatePicker) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, Pre-filled date, Disabled
- [x] T043 [P] [US1] Author `dateTimePickerExamples` tuple (DateTimePicker) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, Pre-filled datetime, Disabled
- [x] T044 [US1] Author `fabExamples` tuple (FAB) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default icon, Extended with label, Small size
- [x] T045 [US1] Author `iconButtonExamples` tuple (IconButton) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, Filled tonal, Outlined
- [x] T046 [P] [US1] Author `numberFieldExamples` tuple (NumberField) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Integer, Decimal with min/max, Disabled
- [x] T047 [P] [US1] Author `radioButtonExamples` tuple (RadioButton) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants using `RadioGroupExample` stateful wrapper: 2-option group, 3-option group, Pre-selected disabled
- [x] T048 [P] [US1] Author `ratingExamples` tuple (Rating) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default 0/5, Pre-filled 3.5/5, Read-only
- [x] T049 [P] [US1] Author `searchbarExamples` tuple (Searchbar) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, With placeholder, With initial value
- [x] T050 [P] [US1] Author `segmentedButtonsExamples` tuple (SegmentedButtons) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: 3-option text, 3-option with icons, 4-option
- [x] T051 [P] [US1] Author `sliderExamples` tuple (Slider) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Continuous, Stepped, Range (min/max)
- [x] T052 [P] [US1] Author `switchExamples` tuple (Switch) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default off, Default on, Disabled
- [x] T053 [P] [US1] Author `timePickerExamples` tuple (TimePicker) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, 12-hour pre-filled, 24-hour
- [x] T054 [P] [US1] Author `toggleButtonExamples` tuple (ToggleButton) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants using group wrapper: 3-option exclusive, Multi-select, Icon toggles
- [x] T055 [US1] Author `touchableRippleExamples` tuple (TouchableRipple) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Default, Borderless, Disabled
- [x] T056 [US1] Author `transferListExamples` tuple (TransferList) in `apps/showcase/src/catalogue/examples.inputs.tsx` — 3 variants: Empty lists, Pre-populated, Single-item transfer
- [x] T057 [US1] Migrate existing Button tuple to `examples.inputs.tsx` — add `code` field stubs and preserve existing render logic
- [x] T058 [US1] Migrate existing Select tuple to `examples.inputs.tsx` — add `code` field stubs and preserve existing render logic
- [x] T059 [US1] Migrate existing TextField tuple to `examples.inputs.tsx` — add `code` field stubs and preserve existing render logic
- [x] T060 Update `apps/showcase/src/catalogue/examples.tsx` barrel to re-export from `./examples.inputs` (replace any direct tuple exports that moved)
- [x] T061 Verify Phase 5 exit criteria: `tsc --noEmit` 0 errors; T046 passes; all 22 Inputs pages show 3 examples

---

## Phase 6 — US1: Zero Placeholders — Data Display Category (18 tuples)

**Story Goal** [US1]: All 18 Data Display components show 3 live rendered examples with a CodeBlock snippet.

**Independent Test Criteria**: Open each Data Display component page; confirm 3 examples with distinct labels and CodeBlock. T046 passes. `tsc --noEmit` 0 errors.

- [x] T062 [P] Create `apps/showcase/src/catalogue/examples.dataDisplay.tsx` with imports and file skeleton
- [x] T063 [US1] Author `badgeExamples` tuple (Badge) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Default dot, Numeric content, Color variants
- [x] T064 [US1] Author `chartsExamples` tuple (Charts) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Bar chart, Line chart, Pie chart; each with 5 data points
- [x] T065 [US1] Author `dataGridExamples` tuple (DataGrid) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Basic 5-row table, With sorting enabled, With row selection; define inline columns+rows
- [x] T066 [US1] Author `dataTableExamples` tuple (DataTable) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Basic 5-row, Striped rows, With action column
- [x] T067 [P] [US1] Author `humanizationScoreBarExamples` tuple (HumanizationScoreBar) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Low?High improvement, High?Low degradation, Equal scores
- [x] T068 [P] [US1] Author `iconExamples` tuple (Icon) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Default size, Large colored, Small muted
- [x] T069 [P] [US1] Author `imageListExamples` tuple (ImageList) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: 2-col grid, 3-col masonry, Standard with titles
- [x] T070 [P] [US1] Author `invitationStatusBadgeExamples` tuple (InvitationStatusBadge) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 4 status variants shown across 3 examples: active, expired+revoked, converted
- [x] T071 [US1] Author `listExamples` tuple (List) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Simple text list, With icons/avatars, With secondary text
- [x] T072 [US1] Author `masonryExamples` tuple (Masonry) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: 2-column, 3-column, Variable height items
- [x] T073 [P] [US1] Author `materialIconExamples` tuple (MaterialIcon) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Outlined icons set, Filled icons set, Sized and colored
- [x] T074 [US1] Author `timelineExamples` tuple (Timeline) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Left-aligned, Alternate, Right-aligned with 4 items
- [x] T075 [P] [US1] Author `tooltipExamples` tuple (Tooltip) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Top placement, Bottom placement, With interactive child
- [x] T076 [P] [US1] Author `treeViewExamples` tuple (TreeView) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants using controlled expand wrapper: Single-select 3-node, Multi-level, Pre-expanded
- [x] T077 [P] [US1] Author `workerAgentRowExamples` tuple (WorkerAgentRow) in `apps/showcase/src/catalogue/examples.dataDisplay.tsx` — 3 variants: Active in-progress, Completed, Error state
- [x] T078 [US1] Migrate existing Avatar tuple to `examples.dataDisplay.tsx` — add `code` field stubs
- [x] T079 [US1] Migrate existing Chip tuple to `examples.dataDisplay.tsx` — add `code` field stubs
- [x] T080 [US1] Migrate existing Text tuple to `examples.dataDisplay.tsx` — add `code` field stubs
- [x] T081 Update `apps/showcase/src/catalogue/examples.tsx` barrel to re-export from `./examples.dataDisplay`
- [x] T082 Verify Phase 6 exit criteria: `tsc --noEmit` 0 errors; T046 passes; all 18 Data Display pages show 3 examples

---

## Phase 7 — US1: Zero Placeholders — Feedback Category (11 tuples)

**Story Goal** [US1]: All 11 Feedback components show 3 live rendered examples with a CodeBlock snippet.

**Independent Test Criteria**: Open each Feedback component page; confirm 3 examples with distinct labels and CodeBlock. T046 passes. `tsc --noEmit` 0 errors.

- [x] T083 [P] Create `apps/showcase/src/catalogue/examples.feedback.tsx` with imports and file skeleton
- [x] T084 [P] [US1] Author `activityIndicatorExamples` tuple (ActivityIndicator) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Default small, Large colored, Hidden (animating=false)
- [x] T085 [US1] Author `backdropExamples` tuple (Backdrop) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Trigger with close button, With spinner child, Dark tint
- [x] T086 [US1] Author `bannerExamples` tuple (Banner) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Single action, Two actions, Persistent (no dismiss)
- [x] T087 [US1] Author `dialogExamples` tuple (Dialog) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Alert confirm, Full-form, Scrollable content
- [x] T088 [P] [US1] Author `linearProgressExamples` tuple (LinearProgress) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Indeterminate, Determinate 60%, Buffer
- [x] T089 [US1] Author `modalExamples` tuple (Modal) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Basic overlay, With dismiss backdrop, Custom centered content
- [x] T090 [P] [US1] Author `skeletonExamples` tuple (Skeleton) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: Text lines (rectangular), Circular avatar, Card layout
- [x] T091 [US1] Author `speedDialExamples` tuple (SpeedDial) in `apps/showcase/src/catalogue/examples.feedback.tsx` — 3 variants: 3 actions, 5 actions with labels, Custom icon
- [x] T092 [US1] Migrate existing Alert tuple to `examples.feedback.tsx` — add `code` field stubs
- [x] T093 [US1] Migrate existing CircularProgress tuple to `examples.feedback.tsx` — add `code` field stubs
- [x] T094 [US1] Migrate existing Snackbar tuple to `examples.feedback.tsx` — add `code` field stubs
- [x] T095 Update `apps/showcase/src/catalogue/examples.tsx` barrel to re-export from `./examples.feedback`
- [x] T096 Verify Phase 7 exit criteria: `tsc --noEmit` 0 errors; T046 passes; all 11 Feedback pages show 3 examples

---

## Phase 8 — US1: Zero Placeholders — Navigation Category (10 tuples)

**Story Goal** [US1]: All 10 Navigation components show 3 live rendered examples with a CodeBlock snippet.

**Independent Test Criteria**: Open each Navigation component page; confirm 3 examples with distinct labels and CodeBlock. T046 passes. `tsc --noEmit` 0 errors.

- [x] T097 [P] Create `apps/showcase/src/catalogue/examples.navigation.tsx` with imports and file skeleton
- [x] T098 [US1] Author `bottomSheetExamples` tuple (BottomSheet) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: Basic sheet, With snap points, With form content
- [x] T099 [P] [US1] Author `breadcrumbsExamples` tuple (Breadcrumbs) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: 2-item, 4-item, With separator customization
- [x] T100 [P] [US1] Author `linkExamples` tuple (Link) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: Default underline, No underline, Colored
- [x] T101 [US1] Author `menuExamples` tuple (Menu) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: 3-item menu, With icons, With divider
- [x] T102 [US1] Author `navigationBarExamples` tuple (NavigationBar) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: 3-tab, 4-tab with labels, 4-tab with badge
- [x] T103 [P] [US1] Author `paginationExamples` tuple (Pagination) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: 5-page default, 10-page at page 5, Outlined shape
- [x] T104 [US1] Author `stepperExamples` tuple (Stepper) in `apps/showcase/src/catalogue/examples.navigation.tsx` — 3 variants: Horizontal 3-step, Vertical 4-step, Non-linear
- [x] T105 [US1] Migrate existing AppBar tuple to `examples.navigation.tsx` — add `code` field stubs
- [x] T106 [US1] Migrate existing Tabs tuple to `examples.navigation.tsx` — add `code` field stubs
- [x] T107 [US1] Migrate existing Drawer tuple to `examples.navigation.tsx` — add `code` field stubs
- [x] T108 Update `apps/showcase/src/catalogue/examples.tsx` barrel to re-export from `./examples.navigation`
- [x] T109 Verify Phase 8 exit criteria: `tsc --noEmit` 0 errors; T046 passes; all 10 Navigation pages show 3 examples

---

## Phase 9 — US1/US3: Zero Placeholders + Animation — Layout Category (17 tuples)

**Story Goal** [US1] [US3]: All 17 Layout components show 3 live rendered examples; animation/transition components (Fade, Grow, Zoom, Slide, Collapse) each have a toggle trigger in Example 1 and realistic triggers in Examples 2–3.

**Independent Test Criteria**: Open each Layout component page; confirm 3 examples with distinct labels and CodeBlock. Animation examples have working toggle controls. T046 passes. `tsc --noEmit` 0 errors.

- [x] T110 [P] Create `apps/showcase/src/catalogue/examples.layout.tsx` with imports and file skeleton
- [x] T111 [US1] Author `accordionExamples` tuple (Accordion) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Single uncontrolled, Multi-panel, Disabled panel
- [x] T112 [P] [US1] Author `boxExamples` tuple (Box) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Padding/margin demo, Direction row, Nested boxes
- [x] T113 [US1] [US3] Author `collapseExamples` tuple (Collapse) in `apps/showcase/src/catalogue/examples.layout.tsx` — Ex1: toggle button show/hide; Ex2: FAQ expand; Ex3: form section expand; all using stateful wrapper
- [x] T114 [P] [US1] Author `containerExamples` tuple (Container) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: sm maxWidth, md maxWidth, Fluid (no maxWidth)
- [x] T115 [US1] [US3] Author `fadeExamples` tuple (Fade) in `apps/showcase/src/catalogue/examples.layout.tsx` — Ex1: toggle button show/hide; Ex2: image reveal on load; Ex3: notification fade-in; all using stateful wrapper
- [x] T116 [P] [US1] Author `gridExamples` tuple (Grid) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: 2-column, 3-column responsive, Nested grid
- [x] T117 [US1] [US3] Author `growExamples` tuple (Grow) in `apps/showcase/src/catalogue/examples.layout.tsx` — Ex1: toggle button show/hide; Ex2: card appear on press; Ex3: badge grow; all using stateful wrapper
- [x] T118 [P] [US1] Author `helperTextExamples` tuple (HelperText) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Info type, Error type, Multiline
- [x] T119 [P] [US1] Author `paperExamples` tuple (Paper) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Elevation 1, Elevation 4, Outlined variant
- [x] T120 [US1] Author `popoverExamples` tuple (Popover) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Basic content, With title, Anchor aligned
- [x] T121 [US1] Author `popperExamples` tuple (Popper) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Top placement, Bottom placement, Flipped
- [x] T122 [P] [US1] Author `portalExamples` tuple (Portal) in `apps/showcase/src/catalogue/examples.layout.tsx` — 3 variants: Basic portal, Conditional render, Nested portals
- [x] T123 [US1] [US3] Author `slideExamples` tuple (Slide) in `apps/showcase/src/catalogue/examples.layout.tsx` — Ex1: toggle slide-in; Ex2: slide from left (panel); Ex3: slide from bottom (sheet); all using stateful wrapper
- [x] T124 [US1] [US3] Author `zoomExamples` tuple (Zoom) in `apps/showcase/src/catalogue/examples.layout.tsx` — Ex1: toggle button zoom; Ex2: image zoom on press; Ex3: FAB zoom-in on scroll; all using stateful wrapper
- [x] T125 [US1] Migrate existing Card tuple to `examples.layout.tsx` — add `code` field stubs
- [x] T126 [US1] Migrate existing Stack tuple to `examples.layout.tsx` — add `code` field stubs
- [x] T127 [US1] Migrate existing Divider tuple to `examples.layout.tsx` — add `code` field stubs
- [x] T128 Update `apps/showcase/src/catalogue/examples.tsx` barrel to re-export from `./examples.layout`; verify barrel only imports from all 5 category files (no legacy direct exports remain)
- [x] T129 Verify Phase 9 / US3 exit criteria: `tsc --noEmit` 0 errors; T046 passes; all 17 Layout pages show 3 examples; animation controls are tappable and play transitions

---

## Phase 10 — Polish & Validation

**Story Goal**: All success criteria SC-001 ? SC-006 met; full manual walkthrough passes.

**Independent Test Criteria**: 78/78 component pages show 3 examples, no placeholders, no runtime errors, CodeBlock snippet visible on each.

- [ ] T130 Run `tsc --noEmit` and fix any remaining TypeScript errors (target: 0 errors)
- [ ] T131 Run `npm test -- --testPathPattern=registry` and confirm T046 passes (target: 100% pass)
- [ ] T132 Run `npx react-native run-android --no-packager` and confirm BUILD SUCCESSFUL
- [ ] T133 [P] Manual walkthrough — Inputs category: open all 22 components; verify 3 examples rendered, CodeBlock visible, no red screen
- [ ] T134 [P] Manual walkthrough — Data Display category: open all 18 components; verify 3 examples rendered, CodeBlock visible, no red screen
- [ ] T135 [P] Manual walkthrough — Feedback category: open all 11 components; verify 3 examples rendered, CodeBlock visible, no red screen
- [ ] T136 [P] Manual walkthrough — Navigation category: open all 10 components; verify 3 examples rendered, CodeBlock visible, no red screen
- [ ] T137 [P] Manual walkthrough — Layout category: open all 17 components; verify 3 examples rendered, animation controls work, CodeBlock visible, no red screen
- [ ] T138 Confirm SC-001: 78/78 components have 3 examples, 0 placeholders remain
- [ ] T139 Confirm SC-002: 0 runtime errors navigating all 78 pages
- [ ] T140 Confirm SC-003: T046 passes (registered in 0 errors from T131)
- [ ] T141 Confirm SC-004: All tuples have 3 distinct labels (no duplicate labels within any tuple)
- [ ] T142 Confirm SC-005: All interactive examples respond to input without errors
- [ ] T143 Confirm SC-006: All 63 newly-authored `ExampleConfig` entries have non-empty `code` fields

---

## Dependencies

```
T001 ? T002 ? T003 (setup gate)
T003 ? T004–T026 (Phase 2 bug fixes, parallelizable within phase)
T026 ? T027 (bug-fix exit verification)
T027 ? T028–T030 (Phase 3 infrastructure)
T030 ? T031 (infrastructure exit verification)
T031 ? T032–T035 (Phase 4 exports, parallelizable)
T035 ? T036 (exports exit verification)
T036 ? T037–T061 (Phase 5 inputs, partial parallelism within)
T061 ? T062–T082 (Phase 6 dataDisplay, partial parallelism)
T082 ? T083–T096 (Phase 7 feedback)
T096 ? T097–T109 (Phase 8 navigation)
T109 ? T110–T129 (Phase 9 layout + animation)
T129 ? T130–T143 (Phase 10 validation)
```

## Parallel Execution Examples

**Within Phase 2**: T004–T007 can run in parallel (different files); T019+T020 together; T022+T023 together; T024+T025+T026 together.

**Within Phase 4**: T032–T035 are fully independent (one export each).

**Within Phase 5**: T038–T059 are fully independent (one tuple per task, different named exports). Create skeleton T037 first, then author all tuples in parallel.

**Within Phase 6–9**: Each tuple authoring task within a category file is independent and can proceed in parallel once the file skeleton exists.

**Manual walkthrough** (T133–T137): All 5 manual verification tasks are independent and can run in parallel.

## Implementation Strategy

- **MVP Scope**: Phases 1–5 deliver T001–T061 — this completes all 22 Inputs components, fixes all bugs, and sets up infrastructure. At that point 22/78 components have full examples and the app is stable.
- **Incremental Delivery**: Complete one category at a time. Each phase is independently buildable and testable — push after each phase exit verification passes.
- **Authoring Rule**: Each tuple task (T038–T129) is complete when: (a) the named export compiles, (b) the tuple has 3 distinct labels, (c) all `ExampleConfig` entries have a non-empty `code` field, (d) `render` does not call hooks directly.
