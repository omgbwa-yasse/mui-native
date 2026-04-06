# Implementation Plan: 3 Usage Examples for All Components

**Branch**: `008-3-examples-all-components` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-3-examples-all-components/spec.md`

## Summary

Author exactly 3 usage examples for the 63 showcase components that currently show a
placeholder, achieving 100% example coverage across all 78 library components. Before
authoring begins, a Phase 0 bug-fix pass resolves all pre-existing runtime errors (circular
imports, invalid `accessibilityRole` values, broken overlay triggers). The technical
approach: extend `ExampleConfig` with a required `code: string` field, update `ExampleGallery`
to render a `CodeBlock` snippet above each preview, migrate all examples to 5 per-category
source files, and fill every `null` registry entry with a 3-item `ExampleTuple`.

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory  
**Primary Dependencies**: `react-native` 0.73, `react-native-reanimated` 3.x, `react-native-gesture-handler` 2.x, `react-native-syntax-highlighter` (showcase only), `react-native-gifted-charts` (Charts examples only)  
**Storage**: N/A — stateless showcase app; no persistence layer  
**Testing**: Jest + `@testing-library/react-native`; T046 (component-registry integrity) is the sole automated gate for example completeness  
**Target Platform**: Android (Pixel_5 emulator, API 35) + iOS (bare workflow) — React Native 0.73 bare
**Project Type**: mobile-app (showcase) + library (src/)  
**Performance Goals**: All 78 component detail pages load without JS-thread jank; animations run via Reanimated worklets at 60 fps  
**Constraints**: No new native dependencies beyond `react-native-gifted-charts`; `react-native-syntax-highlighter` already installed; all examples import from `@mui-native` alias only  
**Scale/Scope**: 63 new `ExampleTuple` entries × 3 examples each = 189 new `ExampleConfig` objects across 5 category files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Component Fidelity** | ✅ PASS | Examples are showcase content only; no library component APIs are changed except adding 4 missing exports to `src/index.ts`; MD3 fidelity is unaffected |
| **II. Design Token Supremacy** | ✅ PASS | Examples import components from `@mui-native`; no hardcoded color/spacing literals in example JSX; CodeBlock syntax-highlight palette is a known documented exception (constitution C2-style — library controlled, not theme-injectable) |
| **III. Theme-First Architecture** | ⚠️ FIXED IN PHASE 0 | `DatePicker` (and possibly others) imports `useTheme` directly from `../../theme/ThemeContext` causing a Metro circular-import failure; fix: import from `../../theme` index or use `useContext(ThemeContext)` per constitution clause C1 |
| **IV. Cross-Platform Parity** | ✅ PASS | Examples are pure JSX using existing RN components; no platform-specific divergence introduced |
| **V. Accessibility by Default** | ⚠️ FIXED IN PHASE 0 | `listitem` and `navigation` are web-only `accessibilityRole` values not supported by React Native 0.76; all occurrences must be replaced with `"none"` before example authoring begins; new examples apply `accessibilityLabel`/`accessibilityRole` on all interactive elements |
| **VI. Performance Contract** | ✅ PASS | No new animations introduced; transition component examples use `react-native-reanimated` via the existing Fade/Grow/Zoom/Slide/Collapse components; stateful wrappers use `useState` only |

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── index.ts                      ← add 4 missing exports (CodeInput, HumanizationScoreBar,
│                                    InvitationStatusBadge, WorkerAgentRow)
└── components/
    ├── DatePicker/
    │   └── DatePicker.tsx        ← fix useTheme circular import (Phase 0)
    └── */                        ← fix accessibilityRole="listitem"|"navigation" (Phase 0)

apps/showcase/src/
├── catalogue/
│   ├── types.ts                  ← add `code: string` to ExampleConfig
│   ├── examples.tsx              ← slim to re-export barrel only
│   ├── examples.inputs.tsx       ← 22 tuples (19 new + 3 migrated priority)
│   ├── examples.dataDisplay.tsx  ← 18 tuples (15 new + 3 migrated priority)
│   ├── examples.feedback.tsx     ← 11 tuples (8 new + 3 migrated priority)
│   ├── examples.navigation.tsx   ← 10 tuples (7 new + 3 migrated priority)
│   └── examples.layout.tsx       ← 17 tuples (14 new + 3 migrated priority)
└── components/
    └── ExampleGallery.tsx        ← insert CodeBlock per example above preview

tests/
└── unit/
    └── catalogue/
        └── registry.test.ts      ← T046 must continue to pass
```

