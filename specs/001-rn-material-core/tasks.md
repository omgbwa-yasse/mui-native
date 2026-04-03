# Tasks: RN-Material Core Framework

**Input**: Design documents from `/specs/001-rn-material-core/`
**Prerequisites**: plan.md ✓ · spec.md ✓ · research.md ✓ · data-model.md ✓ · contracts/ ✓ · quickstart.md ✓

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: User story label (US1–US5); omitted for Setup / Foundational / Polish phases
- All paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Project scaffolding, toolchain, and repository structure.

- [x] T001 Create directory tree per plan.md project structure: `src/tokens/`, `src/theme/`, `src/components/` (9 folders), `src/adapters/`, `tests/unit/`, `tests/integration/adapter/`, `stories/components/`, `.storybook/`
- [x] T002 Initialize npm library with `package.json`: set `name`, `version: "0.1.0"`, `main`, `types`, `exports`, `peerDependencies` (react-native ≥ 0.73, react-native-reanimated ≥ 3.x, react-native-gesture-handler ≥ 2.x), `optionalDependencies` (@react-native-material/core), `dependencies` (`@material/material-color-utilities` — production runtime dep for `generatePalette.ts`; NOT devDependencies), `devDependencies` (TypeScript 5.x, Jest, @testing-library/react-native)
- [x] T003 [P] Configure `tsconfig.json` with `strict: true`, `moduleResolution: bundler`, `jsx: react-native`, `paths` alias for `rn-material/*`, and `include: ["src"]`
- [x] T004 [P] Configure `jest.config.ts` with preset `react-native`, `transform` for TypeScript, `moduleNameMapper` for the barrel alias, and `setupFilesAfterEnv` pointing to `@testing-library/react-native` setup
- [x] T005 [P] Configure `eslint.config.js` with `@typescript-eslint/strict`, `eslint-plugin-react-native` rules including the `no-raw-text` rule and the custom rule banning `'left'`/`'right'` as style values (as established in research.md § R-03)
- [x] T006 [P] Configure `.storybook/main.ts` and `.storybook/preview.tsx` wrapping all stories in `ThemeProvider` (stub ThemeProvider import for now)

**Checkpoint**: Toolchain ready — `npm install`, `npm test`, `npm run lint` all exit cleanly.

---

## Phase 2: Foundational (Token + Theme Layer)

**Purpose**: Token definitions and ThemeProvider MUST be complete before any component can be implemented. No user story work can begin until this phase is complete.

**⚠️ CRITICAL**: All components in US1–US5 depend on every task in this phase.

