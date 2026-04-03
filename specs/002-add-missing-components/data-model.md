# Data Model: Add Missing UI Components

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02
**Source spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

All TypeScript interfaces belong in each component's `types.ts` file at  
`src/components/<ComponentName>/types.ts`.

Shared base interfaces:
```ts
// shared across all interactive components
interface BaseProps {
  testID?:             string;
  style?:              StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
```

---

## Phase 1 — Core Utilities

### Portal
**MD3 reference**: https://m3.material.io/foundations/interaction/overlays  
**File**: `src/components/Portal/types.ts`

```ts
export interface PortalProps {
  children: React.ReactNode;
  /** Key to identify this portal mount; auto-generated if omitted */
  key?: string;
}

export interface PortalHostProps {
  children: React.ReactNode;
}
```

---

### TouchableRipple
**MD3 reference**: https://m3.material.io/foundations/interaction/states  
**File**: `src/components/TouchableRipple/types.ts`

```ts
export interface TouchableRippleProps extends BaseProps {
  children:           React.ReactNode;
  onPress?:           () => void;
  onLongPress?:       () => void;
  disabled?:          boolean;
  /** Ripple color — defaults to theme.colors.onSurface */
  rippleColor?:       string;
  /** 0–1 opacity of ripple — defaults to 0.12 (MD3 state layer) */
  rippleOpacity?:     number;
  borderless?:        boolean;
  accessibilityRole?: AccessibilityRole;
}
```

---

### Icon
**MD3 reference**: https://m3.material.io/styles/icons/overview  
**File**: `src/components/Icon/types.ts`

```ts
export type IconSource =
  | string
  | React.ReactNode
  | ((props: { size: number; color: string }) => React.ReactNode);

export interface IconProps extends BaseProps {
  source:  IconSource;
  size?:   number;   // default: 24
  color?:  string;   // default: theme.colors.onSurface
}
```

---

### Text (Typography)
**MD3 reference**: https://m3.material.io/styles/typography/type-scale-tokens  
**File**: `src/components/Text/types.ts`

```ts
export type TextVariant =
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
  | 'titleLarge' | 'titleMedium' | 'titleSmall'
  | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  | 'labelLarge' | 'labelMedium' | 'labelSmall';

export interface TextProps {
  variant?:  TextVariant;  // default: 'bodyMedium'
  children:  React.ReactNode;
  style?:    StyleProp<TextStyle>;
  /** Forward any RN Text prop */
  [key: string]: unknown;
}
```

---

## Phase 2 — P1 Feedback & Overlay

### ActivityIndicator
**MD3 reference**: https://m3.material.io/components/progress-indicators  
**File**: `src/components/ActivityIndicator/types.ts`

```ts
export type ActivityIndicatorVariant = 'circular' | 'linear';

export interface ActivityIndicatorProps extends BaseProps {
  variant?:     ActivityIndicatorVariant; // default: 'circular'
  /** 0–1 for determinate; undefined for indeterminate */
  progress?:    number;
  color?:       string;  // default: theme.colors.primary
  size?:        'small' | 'large' | number;  // default: 'small'
  animating?:   boolean;  // default: true
}
```

---

### Skeleton
**MD3 reference**: https://m3.material.io/components/progress-indicators/specs  
**File**: `src/components/Skeleton/types.ts`

```ts
export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps extends BaseProps {
  variant?:  SkeletonVariant;  // default: 'rectangular'
  width?:    number | string;
  height?:   number | string;
  /** Number of text-line rows when variant='text' */
  lines?:    number;
  /** Animation variant; false disables animation */
  animation?: 'shimmer' | 'pulse' | false;
}
```

---

### Alert
**MD3 reference**: https://m3.material.io/components/dialogs  
**File**: `src/components/Alert/types.ts`

