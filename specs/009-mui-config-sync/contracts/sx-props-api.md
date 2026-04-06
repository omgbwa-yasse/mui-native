# Contract: `sx` Prop API

**API surface**: `SxProps` type + `useSx()` hook

---

## `SxProps` type

```ts
// src/types/shared.ts

type SpacingValue = number | string;
type ColorValue = ColorProp | string;
type Responsive<T> = T | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;

export interface SxObject {
  // SPACING — resolve to theme.spacing[n] * 1 when number; pass through when string
  m?: Responsive<SpacingValue>;
  mt?: Responsive<SpacingValue>;  mb?: Responsive<SpacingValue>;
  ml?: Responsive<SpacingValue>;  mr?: Responsive<SpacingValue>;
  mx?: Responsive<SpacingValue>;  my?: Responsive<SpacingValue>;
  p?: Responsive<SpacingValue>;
  pt?: Responsive<SpacingValue>;  pb?: Responsive<SpacingValue>;
  pl?: Responsive<SpacingValue>;  pr?: Responsive<SpacingValue>;
  px?: Responsive<SpacingValue>;  py?: Responsive<SpacingValue>;
  gap?: Responsive<number>;
  rowGap?: Responsive<number>;
  columnGap?: Responsive<number>;

  // COLOR — if value is a ColorProp name, resolves to theme.colorScheme[role]; else raw value
  color?: Responsive<ColorValue>;
  bg?: Responsive<ColorValue>;                  // alias for backgroundColor
  backgroundColor?: Responsive<ColorValue>;
  borderColor?: Responsive<ColorValue>;

  // LAYOUT
  width?: Responsive<number | string>;   w?: Responsive<number | string>;
  height?: Responsive<number | string>;  h?: Responsive<number | string>;
  flex?: Responsive<number>;
  display?: Responsive<'flex' | 'none'>;        // RN-DEVIATION: limited to 'flex' | 'none'
  alignItems?: Responsive<string>;
  justifyContent?: Responsive<string>;
  flexDirection?: Responsive<string>;
  flexWrap?: Responsive<string>;
  flexGrow?: Responsive<number>;
  flexShrink?: Responsive<number>;
  flexBasis?: Responsive<number | string>;

  // POSITIONING
  position?: Responsive<'absolute' | 'relative'>;
  top?: Responsive<number | string>;    right?: Responsive<number | string>;
  bottom?: Responsive<number | string>; left?: Responsive<number | string>;
  zIndex?: Responsive<number>;

  // VISUAL
  overflow?: Responsive<string>;
  opacity?: Responsive<number>;
  borderRadius?: Responsive<number>;
  border?: Responsive<number>;          // alias for borderWidth
  borderWidth?: Responsive<number>;

  // Escape hatch — any additional RN-compatible style prop
  [key: string]: unknown;
}

/** Supports array notation (falsy items skipped): sx={[obj1, condition && obj2]} */
export type SxProps = SxObject | ReadonlyArray<SxObject | boolean | null | undefined | false>;
```

---

## `useSx` hook

```ts
// src/hooks/useSx.ts

/**
 * Converts an SxProps value to a React Native style object.
 *
 * When `sx` is undefined/null, returns undefined immediately (no allocation).
 * Result is memoized: recomputes only when sx reference or viewport width changes.
 *
 * @param sx     The sx prop value (object, array, or undefined)
 * @param theme  The current theme (from useTheme())
 * @returns      A React Native style object or undefined
 *
 * @example
 * const sxStyle = useSx(props.sx, theme);
 * <View style={StyleSheet.flatten([ownStyles, sxStyle, props.style])} />
 */
export function useSx(
  sx: SxProps | undefined,
  theme: Theme,
): ViewStyle | TextStyle | ImageStyle | undefined;
```

---

## Breakpoints

| Key | Min device width (logical pixels) |
|-----|-------------------------------------|
| `xs` | 0 |
| `sm` | 600 |
| `md` | 900 |
| `lg` | 1200 |
| `xl` | 1536 |

