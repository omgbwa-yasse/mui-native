# Contract: CircularProgress

**Component**: `CircularProgress`
**Category**: Feedback / Progress
**MUI Reference**: https://mui.com/material-ui/react-progress/#circular-indeterminate
**MD3 Reference**: https://m3.material.io/components/progress-indicators/overview

---

## Public API

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export type CircularProgressVariant = 'indeterminate' | 'determinate';
export type CircularProgressColor   = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

export interface CircularProgressProps {
  /** Animation mode. @default 'indeterminate' */
  variant?: CircularProgressVariant;
  /** Progress value 0–100. Clamped silently. Only effective when variant='determinate'. @default 0 */
  value?: number;
  /** Diameter of the circle in dp. @default 40 */
  size?: number;
  /** Theme color token. @default 'primary' */
  color?: CircularProgressColor;
  /** Stroke width in dp. @default 3.6 */
  thickness?: number;
  /** StyleSheet-compatible style override (FR-024). */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label. @default 'Loading' */
  accessibilityLabel?: string;
}
```

---

## Accessibility (FR-023)

Always set automatically:
```tsx
accessibilityRole="progressbar"
accessible
```

When `variant='determinate'`:
```tsx
accessibilityValue={{ min: 0, max: 100, now: clamp(value, 0, 100) }}
```

---

## Export

```typescript
// src/index.ts
export { CircularProgress } from './components/CircularProgress';
export type { CircularProgressProps, CircularProgressVariant, CircularProgressColor }
  from './components/CircularProgress';
```

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Indeterminate renders | `variant="indeterminate"` | Spinning circle, no value prop needed |
| Determinate arc | `variant="determinate" value={75}` | Arc at 75% |
| Value clamping | `value={150}` | Renders as 100%; no throw |
| Custom size | `size={80}` | Circle diameter 80dp |
| Color prop | `color="error"` | Uses error theme token |
| A11y role | any | `accessibilityRole="progressbar"` present |
| A11y value | `variant="determinate" value={40}` | `accessibilityValue.now === 40` |

---

## RN-DEVIATION

**Determinate arc rendering**: Web uses SVG `<circle>` with `strokeDashoffset`. React Native uses two-half-circle View clipping technique with `overflow:'hidden'`. Visual result is equivalent; implementation is RN-native View-only.

Comment in source: `// RN-DEVIATION: determinate arc uses View clip technique; web uses SVG strokeDashoffset`
