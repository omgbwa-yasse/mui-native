# Contract: Layout API

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02  
**Scope**: Layout primitive components + specialized utilities

---

## Components Covered

**Layout**: `Box`, `Container`, `Grid` / `GridItem`, `Stack`, `Paper`, `Accordion`, `ImageList`  
**Utilities**: `ButtonGroup`, `HelperText`, `Link`, `TransferList`

---

## Layout Primitives

### Box

```ts
export function Box(props: BoxProps): JSX.Element;

// Public API surface
interface BoxPublicAPI {
  children?:  React.ReactNode;
  style?:     StyleProp<ViewStyle>;
  // Spacing shorthand props (resolved via theme.spacing tokens)
  p?:  keyof SpacingScale;  pt?: keyof SpacingScale;  pb?: keyof SpacingScale;
  pl?: keyof SpacingScale;  pr?: keyof SpacingScale;
  px?: keyof SpacingScale;  py?: keyof SpacingScale;
  m?:  keyof SpacingScale;  mt?: keyof SpacingScale;  mb?: keyof SpacingScale;
  ml?: keyof SpacingScale;  mr?: keyof SpacingScale;
  mx?: keyof SpacingScale;  my?: keyof SpacingScale;
}

type SpacingScale = { xs: 4; sm: 8; md: 16; lg: 24; xl: 32 };
```

**Invariants**:
- `Box` compiles shorthand props into a flat `StyleSheet` style object at render time
- Shorthand `px` / `py` expand to `{ paddingHorizontal, paddingVertical }`
- `style` prop merges last (highest specificity)
- No visual styling — purely a layout wrapper

---

### Container

```ts
export function Container(props: ContainerProps): JSX.Element;

// Public API surface
interface ContainerPublicAPI {
  children?:       React.ReactNode;
  maxWidth?:       'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;  // default: 'lg'
  disableGutters?: boolean;   // removes horizontal padding; default: false
}

// maxWidth token values (dp)
const containerMaxWidths = { xs: 444, sm: 600, md: 900, lg: 1200, xl: 1536 };
```

**Invariants**:
- Centered horizontally via `alignSelf: 'center'` with `maxWidth` constraint
- Gutters: 16 dp horizontal padding on each side (matching MD3 compact window)
- `disableGutters={true}` removes horizontal padding
- `maxWidth={false}` allows full-width content

---

### Grid / GridItem

```ts
export function Grid(props: GridProps): JSX.Element;
export function GridItem(props: GridItemProps): JSX.Element;

// Public API surface
interface GridPublicAPI {
  columns?:       number;   // default: 12
  spacing?:       number | keyof SpacingScale;       // both row + column gap
  columnSpacing?: number | keyof SpacingScale;
  rowSpacing?:    number | keyof SpacingScale;
}

interface GridItemPublicAPI {
  xs?:  number | 'auto';   // column span on smallest breakpoint (RN: always applies)
  sm?:  number | 'auto';   // responsive overrides via useWindowDimensions
  md?:  number | 'auto';
  lg?:  number | 'auto';
}
```

**Invariants**:
- Layout implemented via `flexWrap: 'wrap'` (no CSS grid — R-10 decision)
- Item width calculated as `(containerWidth - (cols-1) * columnSpacing) * span / columns`
- All `GridItem` widths computed via `onLayout` callback on parent `Grid`
- Breakpoints: xs < 600, sm 600–900, md 900–1200, lg ≥ 1200 dp (via `useWindowDimensions`)
- `spacing` sets both row and column gap; overridden by `columnSpacing` / `rowSpacing`

---

### Stack

```ts
export function Stack(props: StackProps): JSX.Element;

// Public API surface
interface StackPublicAPI {
  children?:       React.ReactNode;
  direction?:      'row' | 'column' | 'row-reverse' | 'column-reverse';  // default: 'column'
  spacing?:        number | keyof SpacingScale;   // gap between items; default: 0
  divider?:        React.ReactElement;             // renders between each child pair
  alignItems?:     FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
  flexWrap?:       'wrap' | 'nowrap';
}
```

**Invariants**:
- Gap implemented via `marginBottom` / `marginRight` on all children except the last
- When `divider` is provided, it is cloned and rendered between each pair of children
- `spacing` and `divider` are mutually exclusive in effect — space between items comes from one source

---

### Paper

```ts
export function Paper(props: PaperProps): JSX.Element;

// Public API surface
interface PaperPublicAPI {
  children?:    React.ReactNode;
  elevation?:   0 | 1 | 2 | 3 | 4 | 5;   // default: 1
  mode?:        'flat' | 'elevated';       // default: 'elevated'
  borderRadius?: number;                   // defaults to shape.medium token
}
```

**Invariants**:
- `elevated` mode: applies `box-shadow` (Android: `elevation` prop; iOS: shadow* props)
- `flat` mode: no shadow; surface color only
- Surface color shifts per MD3 elevation overlay algorithm (surface + primary at opacity)
- Background color: `theme.colors.surface`; tint applied at elevation 1–5

