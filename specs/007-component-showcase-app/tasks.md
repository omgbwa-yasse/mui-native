# Tasks: MUI-Native Component Showcase Application

**Input**: Design documents from `/specs/007-component-showcase-app/`
**Prerequisites**: plan.md ✅ spec.md ✅ data-model.md ✅ contracts/ ✅ research.md ✅ quickstart.md ✅

**Organization**: Tasks grouped by user story (US1–US4, P1–P4). Each phase is independently
implementable and testable. Test tasks are in Phase 9 (T042–T046), corresponding to plan.md Phase 8.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: User story label — present on Phase 3+ tasks only
- Paths are relative to `apps/showcase/`

---

## Phase 1: Setup — App Scaffold

**Purpose**: Initialize the React Native CLI application and configure the monorepo integration.
All subsequent phases depend on this being complete.

- [X] T001 Initialize `apps/showcase/` with `npx react-native init showcase --template react-native-template-typescript`
- [X] T002 Install navigation deps in `apps/showcase/package.json`: `@react-navigation/native@^7`, `@react-navigation/native-stack@^7`, `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`
- [X] T003 Install showcase-specific deps: `react-native-syntax-highlighter@^2.1` in `apps/showcase/package.json`
- [X] T004 Configure Metro to resolve `mui-native` from local workspace `../../src` using `watchFolders` + `extraNodeModules` in `apps/showcase/metro.config.js`
- [X] T005 Configure TypeScript — create `apps/showcase/tsconfig.json` extending root config; add `@mui-native` path alias pointing to `../../src`
- [X] T006 Add `"generate"` script (runs `ts-node scripts/generate-registry.ts`) and update `"start"` to call `generate` first in `apps/showcase/package.json`

**Checkpoint**: `npx react-native start` launches Metro; TypeScript compiles without errors

---

## Phase 2: Foundational — Registry Infrastructure

**Purpose**: Build-time generator + catalogue types are the data backbone all user stories depend on.
No story implementation can start until registry and types exist.

- [X] T007 Write `apps/showcase/scripts/generate-registry.ts` — scans `../../src/components/*/index.tsx`, extracts raw source text, writes a typed `SourceCodeMap` to `apps/showcase/src/catalogue/registry.generated.ts`
- [X] T008 Write `apps/showcase/src/catalogue/types.ts` — export `CategoryId`, `Category`, `ComponentEntry`, `ExampleConfig`, `LayoutDirection`, `LayoutPreferenceContextValue`, `RootStackParamList`, `CatalogueRegistry` from `contracts/catalogue.contract.ts`
- [X] T009 Write `apps/showcase/src/catalogue/registry.ts` skeletion — all 77 components across 5 categories (`INPUTS` 21, `DATA_DISPLAY` 19, `FEEDBACK` 11, `NAVIGATION` 10, `LAYOUT` 16); 62 entries with `examples: null, hasFullExamples: false`; 15 priority entries with `examples` stub (3 placeholder `ExampleConfig` items, `hasFullExamples: false`) to be filled in Phase 7
- [X] T010 Run `npm run generate` in `apps/showcase/`; verify `registry.generated.ts` is created with all 77 keys populated

**Checkpoint**: `import { registry } from './catalogue/registry'` compiles and returns 77 entries across 5 categories

---

## Phase 3: User Story 1 — Browse Components by Category (Priority: P1) 🎯 MVP

**Goal**: A full navigable app — HomeScreen → CategoryListScreen → ComponentDetailScreen — with all 77 components listed (no examples yet; that is US3).

**Independent Test**: Launch the app → verify 5 category cards → tap any category → verify its components are listed → tap any component → verify a detail screen opens with the component name in the header. Back navigation restores the previous screen.

- [X] T011 [US1] Implement `apps/showcase/src/context/LayoutPreferenceContext.tsx` — `useState<LayoutDirection>('vertical')`; expose `direction` and `toggle()` via `LayoutPreferenceContextValue`
- [X] T012 [US1] Implement `apps/showcase/src/App.tsx` — `ThemeProvider` (from `mui-native`) wrapping `LayoutPreferenceProvider` wrapping `NavigationContainer` wrapping `RootStack` (`createNativeStackNavigator` with screens: `Home`, `CategoryList`, `ComponentDetail`)
- [X] T013 [US1] Implement `apps/showcase/src/screens/HomeScreen.tsx` — `FlatList` of `Category` objects from registry; each card shows `[icon] label (n components)` with `accessibilityLabel` and `accessibilityRole="button"`; `onPress` navigates to `CategoryList` passing `categoryId`
- [X] T014 [US1] Implement `apps/showcase/src/screens/CategoryListScreen.tsx` — receives `{ categoryId: CategoryId }` route param; looks up category from registry; `FlatList` of `ComponentEntry` rows showing `name` + `description`; `onPress` navigates to `ComponentDetail` passing `componentKey`
- [X] T015 [US1] Implement `apps/showcase/src/screens/ComponentDetailScreen.tsx` (navigation shell only) — receives `{ componentKey: string }` route param; looks up `ComponentEntry`; renders screen title with component name; placeholders for code block and examples (filled in US2 and US3)

