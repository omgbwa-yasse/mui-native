# Contract: Masonry

**Component**: `Masonry`
**Category**: Lab / Layout
**MUI Reference**: https://mui.com/material-ui/react-masonry/
**MD3 Reference**: N/A (layout utility — no MD3 spec)

---

## Public API

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export interface MasonryProps {
  /** Number of columns. Must be a positive integer. @default value of defaultColumns */
  columns?: number;
  /** Fallback column count used before layout measurement. @default 2 */
  defaultColumns?: number;
  /** Gap between children in dp. @default 2 */
  spacing?: number;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override (FR-024). Applied to outer container. */
  style?: StyleProp<ViewStyle>;
}
```

---

## Column-Fill Algorithm

```
columnHeights[0..columns-1] = 0

for each child k when onLayout fires → height = h:
  minCol = index of min(columnHeights)
  assign child k → column minCol
  columnHeights[minCol] += h + spacing

Rendering: one flex-column View per column, each containing its assigned children in order.
```

**Initial render**: Uses `defaultColumns` before any `onLayout` fires to prevent layout flash.

**Zero-children edge case**: Renders empty outer container — no error (spec edge case).

---

## Internal State

```typescript
// Not part of public API
type ColumnAssignment = number;  // colIndex for each child
type ColumnHeights    = number[]; // cumulative height per column
```

---

## RN-DEVIATION

**CSS `column-count` unavailable**: Web Masonry uses CSS multi-column layout. React Native uses `onLayout`-driven argmin column assignment with multiple flex-column Views.

Comment in source: `// RN-DEVIATION: column layout via onLayout+argmin; CSS column-count unavailable in RN`

---

## Export

```typescript
// src/index.ts
export { Masonry } from './components/Masonry';
export type { MasonryProps } from './components/Masonry';
```

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Equal distribution | `columns={3}`, 9 equal-height children | 3 children per column |
| Shortest-column fill | varying heights | next child placed in shortest column |
| Spacing gap | `spacing={8}` | 8dp gap between children |
| defaultColumns fallback | `defaultColumns={2}`, no `columns` | initial render uses 2 columns |
| Zero children | no children | empty container, no throw |