- [x] T007 Implement `src/tokens/colors.ts`: export `baseLight: ColorScheme` and `baseDark: ColorScheme` with all 30 MD3 color roles as hex strings (no dynamic generation yet); export types per `contracts/theme.contract.ts` `ColorScheme` interface
- [x] T008 [P] Implement `src/tokens/typography.ts`: export `defaultTypeScale: TypeScale` with all 15 MD3 type styles (font family `"Roboto"`, exact `fontSize`/`lineHeight`/`fontWeight` values from research.md § R-06)
- [x] T009 [P] Implement `src/tokens/spacing.ts`: export `defaultSpacing: SpacingScale` — `none(0)`, `xxs(2)`, `xs(4)`, `sm(8)`, `md(12)`, `lg(16)`, `xl(24)`, `xxl(32)`, `xxxl(48)`, `xxxxl(64)`
- [x] T010 [P] Implement `src/tokens/shape.ts`: export `defaultShape: ShapeScale` with corner-radius levels `none(0)`, `extraSmall(4)`, `small(8)`, `medium(12)`, `large(16)`, `extraLarge(28)`, `full(9999)`
- [x] T011 [P] Implement `src/tokens/elevation.ts`: export `defaultElevation: ElevationScale` — five levels per research.md § R-07; include `tintOpacity`, and platform-specific shadow values in a `// RN-DEVIATION:` block (Android `elevation`, iOS `shadowRadius`/`shadowOffset`/`shadowColor`)
- [x] T012 [P] Implement `src/tokens/motion.ts`: export `defaultMotion: MotionTokens` — all 10 duration values + 6 easing strings from research.md § R-04 (emphasis: `duration.medium2 = 300`)
- [x] T013 Implement `src/tokens/index.ts`: re-export `ColorScheme`, `TypeScale`, `SpacingScale`, `ShapeScale`, `ElevationScale`, `MotionTokens`, and all default token objects
- [x] T014 Implement `src/theme/types.ts`: `Theme`, `ThemeContextValue`, `ThemeProviderProps`, `DeepPartial<T>` per `contracts/theme.contract.ts`; also export `UseThemeReturn`
- [x] T015 Implement `src/theme/generatePalette.ts`: `generatePalette(seedHex, mode) → ColorScheme` using `@material/material-color-utilities` `themeFromSourceColor` + `argbFromHex`; converts ARGB integers to hex; unit-testable pure function (research.md § R-01)
- [x] T016 Implement `src/theme/createTheme.ts`: `createTheme(overrides?: DeepPartial<Theme>, seedColor?: string, mode?: 'light'|'dark') → Theme` — deep-merges built-in base tokens with overrides; calls `generatePalette` when `seedColor` is supplied
- [x] T017 Implement `src/theme/ThemeContext.ts`: `ThemeContext = createContext<ThemeContextValue | null>(null)`; `useTheme()` hook that reads context and throws `"RN-Material: useTheme() called outside ThemeProvider"` when context is null
- [x] T018 Implement `src/theme/ThemeProvider.tsx`: accepts `ThemeProviderProps`; manages `mode` state (reads `useColorScheme()` when `mode='system'`); calls `createTheme` on mount and when `seedColor`/`mode` change; provides `ThemeContextValue` to `ThemeContext.Provider`
- [x] T019 Implement `src/theme/index.ts`: re-export `ThemeProvider`, `useTheme`, `createTheme`, `generatePalette`, `ThemeProviderProps`, `Theme`, `ColorScheme`
- [x] T020 Confirm `@material/material-color-utilities` is listed in `package.json` `dependencies` (NOT `devDependencies`) — it is a production runtime import in `generatePalette.ts` and must have been added in T002; ⚠️ must be present before T015 (`generatePalette.ts`) is implemented

**Checkpoint**: `ThemeProvider` + `useTheme()` are functional. Any component can now import `useTheme()` and receive a fully-typed `Theme` object.

---

## Phase 3: User Story 1 — Install and Render a Themed Button (Priority: P1) 🎯 MVP

**Goal**: A developer can install the package, wrap the app in `<ThemeProvider>`, and render a `<Button variant="filled">` on both iOS and Android with the correct MD3 primary color, shape, and elevation — zero inline styles required.

**Independent Test**: Mount `<ThemeProvider><Button variant="filled" label="Save" /></ThemeProvider>` in a test renderer; assert that `backgroundColor` equals `theme.colorScheme.primary` and that no hardcoded hex literal appears in `Button.styles.ts`. Run `grep -r '#[0-9A-Fa-f]' src/components/Button/` → zero matches.

- [x] T021 [US1] Create `src/components/Button/types.ts`: copy `ButtonProps` (including `ButtonVariant` union) from `contracts/components.contract.ts`; add internal `ButtonStyleProps` that maps variant → token keys
- [x] T022 [P] [US1] Implement `src/components/Button/Button.styles.ts`: `makeButtonStyles(theme: Theme, variant: ButtonVariant, disabled: boolean) → StyleSheet` — resolves all colors from `theme.colorScheme`, shape from `theme.shape.small`, elevation from `theme.elevation.level1/2`, typography from `theme.typography.labelLarge`; zero hardcoded literals
- [x] T023 [US1] Implement `src/components/Button/Button.tsx`: call `useTheme()`; resolve styles via `makeButtonStyles`; render `GestureDetector` + `Gesture.Tap()` (RNGK v2) wrapping a `View` with Reanimated `useAnimatedStyle` for press scale (0.97) and ripple color from `theme.colorScheme.primary`; pass `accessibilityRole="button"`, `accessibilityLabel={label}`, `accessibilityState={{ disabled }}`; `allowFontScaling={true}` on label `Text`
- [x] T024 [US1] Implement `src/components/Button/index.ts`: export `Button`, `ButtonProps`, `ButtonVariant`
- [x] T025 [P] [US1] Create `stories/components/Button.stories.tsx`: Storybook stories for all 5 variants (filled, outlined, text, elevated, tonal) × light/dark — wrapped in `ThemeProvider`
- [x] T026 [US1] Update `src/index.ts` barrel: export `ThemeProvider`, `useTheme`, `createTheme`, `Button` and all their prop types — this is the public API

