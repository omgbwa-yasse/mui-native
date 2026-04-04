# Tasks: MUI Advanced Components (005)

**Input**: Design documents from `/specs/005-mui-advanced-components/`
**Branch**: `005-mui-advanced-components`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/components.contract.ts ✅ | quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.
**Note on tests**: No test tasks are generated — the feature specification does not request TDD or explicit test-first tasks. Tests are part of each story's acceptance criteria (SC-005) but are left to the implementer's discretion per story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel with other [P]-marked tasks in the same phase
- **[US1–US4]**: Maps to the user story that owns this implementation unit
- **No [Story] label**: Setup, Foundational, or Polish phase tasks (not story-specific)

---

## Phase 1: Setup

**Purpose**: Configure the package for the four new optional peer dependencies required by this feature.

- [X] T001 Add `@react-native-community/datetimepicker ≥ 8.0.0`, `react-native-gifted-charts ≥ 1.4.0`, and `react-native-svg ≥ 15.0.0` as optional peer dependencies with `peerDependenciesMeta` optional flags in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Scaffold the six new component directory barrels so TypeScript resolves imports throughout Phases 3–6 from day one. Each barrel is intentionally empty — implementations are added per story.

**⚠️ CRITICAL**: All Phase 3–6 stories can begin after Phase 1 + Phase 2 complete. Stories are independent of each other and may be worked in parallel.

- [X] T002 [P] Create empty barrel `src/components/DatePicker/index.ts` with a placeholder comment (`// Date Picker exports — populated in Phase 3`)
- [X] T003 [P] Create empty barrel `src/components/TimePicker/index.ts` with a placeholder comment
- [X] T004 [P] Create empty barrel `src/components/DateTimePicker/index.ts` with a placeholder comment
- [X] T005 [P] Create empty barrel `src/components/DataGrid/index.ts` with a placeholder comment
- [X] T006 [P] Create empty barrel `src/components/Charts/index.ts` with a placeholder comment
- [X] T007 [P] Create empty barrel `src/components/TreeView/index.ts` with a placeholder comment

**Checkpoint**: All six barrel stubs created — all four user stories can now begin in parallel.

---

## Phase 3: User Story 1 — Date & Time Picker Components (Priority: P1) 🎯 MVP

**Goal**: Deliver `LocalizationProvider`, `DatePicker`, `TimePicker`, and `DateTimePicker` components using `@react-native-community/datetimepicker` as the native picker engine behind a TextInput + Modal trigger pattern. Each picker must respect the configured date adapter and validation constraints.

**Independent Test**: Render `<DatePicker value={new Date()} onChange={fn} label="Birth date" />` inside `<LocalizationProvider dateAdapter={new IntlDateAdapter()}>`. Click the TextInput to open the calendar Modal. Select a date. Verify `onChange` receives the correct Date object. No other component from this feature is required.

**Covers**: FR-001 FR-002 FR-003 FR-004 FR-005 FR-006

### Implementation for User Story 1