```ts
export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export interface AlertProps extends BaseProps {
  severity:     AlertSeverity;
  children:     React.ReactNode;
  title?:       string;
  /** Custom icon; defaults to severity icon */
  icon?:        IconSource | false;
  onClose?:     () => void;
  action?:      React.ReactNode;
  variant?:     'filled' | 'outlined' | 'standard';  // default: 'standard'
}
```

---

### Backdrop
**MD3 reference**: https://m3.material.io/components/navigation-drawer  
**File**: `src/components/Backdrop/types.ts`

```ts
export interface BackdropProps extends BaseProps {
  visible:       boolean;
  onDismiss?:    () => void;
  /** Backdrop dimmer opacity 0–1; default: 0.5 */
  opacity?:      number;
  children?:     React.ReactNode;
}
```

---

### Snackbar
**MD3 reference**: https://m3.material.io/components/snackbar  
**File**: `src/components/Snackbar/types.ts`

```ts
export interface SnackbarAction {
  label:    string;
  onPress:  () => void;
}

export interface SnackbarProps extends BaseProps {
  visible:      boolean;
  onDismiss:    () => void;
  children:     React.ReactNode;
  action?:      SnackbarAction;
  duration?:    'short' | 'long' | number;  // default: 'short' (4000 ms)
  /** Vertical distance from the bottom edge */
  wrapperStyle?: StyleProp<ViewStyle>;
}
```

---

### Modal
**MD3 reference**: https://m3.material.io/components/dialogs  
**File**: `src/components/Modal/types.ts`

```ts
export interface ModalProps extends BaseProps {
  visible:        boolean;
  onDismiss?:     () => void;
  children:       React.ReactNode;
  /** Whether tapping the backdrop dismisses the modal */
  dismissable?:   boolean;  // default: true
  contentContainerStyle?: StyleProp<ViewStyle>;
}
```

---

## Phase 3 — P1 Form Controls

### Checkbox
**MD3 reference**: https://m3.material.io/components/checkbox  
**File**: `src/components/Checkbox/types.ts`

```ts
export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps extends BaseProps {
  status?:          CheckboxStatus;  // controlled
  onValueChange?:   (checked: boolean) => void;
  disabled?:        boolean;
  color?:           string;  // default: theme.colors.primary
  label?:           string;
  labelStyle?:      StyleProp<TextStyle>;
}
```

---

### RadioButton
**MD3 reference**: https://m3.material.io/components/radio-button  
**File**: `src/components/RadioButton/types.ts`

```ts
export interface RadioButtonProps extends BaseProps {
  value:            string;
  /** Provided by RadioGroup context or explicit prop */
  status?:          'checked' | 'unchecked';
  onPress?:         (value: string) => void;
  disabled?:        boolean;
  color?:           string;
  label?:           string;
  labelStyle?:      StyleProp<TextStyle>;
}

export interface RadioGroupProps {
  value:            string;
  onValueChange:    (value: string) => void;
  children:         React.ReactNode;
  style?:           StyleProp<ViewStyle>;
}
```

---

### Switch
**MD3 reference**: https://m3.material.io/components/switch  
**File**: `src/components/Switch/types.ts`

```ts
export interface SwitchProps extends BaseProps {
  value?:           boolean;  // controlled
  onValueChange?:   (value: boolean) => void;
  disabled?:        boolean;
  color?:           string;
  /** Icon shown on the thumb */
  thumbIcon?:       IconSource;
  label?:           string;
  labelStyle?:      StyleProp<TextStyle>;
}
```

---

### Slider
**MD3 reference**: https://m3.material.io/components/sliders  
**File**: `src/components/Slider/types.ts`

```ts
export interface SliderProps extends BaseProps {
  value?:           number;  // controlled; default: 0
  onValueChange?:   (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  minimumValue?:    number;  // default: 0
  maximumValue?:    number;  // default: 100
  step?:            number;  // default: 1
  disabled?:        boolean;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?:  string;
}
```

---

### Select
**MD3 reference**: https://m3.material.io/components/menus  
**File**: `src/components/Select/types.ts`

