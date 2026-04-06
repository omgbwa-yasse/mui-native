# Contract: `theme.components` API

**API surface**: `createTheme()` + `Theme.components` + `useComponentDefaults()`

---

## `createTheme` — updated signature

```ts
// src/theme/createTheme.ts

export interface CreateThemeOptions {
  /** Light or dark mode. Default: 'light' */
  mode?: ColorMode;
  /** Seed color for generating the full MD3 palette. Default: system blue. */
  seedColor?: string;
  /** Deep-merge overrides for colorScheme, typography, shape, elevation. */
  overrides?: DeepPartial<Omit<Theme, 'components'>>;
  /**
   * Per-component default props and style overrides.
   * These are stored verbatim on Theme.components — no deep merge is applied here.
   */
  components?: ComponentsConfig;
}

export function createTheme(options?: CreateThemeOptions): Theme;
```

**Breaking change**: None. `components` is a new optional parameter; all existing call sites remain valid.

---

## `ComponentsConfig` type

```ts
// src/theme/componentsDefs.ts

/**
 * Global component configuration for all 78 MUI-Native components.
 * Each component key maps to an optional ComponentOverride.
 *
 * Key format: ComponentDisplayName (no "Mui" prefix)
 * Example: 'Button', not 'MuiButton'
 */
export type ComponentsConfig = {
  [K in keyof ComponentPropsMap]?: ComponentOverride<ComponentPropsMap[K]>;
};

export interface ComponentOverride<TProps> {
  /**
   * Default props merged into every instance.
   * Instance props always win (instance has higher priority).
   */
  defaultProps?: Partial<TProps>;
  /**
   * Style overrides for named internal slots.
   * Values must be React Native StyleSheet-compatible plain objects.
   * Slot names are component-specific (documented below).
   */
  styleOverrides?: Record<string, object>;
}
```

---

## `useComponentDefaults` hook

```ts
// src/hooks/useComponentDefaults.ts

/**
 * Merges theme-level defaultProps with instance props.
 * Instance props always take precedence (undefined instance key falls through to default).
 *
 * @param componentName - The component's display name (must be a ComponentsConfig key)
 * @param instanceProps - The props passed to the component at the call site
 * @returns Merged props object with defaultProps filled in for missing keys
 *
 * @example
 * function Button(props: ButtonProps) {
 *   const mergedProps = useComponentDefaults('Button', props);
 *   const { variant = 'contained', size = 'medium', color = 'primary', ...rest } = mergedProps;
 * }
 */
export function useComponentDefaults<K extends keyof ComponentPropsMap>(
  componentName: K,
  instanceProps: ComponentPropsMap[K],
): ComponentPropsMap[K];
```

**Merge semantics**:
- `undefined` instance prop → filled from `defaultProps` (if present)
- Explicit instance prop (including explicit `undefined`) → instance value wins
- `defaultProps` not set for component → `instanceProps` returned as-is (no allocation)

---

## `styleOverrides` slot names per component

| Component | Slot names |
|-----------|------------|
| Button | `root`, `label`, `startIcon`, `endIcon`, `loadingIndicator` |
| ButtonGroup | `root`, `grouped` |
| FAB | `root`, `label` |
| IconButton | `root` |
| SpeedDial | `root`, `fab`, `actions` |
| ToggleButton | `root`, `label` |
| ToggleButtonGroup | `root`, `grouped` |
| Checkbox | `root`, `thumb`, `track`, `label` |
| Switch | `root`, `thumb`, `track` |
| Slider | `root`, `track`, `rail`, `thumb`, `mark`, `markLabel`, `valueLabel` |
| TextField | `root`, `input`, `label`, `helperText`, `notchedOutline` |
| Select | `root`, `input`, `icon`, `listbox`, `option` |
| Autocomplete | `root`, `input`, `listbox`, `option`, `tag`, `noOptions`, `clearIndicator`, `popupIndicator` |
| Chip | `root`, `label`, `avatar`, `deleteIcon` |
| Alert | `root`, `icon`, `message`, `action` |
| AppBar | `root`, `toolbar` |
| Card | `root`, `header`, `headerContent`, `media`, `content`, `actions` |
| Dialog | `root`, `backdrop`, `paper`, `title`, `content`, `actions` |
| Drawer | `root`, `paper`, `backdrop` |
| List | `root` |
| ListItem | `root`, `text`, `icon`, `action` |
| Snackbar | `root`, `content`, `action` |
| Tabs | `root`, `tab`, `indicator` |
| Tooltip | `root`, `arrow`, `popper` |
| Typography | `root` |
| Avatar | `root`, `image`, `fallback` |
| Badge | `root`, `badge` |
| Pagination | `root`, `item`, `previous`, `next` |
| Stepper | `root`, `step`, `stepIcon`, `stepLabel`, `connector` |
| NavigationBar | `root`, `item`, `indicator` |
| NavigationDrawer | `root`, `item`, `header` |
| NavigationRail | `root`, `item`, `indicator` |
| Breadcrumbs | `root`, `separator`, `item` |
| Timeline | `root`, `item`, `dot`, `connector`, `content` |
| DataTable | `root`, `header`, `row`, `cell` |
| DataGrid | `root`, `header`, `row`, `cell`, `toolbar`, `footer` |
| *All others* | `root` only |

---

## Usage example

```ts
import { createTheme } from '@mui-native/core';

const theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        variant: 'outlined',
        size: 'large',
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
        label: {
          letterSpacing: 1.5,
        },
      },
    },
    TextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
```

---

## Invariants

1. `theme.components` is read-only after `createTheme()` returns
2. Component keys must match `ComponentPropsMap` keys (TypeScript enforced at compile time)
3. An unrecognized key produces a TypeScript error but is silently ignored at runtime
4. `styleOverrides` values are plain objects (not `StyleSheet.create()` results) — consumed via `StyleSheet.flatten()`
5. `defaultProps` for one component do not affect siblings within the same render tree
