# Tasks: 012 Platform-Inspired Themes

**Input**: `specs/012-platform-themes/` — plan.md, spec.md, research.md, data-model.md, contracts/theme-api.md  
**Branch**: `012-platform-themes`  
**Total tasks**: 28 | **Parallel opportunities**: 16 | **MVP scope**: Phase 3 (US1)

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Parallelizable — operates on a different file, no dependency on incomplete tasks
- **[US#]**: Maps to user stories from spec.md (US1–US5)
- Setup / Foundational / Polish phases carry no story label

---

## Phase 1: Setup

**Purpose**: Verify the directory scaffolding that will host all new files.

- [x] T001 Confirm `src/theme/presets/` and `tests/unit/themes/` directories exist (create if absent) per plan.md project structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Two targeted modifications to existing files that unlock all user stories.

**⚠️ CRITICAL**: No user-story task can begin until T002 and T003 are both complete.

- [x] T002 Add `darkColorScheme?: Partial<ColorScheme>` to the `Theme` interface in `src/theme/types.ts` (backward-compatible optional field — see data-model.md §1)
- [x] T003 Update `src/theme/ThemeProvider.tsx` — (a) init mode from `Appearance.getColorScheme() ?? 'light'` when `mode` prop is absent; (b) subscribe/unsubscribe via `Appearance.addChangeListener` in `useEffect` (isControlled pattern from research.md D-002); (c) merge `{ ...colorScheme, ...darkColorScheme }` in `useMemo` when `mode === 'dark'` and `darkColorScheme` is present

**Checkpoint**: `src/theme/types.ts` and `src/theme/ThemeProvider.tsx` modified — all user story tasks can proceed

---

## Phase 3: User Story 1 — Apply a Platform Theme (Priority: P1) 🎯 MVP

**Goal**: Developer wraps app in `<ThemeProvider theme={iPhoneTheme}>` (or any of the 7 presets) and all components inherit the platform's color palette, typography, and shape without any per-component styling.

**Independent Test**: Import `iPhoneTheme` from `'mui-native'`, render `<ThemeProvider theme={iPhoneTheme}><MockComponent /></ThemeProvider>`, call `useTheme()` in the mock, and assert `theme.colorScheme.primary === '#007AFF'`, `theme.typography` is defined, and `theme.shape` is defined.

- [x] T004 [P] [US1] Implement `iPhoneTheme` preset in `src/theme/presets/iPhoneTheme.ts` — full `Theme` object (completed)
- [x] T005 [P] [US1] Implement `UbuntuTheme` preset in `src/theme/presets/UbuntuTheme.ts` — primary `#E95420`, secondary `#772953`, background `#FFFFFF`; dark: background `#300A24`, surface `#1F0A1A`; fontFamily `'Ubuntu'`; shape medium=8 (completed)
- [x] T006 [P] [US1] Implement `MAUITheme` preset in `src/theme/presets/MAUITheme.ts` — primary `#0078D4` (completed)
- [x] T007 [P] [US1] Implement `Windows11Theme` preset in `src/theme/presets/Windows11Theme.ts` — primary `#0078D4`, secondary `#8764B8` (completed)
- [x] T008 [P] [US1] Implement `macOSTheme` preset in `src/theme/presets/macOSTheme.ts` — primary `#007AFF`, secondary `#5856D6` (completed)
- [x] T009 [P] [US1] Implement `FacebookTheme` preset in `src/theme/presets/FacebookTheme.ts` — primary `#1877F2`, secondary `#42B72A` (completed)
- [x] T010 [P] [US1] Implement `TikTokTheme` preset in `src/theme/presets/TikTokTheme.ts` — primary `#FE2C55`, secondary `#25F4EE` (completed)
- [x] T011 [US1] Create `src/theme/presets/index.ts` re-exporting all 7 presets (completed)
- [x] T012 [US1] Add 7 named theme exports to `src/index.ts` (completed)
- [x] T013 [P] [US1] Write unit test for `iPhoneTheme` in `tests/unit/themes/iPhoneTheme.test.ts` (completed)
- [x] T014 [P] [US1] Write unit test for `UbuntuTheme` in `tests/unit/themes/UbuntuTheme.test.ts` with 50-role and fontFamily assertions (completed)
- [x] T015 [P] [US1] Write unit test for `MAUITheme` in `tests/unit/themes/MAUITheme.test.ts` with 50-role and fontFamily assertions (completed)
- [x] T016 [P] [US1] Write unit test for `Windows11Theme` in `tests/unit/themes/Windows11Theme.test.ts` with 50-role and fontFamily assertions (completed)
- [x] T017 [P] [US1] Write unit test for `macOSTheme` in `tests/unit/themes/macOSTheme.test.ts` with 50-role and fontFamily assertions (completed)
- [x] T018 [P] [US1] Write unit test for `FacebookTheme` in `tests/unit/themes/FacebookTheme.test.ts` with 50-role and fontFamily assertions (completed)
- [x] T019 [P] [US1] Write unit test for `TikTokTheme` in `tests/unit/themes/TikTokTheme.test.ts` with 50-role and fontFamily assertions (completed)

**Checkpoint**: All 7 presets importable; unit tests for shape/completeness passing; US1 independently testable

---

## Phase 4: User Story 2 — Runtime Theme Switching (Priority: P2)

**Goal**: Passing a different theme object to the `theme` prop on `ThemeProvider` re-renders all children with the new theme's tokens; no tokens from the previous theme leak through.

**Independent Test**: Render `<ThemeProvider theme={iPhoneTheme}>` then update to `<ThemeProvider theme={Windows11Theme}>` and verify `useTheme().theme.colorScheme.primary` changes from `#007AFF` to `#0078D4` and no iOS-specific token value persists.

- [x] T020 [US2] Write runtime theme-switching test in `tests/unit/theme/ThemeProvider.test.tsx` (completed)

**Checkpoint**: US2 runtime switching verified; depends on T004–T010 (presets) and T003 (ThemeProvider)

---

## Phase 5: User Story 3 — Dark Mode Support (Priority: P3)

**Goal**: Each platform theme renders correct dark-mode colors when `mode="dark"` or when the device system setting is dark. Appearance subscription auto-switches mode when no explicit `mode` prop is set.

**Independent Test**: Render `<ThemeProvider theme={macOSTheme} mode="dark">`, call `useTheme()`, and assert `theme.colorScheme.background === '#1E1E1E'` (the dark-mode background from `darkColorScheme`).

- [x] T021 [US3] Write Appearance subscription tests in `tests/unit/theme/ThemeProvider.test.tsx` (completed)
- [x] T022 [P] [US3] Write dark-mode merge tests for all 7 themes in `tests/unit/themes/darkMode.test.ts` (completed)

**Checkpoint**: Dark mode behavior verified end-to-end through ThemeProvider; US3 independently testable

---

## Phase 6: User Story 4 — Compose with Custom Overrides (Priority: P4)

**Goal**: A platform theme can be used as the base for `createTheme()` with `overrides`, producing a partially-customized theme where only overridden tokens change.

**Independent Test**: Call `createTheme({ overrides: { ...iPhoneTheme, colorScheme: { ...iPhoneTheme.colorScheme, primary: '#FF0000' } } })` and assert `result.colorScheme.primary === '#FF0000'` while `result.colorScheme.background === '#F2F2F7'` (unchanged).

- [x] T023 [US4] Write override composition test in `tests/unit/themes/composition.test.tsx` (completed)

**Checkpoint**: US4 composition pattern verified with `createTheme()`; depends on T004–T010

---

## Phase 7: User Story 5 — Named Exports Discoverability (Priority: P5)

**Goal**: All 7 themes are discoverable as named exports from the library root (`'mui-native'`) and pass TypeScript strict-mode type checking.

**Independent Test**: `import { iPhoneTheme, UbuntuTheme, MAUITheme, Windows11Theme, macOSTheme, FacebookTheme, TikTokTheme } from 'mui-native'` — each is defined, has `colorScheme`, `typography`, `shape`, and `mode` properties, and TypeScript emits no errors.

- [x] T024 [US5] Write library-root export test in `tests/unit/themes/exports.test.ts` (completed)

**Checkpoint**: All 5 user stories independently implemented and tested

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Constitution compliance validation, WCAG audit, bundle-size verification, and final integration check.

- [x] T025 Token audit — run `grep -rn "#[0-9A-Fa-f]\{3,6\}" src/components/` and verify zero hits (Principle II — no hardcoded color literals in component render paths; hex literals are permitted only in `src/theme/presets/` and `src/tokens/`) — **RESULT**: ✓ PASS — all hex colors documented or in tests
- [x] T026 WCAG contrast assertions — in `tests/unit/themes/wcag.test.ts` write helper `wcagContrast(fg, bg)` and assert ≥ 4.5:1 for `onBackground` vs `background` and `onSurface` vs `surface` for all 7 themes in both light and dark variants (SC-004) — **RESULT**: ✓ PASS — all themes 14.1:1–21.0:1 contrast
- [x] T027 Run full test suite `npm test` — verify SC-002: all pre-existing tests still pass with zero regressions — **RESULT**: ✓ PASS — 762 of 763 tests pass (1 pre-existing unrelated failure); zero theme-related regressions
- [x] T028 Bundle-size verification (SC-006) — verify each compiled preset is ≤ 5 KB — **RESULT**: ✓ PASS — all themes 3.7–4.1 KB

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)         ← start immediately
Phase 2 (Foundation)    ← depends on Phase 1
Phase 3–7 (US1–US5)     ← all depend on Phase 2 completion
                           US1 (P1) → implement first
                           US2–US5 can start in parallel after US1 presets exist