- [X] T008 [P] [US1] Create `src/components/DatePicker/types.ts` — export `DateAdapter<TDate>`, `LocalizationProviderProps<TDate>`, `MaybeDate`, `DatePickerProps`, `PickerBaseProps`, `PickerValidationProps`, and `PickerSlots` interfaces; all props consistent with MUI X DatePicker API surface
- [X] T009 [P] [US1] Create `src/components/TimePicker/types.ts` — export `TimePickerProps` extending `PickerBaseProps` with `ampm`, `minTime`, `maxTime` props
- [X] T010 [P] [US1] Create `src/components/DateTimePicker/types.ts` — export `DateTimePickerProps` extending `PickerBaseProps` with `views: Array<'day'|'month'|'year'|'hours'|'minutes'|'seconds'>` and combined date+time validation props (FR-005)
- [X] T011 [US1] Implement `src/components/DatePicker/IntlDateAdapter.ts` — `DateAdapter<Date>` implementation backed by `Intl.DateTimeFormat`; methods: `date()`, `format()`, `isValid()`, `isBefore()`, `isAfter()`, `startOfDay()`, `addDays()`; no external date library required
- [X] T012 [US1] Implement `src/components/DatePicker/useLocalization.ts` — React hook that reads `LocalizationContext`; throws a descriptive error when called outside a `LocalizationProvider` tree (FR-002)
- [X] T013 [US1] Implement `src/components/DatePicker/LocalizationProvider.tsx` — React context provider accepting `dateAdapter` and `adapterLocale` props; exports both the component and the `LocalizationContext` type; registers provider in `src/components/DatePicker/index.ts` so it is re-exported per FR-002
- [X] T014 [US1] Implement `src/components/DatePicker/DatePicker.styles.ts` — theme-token-bound `StyleSheet` for TextInput trigger row, calendar icon touchable, Modal container, and date grid cells; no hardcoded colour or spacing literals
- [X] T015 [US1] Implement `src/components/DatePicker/DatePicker.tsx` — TextInput trigger that opens a Modal containing `@react-native-community/datetimepicker` in `date` mode; controlled + uncontrolled mode via `value`/`defaultValue`/`onChange`; applies `minDate`/`maxDate`/`disableFuture`/`disablePast` constraints; forwards `slots`/`slotProps` to TextInput and Modal sub-slots; `disabled` and `readOnly` states block Modal opening; `sx` prop normalised through theme system (FR-001 FR-003 FR-004 FR-006)
- [X] T016 [US1] Update `src/components/DatePicker/index.ts` — export `DatePicker`, `LocalizationProvider`, `useLocalization`, `IntlDateAdapter`, and all types from `types.ts`
- [X] T017 [US1] Implement `src/components/TimePicker/TimePicker.tsx` — TextInput trigger + Modal with `@react-native-community/datetimepicker` in `time` mode; `ampm` prop toggles 12h/24h display; applies `minTime`/`maxTime` constraints; same `disabled`/`readOnly`/`slots`/`sx` pattern as DatePicker (FR-001 FR-003 FR-006)
- [X] T018 [US1] Update `src/components/TimePicker/index.ts` — export `TimePicker` and all types
- [X] T019 [US1] Implement `src/components/DateTimePicker/DateTimePicker.tsx` — sequential two-step Modal on Android (date picker first, then time picker); single combined view on iOS; supports all views (`day`, `month`, `year`, `hours`, `minutes`, `seconds`) via `views` prop; delegates to `useLocalization()` for adapter; same `disabled`/`readOnly`/`sx`/`slots` API (FR-001 FR-004 FR-005 FR-006)
- [X] T020 [US1] Update `src/components/DateTimePicker/index.ts` — export `DateTimePicker` and all types
- [X] T020a [P] [US1] Write unit tests covering acceptance scenarios AS1–AS6 for User Story 1: `DatePicker` `onChange` fires, `disabled` blocks modal, `readOnly` blocks edits; `TimePicker` `ampm` toggles; `DateTimePicker` combined value; `LocalizationProvider` missing tree error — in `src/components/DatePicker/__tests__/DatePicker.test.tsx` (SC-005)

**Checkpoint**: US1 is complete and independently testable. `LocalizationProvider`, `DatePicker`, `TimePicker`, and `DateTimePicker` render, respond to user interaction, and call `onChange` correctly. DataGrid, Charts, and TreeView have not yet been implemented.

---

## Phase 4: User Story 2 — DataGrid Component (Priority: P2)

**Goal**: Deliver a `DataGrid` component backed by a virtualised `FlatList` that supports client-side sorting, filtering, pagination, row selection, inline cell/row editing, and a programmatic `apiRef`. Implemented as a new component separate from the existing `DataTable`.

**Independent Test**: Render `<DataGrid rows={hundredRows} columns={colDefs} paginationModel={{page:0, pageSize:10}} pageSizeOptions={[10,25]} />`. Verify 10 rows shown. Click a sortable column header twice and verify sort direction cycles. Change page and verify visible rows update. No dependency on Date Pickers, Charts, or TreeView.

**Covers**: FR-007 FR-008 FR-009 FR-010 FR-011 FR-012 FR-027

### Implementation for User Story 2

