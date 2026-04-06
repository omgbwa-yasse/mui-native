# Research: MUI API Alignment — Global Config, Size, Color & sx

**Feature**: `009-mui-config-sync`
**Date**: 2026-04-05
**Purpose**: Resolve all technical unknowns before Phase 1 design. All NEEDS CLARIFICATION items from Technical Context are resolved below.

---

## Research 1: `theme.components` — MUI convention and React Native adaptation

**Decision**: Mirror MUI v6's `theme.components` dictionary exactly, but:
- Drop the `Mui` prefix from component keys (`Button` not `MuiButton`)
- Replace CSS string-based `styleOverrides` with React Native `StyleSheet`-compatible plain objects
- `variants` (conditional style variants) are included in v1

**Rationale**: MUI v6 uses:
```ts
createTheme({
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 8 } },
    },
  },
});
```
For MUI-Native, the component key is the display name without the "Mui" prefix since we are not MUI — we are MUI-Native. This keeps the API familiar while being honest about identity.

**Implementation pattern**:
- `ComponentsConfig` = `{ [K in ComponentName]?: ComponentOverride<ComponentPropsMap[K]> }`
- `ComponentOverride<T>` = `{ defaultProps?: Partial<T>; styleOverrides?: Record<string, object> }`
- Each component reads `theme.components?.['Button']?.defaultProps` via a shared hook `useComponentDefaults('Button', instanceProps)` which returns merged props (instance wins)
- `createTheme()` stores `components` verbatim (no merging needed at theme creation time — merge happens at render time)

**Alternatives considered**:
- `theme.overrides` (old MUI v4 name) → rejected: MUI v5+ uses `components`, consistency required
- Processing defaults at `createTheme()` time → rejected: component prop types are unknown at theme creation; runtime merge is required
- A HOC wrapper → rejected: requires wrapping every component; hook is simpler and more composable

---

## Research 2: `size` prop — scale values and applicability per component

**Decision**: Use a three-level multiplier scale. Each component category maps to a concrete pixel dimension table. Utility/layout components (Box, Grid, Container, Stack, Portal, Backdrop, Slide, Fade, Grow, Zoom, Collapse, Divider, Modal) receive the `size` type but ignore it visually (no visible change). This preserves the "all 70+ components accept `size`" contract without forcing absurd sizing on layout primitives.

**Size scale** (stored in `src/tokens/size.ts`):

| Level  | Height | PaddingH | PaddingV | FontScale | TouchTarget |
|--------|--------|----------|----------|-----------|-------------|
| small  | 32dp   | 12dp     | 6dp      | 0.85×     | 32dp        |
| medium | 40dp   | 24dp     | 10dp     | 1.0×      | 40dp        |
| large  | 48dp   | 32dp     | 14dp     | 1.15×     | 48dp        |

**Component-category overrides**:
- **TextField / Select / Autocomplete / Searchbar / NumberField / DatePicker / TimePicker / DateTimePicker** use MD3 input field heights: small=40, medium=56, large=64
- **Chips**: small=24dp, medium=32dp, large=40dp chip height
- **Avatar**: small=24dp, medium=40dp, large=56dp diameter
- **Slider track**: small=2dp, medium=4dp, large=6dp track + thumb scales proportionally
- **Checkbox / Switch / RadioButton**: small=16dp component, medium=20dp, large=24dp; touch targets always ≥32dp (clamped)

**Cascading**: `ButtonGroup`, `ToggleButtonGroup`, `Tabs` propagate `size` to children via React context, matching MUI behavior exactly.

**Rationale**: MUI's size system is per-component with no global table, leading to inconsistency. A centralized scale table ensures proportional scaling and makes future changes O(1).

**Alternatives considered**:
- Exposing the scale in the theme object → deferred to a future feature; tokens file is sufficient for v1
- Only adding `size` to 30 components (Option A) → rejected by user; Option B (all) was chosen
- Per-component custom scales → creates the same inconsistency problem we are solving

---

## Research 3: `color` prop — new MD3-adjacent semantic roles

