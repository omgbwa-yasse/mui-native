# Research: Full MUI-Native ↔ Material UI Alignment

**Feature**: `010-full-mui-alignment`
**Phase**: 0 — Research
**Date**: 2026-04-06

All NEEDS CLARIFICATION items have been resolved. No open unknowns remain.

---

## Decision 1: CircularProgress Arc Implementation

**Decision**: Use `react-native-svg` (`Svg` + `Circle` + `strokeDasharray` / `strokeDashoffset`) for arc rendering.

**Rationale**: `react-native-svg ≥ 15.0.0` is already declared as an optional peer dependency in `package.json`. No new dependency is needed. SVG arc renders at native resolution on both iOS and Android. An animated `strokeDashoffset` on a `Circle` element achieves MUI's indeterminate shrink-spin effect when paired with a Reanimated rotation worklet on the `Svg` container.

Implementation sketch:
- `circumference = 2 * π * radius` where `radius = (size / 2) - thickness`
- Determinate: `strokeDashoffset = circumference * (1 - value / 100)`
- Indeterminate: Reanimated `useAnimatedStyle` drives rotation on the container + `strokeDashoffset` oscillation for the shrink effect
- `enableTrackSlot`: second `Circle` with `strokeOpacity: 0.15` behind the arc

**Alternatives considered**:
- Custom `View` border-radius masking: complex, inaccurate at non-90° positions, unreliable at small sizes on Android
- `react-native-progress` or third-party spinner: introduces an undeclared external dependency not in peer deps
- `@shopify/react-native-skia` (Canvas): not in peer deps; over-engineered for a single component

---

## Decision 2: Prop Alias Pattern

**Decision**: Inline alias resolution within each component — `const resolvedOpen = open ?? visible;` — plus a `__DEV__` `console.warn` when both are supplied simultaneously.

**Rationale**: Only 7 components need aliases (FR-001–006). A HOC or context-level wrapper adds prop type inference complexity and harms tree-shaking. Inline resolution is transparent, fully type-safe, and has zero runtime overhead in production builds.

**Dual-prop conflict rule**: When both the old internal name (`visible`) and the new MUI alias (`open`) are provided, the MUI-idiomatic alias takes precedence. A `console.warn` fires in `__DEV__` only — never in production. This matches MUI Web's own overlapping-prop behavior.

**Alternatives considered**:
- HOC `withAliases(Component, aliasMap)`: complicates generic prop type inference; harder to tree-shake; adds an extra component in the React DevTools tree
- Babel transform / codegen: significant tooling complexity; not justified for 7 components
- Deprecate old names immediately: violates FR-007 (strictly additive — no deprecations or removals in this feature)

---

## Decision 3: AvatarGroup Overlap Layout

**Decision**: Render `Avatar` children in normal order with negative `marginLeft` on all children except the first, using inline `zIndex` (higher index = front) and a `flexDirection: 'row'` parent container.

**Rationale**: React Native supports `marginLeft: -N` for visual overlap without absolute positioning. Z-ordering via `zIndex` is reliable on both iOS and Android when siblings share a single parent. No third-party layout library needed.

**Spacing values** (matching MUI defaults):
- `'medium'` → `marginLeft: -8`
- `'small'` → `marginLeft: -4`
- `number N` → `marginLeft: -N`

**Surplus element**: When `children.length > max`, show `max - 1` avatars + one surplus `Avatar` containing `+N` text (or the result of `renderSurplus(surplus)`).

**Alternatives considered**:
- Absolute positioning with `left` offsets: fragile when children have varying sizes; breaks automatic container height
- Rendering children in reverse order and using `zIndex` to flip visual order: confusing index logic; accessibility reading order would be reversed

---

## Decision 4: TextField `standard` Variant

**Decision**: Render the `standard` variant as a `View` with `borderBottomWidth: 1` (inactive) or `2` (focused) and no top, left, or right borders, and no background fill or border-radius.

**Rationale**: Matches MUI Web's underline-only TextField. React Native's per-side border properties (`borderBottomWidth`, `borderBottomColor`) make this achievable without a full border-box teardown. Focus state animates `borderBottomWidth` via Reanimated shared values.

**Alternatives considered**:
- `borderStyle: 'none'` on three sides: React Native does not support per-side `borderStyle` changes the way CSS does; only the `borderBottomWidth` approach works cleanly across both platforms
- Setting transparent border on three sides: wastes border width space and causes height inconsistency on Android

---

## Decision 5: Table Family — Container and Sticky Header

**Decision**: `TableContainer` wraps its children in a `ScrollView` (supports `horizontal` prop pass-through). `Table.stickyHeader` is implemented by rendering `TableHead` with `position: 'absolute'` and adding an equivalent `paddingTop` to `TableBody` to preserve layout flow.

