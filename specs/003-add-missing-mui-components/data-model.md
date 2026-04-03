# Data Model: Feature 003 — Add Missing MUI Components

**Date**: 2026-04-03
**Branch**: `003-add-missing-mui-components`
**References**: spec.md FR-001–FR-024, research.md

---

## Shared / Cross-Component Types

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

// ─── Transition ────────────────────────────────────────────────────────────
/** Timeout as a single value (both enter + exit) or individual values. */
export interface TransitionTimeout {
  enter: number;
  exit: number;
}
export type TransitionTimeoutProp = number | TransitionTimeout;

// ─── Positioning (Popover / Popper) ────────────────────────────────────────
export type VerticalPosition   = 'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface AnchorOrigin {
  vertical:   VerticalPosition;
  horizontal: HorizontalPosition;
}

// ─── Theme colour keys (subset of ColorScheme roles) ──────────────────────
export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'inherit';
```

---

## CircularProgress

### Entity: `CircularProgress`

| Field      | Type                         | Default          | Constraint |
|------------|------------------------------|------------------|------------|
| `variant`  | `'indeterminate' \| 'determinate'` | `'indeterminate'` | — |
| `value`    | `number`                     | `0`              | Clamped [0, 100]; only used when `variant='determinate'` |
| `size`     | `number`                     | `40`             | dp; positive |
| `color`    | `ComponentColor`             | `'primary'`      | — |
| `thickness` | `number`                    | `3.6`            | dp; positive |
| `style`    | `StyleProp<ViewStyle>`       | `undefined`      | FR-024 |
| `accessibilityLabel` | `string`        | `'Loading'`      | — |

**Derived a11y attributes** (FR-023):
- Always: `accessibilityRole="progressbar"`
- When `variant='determinate'`: `accessibilityValue={{ min:0, max:100, now: clamp(value,0,100) }}`

**State transitions**:
- No external state; purely prop-controlled
- Internal Reanimated shared values:
  - Indeterminate: `rotation: SharedValue<number>` (0 → 1, looped)
  - Determinate: `progress: SharedValue<number>` (0 → normalized value, animated on change)

---

## LinearProgress

### Entity: `LinearProgress`

| Field         | Type                                       | Default          | Constraint |
|---------------|--------------------------------------------|------------------|------------|
| `variant`     | `'indeterminate' \| 'determinate' \| 'buffer'` | `'indeterminate'` | — |
| `value`       | `number`                                   | `0`              | Clamped [0, 100] |
| `valueBuffer` | `number`                                   | `0`              | Clamped [`value`, 100] |
| `color`       | `ComponentColor`                           | `'primary'`      | — |
| `style`       | `StyleProp<ViewStyle>`                     | `undefined`      | FR-024 |
| `accessibilityLabel` | `string`                          | `'Loading'`      | — |

**Buffer constraint**: `valueBuffer < value` → treated as `value` (no throw, no warning).

**Derived a11y attributes** (FR-023):
- Always: `accessibilityRole="progressbar"`
- When `variant='determinate'` or `'buffer'`: `accessibilityValue={{ min:0, max:100, now: clamp(value,0,100) }}`

---

## Popover

### Entity: `Popover`

| Field              | Type                           | Default | Constraint |
|--------------------|--------------------------------|---------|------------|
| `open`             | `boolean`                      | —       | Required |
| `anchorRef`        | `React.RefObject<View \| null>` | —      | Required; null ref → no render |
| `onClose`          | `() => void`                   | `undefined` | Called on backdrop press |
| `anchorOrigin`     | `AnchorOrigin`                 | `{ vertical:'bottom', horizontal:'left' }` | — |
| `transformOrigin`  | `AnchorOrigin`                 | `{ vertical:'top', horizontal:'left' }` | — |
| `elevation`        | `number`                       | `8`     | MD3 elevation level |
| `disablePortal`    | `boolean`                      | `false` | Skip Portal when true |
| `children`         | `React.ReactNode`              | —       | — |
| `style`            | `StyleProp<ViewStyle>`         | `undefined` | FR-024 |

**Internal layout state**:
```typescript
interface AnchorLayout { x: number; y: number; width: number; height: number; }
interface PopoverLayout { width: number; height: number; }
```

**State transitions**:
| Trigger | Action |
|---------|--------|
| `open: false → true` | Measure anchor → measure popover (two-pass) → animate in |
| `open: true → false` | Animate out → unmount |
| `anchorRef.current === null` | Do nothing |

---

## Transition Base

### Entity: `TransitionBaseProps` (shared base for all 5 Transition components)

| Field          | Type                       | Default    | Constraint |
|----------------|----------------------------|------------|------------|
| `in`           | `boolean`                  | `false`    | — |
| `timeout`      | `TransitionTimeoutProp`    | `300`      | ms; FR-010 |
| `mountOnEnter` | `boolean`                  | `false`    | FR-009 |
| `unmountOnExit` | `boolean`                 | `false`    | FR-009 |
| `children`     | `React.ReactElement`       | —          | Required |
| `style`        | `StyleProp<ViewStyle>`     | `undefined` | FR-024 |
| `onEnter`      | `() => void`               | `undefined` | — |
| `onEntered`    | `() => void`               | `undefined` | — |
| `onExit`       | `() => void`               | `undefined` | — |
| `onExited`     | `() => void`               | `undefined` | — |

**State machine** (`useTransition` hook):
```
States: ENTERING | ENTERED | EXITING | EXITED
mount = (!unmountOnExit) || (phase !== 'EXITED') || in
initial mount: if mountOnEnter && !in → defer until first in=true
```

### Entity: `Fade`
Extends `TransitionBaseProps`. No additional fields.
Animated value: `opacity` 0 ↔ 1.

### Entity: `Grow`
Extends `TransitionBaseProps`. No additional fields.
Animated values: `opacity` 0 ↔ 1; `scale` 0.75 ↔ 1.

### Entity: `Slide`

| Field       | Type              | Default  | Constraint |
|-------------|-------------------|----------|------------|
| `direction` | `SlideDirection`  | `'down'` | FR-011 |

```typescript
export type SlideDirection = 'up' | 'down' | 'left' | 'right';
```
Animated value: `translateY` (up/down) or `translateX` (left/right) ± screen dimension ↔ 0.

### Entity: `Zoom`
Extends `TransitionBaseProps`. No additional fields.
Animated value: `scale` 0 ↔ 1.

### Entity: `Collapse`

| Field           | Type                   | Default      | Constraint |
|-----------------|------------------------|--------------|------------|
| `orientation`   | `CollapseOrientation`  | `'vertical'` | FR-012 |
| `collapsedSize` | `number`               | `0`          | Clamped to `Math.max(0, collapsedSize)`; FR-012 |

```typescript
export type CollapseOrientation = 'horizontal' | 'vertical';
```
Animated value: `height` (vertical) or `width` (horizontal) — `collapsedSize` ↔ measured natural size.

---

## Popper

### Entity: `Popper`

| Field           | Type                           | Default    | Constraint |
|-----------------|--------------------------------|------------|------------|
| `open`          | `boolean`                      | —          | Required |
| `anchorRef`     | `React.RefObject<View \| null>` | —         | Required |
| `placement`     | `PopperPlacement`              | `'bottom'` | FR-013 |
| `disablePortal` | `boolean`                      | `false`    | FR-013 |
| `keepMounted`   | `boolean`                      | `false`    | — |
| `children`      | `React.ReactNode`              | —          | — |
| `style`         | `StyleProp<ViewStyle>`         | `undefined` | FR-024 |

```typescript
export type PopperPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';
```

No backdrop rendered (FR-014); all touches pass through beneath.

---

## Masonry

### Entity: `Masonry`

| Field            | Type                   | Default | Constraint |
|------------------|------------------------|---------|------------|
| `columns`        | `number`               | value of `defaultColumns` | Integer; FR-015 |
| `defaultColumns` | `number`               | `2`     | Integer; FR-015 |
| `spacing`        | `number`               | `2`     | dp gap between children |
| `children`       | `React.ReactNode`      | —       | — |
| `style`          | `StyleProp<ViewStyle>` | `undefined` | FR-024 |

**Internal algorithm state** (not part of public API):
```typescript
interface ChildAssignment {
  childIndex: number;
  colIndex:   number;
  // order within column
}
columnHeights: number[]   // one entry per column, tracks cumulative height
```

---

## Timeline Component Set

### Entity: `Timeline` (root)

| Field      | Type                   | Default   | Constraint |
|------------|------------------------|-----------|------------|
| `position` | `TimelinePosition`     | `'right'` | FR-017 |
| `children` | `React.ReactNode`      | —         | — |
| `style`    | `StyleProp<ViewStyle>` | `undefined` | FR-024 |

```typescript
export type TimelinePosition = 'left' | 'right' | 'alternate';
```

Provides `TimelineContext` (`position`, `itemCount` for alternate index).

### Entity: `TimelineItem`

| Field      | Type                   | Default | Constraint |
|------------|------------------------|---------|------------|
| `children` | `React.ReactNode`      | —       | — |
| `style`    | `StyleProp<ViewStyle>` | `undefined` | — |

Reads `position` + `itemIndex` from `TimelineContext`.

### Entity: `TimelineSeparator`

| Field      | Type                   | Default | Constraint |
|------------|------------------------|---------|------------|
| `children` | `React.ReactNode`      | — | Should contain `TimelineDot` + optional `TimelineConnector` |
| `style`    | `StyleProp<ViewStyle>` | `undefined` | — |

### Entity: `TimelineDot`

| Field      | Type                   | Default    | Constraint |
|------------|------------------------|------------|------------|
| `variant`  | `TimelineDotVariant`   | `'filled'` | FR-018 |
| `color`    | `TimelineDotColor`     | `'grey'`   | FR-018 |
| `children` | `React.ReactNode`      | —          | Optional icon inside dot |
| `style`    | `StyleProp<ViewStyle>` | `undefined` | — |

```typescript
export type TimelineDotVariant = 'filled' | 'outlined';
export type TimelineDotColor   = 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';
```

### Entity: `TimelineConnector`

| Field   | Type                   | Default | Constraint |
|---------|------------------------|---------|------------|
| `style` | `StyleProp<ViewStyle>` | `undefined` | Flex:1 vertical line |

### Entity: `TimelineContent` / `TimelineOppositeContent`

| Field      | Type                   | Default | Constraint |
|------------|------------------------|---------|------------|
| `children` | `React.ReactNode`      | —       | — |
| `style`    | `StyleProp<ViewStyle>` | `undefined` | — |

---

## Relationships

```
Popover ──uses──► useAnchorPosition
Popper  ──uses──► useAnchorPosition

Fade    ──uses──► useTransition
Grow    ──uses──► useTransition
Slide   ──uses──► useTransition
Zoom    ──uses──► useTransition
Collapse ─uses──► useTransition

Timeline ──provides──► TimelineContext ──consumed by──► TimelineItem

Masonry ──reads layout from──► children onLayout callbacks
```
