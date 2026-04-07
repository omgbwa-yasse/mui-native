# Tasks: 009 — MUI API Alignment (Global Config, Size, Color, sx, Slots)

**Input**: Design documents from `/specs/009-mui-config-sync/`
**Branch**: `009-mui-config-sync`
**Date**: 2026-04-05
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (touches different files, no incomplete dependencies)
- **[US1–US5]**: User story label from spec.md

---

## Component Batches (from actual `ls src/components/`)

| Batch | Components (count) |
|---|---|
| **A — Actions** | Button, ButtonGroup, FAB, IconButton, SegmentedButtons, SpeedDial, ToggleButton (7) |
| **B — Inputs-A** | Checkbox, CodeInput, RadioButton, Slider, Switch, TouchableRipple (6) |
| **C — Inputs-B** | Autocomplete, NumberField, Searchbar, Select, TextField (5) |
| **D — Inputs-C** | DatePicker, DateTimePicker, Rating, TimePicker, TransferList (5) |
| **E — Feedback** | Alert, Backdrop, Badge, Banner, BottomSheet, CircularProgress, Dialog, LinearProgress, Menu, Modal, Popover, Popper, Skeleton, Snackbar, Tooltip (15) |
| **F — Navigation** | AppBar, Breadcrumbs, Drawer, NavigationBar, Pagination, Stepper, Tabs, TreeView (8) |
| **G — Display** | Accordion, Avatar, Card, Charts, Chip, Collapse, DataGrid, DataTable, Divider, Fade, Grid, Grow, ImageList, Link, List, Masonry, Paper, Portal, Slide, Stack, Text, Timeline, Zoom (23) |
| **H — Utility** | ActivityIndicator, Box, Container, HelperText, HumanizationScoreBar, Icon, InvitationStatusBadge, MaterialIcon, WorkerAgentRow (9) |

**Total**: 78 components across 8 batches.
> Note: `ToggleButtonGroup` is co-located with `ToggleButton` in `src/components/ToggleButton/` (not a separate directory). `AvatarGroup`, `RadioGroup`, `ImageListItem`, `ImageListItemBar` may be exported from their parent directory rather than having a separate folder. Resolve at implementation time.
> Note: `CodeInput` in Batch B is the renamed form of `OTPInput` from the plan Phase 4 list — they refer to the same component.

---

## Slots-enabled (US5 scope — 15 composite components)

Batch C: Autocomplete, Select, TextField  
Batch E: Alert, Dialog, Snackbar  
Batch F: AppBar, Breadcrumbs, NavigationBar, Stepper, Tabs  
Batch G: Card, Chip, List, Timeline

---

## Phase 1: Setup

**Purpose**: Verify toolchain and establish implementation baseline

- [X] T001 Run `npm run typecheck` from repo root; confirm tsc exits 0; run `Get-ChildItem src/components/ -Directory | Measure-Object` to confirm 78 component directories; document any discrepancy in a comment before T002

---

## Phase 2: Foundation (Blocking Prerequisites for ALL User Stories)

**Purpose**: Create all new source files and extend all existing type definitions. NO component-level changes in this phase — only infrastructure. Every subsequent phase depends on this phase being 100% complete.

**⚠️ CRITICAL**: Phases 3–7 cannot begin until T002–T016 are all complete and T017 (typecheck gate) passes.