**Decision**: Extend `ColorScheme` with 12 new roles for `success`, `warning`, and `info`. These are NOT part of MD3's 30 core roles but are universally expected by MUI developers.

**Baseline values adopted from MUI v6 (GPL-accessible palette)**:

**Light mode**:
| Role | Value |
|------|-------|
| success | `#2e7d32` |
| onSuccess | `#ffffff` |
| successContainer | `#c8e6c9` |
| onSuccessContainer | `#1b5e20` |
| warning | `#ed6c02` |
| onWarning | `#ffffff` |
| warningContainer | `#ffe0b2` |
| onWarningContainer | `#e65100` |
| info | `#0288d1` |
| onInfo | `#ffffff` |
| infoContainer | `#bbdefb` |
| onInfoContainer | `#01579b` |

**Dark mode**:
| Role | Value |
|------|-------|
| success | `#81c784` |
| onSuccess | `#1b5e20` |
| successContainer | `#2e7d32` |
| onSuccessContainer | `#c8e6c9` |
| warning | `#ffb74d` |
| onWarning | `#e65100` |
| warningContainer | `#ed6c02` |
| onWarningContainer | `#ffe0b2` |
| info | `#64b5f6` |
| onInfo | `#01579b` |
| infoContainer | `#0288d1` |
| onInfoContainer | `#bbdefb` |

**ColorProp union**: `'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'`

**Color → colorScheme role mapping** (for filled/solid backgrounds):
```ts
export const colorRoleMap: Record<ColorProp, { bg: keyof ColorScheme; fg: keyof ColorScheme; container: keyof ColorScheme; onContainer: keyof ColorScheme }> = {
  primary:   { bg: 'primary',   fg: 'onPrimary',   container: 'primaryContainer',   onContainer: 'onPrimaryContainer'   },
  secondary: { bg: 'secondary', fg: 'onSecondary', container: 'secondaryContainer', onContainer: 'onSecondaryContainer' },
  tertiary:  { bg: 'tertiary',  fg: 'onTertiary',  container: 'tertiaryContainer',  onContainer: 'onTertiaryContainer'  },
  error:     { bg: 'error',     fg: 'onError',     container: 'errorContainer',     onContainer: 'onErrorContainer'     },
  success:   { bg: 'success',   fg: 'onSuccess',   container: 'successContainer',   onContainer: 'onSuccessContainer'   },
  warning:   { bg: 'warning',   fg: 'onWarning',   container: 'warningContainer',   onContainer: 'onWarningContainer'   },
  info:      { bg: 'info',      fg: 'onInfo',      container: 'infoContainer',      onContainer: 'onInfoContainer'      },
};
```

**Rationale**: These values provide MD3-style tonal pairing (container/on-container for backgrounds; role/on-role for filled surfaces), matching what MUI developers already expect.

**Alternatives considered**:
- Generating success/warning/info from seedColor → deferred; requires extending `generatePalette.ts`; static baseline is sufficient for v1 and matches MUI's approach
- Mapping to a custom MD3 "custom color" slot → too abstract for MUI-parity goal

---

## Research 4: `sx` prop — React Native adaptation of MUI's sx system

**Decision**: Implement a `useSx(sx, theme)` hook that resolves `SxProps` to a React Native style object. Full MUI-parity means:
- Flat shorthand keys (spacing + color aliases) — always supported
- Array notation `sx={[obj1, condition && obj2]}` — supported (flatten + merge)
- Responsive object notation `sx={{ mt: { xs: 1, sm: 2 } }}` — supported via `useWindowDimensions`
- CSS-only features (`:hover`, `:focus`, `@media` strings, nested selectors targeting child element types) — **silently ignored** (React Native has no DOM cascade; documenting this as `RN-DEVIATION`)

**Responsive breakpoints** (matched to MUI defaults but using device width):
| Key | Min width |
|-----|-----------|
| xs  | 0dp       |
| sm  | 600dp     |
| md  | 900dp     |
| lg  | 1200dp    |
| xl  | 1536dp    |

**Spacing shorthand resolution**: `sx={{ mt: 2 }}` → `{ marginTop: theme.spacing[2] }` → `{ marginTop: 8 }`. The `theme.spacing` map uses integer keys.

