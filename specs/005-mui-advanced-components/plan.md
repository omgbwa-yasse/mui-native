# Implementation Plan: MUI X Advanced Components

**Branch**: `005-mui-advanced-components` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-mui-advanced-components/spec.md`

## Summary

Build React Native-native implementations of four MUI X-equivalent component groups for
the `mui-native` Material Design 3 component library. Because MUI X packages are DOM-dependent
and cannot run in a React Native environment, each group is implemented from scratch using
React Native primitives — but exposes the same prop API surface as its MUI X counterpart.

**Component groups delivered**:

| Group | Key components | Implementation strategy |
|-------|---------------|------------------------|
| Date Pickers | `LocalizationProvider`, `DatePicker`, `TimePicker`, `DateTimePicker` | Wrap `@react-native-community/datetimepicker` with TextInput+Modal trigger |
| Charts | `BarChart`, `LineChart` | Wrap `react-native-gifted-charts`; adapt MUI X `series` API via transform layer |
| DataGrid | `DataGrid` (+sub-components) | New FlatList-based component with `GridColDef` API, pagination, filtering, inline edit |
| TreeView | `SimpleTreeView`, `TreeItem` | Custom recursive implementation; Reanimated expand/collapse worklets |

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` is mandatory across all source files
**Primary Dependencies**:
- `react-native` ≥ 0.73 (peer dep — not bundled)
- `react-native-reanimated` ≥ 3.x (peer dep — not bundled)
- `react-native-gesture-handler` ≥ 2.x (peer dep — not bundled)
- `@react-native-community/datetimepicker` ≥ 8.0.0 (optional peer dep — date pickers)
- `react-native-gifted-charts` ≥ 1.4.0 (optional peer dep — charts)
- `react-native-svg` ≥ 15.0.0 (optional peer dep — charts renderer)

**Storage**: N/A — stateless UI component library
**Testing**: Jest + `@testing-library/react-native`; Storybook (`stories/components/`) for visual review
**Target Platform**: iOS ≥ 15 and Android ≥ API 26 (React Native 0.73 minimum targets)
**Project Type**: Library — ships as `mui-native` npm package (output: `lib/`)
**Performance Goals**: Each component ≤ 10 kB minified; list animations at 60 fps; chart renders ≤ 100 ms for ≤ 500 data points
**Constraints**: No `react-dom` dependency; no hardcoded colors or spacing; all design tokens from `src/tokens/`; tree-shakeable exports
**Scale/Scope**: 4 component groups, ~15 new source files, ~250 LOC for TreeView, client-side DataGrid cap at 1,000 rows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design — all gates confirmed.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — MD3 spec references identified for each component group;
  all divergences documented with `// RN-DEVIATION: <reason>` comments in source and contracts.
  See [contracts/components.contract.ts](./contracts/components.contract.ts).
- [x] **II. Design Token Supremacy** — no hardcoded color/spacing literals; all color, radius,
  and spacing values flow from `src/tokens/` via `useTheme()`. ChartAxisConfig colour defaults
  defer to `theme.palette.primary.main`.
- [x] **III. Theme-First Architecture** — all components consume `useTheme()` from ThemeContext;
  no static palette imports in render path. gifted-charts color props are bound by the wrapper,
  not hardcoded.
- [x] **IV. Cross-Platform Parity** ❌ **JUSTIFIED GATE FAIL** — MUI X packages (`@mui/x-date-pickers`,
  `@mui/x-charts`, `@mui/x-tree-view`, `@mui/x-data-grid`) have hard DOM dependencies and
  physically cannot run in a React Native runtime. The platform physically cannot support
  direct MUI X usage. Per Principle I's exception clause: "Deviations from the MUI specification
  are only permitted when the React Native platform physically cannot support them."
  **Mitigation**: RN-native implementations expose MUI X-identical prop API surfaces; all
  RN-DEVIATIONs are documented; acceptance tests cover both iOS and Android.
- [x] **V. Accessibility by Default** — `accessibilityRole`, `accessibilityLabel`, and
  `accessibilityState` applied to all interactive elements; 48 dp minimum touch targets
  enforced; `reduceMotion` checked in Reanimated worklets (duration → 0 when active).
- [x] **VI. Performance Contract** — TreeView expand/collapse and chart entry animations use
  Reanimated worklets (JS-free thread); `DataGrid` uses `FlatList` with `keyExtractor` and
  `getItemLayout` for viewport-based virtualisation; `React.memo` applied to DataGridRow and
  DataGridCell to prevent cross-row re-renders.

  ⚠️ **PARTIAL DEVIATION (gifted-charts entry animation)**: `react-native-gifted-charts` uses its
  own internal animation system (JS thread) for bar/line entry animations. This is an unavoidable
  consequence of using gifted-charts as the chart renderer. **Mitigation**: the `skipAnimation`
  prop (`isAnimated={false}`) fully disables gifted-charts animations; consumers with strict
  Principle VI requirements can set `skipAnimation={true}`. This deviation does not affect
  TreeView Reanimated worklets, which remain fully UI-thread.

