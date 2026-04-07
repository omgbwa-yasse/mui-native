---
description: "Task list for 010-full-mui-alignment"
---

# Tasks: Full MUI-Native â†” Material UI Alignment

**Feature**: `010-full-mui-alignment` | **Branch**: `010-full-mui-alignment` | **Date**: 2026-04-06
**Input**: [spec.md](./spec.md) Â· [plan.md](./plan.md) Â· [research.md](./research.md) Â· [data-model.md](./data-model.md) Â· [contracts/](./contracts/) Â· [quickstart.md](./quickstart.md)
**Prerequisites**: Feature `009-mui-config-sync` merged (**hard gate** â€” see Assumptions in spec.md)

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Parallelizable â€” different files, no dependency on in-progress tasks
- **[Story]**: User story label (US1â€“US6 â†’ maps to spec.md User Stories 1â€“6)
- **No story label**: Setup, Foundational, or Polish phases

---

## Phase 1: Setup

**Purpose**: Pre-flight gate check. No source changes.

- [x] T001 Confirm `009-mui-config-sync` is merged into the working branch; verify `sx`, `slots`, `slotProps`, `size`, `color` props exist on at least one component before starting US implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Token infrastructure used across multiple user stories. Must complete before US3 and US6.

**âš ï¸ CRITICAL**: T002 must complete before US3 (TextField `standard` uses theme tokens) and US6 (Text variant resolution).

- [x] T002 Add `TypographyMD2Variant` union type and `typographyVariantMap` constant to `src/tokens/typography.ts`; re-export both from `src/tokens/index.ts`
- [x] T003 [P] Create `docs/rn-deviations.md` documenting web-only MUI features with RN alternatives: `TransferList`, `TextareaAutosize`, `Popper`, `Portal`, `NoSsr` (FR-036)

**Checkpoint**: Token infrastructure ready â€” US3 and US6 may now begin

---

## Phase 3: User Story 1 â€” Familiar API for MUI Web Migrants (Priority: P1) ðŸŽ¯ MVP

**Goal**: Add additive MUI-idiomatic prop aliases to 7 existing components so MUI Web snippets work without prop renames.

**Independent Test**: Import `Dialog`, `Switch`, `Badge`, `TextField`, `Menu` from `mui-native`. Use `open`, `checked`, `onChange`, `badgeContent`, `helperText` exactly as in the MUI Web docs. Zero TypeScript errors, zero PropTypes warnings, all components render/behave correctly.

### Implementation

- [x] T004 [P] [US1] Add `open: boolean` alias (resolves to `visible`) and type `DialogOnCloseReason = 'backdropPress' | 'hardwareBackPress'` + `onClose: (reason: DialogOnCloseReason) => void` alias to `src/components/Dialog/types.ts` and `Dialog.tsx`; add `// RN-DEVIATION:` comment (FR-001, FR-002, FR-027)
- [x] T005 [P] [US1] Add `open: boolean` and `onClose: () => void` aliases to `src/components/Modal/types.ts` and `Modal.tsx` (FR-001, FR-002)
- [x] T006 [P] [US1] Add `open: boolean` and `onClose: () => void` aliases to `src/components/Menu/types.ts` and `Menu.tsx` (FR-001, FR-002)
- [x] T007 [P] [US1] Add `open: boolean` alias to `src/components/Snackbar/types.ts` and `Snackbar.tsx` (FR-001)
- [x] T008 [P] [US1] Add `open: boolean` alias to `src/components/BottomSheet/types.ts` and `BottomSheet.tsx` (FR-001)
- [x] T009 [P] [US1] Add `checked: boolean` and `onChange: (event: { target: { checked: boolean } }) => void` aliases to `src/components/Switch/types.ts` and `Switch.tsx`; inline `checked ?? value` resolution with `__DEV__` conflict warn (FR-003)
- [x] T010 [P] [US1] Add `value: number | null` and `onChange: (event: React.SyntheticEvent | null, value: number | null) => void` aliases to `src/components/Rating/types.ts` and `Rating.tsx` (FR-003)
- [x] T011 [P] [US1] Add `onChange: (event: unknown, value: number | number[]) => void` MUI-signature alias to `src/components/Slider/types.ts` and `Slider.tsx` (FR-004)
- [x] T012 [P] [US1] Add `helperText: ReactNode` alias for `supportingText` and `error: boolean | string` to `src/components/TextField/types.ts` and `TextField.tsx`; string error auto-renders as helper text when no `helperText` given (FR-005)
- [x] T013 [P] [US1] Add `badgeContent: ReactNode` alias for `content` and `invisible: boolean` (inverse of `visible`) to `src/components/Badge/types.ts` and `Badge.tsx` (FR-006)

