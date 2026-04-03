# Research: Add Missing UI Components

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02
**Status**: Complete — all architectural decisions resolved
**Source**: spec.md, constitution.md, existing `001-rn-material-core` implementation

---

## R-01 Portal Host Architecture

**Decision**: Implement a lightweight `PortalHost` + `PortalGate` pattern using
React context and `ref`-registered `ViewManager`.

**Rationale**:
- React Native's built-in `Modal` creates a new root activity (Android) or a new
  `UIWindow` (iOS), which means its z-index is always above everything. The downside
  is that it cannot be composited with the main view hierarchy (no shared animations,
  no shared gesture responders).
- A custom Portal context-ref approach renders children into a designated `View` at
  the top of the component tree, enabling overlap ordering, shared animations, and
  gesture passthrough — matching MD3's elevation model exactly.
- `PortalHost` is placed once at the root (typically just inside `ThemeProvider`).
- `Portal` pushes a React element into the host via context; `PortalGate` unmounts it
  on cleanup.

**Implementation shape**:
```ts
// Simplified contract
interface PortalContextValue {
  mount:   (key: string, element: React.ReactNode) => void;
  unmount: (key: string) => void;
}
const PortalContext = React.createContext<PortalContextValue | null>(null);
```

**Alternatives considered**:
- Using React Native `Modal` for every overlay — rejected: creates separate native
  windows, breaks shared elevation model, incompatible with gesture handlers on Android.
- `react-native-portalize` third-party lib — rejected: adds an undeclared peer dep,
  violates the "no new peer dependencies" constraint established in the spec assumptions.

---

## R-02 Snackbar Queue Pattern

**Decision**: Manage a FIFO queue of `SnackbarItem` objects in a single reducer
inside the `SnackbarHost` context. Each item is displayed for its `duration` ms,
then the next item is dequeued.

**Rationale**:
- The spec edge case mandates: "only one visible at a time; subsequent ones queue".
- A reducer (`ADD`, `DISMISS`, `NEXT`) provides predictable state transitions and
  is easy to test without a running component tree.
- Duration defaults: `short` = 4000 ms, `long` = 7000 ms (aligned with MD3 spec).

**Queue shape**:
```ts
interface SnackbarItem {
  id:        string;          // crypto.randomUUID() or nanoid
  message:   string;
  duration:  'short' | 'long' | number;
  action?:   { label: string; onPress: () => void };
}
```

**Alternatives considered**:
- Stacking multiple visible Snackbars — rejected: violates MD3 spec and spec edge case.
- External state manager (Redux, Zustand) — rejected: library must not impose state
  management choices on consumers; context is sufficient.

---

## R-03 Controlled / Uncontrolled Pattern for Form Controls

**Decision**: All form controls use the "uncontrolled-first with controlled override"
pattern: maintain internal state, but sync to `value` / `onValueChange` when provided.

**Rationale**:
- Mirrors the MUI v6 controlled/uncontrolled contract (FR-006).
- Simple pattern: `const [internalValue, setInternalValue] = useState(defaultValue);`
  then `const resolved = value !== undefined ? value : internalValue;`.
- Avoids the "uncontrolled → controlled" React warning by being consistent at mount.

**Controlled detection**:
```ts
const isControlled = value !== undefined;
```

**Alternatives considered**:
- Always-controlled only — rejected: forces consumers to manage state even for simple
  single-toggle scenarios, increasing boilerplate.
- Always-uncontrolled only — rejected: incompatible with form libraries that inject
  `value` from outside (e.g., `react-hook-form`).

---

## R-04 DataTable Virtualization

**Decision**: Use React Native's `FlatList` with `windowSize` and `removeClippedSubviews`
for row virtualization. No external virtualization library needed.

**Rationale**:
- `FlatList` is part of React Native core, zero additional dep.
- For typical DataTable usage (< 1000 rows), `FlatList` with `windowSize={5}` is
  sufficient and achieves smooth 60fps scroll on mid-range Android devices.
- For > 10k row datasets, consumers can replace the `renderRow` slot with their own
  windowing strategy — `DataTable` does not hard-code the list primitive.
- Column headers are rendered in a separate sticky `View` above the `FlatList`.

**DataTable architecture**:
```
<View>               ← DataTable container
  <View>             ← sticky header row (ScrollView horizontal)
    {columns.map(HeaderCell)}
  </View>
  <FlatList          ← virtualized rows (same horizontal scroll sync)
    data={rows}
    renderItem={Row}
    ...
  />
  {emptySlot}        ← rendered when rows.length === 0
</View>
```

**Alternatives considered**:
- `react-native-table-component` — rejected: unmaintained, no TypeScript, no tokens.
- `FlashList` (Shopify) — rejected: new peer dep; reference lists don't require it;
  can be adopted by consumers as a slot override.

---

## R-05 Skeleton Shimmer Animation

