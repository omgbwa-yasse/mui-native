# Implementation Plan: Add Missing UI Components

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-add-missing-components/spec.md`

## Summary

Extend the **RN-Material** component library — which currently ships 9 components
(AppBar, BottomSheet, Button, Card, Chip, Dialog, FAB, NavigationBar, TextField) —
with the 47 additional components required to reach parity with Material Design 3, MUI v6,
and React Native Paper.

Implementation is organized into 7 sequenced phases with explicit dependency ordering:
utility primitives (Portal, TouchableRipple, Icon, Text) must land first because most
overlay and interactive components depend on them; P1 Feedback follows; then P1 Forms; then
P2 Navigation and Display; then P3 Layout primitives; and finally specialized utilities.
Every component follows the same three-file convention (`types.ts`, `Component.tsx`,
`index.ts`) plus a Storybook story, and must satisfy all 6 constitution gates before merge.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode — inherited from `001-rn-material-core`)
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all peer deps — pre-installed; not bundled)
**Storage**: N/A — stateless UI library; no persistence layer
**Testing**: Jest + `@testing-library/react-native`; Storybook (visual review, not runtime)
**Target Platform**: iOS 15+ and Android API 26+ via React Native (Expo managed + bare workflow)
**Project Type**: npm library (published package)
**Performance Goals**: All animations at 60 fps via Reanimated worklets; component bundle budget ≤ 10 kB minified per new component
**Constraints**: Zero hardcoded hex/size literals in component files; no JS-thread animations; RTL-compatible logical properties only; `reduceMotion` respected; no new peer deps beyond what `001` already establishes
**Scale/Scope**: 47 new components × ~4 files (types.ts + Component.tsx + index.ts + story) ≈ 189 new files; barrel (`src/index.ts`) receives 47 new export lines

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with the six RN-Material principles from `.specify/memory/constitution.md`:

- [x] **I. Component Fidelity** — MD3 spec URL anchors assigned per component in data-model.md; `// RN-DEVIATION:` convention inherited from `001`; known RN deviations documented in research.md (R-04, R-07)
- [x] **II. Design Token Supremacy** — FR-007 mandates token-only values; existing `src/tokens/` system reused without modification; no new color/spacing literals planned
- [x] **III. Theme-First Architecture** — `useTheme()` hook established and required for all render paths; FR-002 mandates light/dark support; no static palette imports allowed
- [x] **IV. Cross-Platform Parity** — acceptance scenarios in spec cover both iOS and Android for all 5 user stories; Storybook stories required on both platforms
- [x] **V. Accessibility by Default** — FR-001/FR-003 mandate `testID`, `accessibilityRole/Label/State`; FR-008 mandates `reduceMotion` for all animated components; 48dp touch targets enforced per SC-006
- [x] **VI. Performance Contract** — FR-008 mandates Reanimated worklets for animated components (ActivityIndicator, Skeleton, Drawer, Accordion, Snackbar); `React.memo` applied to all pure display components; ≤ 10 kB bundle budget per component

**Gate result**: ✅ ALL PASS — proceeding to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/002-add-missing-components/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output — public API type contracts per component group
│   ├── overlay-api.md
│   ├── form-controls-api.md
│   ├── navigation-api.md
│   ├── display-api.md
│   └── layout-api.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── tokens/                       # ← unchanged; all new components consume existing tokens
├── theme/                        # ← unchanged
├── components/
│   ├── [existing 9 components]   # ← unchanged
│   │
│   ├── Portal/                   # Phase 1 — utility (blocks all overlay components)
│   │   ├── types.ts
│   │   ├── Portal.tsx
│   │   └── index.ts
│   ├── TouchableRipple/          # Phase 1 — press primitive (used by form + list components)
│   │   ├── types.ts
│   │   ├── TouchableRipple.tsx
│   │   └── index.ts
│   ├── Icon/                     # Phase 1 — render-prop icon wrapper
│   │   ├── types.ts
│   │   ├── Icon.tsx
│   │   └── index.ts
│   ├── Text/                     # Phase 1 — MD3 typography wrapper
│   │   ├── types.ts
│   │   ├── Text.tsx
│   │   └── index.ts
│   ├── ActivityIndicator/        # Phase 2 — P1 Feedback
│   ├── Skeleton/
│   ├── Alert/
│   ├── Backdrop/
│   ├── Snackbar/
│   ├── Modal/
│   ├── Menu/                      # Phase 2 — P1 Feedback & Overlay
│   ├── Checkbox/                 # Phase 3 — P1 Form Controls
│   ├── RadioButton/
│   ├── Switch/
│   ├── Slider/
│   ├── Select/
│   ├── Searchbar/
│   ├── SegmentedButtons/
│   ├── ToggleButton/
│   ├── Autocomplete/
│   ├── NumberField/
│   ├── Tabs/                     # Phase 4 — P2 Navigation
│   ├── Drawer/
│   ├── Stepper/
│   ├── Pagination/
│   ├── Breadcrumbs/
│   ├── SpeedDial/
│   ├── Avatar/                   # Phase 5 — P2 Display
│   ├── Badge/
│   ├── List/
│   ├── DataTable/
│   ├── Divider/
│   ├── Tooltip/
│   ├── Rating/
│   ├── Banner/
│   ├── IconButton/
│   ├── Box/                      # Phase 6 — P3 Layout
│   ├── Container/
│   ├── Grid/
│   ├── Stack/
│   ├── Paper/
│   ├── Accordion/
│   ├── ImageList/
│   ├── ButtonGroup/              # Phase 7 — Utilities
│   ├── HelperText/
│   ├── Link/
│   └── TransferList/
│
└── index.ts                      # Public barrel — +47 new export blocks