---

### Accordion

```ts
export function Accordion(props: AccordionProps): JSX.Element;

// Public API surface
interface AccordionPublicAPI {
  title:       string;
  children:    React.ReactNode;
  expanded?:   boolean;   // controlled
  onToggle?:   (expanded: boolean) => void;
  disabled?:   boolean;
  left?:       React.ReactNode;
  right?:      (expanded: boolean) => React.ReactNode;
}
```

**Invariants**:
- Content height animated 0 → measuredHeight using Reanimated `withTiming(300)` (R-11)
- Height measured once on first render via `onLayout`; cached in a ref
- Chevron icon rotates 0° (collapsed) → 180° (expanded) in sync with content animation
- When `disabled={true}`, header is non-interactive; opacity 0.38

---

### ImageList

```ts
export function ImageList(props: ImageListProps): JSX.Element;

// Public API surface
interface ImageListPublicAPI {
  items:      { key: string; source: ImageSourcePropType; title?: string; subtitle?: string; cols?: number; rows?: number }[];
  cols?:      number;    // default: 2
  gap?:       number;    // default: 4
  variant?:   'standard' | 'quilted' | 'woven' | 'masonry';  // default: 'standard'
  rowHeight?: number | 'auto';
}
```

**Invariants**:
- `standard`: uniform `rowHeight`, equal cell widths
- `quilted`: cells span multiple `cols`/`rows` per item props
- `woven`: alternating aspect ratios (odd rows taller)
- `masonry`: column-based layout, each column grows independently
- All variants use `FlatList` or `ScrollView` depending on variant needs

---

## Utility Components

### ButtonGroup

```ts
export function ButtonGroup(props: ButtonGroupProps): JSX.Element;

// Public API surface
interface ButtonGroupPublicAPI {
  children:     React.ReactNode;   // expects <Button> elements
  variant?:     'contained' | 'outlined' | 'text';   // default: 'outlined'
  orientation?: 'horizontal' | 'vertical';
  size?:        'small' | 'medium' | 'large';
  disabled?:    boolean;
  fullWidth?:   boolean;
}
```

**Invariants**:
- Passes `variant`, `size`, `disabled` to child `Button` components via context
- Adjacent border radii flattened: middle buttons have 0 radius on joined edges
- `fullWidth={true}`: each button takes equal `flex: 1`

---

### HelperText

```ts
export function HelperText(props: HelperTextProps): JSX.Element;

// Public API surface
interface HelperTextPublicAPI {
  children:  React.ReactNode;
  type?:     'normal' | 'error' | 'info';  // default: 'normal'
  visible?:  boolean;   // default: true
  padding?:  'none' | 'normal';
}
```

**Invariants**:
- `error` type: uses `theme.colors.error` text color
- `info` type: uses `theme.colors.secondary` text color
- `normal` type: uses `theme.colors.onSurfaceVariant`
- Animates `opacity` 0 → 1 on `visible` change (100 ms)

---

### Link

```ts
export function Link(props: LinkProps): JSX.Element;

// Public API surface
interface LinkPublicAPI {
  children:   React.ReactNode;
  onPress:    () => void;           // REQUIRED
  variant?:   TextVariant;          // default: 'bodyMedium'
  color?:     string;               // default: theme.colors.primary
  underline?: 'always' | 'none';    // default: 'always'
  disabled?:  boolean;
}
```

**Invariants**:
- Renders a `Text` with `accessibilityRole="link"`
- `disabled={true}`: `onPress` is suppressed; opacity 0.38
- `underline='always'`: `textDecorationLine: 'underline'` applied unconditionally

---

### TransferList

```ts
export function TransferList(props: TransferListProps): JSX.Element;

// Public API surface
interface TransferListPublicAPI {
  available:          { key: string; label: string; disabled?: boolean }[];
  selected:           { key: string; label: string; disabled?: boolean }[];
  onAvailableChange?: (items: TransferListItem[]) => void;
  onSelectedChange?:  (items: TransferListItem[]) => void;
  availableLabel?:    string;
  selectedLabel?:     string;
}
```

**Invariants**:
- Two-column layout with transfer buttons in the center
- Transfer buttons: move-selected-right, move-all-right, move-all-left, move-selected-left
- Buttons disabled when no items are checked in the relevant column
- State is fully controlled — consumer owns both `available` and `selected` arrays

---

## Breakpoint Reference (RN — via `useWindowDimensions`)

| Token | Width (dp) |
|-------|-----------|
| xs    | < 600     |
| sm    | 600–899   |
| md    | 900–1199  |
| lg    | ≥ 1200    |

---

## Spacing Token Reference (`SpacingScale`)

| Token | Value (dp) |
|-------|-----------|
| xs    | 4         |
| sm    | 8         |
| md    | 16        |
| lg    | 24        |
| xl    | 32        |
