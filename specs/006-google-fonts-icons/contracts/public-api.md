# Public API Contract: Google Fonts Material Icons Integration

**Feature**: 006-google-fonts-icons  
**Scope**: Public exports added to `src/index.ts`  
**Contract type**: TypeScript component + function API  
**Breaking changes**: None — purely additive

---

## New Exports

### Type: `IconVariant`

```ts
export type IconVariant =
  | 'filled'      // default — MaterialIcons.ttf
  | 'outlined'    // MaterialIconsOutlined-Regular.otf
  | 'rounded'     // MaterialIconsRound-Regular.otf
  | 'sharp'       // MaterialIconsSharp-Regular.otf
  | 'two-tone';   // MaterialIconsTwoTone-Regular.otf
```

---

### Type: `MaterialIconName`

Generated TypeScript union of all valid icon name strings (~2,500+ members).  
Source: `src/components/MaterialIcon/catalogue.ts` (auto-generated, do not edit manually).

```ts
export type MaterialIconName = 'home' | 'star' | 'settings' | /* ... */ string & {};
// Full union in catalogue.ts
```

---

### Interface: `MaterialIconProps`

```ts
export interface MaterialIconProps {
  /** Icon name from the Google Fonts Material Icons catalogue. */
  name: MaterialIconName;
  /** Icon style variant. Defaults to 'filled'. */
  variant?: IconVariant;
  /** Icon size in dp. Defaults to 24. */
  size?: number;
  /** Icon color. Defaults to theme `colorScheme.onSurface`. */
  color?: string;
  /** Accessible label. Sets `accessibilityRole="image"` when provided. */
  accessibilityLabel?: string;
  /** Test id for automated queries. */
  testID?: string;
}
```

---

### Component: `MaterialIcon`

```ts
export declare const MaterialIcon: React.MemoExoticComponent<
  (props: MaterialIconProps) => React.ReactElement
>;
```

**Behavior contract**:
- Renders a Material Icon glyph from the Google Fonts icon font.
- `color` defaults to `theme.colorScheme.onSurface`; when `ThemeContext` is absent falls back to `'#000000'` and emits a `console.warn` in `__DEV__` mode.
- `variant === 'two-tone'` renders two overlapping glyphs: primary at 100% opacity, secondary at 40% opacity.
- An invalid `name` at runtime does not throw; the underlying icon renderer displays a placeholder glyph.
- `accessibilityRole="image"` and `accessible={true}` are set only when `accessibilityLabel` is non-null.

---

### Function: `materialIconSource`

```ts
export declare function materialIconSource(
  name: MaterialIconName,
  variant?: IconVariant,
): IconSource;
```

Where `IconSource` is the existing unchanged type:
```ts
// Existing — NOT MODIFIED
export type IconSource = (props: { size: number; color: string }) => React.ReactElement | null;
```

**Behavior contract**:
- Returns a stable `IconSource` function that renders the named icon.
- The returned function is referentially stable when called with the same `(name, variant)` pair in the same module scope (memoised via `useMemo` at call site, or statically constructed).
- Intended for use with the existing `<Icon source={...} />` component.

---

## Unchanged Exports (non-breaking guarantee)

The following existing exports are unchanged. No host-app migration is required:

| Export | Status |
|--------|--------|
| `Icon` component | Unchanged |
| `IconProps` interface | Unchanged |
| `IconSource` type | Unchanged |

---

## Peer Dependency Addition

```json
// package.json — peerDependencies (addition)
{
  "react-native-vector-icons": ">=10.0.0"
}
```

Host apps must install `react-native-vector-icons` and link icon fonts according to the [quickstart guide](../quickstart.md). If not installed, `MaterialIcon` will not render; the `Icon` component continues to function normally with its existing `source` render-prop.
