# Implementation Plan: 009 — MUI API Alignment (Global Config, Size, Color, sx, Slots)

**Branch**: `009-mui-config-sync` | **Date**: 2026-04-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-mui-config-sync/spec.md`

## Summary

Add five MUI v6 API conventions to all 78 existing components with no breaking changes:
1. **`theme.components`** — global default props + style overrides per component, set in `createTheme()`
2. **`size` prop** — `'small' | 'medium' | 'large'` on all 78 components; 3 container components propagate via context
3. **`color` prop** — `ColorProp` union on all 78 components; 12 new semantic `ColorScheme` roles (success/warning/info triads)
4. **`sx` prop** — spacing/color/layout shorthands, array notation, responsive breakpoints via `useWindowDimensions`; CSS-inapplicable features silently ignored
5. **`slots`/`slotProps`** — sub-component replacement + prop forwarding on 15 composite components

Implementation adds 6 new source files, modifies `Theme`, `createTheme`, `ColorScheme`, all 78 component types + implementations. No new peer dependencies. No breaking changes.

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory across all source and test files
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled by this library)
**Storage**: N/A — stateless UI component library
**Testing**: Jest + `@testing-library/react-native`; `npm test` command
**Target Platform**: iOS + Android (React Native); primary development device matrix: iPhone 14 (iOS 17) + Pixel 7 (Android 14)
**Project Type**: React Native UI component library (published package)
**Performance Goals**: `useSx(undefined)` → zero allocation; `useSx(sxObj)` → memoized result; no Reanimated worklets required (sx is static style)
**Constraints**: No new peer dependencies; all new props optional with defaults matching pre-feature behavior; `tsc --noEmit` must pass after every phase
**Scale/Scope**: 78 components, all in `src/components/`; 6 new files; ~15 modified existing files (excluding per-component TouchPoints)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — API names mirror MUI v6 exactly (`size`, `color`, `sx`, `slots`, `slotProps`, `theme.components`); RN deviations documented with `// RN-DEVIATION:` (CSS pseudo-selectors, `@media` strings, `display` limited to `'flex'|'none'`)
- [x] **II. Design Token Supremacy** — 12 new color roles added to `src/tokens/colors.ts`; `SizeScale` constants in `src/tokens/size.ts`; `useSx` spacing resolves via `theme.spacing[n]`; no hardcoded literals anywhere in the implementation
- [x] **III. Theme-First Architecture** — `theme.components` consumed via `useTheme()` through `useComponentDefaults()`; `useColorRole()` reads `theme.colorScheme`; `useSx()` reads `theme.spacing` and `theme.colorScheme`; no static palette imports in render path
- [x] **IV. Cross-Platform Parity** — `useSx` uses `useWindowDimensions()` (cross-platform); `size` prop dimensions target both iOS and Android touch targets; no platform-specific code paths introduced
- [x] **V. Accessibility by Default** — `size='small'` still maintains ≥32dp `touchTarget`; `color` prop does not remove existing `accessibilityLabel` or `accessibilityRole` on any component; semantic color triads maintain WCAG 4.5:1 contrast via MD3 role system
- [x] **VI. Performance Contract** — `useSx(undefined)` returns `undefined` immediately (no allocation); `useSx(sx, theme)` memoized via `useMemo([sx, viewportWidth])`; `useComponentDefaults` reads context (no extra renders); no animations introduced

## Project Structure

### Documentation (this feature)

```text
specs/009-mui-config-sync/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output — all 7 decisions resolved
├── data-model.md        # Phase 1 output — 10 entities (SizeProp, SxProps, ComponentsConfig, …)
├── quickstart.md        # Phase 1 output — 5 usage examples (one per user story)
├── contracts/
│   ├── theme-components-api.md  # createTheme + ComponentsConfig + useComponentDefaults
│   ├── sx-props-api.md          # SxProps type + useSx hook + breakpoints + RN deviations
│   └── component-props-api.md   # size, color, sx, slots, slotProps on all components
└── tasks.md             # Phase 2 output (/speckit.tasks command — NOT created by /speckit.plan)
```

### Source Code Changes

