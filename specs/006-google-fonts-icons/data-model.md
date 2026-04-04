# Data Model: Google Fonts Material Icons Integration

**Feature**: 006-google-fonts-icons  
**Phase**: 1 — Design  
**Date**: 2026-04-03

---

## Entities

### IconVariant

Discriminated union identifying which of the 5 Google Fonts Material Icon font families to use.

| Value | Font Family | Font File |
|-------|-------------|-----------|
| `"filled"` (default) | `MaterialIcons` | `MaterialIcons.ttf` |
| `"outlined"` | `MaterialIcons-Outlined` | `MaterialIconsOutlined-Regular.otf` |
| `"rounded"` | `MaterialIcons-Round` | `MaterialIconsRound-Regular.otf` |
| `"sharp"` | `MaterialIcons-Sharp` | `MaterialIconsSharp-Regular.otf` |
| `"two-tone"` | `MaterialIcons-TwoTone` | `MaterialIconsTwoTone-Regular.otf` |

**TypeScript declaration**:
```ts
export type IconVariant =
  | 'filled'
  | 'outlined'
  | 'rounded'
  | 'sharp'
  | 'two-tone';
```

---

### MaterialIconName

A compile-time-only TypeScript union of all valid Google Fonts Material Icons names (~2,500+ members). Generated from the upstream codepoints file. Not present in the runtime bundle.

**TypeScript declaration** (excerpt — full list in `catalogue.ts`):
```ts
export type MaterialIconName =
  | '10k'
  | '10mp'
  | '11mp'
  | 'abc'
  | 'ac_unit'
  | 'access_alarm'
  // ... ~2,500+ names
  | 'zoom_out_map';
```

**Validation rules**:
- Only names that appear in the codepoints file for the **filled** variant are valid (the filled set is the superset; all other variants are subsets).
- The type is checked at compile time only; runtime icon-not-found is handled by the fallback strategy (FR-008).

---

### MaterialIconProps

Props for the `MaterialIcon` component.

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `name` | `MaterialIconName` | ✓ | — | Icon identifier |
| `variant` | `IconVariant` | — | `"filled"` | Selects font family |
| `size` | `number` | — | `24` | dp, forwarded to icon renderer |
| `color` | `string` | — | theme `onSurface` | CSS color; theme-resolved when absent |
| `accessibilityLabel` | `string` | — | `undefined` | Sets `accessibilityRole="image"` when provided |
| `testID` | `string` | — | `undefined` | Forwarded to outermost `View` |

**Derived state / computed**:
- `resolvedColor`: `color` prop ?? `theme.colorScheme.onSurface` ?? `'#000000'`
- `iconSet`: determined by `variant` → maps to corresponding `createIconSet` instance
- `twoToneSecondaryOpacity`: fixed `0.4` when `variant === 'two-tone'`

---

### materialIconSource (factory)

A pure function. No persistent state. Takes a name + optional variant and returns an `IconSource` closure.

```
materialIconSource(name: MaterialIconName, variant?: IconVariant) → IconSource
```

Where `IconSource = (props: { size: number; color: string }) => ReactElement | null`

The returned closure captures `name` and `variant` at call time; `size` and `color` are passed through at render time from the parent `Icon` component.

---

## State Transitions

None — the feature produces stateless, pure-render components. Theme-reactivity is owned by `ThemeContext` (upstream).

## Validation Rules

| Rule | Check | Fail behavior |
|------|-------|---------------|
| `name` is a valid `MaterialIconName` | TypeScript compile time | Type error |
| `name` not found in glyph map at runtime | `react-native-vector-icons` renderer | Renders question-mark placeholder glyph |
| `size ≤ 0` | None — passed through as-is | Renderer renders at supplied dp (may be invisible) |
| `ThemeContext` absent | Runtime context check (`useContext`) | Falls back to `#000000`; emits `__DEV__` warning |