- [X] T002 [P] Extend `ColorScheme` interface in `src/tokens/colors.ts`: add 12 roles (`success`, `onSuccess`, `successContainer`, `onSuccessContainer`, `warning`, `onWarning`, `warningContainer`, `onWarningContainer`, `info`, `onInfo`, `infoContainer`, `onInfoContainer`); add entries to `baseLightColors` and `baseDarkColors` with MUI v6-derived baseline values from `research.md` (D4)
- [X] T003 [P] Create `src/tokens/size.ts`: export `SizeProp = 'small' | 'medium' | 'large'`; export `SizeTokens` interface (`height`, `paddingH`, `paddingV`, `iconSize`, `touchTarget`, `fontSizeScale`); export `SIZE_SCALE` constant with small/medium/large rows per `data-model.md` Entity 2
- [X] T004 Update `src/tokens/index.ts`: add `export { SizeProp, SIZE_SCALE, SizeTokens } from './size'`
- [X] T005 [P] Create `src/types/shared.ts`: export `ColorProp` union (`'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'`); export `SxObject` (flat token shorthand record); export `SxProps = SxObject | ReadonlyArray<SxObject | false | undefined>`; export `SlotPropsConfig<TSlots>` generic interface; export `isColorProp(value: unknown): value is ColorProp` type guard; export `colorRoleMap` constant mapping each ColorProp to its colorScheme key pair — per `data-model.md` Entities 3–10
- [X] T006 [P] Create `src/theme/componentsDefs.ts`: import all 78 component prop types from `src/components/{Name}/types.ts`; define `ComponentPropsMap` interface (78 entries, keys are unprefixed component names, values are their `Props` types); define `ComponentOverride<TProps>` interface (`defaultProps?: Partial<TProps>`, `styleOverrides?: Record<string, object>`); define `ComponentsConfig = { [K in keyof ComponentPropsMap]?: ComponentOverride<ComponentPropsMap[K]> }` — per `contracts/theme-components-api.md`
- [X] T007 Extend `src/theme/types.ts` `Theme` interface: add `components?: ComponentsConfig`; add necessary import from `./componentsDefs`
- [X] T008 Update `src/theme/createTheme.ts` `CreateThemeOptions` interface: add `components?: ComponentsConfig`; update `createTheme()` implementation to store `options.components` verbatim on the returned `Theme` object (no deep-merge at createTheme time — per research D2)
- [X] T009 Update `src/theme/index.ts`: export `ComponentsConfig`, `ComponentOverride`, `ComponentPropsMap` from `./componentsDefs`
- [X] T010 [P] Create `src/hooks/useComponentDefaults.ts`: signature `useComponentDefaults<K extends keyof ComponentPropsMap>(name: K, instanceProps: ComponentPropsMap[K]): ComponentPropsMap[K]`; read `useTheme().components?.[name]?.defaultProps`; merge: spread defaultProps first, then overwrite with each defined (non-undefined) instance prop value; return `instanceProps` unchanged when `theme.components` has no entry for `name` — per `contracts/theme-components-api.md`
- [X] T011 [P] Create `src/hooks/useSx.ts`: accept `(sx: SxProps | undefined, theme: Theme): ViewStyle | undefined`; return `undefined` immediately when `sx` is falsy (zero allocation — research D5); flatten array notation (filter falsy, reduce left-to-right); expand shorthand keys to RN style keys per `contracts/sx-props-api.md` mapping table; resolve responsive breakpoints using `useWindowDimensions().width` + xs/sm/md/lg/xl table; resolve color aliases via `isColorProp` + `colorRoleMap` → `theme.colorScheme[role]`; memoize via `useMemo` depending on `[sx, viewportWidth]`; silently ignore CSS-only properties (pseudo-selectors, `@media` strings) with `// RN-DEVIATION:` comment — per `contracts/sx-props-api.md`
- [X] T012 [P] Create `src/hooks/useColorRole.ts`: signature `useColorRole(color: ColorProp | undefined): { bg: string; fg: string; container: string; onContainer: string }`; look up `color ?? 'primary'` in `colorRoleMap`; read four role values from `useTheme().colorScheme`; return the four strings — per `contracts/component-props-api.md`
- [X] T013 Update `src/hooks/index.ts`: add exports for `useComponentDefaults`, `useSx`, `useColorRole`
- [X] T014 Update `src/index.ts` public API: add `export { SizeProp, ColorProp, SxProps, SlotPropsConfig } from './types/shared'`
- [X] T015 [P] Create `src/components/ButtonGroup/SizeContext.ts`: export `SizeContext` (React.Context with default `'medium'`), `SizeProvider` component, `useGroupSize()` hook — this context is consumed by `Button` and `ToggleButton` inside group components
- [X] T016 [P] Create `src/components/Tabs/SizeContext.ts`: export `SizeContext`, `SizeProvider`, `useGroupSize()` for Tab children — same pattern as T015
- [X] T017 Run `tsc --noEmit` from repo root; all Foundation files must compile with 0 errors before any Phase 3+ work begins

**Checkpoint**: Foundation ready — all 78 component modification phases can now begin in parallel

---

## Phase 3: User Story 1 — Global Component Config via `theme.components` (P1) 🎯 MVP

**Goal**: Every component calls `useComponentDefaults` at render time so that `theme.components[Name].defaultProps` silently overrides instance-absent props.

**Independent Test (US1)**: Create `ThemeProvider` with `components: { Button: { defaultProps: { variant: 'tonal' } } }`. Render `<Button label="Test" />` with no `variant` prop. Confirm it renders with tonal style — verifying spec acceptance scenario 1.