**Checkpoint**: US1 complete. `<Button variant="filled" label="Save" />` renders correctly on both platforms. Zero hardcoded literals in `Button.styles.ts`. Storybook story visible.

---

## Phase 4: User Story 2 — Runtime Light/Dark Theme Switch (Priority: P2)

**Goal**: A toggle switches the entire UI between light and dark mode; all components update their tokens with no unmounting or prop drilling.

**Independent Test**: Render `<ThemeProvider><Button /><Card /><TextField /></ThemeProvider>` with a mode toggle. `act(() => setMode('dark'))` → assert that `theme.colorScheme.background` changes to the dark-palette value and no component uses an `if (mode === 'dark')` branch.

- [x] T027 [US2] Implement `src/theme/ThemeProvider.tsx` `setMode` integration (extends T018): expose `setMode` in context value; when `mode='system'` subscribe to `Appearance.addChangeListener`; recompute theme via `createTheme` on every mode change; verify transition completes within one `requestAnimationFrame` budget (≤ 16 ms) per SC-003
- [x] T028 [US2] Add dark-mode acceptance test in `tests/unit/theme/ThemeProvider.test.tsx`: render with light mode, call `setMode('dark')`, assert `theme.colorScheme.primary` changes to dark palette value, assert elapsed wall time ≤ 16 ms (mock `performance.now`)
- [x] T029 [P] [US2] Implement `src/components/Card/types.ts` + `Card.styles.ts` + `Card.tsx` + `Card/index.ts`: `CardProps` per contracts; `makeCardStyles(theme, variant)` — surface color from `theme.colorScheme.surface`/`surfaceVariant`, elevation from `theme.elevation.level1` (elevated variant); Pressable wraps children when `onPress` provided; `accessibilityRole="button"` only when `onPress` present
- [x] T030 [P] [US2] Implement `src/components/TextField/types.ts` + `TextField.styles.ts` + `TextField.tsx` + `TextField/index.ts`: `TextFieldProps` per contracts; animated label float using Reanimated `useSharedValue`; outlined variant uses `theme.colorScheme.outline`; filled variant uses `theme.colorScheme.surfaceVariant`; error state uses `theme.colorScheme.error` and `errorContainer`; `accessibilityLabel`, `accessibilityState={{ disabled }}` on `TextInput`
- [x] T031 [P] [US2] Create `stories/components/Card.stories.tsx` and `stories/components/TextField.stories.tsx` for all variants in light + dark
- [x] T032 [US2] Update `src/index.ts` barrel: add `Card`, `CardProps`, `CardVariant`, `TextField`, `TextFieldProps`, `TextFieldVariant`

**Checkpoint**: US2 complete. `setMode('dark')` switches all three components (Button, Card, TextField) within ≤ 16 ms. No `if (mode === 'dark')` branches in component files.

---

## Phase 5: User Story 3 — Full Screen with Core MD3 Components (Priority: P3)

**Goal**: Implement the remaining 6 components (AppBar, FAB, Chip, Dialog, BottomSheet, NavigationBar) so a complete feature screen can be assembled with all 9 components.

**Independent Test**: Render the "Contact Profile" screen with all 9 components. Run `toBeAccessible` on each. Screenshot comparison → visual parity with MD3 reference. `BottomSheet` swipe-down → dismiss with Reanimated worklet (no JS-thread animation).

