# Implementation Plan: Full MUI-Native ↔ Material UI Alignment

**Branch**: `010-full-mui-alignment` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-full-mui-alignment/spec.md`

## Summary

Feature 010 aligns mui-native with MUI v7.3.9 by adding additive prop aliases on 7 components (`open`, `checked`, `helperText`, `badgeContent`, etc.), completing `CircularProgress` (3 missing props: `thickness`, `disableShrink`, `enableTrackSlot`) and verifying `LinearProgress`, adding `AvatarGroup` (new), 18 new sub-components (Card ×5, Dialog ×4, Table ×9 incl. `TablePagination`), extending `TextField` with `standard` variant + 5 new props, exporting all 5 transitions (already done — verification only), and adding MD2 typography aliases via a `typographyVariantMap` token. No breaking changes; Feature 009 is a hard prerequisite.

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory across all source and test files
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x, `react-native-svg` ≥ 15.0.0 — all already declared peer deps; no new peer deps required
**Storage**: N/A — stateless UI library
**Testing**: Jest + `@testing-library/react-native`; Storybook for visual regression
**Target Platform**: iOS + Android (React Native ≥ 0.73)
**Project Type**: UI component library (React Native)
**Performance Goals**: Reanimated worklets for all animations; `React.memo` applied to all new components; ≤ 10 kB per component in production build
**Constraints**: No breaking changes; no hardcoded color/spacing literals (all values trace to `src/tokens/`); TS strict with no `any` in public-facing types; Feature 009 merged first (hard gate)
**Scale/Scope**: 78 → ≥ 93 exported symbols; 39 FRs; 6 existing components modified (prop additions only); 1 new base component (AvatarGroup); 18 new sub-components; 9 new Table components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Component Fidelity** — Each new/modified component maps to a named MUI v7.3.9 API page; all intentional deviations tagged `// RN-DEVIATION:` (reasons documented at FR-027, FR-030, FR-036)
- [x] **II. Design Token Supremacy** — CircularProgress/LinearProgress `color` prop defaults to `theme.colors.primary`; the `string` pass-through is documented as consumer responsibility; no hardcoded hex values in render path
- [x] **III. Theme-First Architecture** — All components consume `useTheme()`; `typographyVariantMap` resolves at render time from `theme.typography`; no static palette imports in component files
- [x] **IV. Cross-Platform Parity** — Acceptance tests planned for both iOS and Android; `AvatarGroup` negative-margin overlap uses `marginLeft` (predictable RTL behavior)
- [x] **V. Accessibility by Default** — `TableCell` gets `accessibilityRole="columnheader"/"cell"`; `CircularProgress` gets `accessibilityRole="progressbar"` + `accessibilityValue`; `Dialog` sub-components propagate `accessibilityViewIsModal`; 48dp touch targets on `CardActionArea`, `CardActions`, `TableSortLabel`
- [x] **VI. Performance Contract** — CircularProgress indeterminate: Reanimated rotation worklet; LinearProgress indeterminate/query: Reanimated translation worklet; AvatarGroup: `React.memo`; all 5 transition components already use Reanimated worklets

**Complexity note (C2 exception)**: `color: string` on `CircularProgress` and `LinearProgress` allows arbitrary strings alongside the enumerated color roles — this matches MUI Web's exact API. Consumer is responsible for valid color values when bypassing the enum; theme tokens are used and recommended by default.

**Post-design Constitution Check (Phase 1)**: All 6 gates still pass. No new violations introduced by the design artifacts. Widening `Dialog.title` from `string` to `ReactNode` is backward-compatible and does not violate any principle.

## Project Structure

### Documentation (this feature)

