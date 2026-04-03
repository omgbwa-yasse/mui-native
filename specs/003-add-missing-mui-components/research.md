# Research: Feature 003 — Add Missing MUI Components

**Date**: 2026-04-03
**Branch**: `003-add-missing-mui-components`
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## Summary

All 7 component groups can be implemented entirely with existing tooling. Decisions used:
- `react-native-reanimated` 3.x for all animation (existing peer dep)
- `ref.measure()` for on-screen anchor positioning (same as existing `Menu.tsx`)
- `onLayout` for child height measurement in `Collapse` and `Masonry`
- Existing `Portal` system for `Popover` overlay rendering
- `useTheme()` + `src/tokens/` for all visual values
- **No new dependencies required**

---

## Research Findings

### 1. CircularProgress — Determinate Arc Rendering

**Question**: How to render a configurable arc (0–360°) in React Native without `react-native-svg`?

**Decision**: Two-half-circle clipping technique (View-based, no SVG).

**Rationale**:
- No new native dependency needed
- Purely View/Transform-based — worklet-friendly
- Indeterminate path is identical to existing `ActivityIndicator` (border-trick + `withRepeat`)
- Determinate path: two overflow-hidden "half-disc" containers, each holding a full-color inner circle
  - Left half rotates `Math.min(value / 50, 1) * 180deg`
  - Right half rotates `Math.max((value - 50) / 50, 0) * 180deg`; only revealed when `value > 50`

**Alternatives considered**:
- `react-native-svg` with `strokeDashoffset`: Most accurate but requires adding a native dep with RN version sensitivity
- Pure border trick: Supports indeterminate only; cannot represent arbitrary deterministic arcs

**RN-DEVIATION**: Web `CircularProgress` uses SVG `<circle>` with `strokeDashoffset`. React Native uses clip+rotation with `View`/`overflow:'hidden'` since SVG is not a core RN primitive.

**Token mapping**:
| Property     | Token                                    |
|-------------|------------------------------------------|
| Track        | `theme.colorScheme.primaryContainer`      |
| Fill         | `theme.colorScheme.primary` (or mapped from `color` prop) |
| Size default | 40dp                                      |
| Stroke default | 3.6dp                                  |
| Rotation speed | `motionDuration.long2` (500ms) × 2 = ~900ms (match ActivityIndicator) |
| Determinate transition | `motionDuration.medium2` (300ms) |

---

### 2. LinearProgress — Three-Layer Track Architecture

**Decision**: Three absolute-positioned `View` layers within a fixed-height container.

**Layer stack (bottom → top)**:
1. **Track** (background): `theme.colorScheme.primaryContainer`, full width
2. **Buffer fill**: `theme.colorScheme.primary` at 38% opacity — MD3 "secondary container" approximation; width driven by `valueBuffer` shared value
3. **Determinate fill / indeterminate bar**: `theme.colorScheme.primary`, full opacity; width animated via `useSharedValue`

**Indeterminate animation** (two interleaved animated bars, matches MUI web behaviour):
- Bar 1: `withRepeat(withTiming(translate_A, { duration: 2100 }))` shrink/grow sweep
- Bar 2: same but `withDelay(715, ...)` stagger offset

**Alternatives considered**:
- Single bar sweep: Simpler but does not match MD3 indeterminate spec (`translate` + `scale` compound transform)

**RN-DEVIATION**: None. Three-layer absolute positioning maps cleanly to RN `View`.

**Token mapping**:
| Layer   | Token                                            |
|---------|--------------------------------------------------|
| Track   | `theme.colorScheme.primaryContainer`              |
| Buffer  | `theme.colorScheme.primary` @ 0.38 alpha         |
| Fill    | `theme.colorScheme.primary`                       |
| Height  | 4dp (MD3 spec)                                    |

---

### 3. Popover — Anchored Positioning Strategy

**Decision**: Direct port of the `Menu.tsx` anchor measurement pattern with `anchorOrigin`/`transformOrigin` offset calculation layer.

**Measurement** (from `Menu.tsx`):
```ts
anchorRef.current?.measure((_x, _y, anchorW, anchorH, pageX, pageY) => {
  setAnchorLayout({ x: pageX, y: pageY, width: anchorW, height: anchorH });
});
```

**Position calculation**:
```ts
const top = anchorLayout.y
  + anchorLayout.height * vFactor(anchorOrigin.vertical)
  - popoverLayout.height * vFactor(transformOrigin.vertical);

const left = anchorLayout.x
  + anchorLayout.width  * hFactor(anchorOrigin.horizontal)
  - popoverLayout.width * hFactor(transformOrigin.horizontal);
// vFactor('top')=0, vFactor('center')=0.5, vFactor('bottom')=1
```