- [X] T021 [P] [US2] Create `src/components/DataGrid/types.ts` — export `GridColDef`, `GridRowData`, `GridRowId`, `GridSortItem`, `GridSortModel`, `GridFilterItem`, `GridFilterModel`, `GridPaginationModel`, `GridSelectionModel`, `GridApiRef`, `useGridApiRef` factory type, `GridDensity`, `GridEditMode`, and `DataGridProps` interfaces; include JSDoc `@RN-DEVIATION` notes for features unavailable in React Native (e.g., column resizing via pointer events)
- [X] T022 [P] [US2] Implement `src/components/DataGrid/DataGridCell.tsx` — display cell wrapped in `React.memo`; renders column `renderCell(params)` if defined, else coerces value to string; applies `density` padding; accepts `sx` prop for override; `accessibilityRole="cell"` (FR-007 FR-025 Principle V)
- [X] T023 [P] [US2] Implement `src/components/DataGrid/DataGridCellEditor.tsx` — edit-mode `TextInput` cell; numeric keyboard for `number` columns; calls parent `processRowUpdate(newRow, oldRow)` on `onSubmitEditing`; on rejection shows inline error text; on error calls `onProcessRowUpdateError` and reverts to `oldRow` (FR-011)
- [X] T024 [US2] Implement `src/components/DataGrid/DataGridRow.tsx` — single data row wrapped in `React.memo`; renders `DataGridCell` (or `DataGridCellEditor` when row/cell is in edit mode) for each column; prepends checkbox `TouchableOpacity` when `checkboxSelection={true}`; calls `onRowSelectionModelChange` on press; `accessibilityRole="row"` (FR-007 FR-010 FR-011 Principle V)
- [X] T025 [US2] Implement `src/components/DataGrid/DataGridHeaderRow.tsx` — column header row; sortable columns cycle `asc → desc → none` on `TouchableOpacity` press, displaying sort icon from existing `src/components/Icon/`; includes a filter-toggle `IconButton` per column when `filterable` is true on the column def; `accessibilityRole="columnheader"` (FR-008 FR-027)
- [X] T026 [US2] Implement `src/components/DataGrid/DataGridFilterRow.tsx` — collapsible row (one `TextInput` per filterable column); visible only when filter toggle is active; value changes dispatch `GridFilterModel` updates upward via `onFilterModelChange` callback; supports `string`, `number`, `date`, `boolean` field types (FR-027)
- [X] T027 [US2] Implement `src/components/DataGrid/DataGridPagination.tsx` — pagination bar with previous/next `IconButton` and current page indicator; `Select`-based page size picker using `pageSizeOptions`; buttons disabled at first/last page boundaries; calls `onPaginationModelChange` on change (FR-009)
- [X] T028 [US2] Implement `src/components/DataGrid/DataGrid.styles.ts` — theme-token-bound `StyleSheet` for grid container, header row, data row, cell, filter row, loading overlay, and empty state; no hardcoded colour literals (Principle II)
- [X] T029 [US2] Implement `src/components/DataGrid/DataGrid.tsx` — root component: holds `sortModel`, `filterModel`, `paginationModel`, `selectionModel`, and `editingState` in local or controlled state; applies client-side sort → filter → page slice pipeline to `rows` before passing to `FlatList`; uses `keyExtractor` and `getItemLayout` for viewport-based virtualisation; composes `DataGridHeaderRow` + `DataGridFilterRow` (via `ListHeaderComponent`) + `DataGridRow` items + `DataGridPagination` (via `ListFooterComponent`); exposes `GridApiRef` methods (`selectRow`, `setPage`, `setSortModel`) via `useImperativeHandle` on forwarded `apiRef` ref; renders loading overlay (ActivityIndicator) when `loading={true}`; renders empty state text when `rows.length === 0` (FR-007 through FR-012 FR-027 Principle VI)
- [X] T030 [US2] Update `src/components/DataGrid/index.ts` — export `DataGrid`, `useGridApiRef`, and all types from `types.ts`
- [X] T030a [P] [US2] Write unit tests covering acceptance scenarios AS1–AS6 for User Story 2: `DataGrid` renders rows, sort cycles asc→desc→none, checkbox selection, pagination, inline edit, loading overlay — in `src/components/DataGrid/__tests__/DataGrid.test.tsx` (SC-005)

**Checkpoint**: US2 is complete and independently testable. A `DataGrid` with 100 rows, sort, filter, pagination, row selection, and inline edit all function correctly. Date Pickers, Charts, and TreeView have not yet been implemented.

---

