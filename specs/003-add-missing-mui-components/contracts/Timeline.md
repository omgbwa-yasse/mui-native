# Contract: Timeline Components

**Components**: `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, `TimelineOppositeContent`
**Category**: Lab / Display
**MUI Reference**: https://mui.com/material-ui/react-timeline/
**MD3 Reference**: N/A (display utility — no direct MD3 equivalent)

---

## Public API

### `Timeline` (root)

```typescript
import type { StyleProp, ViewStyle } from 'react-native';

export type TimelinePosition = 'left' | 'right' | 'alternate';

export interface TimelineProps {
  /**
   * Determines which side of the separator content appears.
   * 'alternate' flips layout for every other item.
   * @default 'right'
   */
  position?: TimelinePosition;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override (FR-024). */
  style?: StyleProp<ViewStyle>;
}
```

Provides `TimelineContext` to children with `{ position, getItemIndex }`.

---

### `TimelineItem`

```typescript
export interface TimelineItemProps {
  children?: React.ReactNode;
  /** StyleSheet-compatible style override (FR-024). */
  style?: StyleProp<ViewStyle>;
}
```

Reads `position` and `itemIndex` from `TimelineContext`. When `position='alternate'` and index is odd, content sides are swapped.

---

### `TimelineSeparator`

```typescript
export interface TimelineSeparatorProps {
  children?: React.ReactNode; // Should contain TimelineDot (+ optional TimelineConnector)
  style?: StyleProp<ViewStyle>;
}
```

---

### `TimelineDot`

```typescript
export type TimelineDotVariant = 'filled' | 'outlined';
export type TimelineDotColor   =
  | 'inherit' | 'primary' | 'secondary'
  | 'error' | 'info' | 'success' | 'warning' | 'grey';

export interface TimelineDotProps {
  /** @default 'filled' */
  variant?: TimelineDotVariant;
  /** @default 'grey' */
  color?: TimelineDotColor;
  /** Optional icon or content inside the dot. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Token mapping**:
- `filled`: `backgroundColor = theme.colorScheme[color]` (or grey fallback)
- `outlined`: `borderColor = theme.colorScheme[color]`, `backgroundColor = 'transparent'`

---

### `TimelineConnector`

```typescript
export interface TimelineConnectorProps {
  /** StyleSheet-compatible style override. Applied to the vertical line. */
  style?: StyleProp<ViewStyle>;
}
```

Renders as `flex:1` vertical line (2dp wide, `theme.colorScheme.outline` color).

---

### `TimelineContent`

```typescript
export interface TimelineContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

Flex-1 container on the primary content side.

---

### `TimelineOppositeContent`

```typescript
export interface TimelineOppositeContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

Flex-1 container on the opposite side of the separator.

---

## Layout Anatomy

```
Timeline (flexDirection:'column')
└── TimelineItem (flexDirection:'row')
    ├── [TimelineOppositeContent] (flex:1) — left side when position='left' / even alternate
    ├── TimelineSeparator (flexDirection:'column', alignItems:'center', width:24dp)
    │   ├── TimelineDot (12×12dp circle)
    │   └── TimelineConnector (flex:1, borderLeft 2dp)
    └── TimelineContent (flex:1) — right side default
```

---

## Context

```typescript
interface TimelineContextValue {
  position: TimelinePosition;
  registerItem: () => number; // returns item's sequential index
}
```

---

## Export

```typescript
// src/index.ts
export { Timeline }                 from './components/Timeline';
export { TimelineItem }             from './components/Timeline';
export { TimelineSeparator }        from './components/Timeline';
export { TimelineDot }              from './components/Timeline';
export { TimelineConnector }        from './components/Timeline';
export { TimelineContent }          from './components/Timeline';
export { TimelineOppositeContent }  from './components/Timeline';

export type { TimelineProps, TimelinePosition }            from './components/Timeline';
export type { TimelineItemProps }                          from './components/Timeline';
export type { TimelineSeparatorProps }                     from './components/Timeline';
export type { TimelineDotProps, TimelineDotVariant, TimelineDotColor } from './components/Timeline';
export type { TimelineConnectorProps }                     from './components/Timeline';
export type { TimelineContentProps }                       from './components/Timeline';
export type { TimelineOppositeContentProps }               from './components/Timeline';
```

> **Note**: All 7 sub-components can be colocated in a single `src/components/Timeline/` folder, each in its own file, with a shared `Timeline/index.ts` barrel.

---

## Acceptance Test Summary

| Scenario | Input | Expected |
|----------|-------|----------|
| Vertical order | 3 TimelineItems in Timeline | Items displayed top-to-bottom in order |
| Dot + connector visible | TimelineSeparator with Dot + Connector | Dot circle and vertical line present |
| Primary color dot | `TimelineDot color="primary"` | Dot uses primary theme color |
| Outlined dot | `TimelineDot variant="outlined"` | Transparent fill, border visible |
| Opposite content | TimelineOppositeContent + TimelineContent | Content on both sides of separator |
| Alternate position | `Timeline position="alternate"` | Items alternate left/right |
| Single item, no connector | No TimelineConnector | No vertical line, no layout error |