**Checkpoint**: US1 fully functional — browse all 5 categories and 77 components via 3-tap navigation; back gesture restores previous screen

---

## Phase 4: User Story 2 — View Component Source Code (Priority: P2)

**Goal**: Every component detail page shows its syntax-highlighted, scrollable source code block above the examples area.

**Independent Test**: Open any component detail page → verify a formatted dark-background code block appears at the top; scroll within it without disrupting the outer page scroll.

- [X] T016 [US2] Implement `apps/showcase/src/components/CodeBlock.tsx` — wraps `SyntaxHighlighter` from `react-native-syntax-highlighter` with `atomOneDark` style; `ScrollView` with `horizontal={false}`; `React.memo` applied; accepts `code: string` prop
- [X] T017 [US2] Wire `CodeBlock` into `ComponentDetailScreen.tsx` — pass `entry.sourceCode` to `CodeBlock`; display at top of screen above examples section; handle empty string case (no code block rendered if `sourceCode === ''`)

**Checkpoint**: US2 functional — every component with injected source code shows a scrollable, syntax-highlighted block; the component detail page layout is complete top-to-bottom layout

---

## Phase 5: User Story 3 — View Live Usage Examples (Priority: P3)

**Goal**: Component detail pages with full examples show exactly 3 distinctly rendered live previews below the code block.

**Independent Test**: Open a P1-tier component detail page (e.g., Button) → verify 3 rendered previews matching distinct labels (e.g., "Contained", "Outlined", "Disabled") are visible below the code block; each preview renders the actual library component without errors.

- [X] T018 [US3] Implement `apps/showcase/src/components/ExamplesPlaceholder.tsx` — shown when `entry.hasFullExamples === false`; displays `"Examples coming soon"` with descriptive `accessibilityLabel`
- [X] T019 [US3] Implement `apps/showcase/src/components/ExampleGallery.tsx` — consumes `LayoutPreferenceContext`; accepts `examples: [ExampleConfig, ExampleConfig, ExampleConfig]`; renders 3 items as a vertical `ScrollView` stack (`direction === 'vertical'`) or horizontal `ScrollView` row (`direction === 'horizontal'`); each item shows `label`, optional `description`, and calls `render()`
- [X] T020 [US3] Wire `ExampleGallery` and `ExamplesPlaceholder` into `ComponentDetailScreen.tsx` — render `ExampleGallery` when `hasFullExamples === true`, otherwise `ExamplesPlaceholder`

**Checkpoint**: US3 functional — all 15 priority components show 3 live rendered examples; all 62 placeholder components show the "coming soon" state; no render errors

---

## Phase 6: User Story 4 — Toggle Example Layout Direction (Priority: P4)

**Goal**: A toggle control on the component detail page lets the user switch between vertical and horizontal example arrangement; preference persists for the session.

**Independent Test**: Open any fully-authored component detail page → examples stack vertically by default → tap the layout toggle → examples switch to a horizontal row → navigate to another component → confirm same horizontal layout is preserved.

- [X] T021 [US4] Implement `apps/showcase/src/components/LayoutToggle.tsx` — `IconButton` (from `mui-native`) that calls `context.toggle()` on press; shows `view-agenda` icon when vertical, `view-week` icon when horizontal; `accessibilityLabel` reflects current state (e.g., `"Switch to horizontal layout"`)
- [X] T022 [US4] Mount `LayoutToggle` in `ComponentDetailScreen.tsx` header right area via `navigation.setOptions({ headerRight })` — visible on every component detail page

**Checkpoint**: US4 functional — toggling layout direction rearranges examples within < 300 ms; navigating between components preserves the chosen direction for the session

---

## Phase 7: Priority Examples — 15 Components, 3 per Category