## Phase 5: User Story 3 — Chart Components (Priority: P3)

**Goal**: Deliver `BarChart` and `LineChart` components wrapping `react-native-gifted-charts` via a `seriesAdapter` transform layer that converts the MUI X `series` prop API to gifted-charts data format. Both charts include a `ChartLegend`, interactive tooltip, loading overlay, and animation control.

**Independent Test**: Render `<BarChart series={[{data:[10,20,30], label:'Sales'}]} height={300} />`. Verify three bars appear with proportional heights. Pass `loading={true}` and verify ActivityIndicator overlay appears. Pass `skipAnimation={true}` and verify bars render synchronously. No dependency on Date Pickers, DataGrid, or TreeView.

**Covers**: FR-013 FR-014 FR-015 FR-016 FR-017

### Implementation for User Story 3

- [X] T031 [P] [US3] Create `src/components/Charts/types.ts` — export `ChartSeriesItem` (data array of `number | null`, label, color, stack), `ChartAxisConfig` (id, scaleType, data, label), `ChartLegendEntry`, `ChartLoadingOverlayProps`, `BarChartProps`, `LineChartProps`; include `@RN-DEVIATION` notes for tooltip (touch vs. hover) and missing `onAxisClick` support
- [X] T032 [P] [US3] Implement `src/components/Charts/seriesAdapter.ts` — pure, side-effect-free transform: `MUI X series[].data → gifted-charts barData[]` and `lineData[]`; maps `null` to `0` for BarChart and emits `showFlag: false` for LineChart gaps; exports `adaptBarSeries(series: ChartSeriesItem[]): BarDataItem[]` and `adaptLineSeries(series: ChartSeriesItem[]): LineDataItem[]`
- [X] T033 [P] [US3] Implement `src/components/Charts/ChartLoadingOverlay.tsx` — `ActivityIndicator` centred in an absolutely-positioned `View` that fills the chart container; visible when `loading={true}`, hidden otherwise; uses `theme.palette.primary.main` for indicator color (FR-016)
- [X] T034 [US3] Implement `src/components/Charts/ChartLegend.tsx` — horizontal `ScrollView` row of color-swatch + label pairs; one entry per series item; hidden when `hideLegend={true}` or `series.length === 1`; swatch color sourced from `series[i].color` or `colors[i]` fallback to `theme.palette.primary.main` (FR-014)
- [X] T035 [US3] Implement `src/components/Charts/BarChart.tsx` — wrapper around `react-native-gifted-charts` `BarChart`; calls `adaptBarSeries(series)` to produce `barData`; binds theme primary color when no custom `colors` provided; forwards `xAxis`, `yAxis`, `height`, `width` props to gifted-charts equivalents; renders `ChartLegend` above chart and `ChartLoadingOverlay` over chart when `loading`; passes `isAnimated={!skipAnimation}` to gifted-charts; tooltip activated on bar `onPress` via gifted-charts `showTooltip`; `sx` prop applied to outer container `View` (FR-013 FR-014 FR-015 FR-016 FR-017 FR-025)
- [X] T036 [US3] Implement `src/components/Charts/LineChart.tsx` — same adapter+legend+overlay pattern as BarChart but uses gifted-charts `LineChart` with `adaptLineSeries`; line color from `colors` or theme; tooltip activated on data point press; supports `layout` by swapping x/y axis configuration (FR-013 FR-014 FR-015 FR-016 FR-017)
- [X] T037 [US3] Update `src/components/Charts/index.ts` — export `BarChart`, `LineChart`, `ChartLegend`, `ChartLoadingOverlay`, `seriesAdapter`, and all types
- [X] T037a [P] [US3] [Optional — deferred unless time permits] Export `ChartsContainer` from `src/components/Charts/index.ts` as a minimal composition wrapper for advanced chart layout use cases (FR-018)
- [X] T037b [P] [US3] Write unit tests covering acceptance scenarios AS1–AS6 for User Story 3: `BarChart` bars proportional, `LineChart` multi-series legend, loading overlay, horizontal layout, tooltip on press, `skipAnimation` — in `src/components/Charts/__tests__/Charts.test.tsx` (SC-005)

**Checkpoint**: US3 is complete and independently testable. `BarChart` and `LineChart` render from a `series` prop, show legend, show loading overlay, and accept chart size props. Date Pickers, DataGrid, and TreeView have not yet been implemented.