- [X] T018 [P] [US1] In each component of **Batch A** (Button, ButtonGroup, FAB, IconButton, SegmentedButtons, SpeedDial, ToggleButton): in `src/components/{Name}/{Name}.tsx`, destructure props after calling `const props = useComponentDefaults('{Name}', rawProps)` as the first line inside the component function; rename incoming parameter to `rawProps`; ensure all downstream prop references use the merged `props`
- [X] T019 [P] [US1] Apply `useComponentDefaults` pattern to **Batch B** (Checkbox, CodeInput, RadioButton, Slider, Switch, TouchableRipple) in `src/components/{Name}/{Name}.tsx`
- [X] T020 [P] [US1] Apply `useComponentDefaults` pattern to **Batch C** (Autocomplete, NumberField, Searchbar, Select, TextField) in `src/components/{Name}/{Name}.tsx`
- [X] T021 [P] [US1] Apply `useComponentDefaults` pattern to **Batch D** (DatePicker, DateTimePicker, Rating, TimePicker, TransferList) in `src/components/{Name}/{Name}.tsx`
- [X] T022 [P] [US1] Apply `useComponentDefaults` pattern to **Batch E** (Alert, Backdrop, Badge, Banner, BottomSheet, CircularProgress, Dialog, LinearProgress, Menu, Modal, Popover, Popper, Skeleton, Snackbar, Tooltip) in `src/components/{Name}/{Name}.tsx`
- [X] T023 [P] [US1] Apply `useComponentDefaults` pattern to **Batch F** (AppBar, Breadcrumbs, Drawer, NavigationBar, Pagination, Stepper, Tabs, TreeView) in `src/components/{Name}/{Name}.tsx`
- [X] T024 [P] [US1] Apply `useComponentDefaults` pattern to **Batch G** (Accordion, Avatar, Card, Charts, Chip, Collapse, DataGrid, DataTable, Divider, Fade, Grid, Grow, ImageList, Link, List, Masonry, Paper, Portal, Slide, Stack, Text, Timeline, Zoom) in `src/components/{Name}/{Name}.tsx`
- [X] T025 [P] [US1] Apply `useComponentDefaults` pattern to **Batch H** (ActivityIndicator, Box, Container, HelperText, HumanizationScoreBar, Icon, InvitationStatusBadge, MaterialIcon, WorkerAgentRow) in `src/components/{Name}/{Name}.tsx`
- [X] T026 [US1] Run `tsc --noEmit`; verify US1 independent test manually (ThemeProvider with Button defaultProps → tonal renders without explicit prop)

**Checkpoint**: US1 fully functional — any component picks up theme-level defaultProps at render time

---

## Phase 4: User Story 2 — Uniform `size` Prop (P2)

**Goal**: All 78 components accept `size?: SizeProp` (default `'medium'`). ButtonGroup, ToggleButton (group), and Tabs propagate `size` to children via `SizeContext`. Visual scaling uses `SIZE_SCALE[size]`.

**Independent Test (US2)**: Render `<Button size="small" label="X" />` and `<Button size="large" label="X" />` side by side. Verify the small variant has visibly reduced height, padding, and font relative to large.