- [x] T033 [P] [US3] Implement `src/components/AppBar/types.ts` + `AppBar.styles.ts` + `AppBar.tsx` + `AppBar/index.ts`: `AppBarProps` per contracts; `small`/`medium`/`large`/`center` variants; elevation-on-scroll driven by `scrollRef` using Reanimated `useAnimatedScrollHandler`; AppBar surface tinted to `theme.colorScheme.surface` + elevation tint overlay at level4 when scrolled (research.md § R-07)
- [x] T034 [P] [US3] Implement `src/components/FAB/types.ts` + `FAB.styles.ts` + `FAB.tsx` + `FAB/index.ts`: `FABProps` per contracts; 4 color variants (primary, secondary, tertiary, surface), 3 sizes; extended FAB renders icon + label row; `lowered` prop sets `elevation.level1`; press animation via Reanimated scale worklet
- [x] T035 [P] [US3] Implement `src/components/Chip/types.ts` + `Chip.styles.ts` + `Chip.tsx` + `Chip/index.ts`: 4 chip variants; `selected` state toggles `theme.colorScheme.secondaryContainer` background; trailing ✕ calls `onDelete`; `accessibilityState={{ selected }}` on Pressable
- [x] T036 [US3] Implement `src/components/Dialog/types.ts` + `Dialog.styles.ts` + `Dialog.tsx` + `Dialog/index.ts`: renders RN `Modal` with `transparent`; scrim opacity animated from 0 → `theme.colorScheme.scrim` via Reanimated; container enters with spring scale 0.8 → 1.0 using MD3 `emphasized` easing; `dismissible` prop toggles scrim tap behavior; `accessibilityViewIsModal={true}` on container
- [x] T037 [US3] Implement `src/components/BottomSheet/types.ts` + `BottomSheet.styles.ts` + `BottomSheet.tsx` + `BottomSheet/index.ts`: pan-gesture-driven translation using RNGK v2 `GestureDetector` + `Gesture.Pan()` (see research.md § R-04); `snapPoints` array with spring snap; dismiss when `velocityY > 500` or drag > 50% height; `runOnJS(onDismiss)` bridged callback; elevation `level3` surface; `dismissible` prop
- [x] T038 [P] [US3] Implement `src/components/NavigationBar/types.ts` + `NavigationBar.styles.ts` + `NavigationBar.tsx` + `NavigationBar/index.ts` (NavigationBar was part of the component set per FR-007 breadth; added to complete the 9-component suite): indicator pill animation via Reanimated `useSharedValue`; badge rendering; `accessibilityRole="tab"`, `accessibilityState={{ selected }}` per item
- [x] T039 [P] [US3] Create Storybook stories for all 6 new components: `stories/components/AppBar.stories.tsx`, `FAB.stories.tsx`, `Chip.stories.tsx`, `Dialog.stories.tsx`, `BottomSheet.stories.tsx`, `NavigationBar.stories.tsx` — all variants, light + dark
- [x] T040 [US3] Update `src/index.ts` barrel: add `AppBar`, `FAB`, `Chip`, `Dialog`, `BottomSheet`, `NavigationBar` and all corresponding prop types

**Checkpoint**: US3 complete. All 9 components render on both platforms. Storybook shows all variants. BottomSheet gesture-dismiss works without JS-thread animation.

---

## Phase 6: User Story 4 — @react-native-material/core Adapter (Priority: P4)

**Goal**: When `@react-native-material/core` is installed, `RNMCoreAdapter` feeds the active RN-Material theme into that library's context. When it is NOT installed the adapter is a no-op and the build succeeds.

**Independent Test**: (1) With `@react-native-material/core` installed: render `<ThemeProvider seedColor="#6750A4"><RNMCoreAdapter><LegacyButton /></RNMCoreAdapter></ThemeProvider>` — assert `LegacyButton`'s received `primary` color matches `theme.colorScheme.primary`. (2) Without the package: tree renders without error.

