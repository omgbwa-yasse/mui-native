# Contract: Popover

**Component**: `Popover`
**Category**: Utils / Overlay
**MUI Reference**: https://mui.com/material-ui/react-popover/
**MD3 Reference**: https://m3.material.io/components/menus/overview (closest MD3 analog)

---

## Public API

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export type VerticalPosition   = 'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface AnchorOrigin {
  vertical:   VerticalPosition;
  horizontal: HorizontalPosition;
}

export interface PopoverProps {
  /** Whether the popover is visible. Required. */
  open: boolean;
  /** Ref to the anchor View element. Required. A null ref suppresses render. */
  anchorRef: React.RefObject<View | null>;
  /** Called when backdrop is pressed. */
  onClose?: () => void;
  /** Which point on the anchor element the popover attaches to.
   *  @default { vertical: 'bottom', horizontal: 'left' } */
  anchorOrigin?: AnchorOrigin;
  /** Which point on the popover is placed at the anchorOrigin point.
   *  @default { vertical: 'top', horizontal: 'left' } */
  transformOrigin?: AnchorOrigin;
  /** MD3 elevation level. @default 8 */
  elevation?: number;
  /** Render inline instead of via Portal. @default false */
  disablePortal?: boolean;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override (FR-024). Applied to the popover surface. */
  style?: StyleProp<ViewStyle>;
}
```

---

## Positioning Formula

```
top  = anchorY + anchorH × vFactor(anchorOrigin.vertical)
     - popoverH × vFactor(transformOrigin.vertical)

left = anchorX + anchorW × hFactor(anchorOrigin.horizontal)
     - popoverW × hFactor(transformOrigin.horizontal)

vFactor('top')    = 0
vFactor('center') = 0.5
vFactor('bottom') = 1
hFactor('left')   = 0
hFactor('center') = 0.5
hFactor('right')  = 1
```

---

## Lifecycle

```
open: false → true
  │
  ├─ anchorRef.measure() → store anchorLayout
  ├─ mount popover (opacity:0) → onLayout → store popoverLayout
  ├─ calculate top/left
  └─ animate in (Fade)

open: true → false
  └─ animate out (Fade) → unmount
```

---

## Rendering Structure

```
<Portal> (unless disablePortal)
  <Pressable onPress={onClose}>   ← full-screen backdrop
    <Animated.View style={positionedStyle}>  ← popover surface
      {children}
    </Animated.View>
  </Pressable>
</Portal>
```

---

## Export

```typescript
// src/index.ts
export { Popover } from './components/Popover';
export type { PopoverProps, AnchorOrigin } from './components/Popover';
```

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Hidden by default | `open={false}` | Content not visible |
| Opens near anchor | `open={true}`, valid anchorRef | Content visible, positioned near anchor |
| Backdrop closes | `open={true}`, tap outside | `onClose` called |
| anchorOrigin positioning | `anchorOrigin={{ vertical:'bottom', horizontal:'left' }}` | Popover top-left at anchor bottom-left |
| Null ref guard | `anchorRef.current = null` | No render, no throw |
| Controlled close | parent sets `open={false}` | Popover disappears |