**Two-pass render** (needed because popover dimensions are unknown until first layout):
1. Mount content with `opacity:0` — `onLayout` captures popover dimensions
2. Calculate screen position → set `opacity:1`

**Rendering stack**: `<Portal>` → `<Pressable>` backdrop for `onClose` → absolute-positioned content `<View>`

**Animation**: Wraps content with a `Fade` transition; plays on `open` toggle.

**Null-ref guard**: When `anchorRef.current` is null, the popover does not open and does not throw.

**Alternatives considered**:
- External positioning library (Floating UI for RN): Overkill — standard `measure()` is already used by `Menu` and is sufficient

---

### 4. Transition Components — Unified State Machine

**Decision**: Single `useTransition` internal hook drives all 5 transition types via shared state machine.

**State machine** (`TransitionPhase`):
```
ENTERING → ENTERED
              ↑        ↓
           EXITED ← EXITING
```

**Mount/unmount logic**:
| Flag combination                        | mounted condition                         |
|----------------------------------------|-------------------------------------------|
| `unmountOnExit=false` (default)         | `in || phase !== 'EXITED'` → always mounted |
| `unmountOnExit=true`                    | `in || phase !== 'EXITED'` → unmount after exit animation |
| `mountOnEnter=true`, initially `in=false` | defer first mount until `in` becomes `true` |

**Per-transition animated values**:
| Component | Values | Enter (→ visible) | Exit (→ hidden) |
|-----------|--------|--------------------|-----------------|
| Fade      | `opacity` | 0 → 1 | 1 → 0 |
| Grow      | `opacity` + `scale` | (0, 0.75) → (1, 1) | (1, 1) → (0, 0.75) |
| Slide up  | `translateY` | +screenH → 0 | 0 → +screenH |
| Slide down | `translateY` | -screenH → 0 | 0 → -screenH |
| Slide left | `translateX` | +screenW → 0 | 0 → +screenW |
| Slide right | `translateX` | -screenW → 0 | 0 → -screenW |
| Zoom      | `scale` | 0 → 1 | 1 → 0 |
| Collapse (v) | `height` | `collapsedSize` → `naturalHeight` | `naturalHeight` → `collapsedSize` |
| Collapse (h) | `width` | `collapsedSize` → `naturalWidth` | `naturalWidth` → `collapsedSize` |

**Reduce-motion**: When `reduceMotion.value === true`, duration is set to `0` — all transitions become instant.

**Default timeout**: `motionDuration.medium2` = 300ms for both enter and exit (resolved clarification Q1).

**RN-DEVIATION**: No `react-transition-group` — it is a web-only library. Functionality is reimplemented natively using Reanimated shared values.

**Alternatives considered**:
- One hook per component: more code, less consistency; rejected
- Class-based state machine: no benefit in RN functional component model; rejected

---

### 5. Collapse — Height Measurement Strategy

**Decision**: `onLayout` on inner container captures natural height; outer container height animates between `collapsedSize` ↔ `naturalHeight`.

**Sequence**:
1. Inner content mounts inside `<View style={{ position:'absolute', opacity:0 }}>` — renders off-screen
2. `onLayout` fires → store `naturalHeight` in React state
3. Outer container height is driven by `useSharedValue` interpolating between `collapsedSize` and `naturalHeight`
4. `collapsedSize` clamped to `Math.max(0, collapsedSize)` (edge case from spec)

**Alternatives considered**:
- Pre-defined fixed height: breaks for dynamic content; rejected
- RequestAnimationFrame polling: race conditions; rejected

---

### 6. Popper — Non-Blocking Anchored Content

**Decision**: Shares positioning logic with `Popover` via extracted `useAnchorPosition` hook; no backdrop; `disablePortal` supported.

**Differences from Popover**:
- No `<Pressable>` backdrop → touches pass through to content behind
- `placement` string enum replaces `anchorOrigin`/`transformOrigin` pair
- `disablePortal=true` → skip `<Portal>`, render inline in component tree

