# Implementation Plan: MUI-Native Component Showcase Application

**Branch**: `007-component-showcase-app` | **Date**: 2026-04-04 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-component-showcase-app/spec.md`

---

## Summary

Build a standalone React Native CLI application (`apps/showcase/`) that presents every
MUI-Native library component in a categorised catalogue. Each component detail page shows
its internal library source code (syntax-highlighted) above 3 live rendered usage examples
whose layout (vertical/horizontal) is user-controlled via a session-level toggle.

The app consumes the `mui-native` package from the local workspace. Source code for each
component is injected at build time by a Node.js generator script that reads
`src/components/*/index.tsx` and writes a typed `registry.generated.ts` map. V1 delivers
full examples for 15 priority components (3 per category); all 78 components appear in the
catalogue with at minimum a placeholder.

---

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` is mandatory; same constraint as library  
**Primary Dependencies**:
- `react-native` ≥ 0.73 (peer dep of the library — showcase app installs it directly)
- `@react-navigation/native` v7 + `@react-navigation/native-stack` — 3-level stack navigation
- `react-native-syntax-highlighter` v2 — syntax-highlighted code blocks (highlight.js, pure JS)
- `react-native-screens` + `react-native-safe-area-context` — navigation prerequisites
- `react-native-gesture-handler` ≥ 2.x — swipe-back gesture for navigation
- `mui-native` (local workspace resolution) — the component library itself

**Storage**: N/A — stateless display app; no AsyncStorage, no database  
**Testing**: Jest + `@testing-library/react-native`; same testing stack as monorepo root  
**Target Platform**: iOS ≥ 15 and Android ≥ API 26 (same as library peer dep targets)  
**Project Type**: Mobile application (React Native CLI) — companion demo app, not a library  
**Performance Goals**: Home screen loads in < 3 s; layout toggle animates in < 300 ms; code block renders in < 100 ms  
**Constraints**: No network calls; no native modules beyond autolinking; no Expo toolchain; TypeScript strict mode  
**Scale/Scope**: 78 components, 5 categories, 15 fully-authored example sets, 1 app entry point, ~25 source files

---

## Constitution Check

*GATE: Must pass before proceeding to phases. The constitution governs the library (src/);
the showcase app is a consumer, not a library component. Principles are assessed for
applicability to app-level code.*

- [x] **I. Component Fidelity** — Not directly applicable (showcase is an app consumer, not
  a new library component). The showcase MUST use library components as-is without overriding
  their MD3 specs. No `// RN-DEVIATION:` needed at app level.
- [x] **II. Design Token Supremacy** — Showcase app screens MUST NOT hardcode color or
  spacing literals. All styling uses the library's `ThemeProvider` + `useTheme()` hook.
  App-level UI (category cards, navigation header) derives colors from theme tokens only.
- [x] **III. Theme-First Architecture** — `ThemeProvider` from `mui-native` wraps the
  navigation container at app root. All screens consume theme via `useTheme()`.
- [x] **IV. Cross-Platform Parity** — Acceptance tests planned for both iOS and Android;
  `@react-navigation/native-stack` uses system-native transitions on both platforms.
- [x] **V. Accessibility by Default** — All navigable cards and buttons in HomeScreen,
  CategoryListScreen, and ComponentDetailScreen MUST carry `accessibilityLabel`,
  `accessibilityRole`, and minimum 48 dp touch targets. `CodeBlock` text is non-interactive
  (no accessibility action required).
- [x] **VI. Performance Contract** — Layout direction toggle uses React `setState` (no
  animation); no Reanimated needed. FlatList used for category and component lists (not
  ScrollView) to ensure viewport-based virtualisation.

**Constitution verdict: PASS — no violations, no justified deviations required.**

---

## Design Rationale

### Why a build-time source code generator instead of bundled assets?

React Native has no `fs.readFile` in the JS runtime on device. Three options were evaluated:

| Option | Verdict |
|--------|---------|
| Manual string copy-paste | Rejected — stale on every library change, error-prone |
| `require('./file.tsx')` as Metro asset | Rejected — Metro bundles TS as JS; source formatting lost |
| **Build-time Node.js generator** | **Chosen** — reads source before compilation; output is a typed TS map; auto-updated |

### Why React Navigation native-stack?

`@react-navigation/stack` uses JS-animated transitions (60fps target but JS thread).
`@react-navigation/native-stack` uses UINavigationController (iOS) and Fragment (Android) —
system-native, hardware-accelerated, ~0ms perceived latency. The extra setup cost is
one `pod install` step.

### Why React Context for layout preference, not Zustand?

The layout preference is a single boolean toggled by one screen. A full store (Zustand,
Redux) is unnecessary for 1 value with no derived state, no middleware, and no persistence.
React Context + `useState` is idiomatic and has zero additional dependencies.

---

## Project Structure

### Documentation (this feature)

```text
specs/007-component-showcase-app/
├── plan.md              ✅ This file
├── research.md          ✅ /specs/007-component-showcase-app/research.md
├── data-model.md        ✅ /specs/007-component-showcase-app/data-model.md
├── quickstart.md        ✅ /specs/007-component-showcase-app/quickstart.md
├── contracts/
│   └── catalogue.contract.ts  ✅ TypeScript type contracts
├── checklists/
│   └── requirements.md  ✅ Spec quality checklist
└── tasks.md             🔜 Generated by /speckit.tasks
```

### Source Code (new application)

```text
apps/
└── showcase/
    ├── android/                         ← RN CLI Android project (generated by CLI)
    ├── ios/                             ← RN CLI iOS project (generated by CLI)
    ├── scripts/
    │   └── generate-registry.ts         ← Build-time source extractor
    ├── src/
    │   ├── App.tsx                      ← Root: NavigationContainer + ThemeProvider
    │   ├── catalogue/
    │   │   ├── types.ts                 ← Category, ComponentEntry, ExampleConfig types
    │   │   ├── registry.generated.ts    ← AUTO-GENERATED (do not edit)
    │   │   └── registry.ts              ← Hand-authored catalogue data + examples
    │   ├── components/
    │   │   ├── CodeBlock.tsx            ← Syntax-highlighted source viewer
    │   │   ├── ExampleGallery.tsx       ← 3-example renderer (vertical/horizontal)
    │   │   ├── LayoutToggle.tsx         ← Direction toggle UI control
    │   │   └── ExamplesPlaceholder.tsx  ← "Examples coming soon" state
    │   ├── context/
    │   │   └── LayoutPreferenceContext.tsx
    │   └── screens/
    │       ├── HomeScreen.tsx
    │       ├── CategoryListScreen.tsx
    │       └── ComponentDetailScreen.tsx
    ├── tests/
    │   ├── unit/
    │   │   ├── CodeBlock.test.tsx
    │   │   ├── ExampleGallery.test.tsx
    │   │   └── LayoutToggle.test.tsx
    │   └── integration/
    │       ├── navigation.test.tsx
    │       └── registry-completeness.test.ts
    ├── package.json
    └── tsconfig.json
```

---

## Implementation Phases

### Phase 1 — App Scaffold

| Task | Description | Files |
|------|-------------|-------|
| T001 | Init `apps/showcase/` with `npx react-native init` (TypeScript template) | `apps/showcase/` |
| T002 | Install navigation + syntax-highlighter dependencies; configure `package.json` | `apps/showcase/package.json` |
| T003 | Configure Metro to resolve `mui-native` from the local workspace `../../src` | `apps/showcase/metro.config.js` |
| T004 | Configure TypeScript — extend root `tsconfig.json`; add path mappings | `apps/showcase/tsconfig.json` |

### Phase 2 — Build-Time Registry Generator

| Task | Description | Files |
|------|-------------|-------|
| T005 | Write `generate-registry.ts` script; reads all `src/components/*/index.tsx`, writes `registry.generated.ts` | `scripts/generate-registry.ts` |
| T006 | Add `"generate"` and `"start"` npm scripts; `start` calls `generate` before Metro | `apps/showcase/package.json` |

### Phase 3 — Type Definitions & Registry

| Task | Description | Files |
|------|-------------|-------|
| T007 | Write `catalogue/types.ts` from `contracts/catalogue.contract.ts` | `src/catalogue/types.ts` |
| T008 | Write `catalogue/registry.ts` skeleton — all 78 components in 5 categories (`INPUTS` 22, `DATA_DISPLAY` 18, `FEEDBACK` 11, `NAVIGATION` 10, `LAYOUT` 17); 63 with `examples: null`; 15 priority with stub `examples` array | `src/catalogue/registry.ts` |

### Phase 4 — Navigation & App Root

| Task | Description | Files |
|------|-------------|-------|
| T009 | Implement `App.tsx` — `ThemeProvider` wrapping `NavigationContainer` wrapping `RootStack` | `src/App.tsx` |
| T010 | Implement `HomeScreen` — `FlatList` of `Category` cards; navigates to `CategoryList` on tap | `src/screens/HomeScreen.tsx` |
| T011 | Implement `CategoryListScreen` — receives `categoryId`; `FlatList` of `ComponentEntry` rows | `src/screens/CategoryListScreen.tsx` |
| T012 | Implement `ComponentDetailScreen` — receives `componentKey`; renders `CodeBlock` + `ExampleGallery` | `src/screens/ComponentDetailScreen.tsx` |

### Phase 5 — Layout Context

| Task | Description | Files |
|------|-------------|-------|
| T013 | Implement `LayoutPreferenceContext` — `useState('vertical')`; exposes `direction` + `toggle()`; wrap navigation root in `App.tsx` with `LayoutPreferenceProvider` (completes `App.tsx` from T009) | `src/context/LayoutPreferenceContext.tsx`, `src/App.tsx` |

### Phase 6 — Reusable UI Components

| Task | Description | Files |
|------|-------------|-------|
| T015 | Implement `CodeBlock` — wraps `react-native-syntax-highlighter`; `atomOneDark` theme; scrollable | `src/components/CodeBlock.tsx` |
| T016 | Implement `ExampleGallery` — consumes `LayoutPreferenceContext`; renders 3 examples as `vertical` stack or `horizontal` row | `src/components/ExampleGallery.tsx` |
| T017 | Implement `LayoutToggle` — icon button that calls `context.toggle()`; shows current direction | `src/components/LayoutToggle.tsx` |
| T018 | Implement `ExamplesPlaceholder` — shown when `hasFullExamples === false` | `src/components/ExamplesPlaceholder.tsx` |

### Phase 7 — Priority Examples (15 components, 3 per category)

> **Task ID note**: Task IDs in this table (T019–T033) are plan-internal reference numbers.
> The authoritative execution IDs are **T023–T037** in `tasks.md`. When cross-referencing,
> use the tasks.md IDs: T019 here = T023 in tasks.md, through T033 here = T037 in tasks.md.

| Task (plan) | tasks.md | Category | Components |
|-------------|----------|----------|------------|
| T019 | T023 | Inputs | Button (contained / outlined / disabled) |
| T020 | T024 | Inputs | TextField (filled / outlined / error) |
| T021 | T025 | Inputs | Select (single / multiple / disabled) |
| T022 | T026 | Data Display | Text (h4 / body1 / caption) |
| T023 | T027 | Data Display | Avatar (image / initials / icon) |
| T024 | T028 | Data Display | Chip (filled / outlined / deletable) |
| T025 | T029 | Feedback | Alert (success / warning / error) |
| T026 | T030 | Feedback | CircularProgress (indeterminate / determinate / coloured) |
| T027 | T031 | Feedback | Snackbar (info / action / long-message) |
| T028 | T032 | Navigation | AppBar (default / with actions / elevated) |
| T029 | T033 | Navigation | Tabs (basic / scrollable / icon+label) |
| T030 | T034 | Navigation | Drawer (modal / permanent / with header) |
| T031 | T035 | Layout | Card (basic / outlined / with actions) |
| T032 | T036 | Layout | Stack (vertical / horizontal / with gap) |
| T033 | T037 | Layout | Divider (horizontal / vertical / with label) |

### Phase 8 — Tests

| Task | Description | Files |
|------|-------------|-------|
| T034 | Unit: `CodeBlock` renders syntax-highlighted content; handles empty string | `tests/unit/CodeBlock.test.tsx` |
| T035 | Unit: `ExampleGallery` renders 3 items vertically by default; switches to horizontal on toggle | `tests/unit/ExampleGallery.test.tsx` |
| T036 | Unit: `LayoutToggle` calls `context.toggle()` on press; shows correct icon per direction | `tests/unit/LayoutToggle.test.tsx` |
| T037 | Integration: navigation flow — HomeScreen → CategoryListScreen → ComponentDetailScreen → back | `tests/integration/navigation.test.tsx` |
| T038 | Integration: registry completeness — all 78 `componentKey` values present; `examples` is null or length==3 | `tests/integration/registry-completeness.test.ts` |

### Phase 9 — Polish & Accessibility

| Task | Description |
|------|-------------|
| T039 | Add `accessibilityLabel` + `accessibilityRole` to all tappable elements in all 3 screens |
| T040 | Verify 48 dp minimum touch targets on category cards, component rows, and `LayoutToggle` button |
| T041 | Add category icons via `MaterialIcon` on `HomeScreen` category cards |
| T042 | Final smoke test on iOS simulator and Android emulator |

---

## Dependency Summary

| Package | Version | Reason |
|---------|---------|--------|
| `@react-navigation/native` | ^7.0 | Navigation container |
| `@react-navigation/native-stack` | ^7.0 | Native stack navigator |
| `react-native-screens` | ≥3.x | Native screen optimisation (navigation req) |
| `react-native-safe-area-context` | ≥4.x | Safe area insets (navigation req) |
| `react-native-syntax-highlighter` | ^2.1 | Code block syntax highlighting |
| `react-native-gesture-handler` | ≥2.x | Swipe-back gesture (already library peer dep) |

---

## Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Metro cannot resolve `mui-native` from `../../src` | Medium | Use `watchFolders` + `extraNodeModules` in `metro.config.js` |
| `react-native-syntax-highlighter` renders slowly for large source files | Low | Wrap in `React.memo`; cap display at first 150 lines with expand toggle |
| Component source files include non-TS files (assets, CSS) | Low | Generator only picks `.tsx` / `.ts` files; silently skips others |
| New library components added after registry generation | Low | `npm run generate` documented in quickstart; CI could add as pre-check |