**Structure Decision**: Single mobile-app project (bare RN 0.73). No new directories.
All changes are additive (new files or field additions) except Phase 0 bug fixes in existing files.

## Complexity Tracking

> No constitution violations requiring justification. Principle III violation is resolved by the Phase 0 bug fix (use `useContext(ThemeContext)` / index import — not a new exception).

## Implementation Phases

### Phase 0 — Bug Fixes (Pre-requisite gate SC-002)

**Goal**: 0 runtime errors across all 78 component pages before example authoring begins.

| Task | File(s) | Fix |
|------|---------|-----|
| useTheme circular import | `src/components/DatePicker/DatePicker.tsx` (+ any other direct `../../theme/ThemeContext` importers) | Change to `import { useTheme } from '../../theme'` or use `useContext(ThemeContext)` |
| Invalid accessibilityRole `listitem` | grep `src/` + `apps/showcase/src/` | Replace with `"none"` |
| Invalid accessibilityRole `navigation` | grep `src/` + `apps/showcase/src/` | Replace with `"none"` |
| Accordion expand/collapse broken | `src/components/Accordion/` | Fix expand/collapse state or animation wiring |
| Modal open trigger broken | Modal example file | Fix open state management |
| Menu open trigger broken | Menu example file | Fix anchor element / visibility state |
| Drawer broken | Drawer example file | Fix navigation / Reanimated animation |
| Snackbar broken | Snackbar example file | Fix queue / visibility state |
| SpeedDial children invisible | SpeedDial example file | Fix FAB dial child visibility |
| Stepper broken | Stepper example file | Fix step state management |
| CircularProgress broken | CircularProgress example file | Fix Reanimated animation value |
| TreeView broken | TreeView example file | Fix tree item rendering |
| Link broken | Link example file | Fix invalid prop / href |
| Tabs + illustrations broken | Tabs example file | Fix image rendering |
| DataGrid/DataTable broken | DataGrid + DataTable example files | Fix data rendering / key props |
| Skeleton broken | Skeleton example file | Fix text line props |
| Stack/HumanizationScoreBar colors | Stack + HumanizationScoreBar example files | Fix missing color props |
| Timeline/Tooltip/MaterialIcon alerts | Timeline + Tooltip + MaterialIcon example files | Fix render / layout issues |

**Exit Criteria**: `npx react-native run-android --no-packager` BUILD SUCCESSFUL; all currently broken component pages load without red screen or console errors.

---

### Phase 1 — Infrastructure (ExampleConfig + ExampleGallery)

| Task | File | Change |
|------|------|--------|
| Add `code: string` field | `apps/showcase/src/catalogue/types.ts` | Required `code: string` field added to `ExampleConfig` interface |
| Render CodeBlock per example | `apps/showcase/src/components/ExampleGallery.tsx` | Insert `<CodeBlock code={example.code} language="tsx" />` between description area and preview `View` |
| Stub existing examples | All 15 existing `ExampleConfig` objects across current example files | Add `code: ''` stub to satisfy the new required field; do not break existing entries |

**Exit Criteria**: `tsc --noEmit` → 0 errors; `npm run generate` succeeds; T046 passes.

---

### Phase 2 — Missing Library Exports

| Task | File | Change |
|------|------|--------|
| Export CodeInput | `src/index.ts` | Add `export { CodeInput } from './components/CodeInput'` |
| Export HumanizationScoreBar | `src/index.ts` | Add corresponding export |
| Export InvitationStatusBadge | `src/index.ts` | Add corresponding export |
| Export WorkerAgentRow | `src/index.ts` | Add corresponding export |

**Exit Criteria**: `import { CodeInput, HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow } from '@mui-native'` compiles without error.

---

### Phase 3 — Example Authoring (63 components × 3 examples each)

Author in category-file order. Each file must compile independently before moving to the next.

| File | Tuples | Notes |
|------|--------|-------|
| `apps/showcase/src/catalogue/examples.inputs.tsx` | 22 (19 new + 3 migrated) | Inputs category — priority authoring order |
| `apps/showcase/src/catalogue/examples.dataDisplay.tsx` | 18 (15 new + 3 migrated) | DataDisplay category |
| `apps/showcase/src/catalogue/examples.feedback.tsx` | 11 (8 new + 3 migrated) | Feedback category |
| `apps/showcase/src/catalogue/examples.navigation.tsx` | 10 (7 new + 3 migrated) | Navigation category |
| `apps/showcase/src/catalogue/examples.layout.tsx` | 17 (14 new + 3 migrated) | Layout category |

