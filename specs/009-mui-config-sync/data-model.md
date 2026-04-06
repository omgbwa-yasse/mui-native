# Data Model: MUI API Alignment — `009-mui-config-sync`

**Feature**: `009-mui-config-sync`
**Source**: Derived from `spec.md` requirements FR-001 thru FR-006 + research.md decisions D1–D8

---

## Overview

This document defines all new types, interfaces, and data shapes introduced by feature 009. No database schema changes — this is a stateless UI library. All entities are TypeScript types only.

---

## Entity 1: `SizeProp`

**File**: `src/tokens/size.ts` → re-exported via `src/types/shared.ts` and `src/index.ts`

**Description**: The `size` prop union type accepted by all 78 components.

```ts
export type SizeProp = 'small' | 'medium' | 'large';
```

**Invariants**:
- Default value is always `'medium'` (matches MUI default)
- `ButtonGroup`, `ToggleButtonGroup`, `Tabs` propagate `size` to children via React context

---

## Entity 2: `SizeScale`

**File**: `src/tokens/size.ts`

**Description**: Concrete pixel values for each size level. Components consume these via `SIZE_SCALE[size]`. These are constants, not theme tokens (intentionally static — a theme-level size override is deferred to a future feature).

```ts
export interface SizeTokens {
  height: number;
  paddingH: number;
  paddingV: number;
  iconSize: number;
  touchTarget: number;
  fontSizeScale: number; // multiplier applied to base typography slot fontSize
}

export const SIZE_SCALE: Record<SizeProp, SizeTokens> = {
  small:  { height: 32, paddingH: 12, paddingV: 6,  iconSize: 16, touchTarget: 32, fontSizeScale: 0.85 },
  medium: { height: 40, paddingH: 24, paddingV: 10, iconSize: 20, touchTarget: 40, fontSizeScale: 1.0  },
  large:  { height: 48, paddingH: 32, paddingV: 14, iconSize: 24, touchTarget: 48, fontSizeScale: 1.15 },
};
```

**Per-category overrides** (applied inside individual component style implementations):
- Input fields (TextField, Select, Autocomplete …): heights override to `40 / 56 / 64`
- Chips: heights override to `24 / 32 / 40`
- Avatar: diameters override to `24 / 40 / 56`
- Slider: track heights override to `2 / 4 / 6`; thumb sizes `14 / 20 / 24`
- Checkbox/Switch/RadioButton: component sizes override to `16 / 20 / 24`; `touchTarget` always clamped ≥ 32

---

## Entity 3: `ColorProp`

**File**: `src/tokens/size.ts` → also `src/types/shared.ts` for consumers

**Description**: The `color` prop union accepted by non-layout/utility components. Maps to an MD3 color role group.

```ts
export type ColorProp =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';
```

**Invariants**:
- Default varies per component (`'primary'` for Button, `'default'/'inherit'` for Icon)
- Each value has a 4-role mapping in `colorRoleMap` (research D4)

---

## Entity 4: `ExtendedColorScheme` (12 new roles)

**File**: `src/tokens/colors.ts` — extends the existing `ColorScheme` interface

**Description**: The 12 new semantic color roles appended to `ColorScheme`. Named following MD3 tonal role convention (`role`, `onRole`, `roleContainer`, `onRoleContainer`).

```ts
// Addition to existing ColorScheme interface:
success: string;
onSuccess: string;
successContainer: string;
onSuccessContainer: string;
warning: string;
onWarning: string;
warningContainer: string;
onWarningContainer: string;
info: string;
onInfo: string;
infoContainer: string;
onInfoContainer: string;
```

**Baseline values** (added to `baseLightColors` and `baseDarkColors`):

| Role | Light | Dark |
|------|-------|------|
| success | `#2e7d32` | `#81c784` |
| onSuccess | `#ffffff` | `#1b5e20` |
| successContainer | `#c8e6c9` | `#2e7d32` |
| onSuccessContainer | `#1b5e20` | `#c8e6c9` |
| warning | `#ed6c02` | `#ffb74d` |
| onWarning | `#ffffff` | `#e65100` |
| warningContainer | `#ffe0b2` | `#ed6c02` |
| onWarningContainer | `#e65100` | `#ffe0b2` |
| info | `#0288d1` | `#64b5f6` |
| onInfo | `#ffffff` | `#01579b` |
| infoContainer | `#bbdefb` | `#0288d1` |
| onInfoContainer | `#01579b` | `#bbdefb` |

---

## Entity 5: `ComponentOverride<TProps>`

**File**: `src/theme/componentsDefs.ts`

**Description**: Per-component configuration block. Generic over the component's own props type.

```ts
export interface ComponentOverride<TProps> {
  /** Default props merged at render time; instance props always win */
  defaultProps?: Partial<TProps>;
  /**
   * Style overrides keyed by internal slot name.
   * Values are React Native StyleSheet-compatible plain objects.
   *
   * Example keys per component are documented in contracts/theme-components-api.md
   */
  styleOverrides?: Record<string, object>;
}
```