```ts
export interface SelectOption<T = string> {
  label:    string;
  value:    T;
  disabled?: boolean;
}

export interface SelectProps<T = string> extends BaseProps {
  options:          SelectOption<T>[];
  value?:           T;  // controlled
  onValueChange?:   (value: T) => void;
  placeholder?:     string;
  label?:           string;
  disabled?:        boolean;
  error?:           boolean;
  helperText?:      string;
}
```

---

### Searchbar
**MD3 reference**: https://m3.material.io/components/search  
**File**: `src/components/Searchbar/types.ts`

```ts
export interface SearchbarProps extends BaseProps {
  value?:           string;  // controlled
  onChangeText?:    (text: string) => void;
  placeholder?:     string;
  onSubmitEditing?: () => void;
  onClearIconPress?: () => void;
  /** Custom icon rendered on the left */
  icon?:            IconSource;
  /** Right side slot — e.g., avatar or additional action */
  right?:           React.ReactNode;
  loading?:         boolean;
  elevation?:       0 | 1 | 2 | 3 | 4;
}
```

---

### SegmentedButtons
**MD3 reference**: https://m3.material.io/components/segmented-buttons  
**File**: `src/components/SegmentedButtons/types.ts`

```ts
export interface SegmentedButtonItem {
  value:     string;
  label?:    string;
  icon?:     IconSource;
  disabled?: boolean;
}

export interface SegmentedButtonsProps extends BaseProps {
  buttons:          SegmentedButtonItem[];
  /** Currently selected value(s) */
  value:            string | string[];
  onValueChange:    (value: string | string[]) => void;
  /** Allow multiple selection */
  multiSelect?:     boolean;  // default: false
  density?:         'regular' | 'dense';
}
```

---

### ToggleButton
**MD3 reference**: https://m3.material.io/components/buttons  
**File**: `src/components/ToggleButton/types.ts`

```ts
export interface ToggleButtonProps extends BaseProps {
  value:            string;
  icon?:            IconSource;
  label?:           string;
  status?:          'checked' | 'unchecked';  // controlled
  onPress?:         (value: string) => void;
  disabled?:        boolean;
  size?:            'small' | 'medium' | 'large';
}

export interface ToggleButtonGroupProps {
  value:            string | string[];
  onValueChange:    (value: string | string[]) => void;
  children:         React.ReactNode;
  /** Allow deselecting all — default: false */
  nullable?:        boolean;
  style?:           StyleProp<ViewStyle>;
}
```

---

### Autocomplete
**MD3 reference**: https://m3.material.io/components/text-fields  
**File**: `src/components/Autocomplete/types.ts`

```ts
export interface AutocompleteOption<T = string> {
  label:   string;
  value:   T;
}

export interface AutocompleteProps<T = string> extends BaseProps {
  options:          AutocompleteOption<T>[];
  value?:           T | null;
  onValueChange?:   (value: T | null) => void;
  inputValue?:      string;
  onInputChange?:   (text: string) => void;
  placeholder?:     string;
  label?:           string;
  disabled?:        boolean;
  loading?:         boolean;
  /** Render custom option rows */
  renderOption?:    (option: AutocompleteOption<T>) => React.ReactNode;
  /** Filter function — defaults to case-insensitive label contains */
  filterOptions?:   (options: AutocompleteOption<T>[], inputValue: string) => AutocompleteOption<T>[];
  freeSolo?:        boolean;  // allow arbitrary input values
}
```

---

### NumberField
**MD3 reference**: https://m3.material.io/components/text-fields  
**File**: `src/components/NumberField/types.ts`

```ts
export interface NumberFieldProps extends BaseProps {
  value?:           number;  // controlled
  onValueChange?:   (value: number) => void;
  min?:             number;
  max?:             number;
  step?:            number;  // default: 1
  disabled?:        boolean;
  label?:           string;
  placeholder?:     string;
  error?:           boolean;
  helperText?:      string;
  /** Show increment/decrement buttons */
  showStepper?:     boolean;  // default: true
}
```

---