**Rules for each ExampleTuple**:
- Exactly 3 `ExampleConfig` entries with distinct `label` values
- At least 2 visually or behaviourally distinct outputs
- All interactive elements carry `accessibilityLabel` + a valid RN `accessibilityRole`
- `code` field: simplified/prettified JSX acceptable (may omit state wiring boilerplate)
- Stateful wrappers use local `useState`; no hooks inside plain render functions
- Animation components (Fade/Grow/Zoom/Slide/Collapse): Example 1 = toggle; Examples 2–3 = real-world triggers
- Complex data shapes (DataGrid, DataTable, Charts, TransferList): see `data-model.md` for agreed shape
- Domain-specific mocks (HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow): see `research.md` D6

**Exit Criteria**: All 78 registry entries have non-null `ExampleTuple`; T046 passes; `tsc --noEmit` → 0 errors.

---

### Phase 4 — Validation

| Check | Command / Method |
|-------|-----------------|
| TypeScript clean | `npx tsc --noEmit` → 0 errors |
| T046 registry integrity | `npm test -- --testPathPattern=registry` → all pass |
| Android build | `npx react-native run-android --no-packager` → BUILD SUCCESSFUL |
| Manual walkthrough | Navigate all 78 component pages; verify 3 examples rendered, CodeBlock snippet visible, no red screen or console error |
| Success criteria SC-001 → SC-006 | All pass per `spec.md` |

---

## Risk Log

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Metro circular import affects more components besides DatePicker | Medium | High | Grep all `from.*theme/ThemeContext` direct imports before Phase 0 completes |
| `react-native-gifted-charts` pod install breaks iOS build | Low | Medium | Author Charts examples last; gate on Android first; add pod step only after Android passes |
| TreeView / TransferList have breaking prop changes vs. research | Low | Medium | Read component `src/` before authoring examples; adjust data shape to match actual interface |
| 63-example authoring takes longer than expected → T046 temporarily red | High | Low | T046 tolerates `null` entries mid-development; only gates at feature completion (DoD) |
| `code` field stubs on 15 existing examples break snapshot tests | Low | Low | Run `npm test` after Phase 1 stub step; update snapshots if required |

## Decision Log

| Decision | Chosen | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| Syntax highlighter | `react-native-syntax-highlighter` + `vscodeDark` | Prism.js web, custom Text spans | Already installed; no new native dep; vscodeDark is readable on dark showcase background |
| `code` field format | Simplified/prettified JSX | Byte-for-byte identical, runtime serialized | Prettier output is more readable; byte-identical is fragile across whitespace changes |
| accessibilityRole fallback | `"none"` | Remove attribute, use `"text"` | `"none"` is the correct semantically neutral RN role; keeps prop present for future use |
| Phase 0 organization | Inline in `tasks.md` Phase 0 section | Separate bugfix spec | Avoids spec proliferation; bugs are pre-conditions, not features |
| Per-category file split | 5 files (`inputs`, `dataDisplay`, `feedback`, `navigation`, `layout`) | Single monolithic file, by component name | Matches library's existing category taxonomy; keeps file sizes manageable |

## Definition of Done

- [ ] `tsc --noEmit` → 0 errors
- [ ] T046 passes (`npm test -- --testPathPattern=registry`)
- [ ] `npx react-native run-android --no-packager` → BUILD SUCCESSFUL
- [ ] All 78 component pages load without runtime errors or red screens
- [ ] All 78 component pages show exactly 3 live-rendered examples (0 placeholders)
- [ ] Each example shows a `CodeBlock` snippet above the preview
- [ ] SC-001: 3 examples per component — pass
- [ ] SC-002: Phase 0 gate cleared (all pre-existing bugs resolved) — pass
- [ ] SC-003: T046 registry integrity — pass
- [ ] SC-004: `tsc --noEmit` clean — pass
- [ ] SC-005: `accessibilityLabel` + valid `accessibilityRole` on all interactive elements — pass
- [ ] SC-006: `code` field present and non-empty on every `ExampleConfig` — pass