- [X] T027 [US2] Add `SizeContext` propagation to group components: in `src/components/ButtonGroup/ButtonGroup.tsx` wrap children with `<SizeContext.Provider value={size ?? 'medium'}>` (SizeContext from T015); in `src/components/ToggleButton/ToggleButton.tsx` (`ToggleButtonGroup` is co-located here — add same pattern); in `src/components/Tabs/Tabs.tsx` wrap with Tabs `SizeContext.Provider` (T016)
- [X] T028 [P] [US2] Add `size?: SizeProp` to **Batch A** `types.ts` and implement `SIZE_SCALE[size]` usage in `{Name}.tsx`: Button/IconButton/FAB read `useGroupSize() ?? size ?? 'medium'` to inherit from ButtonGroup context; apply `SIZE_SCALE[resolvedSize].height`, `paddingH`, `paddingV`, `fontSizeScale`, `touchTarget` to root styles and text styles; ToggleButton reads Tabs `SizeContext` for tab context — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T029 [P] [US2] Add `size?: SizeProp` to **Batch B** with per-category overrides: Checkbox/Switch/RadioButton use component-specific size overrides (16/20/24 per `data-model.md`); **TouchTarget always clamped ≥48dp (constitution Principle V — WCAG 2.1 AA)**; Slider uses track heights 2/4/6 + thumb 14/20/24 — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T030 [P] [US2] Add `size?: SizeProp` to **Batch C** with input-field overrides: TextField/Select/Autocomplete/NumberField/Searchbar use input height overrides 40/56/64 (small/medium/large) instead of default SIZE_SCALE heights — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T031 [P] [US2] Add `size?: SizeProp` to **Batch D** (DatePicker, DateTimePicker, Rating, TimePicker, TransferList); Rating uses star icon sizes from `SIZE_SCALE[size].iconSize` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T032 [P] [US2] Add `size?: SizeProp` to **Batch E** (15 components); Badge/Chip/Avatar use per-category dimension overrides from `data-model.md` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T033 [P] [US2] Add `size?: SizeProp` to **Batch F**; Tabs passes `size` via TAbsSizeContext (T016) so individual Tab children inherit without explicit prop — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T034 [P] [US2] Add `size?: SizeProp` to **Batch G**; Avatar uses diameter overrides 24/40/56; Chip uses height overrides 24/32/40 — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T035 [P] [US2] Add `size?: SizeProp` to **Batch H** (ActivityIndicator, Box, Container, HelperText, HumanizationScoreBar, Icon, InvitationStatusBadge, MaterialIcon, WorkerAgentRow); prop is accepted but may be a visual no-op for purely layout/utility components (still satisfies FR-002a) — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T036 [US2] Run `tsc --noEmit`; verify US2 independent test (small vs large Button rendering)

**Checkpoint**: US2 fully functional — all 78 components respond to `size` prop with visually consistent scaling

---

## Phase 5: User Story 3 — Semantic `color` Prop (P3)

**Goal**: All 78 components accept `color?: ColorProp` (default `'primary'`). Components use `useColorRole(color)` to read `{bg, fg, container, onContainer}` from `theme.colorScheme`. The 12 new color roles are already available in `colorScheme` from Foundation (T002).

**Independent Test (US3)**: Render `<Button color="error" label="Delete" />`. Verify it uses `colorScheme.error` / `colorScheme.onError` (red tones) rather than the primary color.

- [X] T037 [P] [US3] Add `color?: ColorProp` to **Batch A** types + call `const { bg, fg } = useColorRole(color)` in `{Name}.tsx`; replace hardcoded `colorScheme.primary`/`colorScheme.onPrimary` references with `bg`/`fg`; update container/onContainer usage similarly — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T038 [P] [US3] Add `color?: ColorProp` to **Batch B** and wire `useColorRole` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T039 [P] [US3] Add `color?: ColorProp` to **Batch C** and wire `useColorRole` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T040 [P] [US3] Add `color?: ColorProp` to **Batch D** and wire `useColorRole` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T041 [P] [US3] Add `color?: ColorProp` to **Batch E** and wire `useColorRole`; CircularProgress/LinearProgress use `bg` for track color, `fg` for indicator; Alert uses `container`/`onContainer` for background/text semantics — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T042 [P] [US3] Add `color?: ColorProp` to **Batch F** and wire `useColorRole` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T043 [P] [US3] Add `color?: ColorProp` to **Batch G** and wire `useColorRole`; purely visual components (Divider, Fade, Grow, Zoom) accept prop but may be a visual no-op where no accent color exists — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T044 [P] [US3] Add `color?: ColorProp` to **Batch H** and wire `useColorRole`; Icon/MaterialIcon use `fg` for icon color — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T045 [US3] Run `tsc --noEmit`; verify US3 independent test (Button color="error" renders in error colors); verify `color="success"` and `color="warning"` use the new 12-role extension

**Checkpoint**: US3 fully functional — all 78 components respond correctly to all 7 semantic color values

---

## Phase 6: User Story 4 — `sx` Prop for Inline Token Overrides (P4)

**Goal**: All 78 components accept `sx?: SxProps`. `useSx(sx, theme)` resolves shorthand spacing/color/layout keys to an RN style object. Applied style order: `styleOverrides < sx < style`. Zero overhead when prop is absent.

**Independent Test (US4)**: Render `<Button sx={{ mt: 2, px: 3 }} label="Save" />`. Verify top margin = 8dp (`theme.spacing[2]`) and horizontal padding = 12dp (`theme.spacing[3]`) — spec acceptance scenario 1.