### Tests

- [x] T014 [P] [US1] Write integration tests in `tests/integration/prop-aliases.test.tsx` covering: Dialog `open`/`onClose`, Switch `checked`/`onChange`, Badge `badgeContent`/`invisible`, TextField `helperText`/`error`, Menu `open`/`onClose`; assert MUI Web code pattern compiles and renders; **also assert legacy prop names** (`visible`, `onDismiss`, `supportingText`, `content`) still work without regression (SC-001, FR-007, FR-038)

**Checkpoint**: All 7 aliased components accept MUI-idiomatic prop names; no existing prop names broken

---

## Phase 4: User Story 2 â€” Missing Progress Indicators (Priority: P1)

**Goal**: Complete `CircularProgress` with 3 missing props (SVG arc, disableShrink, track slot), and finalize `LinearProgress` all four variants.

**Independent Test**: Import `CircularProgress` and `LinearProgress`. Render `<CircularProgress variant="determinate" value={60} />` â†’ arc at ~216Â°. Render `<LinearProgress variant="buffer" value={40} valueBuffer={70} />` â†’ two distinct fills.

### Implementation

- [x] T015 [US2] Add `thickness: number`, `disableShrink: boolean`, `enableTrackSlot: boolean` to `src/components/CircularProgress/types.ts`; update exported `CircularProgressProps` (FR-008)
- [x] T016 [US2] Replace any placeholder spinner in `CircularProgress.tsx` with react-native-svg `<Svg>` + `<Circle>` arc using `strokeDasharray={circumference}` and `strokeDashoffset={circumference * (1 - value / 100)}`; add second `<Circle>` for `enableTrackSlot` ring; clamp `value` to [0, 100] (FR-009, FR-010)
- [x] T017 [US2] Add Reanimated `useSharedValue` rotation worklet (0 â†’ 360Â° loop) and `strokeDashoffset` oscillation worklet for `variant="indeterminate"` in `CircularProgress.tsx`; gate shrink-oscillation on `!disableShrink`; gate **all** Reanimated animation worklets on `!useReducedMotion()` (imported from `react-native-reanimated`) â€” skip animation and apply final value immediately when reduce-motion is active (FR-009, Constitution Principle V)
- [x] T018 [P] [US2] Read `src/components/LinearProgress/LinearProgress.tsx`; implement any missing variant logic: `query` (reverse 321
.0indeterminate), `buffer` (two-track with `valueBuffer`), correct `accessibilityRole="progressbar"` and `accessibilityValue` on all variants (FR-011, FR-012)

### Tests

- [x] T019 [P] [US2] Write unit tests in `tests/unit/components/CircularProgress.test.tsx`: snapshot at values 0/25/50/75/100 for determinate, `thickness` renders correct stroke, `enableTrackSlot` renders two circles, `disableShrink` suppresses shrink animation, value clamping at -5 and 105 (SC-002, FR-038)
- [x] T068 [P] [US2] Write unit tests in `tests/unit/components/LinearProgress.test.tsx`: all 4 variants (`determinate`, `indeterminate`, `buffer`, `query`) render; buffer variant renders two distinct fills with `value` and `valueBuffer`; query variant direction is reversed; correct `accessibilityRole="progressbar"` and `accessibilityValue` on all variants (SC-003, FR-038)