**Constraints**:
- `defaultProps` keys must match the component's TypeScript props interface
- `styleOverrides` slot names are component-specific strings (documented per-component)
- Both fields are independently optional

---

## Entity 6: `ComponentsConfig`

**File**: `src/theme/componentsDefs.ts`

**Description**: The full `theme.components` dictionary type. A mapped type over all 78 component names.

```ts
import type { ButtonProps } from '../components/Button/types';
// ... (all 78 imports)

export interface ComponentPropsMap {
  Button: ButtonProps;
  ButtonGroup: ButtonGroupProps;
  FAB: FABProps;
  IconButton: IconButtonProps;
  SpeedDial: SpeedDialProps;
  ToggleButton: ToggleButtonProps;
  ToggleButtonGroup: ToggleButtonGroupProps;
  Checkbox: CheckboxProps;
  DatePicker: DatePickerProps;
  DateTimePicker: DateTimePickerProps;
  NumberField: NumberFieldProps;
  OTPInput: OTPInputProps;
  RadioButton: RadioButtonProps;
  RadioGroup: RadioGroupProps;
  Rating: RatingProps;
  SearchBar: SearchBarProps;
  Select: SelectProps;
  Slider: SliderProps;
  Switch: SwitchProps;
  TextField: TextFieldProps;
  TimePicker: TimePickerProps;
  TransferList: TransferListProps;
  Accordion: AccordionProps;
  Alert: AlertProps;
  AppBar: AppBarProps;
  Autocomplete: AutocompleteProps;
  Avatar: AvatarProps;
  AvatarGroup: AvatarGroupProps;
  Backdrop: BackdropProps;
  Badge: BadgeProps;
  BottomNavigation: BottomNavigationProps;
  Breadcrumbs: BreadcrumbsProps;
  Card: CardProps;
  Chip: ChipProps;
  CircularProgress: CircularProgressProps;
  Collapse: CollapseProps;
  DataGrid: DataGridProps;
  DataTable: DataTableProps;
  Dialog: DialogProps;
  Divider: DividerProps;
  Drawer: DrawerProps;
  Fade: FadeProps;
  Grow: GrowProps;
  ImageList: ImageListProps;
  LinearProgress: LinearProgressProps;
  Link: LinkProps;
  List: ListProps;
  Modal: ModalProps;
  NavigationBar: NavigationBarProps;
  NavigationDrawer: NavigationDrawerProps;
  NavigationRail: NavigationRailProps;
  Pagination: PaginationProps;
  Paper: PaperProps;
  Popover: PopoverProps;
  Portal: PortalProps;
  Skeleton: SkeletonProps;
  Slide: SlideProps;
  Snackbar: SnackbarProps;
  Stack: StackProps;
  Stepper: StepperProps;
  SvgIcon: SvgIconProps;
  Table: TableProps;
  Tabs: TabsProps;
  Timeline: TimelineProps;
  Tooltip: TooltipProps;
  Typography: TypographyProps;
  Zoom: ZoomProps;
  Box: BoxProps;
  Container: ContainerProps;
  Grid: GridProps;
  ImageListItem: ImageListItemProps;
  ImageListItemBar: ImageListItemBarProps;
  ActivityIndicator: ActivityIndicatorProps;
  // Remaining components from src/components/ directory
  // (final list reconciled at implementation time against directory listing)
}

export type ComponentsConfig = {
  [K in keyof ComponentPropsMap]?: ComponentOverride<ComponentPropsMap[K]>;
};
```

---

## Entity 7: `Theme` (extension)

**File**: `src/theme/types.ts` — adds one optional field to the existing interface

```ts
// Existing interface extended:
export interface Theme {
  colorScheme: ColorScheme;   // existing — now extended with 12 new roles
  typography: TypographyScale; // existing — unchanged
  shape: ShapeScale;           // existing — unchanged
  elevation: ElevationScale;   // existing — unchanged
  mode: ColorMode;             // existing — unchanged
  components?: ComponentsConfig; // NEW — optional; undefined means no global overrides
}
```

---

## Entity 8: `CreateThemeOptions` (extension)

**File**: `src/theme/createTheme.ts` — adds one optional parameter to the existing function signature

```ts
// Existing interface extended:
export interface CreateThemeOptions {
  mode?: ColorMode;             // existing
  seedColor?: string;           // existing
  overrides?: DeepPartial<Omit<Theme, 'components'>>; // existing — components excluded from deep merge
  components?: ComponentsConfig; // NEW — stored verbatim on Theme.components
}
```

**Note**: `components` is explicitly excluded from the deep merge path. Component configs become `theme.components` as provided — no structural merging.

---

## Entity 9: `SxProps`

**File**: `src/types/shared.ts`

**Description**: The `sx` prop type accepted by all 78 components. Supports flat shorthand keys, array notation, and responsive object notation.