**Goal**: Author concrete `ExampleConfig` triples for the 15 priority components and activate `hasFullExamples: true` in the registry. Each entry gets 3 visually distinct rendered variants.

**Independent Test**: For each of the 15 components below, open its detail page and verify exactly 3 labelled rendered examples appear with no runtime errors.

### Inputs (P1)

- [X] T023 [P] [US3] Author Button examples in `apps/showcase/src/catalogue/registry.ts` — `{ label: 'Contained', render: () => <Button variant="contained">…> }`, `{ label: 'Outlined', … variant="outlined" }`, `{ label: 'Disabled', … disabled }`; set `hasFullExamples: true`
- [X] T024 [P] [US3] Author TextField examples in `apps/showcase/src/catalogue/registry.ts` — Filled / Outlined / Error states; `hasFullExamples: true`
- [X] T025 [P] [US3] Author Select examples in `apps/showcase/src/catalogue/registry.ts` — Single / Multiple / Disabled; `hasFullExamples: true`

### Data Display (P1)

- [X] T026 [P] [US3] Author Text examples in `apps/showcase/src/catalogue/registry.ts` — variant `h4` / `body1` / `caption`; `hasFullExamples: true`
- [X] T027 [P] [US3] Author Avatar examples in `apps/showcase/src/catalogue/registry.ts` — Image source / Initials string / Icon child; `hasFullExamples: true`
- [X] T028 [P] [US3] Author Chip examples in `apps/showcase/src/catalogue/registry.ts` — Filled / Outlined / Deletable (with `onDelete`); `hasFullExamples: true`

### Feedback (P1)

- [X] T029 [P] [US3] Author Alert examples in `apps/showcase/src/catalogue/registry.ts` — severity `success` / `warning` / `error`; `hasFullExamples: true`
- [X] T030 [P] [US3] Author CircularProgress examples in `apps/showcase/src/catalogue/registry.ts` — indeterminate / determinate 60% / custom colour; `hasFullExamples: true`
- [X] T031 [P] [US3] Author Snackbar examples in `apps/showcase/src/catalogue/registry.ts` — info message / with action button / long message wrap; `hasFullExamples: true`

### Navigation (P1)

- [X] T032 [P] [US3] Author AppBar examples in `apps/showcase/src/catalogue/registry.ts` — default / with action icons / elevated; `hasFullExamples: true`
- [X] T033 [P] [US3] Author Tabs examples in `apps/showcase/src/catalogue/registry.ts` — basic 3-tab / scrollable tabs / icon+label tabs; `hasFullExamples: true`
- [X] T034 [P] [US3] Author Drawer examples in `apps/showcase/src/catalogue/registry.ts` — modal / permanent / with header section; `hasFullExamples: true`

### Layout (P1)

- [X] T035 [P] [US3] Author Card examples in `apps/showcase/src/catalogue/registry.ts` — basic / outlined / with `CardActions`; `hasFullExamples: true`
- [X] T036 [P] [US3] Author Stack examples in `apps/showcase/src/catalogue/registry.ts` — vertical / horizontal / spacing gap; `hasFullExamples: true`
- [X] T037 [P] [US3] Author Divider examples in `apps/showcase/src/catalogue/registry.ts` — horizontal / vertical (inside Row) / with `children` label; `hasFullExamples: true`

**Checkpoint**: 15 priority components show 3 live examples each; registry `hasFullExamples` count === 15; remaining 62 show `ExamplesPlaceholder`

---

## Phase 8: Polish & Accessibility

**Purpose**: Cross-cutting concerns — accessibility audit, touch targets, category icons, and final smoke test.

- [X] T038 [P] Audit all tappable elements in `HomeScreen.tsx`, `CategoryListScreen.tsx`, `ComponentDetailScreen.tsx` — ensure every interactive element has `accessibilityLabel` + `accessibilityRole`; minimum 48 dp touch targets via `minHeight`/`minWidth` style; also verify no hardcoded color or spacing literals appear in any screen file (constitution principle II)
- [X] T039 [P] Add `MaterialIcon` from `mui-native` to each `Category` card in `HomeScreen.tsx` using the `icon` field from `Category` data (e.g., `"tune"` for Inputs, `"dashboard"` for Data Display)
- [X] T040 Smoke test on iOS simulator — verify home screen loads in < 3 s; navigation completes in ≤ 3 taps; layout toggle responds in < 300 ms; no console errors; verify no network requests are made during the run (confirm in Metro dev console — FR-009)
- [X] T041 Smoke test on Android emulator — repeat SC-001–SC-005 verification on Android