- [x] T041 Implement `src/adapters/rnm-core-adapter.ts`: `mapThemeToRNMCorePalette(colorScheme) → RNMCorePalette` pure mapping function (keys per research.md § R-02 + contracts/adapter.contract.ts); wrap `@react-native-material/core`'s `ThemeProvider` inside `try { require('@react-native-material/core') }` guard; `RNMCoreAdapter` calls `useTheme()`, derives palette, passes it as theme prop to the inner provider; when package missing renders `<>{children}</>` + `console.warn` (dev only)
- [x] T042 Implement `src/adapters/index.ts`: export `RNMCoreAdapter`, `RNMCoreAdapterProps`, `mapThemeToRNMCorePalette`
- [x] T043 [US4] Add integration test `tests/integration/adapter/rnm-core-adapter.test.tsx`: mock `@react-native-material/core` with a jest manual mock; assert `mapThemeToRNMCorePalette` returns correct hex values for all 12 keys; assert `RNMCoreAdapter` renders children when mock is available; assert no crash when mock is absent (jest `jest.mock` removed)
- [x] T044 [P] [US4] Update `src/index.ts` barrel to re-export from `src/adapters/index.ts`; update `package.json` `exports` map to expose `rn-material/adapters` sub-path

**Checkpoint**: US4 complete. Adapter maps theme correctly. Build passes without `@react-native-material/core`. Integration test green.

---

## Phase 7: User Story 5 — Accessible UI Out of the Box (Priority: P5)

**Goal**: Every interactive component passes automated `toBeAccessible` assertions; `reduceMotion` disables all animations; all touch targets ≥ 48 × 48 dp.

**Independent Test**: Run `toBeAccessible()` against Button, TextField, FAB, Chip, Card (with onPress), Dialog, BottomSheet, NavigationBar, AppBar in isolation. Separately mock `AccessibilityInfo.isReduceMotionEnabled` → `true` and assert Reanimated `withSpring` / `withTiming` are not called by checking the shared value transitions.

- [x] T045 [US5] Implement `src/theme/useReduceMotion.ts`: wraps `AccessibilityInfo.addEventListener('reduceMotionChanged', ...)` and `AccessibilityInfo.isReduceMotionEnabled()`; returns `boolean`; hook is consumed inside every component that runs an animation
- [x] T046 [US5] Add `reduceMotion` guard to all animation call-sites in: `Button.tsx` (press scale), `TextField.tsx` (label float), `Dialog.tsx` (spring enter), `BottomSheet.tsx` (pan spring), `NavigationBar.tsx` (indicator), `AppBar.tsx` (elevation transition) — pattern: `translateY.value = reduceMotion ? targetValue : withSpring(targetValue, CONFIG)`
- [x] T047 [P] [US5] Audit and fix `minWidth`/`minHeight` to ≥ 48 dp on all interactive hit areas in: `Button.styles.ts`, `FAB.styles.ts`, `Chip.styles.ts`, `NavigationBar.styles.ts` — using `hitSlop` or explicit dimension constraints
- [x] T048 [P] [US5] Add `accessibilityLabel` defaulting logic to `TextField.tsx` (falls back to `label` prop) and `NavigationBar` items (concatenates `label` + badge count when badge is present)
- [x] T049 [P] [US5] Write accessibility unit tests in `tests/unit/components/accessibility.test.tsx`: `toBeAccessible()` assertion for Button, TextField, FAB, Chip (selected), Card (pressed), Dialog, NavigationBar
- [x] T050 [P] [US5] Write `reduceMotion` unit tests in `tests/unit/theme/useReduceMotion.test.ts`: mock `AccessibilityInfo`, assert hook returns `true`/`false` on OS events; assert dialog spring is skipped when `reduceMotion = true`

**Checkpoint**: US5 complete. 100% `toBeAccessible` pass. All touch targets ≥ 48 dp. `reduceMotion` disables all animation worklets.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Token integrity audit, RTL verification, TypeScript barrel completeness, bundle size check, Storybook final review.