**Checkpoint**: Both progress indicators match MUI v7.3.9 API and render correctly on iOS and Android; all 4 LinearProgress variants verified per SC-003

---

## Phase 5: User Story 3 â€” Full-Featured Form TextField (Priority: P2)

**Goal**: Add `standard` variant (underline-only), `multiline`/auto-grow, `fullWidth`, `required`, and `select` mode to TextField.

**Independent Test**: Copy MUI Web example: `<TextField variant="standard" multiline rows={4} fullWidth required error helperText="Required" />` â€” paste into mui-native file, zero TypeScript errors, renders all props visually.

### Implementation

- [x] T020 [US3] Add `'standard'` to `TextFieldVariant` union type and add `multiline: boolean`, `rows: number`, `minRows: number`, `maxRows: number`, `fullWidth: boolean`, `required: boolean`, `select: boolean` to `src/components/TextField/types.ts` (FR-016â€“FR-020)
- [x] T021 [US3] Implement `variant="standard"` in `TextField.tsx`: `borderBottomWidth: 1` inactive / `2` focused via Reanimated shared value; gate animation on `!useReducedMotion()` (from `react-native-reanimated`) â€” apply final `borderBottomWidth` immediately when reduce-motion is active; no top/left/right borders; no background fill; no borderRadius (FR-016, Constitution Principle V)
- [x] T022 [US3] Implement `multiline` + `rows`/`minRows`/`maxRows` in `TextField.tsx`: fixed height when `rows` set; `ContentSizeChange` auto-grow clamped to `[minRows, maxRows]`  when `minRows`/`maxRows` set (FR-017)
- [x] T023 [US3] Implement `fullWidth` (`width: '100%'`) and `required` (asterisk appended to label) in `TextField.tsx` (FR-018, FR-019)
- [x] T024 [US3] Implement `select` mode in `TextField.tsx`: when `select={true}`, render the library `Select` component in place of `TextInput`, passing children as options (FR-020)

### Tests

- [x] T025 [P] [US3] Write unit tests in `tests/unit/components/TextField.test.tsx`: standard variant renders no border-box, multiline + rows renders correct height, fullWidth stretches layout, required shows asterisk, `error={true}` applies error color, `error="msg"` auto-renders as helper text, `helperText` takes precedence over string error (FR-038)

**Checkpoint**: TextField matches MUI v7.3.9 API for all form use cases

---

## Phase 6: User Story 4 â€” Composable Sub-Components (Priority: P2)

**Goal**: Add `AvatarGroup`, 5 Card sub-components, 4 Dialog sub-components + Dialog extensions, and 9 Table components.

**Independent Test**: Copy the "Basic Card" and "Confirmation Dialog" MUI documentation examples verbatim into a mui-native screen; confirm compile + render with â‰¤ 5 prop changes per example (SC-005).

### AvatarGroup (new component)

- [x] T026 [P] [US4] Create `src/components/AvatarGroup/types.ts` with `AvatarGroupProps`: `children`, `max`, `total`, `spacing` (`'medium' | 'small' | number`), `variant`, `renderSurplus` (FR-014)
- [x] T027 [US4] Create `src/components/AvatarGroup/AvatarGroup.tsx`: `flexDirection: 'row'` container; negative `marginLeft` per spacing value (medium=âˆ’8, small=âˆ’4); `zIndex` stacking (first child highest); surplus Avatar when `children.length > max`; `renderSurplus` or default `+N` Avatar (FR-014, FR-015)
- [x] T028 [P] [US4] Create `src/components/AvatarGroup/index.ts` barrel-exporting `AvatarGroup` and `AvatarGroupProps`

### Card Sub-Components

