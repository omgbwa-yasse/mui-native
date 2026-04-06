# Contract: Component Props — Shared `size`, `color`, `sx`, `slots`, `slotProps`

**API surface**: Shared prop additions to all 78 component `Props` interfaces

---

## Universal additions (all 78 components)

These four props are added to every component's TypeScript props interface:

```ts
// Added to every <ComponentName>Props interface in src/components/<Name>/types.ts

/** Controls the component's size. Defaults to 'medium'. */
size?: SizeProp;  // 'small' | 'medium' | 'large'

/**
 * The color scheme role the component should use.
 * Only applies to components with a visible accent/indicator color.
 * Layout/utility components accept the prop but ignore it visually.
 */
color?: ColorProp;  // 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'

/**
 * The system prop that allows defining system overrides as well as
 * additional CSS styles. Supports shorthand spacing/color/layout keys,
 * array notation, and responsive breakpoint objects.
 * See contracts/sx-props-api.md for full reference.
 */
sx?: SxProps;

/**
 * Additional React Native style(s) applied to the root element.
 * Overrides both sx and styleOverrides.
 */
style?: StyleProp<ViewStyle>;
```

---

## Composite-only additions (`slots` + `slotProps`)

The following 15 components additionally receive `slots` and `slotProps`:

```
Chip, TextField, AppBar, Autocomplete, Stepper, Select,
Breadcrumbs, Alert, Snackbar, Card, Dialog, List, Tabs,
NavigationBar, Timeline
```

**Pattern** (example for `Chip`):

```ts
// src/components/Chip/types.ts

export interface ChipSlots {
  Root?: React.ComponentType<ViewProps>;
  Label?: React.ComponentType<TextProps>;
  Avatar?: React.ComponentType<any>;
  DeleteIcon?: React.ComponentType<TouchableOpacityProps>;
}

export interface ChipProps extends SlotPropsConfig<ChipSlots> {
  // ... existing ChipProps
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
```

**`SlotPropsConfig` generic** (from `src/types/shared.ts`):

```ts
export interface SlotPropsConfig<TSlots extends Record<string, React.ComponentType<any>>> {
  /**
   * Replaces internal sub-components. The replacement must accept the same props
   * as the default sub-component.
   */
  slots?: Partial<TSlots>;
  /**
   * Extra props forwarded to each sub-component (custom or default).
   * These are shallow-merged after the component's own slot props.
   */
  slotProps?: Partial<{
    [K in keyof TSlots]: React.ComponentPropsWithoutRef<NonNullable<TSlots[K]>>;
  }>;
}
```

---

## Default values per component category

| Category | `size` default | `color` default |
|----------|---------------|-----------------|
| Buttons (Button, ButtonGroup, FAB, IconButton, ToggleButton) | `'medium'` | `'primary'` |
| Input (TextField, Select, Slider, …) | `'medium'` | `'primary'` |
| Feedback (Alert, Badge, Chip, Snackbar) | `'medium'` | `'primary'` (overridden by semantic `severity`) |
| Navigation (Tabs, NavigationBar, …) | `'medium'` | `'primary'` |
| Data display (Avatar, Badge, CircularProgress, …) | `'medium'` | `'primary'` |
| Layout + Utility (Box, Grid, Stack, Container, Portal, Backdrop, Slide, etc.) | `'medium'` | `'primary'` (ignored visually) |

**Note on `color` + `severity`**: `Alert` already has a `severity` prop (`'error' | 'warning' | 'info' | 'success'`) that maps to a color automatically. When both `color` and `severity` are provided, `severity` takes precedence. This matches MUI v6 behavior.

---

## Cascading size propagation

Three container components propagate `size` to their children via React context:

| Container | Children affected |
|-----------|------------------|
| `ButtonGroup` | All `Button` children |
| `ToggleButtonGroup` | All `ToggleButton` children |
| `Tabs` | All `Tab` children |

Pattern:
```ts
// ButtonGroup creates a context
const ButtonGroupContext = React.createContext<{ size?: SizeProp; color?: ColorProp }>({});

// Button reads from context as fallback
function Button({ size: sizeProp, color: colorProp, ...props }) {
  const ctx = React.useContext(ButtonGroupContext);
  const size = sizeProp ?? ctx.size ?? 'medium';
  const color = colorProp ?? ctx.color ?? 'primary';
  // ...
}
```

---

## `isColorProp` type guard

```ts
// src/types/shared.ts

const COLOR_PROPS = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'info'] as const;

export function isColorProp(value: unknown): value is ColorProp {
  return typeof value === 'string' && (COLOR_PROPS as readonly string[]).includes(value);
}
```

Used in `useSx` and `useColorRole` to differentiate role names from raw color strings.

---

## `useColorRole` hook

```ts
// src/hooks/useColorRole.ts

export interface ColorRoleValues {
  /** Main surface/background color */
  bg: string;
  /** Content color on 'bg' */
  fg: string;
  /** Container variant (lighter tonal) */
  container: string;
  /** Content color on 'container' */
  onContainer: string;
}

/**
 * Resolves a ColorProp to concrete colorScheme values from the active theme.
 *
 * @param color - A ColorProp role name (if undefined, returns primary role values)
 * @returns     Concrete hex color strings for {bg, fg, container, onContainer}
 */
export function useColorRole(color: ColorProp | undefined): ColorRoleValues;
```

---

## Breaking changes

**None.** All new props are optional with conservative defaults:
- `size` defaults to `'medium'` — visual output matches pre-feature behavior
- `color` defaults to `'primary'` — existing `color` or `variant`-based behavior unchanged
- `sx={undefined}` → `useSx` returns `undefined`, no style applied
- `slots={undefined}` and `slotProps={undefined}` → components render their default sub-parts unchanged

---

## TypeScript compatibility

All new types are exported from `src/index.ts`:

```ts
export type { SizeProp, ColorProp, SxProps, SlotPropsConfig } from './types/shared';
```

Consumers importing from `@mui-native/core` can write:

```ts
import type { SizeProp, ColorProp, SxProps } from '@mui-native/core';
```