**Rationale**: The composable `Table` API must support arbitrary sub-trees (not just `FlatList` data arrays), so a wrapping `ScrollView` is more appropriate than `FlatList` for basic composable use. CSS `position: sticky` is not available in React Native; the absolute-position technique achieves the same visual effect.

**RN-DEVIATION(FR-029)**: Documented with `// RN-DEVIATION:` comment in `Table.tsx`. At very large row counts (> 500), `DataTable` (which uses `FlatList` with `stickyHeaderIndices`) has better performance and should be recommended to those consumers.

**Alternatives considered**:
- `FlatList.stickyHeaderIndices`: only works when the entire Table is a FlatList; incompatible with arbitrary sub-tree composition
- `react-native-reanimated-table`: external dependency; not needed given the requirements

---

## Decision 6: Typography MD2 → MD3 Mapping

**Decision**: Export a `typographyVariantMap: Record<TypographyMD2Variant, TypeScaleVariant>` constant from `src/tokens/typography.ts`. Also export the `TypographyMD2Variant` union type. The `Text` component's `variant` prop type is widened to `TypeScaleVariant | TypographyMD2Variant`. At render time: `const resolvedVariant = typographyVariantMap[variant as TypographyMD2Variant] ?? (variant as TypeScaleVariant);`

**MD2 → MD3 canonical mapping**:

| MD2 variant | MD3 variant |
|-------------|-------------|
| `h1` | `displayLarge` |
| `h2` | `displayMedium` |
| `h3` | `displaySmall` |
| `h4` | `headlineLarge` |
| `h5` | `headlineMedium` |
| `h6` | `headlineSmall` |
| `subtitle1` | `titleLarge` |
| `subtitle2` | `titleMedium` |
| `body1` | `bodyMedium` |
| `body2` | `bodySmall` |
| `caption` | `labelSmall` |
| `button` | `labelLarge` |
| `overline` | `labelMedium` |

**Rationale**: Keeping the map in the token layer (not the component layer) makes it independently testable and reusable by any component that needs to resolve variant names (e.g., DataTable column headers, future Typography component).

**Alternatives considered**:
- Extend `TypographyScale` interface with MD2 keys: changes the theme object shape, forcing all theme provider implementations to add 13 new keys — a breaking change for any custom theme
- Inline `if/else` or `switch` in the `Text` component: not reusable; harder to test; cannot be exported for consumer use; would need to duplicate logic across any future components

---

## Decision 7: Dialog Restructure

**Decision**: Widen `Dialog.title` from `string` to `ReactNode` (backward-compatible superset). Add `open` and `onClose` as inline-resolved aliases. Add 4 sub-components (`DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`) as separate files in `src/components/Dialog/`. Add `fullScreen`, `fullWidth`, `maxWidth`, `scroll` display props.

**`onClose` reason mapping (RN-DEVIATION)**:
- MUI Web `'backdropClick'` → `'backdropPress'`
- MUI Web `'escapeKeyDown'` → `'hardwareBackPress'`

Tagged with `// RN-DEVIATION:` in `src/components/Dialog/types.ts`.

**Alternatives considered**:
- Keep `title: string` and add a separate `titleNode?: ReactNode` prop: two props for the same slot; breaks MUI Web copy-paste (SC-005 requires ≤5 changes per example)

---

## Decision 8: Transition Components — Verification Only

**Decision**: All 5 transitions (`Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`) are already exported from `src/index.ts`. The action for this feature is to **verify** that the required props exist in each component's type file and add any missing ones — no new implementation is needed unless a prop is absent.

**Verification checklist** (to be confirmed during implementation):
- `in: boolean` — present?
- `timeout: number | { enter: number; exit: number }` — present?
- `children: ReactElement` — present?
- `Slide.direction: 'down' | 'left' | 'right' | 'up'` — present?

If any prop is missing from a component's `types.ts`, add it. If the animation already works, the implementation does not change.

---

## Decision 9: `react-native-svg` Documentation

**Decision**: Document `react-native-svg` as a required optional peer dep specifically for `CircularProgress`. Apps that do not use `CircularProgress` do not need to install it. Add a JSDoc note to `CircularProgress.tsx` and a README section in `src/components/CircularProgress/`.

**Rationale**: Already listed as `"react-native-svg": ">=15.0.0"` in `peerDependencies.optional` in `package.json`. No `package.json` change is required — only documentation.

---

## Resolutions Summary

All 9 technical decisions resolved. Zero NEEDS CLARIFICATION items remain. Phase 1 design may proceed.
