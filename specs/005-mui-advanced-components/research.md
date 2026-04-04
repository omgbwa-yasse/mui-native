# Research: MUI X Advanced Components — React Native Integration

**Branch**: `005-mui-advanced-components` | **Date**: 2026-04-03
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## R-01: MUI X Cannot Be Used Directly — Architecture Decision

**Decision**: Build React Native-native implementations for all four component groups.
The `mui-api-reference.md` file defines the target **API surface** (prop names, types,
and behaviour); the implementations use React Native primitives, not MUI X packages.

**Rationale**: MUI X packages (`@mui/x-date-pickers`, `@mui/x-charts`, `@mui/x-tree-view`,
`@mui/x-data-grid`) depend hard on React DOM and browser CSS APIs. They import from
`@mui/material` which requires HTML elements (`<div>`, `<input>`) and browser globals
(`document`, `window`, CSS animations). None of these exist in a React Native runtime.

The `mui-native` library targets `react-native ≥ 0.73` with **no** `react-dom` dependency.
Importing MUI X inside an RN bundle would fail immediately at `document is not defined`.

**RN-DEVIATION justification**: Constitution Principle IV (Cross-Platform Parity) requires
all components to pass on both iOS and Android. Using MUI X directly is physically
impossible in this React Native runtime. This deviation is constitutionally justified
per Principle I: "Deviations are only permitted when the React Native platform physically
cannot support them."

**Conclusion**: Each component group receives a React Native-native implementation whose
**prop API mirrors MUI X** as closely as the platform allows. Every unavoidable divergence
is documented with `// RN-DEVIATION: <reason>`.

**Alternatives considered**:
- `react-native-web` bridge: Transpiles RN → HTML; the opposite direction. Cannot make
  MUI X run in a native RN environment.
- `@mui/base` headless components: Still DOM-dependent. Same fatal issue.
- Embedded WebView: Out of scope; violates the component contract; adds bridge overhead
  and severs the design-token system.

---

## R-02: Date Picker Implementation Strategy

**Decision**: Wrap `@react-native-community/datetimepicker` with a thin MUI X-compatible
API layer. Present a TextInput trigger (showing the formatted value) + a Modal that hosts
the native picker.

**Rationale**: `@react-native-community/datetimepicker` is the canonical React Native date
and time picker. It renders the native OS widget on both platforms:
- **iOS**: Inline spinner or calendar wheel inside a `Modal` sheet.
- **Android**: Native date/time dialog (Material You on API 26+).

Benefits:
- Zero custom calendar widget code required for v1.
- Native OS accessibility semantics (VoiceOver, TalkBack) included automatically.
- Consistent with platform interaction guidelines.
- Well-maintained official React Native community package.

**Wrapper pattern**:
```tsx
// TextInput (formatted date display) + Modal (native DateTimePicker)
<DatePicker value={date} onChange={setDate} label="Departure date" />
// → TextInput shows "04/03/2026"
// → Pressing TextInput opens Modal containing <RNDateTimePicker>
// → On confirmation, onChange is called with native Date object
```

**RN-DEVIATIONs** (documented per component):
- `views`: Limited to the set the native picker supports. DatePicker: `'day' | 'month' | 'year'`.
  TimePicker: `'hours' | 'minutes'`. Seconds are not independently selectable on Android.
- No inline calendar grid: Always a modal/dialog. The `open` prop drives the Modal.
- `slots` / `slotProps`: Only the `textField` slot (the TextInput trigger) is customisable.
  No `day`, `calendarHeader`, or `toolbar` slots.
- `shouldDisableDate/Month/Year`: Not supported by the native OS picker's API.
- `minDate` / `maxDate`: Forwarded to native picker as `minimumDate` / `maximumDate`.
- `ampm`: Forwarded to native time picker; on Android it determines the clock format.

**LocalizationProvider**: For React Native, `LocalizationProvider` is a simplified context
providing locale string + a date formatter (see R-06). No MUI date-adapter framework is
required; the native picker handles locale internally.

**Peer dependency added**: `@react-native-community/datetimepicker` (optional peer dep).

