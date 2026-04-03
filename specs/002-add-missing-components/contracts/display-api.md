# Contract: Display & Content API

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02  
**Scope**: Components that render data, status, and content to the user

---

## Components Covered

`Avatar`, `Badge`, `List` / `ListItem` / `ListSection`, `DataTable`,
`Divider`, `Rating`, `Banner`, `IconButton`

---

## Avatar

```ts
export function Avatar(props: AvatarProps): JSX.Element;

// Public API surface
interface AvatarPublicAPI {
  source?:     ImageSourcePropType;   // image URI — highest priority
  label?:      string;                // used for initials extraction (first 2 chars)
  icon?:       IconSource;            // fallback when no source and no label
  size?:       number;                // default: 40
  color?:      string;                // background color
  labelColor?: string;                // text / icon color
}
```

**Fallback priority**: `source` (if loads) → `children` → initials from `label` → `icon` → generic account icon

**Invariants**:
- Circle mask always applied (`borderRadius = size / 2`)
- Image load failure silently falls through to next priority
- `accessibilityLabel` defaults to `label` if not explicitly provided

---

## Badge

```ts
export function Badge(props: BadgeProps): JSX.Element;

// Public API surface
interface BadgePublicAPI {
  content?:      number | string;   // omit for dot badge
  max?:          number;            // default: 99; renders `${max}+` on overflow
  visible?:      boolean;           // default: true
  color?:        string;            // default: theme.colors.error
  labelColor?:   string;            // default: theme.colors.onError
  children?:     React.ReactNode;   // the element to badge
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
}
```

**Invariants**:
- Dot badge: `content` omitted → renders 8 × 8 dp circle
- Numeric badge: `content > max` → renders `${max}+`
- Badge anchored outside children bounds; uses `position: absolute` + negative offset
- `visible={false}` fully unmounts the badge node

---

## List / ListItem / ListSection / ListAccordion

```ts
export function List(props: ListProps): JSX.Element;
export function ListItem(props: ListItemProps): JSX.Element;
export function ListSection(props: ListSectionProps): JSX.Element;
export function ListAccordion(props: ListAccordionProps): JSX.Element;

// Public API surface — ListItem
interface ListItemPublicAPI {
  title:         string;
  description?:  string;
  left?:         (props: { color: string }) => React.ReactNode;
  right?:        (props: { color: string }) => React.ReactNode;
  onPress?:      () => void;
  disabled?:     boolean;
}

// Public API surface — ListAccordion
interface ListAccordionPublicAPI extends ListItemPublicAPI {
  expanded?:  boolean;
  onPress?:   () => void;
  children:   React.ReactNode;
}
```

**Invariants**:
- `ListItem` press area spans full width (48 dp minimum height)
- `left` / `right` render-prop approach avoids coupling icon libraries
- `ListAccordion` animates `height` 0 → measuredHeight using Reanimated (R-11 pattern)
- `ListSection` renders a labelled group; label uses `labelMedium` typography variant

---

## DataTable

```ts
export function DataTable<T = Record<string, unknown>>(props: DataTableProps<T>): JSX.Element;

// Public API surface
interface DataTablePublicAPI<T> {
  columns:         DataTableColumn<T>[];
  rows:            T[];
  keyExtractor:    (row: T) => string;
  sortColumn?:     string;
  sortDirection?:  'asc' | 'desc';
  onSort?:         (column: string, direction: 'asc' | 'desc') => void;
  selectedRows?:   string[];
  onRowSelect?:    (keys: string[]) => void;
  emptyState?:     React.ReactNode;
  onEndReached?:   () => void;
}
```

**Invariants**:
- Rendered with `FlatList` (`windowSize=5`) for virtualization (R-04)
- Sort state is fully controlled — consumer owns sort state
- Row selection: passes `Set<string>` semantics via `selectedRows` (key array)
- Header row is NOT virtualized — always rendered above FlatList
- `emptyState` replaces the FlatList body when `rows.length === 0`
- Column `width` accepts number (dp) or string percentage (e.g. `'20%'`)

---

## Divider

```ts
export function Divider(props: DividerProps): JSX.Element;

// Public API surface
interface DividerPublicAPI {
  orientation?: 'horizontal' | 'vertical';  // default: 'horizontal'
  variant?:     'fullWidth' | 'inset' | 'middle';
  bold?:        boolean;   // 2 px vs 1 px thickness
}
```

**Invariants**:
- Color: `theme.colors.outlineVariant` (MD3 divider token)
- `inset` adds a left padding equal to `56 dp` (icon + padding, per MD3 list spec)
- `middle` adds `16 dp` padding on both sides

---

## Rating

```ts
export function Rating(props: RatingProps): JSX.Element;

// Public API surface
interface RatingPublicAPI {
  value?:         number;   // controlled; 0–max
  onValueChange?: (value: number) => void;
  max?:           number;   // default: 5
  precision?:     0.5 | 1;  // default: 1
  disabled?:      boolean;
  readOnly?:      boolean;
  size?:          'small' | 'medium' | 'large';
}
```

**Invariants**:
- `precision=0.5`: tapping left half of star sets n-0.5, right half sets n
- `readOnly={true}`: interactive events suppressed; no hover/press state
- `value=0`: no stars filled; empty icon shown for all positions
- Star icon defaults to `star` / `star-outline`; customizable via `icon` / `emptyIcon`

---

## Banner

```ts
export function Banner(props: BannerProps): JSX.Element;

// Public API surface
interface BannerPublicAPI {
  visible:    boolean;
  children:   React.ReactNode;
  actions?:   { label: string; onPress: () => void }[];
  icon?:      IconSource;
}
```

**Invariants**:
- Banner slides in from the top (animated height, 300 ms) when `visible` becomes true
- Maximum two actions; first action is primary, second is dismiss
- Does NOT use Portal — renders inline in the document flow (typically below AppBar)
- Minimum one action strongly recommended (accessibility: user should be able to dismiss)

---

## IconButton

```ts
export function IconButton(props: IconButtonProps): JSX.Element;

// Public API surface
interface IconButtonPublicAPI {
  icon:               IconSource;
  onPress?:           () => void;
  disabled?:          boolean;
  selected?:          boolean;     // filled variant toggles between selected/unselected
  variant?:           'standard' | 'filled' | 'filled-tonal' | 'outlined';
  size?:              number;      // icon size, default: 24; container scales (40 dp min)
  accessibilityLabel: string;      // REQUIRED (no text label)
}
```

**Invariants**:
- Minimum touch target: 40 × 40 dp container (SC-001)
- `accessibilityLabel` is NOT optional — enforced by TypeScript (required field)
- `selected` only has visual effect on `filled` and `filled-tonal` variants
- Uses `TouchableRipple` internally for press feedback

---

## Display a11y Matrix

| Component | accessibilityRole | Notes |
|-----------|-------------------|-------|
| Avatar | `image` | accessibilityLabel defaults to `label` |
| Badge | none (decorative) | `accessibilityLabel` on children element |
| ListItem | `listitem` | |
| DataTable row | `row` | |
| DataTable cell | `cell` | sort header: `button` |
| Divider | none (separator) | `accessibilityElementsHidden=true` |
| Rating | `adjustable` | accessibilityValue: min/max/now |
| Banner | `alert` | |
| IconButton | `button` | accessibilityLabel required |
