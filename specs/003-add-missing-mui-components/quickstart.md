# Quickstart: Feature 003 — Add Missing MUI Components

**Branch**: `003-add-missing-mui-components`
**Date**: 2026-04-03

---

## Developer Setup

Assumes you already have the repo checked out and `node_modules` installed.

```bash
# 1. Switch to the feature branch
git checkout 003-add-missing-mui-components

# 2. Install dependencies (if not already done)
npm install

# 3. Verify existing tests pass before starting
npm test
# Expected: 100 tests passing, 0 failures
```

---

## Running Tests

```bash
# Full test suite
npm test

# Watch mode (reruns on file save)
npm test -- --watch

# Single component test file
npm test -- --testPathPattern="CircularProgress"

# Coverage report
npm test -- --coverage
```

---

## Linting

```bash
npm run lint
```

TypeScript strict mode is enforced. No `any` in public API types. No hardcoded color literals.

---

## Adding a New Component

Each new component follows the exact same folder structure. Example: `Fade`.

### 1. Create the folder

```
src/components/Fade/
├── types.ts          ← prop interface (TypeScript strict, no `any` in public API)
├── Fade.tsx          ← implementation
├── index.ts          ← barrel re-export
└── Fade.test.tsx     ← test file (render + variants + edge cases)
```

### 2. `types.ts` template

```typescript
import type { StyleProp, ViewStyle } from 'react-native';
import type { TransitionBaseProps } from '../Fade/types';  // or shared location

export interface FadeProps extends TransitionBaseProps {
  // no additional fields for Fade
}
```

### 3. `Fade.tsx` template

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { motionDuration } from '../../tokens/motion';
import type { FadeProps } from './types';

export function Fade({ in: inProp = false, timeout = 300, children, style }: FadeProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();
  const opacity = useSharedValue(inProp ? 1 : 0);

  // ... animation logic using worklets
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
```

### 4. `index.ts` template

```typescript
export { Fade } from './Fade';
export type { FadeProps } from './types';
```

### 5. Register in `src/index.ts`

```typescript
export { Fade } from './components/Fade';
export type { FadeProps } from './components/Fade';
```

### 6. Write tests (`Fade.test.tsx`)

Minimum required (FR-021):
1. **Render test** — mounts without error
2. **Props/variants test** — test `in={true}` vs `in={false}`, `timeout`, etc.
3. **Edge case test** — `unmountOnExit`, `mountOnEnter`, or callbacks

---

## Token Compliance Reference

| Need | Import | Usage |
|------|--------|-------|
| Color | `useTheme` | `const { theme } = useTheme(); theme.colorScheme.primary` |
| Animation duration | `motionDuration` from `../../tokens/motion` | `motionDuration.medium2` → 300ms |
| Animation easing | `motionEasing` from `../../tokens/motion` | `motionEasing.emphasized` |
| Spacing | `spacing` from `../../tokens/spacing` | `spacing[4]` → 16dp |
| Reduce motion | `useReducedMotionValue` | `reduceMotion.value` (Reanimated sharedValue) |

**Prohibited** (constitution violations):
```typescript
// ❌ Hardcoded color
style={{ color: '#1976D2' }}

// ❌ Inline literal spacing
style={{ padding: 16 }}

// ❌ Static palette import in render path
import { baseLightColors } from '../../tokens/colors';

// ❌ StyleSheet.create with static color
StyleSheet.create({ root: { backgroundColor: '#E0E0E0' } })
```

---

## Portal Usage

When a component needs to render above all siblings (overlays, dropdowns):

```typescript
import { Portal } from '../Portal';

// Inside the component render:
return (
  <Portal>
    <View style={absolutePositionedStyle}>
      {children}
    </View>
  </Portal>
);
```

`Portal` renders children into the nearest `PortalHost` in the app tree. Consumers must have `<PortalHost>` at their app root.

---

## Anchor Positioning Pattern

For components that position relative to a trigger element (`Popover`, `Popper`):

```typescript
import type { View } from 'react-native';

// In parent component:
const anchorRef = useRef<View>(null);
// <View ref={anchorRef} ... />
// <Popover anchorRef={anchorRef} ... />

// Inside Popover/Popper implementation:
anchorRef.current?.measure((_x, _y, anchorW, anchorH, pageX, pageY) => {
  setAnchorLayout({ x: pageX, y: pageY, width: anchorW, height: anchorH });
});
```

---

## Reanimated Worklet Rules

- All animation logic inside `useAnimatedStyle` callbacks runs on the UI thread — never access React state directly in worklets
- Use `runOnJS` to call React state setters from worklets (e.g., after animation completion)
- `useReducedMotionValue()` returns a Reanimated `SharedValue<boolean>` — access via `.value` inside worklets

```typescript
const reduceMotion = useReducedMotionValue();
const animatedStyle = useAnimatedStyle(() => {
  const duration = reduceMotion.value ? 0 : 300;  // ✅ worklet-safe
  return { opacity: withTiming(target.value, { duration }) };
});
```

---

## Verification Checklist Before PR

- [ ] `npm test` passes with 0 failures
- [ ] `npm run lint` passes with 0 errors
- [ ] No `any` in `types.ts` public interfaces
- [ ] No hardcoded color/spacing literals in component files
- [ ] `accessibilityRole`, `accessibilityLabel` set on all interactive/informational primitives
- [ ] `reduceMotion.value` checked in all animation worklets
- [ ] Component exported from `src/index.ts`
- [ ] Test file has ≥ 1 render test, ≥ 2 prop tests, ≥ 1 edge case test