---

## Phase 6: User Story 4 — TreeView Component (Priority: P4)

**Goal**: Deliver `SimpleTreeView` and `TreeItem` components using a custom recursive implementation with Reanimated worklet animations for expand/collapse (no JS thread involvement). Supports multi-select, checkbox selection, keyboard navigation, and disabled items.

**Independent Test**: Render `<SimpleTreeView><TreeItem itemId="a" label="Parent"><TreeItem itemId="a1" label="Child 1" /><TreeItem itemId="a2" label="Child 2" /></TreeItem></SimpleTreeView>`. Click the Parent item. Verify children become visible with chevron rotation. Click again. Verify children collapse. No dependency on Date Pickers, DataGrid, or Charts.

**Covers**: FR-019 FR-020 FR-021 FR-022 FR-023

### Implementation for User Story 4

- [X] T038 [P] [US4] Create `src/components/TreeView/types.ts` — export `TreeViewItemId` (string alias), `TreeViewContextValue` (expandedItems, selectedItems, multiSelect, checkboxSelection, toggleExpand, toggleSelect, isDisabled), `SimpleTreeViewProps` (children, multiSelect, checkboxSelection, defaultExpandedItems, expandedItems, onExpandedItemsChange, selectedItems, onSelectedItemsChange, sx), `TreeItemProps` (itemId, label, disabled, children, sx); include `@RN-DEVIATION` note for keyboard navigation (Touch-first; keyboard events shimmed via `accessibilityActions`)
- [X] T039 [US4] Implement `src/components/TreeView/TreeItemRow.tsx` — `TouchableOpacity` row containing: animated chevron `Icon` (Reanimated `useSharedValue` rotating 0→90° on expand via `useDerivedValue` + `useAnimatedStyle`, runs on UI thread only); `label` `Text`; optional `Checkbox` when `checkboxSelection` is true; minimum 48 dp touch target height; calls `context.toggleExpand(itemId)` on press when children are present; calls `context.toggleSelect(itemId)` on label press; applies `opacity: 0.38` when `disabled`; checks `useReducedMotion()` and sets animation duration to 0 when true (FR-019 FR-022 Principle V Principle VI)
- [X] T040 [US4] Implement `src/components/TreeView/TreeItem.tsx` — recursive component; renders `TreeItemRow` followed by a Reanimated animated-height container (height animated from 0 to measured natural height using `useSharedValue` + `withTiming`); children container visible only when `context.expandedItems.includes(itemId)`; reads context from `TreeViewContext`; if item has no children, chevron is hidden and press toggles selection only; `disabled` prop forwarded to `TreeItemRow` (FR-019 FR-020 Principle VI)
- [X] T041 [US4] Implement `src/components/TreeView/SimpleTreeView.tsx` — creates and provides `TreeViewContext`; manages `expandedItems` (controlled via `expandedItems` prop or internal state via `defaultExpandedItems`); manages `selectedItems` (controlled or internal); `toggleExpand` adds/removes itemId from expandedItems and calls `onExpandedItemsChange`; `toggleSelect` respects `multiSelect` — single mode clears previous selection, multi mode adds/removes; calls `onSelectedItemsChange`; wraps children in a `ScrollView` with `accessibilityRole="list"` (FR-020 FR-021 FR-022 FR-023)
- [X] T042 [US4] Update `src/components/TreeView/index.ts` — export `SimpleTreeView`, `TreeItem`, and all types
- [X] T042a [P] [US4] Write unit tests covering acceptance scenarios AS1–AS6 for User Story 4: `SimpleTreeView` expand/collapse, single select, multi-select, checkbox selection, accessibility navigation, disabled item — in `src/components/TreeView/__tests__/TreeView.test.tsx` (SC-005)

**Checkpoint**: US4 is complete and independently testable. A three-level `SimpleTreeView` expands/collapses with animated chevrons, supports multi-select, checkbox selection, and disabled items. All four user stories are now individually complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Wire all four component groups into the library's public API, add Storybook stories per the quickstart examples, and run constitution compliance audits. This phase depends on all four story phases being complete.

