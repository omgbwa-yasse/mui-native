# Implementation Plan: RN-Material Core Framework

**Branch**: `001-rn-material-core` | **Date**: 2026-04-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-rn-material-core/spec.md`

## Summary

Build **RN-Material** — a React Native UI component library modelled after Material
Design 3 (MD3 / Material You) and cross-referenced with MUI v6. The library exposes a
complete MD3 design-token set, a `ThemeProvider` with runtime light/dark switching and
dynamic color generation, nine core MD3 components (Button, TextField, Card, AppBar,
FAB, Chip, Dialog, BottomSheet), a `useTheme()` hook, and an optional adapter for
`@react-native-material/core`. All animations run in Reanimated worklets; all components
meet WCAG 2.1 AA, 48 dp touch-target, and RTL requirements.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all peer deps — not bundled)
**Storage**: N/A — stateless UI library; no persistence layer
**Testing**: Jest + `@testing-library/react-native`; Storybook (visual review, not runtime)
**Target Platform**: iOS 15+ and Android API 26+ via React Native (Expo managed + bare workflow)
**Project Type**: npm library (published package)
**Performance Goals**: Theme switch ≤ 16 ms (1 frame); all animations at 60 fps via Reanimated worklets; component bundle budget ≤ 10 kB minified per new component
**Constraints**: Zero hardcoded hex/size literals in component files; no JS-thread animations; RTL-compatible logical properties only; `reduceMotion` respected
**Scale/Scope**: ~40 source files at v1 (9 components × 3 files + 7 token files + 6 theme files + 1 adapter + 1 barrel); public API surface ~15 exported symbols

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — MD3 spec reference identified (https://m3.material.io + MUI v6); `// RN-DEVIATION:` convention established; all 9 components have a spec URL anchor in data-model.md
- [x] **II. Design Token Supremacy** — all values traced to `src/tokens/`; zero hardcoded literals planned; TypeScript strict typing on token shape prevents silent omissions
- [x] **III. Theme-First Architecture** — `ThemeProvider` + `useTheme()` pattern mandated; `ThemeContext` is the only allowed source of palette values at render time
- [x] **IV. Cross-Platform Parity** — iOS and Android acceptance scenarios defined for every User Story; Storybook stories required on both platforms
- [x] **V. Accessibility by Default** — US5 and FR-010/FR-012 mandate `accessibilityLabel/Role/State`, 48 dp targets, and `reduceMotion` for all interactive components
- [x] **VI. Performance Contract** — FR-011 mandates Reanimated worklets; `React.memo` specified in component-variant resolution; ≤ 10 kB bundle budget per component

**Gate result**: ✅ ALL PASS — proceeding to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/001-rn-material-core/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output — public API type contracts
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── tokens/
│   ├── colors.ts          # MD3 color roles (light + dark palettes, all 30 roles)
│   ├── typography.ts      # MD3 type scale (Display, Headline, Title, Body, Label × 3 sizes)
│   ├── spacing.ts         # 4-dp grid spacing scale (xs → 3xl)
│   ├── shape.ts           # MD3 corner radius tokens (extra-small → extra-large)
│   ├── elevation.ts       # Five MD3 elevation levels + shadow definitions
│   ├── motion.ts          # MD3 motion duration + easing tokens
│   └── index.ts           # Re-exports all token namespaces
│
├── theme/
│   ├── ThemeContext.ts    # React.createContext; useTheme() hook + error guard
│   ├── ThemeProvider.tsx  # Context provider; light/dark switching; seed color → palette
│   ├── createTheme.ts     # Compose token overrides into a full Theme object
│   ├── generatePalette.ts # Dynamic color algorithm: seed → MD3 tonal palettes
│   ├── types.ts           # Theme, ColorScheme, PlatformOverrides TypeScript interfaces
│   └── index.ts
│
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   └── index.ts
│   ├── TextField/
│   │   ├── TextField.tsx
│   │   ├── TextField.styles.ts
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.styles.ts
│   │   └── index.ts
│   ├── AppBar/
│   │   ├── AppBar.tsx
│   │   ├── AppBar.styles.ts
│   │   └── index.ts
│   ├── FAB/
│   │   ├── FAB.tsx
│   │   ├── FAB.styles.ts
│   │   └── index.ts
│   ├── Chip/
│   │   ├── Chip.tsx
│   │   ├── Chip.styles.ts
│   │   └── index.ts
│   ├── Dialog/
│   │   ├── Dialog.tsx
│   │   ├── Dialog.styles.ts
│   │   └── index.ts
│   ├── BottomSheet/
│   │   ├── BottomSheet.tsx
│   │   ├── BottomSheet.styles.ts
│   │   └── index.ts
│   └── NavigationBar/
│       ├── NavigationBar.tsx
│       ├── NavigationBar.styles.ts
│       └── index.ts
│
├── adapters/
│   └── rnm-core-adapter.ts  # Maps RN-Material Theme → @react-native-material/core theme shape
│
└── index.ts                 # Public barrel — all exported symbols

tests/
├── unit/
│   ├── tokens/             # Token shape integrity tests
│   ├── theme/              # ThemeProvider, useTheme(), createTheme(), generatePalette()
│   └── components/         # Per-component prop/variant/state/accessibility tests
└── integration/
    └── adapter/            # @react-native-material/core adapter interop tests

.storybook/                  # Storybook config (Visual review — not a runtime dep)
stories/
└── components/             # One story file per component, all variants
```

**Structure Decision**: Single-package library (`src/`) with a flat barrel export
(`src/index.ts`). No monorepo overhead for v1. Platform extension files (`.ios.tsx`,
`.android.tsx`) are used inside component folders when platform-specific rendering is
required; the default `.tsx` file contains the cross-platform implementation.

## Complexity Tracking

No constitution violations requiring justification. All six principles satisfied
by design.