## Phase 4 — P2 Navigation & Structure

### Tabs
**MD3 reference**: https://m3.material.io/components/tabs  
**File**: `src/components/Tabs/types.ts`

```ts
export interface TabItem {
  value:     string;
  label:     string;
  icon?:     IconSource;
  badge?:    number | string;
  disabled?: boolean;
}

export interface TabsProps extends BaseProps {
  items:            TabItem[];
  value:            string;
  onValueChange:    (value: string) => void;
  variant?:         'primary' | 'secondary';  // default: 'primary'
  /** Render tab panel content; receives active tab value */
  children?:        (value: string) => React.ReactNode;
  scrollable?:      boolean;  // auto-true when items exceed viewport
}
```

---

### Drawer
**MD3 reference**: https://m3.material.io/components/navigation-drawer  
**File**: `src/components/Drawer/types.ts`

```ts
export type DrawerAnchor = 'left' | 'right';
export type DrawerVariant = 'temporary' | 'persistent' | 'permanent';

export interface DrawerItem {
  key:       string;
  label:     string;
  icon?:     IconSource;
  badge?:    number | string;
  onPress?:  () => void;
  active?:   boolean;
}

export interface DrawerProps extends BaseProps {
  open:             boolean;
  onClose?:         () => void;
  anchor?:          DrawerAnchor;   // default: 'left'
  variant?:         DrawerVariant;  // default: 'temporary'
  children?:        React.ReactNode;
  drawerWidth?:     number;  // default: 280 (from spacing tokens ≈ 70 × 4 dp)
}
```

---

### Stepper
**MD3 reference**: https://m3.material.io/components/steppers  
**File**: `src/components/Stepper/types.ts`

```ts
export type StepState = 'completed' | 'active' | 'upcoming' | 'error';

export interface StepItem {
  label:       string;
  description?: string;
  state?:       StepState;
  optional?:    boolean;
}

export interface StepperProps extends BaseProps {
  steps:            StepItem[];
  activeStep:       number;
  orientation?:     'horizontal' | 'vertical';  // default: 'horizontal'
  nonLinear?:       boolean;  // default: false
  onStepPress?:     (index: number) => void;
}
```

---

### Pagination
**MD3 reference**: https://m3.material.io/components/paginations  
**File**: `src/components/Pagination/types.ts`

```ts
export interface PaginationProps extends BaseProps {
  count:            number;
  page:             number;  // 1-indexed
  onPageChange:     (page: number) => void;
  /** Number of always-visible page buttons around current page */
  siblingCount?:    number;  // default: 1
  /** Number of always-visible page buttons at start/end */
  boundaryCount?:   number;  // default: 1
  disabled?:        boolean;
  showFirstButton?: boolean;
  showLastButton?:  boolean;
  size?:            'small' | 'medium' | 'large';
}
```

---

### Breadcrumbs
**MD3 reference**: https://m3.material.io/components/navigation  
**File**: `src/components/Breadcrumbs/types.ts`

```ts
export interface BreadcrumbItem {
  label:    string;
  onPress?: () => void;
  icon?:    IconSource;
}

export interface BreadcrumbsProps extends BaseProps {
  items:            BreadcrumbItem[];
  /** Custom separator node — default: '/' */
  separator?:       React.ReactNode | string;
  /** Max visible items before collapsing; default: 0 (show all) */
  maxItems?:        number;
}
```

---

### SpeedDial
**MD3 reference**: https://m3.material.io/components/extended-fab  
**File**: `src/components/SpeedDial/types.ts`

```ts
export interface SpeedDialAction {
  key:       string;
  icon:      IconSource;
  label?:    string;
  onPress?:  () => void;
  disabled?: boolean;
}

export interface SpeedDialProps extends BaseProps {
  actions:          SpeedDialAction[];
  icon?:            IconSource;
  /** Icon displayed when open — defaults to close icon */
  openIcon?:        IconSource;
  open?:            boolean;  // controlled
  onOpen?:          () => void;
  onClose?:         () => void;
  direction?:       'up' | 'down' | 'left' | 'right';  // default: 'up'
  label?:           string;  // accessibility
}
```