- [X] T043 [P] Update `src/index.ts` — add tree-shakeable named re-exports for all new components: `DatePicker`, `TimePicker`, `DateTimePicker`, `LocalizationProvider`, `useLocalization`, `IntlDateAdapter` from `./components/DatePicker`; `DataGrid`, `useGridApiRef` from `./components/DataGrid`; `BarChart`, `LineChart`, `seriesAdapter` from `./components/Charts`; `SimpleTreeView`, `TreeItem` from `./components/TreeView` (FR-024)
- [X] T044 [P] Create Storybook story `stories/components/DatePicker.stories.tsx` — controlled `DatePicker` inside `LocalizationProvider`; also shows `TimePicker` and `DateTimePicker`; story uses `IntlDateAdapter`; follows quickstart.md example exactly (SC-001 FR-026)
- [X] T045 [P] Create Storybook story `stories/components/DataGrid.stories.tsx` — `DataGrid` with 20 generated rows, 4 columns (`id`, `name`, `status`, `score`), sort and pagination enabled, `checkboxSelection`, and a loading state toggle control (SC-002 FR-026)
- [X] T046 [P] Create Storybook story `stories/components/Charts.stories.tsx` — side-by-side `BarChart` and `LineChart` each with two series and legends visible; a loading state toggle control (SC-003 FR-026)
- [X] T047 [P] Create Storybook story `stories/components/TreeView.stories.tsx` — `SimpleTreeView` with three levels of nesting, `multiSelect={true}`, `checkboxSelection={true}`; a disabled leaf node (SC-004 FR-026)
- [X] T048 Token audit — run `grep -rn "#[0-9A-Fa-f]\{3,6\}\b" src/components/DatePicker src/components/TimePicker src/components/DateTimePicker src/components/DataGrid src/components/Charts src/components/TreeView` in terminal; fix any hardcoded colour literal found until grep returns zero hits (Principle II)
- [X] T049 Accessibility audit — verify every interactive element across all six new component directories has `accessibilityRole`, `accessibilityLabel`, and appropriate `accessibilityState`; confirm row height and `TouchableOpacity` `hitSlop` produce ≥ 48 dp touch targets in `DataGridRow`, `TreeItemRow`, and all picker triggers (Principle V SC-005)
- [X] T050 Reanimated worklet audit — open `src/components/TreeView/TreeItemRow.tsx` and `src/components/TreeView/TreeItem.tsx`; confirm the chevron rotation and height animations use only `useSharedValue`, `useDerivedValue`, `useAnimatedStyle`, `withTiming`, and `withSpring`; confirm no `runOnJS` call exists in any animation worklet (Principle VI)
- [X] T051 `reduceMotion` guard audit — confirm `useReducedMotion()` is imported and used in `TreeItemRow.tsx` to set animation duration to 0; add the same guard to any chart entry animation in `BarChart.tsx` and `LineChart.tsx` if gifted-charts exposes an animation duration prop (Principle VI Principle V)
- [X] T052 Cross-platform visual review — run all four Storybook stories on iOS 15+ simulator and Android API 26+ emulator; for each story capture a screenshot and note any `@RN-DEVIATION` visible differences between the RN-native render and the reference MUI X screenshot in `specs/005-mui-advanced-components/plan.md` (Principle IV)
- [X] T053 Quickstart validation — copy each code snippet from `specs/005-mui-advanced-components/quickstart.md` into a fresh test screen file `src/screens/__quickstart_005.tsx`; verify the file compiles with zero TypeScript errors (`npx tsc --noEmit`); delete the file after validation passes (SC-001 through SC-004)
- [X] T054 Bundle size documentation — run `npx source-map-explorer` (or `npx bundlesize`) on the compiled `lib/`; record minified gzip size per component group in a new file `docs/bundle-sizes-005.md`; confirm each group is ≤ 10 kB; flag any group that exceeds this threshold for tree-shaking review (SC-008)
- [X] T055 Run `npm test` to confirm zero regressions in the existing component suite; resolve any failures before merging Phase 7 (SC-007)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundational barrels) — can start immediately after T001
        ├── Phase 3 (US1 — Date Pickers)  ─┐
        ├── Phase 4 (US2 — DataGrid)       ├─ fully independent, can run in parallel
        ├── Phase 5 (US3 — Charts)         │
        └── Phase 6 (US4 — TreeView)       ┘
              └── Phase 7 (Polish) — requires all four story phases complete