- [X] T046 [P] [US4] Add `sx?: SxProps` to **Batch A** types; in `{Name}.tsx` call `const sxStyle = useSx(sx, theme)` and apply in style chain as `[baseStyle, sxStyle, style]`; style prop position ensures `style` overrides sx — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T047 [P] [US4] Add `sx?: SxProps` to **Batch B** and wire `useSx` into style chain — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T048 [P] [US4] Add `sx?: SxProps` to **Batch C** and wire `useSx`; TextField/Select/Autocomplete apply sx to root container only — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T049 [P] [US4] Add `sx?: SxProps` to **Batch D** and wire `useSx` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T050 [P] [US4] Add `sx?: SxProps` to **Batch E** and wire `useSx` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T051 [P] [US4] Add `sx?: SxProps` to **Batch F** and wire `useSx` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T052 [P] [US4] Add `sx?: SxProps` to **Batch G** and wire `useSx`; Stack/Box/Grid/Container apply sx to their own root View — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T053 [P] [US4] Add `sx?: SxProps` to **Batch H** and wire `useSx` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T054 [US4] Run `tsc --noEmit`; verify US4 independent test (`sx={{ mt: 2, px: 3 }}` → correct spacing); verify `sx` array syntax and responsive breakpoints per quickstart.md P4 example

**Checkpoint**: US4 fully functional — all 78 components support inline token-based style overrides with zero overhead when sx is absent

---

## Phase 7: User Story 5 — `slots` and `slotProps` (P5)

**Goal**: 15 composite components accept `slots?: Partial<SlotMap>` and `slotProps?: Partial<SlotPropsMap>` for sub-component replacement and prop forwarding. Slot interfaces are fully typed per component.

**Independent Test (US5)**: Render `<Chip slots={{ deleteIcon: MyCustomIcon }} label="Tag" onDelete={() => {}} />`. Verify render output shows `MyCustomIcon` element instead of the default cancel icon — spec acceptance scenario 1.

- [X] T055 [P] [US5] Add slots/slotProps to **Batch C composites** (Autocomplete, Select, TextField): define `AutocompleteSlots`, `SelectSlots`, `TextFieldSlots` interfaces in respective `types.ts`; extend props interface with `SlotPropsConfig<TSlots>`; in `{Name}.tsx` resolve each slot as `const Root = slots?.Root ?? DefaultRoot` and spread `slotProps?.root` onto it — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T056 [P] [US5] Add slots/slotProps to **Batch E composites** (Alert, Dialog, Snackbar): define `AlertSlots` (Icon, CloseButton), `DialogSlots` (Title, Content, Actions, CloseButton), `SnackbarSlots` (Content, CloseButton) interfaces; implement slot resolution — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T057 [P] [US5] Add slots/slotProps to **Batch F composites** (AppBar, Breadcrumbs, NavigationBar, Stepper, Tabs): define per-component slot interfaces; implement slot resolution; Stepper slots cover `StepIcon` and `StepConnector`; Tabs slots cover `TabIndicator` — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T058 [P] [US5] Add slots/slotProps to **Batch G composites** (Card, Chip, List, Timeline): define `ChipSlots` (Root, Label, Avatar, DeleteIcon), `CardSlots` (Root, Header, Content, Actions, Media), `ListSlots` (Root, Item), `TimelineSlots` (Root, Item, Connector, Dot) interfaces; implement slot resolution — in `src/components/{Name}/types.ts` + `{Name}.tsx`
- [X] T059 [US5] Run `tsc --noEmit`; verify US5 independent test (Chip with custom deleteIcon slot); verify TextField `slotProps.input` forwards accessibilityLabel per spec acceptance scenario 2

**Checkpoint**: US5 fully functional — 15 composite components support full slot customization with type-safe interfaces

---

## Phase 8: Tests

**Purpose**: Unit-test all new hooks and tokens; integration-test the `theme.components` end-to-end flow. All test files are new; zero regressions on existing tests required.