- [x] T051 [P] Token literal audit: run `grep -r '#[0-9A-Fa-f]\{3,6\}' src/components/` and `grep -rE '[0-9]+(dp|px)' src/components/` — zero matches required; fix any violations (SC-005)
- [x] T052 [P] RTL audit: run `grep -rE "style.*'(left|right)'" src/components/` — zero undecorated occurrences; all `// RN-DEVIATION:` annotated exceptions are reviewed; verify logical properties across Button, AppBar, TextField leading/trailing icons
- [x] T053 [P] TypeScript barrel completeness check: run `tsc --noEmit` and confirm all 15 public API symbols (ThemeProvider, useTheme, createTheme, Button, TextField, Card, AppBar, FAB, Chip, Dialog, BottomSheet, NavigationBar, RNMCoreAdapter + their Prop types) are exported from `src/index.ts`
- [x] T054 [P] Bundle size audit: run `npx size-limit` or equivalent on each component sub-path; confirm each new component adds ≤ 10 kB minified (SC-006 proxy)
- [x] T055 [P] Storybook cross-platform review pass: open each story on iOS simulator and Android emulator; confirm elevation shadows, shape radii, typography, and dark-mode palette are visually correct
- [x] T056 Final `npm test` green gate: run the full test suite, confirm zero failures; run `npm run lint`, confirm zero errors; commit tasks.md as the execution record

---

## Dependencies (Story Completion Order)

```
Phase 1 (Setup)
    └─► Phase 2 (Tokens + Theme Layer)  [BLOCKING for ALL stories]
            ├─► Phase 3 (US1: Button)          🎯 MVP
            │       └─► Phase 4 (US2: Light/Dark + Card + TextField)
            │               └─► Phase 5 (US3: AppBar, FAB, Chip, Dialog, BottomSheet, NavigationBar)
            ├─► Phase 6 (US4: Adapter)         [independent, can start after Phase 2]
            └─► Phase 7 (US5: Accessibility)   [runs alongside Phase 3–5; gate before marking any story Done]
                        └─► Phase 8 (Polish)
```

**US4 is independent**: The adapter can be implemented in parallel with US3.
**US5 is cross-cutting**: Accessibility tasks in Phase 7 must be applied to each component immediately after it is built; run them per-component rather than waiting for all components to be done.

---

## Parallel Execution Examples

### MVP Sprint (Phase 1 + 2 + 3)

```
[Sequential] T001 → T002
[Parallel]   T003, T004, T005, T006
[Sequential] T007 → T013 (tokens) → T014 → T020 (types/palette/context) → T018 (ThemeProvider)
[Parallel]   T021, T022 (Button types + styles in parallel)
[Sequential] T023 (Button.tsx, depends T022) → T024 → T026
```

### Full Library Sprint (after MVP)

```
[Parallel] T029 (Card), T030 (TextField), T033 (AppBar), T034 (FAB), T035 (Chip)
[Sequential] T036 (Dialog), T037 (BottomSheet) — both need Modal/gesture setup
[Parallel] T038 (NavigationBar), T041+T042 (Adapter)
[Parallel] T045, T046, T047, T048 (Accessibility cross-cutting)
```

---

## Implementation Strategy

**MVP Scope** (Phases 1–3): Token layer + ThemeProvider + Button — fully functional library that satisfies US1 and SC-001 (5-minute quickstart). Ship as `v0.1.0`.

**Increment 2** (Phase 4): Light/dark switching + Card + TextField — satisfies US2 and SC-002 (≤ 16 ms theme switch). Ship as `v0.2.0`.

**Increment 3** (Phase 5): Remaining 6 components — satisfies US3 and SC-003 (full screen parity). Ship as `v0.3.0`.

**Increment 4** (Phases 6–7): Adapter + full accessibility pass — satisfies US4, US5, SC-004 (100% a11y). Ship as `v0.4.0`.

**v1.0.0**: Phase 8 polish pass + bundle audit + clean lint + Storybook review.

---

## Summary

| Phase | Story | Tasks | Parallelizable | MVP? |
|-------|-------|-------|----------------|------|
| 1: Setup | — | T001–T006 | T003–T006 | ✅ |
| 2: Foundation | — | T007–T020 | T008–T012 | ✅ |
| 3: Button | US1 | T021–T026 | T022, T025 | ✅ |
| 4: Theme Switch | US2 | T027–T032 | T029–T031 | — |
| 5: All Components | US3 | T033–T040 | T033–T035, T039 | — |
| 6: Adapter | US4 | T041–T044 | T044 | — |
| 7: Accessibility | US5 | T045–T050 | T047–T050 | — |
| 8: Polish | — | T051–T056 | T051–T055 | — |
| **Total** | | **56 tasks** | **~30 parallelizable** | |