---

## Phase 9: Tests — Unit & Integration

**Purpose**: Validate implementation correctness. Mirrors plan.md Phase 8 test deliverables. Can be executed in parallel with Phase 8 polish tasks once Phase 7 is complete.

- [X] T042 [P] Write `apps/showcase/tests/unit/CodeBlock.test.tsx` — renders syntax-highlighted content; handles empty string (no block rendered)
- [X] T043 [P] Write `apps/showcase/tests/unit/ExampleGallery.test.tsx` — renders 3 items vertically by default; switches to horizontal on direction toggle
- [X] T044 [P] Write `apps/showcase/tests/unit/LayoutToggle.test.tsx` — calls `context.toggle()` on press; shows correct icon per direction state
- [X] T045 Write `apps/showcase/tests/integration/navigation.test.tsx` — full navigation flow: HomeScreen → CategoryListScreen → ComponentDetailScreen → back
- [X] T046 Write `apps/showcase/tests/integration/registry-completeness.test.ts` — all 77 `componentKey` values present; `examples` is `null` or exactly `length === 3`

**Checkpoint**: `npm test` (in `apps/showcase/`) passes all 5 new test files; registry-completeness test confirms 77 entries and exactly 15 with `hasFullExamples === true`

---

## Dependency Graph

```
Phase 1 (T001–T006) — App scaffold
    └──► Phase 2 (T007–T010) — Registry infrastructure
              └──► Phase 3 (T011–T015) — US1: Navigation shell [MVP]
                        └──► Phase 4 (T016–T017) — US2: Code blocks
                        └──► Phase 5 (T018–T020) — US3: Gallery + placeholder
                                  └──► Phase 6 (T021–T022) — US4: Layout toggle
                                  └──► Phase 7 (T023–T037) — Priority examples [parallel]
                                            └──► Phase 9 (T042–T046) — Tests [T042–T044 parallel]
                        └──► Phase 8 (T038–T041) — Polish [parallel within phase]
```

**Story independence notes**:
- US2 and US3 can start once US1 detail screen shell (T015) is done — they fill the same screen in different areas
- US4 can start once ExampleGallery (T019) exists — it targets the same component
- Phase 7 tasks T023–T037 are all parallel (different registry entries, no shared files)

---

## Parallel Execution Examples

### During Phase 7 (maximum parallelism)
```
Agent A: T023 (Button)    + T026 (Text)       + T029 (Alert)    + T032 (AppBar) + T035 (Card)
Agent B: T024 (TextField) + T027 (Avatar)     + T030 (Progress) + T033 (Tabs)   + T036 (Stack)
Agent C: T025 (Select)    + T028 (Chip)       + T031 (Snackbar) + T034 (Drawer) + T037 (Divider)
```

### During Phase 8 (within-phase parallelism)
```
Agent A: T038 (accessibility audit)
Agent B: T039 (category icons)
→ Merge → Agent A: T040 (iOS smoke) → T041 (Android smoke)
```

---

## Implementation Strategy

**MVP scope** (deliver to stakeholders after Phase 3 only):
- 5 categories browsable, 77 components listed, navigation works end-to-end
- No code blocks, no examples — but the core feature (SC-001 navigation) is done

**Increment 2** (add Phase 4 + Phase 5 baseline):
- Code blocks visible for all 77 components (if source was generated)
- Placeholder shown for all 62 non-priority components — FR-010 satisfied

**Increment 3** (add Phase 6 + Phase 7):
- Layout toggle works; 15 fully-authored example sets live
- SC-002, SC-003, SC-004 all satisfied

**Full v1** (add Phase 8):
- Accessibility audit complete; category icons present; iOS + Android smoke passed

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 46 |
| Setup / foundational | 10 (T001–T010) |
| US1 — Browse by category (MVP) | 5 (T011–T015) |
| US2 — Source code viewer | 2 (T016–T017) |
| US3 — Live examples | 3 (T018–T020) |
| US4 — Layout toggle | 2 (T021–T022) |
| Priority examples | 15 (T023–T037) |
| Polish / a11y | 4 (T038–T041) |
| Unit + integration tests | 5 (T042–T046) |
| Parallelizable tasks | 24 |
| Independent test checkpoints | 4 (one per user story) |
| Suggested MVP | Phase 1 + 2 + 3 (T001–T015) |
