# Contract: Transition Components (Fade / Grow / Slide / Zoom / Collapse)

**Components**: `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`
**Category**: Utils / Transitions
**MUI Reference**: https://mui.com/material-ui/transitions/
**MD3 Reference**: https://m3.material.io/styles/motion/overview

---

## Shared Base API (`TransitionBaseProps`)

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export interface TransitionTimeout {
  enter: number;
  exit: number;
}
export type TransitionTimeoutProp = number | TransitionTimeout;

export interface TransitionBaseProps {
  /** Controls visibility — true = entering/entered, false = exiting/exited. @default false */
  in?: boolean;
  /** Duration in ms. Single value applies to both enter and exit. @default 300 */
  timeout?: TransitionTimeoutProp;
  /** Defer mounting child until first in=true. @default false */
  mountOnEnter?: boolean;
  /** Unmount child after exit animation completes. @default false */
  unmountOnExit?: boolean;
  /** The single child element to animate. Required. */
  children: React.ReactElement;
  /** StyleSheet-compatible style override (FR-024). */
  style?: StyleProp<ViewStyle>;
  onEnter?:   () => void;
  onEntered?: () => void;
  onExit?:    () => void;
  onExited?:  () => void;
}
```

---

## Internal State Machine (`useTransition`)

```
States: ENTERING | ENTERED | EXITING | EXITED

on (in: false→true):   EXITED/EXITING → ENTERING → (after timeout.enter) → ENTERED
on (in: true→false):   ENTERED/ENTERING → EXITING → (after timeout.exit) → EXITED

mount = (!unmountOnExit) || (phase !== 'EXITED') || in
mountOnEnter behaviour: if !in on initial render, skip first mount until in→true
reduceMotion: duration clamped to 0 (instant transition)
```

---

## Component-Specific APIs

### `Fade`
```typescript
export interface FadeProps extends TransitionBaseProps {}
// Animates: opacity 0 ↔ 1
```

### `Grow`
```typescript
export interface GrowProps extends TransitionBaseProps {}
// Animates: opacity 0→1, scale 0.75→1 (enter); reverse on exit
// RN-DEVIATION: web also animates transform-origin; RN uses center pivot only
```

### `Slide`
```typescript
export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideProps extends TransitionBaseProps {
  /** Direction the child slides in from. @default 'down' */
  direction?: SlideDirection;
}
// direction='up'    → child enters from bottom (translateY +screenH → 0)
// direction='down'  → child enters from top    (translateY -screenH → 0)
// direction='left'  → child enters from right  (translateX +screenW → 0)
// direction='right' → child enters from left   (translateX -screenW → 0)
```

### `Zoom`
```typescript
export interface ZoomProps extends TransitionBaseProps {}
// Animates: scale 0 ↔ 1
```

### `Collapse`
```typescript
export type CollapseOrientation = 'horizontal' | 'vertical';

export interface CollapseProps extends TransitionBaseProps {
  /** Collapse axis. @default 'vertical' */
  orientation?: CollapseOrientation;
  /** Size (in dp) when collapsed. Clamped to Math.max(0, collapsedSize). @default 0 */
  collapsedSize?: number;
}
// Animates: height (vertical) or width (horizontal) between collapsedSize and naturalSize
// naturalSize measured via onLayout on inner container
```

---

## Default Values

| Prop | Default |
|------|---------|
| `in` | `false` |
| `timeout` | `300` (ms) — both enter and exit |
| `mountOnEnter` | `false` — child is mounted on first render |
| `unmountOnExit` | `false` — child stays mounted in EXITED state |
| `Slide.direction` | `'down'` |
| `Collapse.orientation` | `'vertical'` |
| `Collapse.collapsedSize` | `0` |

---

## Export

```typescript
// src/index.ts
export { Fade }     from './components/Fade';
export { Grow }     from './components/Grow';
export { Slide }    from './components/Slide';
export { Zoom }     from './components/Zoom';
export { Collapse } from './components/Collapse';

export type { FadeProps }     from './components/Fade';
export type { GrowProps }     from './components/Grow';
export type { SlideProps, SlideDirection } from './components/Slide';
export type { ZoomProps }     from './components/Zoom';
export type { CollapseProps, CollapseOrientation } from './components/Collapse';
export type { TransitionBaseProps, TransitionTimeoutProp } from './components/Fade';
```

---

## Acceptance Test Summary

| Scenario | Component | Input | Expected |
|----------|-----------|-------|----------|
| Hidden default | Fade | `in={false}` | Child mounted, opacity 0 |
| Fade in | Fade | `in={true}` | opacity → 1 |
| Grow scale + opacity | Grow | `in={true}` | scale + opacity animate to 1 |
| Slide from bottom | Slide | `in={true} direction="up"` | translateY slides up |
| Zoom scale | Zoom | `in={true}` | scale 0 → 1 |
| Collapse height | Collapse | `in={true} orientation="vertical"` | height 0 → naturalHeight |
| collapsedSize | Collapse | `in={false} collapsedSize={40}` | height = 40 when collapsed |
| unmountOnExit | any | `unmountOnExit={true} in={false}` | child removed after exit |
| mountOnEnter | any | `mountOnEnter={true} in={false}` initially | child unmounted; mounts on first in=true |
| Callbacks | any | onEnter/onEntered/onExit/onExited | called at correct phase transitions |

---

## RN-DEVIATION

**No `react-transition-group`**: That library is web-only. Transitions are implemented natively with Reanimated shared values and a custom `useTransition` hook.

Comment in source: `// RN-DEVIATION: transitions use Reanimated worklets; react-transition-group is web-only`