---

## Phase 5 — P2 Display & Content

### Avatar
**MD3 reference**: https://m3.material.io/components/chips (avatar chips)  
**File**: `src/components/Avatar/types.ts`

```ts
export interface AvatarProps extends BaseProps {
  /** Image source — if provided and loads successfully, takes precedence */
  source?:          ImageSourcePropType;
  /** Initials / fallback label */
  label?:           string;
  /** Fallback icon when no source and no label */
  icon?:            IconSource;
  size?:            number;  // default: 40
  color?:           string;  // background color
  labelColor?:      string;
}
```

---

### Badge
**MD3 reference**: https://m3.material.io/components/badges  
**File**: `src/components/Badge/types.ts`

```ts
export interface BadgeProps extends BaseProps {
  /** Display value; if omitted, renders a dot badge */
  content?:         number | string;
  /** Overflow cap — renders `${max}+` when content > max; default: 99 */
  max?:             number;
  visible?:         boolean;  // default: true
  color?:           string;   // default: theme.colors.error
  labelColor?:      string;   // default: theme.colors.onError
  children?:        React.ReactNode;
  /** Badge anchor corner */
  anchorOrigin?:    { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
}
```

---

### List
**MD3 reference**: https://m3.material.io/components/lists  
**File**: `src/components/List/types.ts`

```ts
export interface ListItemProps extends BaseProps {
  title:             string;
  description?:      string;
  left?:             (props: { color: string }) => React.ReactNode;
  right?:            (props: { color: string }) => React.ReactNode;
  onPress?:          () => void;
  onLongPress?:      () => void;
  disabled?:         boolean;
  /** Indent the item (for nested lists) */
  indent?:           number;
}

export interface ListProps extends BaseProps {
  children:          React.ReactNode;
}

export interface ListSectionProps extends BaseProps {
  title?:            string;
  children:          React.ReactNode;
}

export interface ListAccordionProps extends ListItemProps {
  expanded?:         boolean;
  onPress?:          () => void;
  children:          React.ReactNode;
  id?:               string;
}
```

---

### DataTable
**MD3 reference**: https://m3.material.io/components/data-tables  
**File**: `src/components/DataTable/types.ts`

```ts
export interface DataTableColumn<T = Record<string, unknown>> {
  key:           string;
  header:        string;
  sortable?:     boolean;
  width?:        number | string;
  renderCell?:   (row: T) => React.ReactNode;
  align?:        'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc';

export interface DataTableProps<T = Record<string, unknown>> extends BaseProps {
  columns:          DataTableColumn<T>[];
  rows:             T[];
  keyExtractor:     (row: T) => string;
  sortColumn?:      string;
  sortDirection?:   SortDirection;
  onSort?:          (column: string, direction: SortDirection) => void;
  selectedRows?:    string[];
  onRowSelect?:     (keys: string[]) => void;
  /** Slot rendered when rows is empty */
  emptyState?:      React.ReactNode;
  /** Pass-through to the underlying FlatList */
  onEndReached?:    () => void;
}
```

---

### Divider
**MD3 reference**: https://m3.material.io/components/divider  
**File**: `src/components/Divider/types.ts`

```ts
export interface DividerProps extends BaseProps {
  orientation?:  'horizontal' | 'vertical';  // default: 'horizontal'
  /** Full-width vs inset (with left padding matching list items) */
  variant?:      'fullWidth' | 'inset' | 'middle';
  bold?:         boolean;
}
```

---

### Tooltip
**MD3 reference**: https://m3.material.io/components/tooltips  
**File**: `src/components/Tooltip/types.ts`

```ts
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends BaseProps {
  title:            string;
  children:         React.ReactElement;
  placement?:       TooltipPlacement;  // default: 'top'
  /** Delay in ms before showing */
  enterDelay?:      number;
  /** Delay in ms before hiding */
  leaveDelay?:      number;
  arrow?:           boolean;
}
```