- [x] T029 [P] [US4] Create `src/components/Card/CardHeader.tsx` with `avatar`, `title`, `subheader`, `action` props; row layout with left-avatar, flex-1 text block, right action; wrap in `React.memo` (FR-021, FR-022, Constitution Principle VI)
- [x] T030 [P] [US4] Create `src/components/Card/CardMedia.tsx` with `image` (URI), `component`, `alt` (accessibilityLabel), `height` props; default render via react-native `Image`; wrap in `React.memo` (FR-021, FR-023, Constitution Principle VI)
- [x] T031 [P] [US4] Create `src/components/Card/CardContent.tsx` with themed horizontal and vertical padding; pass-through `children`; wrap in `React.memo` (FR-021, Constitution Principle VI)
- [x] T032 [P] [US4] Create `src/components/Card/CardActions.tsx` with `disableSpacing` prop; default row layout with gap between action buttons; wrap in `React.memo` (FR-021, FR-024, Constitution Principle VI)
- [x] T033 [P] [US4] Create `src/components/Card/CardActionArea.tsx` with `onPress`, `disabled` props; wraps children in `Pressable` with 48dp minimum touch target; wrap in `React.memo` (FR-021, Constitution Principle VI)
- [x] T034 [US4] Update `src/components/Card/index.ts` to barrel-export `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`

### Dialog Sub-Components + Extensions

- [x] T035 [P] [US4] Add `fullScreen: boolean`, `fullWidth: boolean`, `maxWidth: 'xs'|'sm'|'md'|'lg'|'xl'|false`, `scroll: 'body'|'paper'` to `src/components/Dialog/types.ts` (FR-026)
- [x] T036 [P] [US4] Implement `fullScreen` (absolute fill), `fullWidth` (stretch to `maxWidth`), `maxWidth` breakpoint widths, and `scroll="body"/"paper"` ScrollView scoping in `src/components/Dialog/Dialog.tsx` (FR-026)
- [x] T037 [P] [US4] Create `src/components/Dialog/DialogTitle.tsx` with themed title padding and typography; wrap in `React.memo` (FR-025, Constitution Principle VI)
- [x] T038 [P] [US4] Create `src/components/Dialog/DialogContent.tsx` with `dividers: boolean` prop; renders top/bottom `Divider` components when `true`; vertically scrollable; wrap in `React.memo` (FR-025, Constitution Principle VI)
- [x] T039 [P] [US4] Create `src/components/Dialog/DialogContentText.tsx` rendering `Text` in `bodyMedium` with secondary color; wrap in `React.memo` (FR-025, Constitution Principle VI)
- [x] T040 [P] [US4] Create `src/components/Dialog/DialogActions.tsx` with `disableSpacing: boolean` prop; default row layout with `justifyContent: 'flex-end'` and 8dp gap; wrap in `React.memo` (FR-025, Constitution Principle VI)
- [x] T041 [US4] Update `src/components/Dialog/index.ts` to barrel-export `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions` alongside existing `Dialog`

### Table Family (new component family)