**Placement → origin mapping** (all 12 standard placements):
| placement     | anchorOrigin            | transformOrigin         |
|---------------|-------------------------|-------------------------|
| `top`         | `{v:'top', h:'center'}` | `{v:'bottom', h:'center'}` |
| `top-start`   | `{v:'top', h:'left'}`   | `{v:'bottom', h:'left'}` |
| `top-end`     | `{v:'top', h:'right'}`  | `{v:'bottom', h:'right'}` |
| `bottom`      | `{v:'bottom', h:'center'}` | `{v:'top', h:'center'}` |
| `bottom-start` | `{v:'bottom', h:'left'}` | `{v:'top', h:'left'}` |
| `bottom-end`  | `{v:'bottom', h:'right'}` | `{v:'top', h:'right'}` |
| `left`        | `{v:'center', h:'left'}` | `{v:'center', h:'right'}` |
| `left-start`  | `{v:'top', h:'left'}`   | `{v:'top', h:'right'}` |
| `left-end`    | `{v:'bottom', h:'left'}` | `{v:'bottom', h:'right'}` |
| `right`       | `{v:'center', h:'right'}` | `{v:'center', h:'left'}` |
| `right-start` | `{v:'top', h:'right'}`  | `{v:'top', h:'left'}` |
| `right-end`   | `{v:'bottom', h:'right'}` | `{v:'bottom', h:'left'}` |

---

### 7. Masonry — Column-Fill Algorithm

**Decision**: `onLayout`-driven per-child height tracking with `argmin` column assignment.

**Algorithm** (O(n) per child):
```
columnHeights[0..columns-1] = 0
for each child k when onLayout fires (height = h):
  minCol = argmin(columnHeights)
  assign child k → column minCol at offsetY = columnHeights[minCol]
  columnHeights[minCol] += h + spacing
```

**Rendering**: Multiple flex-column `View`s (one per column), each receiving its assigned children in order.

**Initial render**: Uses `defaultColumns` (default 2) before any height measurement occurs to avoid layout flash.

**Spacing**: Interpreted as raw dp; no token lookup required (spacing is a number prop per spec).

**RN-DEVIATION**: Web Masonry uses CSS `column-count`. RN uses `onLayout` + argmin algorithm since CSS multi-column layout is not supported in RN.

**Alternatives considered**:
- Absolute positioning with `y` offsets: More complex, harder to test; rejected
- Pre-determined fixed heights: Breaks for dynamic content; rejected

---

### 8. Timeline — Pure Layout Composition

**Decision**: Composition-only approach; no animation required.

**Context**: `TimelineContext` passes `position` prop (`'left' | 'right' | 'alternate'`) from `Timeline` to child `TimelineItem` components.

**Layout anatomy**:
```
Timeline (flexDirection:'column')
└── TimelineItem (flexDirection:'row')
    ├── TimelineOppositeContent (flex:1 — optional, left side when position='left')
    ├── TimelineSeparator (flexDirection:'column', alignItems:'center', width:~24dp)
    │   ├── TimelineDot (circle View, 12dp × 12dp)
    │   └── TimelineConnector (flex:1, borderLeftWidth:2, borderLeftColor:outline)
    └── TimelineContent (flex:1 — right side default)
```

**Alternate position logic**: `TimelineItem` reads `itemIndex` from `TimelineContext`; when `position='alternate'` and `itemIndex % 2 !== 0`, content sides are swapped.

**Token mapping**:
| Element       | Token                                                    |
|---------------|----------------------------------------------------------|
| Dot fill      | `theme.colorScheme[color]` (primary/secondary/error etc.) |
| Dot border    | `theme.colorScheme[color]` (outlined variant)            |
| Connector     | 2dp line in `theme.colorScheme.outline`                  |
| Content text  | standard `theme.colorScheme.onSurface`                   |

---

## Shared Internal Hooks (New)

| Hook                  | Location                          | Used by                         |
|-----------------------|-----------------------------------|---------------------------------|
| `useTransition`       | `src/hooks/useTransition.ts`      | Fade, Grow, Slide, Zoom, Collapse |
| `useAnchorPosition`   | `src/hooks/useAnchorPosition.ts`  | Popover, Popper                 |

---

## No New Dependencies Required

All 7 component groups rely only on:
- `react-native` core (View, Pressable, StyleSheet, onLayout, ref.measure, Dimensions)
- `react-native-reanimated` ≥ 3.x (existing peer dep)
- `src/tokens/` (existing token system)
- `src/components/Portal/` (existing Portal)
- `useTheme()` hook (existing)
- `useReducedMotionValue()` hook (existing)

---

## Resolved NEEDS CLARIFICATION

All clarifications were resolved in spec session 2026-04-03:

| # | Question | Resolution | FR |
|---|----------|------------|----|
| 1 | Default animation timeout? | 300ms = `motionDuration.medium2` | FR-010 |
| 2 | Default child state when `in=false`? | Mounted-but-hidden (opacity/scale = 0) | FR-008 |
| 3 | Should progress components expose a11y? | Yes — `accessibilityRole="progressbar"` + `accessibilityValue` | FR-023 |
| 4 | Follow `style` prop or add `sx`? | `style` prop only (no `sx`) | FR-024 |
| 5 | `Masonry.columns` - responsive objects or integers? | Integers only | FR-015 |