**Color resolution**: `sx={{ color: 'primary' }}` → `{ color: theme.colorScheme.primary }`. If the value is not a `ColorProp` name, it is passed through as-is (allowing raw hex strings).

**Full shorthand key list**:
```
m → margin            p → padding
mt → marginTop        pt → paddingTop
mb → marginBottom     pb → paddingBottom
ml → marginLeft       pl → paddingLeft
mr → marginRight      pr → paddingRight
mx → marginHorizontal px → paddingHorizontal
my → marginVertical   py → paddingVertical
color → color
bg / backgroundColor → backgroundColor
borderColor → borderColor
width / w → width
height / h → height
flex → flex
display → display (limited: 'flex' | 'none' in RN)
gap → gap
rowGap → rowGap
columnGap → columnGap
alignItems → alignItems
justifyContent → justifyContent
flexDirection → flexDirection
flexWrap → flexWrap
flexGrow → flexGrow
flexShrink → flexShrink
flexBasis → flexBasis
position → position
top/right/bottom/left → direct pass-through
zIndex → zIndex
overflow → overflow
opacity → opacity
borderRadius → borderRadius
border / borderWidth → borderWidth
```

**`style` prop precedence**: `sx` styles are computed first, then `StyleSheet.flatten([sxStyles, styleProp])` ensures explicit `style` always wins.

**Performance**: When `sx` is `undefined`, `useSx` returns `undefined` (no allocation, no computation). When present, styles are memoized via `useMemo` with `sx` + viewport width as dependencies.

**Alternatives considered**:
- Importing `@mui/system` as a dependency → rejected: web-only package, cannot use in React Native
- Full CSS-in-JS runtime (styled-components/Emotion) → rejected: significant bundle size increase; violates performance contract
- Building on `react-native-reanimated`'s `useAnimatedStyle` → rejected: `sx` is for static styles, not animations

---

## Research 5: `slots` / `slotProps` — composite component customization

**Decision**: Implement `slots`/`slotProps` on the following composite components only (components with clearly named, independently renderable sub-parts):

| Component | Slots |
|-----------|-------|
| Chip | `root`, `label`, `avatar`, `deleteIcon` |
| TextField | `root`, `input`, `label`, `helperText`, `startAdornment`, `endAdornment` |
| AppBar | `root`, `toolbar` |
| Autocomplete | `root`, `input`, `listbox`, `option`, `noOptionsText`, `tag`, `clearIndicator`, `popupIndicator` |
| Stepper | `root`, `step`, `stepIcon`, `stepLabel`, `stepConnector` |
| Select | `root`, `input`, `listbox`, `option` |
| Breadcrumbs | `root`, `separator`, `item` |
| Alert | `root`, `icon`, `message`, `action` |
| Snackbar | `root`, `content` |
| Card | `root`, `header`, `media`, `content`, `actions` |
| Dialog | `root`, `backdrop`, `paper`, `title`, `content`, `actions` |
| List | `root`, `item`, `itemText`, `itemIcon`, `subheader` |
| Tabs | `root`, `tab`, `indicator` |
| NavigationBar | `root`, `item`, `indicator` |
| Timeline | `root`, `item`, `dot`, `connector`, `content` |

**Type pattern** per component (example for Chip):
```ts
export interface ChipSlots {
  root?: React.ComponentType<ViewProps>;
  label?: React.ComponentType<TextProps>;
  avatar?: React.ComponentType;
  deleteIcon?: React.ComponentType<TouchableOpacityProps>;
}
```

**Rationale**: Limiting to composite components avoids overengineering atomic components (Button, Switch, etc.). `slots`/`slotProps` on atomics would add API surface with no practical use case.

**Alternatives considered**:
- Adding `slots` to all 78 components → too much surface area for v1; only meaningful on composites
- Using `renderSlot` render-prop pattern instead → rejected: MUI parity requires `slots` dictionary

---

## Research 6: Architecture — how existing code will extend

