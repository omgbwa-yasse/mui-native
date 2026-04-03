# Contract: Navigation & Structure API

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02  
**Scope**: Components that structure navigation and multi-step user flows

---

## Components Covered

`Tabs`, `Drawer`, `Stepper`, `Pagination`, `Breadcrumbs`, `SpeedDial`

---

## Tabs

```ts
export function Tabs(props: TabsProps): JSX.Element;

// Public API surface
interface TabsPublicAPI {
  items:          { value: string; label: string; icon?: IconSource; badge?: number | string; disabled?: boolean }[];
  value:          string;
  onValueChange:  (value: string) => void;
  variant?:       'primary' | 'secondary';  // default: 'primary'
  scrollable?:    boolean;                   // auto-true when items exceed viewport width
  children?:      (activeValue: string) => React.ReactNode;
}
```

**Invariants**:
- Exactly one tab is active at all times
- Indicator slides with animation (`withTiming`, 200 ms) to the active tab
- `scrollable` auto-applies when item count × minTabWidth > container width
- `children` render prop receives the currently active `value` for content switching
- Badge renders as `Badge` component in top-right corner of tab

---

## Drawer

```ts
export function Drawer(props: DrawerProps): JSX.Element;

// Public API surface
interface DrawerPublicAPI {
  open:         boolean;
  onClose?:     () => void;
  anchor?:      'left' | 'right';           // default: 'left'
  variant?:     'temporary' | 'persistent' | 'permanent';  // default: 'temporary'
  children?:    React.ReactNode;
  drawerWidth?: number;                      // default: 280
}
```

**Invariants**:
- `temporary`: renders `Backdrop` + drawer via `Portal`; closes on backdrop press
- `persistent`: no backdrop; pushes content (requires layout cooperation from parent)
- `permanent`: always visible; does NOT use `Portal`; `onClose` and `open` have no effect
- Animation: Reanimated spring (damping 20, stiffness 200) on `translateX`
- Drawer width default is 280 dp (≈ 70 × spacing token `xl`)

---

## Stepper

```ts
export function Stepper(props: StepperProps): JSX.Element;

// Public API surface
interface StepperPublicAPI {
  steps:        { label: string; description?: string; state?: StepState; optional?: boolean }[];
  activeStep:   number;  // 0-indexed
  orientation?: 'horizontal' | 'vertical';  // default: 'horizontal'
  nonLinear?:   boolean;                     // default: false
  onStepPress?: (index: number) => void;
}

type StepState = 'completed' | 'active' | 'upcoming' | 'error';
```

**Invariants**:
- `nonLinear={false}`: steps after `activeStep` are non-interactive (can't skip forward)
- `nonLinear={true}`: all completed steps are pressable (allows revisiting)
- `error` state shown with error icon and `theme.colors.error` tint
- Connector line between steps reflects completion (full-color = completed)

---

## Pagination

```ts
export function Pagination(props: PaginationProps): JSX.Element;

// Public API surface
interface PaginationPublicAPI {
  count:           number;   // total pages
  page:            number;   // current page (1-indexed)
  onPageChange:    (page: number) => void;
  siblingCount?:   number;   // default: 1
  boundaryCount?:  number;   // default: 1
  disabled?:       boolean;
  showFirstButton?: boolean;
  showLastButton?:  boolean;
}
```

**Invariants**:
- `page` is clamped to `[1, count]`
- Ellipsis (`…`) inserted when pages between boundary and sibling are > 1
- Prev/Next buttons disabled at first/last page respectively
- Each page button has minimum 44 × 44 dp touch target (SC-001)

---

## Breadcrumbs

```ts
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;

// Public API surface
interface BreadcrumbsPublicAPI {
  items:       { label: string; onPress?: () => void; icon?: IconSource }[];
  separator?:  React.ReactNode | string;  // default: '/'
  maxItems?:   number;                    // default: 0 (show all)
}
```

**Invariants**:
- Last item (current page) is rendered as non-interactive text
- When `maxItems > 0` and `items.length > maxItems`, middle items collapse to `…`
- Separator is rendered between every pair of consecutive items
- `onPress`-bearing items use `Link` component styling

---

## SpeedDial

```ts
export function SpeedDial(props: SpeedDialProps): JSX.Element;

// Public API surface
interface SpeedDialPublicAPI {
  actions:    { key: string; icon: IconSource; label?: string; onPress?: () => void; disabled?: boolean }[];
  icon?:      IconSource;      // trigger icon when closed
  openIcon?:  IconSource;      // trigger icon when open; default: close icon
  open?:      boolean;         // controlled mode
  onOpen?:    () => void;
  onClose?:   () => void;
  direction?: 'up' | 'down' | 'left' | 'right';  // default: 'up'
}
```

**Invariants**:
- Uses FAB (existing component) as the trigger button
- Actions fan out in `direction` with staggered fade+scale animation (50 ms per item)
- Pressing an action calls its `onPress` then `onClose`
- `label` on each action renders as a tooltip (plain `View`+`Text` — not portal Tooltip)
- Pressing outside the SpeedDial calls `onClose`

---

## Navigation a11y Matrix

| Component | accessibilityRole | Notes |
|-----------|-------------------|-------|
| Tabs tabs | `tab` inside `tablist` | active tab: `accessibilityState.selected=true` |
| Drawer | `navigation` | landmark region |
| Stepper steps | `listitem` | error state: `accessibilityState.disabled` |
| Pagination page button | `button` | current page: `accessibilityState.selected` |
| Breadcrumb item | `link` or `text` | |
| SpeedDial trigger | `button` | state `expanded` when open |