---

### Rating
**MD3 reference**: https://m3.material.io/styles/iconography (star icons)  
**File**: `src/components/Rating/types.ts`

```ts
export interface RatingProps extends BaseProps {
  value?:           number;  // controlled; 0–max
  onValueChange?:   (value: number) => void;
  max?:             number;  // default: 5
  precision?:       0.5 | 1;  // default: 1
  disabled?:        boolean;
  readOnly?:        boolean;
  size?:            'small' | 'medium' | 'large';
  /** Custom active icon */
  icon?:            IconSource;
  /** Custom empty icon */
  emptyIcon?:       IconSource;
  color?:           string;
}
```

---

### Banner
**MD3 reference**: https://m3.material.io/components/banners  
**File**: `src/components/Banner/types.ts`

```ts
export interface BannerAction {
  label:    string;
  onPress:  () => void;
}

export interface BannerProps extends BaseProps {
  visible:          boolean;
  children:         React.ReactNode;
  actions?:         BannerAction[];
  icon?:            IconSource;
  contentStyle?:    StyleProp<ViewStyle>;
}
```

---

### IconButton
**MD3 reference**: https://m3.material.io/components/icon-buttons  
**File**: `src/components/IconButton/types.ts`

```ts
export type IconButtonVariant = 'standard' | 'filled' | 'filled-tonal' | 'outlined';

export interface IconButtonProps extends BaseProps {
  icon:             IconSource;
  onPress?:         () => void;
  onLongPress?:     () => void;
  disabled?:        boolean;
  selected?:        boolean;  // for toggle behavior
  variant?:         IconButtonVariant;  // default: 'standard'
  size?:            number;  // default: 24 (icon size); button hit area scales accordingly
  color?:           string;
  containerColor?:  string;
  accessibilityLabel: string;  // required — no visual label
}
```

---

## Phase 6 — P3 Layout Primitives

### Box
**MD3 reference**: https://m3.material.io/foundations/layout  
**File**: `src/components/Box/types.ts`

```ts
export interface BoxProps {
  children?:        React.ReactNode;
  style?:           StyleProp<ViewStyle>;
  /** Shorthand for padding (uses spacing tokens: xs, sm, md, lg, xl) */
  p?:               keyof SpacingScale;
  pt?:              keyof SpacingScale;
  pb?:              keyof SpacingScale;
  pl?:              keyof SpacingScale;
  pr?:              keyof SpacingScale;
  px?:              keyof SpacingScale;
  py?:              keyof SpacingScale;
  /** Shorthand for margin */
  m?:               keyof SpacingScale;
  mt?:              keyof SpacingScale;
  mb?:              keyof SpacingScale;
  ml?:              keyof SpacingScale;
  mr?:              keyof SpacingScale;
  mx?:              keyof SpacingScale;
  my?:              keyof SpacingScale;
  testID?:          string;
}
```

---

### Container
**MD3 reference**: https://m3.material.io/foundations/layout  
**File**: `src/components/Container/types.ts`

```ts
export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ContainerProps {
  children?:        React.ReactNode;
  maxWidth?:        ContainerMaxWidth;  // default: 'lg'
  disableGutters?:  boolean;
  style?:           StyleProp<ViewStyle>;
  testID?:          string;
}
```

---

### Grid
**MD3 reference**: https://m3.material.io/foundations/layout/applying-the-grid  
**File**: `src/components/Grid/types.ts`

```ts
export interface GridProps {
  children?:        React.ReactNode;
  columns?:         number;  // default: 12
  spacing?:         number | keyof SpacingScale;  // gap between all items
  columnSpacing?:   number | keyof SpacingScale;
  rowSpacing?:      number | keyof SpacingScale;
  style?:           StyleProp<ViewStyle>;
  testID?:          string;
}

export interface GridItemProps {
  children?:        React.ReactNode;
  /** Column span (1–12); default: 'auto' */
  xs?:              number | 'auto';
  sm?:              number | 'auto';
  md?:              number | 'auto';
  lg?:              number | 'auto';
  style?:           StyleProp<ViewStyle>;
}
```