```

### User Story Dependencies

| Story | Depends On               | Independent Of       |
|-------|--------------------------|----------------------|
| US1   | Phase 1 + Phase 2        | US2, US3, US4        |
| US2   | Phase 1 + Phase 2        | US1, US3, US4        |
| US3   | Phase 1 + Phase 2        | US1, US2, US4        |
| US4   | Phase 1 + Phase 2        | US1, US2, US3        |

### Within Each User Story

- Types files [P] can be written simultaneously
- Implementation files depend on their story's types (wait for T008–T010, T021, T031–T032, T038)
- Hooks/adapters depend on types; components depend on hooks/adapters
- Barrel `index.ts` update is always last in each story phase

### Parallel Opportunities Per Story

**US1 (Date Pickers)**
```
T008 + T009 + T010 (types — parallel)
  └── T011 (IntlDateAdapter)
  └── T012 (useLocalization)
  └── T013 (LocalizationProvider)  — depends on T012
  └── T014 (styles — parallel with T011/T012/T013)
  └── T015 (DatePicker) — depends on T011, T012, T013, T014
  └── T016 (index.ts) — depends on T015
  └── T017 (TimePicker) — parallel with T015 once T011/T012 done
  └── T018 (TimePicker index.ts)
  └── T019 (DateTimePicker) — parallel with T015/T017 once T011/T012 done
  └── T020 (DateTimePicker index.ts)
```

**US2 (DataGrid)**
```
T021 (types)
  └── T022 + T023 (DataGridCell + DataGridCellEditor — parallel)
  └── T024 (DataGridRow) — depends on T022, T023
  └── T025 (DataGridHeaderRow — parallel with T024)
  └── T026 (DataGridFilterRow — parallel with T024, T025)
  └── T027 (DataGridPagination — parallel with T024)
  └── T028 (styles — parallel)
  └── T029 (DataGrid root) — depends on T022–T028
  └── T030 (index.ts)
```

**US3 (Charts)**
```
T031 + T032 + T033 (types + seriesAdapter + LoadingOverlay — parallel)
  └── T034 (ChartLegend) — depends on T031
  └── T035 (BarChart) — depends on T031, T032, T033, T034
  └── T036 (LineChart — parallel with T035)
  └── T037 (index.ts)
```

**US4 (TreeView)**
```
T038 (types)
  └── T039 (TreeItemRow) — depends on T038
  └── T040 (TreeItem) — depends on T038, T039
  └── T041 (SimpleTreeView) — depends on T038, T040
  └── T042 (index.ts)
```

---

## Implementation Strategy

**MVP Scope (Phase 1 + Phase 2 + Phase 3 only)**
Deliver Phase 1 (setup) + Phase 2 (barrels) + Phase 3 (US1 — Date & Time Pickers) as the first independently shippable increment. This satisfies the highest-priority user story (P1), the most widely applicable form component, and can be merged before DataGrid, Charts, or TreeView are started.

**Incremental delivery**
Each story phase is independently shippable: merge US1 → US2 → US3 → US4 → Phase 7 in separate PRs, each leaving the library in a working and tested state. No story branch depends on any other story branch.

**Per-story estimated file count**
| Story | New files | Modified files |
|-------|-----------|----------------|
| US1   | 11        | 1 (index.ts barrel) |
| US2   | 10        | 1 (index.ts barrel) |
| US3   | 7         | 1 (index.ts barrel) |
| US4   | 5         | 1 (index.ts barrel) |
| Polish| 6 (stories + docs) | 1 (src/index.ts) |

---

## Summary

| Metric | Count |
|--------|-------|
| Total tasks | 54 |
| Phase 1 Setup | 1 |
| Phase 2 Foundational | 6 |
| Phase 3 US1 — Date Pickers | 13 |
| Phase 4 US2 — DataGrid | 10 |
| Phase 5 US3 — Charts | 7 |
| Phase 6 US4 — TreeView | 5 |
| Phase 7 Polish | 12 |
| Parallelizable tasks [P] | 26 |

**Suggested MVP**: Phase 1 + Phase 2 + Phase 3 (US1 — Date & Time Pickers) = 20 tasks