## Project Structure

### Documentation (this feature)

```text
specs/005-mui-advanced-components/
├── plan.md                         # This file (/speckit.plan output)
├── spec.md                         # Feature specification
├── mui-api-reference.md            # MUI X API reference (target API surface)
├── research.md                     # Phase 0 output — 6 resolved research decisions
├── data-model.md                   # Phase 1 output — TypeScript interfaces (7 entities)
├── quickstart.md                   # Phase 1 output — RN-native usage examples
├── contracts/
│   └── components.contract.ts      # Phase 1 output — stable public prop contracts
├── checklists/
│   └── requirements.md
└── tasks.md                        # Phase 2 output (/speckit.tasks — not yet created)
```

### Source Code (new files for this feature)

```text
src/
└── components/
    ├── DatePicker/
    │   ├── DatePicker.tsx           # TextInput + Modal + @react-native-community/datetimepicker
    │   ├── DatePicker.styles.ts
    │   ├── LocalizationProvider.tsx # React context; re-exported as per FR-002
    │   ├── useLocalization.ts       # Hook consumed by all three pickers
    │   ├── IntlDateAdapter.ts       # Built-in DateAdapter using Intl.DateTimeFormat
    │   ├── types.ts                 # DatePickerProps, DateAdapter, LocalizationProviderProps
    │   └── index.ts
    ├── TimePicker/
    │   ├── TimePicker.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── DateTimePicker/
    │   ├── DateTimePicker.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── DataGrid/                    # New component — separate from existing DataTable
    │   ├── DataGrid.tsx             # FlatList root, composes sub-components
    │   ├── DataGridHeaderRow.tsx    # Sortable column headers + filter toggle
    │   ├── DataGridFilterRow.tsx    # Collapsible per-column filter inputs
    │   ├── DataGridRow.tsx          # Single data row (memoised)
    │   ├── DataGridCell.tsx         # Display cell (memoised)
    │   ├── DataGridCellEditor.tsx   # Edit-mode TextInput cell
    │   ├── DataGridPagination.tsx   # Page controls
    │   ├── DataGrid.styles.ts
    │   ├── types.ts                 # GridColDef, GridRowData, DataGridProps, GridApiRef, …
    │   └── index.ts
    ├── Charts/
    │   ├── BarChart.tsx             # Wraps react-native-gifted-charts BarChart
    │   ├── LineChart.tsx            # Wraps react-native-gifted-charts LineChart
    │   ├── ChartLegend.tsx          # Shared legend row
    │   ├── ChartLoadingOverlay.tsx  # ActivityIndicator overlay (loading prop)
    │   ├── seriesAdapter.ts         # MUI X series → gifted-charts data transform
    │   ├── types.ts                 # BarChartProps, LineChartProps, ChartAxisConfig, …
    │   └── index.ts
    └── TreeView/
        ├── SimpleTreeView.tsx       # Context provider + manages expanded/selected state
        ├── TreeItem.tsx             # Recursive node; delegates to TreeItemRow
        ├── TreeItemRow.tsx          # TouchableOpacity + animated chevron + label
        ├── types.ts                 # SimpleTreeViewProps, TreeItemProps, TreeViewItemId
        └── index.ts

src/index.ts                        # Re-export DataGrid, SimpleTreeView, TreeItem, Charts
```

**Package.json optional peer dependencies added**:
```json
"peerDependencies": {
  "@react-native-community/datetimepicker": ">=8.0.0",
  "react-native-gifted-charts":             ">=1.4.0",
  "react-native-svg":                       ">=15.0.0"
},
"peerDependenciesMeta": {
  "@react-native-community/datetimepicker": { "optional": true },
  "react-native-gifted-charts":             { "optional": true },
  "react-native-svg":                       { "optional": true }
}
```

## Complexity Tracking

> Constitution Principle IV violation — justified below.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| **Principle IV gate fail** — MUI X API surface cannot be directly implemented; RN-native equivalents deviate from the exact MUI X component rendering | MUI X packages hard-depend on React DOM and browser globals (`document`, `window`, CSS). Running them inside a React Native bundle is physically impossible — the bundle fails at parse time with `document is not defined`. | There is no DOM shim that makes MUI X run in a React Native environment. `react-native-web` transpiles in the wrong direction (RN → HTML). Embedded WebView would break the component contract, introduce a bridge bottleneck, and sever the mui-native design-token system. The only viable path is native reimplementation. |