```text
specs/010-full-mui-alignment/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── prop-aliases.ts
│   ├── circular-progress.ts
│   ├── avatar-group.ts
│   ├── card-sub-components.ts
│   ├── dialog-sub-components.ts
│   ├── table-family.ts
│   ├── text-field-extended.ts
│   └── typography-map.ts
└── tasks.md             # Phase 2 output (/speckit.tasks command — NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Badge/                    # add badgeContent alias, invisible prop (FR-006)
│   ├── BottomSheet/              # add open alias (FR-001)
│   ├── CircularProgress/         # add thickness, disableShrink, enableTrackSlot (FR-008)
│   ├── AvatarGroup/              # NEW — full component (FR-014/015)
│   │   ├── AvatarGroup.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── Card/                     # add sub-components (FR-021–024)
│   │   ├── CardHeader.tsx        # NEW
│   │   ├── CardMedia.tsx         # NEW
│   │   ├── CardContent.tsx       # NEW
│   │   ├── CardActions.tsx       # NEW
│   │   └── CardActionArea.tsx    # NEW
│   ├── Dialog/                   # extend props + add sub-components (FR-025–027)
│   │   ├── DialogTitle.tsx       # NEW
│   │   ├── DialogContent.tsx     # NEW
│   │   ├── DialogContentText.tsx # NEW
│   │   └── DialogActions.tsx     # NEW
│   ├── LinearProgress/           # verify and finalize implementation (FR-011/012)
│   ├── Menu/                     # add open, onClose aliases (FR-001/002)
│   ├── Modal/                    # add open, onClose aliases (FR-001/002)
│   ├── Rating/                   # add value/onChange aliases (FR-003)
│   ├── Slider/                   # add onChange MUI signature (FR-004)
│   ├── Snackbar/                 # add open alias (FR-001)
│   ├── Switch/                   # add checked/onChange aliases (FR-003)
│   ├── Table/                    # NEW composable family (FR-028–030)
│   │   ├── index.ts
│   │   ├── Table.tsx
│   │   ├── TableContainer.tsx
│   │   ├── TableHead.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableFooter.tsx
│   │   ├── TableRow.tsx
│   │   ├── TableCell.tsx
│   │   ├── TableSortLabel.tsx
│   │   └── TablePagination.tsx
│   ├── Text/                     # add MD2 variant aliases (FR-034)
│   └── TextField/                # add standard variant + 5 new props (FR-016–020)
├── tokens/
│   └── typography.ts             # add typographyVariantMap + TypographyMD2Variant (FR-035)
└── index.ts                      # add all new exports (FR-021, FR-025, FR-028, FR-031)

tests/
├── unit/
│   ├── components/
│   │   ├── AvatarGroup.test.tsx
│   │   ├── CircularProgress.test.tsx    # add coverage for thickness, enableTrackSlot
│   │   ├── Dialog.test.tsx              # add sub-component + onClose reason tests
│   │   ├── Table.test.tsx               # all 8 sub-components
│   │   ├── TextField.test.tsx           # standard variant + multiline + fullWidth
│   │   └── Typography.test.tsx          # MD2 alias rendering
│   └── tokens/
│       └── typography.test.ts           # typographyVariantMap coverage
└── integration/
    └── prop-aliases.test.tsx            # SC-001: copy-paste MUI examples compile + render
```

**Structure Decision**: Single-project library. New sub-components are co-located with their parent directory (e.g., `CardHeader.tsx` inside `src/components/Card/`). The new `Table` composable family occupies `src/components/Table/` as a separate layer from the existing opinionated `DataTable` component.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| `color: string` pass-through on CircularProgress/LinearProgress | Exact MUI v7.3.9 API parity required by FR-008/011; developers migrating from MUI Web use custom color strings | Restricting to enum would narrow the type relative to MUI Web and break direct copy-paste (FR-007 forbids narrowing) |
| `Dialog.title: string → ReactNode` widening | MUI Web `DialogTitle` accepts `ReactNode`; composite titles (icon + text) are common in MUI examples | Keeping `string` type blocks direct MUI example paste and violates SC-005 (≤5 prop changes per example) |
