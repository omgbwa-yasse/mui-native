# Contract: Popper

**Component**: `Popper`
**Category**: Utils / Positioning
**MUI Reference**: https://mui.com/material-ui/react-popper/
**MD3 Reference**: N/A (utility primitive — no direct MD3 equivalent)

---

## Public API

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export type PopperPlacement =
  | 'top'          | 'top-start'    | 'top-end'
  | 'bottom'       | 'bottom-start' | 'bottom-end'
  | 'left'         | 'left-start'   | 'left-end'
  | 'right'        | 'right-start'  | 'right-end';

export interface PopperProps {
  /** Whether the popper is visible. Required. */
  open: boolean;
  /** Ref to the anchor View element. Required. */
  anchorRef: React.RefObject<View | null>;
  /** Position of the popper relative to the anchor. @default 'bottom' */
  placement?: PopperPlacement;
  /** Render inline in component tree instead of via Portal. @default false */
  disablePortal?: boolean;
  /** Keep content mounted when closed. @default false */
  keepMounted?: boolean;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override (FR-024). */
  style?: StyleProp<ViewStyle>;
}
```

---

## Placement → Origin Mapping

The internal `useAnchorPosition` hook translates `placement` into `anchorOrigin` / `transformOrigin` pairs:

| `placement`    | anchor         | transform      |
|----------------|-------------- -|----------------|
| `top`          | `{v:'top', h:'center'}` | `{v:'bottom', h:'center'}` |
| `top-start`    | `{v:'top', h:'left'}`   | `{v:'bottom', h:'left'}`   |
| `top-end`      | `{v:'top', h:'right'}`  | `{v:'bottom', h:'right'}`  |
| `bottom`       | `{v:'bottom', h:'center'}` | `{v:'top', h:'center'}` |
| `bottom-start` | `{v:'bottom', h:'left'}`   | `{v:'top', h:'left'}`   |
| `bottom-end`   | `{v:'bottom', h:'right'}`  | `{v:'top', h:'right'}`  |
| `left`         | `{v:'center', h:'left'}`   | `{v:'center', h:'right'}` |
| `left-start`   | `{v:'top', h:'left'}`      | `{v:'top', h:'right'}`  |
| `left-end`     | `{v:'bottom', h:'left'}`   | `{v:'bottom', h:'right'}` |
| `right`        | `{v:'center', h:'right'}`  | `{v:'center', h:'left'}` |
| `right-start`  | `{v:'top', h:'right'}`     | `{v:'top', h:'left'}`   |
| `right-end`    | `{v:'bottom', h:'right'}`  | `{v:'bottom', h:'left'}` |

---

## Key Differences from Popover

| Feature | Popover | Popper |
|---------|---------|--------|
| Backdrop | Yes — `Pressable` backdrop triggers `onClose` | No — FR-014 |
| `onClose` prop | Yes | No |
| API | `anchorOrigin` + `transformOrigin` (high-level) | `placement` string enum (low-level) |
| `disablePortal` | Supported | Supported |
| Touch passthrough | Blocked by backdrop | All background touches pass through |

---

## Rendering Structure

```
<Portal> (unless disablePortal=true; renders inline when true)
  <Animated.View style={positionedStyle}>  ← no backdrop wrapping
    {children}
  </Animated.View>
</Portal>
```

---

## Export

```typescript
// src/index.ts
export { Popper } from './components/Popper';
export type { PopperProps, PopperPlacement } from './components/Popper';
```

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Hidden | `open={false}` | Content not visible |
| Positioned below | `open={true} placement="bottom"` | Content visible below anchor |
| Positioned above | `placement="top"` | Content visible above anchor |
| Bottom-start | `placement="bottom-start"` | Content below, left-aligned with anchor |
| disablePortal | `disablePortal={true}` | Content in component tree, not in portal |
| No backdrop | `open={true}` | No backdrop View; touches behind are not blocked |
