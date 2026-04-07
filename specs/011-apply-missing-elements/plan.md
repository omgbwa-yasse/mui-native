# Implementation Plan: 011 — Apply Missing MUI-Aligned Elements

**Branch**: `011-apply-missing-elements` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-apply-missing-elements/spec.md`

## Summary

Add the five missing MUI-aligned component groups that were identified during the MUI comparison
analysis: composable **List sub-components** (ListItemButton / ListItemIcon / ListItemAvatar /
ListItemText / ListSubheader), composable **Accordion** sub-components (AccordionSummary /
AccordionDetails / AccordionActions) alongside the existing data-driven Accordion (discriminated
union), composable **Stepper** sub-components (Step / StepLabel / StepContent / StepConnector /
MobileStepper) alongside the existing data-driven Stepper, an extended **RadioGroup** (adds
`onChange` / `name` / `defaultValue` / `row` while keeping `onValueChange`), and a
**`useMediaQuery`** hook backed by `useWindowDimensions`.  All ~24 new files follow the existing
project patterns (Reanimated worklets, `useTheme()`, `accessible={true}` + `role=`, React.memo).

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory across all source and test files  
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled by this library)  
**Storage**: N/A — stateless UI component library  
**Testing**: Jest 29 + `@testing-library/react-native` 12.9.0 (RNTL); `accessible={true}` required alongside `role=` on View-based components for `getByRole()` to function  
**Target Platform**: iOS 14+ and Android API 24+ via React Native 0.73  
**Project Type**: library (npm package, no app entrypoint)  
**Performance Goals**: ≤ 10 kB gzipped bundle delta per component group; Accordion / StepContent animations via Reanimated worklets (UI-thread only); `React.memo` on all new components  
**Constraints**: Existing 451 tests / 36 suites must stay green; TypeScript strict — 0 errors; no new runtime dependencies; `useWindowDimensions` for reactive breakpoints (no CSS environment)  
**Scale/Scope**: 5 component groups; ~24 new source files + ~5 modified files; ~15 new test files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — MD3 spec referenced for all five component groups; one documented deviation: `ListSubheader` is non-sticky (`// RN-DEVIATION: sticky-header requires SectionList, out of scope`); Accordion data-driven API preserved unchanged
- [x] **II. Design Token Supremacy** — no hardcoded color/spacing literals; all typography via `theme.typography.*`, spacing via `theme.spacing()`, colors via `theme.palette.*` / color-role tokens
- [x] **III. Theme-First Architecture** — all new components call `useTheme()` at render time; no static palette imports in render path
- [x] **IV. Cross-Platform Parity** — RNTL acceptance tests planned for both iOS and Android test-IDs; `Platform.select` used for shadow/elevation differences where needed
- [x] **V. Accessibility by Default** — `role="button"` + `accessible={true}` on `ListItemButton` and `AccordionSummary`; `accessibilityLabel` on `StepLabel`; `MobileStepper` back/next buttons require accessible labels; `RadioGroup` propagates `name` as `accessibilityLabel`; all touch targets ≥ 48dp
- [x] **VI. Performance Contract** — `AccordionDetails` collapse/expand via the existing `Collapse` component (Reanimated worklet); `StepContent` expand/collapse via `Collapse`; all new components wrapped in `React.memo`

## Project Structure

### Documentation (this feature)

```text
specs/011-apply-missing-elements/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/
│   └── api.md           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── List/
│   │   ├── ListItemButton.tsx    (NEW) pressable row; role="button" + accessible={true}
│   │   ├── ListItemIcon.tsx      (NEW) icon slot left/right of ListItemText
│   │   ├── ListItemAvatar.tsx    (NEW) avatar slot left of ListItemText
│   │   ├── ListItemText.tsx      (NEW) primary + secondary text inside ListItem
│   │   ├── ListSubheader.tsx     (NEW) section header (non-sticky)
│   │   ├── index.ts              (MODIFY) add exports for 5 new components
│   │   └── types.ts              (MODIFY) add 5 new prop types
│   │
│   ├── Accordion/
│   │   ├── AccordionContext.ts   (NEW) internal context — isExpanded, toggle, disabled
│   │   ├── AccordionSummary.tsx  (NEW) trigger row; role="button" + accessible={true}
│   │   ├── AccordionDetails.tsx  (NEW) collapsible body; delegates to Collapse
│   │   ├── AccordionActions.tsx  (NEW) footer action row
│   │   ├── Accordion.tsx         (MODIFY) discriminated union: data-driven | composable
│   │   ├── index.ts              (MODIFY) add exports for 3 new components
│   │   └── types.ts              (MODIFY) add composable prop types; keep data-driven
│   │
│   ├── Stepper/
│   │   ├── StepperContext.ts     (NEW) internal context — activeStep, orientation, totalSteps
│   │   ├── Step.tsx              (NEW) individual step wrapper
│   │   ├── StepLabel.tsx         (NEW) step indicator + label text
│   │   ├── StepContent.tsx       (NEW) collapsible step body; delegates to Collapse
│   │   ├── StepConnector.tsx     (NEW) visual connector between steps
│   │   ├── MobileStepper.tsx     (NEW) dots | progress | text navigation control
│   │   ├── Stepper.tsx           (MODIFY) discriminated union: data-driven | composable
│   │   ├── index.ts              (MODIFY) add exports for 6 new components
│   │   └── types.ts              (MODIFY) add composable prop types; keep data-driven
│   │
│   └── RadioButton/
│       ├── RadioGroupContext.ts  (NEW) extended context — name, onChange, row
│       ├── RadioGroup.tsx        (MODIFY) add onChange, name, defaultValue, row; keep onValueChange
│       ├── index.ts              (MODIFY) add Radio alias + new prop types
│       └── types.ts              (MODIFY) add RadioProps; extend RadioGroupProps
│
└── hooks/
    └── useMediaQuery.ts          (NEW) useWindowDimensions + named/raw query support

src/index.ts                      (MODIFY) re-export all new components + hook

tests/
└── unit/
    ├── components/
    │   ├── List/
    │   │   ├── ListItemButton.test.tsx
    │   │   ├── ListItemIcon.test.tsx
    │   │   ├── ListItemAvatar.test.tsx
    │   │   ├── ListItemText.test.tsx
    │   │   └── ListSubheader.test.tsx
    │   ├── Accordion/
    │   │   ├── AccordionSummary.test.tsx
    │   │   ├── AccordionDetails.test.tsx
    │   │   └── AccordionActions.test.tsx
    │   ├── Stepper/
    │   │   ├── Step.test.tsx
    │   │   ├── StepLabel.test.tsx
    │   │   ├── StepContent.test.tsx
    │   │   └── MobileStepper.test.tsx
    │   └── RadioButton/
    │       └── RadioGroup-extended.test.tsx
    └── hooks/
        └── useMediaQuery.test.ts
```

**Structure Decision**: Single-project library layout — all source under `src/`, all tests under `tests/unit/`. Each component group gets its own sub-directory (already the convention). No new top-level directories needed.

## Complexity Tracking

> No Constitution Check violations — no entries required.