---

### Stack
**MD3 reference**: https://m3.material.io/foundations/layout  
**File**: `src/components/Stack/types.ts`

```ts
export interface StackProps {
  children?:         React.ReactNode;
  direction?:        'row' | 'column' | 'row-reverse' | 'column-reverse';  // default: 'column'
  spacing?:          number | keyof SpacingScale;  // default: 0
  divider?:          React.ReactElement;
  alignItems?:       FlexStyle['alignItems'];
  justifyContent?:   FlexStyle['justifyContent'];
  flexWrap?:         'wrap' | 'nowrap';
  style?:            StyleProp<ViewStyle>;
  testID?:           string;
}
```

---

### Paper (Surface)
**MD3 reference**: https://m3.material.io/styles/elevation/tokens  
**File**: `src/components/Paper/types.ts`

```ts
export type PaperMode = 'flat' | 'elevated';

export interface PaperProps extends BaseProps {
  children?:        React.ReactNode;
  elevation?:       0 | 1 | 2 | 3 | 4 | 5;  // default: 1
  mode?:            PaperMode;  // default: 'elevated'
  /** Custom corner radius — defaults to shape token */
  borderRadius?:    number;
}
```

---

### Accordion
**MD3 reference**: https://m3.material.io/components/lists  
**File**: `src/components/Accordion/types.ts`

```ts
export interface AccordionProps extends BaseProps {
  title:             string;
  children:          React.ReactNode;
  expanded?:         boolean;  // controlled
  onToggle?:         (expanded: boolean) => void;
  left?:             React.ReactNode;
  right?:            (expanded: boolean) => React.ReactNode;
  disabled?:         boolean;
  titleStyle?:       StyleProp<TextStyle>;
}
```

---

### ImageList
**MD3 reference**: https://m3.material.io/components/image-lists  
**File**: `src/components/ImageList/types.ts`

```ts
export interface ImageListItem {
  key:       string;
  source:    ImageSourcePropType;
  title?:    string;
  subtitle?: string;
  cols?:     number;
  rows?:     number;
}

export type ImageListVariant = 'standard' | 'quilted' | 'woven' | 'masonry';

export interface ImageListProps extends BaseProps {
  items:            ImageListItem[];
  cols?:            number;  // default: 2
  gap?:             number;  // default: 4 (tokens.spacing.xs)
  variant?:         ImageListVariant;  // default: 'standard'
  rowHeight?:       number | 'auto';
}
```

---

## Phase 7 — Specialized Utilities

### ButtonGroup
**MD3 reference**: https://m3.material.io/components/buttons  
**File**: `src/components/ButtonGroup/types.ts`

```ts
export interface ButtonGroupProps extends BaseProps {
  children:         React.ReactNode;  // expects <Button> children
  variant?:         'contained' | 'outlined' | 'text';  // default: 'outlined'
  orientation?:     'horizontal' | 'vertical';  // default: 'horizontal'
  size?:            'small' | 'medium' | 'large';
  disabled?:        boolean;
  fullWidth?:       boolean;
}
```

---

### HelperText
**MD3 reference**: https://m3.material.io/components/text-fields  
**File**: `src/components/HelperText/types.ts`

```ts
export type HelperTextType = 'normal' | 'error' | 'info';

export interface HelperTextProps extends BaseProps {
  children:         React.ReactNode;
  type?:            HelperTextType;  // default: 'normal'
  visible?:         boolean;  // default: true
  padding?:         'none' | 'normal';  // default: 'normal'
}
```

---

### Link
**MD3 reference**: https://m3.material.io/components/typography  
**File**: `src/components/Link/types.ts`