**Decision**: Implement with a `react-native-reanimated` shared value looping between
0 and 1, applied as an interpolated `opacity` or as an `LinearGradient` translate.

**Rationale**:
- Must respect `reduceMotion` (FR-008): when enabled, show static placeholder at 50%
  opacity instead of animating — checked via `useReduceMotion()` hook from `001`.
- Gradient shimmer (moving from left to right) is the MD3 reference implementation.
- Implemented as a `withRepeat(withTiming(1, { duration: 1000 }), -1, true)` loop on
  a shared value — runs on the UI thread, zero JS-thread involvement.
- Shimmer colors: `theme.colors.surfaceVariant` (base) + `theme.colors.surface`
  (highlight) — pure token usage, correct in both light and dark.

**RN-DEVIATION**: `LinearGradient` is not available in core RN. The shimmer fallback
uses an animated `View` with `opacity` when the consumer does not provide a gradient
renderer. Document as `// RN-DEVIATION: LinearGradient requires expo-linear-gradient peer dep`.

**Alternatives considered**:
- CSS `@keyframes` — N/A (web only).
- `Animated` API — rejected: JS thread, blocked by `react-native-reanimated` mandate.

---

## R-06 Select Dropdown Implementation

**Decision**: `Select` renders its option list inside `Portal` (R-01) as a measured
dropdown sheet positioned absolutely below the trigger element using
`measure()` / `onLayout`.

**Rationale**:
- Using Portal ensures the dropdown appears above all sibling content regardless of
  `overflow: hidden` clipping in parent views (common issue in scroll containers).
- The trigger calls `ref.current?.measure(...)` to get its screen coordinates; the
  dropdown is absolutely positioned at `{ top: y + height, left: x }`.
- On keyboard open: the dropdown shifts up if it would be clipped by the software
  keyboard (detected via `KeyboardAvoidingView` insets from `react-native`).

**Alternatives considered**:
- React Native `Picker` — rejected: platform-native look, not styled to MD3 tokens,
  no keyboard filtering, not cross-platform parity.
- ActionSheet — rejected: modal full-screen on iOS, wrong UX pattern for inline form
  fields with many options.

---

## R-07 Drawer Slide Animation

**Decision**: Use a Reanimated `useSharedValue` + `useAnimatedStyle` to translate the
drawer `View` along the X axis. Spring animation with MD3-specified damping values.

**RN-DEVIATION**: Drawer in MD3 uses a persistent side-panel pattern on large screens
(e.g., tablets). React Native has no built-in breakpoint system; the library exposes a
`variant` prop (`permanent` | `persistent` | `temporary`) and leaves breakpoint
detection to the consuming app. Document as `// RN-DEVIATION: permanent/persistent
drawer layout control requires consumer-provided breakpoint logic`.

**Animation spec** (from MD3 motion tokens):
```ts
const DRAWER_SPRING = { damping: 30, stiffness: 300 };
// withSpring(isOpen ? 0 : -drawerWidth, DRAWER_SPRING)
```

**Alternatives considered**:
- `PanResponder` slide gesture — rejected: JS thread, replaced by `react-native-gesture-handler`
  `PanGesture` which runs on the UI thread.
- React Navigation `DrawerNavigator` — rejected: navigation is not within scope of this
  library; this is a UI primitive only.

---

## R-08 Tabs Scrollable Indicator

**Decision**: Render tabs in a `ScrollView` with `horizontal` and `showsHorizontalScrollIndicator={false}`.
Active indicator is an absolutely positioned `View` whose `left` and `width` are
animated via Reanimated to slide to the active tab position (measured via `onLayout`).

**Rationale**:
- FR-014 mandates scrollable tab bar when count exceeds viewport width.
- Measuring each tab's `width` and `x` via `onLayout` callbacks allows the indicator
  to animate correctly even when tab labels have variable widths.
- `scrollTo` is called on the `ScrollView` ref to keep the active tab scrolled into
  view (center-aligned if possible).

**Alternatives considered**:
- Fixed-width equally spaced tabs — rejected: violates FR-014 for long labels.
- `react-native-tab-view` — rejected: external dep; the existing animation system in
  `001-rn-material-core` is sufficient.

---

## R-09 Tooltip Popup Positioning

**Decision**: Use a Portal (R-01) + absolute positioning strategy. The Tooltip reads
the wrapped element's `measure()` values and positions the tooltip box above, below,
left, or right depending on available screen space, defaulting to above.

**Edge cases resolved**:
- If tooltip extends beyond screen edges, it is clamped to `screenWidth - padding`.
- Long-press opens; any other touch or a configurable `leaveDelay` closes it.
- `reduceMotion`: fade-in/out animation is replaced by instant show/hide.

**Alternatives considered**:
- `react-native-tooltip` library — rejected: external dep, no token styling.

---

