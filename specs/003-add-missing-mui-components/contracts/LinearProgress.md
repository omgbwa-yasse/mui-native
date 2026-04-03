# Contract: LinearProgress

**Component**: `LinearProgress`
**Category**: Feedback / Progress
**MUI Reference**: https://mui.com/material-ui/react-progress/#linear-indeterminate
**MD3 Reference**: https://m3.material.io/components/progress-indicators/overview

---

## Public API

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export type LinearProgressVariant = 'indeterminate' | 'determinate' | 'buffer';
export type LinearProgressColor   = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

export interface LinearProgressProps {
  /** Animation mode. @default 'indeterminate' */
  variant?: LinearProgressVariant;
  /** Progress value 0–100. Clamped silently. @default 0 */
  value?: number;
  /** Buffer level 0–100. Clamped to [value, 100]. Used only when variant='buffer'. @default 0 */
  valueBuffer?: number;
  /** Theme color token. @default 'primary' */
  color?: LinearProgressColor;
  /** StyleSheet-compatible style override (FR-024). Applied to outer container. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label. @default 'Loading' */
  accessibilityLabel?: string;
}
```

---

## Visual Layers (bottom → top)

| Layer | Token | Condition |
|-------|-------|-----------|
| Track (background) | `theme.colorScheme.primaryContainer` | Always |
| Buffer fill | `theme.colorScheme.primary` @ 0.38 alpha | `variant='buffer'` |
| Active fill / animated bar | `theme.colorScheme.primary` | Always |

**Track height**: 4dp (MD3 specification)

---

## Accessibility (FR-023)

Always set automatically:
```tsx
accessibilityRole="progressbar"
accessible
```

When `variant='determinate'` or `'buffer'`:
```tsx
accessibilityValue={{ min: 0, max: 100, now: clamp(value, 0, 100) }}
```

---

## Export

```typescript
// src/index.ts
export { LinearProgress } from './components/LinearProgress';
export type { LinearProgressProps, LinearProgressVariant, LinearProgressColor }
  from './components/LinearProgress';
```

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Indeterminate renders | `variant="indeterminate"` | Animated bar moving across track |
| Determinate bar | `variant="determinate" value={40}` | Fill at 40% of track |
| Buffer layers | `variant="buffer" value={60} valueBuffer={80}` | Solid fill at 60%, lighter buffer at 80% |
| Value clamping | `value={200}` | Treated as 100%; no throw |
| Buffer < value | `value={70} valueBuffer={30}` | Buffer rendered at 70% (minimum = value) |
| Color prop | `color="secondary"` | Uses secondary theme token |
| A11y value | `variant="determinate" value={55}` | `accessibilityValue.now === 55` |