- [x] T042 [P] [US4] Create `src/components/Table/TableContainer.tsx`: `ScrollView` wrapper; `horizontal` prop for x-scroll variant; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T043 [P] [US4] Create `src/components/Table/Table.tsx` with `stickyHeader: boolean`, `padding`, `size` props; stickyHeader uses `position: 'absolute'` on `TableHead` + matching `paddingTop` on `TableBody`; add `// RN-DEVIATION: CSS position:sticky unavailable in RN` comment; wrap in `React.memo` (FR-029, Constitution Principle VI)
- [x] T044 [P] [US4] Create `src/components/Table/TableHead.tsx`: `View` container with themed header background color; passes `size` and `padding` context to children via React context; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T045 [P] [US4] Create `src/components/Table/TableBody.tsx`: `View` container; passes `size` and `padding` context to children; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T046 [P] [US4] Create `src/components/Table/TableFooter.tsx`: `View` container with themed footer styling; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T047 [P] [US4] Create `src/components/Table/TableRow.tsx` with `selected: boolean`, `hover: boolean`, `onPress?: () => void`; wraps in `Pressable` when `onPress` given; themed selected/hover background tints; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T048 [P] [US4] Create `src/components/Table/TableCell.tsx` with `align`, `padding`, `size`, `sortDirection`, `variant` props; `variant="head"` â†’ `accessibilityRole="columnheader"`; `variant="body"/"footer"` â†’ `accessibilityRole="cell"`; wrap in `React.memo` (FR-028, Constitution Principle VI)
- [x] T049 [P] [US4] Create `src/components/Table/TableSortLabel.tsx` with `active: boolean`, `direction: 'asc'|'desc'`, `onPress`, `hideSortIcon` props; renders sort indicator arrow that rotates on direction change; set `accessibilityState={{ sorted: active ? direction : false }}` on the pressable trigger; wrap in `React.memo` (FR-028, Constitution Principle V, Principle VI)
- [x] T050 [P] [US4] Create `src/components/Table/TablePagination.tsx` with `count`, `page`, `rowsPerPage`, `onPageChange: (page: number) => void`, `rowsPerPageOptions`, `showFirstButton`, `showLastButton`, `labelRowsPerPage`, `labelDisplayedRows`; add `// RN-DEVIATION: event arg dropped â€” no MouseEvent in RN` comment; wrap in `React.memo` (FR-030, Constitution Principle VI)
- [x] T051 [US4] Create `src/components/Table/index.ts` barrel-exporting all 9 Table components and their prop types

### Tests

- [x] T052 [P] [US4] Write unit tests in `tests/unit/components/AvatarGroup.test.tsx`: renders max=3 from 6 children, renders surplus Avatar with correct count, renderSurplus custom renderer, spacing variants (FR-038)
- [x] T053 [P] [US4] Write unit tests in `tests/unit/components/Dialog.test.tsx`: `open`/`onClose` aliases, onClose reason `'backdropPress'`/`'hardwareBackPress'`, `fullScreen` fills viewport, `DialogTitle`/`DialogContent`/`DialogActions` render inside Dialog, `dividers` renders Divider (FR-038, SC-005)
- [x] T054 [P] [US4] Write unit tests in `tests/unit/components/Table.test.tsx`: TableContainer wraps ScrollView, stickyHeader positions TableHead, TableRow selected/hover states, TableCell accessibilityRole by variant, TableSortLabel direction arrow, TablePagination page navigation (FR-038, SC-005)
- [x] T067 [P] [US4] Write unit tests in `tests/unit/components/Card.test.tsx`: render CardHeader with all props (avatar, title, subheader, action), CardMedia with image URI, CardContent renders children, CardActions with/without `disableSpacing`, CardActionArea `onPress` triggers correctly; assert 48dp minimum touch target for `CardActionArea`; mock react-native `Image` for CardMedia (FR-038, SC-005)

**Checkpoint**: MUI "Basic Card" and "Confirmation Dialog" examples compile and render in mui-native with â‰¤ 5 prop changes

---

## Phase 7: User Story 5 â€” Exportable Transition Utilities (Priority: P3)

**Goal**: Confirm (or fix) that all 5 transition components are public API exports with correct prop types.

**Independent Test**: Write `import { Fade, Grow, Slide, Zoom, Collapse } from 'mui-native'` â€” TypeScript strict mode resolves all 5. `<Fade in={show}><View /></Fade>` animates opacity on toggle.

### Implementation

- [x] T055 [US5] Audit `src/index.ts` for `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse` exports; audit each component's `types.ts` for `in: boolean`, `timeout: number | { enter: number; exit: number }`, `children: ReactElement` props, and `Slide` for `direction: 'down'|'left'|'right'|'up'`; add any missing prop declarations or exports; **record outcome** in commit message: `"T055: N export(s)/prop(s) added"` or `"T055: verified â€” no changes required"` (FR-031, FR-032, FR-033, SC-004)