```ts
export interface LinkProps {
  children:         React.ReactNode;
  onPress:          () => void;
  variant?:         TextVariant;  // default: 'bodyMedium'
  color?:           string;  // default: theme.colors.primary
  underline?:       'always' | 'hover' | 'none';  // default: 'always'
  disabled?:        boolean;
  style?:           StyleProp<TextStyle>;
  testID?:          string;
}
```

---

### Menu
**MD3 reference**: https://m3.material.io/components/menus  
**File**: `src/components/Menu/types.ts`

```ts
export interface MenuItemProps extends BaseProps {
  title:            string;
  onPress?:         () => void;
  leadingIcon?:     IconSource;
  trailingText?:    string;
  disabled?:        boolean;
  dense?:           boolean;
}

export interface MenuProps extends BaseProps {
  visible:          boolean;
  onDismiss:        () => void;
  anchor:           React.ReactNode | { x: number; y: number };
  children:         React.ReactNode;
  contentStyle?:    StyleProp<ViewStyle>;
  /** Elevation for the menu surface; default: 2 */
  elevation?:       0 | 1 | 2 | 3 | 4;
}
```

---

### TransferList
**MD3 reference**: https://m3.material.io/components/lists (custom composition)  
**File**: `src/components/TransferList/types.ts`

```ts
export interface TransferListItem {
  key:       string;
  label:     string;
  disabled?: boolean;
}

export interface TransferListProps extends BaseProps {
  /** Items available to be transferred */
  available:        TransferListItem[];
  /** Items already transferred / selected */
  selected:         TransferListItem[];
  onAvailableChange?: (items: TransferListItem[]) => void;
  onSelectedChange?:  (items: TransferListItem[]) => void;
  /** Column header for the available list */
  availableLabel?:  string;
  /** Column header for the selected list */
  selectedLabel?:   string;
}
```

---

## Entity Relationships

```
ThemeProvider
  └── useTheme() → ColorScheme, TypeScale, SpacingScale, Shape, Elevation, Motion

PortalHost
  └── Portal            → mounts children into PortalHost ViewManager
        ⊂ Backdrop       (uses Portal)
        ⊂ Modal          (uses Portal)
        ⊂ Snackbar       (uses Portal + SnackbarHost queue)
        ⊂ Tooltip        (uses Portal)
        ⊂ Menu           (uses Portal)
        ⊂ Select         (dropdown via Portal)

TouchableRipple
    ⊂ Checkbox         (press primitive)
    ⊂ RadioButton      (press primitive)
    ⊂ ToggleButton     (press primitive)
    ⊂ ListItem         (press primitive)
    ⊂ IconButton       (press primitive)

Icon
    ⊂ IconButton       (renders Icon)
    ⊂ Alert            (severity icon)
    ⊂ Banner           (info icon)
    ⊂ HelperText       (status icon)
    ⊂ Searchbar        (search icon)
    ⊂ Rating           (star icon)
    ⊂ Drawer.Item      (nav icon)
    ⊂ SpeedDial        (action icons)
    ⊂ Tabs             (tab icons)

Text (Typography)
    ⊂ Link             (styled Text)
    ⊂ HelperText       (styled Text)
    ⊂ Breadcrumbs      (label Text)
    ⊂ Badge            (count Text)
    ⊂ Tooltip          (label Text)

Paper (Surface)
    ⊂ Modal            (content surface)
    ⊂ Menu             (dropdown surface)
    ⊂ Snackbar         (container surface)
    ⊂ Alert            (container surface)
    ⊂ Banner           (container surface)
    ⊂ Card (existing)  (unchanged)
```

## State Transitions

### Snackbar Queue
```
IDLE → ADD(item) → SHOWING → DISMISS → NEXT_IN_QUEUE → SHOWING | IDLE
```

### Modal / Backdrop
```
hidden → visible (fade-in overlay + content) → hidden (fade-out)
```

### Accordion
```
collapsed (height=0) → expanded (height=measuredHeight) ↔ tapping header
```

### Drawer
```
closed (translateX=-width) → open (translateX=0) ↔ open prop / pan gesture
```