**Alternatives considered**:
- Custom calendar grid widget: > 400 LOC, > 10 kB bundle per component, would require
  months of cross-platform testing. Deferred to v2.
- `expo-date-picker`: Expo-only; eliminates bare workflow support.

---

## R-03: Chart Library Selection

**Decision**: Use `react-native-gifted-charts` (backed by `react-native-svg`) as the
chart rendering engine, wrapped behind thin components with MUI X-compatible prop
interfaces.

**Comparison matrix**:

| Library | RN (iOS+Android) | Bundle est. | API ≈ MUI X | Active |
|---------|-----------------|-------------|-------------|--------|
| `react-native-gifted-charts` | ✅ | ~25 kB | Medium | ✅ |
| `victory-native` | ✅ | ~45 kB | Low | ✅ |
| Custom (`react-native-svg` only) | ✅ | ~8 kB wrapper | N/A | N/A |
| `recharts` | ❌ Web only | — | High | ✅ |
| `nivo` | ❌ Web only | — | High | ✅ |

**Rationale for gifted-charts**:
- Provides ready `BarChart` and `LineChart` components with RN-SVG rendering.
- Smaller bundle than victory-native (~25 vs ~45 kB).
- `react-native-svg` is already a common transitive dep in RN projects; low marginal cost.
- API is `series`-like (array of `{value, label}`) — our wrapper adapts MUI X's array
  format into gifted-charts' format transparently.

**Series transformation** (MUI X → gifted-charts shape):
```ts
// MUI X input
series={[{ data: [10, 20, 30], label: 'Sales', color: '#1976D2' }]}

// gifted-charts expects per-series array:
barData={[
  { value: 10, label: 'Jan', frontColor: '#1976D2' },
  { value: 20, label: 'Feb', frontColor: '#1976D2' },
  { value: 30, label: 'Mar', frontColor: '#1976D2' },
]}
```
The wrapper merges `xAxis.data` labels with `series[i].data` values during render.

**RN-DEVIATIONs**:
- `loading`: Not in gifted-charts; wrapper overlays an `ActivityIndicator`.
- `ChartsContainer` composition API: Not supported — gifted-charts has no composition layer.
  Excluded from v1 scope (FR-018 is `MAY`).
- Hover tooltip: Native equivalent is press tooltip (fires on press/long-press, not hover).
- `dataset + dataKey` pattern: Not supported; consumers must use explicit `series.data` arrays.

**Peer dependencies added**: `react-native-gifted-charts`, `react-native-svg` (optional peers).

**Alternatives considered**:
- `victory-native`: 45 kB bundle; API further from MUI X; rejected on bundle grounds.
- Pure custom SVG: ~8 kB wrapper budget but ~400 LOC per chart type for proper axes, labels,
  and animation; deferred to v2 if gifted-charts is unsatisfactory.

---

## R-04: DataGrid Architecture

**Decision**: Create a new `DataGrid` component at `src/components/DataGrid/` using the
same `FlatList` architecture as the existing `DataTable`, but with a MUI X `GridColDef`-
compatible column API plus pagination, filtering, and checkbox selection.

**Relationship to DataTable**:
The existing `DataTable` (`src/components/DataTable/`) is simple, lightweight, and has
active consumers. It is **not modified**. `DataGrid` is a separate, more feature-complete
sibling that matches the MUI X DataGrid API surface.

**Internal architecture**:
```
DataGrid (FlatList-based)
├── DataGridHeaderRow    — sortable column headers + filter toggle icons
├── DataGridFilterRow    — collapsible per-column TextInput filter bar
├── FlatList             — virtualised data rows
│   └── DataGridRow      — one row; holds DataGridCell instances
│       └── DataGridCell — display mode; may switch to DataGridCellEditor
└── DataGridPagination   — page/pageSize controls
```

**`apiRef` implementation**: A React `useRef` whose `.current` is populated by
`DataGrid` via `useImperativeHandle`. Exposes a limited method set:
`setPage`, `setSortModel`, `getSelectedRows`, `scrollToRow`.