tests/
└── unit/
    └── components/               # +47 component test files

stories/
└── components/                   # +47 story files (one per component)
```

**Structure Decision**: Extends the single-package structure established in
`001-rn-material-core`. Each new component folder holds `types.ts`, `Component.tsx`,
and `index.ts`. Stories go in `stories/components/ComponentName.stories.tsx`.
No new monorepo projects or sub-packages.

## Complexity Tracking

No constitution violations requiring justification. All six principles satisfied by
inheriting the design system and conventions of `001-rn-material-core`.

## Implementation Phases

### Phase 1 — Core Utilities (dependency baseline)

**Components**: Portal, TouchableRipple, Icon, Text/Typography  
**Why first**: These 4 are consumed by almost every subsequent component.
- `Portal`: required by Modal, Backdrop, Snackbar, Tooltip, Menu (FR-009)
- `TouchableRipple`: required by Checkbox, RadioButton, List items, IconButton
- `Icon`: required by IconButton, HelperText, Alert, Banner, Rating, Searchbar
- `Text`: required by Link, HelperText, Breadcrumbs, Badge, Tooltip

**Dependency order within phase**: Portal → Icon → Text → TouchableRipple

---

### Phase 2 — P1 Feedback & Overlay

**Components**: ActivityIndicator, Skeleton, Alert, Backdrop, Snackbar, Modal, Menu  
**Why P1**: Required on virtually every screen that performs network calls or user actions.  
**Prerequisite**: Phase 1 complete (Portal required by Backdrop/Snackbar/Modal)  
**Key decisions**: See R-01 (Portal host), R-02 (Snackbar queue), R-05 (Skeleton shimmer)

---

### Phase 3 — P1 Form Controls

**Components**: Checkbox, RadioButton, Switch, Slider, Select, Searchbar, SegmentedButtons, ToggleButton, Autocomplete, NumberField  
**Why P1**: Forms are the second most-used component category after navigation.  
**Prerequisite**: Phase 1 complete (TouchableRipple required by Checkbox/RadioButton)  
**Key decisions**: See R-03 (controlled/uncontrolled pattern), R-06 (Select dropdown implementation)

---

### Phase 4 — P2 Navigation & Structure

**Components**: Tabs, Drawer, Stepper, Pagination, Breadcrumbs, SpeedDial  
**Why P2**: Used on complex screens; individually less blocking than P1.  
**Prerequisite**: Phase 2 + 3 complete; Icon needed by Tabs (icons in tab labels) and SpeedDial  
**Key decisions**: See R-07 (Drawer slide animation), R-08 (Tabs scrollable indicator)

---

### Phase 5 — P2 Display & Content

**Components**: Avatar, Badge, List, DataTable, Divider, Tooltip, Rating, Banner, IconButton  
**Why P2**: Pervasive display components that can be temporarily substituted.  
**Prerequisite**: Phase 1 complete (Icon, TouchableRipple needed by IconButton/List)  
**Key decisions**: See R-04 (DataTable virtualization), R-09 (Tooltip popup positioning)

---

### Phase 6 — P3 Layout Primitives

**Components**: Box, Container, Grid, Stack, Paper/Surface, Accordion, ImageList  
**Why P3**: Improve DX significantly but do not block feature delivery.  
**Prerequisite**: Phases 1–5 complete; Paper/Surface used by potential inner components  
**Key decisions**: See R-10 (Grid implementation), R-11 (Accordion animation)

---

### Phase 7 — Specialized Utilities

**Components**: ButtonGroup, HelperText, Link, TransferList  
**Why last**: These compose existing components with specialized behaviour.  
**Prerequisite**: All prior phases (ButtonGroup composes Button; HelperText uses Text/Icon; Link extends Text; TransferList composes List + Button)

---

### Phase 8 — Final Gate

**Tasks**:
1. Update `src/index.ts` barrel with all 47 new exports
2. Run `tsc --noEmit` → exit 0
3. Run `npm run lint` → exit 0 (zero errors)
4. Run `jest --coverage` → all tests pass
5. Verify `SC-001` (all 47 present in `src/components/` and exported)
6. Verify `SC-007` (all 47 stories load without console errors)