- [X] T060 [P] Create `tests/unit/tokens/sizeTokens.test.ts`: verify `SIZE_SCALE.small.height === 32`, `SIZE_SCALE.medium.height === 40`, `SIZE_SCALE.large.height === 48`; **verify `SIZE_SCALE.small.touchTarget >= 48` and `SIZE_SCALE.medium.touchTarget >= 48` and `SIZE_SCALE.large.touchTarget >= 48`** (constitution Principle V); verify `fontSizeScale` values 0.85/1.0/1.15
- [X] T061 [P] Create `tests/unit/hooks/useColorRole.test.tsx`: verify each of the 7 `ColorProp` values maps to the correct 4 `colorScheme` keys; verify `undefined` input defaults to `'primary'`; verify no extra `useTheme()` calls are made when color is unchanged
- [X] T062 [P] Create `tests/unit/hooks/useComponentDefaults.test.tsx`: verify instance prop wins over `defaultProps` when both are defined; verify `defaultProps`-only value is used when instance prop is `undefined`; verify passthrough when `theme.components` has no entry for the component; verify no allocations/re-renders when called with unchanged inputs
- [X] T063 [P] Create `tests/unit/hooks/useSx.test.ts`: verify all spacing shorthand expansions (`mt`, `mb`, `mx`, `my`, `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`); verify color alias resolution (`color: 'primary'` → `theme.colorScheme.primary`); verify array flattening (last value wins); verify responsive breakpoint selection by mocking `useWindowDimensions`; verify `useSx(undefined, theme) === undefined` (zero allocation)
- [X] T064 Create `tests/integration/theme-components-config.test.tsx`: render `createTheme({ components: { Button: { defaultProps: { variant: 'tonal' } } } })` inside `ThemeProvider`; render `<Button label="Test" />` with no explicit `variant`; assert component displays tonal styling (simulate spec acceptance scenario 1); assert instance prop still overrides defaultProps (spec scenario 3)
- [X] T065 Run `npm test`; confirm all new tests pass; confirm coverage ≥ 90% on `useComponentDefaults`, `useSx`, `useColorRole`; confirm 0 regressions on pre-existing tests
- [X] T066 Run `tsc --noEmit` across the full project (library root + `apps/showcase`); confirm strict-mode 0 errors

---

## Phase 8b: Pre-Polish Verification

**Purpose**: Reconcile component coverage and validate visual regression before adding showcase examples.

- [X] T066a Run `Get-ChildItem src/components/ -Directory | Select-Object Name` and diff the result against the Batch A–H component lists above; create one-line parallel tasks for any discovered components not covered in Batches A–H (addresses G1 Phase 10 coverage gap). **DONE — reconciliation confirmed clean: all 78 src/components/ directories match Batch A–H exactly; no gaps found; no additional tasks required.**
- [ ] T066b Add Jest snapshot tests for `Button`, `TextField`, and `Chip` rendered **without** any of the new optional props (`size`, `color`, `sx`, `slots`, `slotProps`); assert snapshot is identical to the pre-feature baseline and confirm SC-007 (addresses U1 — no visual regression check existed).

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Add showcase examples for all new props; final build verification.

- [X] T067 [P] Add 3 showcase examples per component for **Batch A** (Button, ButtonGroup, FAB, IconButton, SegmentedButtons, SpeedDial, ToggleButton) in `apps/showcase/src/`: one size variation example (`size="small"` / `size="large"`), one color variation example (`color="success"` / `color="error"`), one sx composition example (`sx={{ mt: 2, px: 3 }}`)
- [X] T068 [P] Add 3 showcase examples per component for **Batches B+C** (Checkbox, CodeInput, RadioButton, Slider, Switch, TouchableRipple, Autocomplete, NumberField, Searchbar, Select, TextField) in `apps/showcase/src/`
- [X] T069 [P] Add 3 showcase examples per component for **Batches D+E** (DatePicker, DateTimePicker, Rating, TimePicker, TransferList, Alert, Backdrop, Badge, Banner, BottomSheet, CircularProgress, Dialog, LinearProgress, Menu, Modal, Popover, Popper, Skeleton, Snackbar, Tooltip) in `apps/showcase/src/`
- [X] T070 [P] Add 3 showcase examples per component for **Batches F+G+H** (all Navigation, Display, and Utility components) in `apps/showcase/src/`; for the 15 slot-enabled composites, add a 4th example showing a `slots`/`slotProps` customization
- [X] T071 Run `cd apps/showcase && npx react-native bundle --entry-file index.js --platform ios --dev false 2>&1`; confirm bundle succeeds with 0 TypeScript errors and 0 bundle warnings about missing exports

---

## Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundation: T002–T017)
        ├── Phase 3 (US1: T018–T026) ─┐
        ├── Phase 4 (US2: T027–T036) ─┤
        ├── Phase 5 (US3: T037–T045) ─┤─ all independent of each other
        ├── Phase 6 (US4: T046–T054) ─┤   but each must be sequentially
        └── Phase 7 (US5: T055–T059) ─┘   applied per component batch
              │
        Phase 8 (Tests: T060–T066)
              │
        Phase 9 (Polish: T067–T071)
```

**Within Phases 3–7**: All [P]-marked batch tasks are independent of each other and can run in parallel (they touch different component directories). The component files get modified once per user story phase — each phase adds a distinct prop layer.

**US3–US6 order**: Although US2/US3/US4 are independent (different props), the recommended implementation order is US1 → US2 → US3 → US4 → US5 to reduce file-open conflicts if running sequentially. A parallel agent can run all 5 story batches simultaneously with file-locking awareness.

---

## Parallel Execution Examples

### Example 1: Full parallel Foundation sprint
```
T002 ─── extends colors.ts
T003 ─── creates size.ts
T005 ─── creates shared.ts
T006 ─── creates componentsDefs.ts
T010 ─── creates useComponentDefaults.ts
T011 ─── creates useSx.ts
T012 ─── creates useColorRole.ts
T015 ─── creates ButtonGroup/SizeContext.ts
T016 ─── creates Tabs/SizeContext.ts
   └──→ T004/T007/T008/T009/T013/T014 (sequential exports/modifications)
          └──→ T017 tsc gate → Phases 3–7 unlock
```

### Example 2: Parallel component batch sprint (within any story phase)
```
T028 Batch A  ──┐
T029 Batch B  ──┤
T030 Batch C  ──┤─ all run in parallel
T031 Batch D  ──┤  (different src/components/* directories)
T032 Batch E  ──┤
T033 Batch F  ──┤
T034 Batch G  ──┤
T035 Batch H  ──┘
   └──→ T036 tsc + test gate
```

### Example 3: Parallel US story sprint (after Foundation)
```
Phase 3 Batches ──┐
Phase 4 Batches ──┤
Phase 5 Batches ──┤─ parallel across stories
Phase 6 Batches ──┤  (each adds a distinct prop; no merge conflicts
Phase 7 Batches ──┘   if agents use separate git worktrees or PRs)
```

---

## Implementation Strategy

### MVP Scope (Phase 1 + Phase 2 + Phase 3, Batch A only)

The minimum deliverable that proves the architecture is:
1. **T001** — toolchain verified
2. **T002–T017** — Foundation fully built (all types, all hooks, typecheck passes)
3. **T018** — `useComponentDefaults` integrated into Batch A (7 Action components) only
4. **T026** — verify Button theme defaultProps works end-to-end

This is a runnable, testable proof-of-concept in approximately 17 tasks. All subsequent phases extend the same pattern mechanically.

### Incremental delivery order

| Milestone | Tasks completed | User-visible result |
|---|---|---|
| M1: Foundation | T001–T017 | Library compiles; hooks available; no component changes yet |
| M2: US1 MVP | T018–T026 | Button + 6 Action components respond to theme defaultProps |
| M3: US1 full | T018–T026 (all batches) | All 78 components respond to theme defaultProps |
| M4: US2 | T027–T036 | All 78 components accept size=small/medium/large |
| M5: US3 | T037–T045 | All 78 components accept color=primary/error/success/… |
| M6: US4 | T046–T054 | All 78 components accept sx={{ mt: 2, … }} |
| M7: US5 | T055–T059 | 15 composites accept slots/slotProps |
| M8: Full | T060–T071 | Tests + showcase + final typecheck |

---

## Summary

| Category | Count |
|---|---|
| Total tasks | **71** |
| Phase 1 (Setup) | 1 |
| Phase 2 (Foundation) | 16 |
| Phase 3 (US1 — theme.components) | 9 |
| Phase 4 (US2 — size prop) | 10 |
| Phase 5 (US3 — color prop) | 9 |
| Phase 6 (US4 — sx prop) | 9 |
| Phase 7 (US5 — slots/slotProps) | 5 |
| Phase 8 (Tests) | 7 |
| Phase 9 (Polish) | 5 |
| Parallelizable [P] tasks | **52** |
| Sequential tasks | 19 |
| User Story phases | 5 (US1–US5, P1–P5 from spec.md) |
| Components covered | 78 (8 batches A–H) |
| Composite slot components (US5) | 15 |
| Suggested MVP scope | Phase 1 + Phase 2 + T018 + T026 (17 tasks) |