**Checkpoint**: All 5 transitions importable by name from `mui-native` with no TypeScript strict-mode errors

---

## Phase 8: User Story 6 â€” Typography MD2 Variant Vocabulary (Priority: P3)

**Goal**: Accept all 13 MUI MD2 variant names as valid `Typography`/`Text` `variant` values; resolve to MD3 equivalents at render time.

**Independent Test**: `<Typography variant="body1">` and `<Typography variant="h4">` render with correct MD3-equivalent styling. TypeScript accepts all 13 MD2 names alongside all 15 MD3 names.

### Implementation

- [x] T056 [US6] Widen `variant` prop in `src/components/Text/types.ts` from `TypeScaleVariant` to `TypeScaleVariant | TypographyMD2Variant` (both types imported from `src/tokens/typography.ts`) (FR-034)
- [x] T057 [US6] Update `Text.tsx` render path: before `theme.typography[variant]` lookup, resolve MD2 variant â†’ `typographyVariantMap[variant] ?? variant`; import `typographyVariantMap` from `src/tokens/typography.ts` (FR-035)

### Tests

- [x] T058 [P] [US6] Write unit tests in `tests/unit/components/Typography.test.tsx`: all 13 MD2 names render (snapshot); `body1` and `bodyMedium` produce identical output; `h4` uses `headlineLarge` styles; TypeScript accepts MD2 names without errors. Write unit tests in `tests/unit/tokens/typography.test.ts`: `typographyVariantMap` has exactly 13 entries; all values are valid `TypeScaleVariant` keys (SC-006, FR-038)

**Checkpoint**: Developers can use MD2 typography names; MD3 names remain the default

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Top-level public API exports, TypeScript compilation gating, and coverage verification.

- [x] T059 [P] Update `src/index.ts` to add exports: `AvatarGroup`, `AvatarGroupProps`, `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions` (FR-021, FR-025)
- [x] T060 [P] Update `src/index.ts` to add exports: `TableContainer`, `Table`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableSortLabel`, `TablePagination` and their prop types (FR-028)
- [x] T061 [P] Update `src/index.ts` to add exports: `TypographyMD2Variant`, `typographyVariantMap` (FR-035)
- [x] T062 Verify FR-037: check **all 19 new components** (`AvatarGroup`, `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`, `TableContainer`, `Table`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableSortLabel`, `TablePagination`) accept `sx`, `slots`, `slotProps`, `size`, `color` from the Feature 009 infrastructure; add props to `types.ts` for any that are missing (FR-037)
- [x] T063 Run `npx tsc --noEmit --project tsconfig.build.json` and fix all TypeScript strict-mode errors; zero `any` in public-facing prop types (FR-039, SC-008)
- [x] T064 After T063 builds to `lib/`, run `node -e "const idx = require('./lib/index.js'); console.log('Exported symbols:', Object.keys(idx).length)"` to verify â‰¥ 93 exported symbols; alternatively use `grep -c "^export " src/index.ts` as a quick source-level approximation; log actual count against SC-007 target (SC-007)
- [x] T065 [P] Verify `docs/rn-deviations.md` (created in T003) covers minimum 5 entries: `TransferList`, `TextareaAutosize`, `Popper`, `Portal`, `NoSsr`; add any missing entries; add entry `"Typography (public) â†’ Text (internal): source component is src/components/Text/ but exported as both Text and Typography for MUI naming compatibility"` (FR-036, SC-009)
- [x] T066 Update `src/index.ts` export comment block and `README.md` component table to reflect the new components added in this feature; note in README that the `Text` source component is accessible as both `Text` and `Typography` for MUI Web naming compatibility

---

## Dependencies (Story Completion Order)