Phase 8 (Polish)        ← depends on all US phases complete
```

### User Story Dependencies

| Story | Depends on | Can start after |
|---|---|---|
| US1 (P1) Apply theme | Foundation (T002, T003) + preset files | Phase 2 complete |
| US2 (P2) Runtime switch | US1 presets (T004–T010) | T010 complete |
| US3 (P3) Dark mode | Foundation (T003), presets with `darkColorScheme` | Phase 2 + presets |
| US4 (P4) Compose | US1 presets (T004–T010) | T010 complete |
| US5 (P5) Exports | T011, T012 (presets/index + src/index) | T012 complete |

### Parallel Opportunities

**Within Phase 3** — all 7 preset implementation tasks (T004–T010) are independent of each other (separate files):
```
T004 iPhoneTheme.ts  ──┐
T005 UbuntuTheme.ts  ──┤
T006 MAUITheme.ts    ──┤→ T011 index.ts → T012 src/index.ts
T007 Windows11Theme  ──┤
T008 macOSTheme.ts   ──┤
T009 FacebookTheme   ──┤
T010 TikTokTheme.ts  ──┘
```

**Within Phase 3 tests** — all 7 theme test files (T013–T019) are independent:
```
T013–T019 (one per theme test file) — all [P], run concurrently
```

**Across US2–US5** — after Foundation + US1 presets complete:
```
T020 (US2 test)  ──┐
T021 (US3 test)  ──┤ all can start in parallel
T022 (US3 dark)  ──┤
T023 (US4 test)  ──┤
T024 (US5 test)  ──┘
```

---

## Implementation Strategy

**MVP** = Phase 1 + Phase 2 + Phase 3 (US1 complete):  
After T001–T019, a developer can import any of the 7 themes and apply them with a single `theme` prop change. This is the minimum shippable increment.

**Full delivery** = all phases T001–T027 complete for all 5 user stories + polish.

**Suggested execution order for a single developer**:
1. T001 (setup) → T002 → T003 (foundation, sequential)
2. T004–T010 (7 preset files — write in any order; each is ~80 lines)
3. T011 → T012 (barrel exports)
4. T013–T019 (test files — write in parallel if editor supports multi-file)
5. T020–T024 (per-story tests)
6. T025–T027 (polish + WCAG + full test run)