```ts
/** Spacing values: number index into theme.spacing, or a raw CSS string (passed through). */
type SpacingValue = number | string;

/** Color values: a ColorProp role name, or a raw CSS hex/rgb string. */
type ColorValue = ColorProp | string;

/** Responsive value: a plain value OR a breakpoint map. */
type Responsive<T> = T | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;

export interface SxObject {
  // Spacing shorthands (resolve via theme.spacing[n])
  m?: Responsive<SpacingValue>;
  mt?: Responsive<SpacingValue>;
  mb?: Responsive<SpacingValue>;
  ml?: Responsive<SpacingValue>;
  mr?: Responsive<SpacingValue>;
  mx?: Responsive<SpacingValue>;
  my?: Responsive<SpacingValue>;
  p?: Responsive<SpacingValue>;
  pt?: Responsive<SpacingValue>;
  pb?: Responsive<SpacingValue>;
  pl?: Responsive<SpacingValue>;
  pr?: Responsive<SpacingValue>;
  px?: Responsive<SpacingValue>;
  py?: Responsive<SpacingValue>;

  // Color
  color?: Responsive<ColorValue>;
  bg?: Responsive<ColorValue>;
  backgroundColor?: Responsive<ColorValue>;
  borderColor?: Responsive<ColorValue>;

  // Layout
  width?: Responsive<number | string>;
  w?: Responsive<number | string>;
  height?: Responsive<number | string>;
  h?: Responsive<number | string>;
  flex?: Responsive<number>;
  display?: Responsive<'flex' | 'none'>;  // RN-DEVIATION: only 'flex' | 'none' in RN
  gap?: Responsive<number>;
  rowGap?: Responsive<number>;
  columnGap?: Responsive<number>;
  alignItems?: Responsive<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>;
  justifyContent?: Responsive<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>;
  flexDirection?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  flexWrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
  flexGrow?: Responsive<number>;
  flexShrink?: Responsive<number>;
  flexBasis?: Responsive<number | string>;

  // Positioning
  position?: Responsive<'absolute' | 'relative'>;
  top?: Responsive<number | string>;
  right?: Responsive<number | string>;
  bottom?: Responsive<number | string>;
  left?: Responsive<number | string>;
  zIndex?: Responsive<number>;

  // Visual
  overflow?: Responsive<'visible' | 'hidden' | 'scroll'>;
  opacity?: Responsive<number>;
  borderRadius?: Responsive<number | string>;
  border?: Responsive<number>;
  borderWidth?: Responsive<number>;

  // Catch-all for valid RN style props not enumerated above
  [key: string]: unknown;
}

/** Array notation: `sx={[{ mt: 2 }, condition && { mb: 1 }]}` */
export type SxProps = SxObject | ReadonlyArray<SxObject | boolean | null | undefined>;
```

---

## Entity 10: `SlotProps<TSlots>`

**File**: `src/types/shared.ts`

**Description**: Generic slot props type. `TSlots` is a per-component slots dictionary type (e.g., `ChipSlots`).

```ts
/**
 * `slots`: replace a sub-component with a custom component (must accept same props)
 * `slotProps`: pass extra props to the (possibly replaced) sub-component
 */
export interface SlotPropsConfig<TSlots extends Record<string, React.ComponentType<any>>> {
  slots?: Partial<TSlots>;
  slotProps?: Partial<{
    [K in keyof TSlots]: React.ComponentPropsWithoutRef<TSlots[K]>;
  }>;
}
```

---

## Entity Relationships

```
CreateThemeOptions
    └─ components?: ComponentsConfig
                      └─ [ComponentName]: ComponentOverride<TProps>
                                              ├─ defaultProps?: Partial<TProps>
                                              └─ styleOverrides?: Record<string, object>

Theme (runtime)
    ├─ colorScheme: ColorScheme (now +12 roles)
    └─ components?: ComponentsConfig

Component (render path)
    ├─ receives instanceProps (e.g., size, color, sx)
    ├─ calls useComponentDefaults(name, instanceProps) → merged props
    ├─ calls useColorRole(color) → { bg, fg, container, onContainer }
    ├─ calls useSx(sx, theme) → RN style object | undefined
    └─ combines: [...sxStyles, styleFromThemeProp, instanceStyleProp]
```

---

## State Transitions

No state machines. Components are stateless with respect to this feature. `theme.components` is read-only at render time (set once at `createTheme()` call, immutable after).

---

## Validation Rules

| Entity | Rule |
|--------|------|
| `SizeProp` | Must be one of `'small' \| 'medium' \| 'large'`; default to `'medium'` if omitted |
| `ColorProp` | Must be one of 7 named values; unrecognized strings in `sx.color` pass through as raw values |
| `SxProps` number spacing | Array index into `theme.spacing`; out-of-range values are passed as-is (no clamping) |
| `ComponentsConfig` keys | Limited to `ComponentPropsMap` keys; unknown keys allowed by TS index signature but produce no effect |
| `styleOverrides` slot names | Validated per-component at usage sites; unknown slot names silently ignored |