```
T001 (gate)
  â””â”€ T002, T003 (foundational â€” parallel)
       â”œâ”€ T004â€“T014 (US1 â€” all T004â€“T013 parallel; T014 depends on T004â€“T013)
       â”œâ”€ T015â€“T019 (US2 â€” T015â†’T016â†’T017 sequential; T018, T019 parallel)
       â”œâ”€ T020â€“T025 (US3 â€” T020â†’T021â†’T022â†’T023â†’T024 sequential; T025 parallel)
       â”œâ”€ T026â€“T054 (US4 â€” sub-groups independent; see below)
       â”œâ”€ T055       (US5 â€” independent of US1â€“US4)
       â””â”€ T056â€“T058 (US6 â€” T056â†’T057â†’T058; depends on T002)

US4 Internal order:
  T026â€“T027â€“T028 (AvatarGroup: T027 depends on T026)
  T029â€“T033 parallel â†’ T034 (Card sub-comps: T034 depends on T029â€“T033)
  T035â€“T040 parallel â†’ T041 (Dialog: T041 depends on T035â€“T040 and T004)
  T042â€“T050 parallel â†’ T051 (Table: T051 depends on T042â€“T050)
  T052â€“T054, T067 parallel (US4 Tests: T052â†’T028, T053â†’T041, T054â†’T051, T067â†’T034)
  T068 [P] (US2 LinearProgress test: depends on T018, parallel to T019)

Polish:
  T059â€“T062 (depend on all story phases complete)
    â””â”€ T063 â†’ T064 â†’ T065 â†’ T066
```

---

## Parallel Execution Examples

### Batch A (after T002): All of US1 in parallel
```
T004 || T005 || T006 || T007 || T008 || T009 || T010 || T011 || T012 || T013
```

### Batch B (after T002): US2 + US3 setup in parallel
```
T015 (US2 start) || T020 (US3 start)
```

### Batch C (after T028): All Card + Dialog + Table new files in parallel
```
T029 || T030 || T031 || T032 || T033 || T035 || T036 ||
T037 || T038 || T039 || T040 || T042 || T043 || T044 ||
T045 || T046 || T047 || T048 || T049 || T050
```

### Batch D (after all stories complete): Polish in parallel
```
T059 || T060 || T061 || T062 || T065
```

---

## Implementation Strategy

**MVP Scope (deliver first)**: Phase 3 (US1 â€” prop aliases) + Phase 9 exports.
This alone satisfies SC-001 and is independently shippable in a day.

**Next increment**: Phase 4 (US2 â€” CircularProgress SVG arc) â€” highest visual impact.

**Full delivery order**: P1 phases (US1, US2) â†’ P2 phases (US3, US4) â†’ P3 phases (US5, US6) â†’ Polish.

---

## Summary

| Phase | Story | Tasks | Key Output |
|-------|-------|-------|------------|
| 1 â€” Setup | â€” | T001 | 009 gate confirmed |
| 2 â€” Foundational | â€” | T002â€“T003 | `typographyVariantMap` token + RN-deviation docs |
| 3 â€” US1 | Familiar API (P1) | T004â€“T014 | 10 aliased prop pairs across 7 components |
| 4 â€” US2 | Progress Indicators (P1) | T015â€“T019, T068 | CircularProgress SVG arc + LinearProgress |
| 5 â€” US3 | TextField (P2) | T020â€“T025 | `standard` variant + multiline + fullWidth + required + select |
| 6 â€” US4 | Sub-Components (P2) | T026â€“T054, T067 | AvatarGroup + 5 Card + 4 Dialog + 9 Table components |
| 7 â€” US5 | Transitions (P3) | T055 | 5 transitions verified + exported |
| 8 â€” US6 | Typography (P3) | T056â€“T058 | 13 MD2 variant aliases |
| 9 â€” Polish | â€” | T059â€“T066 | src/index.ts exports + TS compile gate |

**Total tasks**: 68 | **Parallel opportunities**: 46 tasks marked [P]
**Suggested MVP**: Phase 3 only (T004â€“T014) â€” fully independent, highest adoption impact
