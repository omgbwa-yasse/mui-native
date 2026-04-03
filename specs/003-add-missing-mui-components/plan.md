# Implementation Plan: Add Missing MUI Components to mui-native

**Branch**: `003-add-missing-mui-components` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-add-missing-mui-components/spec.md`

## Summary

Add 7 missing MUI component groups to `mui-native` — `CircularProgress`, `LinearProgress`, `Popover`, 5 Transition components (`Fade`/`Grow`/`Slide`/`Zoom`/`Collapse`), `Popper`, `Masonry`, and full `Timeline` set (7 sub-components) — using existing `react-native-reanimated` 3.x worklet patterns, the `Portal` system, `ref.measure()` for anchor positioning, and `onLayout` for layout measurement. No new dependencies required. Feature is complete when `npm test` passes at 100% with zero regressions on pre-existing 100 tests.

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` is mandatory across all source files  
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled)  
**Storage**: N/A — stateless UI component library  
**Testing**: Jest + `@testing-library/react-native`  
**Target Platform**: iOS + Android (React Native; both platforms required per constitution Principle IV)  
**Project Type**: UI component library (npm package)  
**Performance Goals**: All animations run on UI thread via Reanimated worklets; no JS-thread blocking  
**Constraints**: No hardcoded color/spacing literals; no `any` in public types; all visual values from `src/tokens/`; no new npm dependencies  
**Scale/Scope**: 7 component groups → ~15–17 new component files + 2 shared hooks + test files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — MD3 spec references identified for all 7 groups; deviations documented:
  - `CircularProgress` determinate arc → View clip technique (not SVG); `// RN-DEVIATION:` planned
  - `Grow` transform-origin pivot → center-only (not configurable); `// RN-DEVIATION:` planned
  - `Masonry` → `onLayout`+argmin (not CSS `column-count`); `// RN-DEVIATION:` planned
  - All 5 Transition components → Reanimated (not `react-transition-group`); `// RN-DEVIATION:` planned

- [x] **II. Design Token Supremacy** — confirmed all visual values use `src/tokens/`:
  - Colors via `useTheme()` → `theme.colorScheme.*`
  - Animation durations via `motionDuration.medium2` (300ms default), `motionDuration.long2`
  - Spacing via raw dp or `spacing[]` token
  - No hardcoded literals (#hex, numeric color constants) planned in any component file

- [x] **III. Theme-First Architecture** — all new components consume `useTheme()` hook; no static palette imports in render paths; dark/light switching works via theme provider with zero component changes

- [x] **IV. Cross-Platform Parity** — all components use React Native core primitives (View, Pressable, Animated, onLayout, ref.measure); no platform-specific code paths; iOS + Android acceptance test scenarios defined in spec SC-001–SC-008

- [x] **V. Accessibility by Default** — FR-023 mandates `accessibilityRole="progressbar"` + `accessibilityValue` on both progress components; `useReducedMotionValue()` checked in all animation worklets; 48dp touch targets applied to `TimelineDot` and `Popover` backdrop

- [x] **VI. Performance Contract** — all animations use `react-native-reanimated` worklets (UI thread); `withTiming`/`withRepeat`/`withDelay` are all worklet-safe; `React.memo` applied to pure display components (`TimelineConnector`, `TimelineDot`, `TimelineSeparator`)

## Project Structure

### Documentation (this feature)

```text
specs/003-add-missing-mui-components/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── CircularProgress.md
│   ├── LinearProgress.md
│   ├── Popover.md
│   ├── Transitions.md    # Fade, Grow, Slide, Zoom, Collapse
│   ├── Popper.md
│   ├── Masonry.md
│   └── Timeline.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── CircularProgress/
│   │   ├── CircularProgress.tsx      # Component implementation
│   │   ├── types.ts                  # CircularProgressProps interface
│   │   ├── index.ts                  # Barrel: export { CircularProgress } + export type
│   │   └── CircularProgress.test.tsx # render + variant + edge case tests
│   │
│   ├── LinearProgress/
│   │   ├── LinearProgress.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── LinearProgress.test.tsx
│   │
│   ├── Popover/
│   │   ├── Popover.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Popover.test.tsx
│   │
│   ├── Fade/
│   │   ├── Fade.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Fade.test.tsx
│   │
│   ├── Grow/
│   │   ├── Grow.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Grow.test.tsx
│   │
│   ├── Slide/
│   │   ├── Slide.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Slide.test.tsx
│   │
│   ├── Zoom/
│   │   ├── Zoom.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Zoom.test.tsx
│   │
│   ├── Collapse/
│   │   ├── Collapse.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Collapse.test.tsx
│   │
│   ├── Popper/
│   │   ├── Popper.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Popper.test.tsx
│   │
│   ├── Masonry/
│   │   ├── Masonry.tsx
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── Masonry.test.tsx
│   │
│   └── Timeline/
│       ├── Timeline.tsx
│       ├── TimelineItem.tsx
│       ├── TimelineSeparator.tsx
│       ├── TimelineDot.tsx
│       ├── TimelineConnector.tsx
│       ├── TimelineContent.tsx
│       ├── TimelineOppositeContent.tsx
│       ├── TimelineContext.ts           # React context for position + itemIndex
│       ├── types.ts
│       ├── index.ts
│       └── Timeline.test.tsx
│
├── hooks/                               # NEW: shared internal hooks
│   ├── useTransition.ts                 # State machine used by all 5 Transitions
│   └── useAnchorPosition.ts             # Positioning logic used by Popover + Popper
│
└── index.ts                             # Add new exports here (FR-019)
```

**Structure Decision**: Single project (Option 1). All new components follow the existing `src/components/ComponentName/` pattern with `ComponentName.tsx` + `types.ts` + `index.ts` + `ComponentName.test.tsx`. Two new shared hooks are colocated in `src/hooks/` to avoid duplicating anchor measurement and transition state logic.

## Complexity Tracking

> No constitution violations. All gates pass. No justification required.