```text
src/
├── tokens/
│   ├── colors.ts          ← MODIFY: +12 semantic roles (success/warning/info triads)
│   │                                 Extend ColorScheme interface + baseLightColors + baseDarkColors
│   ├── size.ts            ← CREATE: SizeProp type + SizeScale constants (small/medium/large)
│   └── index.ts           ← MODIFY: export { SizeProp, SIZE_SCALE } from './size'
│
├── types/
│   └── shared.ts          ← CREATE: SizeProp, ColorProp, SxProps, SlotPropsConfig,
│                                     isColorProp() type guard, colorRoleMap constant
│
├── theme/
│   ├── types.ts           ← MODIFY: Theme + components?: ComponentsConfig
│   ├── createTheme.ts     ← MODIFY: CreateThemeOptions + components → stored on Theme
│   ├── componentsDefs.ts  ← CREATE: ComponentPropsMap (78 entries) + ComponentsConfig mapped type
│   │                                 ComponentOverride<T> generic
│   └── index.ts           ← MODIFY: export { ComponentsConfig, ComponentOverride } from './componentsDefs'
│
├── hooks/
│   ├── useComponentDefaults.ts  ← CREATE: reads theme.components[name]?.defaultProps + merges
│   ├── useSx.ts                 ← CREATE: SxProps → RN style; memoized; breakpoints via
│   │                                       useWindowDimensions; color role resolution
│   ├── useColorRole.ts          ← CREATE: ColorProp → { bg, fg, container, onContainer }
│   └── index.ts                 ← MODIFY: export all 3 new hooks
│
├── components/
│   └── **/<Name>/
│       ├── types.ts       ← MODIFY (×78): + size?: SizeProp, color?: ColorProp, sx?: SxProps
│       │                                    + slots?/slotProps? on 15 composite components
│       └── <Name>.tsx     ← MODIFY (×78): useComponentDefaults + useSx + useColorRole
│                                           ButtonGroup/ToggleButtonGroup/Tabs: add context provider
│
└── index.ts               ← MODIFY: export SizeProp, ColorProp, SxProps from './types/shared'

apps/showcase/
└── src/
    └── catalogue/
        └── examples.*.tsx ← MODIFY: 3 new examples each component (size / color / sx variations)

tests/
├── unit/
│   ├── hooks/
│   │   ├── useComponentDefaults.test.ts  ← CREATE
│   │   ├── useSx.test.ts                  ← CREATE
│   │   └── useColorRole.test.ts           ← CREATE
│   └── tokens/
│       └── sizeTokens.test.ts             ← CREATE
└── integration/
    └── theme-components-config.test.tsx   ← CREATE
```

**Structure Decision**: Single-project library (Option 1). All source changes are within the existing `src/` tree. No new packages, no monorepo restructuring required.

## Complexity Tracking

> No Constitution Check violations requiring justification.

| Observation | Note |
|-------------|------|
| 78 component modifications | Mechanical transformation — same pattern applied to all; tasks.md will batch by category |
| `typecheck after every phase` constraint | `tsc --noEmit` runs as the final step of each implementation phase task |

---

## Phase 0: Research ✅ COMPLETE

**Output**: `research.md` — all 7 unknowns resolved, 8 decisions recorded

Key decisions:
- D1: Component keys in `theme.components` use unprefixed names (`Button`, not `MuiButton`)
- D2: Merge defaultProps at render time via hook (not at createTheme time)
- D3: `SizeScale` constants in `src/tokens/size.ts`; per-category overrides in component style files
- D4: 12 new ColorScheme roles with MUI v6-derived baseline values
- D5: `useSx` returns `undefined` when prop absent (zero cost)
- D6: CSS pseudo-selectors silently ignored; documented as `// RN-DEVIATION:`
- D7: `slots`/`slotProps` on 15 composite components only
- D8: No new peer dependencies

---

## Phase 1: Foundation Tokens + Types

**Goal**: Establish type infrastructure so all subsequent phases compile cleanly.
**Gate**: `tsc --noEmit` passes; all new token/type files export correctly

### Tasks

**P1.1 — Extend `ColorScheme` with 12 semantic roles**
- File: `src/tokens/colors.ts`
- Add 12 role declarations to `ColorScheme` interface
- Add 12 entries to `baseLightColors` (light mode values from research D4)
- Add 12 entries to `baseDarkColors` (dark mode values from research D4)
- Verify existing `generatePalette` still works (no changes needed)

**P1.2 — Create `src/tokens/size.ts`**
- Export `SizeProp = 'small' | 'medium' | 'large'`
- Export `SizeTokens` interface + `SIZE_SCALE` constant
- Update `src/tokens/index.ts` to export these

**P1.3 — Create `src/types/shared.ts`**
- Export: `SizeProp` (re-export from tokens), `ColorProp`, `SxObject`, `SxProps`, `SlotPropsConfig<T>`, `isColorProp()`, `colorRoleMap`

**P1.4 — Create `src/theme/componentsDefs.ts`**
- Import all 78 component props types
- Define `ComponentPropsMap` interface (78 component keys)
- Define `ComponentOverride<T>` interface
- Define `ComponentsConfig` mapped type
- Export all three

**P1.5 — Extend `Theme` and `CreateThemeOptions`**
- File: `src/theme/types.ts` — add `components?: ComponentsConfig`
- File: `src/theme/createTheme.ts` — add `components?` to `CreateThemeOptions`; store verbatim on returned `Theme`
- Update `src/theme/index.ts` exports

---

## Phase 2: New Hooks

**Goal**: Implement `useComponentDefaults`, `useSx`, `useColorRole`.
**Gate**: All 3 hook unit tests pass; `tsc --noEmit` passes

**P2.1 — Create `src/hooks/useComponentDefaults.ts`**
- Signature: `useComponentDefaults<K extends keyof ComponentPropsMap>(name: K, instanceProps: ComponentPropsMap[K]): ComponentPropsMap[K]`
- Reads `theme.components?.[name]?.defaultProps`
- Merges: spread defaultProps, then overwrite with defined instanceProps values
- Returns `instanceProps` as-is when no config for component