**Current state** (confirmed by code reads):
- `Theme` interface: `{ colorScheme, typography, shape, elevation, mode }` — no `components`
- `createTheme()`: `deepMerge` utility already exists; `overrides` are merged
- `useTheme()`: throws outside provider — all components already call this
- Components: all call `const { theme } = useTheme()` — the hook chain is universal
- No `size` prop on 73/78 components; no `color` prop on 77/78; no `sx` prop anywhere

**New files to create**:

| File | Purpose |
|------|---------|
| `src/tokens/size.ts` | `SizeProp` type + `SizeScale` constants |
| `src/types/shared.ts` | `SizeProp`, `ColorProp`, `SxProps`, `SlotProps` exported for consumers |
| `src/theme/componentsDefs.ts` | `ComponentsConfig` mapped type (all 78 component names) |
| `src/hooks/useComponentDefaults.ts` | Reads and merges `theme.components[name].defaultProps` |
| `src/hooks/useSx.ts` | Converts `SxProps` → RN style; handles array + responsive |
| `src/hooks/useColorRole.ts` | Maps `ColorProp` → `{ bg, fg, container, onContainer }` colorScheme values |

**Modified files** (no breaking changes):

| File | Change |
|------|--------|
| `src/tokens/colors.ts` | +12 roles to `ColorScheme` interface + both `baseLightColors` / `baseDarkColors` |
| `src/tokens/index.ts` | Export `size` + updated `ColorScheme` |
| `src/theme/types.ts` | `Theme` + `components?: ComponentsConfig` |
| `src/theme/createTheme.ts` | `CreateThemeOptions` + `components` + pass through to `Theme` |
| `src/theme/index.ts` | Export `ComponentsConfig` |
| `src/hooks/index.ts` *(if exists)* | Export new hooks |
| `src/index.ts` | Export `SizeProp`, `ColorProp`, `SxProps` from public API |
| All 78 `src/components/<Name>/types.ts` | +`size?`, +`color?` (where applicable), +`sx?` |
| All 78 `src/components/<Name>/<Name>.tsx` | Integrate `useComponentDefaults`, `useSx`, `useColorRole` |
| Composite components | Add `slots?`, `slotProps?` |

---

## Research 7: Constitution compliance assessment

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component Fidelity | ✅ PASS | API mirrors MUI v6 prop names exactly; RN adaptations documented with `// RN-DEVIATION:` |
| II. Design Token Supremacy | ✅ PASS | New 12 color roles added to `src/tokens/colors.ts`; `sx` spacing resolves via `theme.spacing`; no hardcoded literals introduced |
| III. Theme-First Architecture | ✅ PASS | `theme.components`, `useComponentDefaults`, `useColorRole`, `useSx` all consume theme via `useTheme()` |
| IV. Cross-Platform Parity | ✅ PASS | `size`/`color`/`sx` are platform-agnostic; `useSx` breakpoints use `useWindowDimensions` (works iOS + Android) |
| V. Accessibility by Default | ✅ PASS | `size` changes touch target dimensions, ensuring `small` stays ≥32dp; `color` does not affect `accessibilityLabel` |
| VI. Performance Contract | ✅ PASS | `useSx` memoized; when `sx=undefined` no computation; `useComponentDefaults` reads context (no extra renders) |

**Complexity tracker**: No violations requiring justification.

---

## Decisions Summary

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Component keys without "Mui" prefix in `theme.components` | MUI-Native is a distinct library |
| D2 | Merge default props at render time via hook, not at theme creation | Type-safe; instance always overrides |
| D3 | Size scale defined in `src/tokens/size.ts` as constants | Single source of truth; O(1) updates |
| D4 | 12 new `ColorScheme` roles with MUI v6-derived baseline values | MD3-adjacent; MUI developer familiarity |
| D5 | `useSx` returns `undefined` when prop absent | Zero performance overhead |
| D6 | CSS pseudo-selectors in `sx` silently ignored with `// RN-DEVIATION:` comment | No DOM in RN; partial parity documented |
| D7 | `slots`/`slotProps` on 15 composite components only | Atomic components have no distinct sub-parts |
| D8 | No new peer dependencies | Honor constitution constraint |