## R-10 Grid Layout Implementation

**Decision**: `Grid` is implemented as a `View` with `flexDirection: 'row'`,
`flexWrap: 'wrap'`, and calculated item widths: `(containerWidth - (columns - 1) * spacing) / columns`.
Container width is measured via `onLayout`.

**Rationale**:
- No native grid layout is available in React Native (no CSS `grid`).
- `Flex + wrap` approximates a grid with configurable `columns`, `spacing`, and
  `rowSpacing` — sufficient for the use cases documented in US5.
- `columnSpacing` and `rowSpacing` separate horizontal and vertical gaps.

**RN-DEVIATION**: CSS Grid's `grid-template-areas` and fractional units are not
supported. Document as `// RN-DEVIATION: Grid only supports uniform-column layouts;
template-area syntax is web-only`.

**Alternatives considered**:
- Masonry layout — not in scope for `Grid`; masonry is handled by `ImageList`.
- `@shopify/flash-list` grid — rejected: external dep.

---

## R-11 Accordion Animation

**Decision**: Use Reanimated `useSharedValue(0)` for panel height (0 = collapsed,
measured natural height = expanded). Animate with `withTiming` using MD3 motion
`durationMedium2` (300 ms) and `easing.emphasized` curve.

**Technical challenge**: The expanded height is not known until the content renders.
**Solution**: Render the content at `opacity: 0` + `position: 'absolute'` off-screen
to measure it, then animate from 0 to the measured height.

**Reduce motion**: When `reduceMotion` is enabled, toggle instantly (duration = 0).

**Alternatives considered**:
- `LayoutAnimation` — rejected: JS thread, less precise, cannot be cancelled.
- Fixed max-height — rejected: wastes space; incorrect for dynamic content.

---

## R-12 Icon Render-Prop Pattern

**Decision**: `Icon` accepts an `source` prop of type `IconSource`:
```ts
type IconSource =
  | string                                    // icon name (for compatible icon font libs)
  | React.ReactNode                           // pass a JSX element directly
  | ((props: { size: number; color: string }) => React.ReactNode);  // render prop
```

**Rationale**:
- The spec assumption states: "the library does not bundle an icon font — it accepts a
  render prop or icon component as a child".
- Passing a function `(size, color) => <MaterialIcon name="..." size={size} color={color} />`
  is the most flexible pattern (matches React Native Paper's approach).
- Passing a string allows trivially switching to a different icon set by setting a
  global `IconComponent` via context, without changing call-sites.
- A global icon context (`IconContext`) lets the consuming app configure a default
  icon renderer once; individual `<Icon>` instances override it as needed.

**Alternatives considered**:
- Bundling `@expo/vector-icons` — rejected: forces an implicit peer dep change on
  non-Expo consumers; violates the "no new peer deps" constraint.

---

## R-13 Avatar Fallback Order

**Decision**: Avatar resolves its content in priority order: `source.uri` image →
`children` JSX → derived initials from `label` prop → generic person `Icon`.

**Rationale**:
- Mirrors MUI Avatar fallback chain.
- `onError` on the `Image` triggers fallback to children/initials/icon.
- Initials: uppercase first letter of each word in `label`, max 2 letters.

---

## R-14 Badge Overflow Cap

**Decision**: `Badge` accepts a `max` prop (default `99`). When `content > max`,
display `${max}+` (e.g., `"99+"`).

**Rationale**: Spec edge case — "What happens when Badge receives a count > 99 — it
should display '99+' or a configurable maximum string". The `max` prop makes this
configurable without hardcoding 99.

---

## Summary: Decisions with No Unknowns Remaining

All 14 research items resolved. No `NEEDS CLARIFICATION` markers remain.

| ID | Topic | Decision |
|----|-------|----------|
| R-01 | Portal architecture | PortalHost context-ref pattern |
| R-02 | Snackbar queue | FIFO reducer in SnackbarHost context |
| R-03 | Controlled/uncontrolled | Uncontrolled-first with controlled override |
| R-04 | DataTable virtualization | FlatList with windowSize |
| R-05 | Skeleton shimmer | Reanimated loop on shared value; static fallback with reduceMotion |
| R-06 | Select dropdown | Portal + measure() absolute positioning |
| R-07 | Drawer animation | Reanimated spring; `variant` prop for permanent/persistent mode |
| R-08 | Tabs indicator | ScrollView + onLayout measured indicator |
| R-09 | Tooltip positioning | Portal + measure() with screen-edge clamping |
| R-10 | Grid layout | Flex wrap with calculated item widths |
| R-11 | Accordion animation | Reanimated height from 0 to measured |
| R-12 | Icon system | render-prop / string / ReactNode union type |
| R-13 | Avatar fallback | uri → children → initials → Icon |
| R-14 | Badge overflow | `max` prop (default 99), displays `${max}+` |