**Resolution algorithm**: `useWindowDimensions().width` is compared against breakpoints from largest to smallest; the first match wins. On a 375dp phone, `xs` is active. On a 768dp tablet, `sm` is active.

---

## Shorthand → RN style key mapping

| sx key | RN style key | Notes |
|--------|-------------|-------|
| `m` | `margin` | |
| `mt` | `marginTop` | |
| `mb` | `marginBottom` | |
| `ml` | `marginLeft` | |
| `mr` | `marginRight` | |
| `mx` | `marginHorizontal` | |
| `my` | `marginVertical` | |
| `p` | `padding` | |
| `pt` | `paddingTop` | |
| `pb` | `paddingBottom` | |
| `pl` | `paddingLeft` | |
| `pr` | `paddingRight` | |
| `px` | `paddingHorizontal` | |
| `py` | `paddingVertical` | |
| `bg` | `backgroundColor` | alias |
| `w` | `width` | alias |
| `h` | `height` | alias |
| `border` | `borderWidth` | alias |
| All other keys | Passed through as-is | |

---

## Color resolution logic

```
if value is one of 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info':
  → colorRoleMap[value].bg resolved from theme.colorScheme
else:
  → pass value through as a raw string (hex, rgb, rgba, hsl all valid)
```

---

## Spacing resolution logic

```
if value is a number:
  → theme.spacing[value] (if index exists) OR value * 8 (fallback: 8dp base unit)
else (string):
  → pass through as-is
```

---

## Array notation

```ts
// All of these are valid:
sx={{ mt: 2 }}
sx={[{ mt: 2 }, { mb: 1 }]}
sx={[{ mt: 2 }, isActive && { color: 'primary' }]}
sx={[{ mt: 2 }, null, { mb: 1 }]}  // null/false/undefined items skipped
```

Merge order: left-to-right; later entries overwrite earlier entries for the same key.

---

## RN-DEVIATION: Features silently ignored

The following MUI `sx` features have no equivalent in React Native and are silently ignored (no error, no warning):

| Feature | Why ignored |
|---------|-------------|
| `:hover`, `:focus`, `:active` pseudo-selectors | No DOM hover/focus events in RN |
| `@media` string keys | `useWindowDimensions` used for responsive instead |
| CSS nested selectors (e.g., `'& .MuiButton-root'`) | No CSS cascade in RN |
| `typography` shorthand (`sx={{ typography: 'body1' }}`) | Deferred to a future feature |
| `textDecoration`, `cursor`, `boxShadow` CSS strings | RN uses shadow* props instead |

Components MUST NOT throw for these keys — they are filtered before style creation.

---

## Style application order (lowest to highest priority)

```
1. theme.components[name].styleOverrides['root']  — lowest
2. sx-derived styles (useSx result)
3. props.style (instance style)                   — highest
```

---

## Performance contract

- `useSx(undefined, theme)` → `undefined` returned synchronously, no traversal
- `useSx(sx, theme)` → memoized via `useMemo([sx, viewportWidth])`, no recompute unless dependencies change
- Responsive traversal only allocates when `sx` contains a breakpoint object
- Array flattening uses `Array.prototype.reduce` — no intermediate allocations from library utilities

---

## Usage examples

```tsx
// All 78 components accept sx:
<Button sx={{ mt: 2, mb: 1, px: 3 }}>Submit</Button>

// Color aliases
<Typography sx={{ color: 'success', mb: 1 }}>Saved!</Typography>

// Responsive values
<Box sx={{ width: { xs: '100%', md: 400 } }} />

// Array notation with conditions
<Card sx={[{ p: 2 }, selected && { borderColor: 'primary', borderWidth: 2 }]} />

// Raw color strings still work
<Chip sx={{ backgroundColor: '#f5f5f5', color: '#333' }} />
```