**RN-DEVIATIONs**:
- No column resizing or reordering (requires pointer/drag events not available in RN).
- `density: 'comfortable'` is not implemented (only `'standard'` and `'compact'`).
- Inline editing: TextInput only in v1; no date-cell or single-select editors.
- Column filter operators: `contains`, `equals`, `startsWith`, `endsWith` for strings;
  `gt`, `lt`, `equals` for numbers. No custom filter functions in v1.
- `processRowUpdate` async rejection: Calls `onProcessRowUpdateError`; edit is reverted
  optimistically (no modal confirmation).

**Alternatives considered**:
- Rename DataTable → DataGrid: Breaks existing DataTable consumers; DataTable's column API
  (`DataTableColumn`) is not GridColDef-compatible.
- Adapter wrapper over DataTable: Extra indirection with no benefit; DataGrid built fresh.

---

## R-05: TreeView Architecture

**Decision**: Build `SimpleTreeView` + `TreeItem` from scratch using React Native `View`,
`TouchableOpacity`, and `react-native-reanimated` for expand/collapse animation.

**Rationale**: No React Native tree-view library matches MUI X's API surface closely
enough to justify the dependency. The required feature set (recursive nesting,
animated expand/collapse, single/multi selection, checkbox selection) is achievable in
~250 LOC with Reanimated.

**Expand/collapse animation** (Reanimated worklet):
```ts
// per TreeItem:
const expanded = useSharedValue(0); // 0 = collapsed, 1 = expanded
const heightStyle = useAnimatedStyle(() => ({
  height: withTiming(expanded.value * measuredHeight, { duration: 200 }),
  overflow: 'hidden',
}));
const chevronStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${withTiming(expanded.value * 90)}deg` }],
}));
```

`useReducedMotionValue()` is checked; if `reduceMotion` is active, `withTiming` uses
duration 0 (no animation).

**Keyboard navigation**: `accessibilityRole="menuitem"` + `onAccessibilityAction` maps
the standard `activate`, `escape`, `increment` (expand), `decrement` (collapse) actions.

**RN-DEVIATIONs**:
- Arrow-key navigation: Available only on iOS with a hardware keyboard; Android has
  limited keyboard event support in React Native.
- `apiRef` (`useSimpleTreeViewApiRef`): Not implemented in v1.
- `selectionPropagation` (cascade to parents/descendants): Not in v1.

**No new peer dependency required** — uses Reanimated and gesture handler already
mandated by the constitution.

---

## R-06: LocalizationProvider Strategy

**Decision**: Implement `LocalizationProvider` as a React Native context that provides a
locale string and a date-formatting function. It is adapter-agnostic by design.

**Rationale**: MUI X's `LocalizationProvider` is web-only and date-adapter-based. For
React Native we need a minimal formatting context:
1. Optional — pickers render correctly using `Intl.DateTimeFormat` if no provider is found.
2. Accepts any date library the consumer already uses.
3. Does **not** add a date library as a hard dependency (dayjs is used only in docs examples).

**`DateAdapter` interface** (subset of MUI X's adapter interface, simplified):
```ts
export interface DateAdapter<TDate = Date> {
  format:    (date: TDate, formatStr: string) => string;
  parse:     (value: string, formatStr: string) => TDate | null;
  isValid:   (value: TDate | null) => boolean;
  isBefore:  (a: TDate, b: TDate) => boolean;
  isAfter:   (a: TDate, b: TDate) => boolean;
}
```

A built-in `IntlDateAdapter` (wrapping `Intl.DateTimeFormat` + `Date`) is included as the
default. Consumers may pass a dayjs-based adapter via `dateAdapter`.

**Re-export**: `LocalizationProvider` is exported from
`src/components/DatePicker/index.ts` as required by FR-002.

---

## Summary of Resolved Decisions

| Item | Decision |
|------|----------|
| R-01 | RN-native implementations; MUI X API as spec; `// RN-DEVIATION:` for divergences |
| R-02 | `@react-native-community/datetimepicker` wrapped in TextInput+Modal pattern |
| R-03 | `react-native-gifted-charts` + series adapter transform |
| R-04 | New `DataGrid` component alongside (not replacing) existing `DataTable` |
| R-05 | Custom RN implementation with Reanimated worklet animation |
| R-06 | Minimal adapter-agnostic `LocalizationProvider` with built-in `IntlDateAdapter` |