**P2.2 — Create `src/hooks/useSx.ts`**
- Input: `SxProps | undefined`, `Theme`
- Array flattening (filter falsy, reduce left-to-right)
- Shorthand key expansion (m→margin, mt→marginTop, px→paddingHorizontal, etc.)
- Responsive resolution: `useWindowDimensions` + breakpoint table
- Color resolution: if `isColorProp(value)` → `colorRoleMap[value].bg` → `theme.colorScheme[role]`
- Memoization: `useMemo([sx, viewportWidth])`
- Returns `undefined` when `sx` is falsy

**P2.3 — Create `src/hooks/useColorRole.ts`**
- Input: `ColorProp | undefined`
- Returns `{ bg, fg, container, onContainer }` from `theme.colorScheme`
- Defaults to `'primary'` when undefined

**P2.4 — Update `src/hooks/index.ts`**
- Re-export all three new hooks

---

## Phase 3: Component Batch 1 — Actions

**Components**: `Button`, `ButtonGroup`, `FAB`, `IconButton`, `SpeedDial`, `ToggleButton`, `ToggleButtonGroup` (7 components)
**Changes per component**:
- `types.ts`: add `size?`, `color?`, `sx?`; `ButtonGroup` + `ToggleButtonGroup` also add a size/color context
- `<Name>.tsx`: call `useComponentDefaults('Button', props)` at top; call `useSx(sx, theme)`; call `useColorRole(color)`; pass context for group components

---

## Phase 4: Component Batch 2 — Inputs (Part A)

**Components**: `Checkbox`, `RadioButton`, `RadioGroup`, `Switch`, `Slider`, `OTPInput` (6 components)

---

## Phase 5: Component Batch 3 — Inputs (Part B)

**Components**: `TextField`, `Select`, `Autocomplete`, `NumberField`, `SearchBar` (5 components + `slots`/`slotProps` on TextField, Select, Autocomplete)

---

## Phase 6: Component Batch 4 — Inputs (Part C) + Date/Time

**Components**: `DatePicker`, `TimePicker`, `DateTimePicker`, `TransferList`, `Rating` (5 components)

---

## Phase 7: Component Batch 5 — Feedback + Overlays

**Components**: `Alert`, `Backdrop`, `Badge`, `CircularProgress`, `Dialog`, `LinearProgress`, `Modal`, `Popover`, `Skeleton`, `Snackbar`, `Tooltip` (11 components + `slots`/`slotProps` on Alert, Snackbar, Dialog)

---

## Phase 8: Component Batch 6 — Navigation + Layout

**Components**: `AppBar`, `BottomNavigation`, `Breadcrumbs`, `Drawer`, `NavigationBar`, `NavigationDrawer`, `NavigationRail`, `Pagination`, `Stepper`, `Tabs` (10 components + `slots`/`slotProps` on AppBar, Breadcrumbs, NavigationBar, Stepper, Tabs)

---

## Phase 9: Component Batch 7 — Display + Data

**Components**: `Accordion`, `Avatar`, `AvatarGroup`, `Card`, `Chip`, `Collapse`, `DataGrid`, `DataTable`, `Divider`, `Fade`, `Grow`, `ImageList`, `ImageListItem`, `ImageListItemBar`, `Link`, `List`, `Paper`, `Portal`, `Slide`, `Stack`, `SvgIcon`, `Table`, `Timeline`, `Typography`, `Zoom`, `Box`, `Container`, `Grid`, `ActivityIndicator` (29 components + `slots`/`slotProps` on Card, Chip, List, Timeline)

---

## Phase 10: Display + Utility (remaining)

**Components**: Any remaining components from the 78-component directory not covered in phases 3-9. Reconcile against `ls src/components/` at implementation time.

---

## Phase 11: Tests

**Goal**: All new hooks and token changes covered; integration test for `theme.components` flow end-to-end.

**Files to create**:
- `tests/unit/hooks/useComponentDefaults.test.ts` — merge priority tests; undefined passthrough; no allocations when no config
- `tests/unit/hooks/useSx.test.ts` — spacing shorthands; color aliases; array notation; responsive; undefined input
- `tests/unit/hooks/useColorRole.test.ts` — all 7 ColorProp values; undefined defaults to primary
- `tests/unit/tokens/sizeTokens.test.ts` — SIZE_SCALE values match spec
- `tests/integration/theme-components-config.test.tsx` — full render test: `createTheme({ components: {...} })` → component renders with merged defaults

**Gate**: `npm test` passes with no regressions; coverage on new hooks ≥ 90%.

---

## Phase 12: Showcase Examples Update

**Goal**: Add 3 examples per component for the new props: one showing `size` variation, one showing `color` variation, one showing `sx` composition.

**Gate**: Showcase app builds without TypeScript errors; manual review of all 78 × 3 new examples.

---

## Notes

- Phases 3-10 can be parallelized by the task agent (independent component batches)
- Phases 1-2 are strictly sequential prerequisites for phases 3-12
- Phase 11 (tests) can begin after Phase 2 (new hooks exist to test)
- Phase 12 (showcase) can begin after Phase 3 (at least one component upgraded as reference)

