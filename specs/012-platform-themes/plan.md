# Implementation Plan: 012 Platform-Inspired Themes

**Branch**: `012-platform-themes` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)  
**Input**: `specs/012-platform-themes/spec.md`  
**Research**: [research.md](./research.md) | **Data Model**: [data-model.md](./data-model.md) | **Contracts**: [contracts/theme-api.md](./contracts/theme-api.md)

---

## Summary

Add 7 platform-inspired theme presets (iPhoneTheme, UbuntuTheme, MAUITheme, Windows11Theme, macOSTheme, FacebookTheme, TikTokTheme) to the `mui-native` library. Each preset is a standalone `Theme` constant carrying a light palette (`colorScheme`) and dark overrides (`darkColorScheme`). A minimal, backward-compatible extension to the `Theme` interface adds the optional `darkColorScheme` field. `ThemeProvider` gains an `Appearance.getColorScheme()` auto-detect behaviour (when `mode` prop is absent) so apps get system dark/light mode for free.

---

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory across all source and test files  
**Primary Dependencies**: `react-native` ≥ 0.73 (uses built-in `Appearance` API — no new peer deps)  
**Storage**: N/A — stateless UI library; theme presets are `const` objects  
**Testing**: Jest + `@testing-library/react-native`  
**Target Platform**: iOS 15+ and Android 12+ (React Native cross-platform)  
**Project Type**: library (theming extension — new preset files + minor modifications to existing internals)  
**Performance Goals**: ≤ 5 KB per theme preset (tree-shaken); `ThemeContext` re-render ≤ 16 ms  
**Constraints**: No new peer deps; no hardcoded color literals inside component render paths; all 7 themes must meet WCAG AA contrast (≥ 4.5:1 for text roles)  
**Scale/Scope**: 7 themes × 2 palettes (light + dark); 2 modified files (`types.ts`, `ThemeProvider.tsx`); ~8 new source files; ~8 new test files

---

## Constitution Check

*All six RN-Material principles evaluated — ✅ PASS, no gate violations.*

- ✅ **I. Component Fidelity** — Feature adds theme data files and one minor ThemeProvider behaviour change; MD3 color role names are preserved. No component deviate from MD3 spec. Platform themes intentionally use non-MD3 palettes — this is the explicit purpose of the feature (user-selectable themes), not an unintentional deviation; no `// RN-DEVIATION:` comments needed inside component code.
- ✅ **II. Design Token Supremacy** — Hex color literals appear exclusively inside `src/theme/presets/*.ts` files (the token definition layer, analogous to `src/tokens/colors.ts`). Zero hardcoded literals planned inside component render paths.
- ✅ **III. Theme-First Architecture** — All components continue consuming `useTheme()`; no static palette imports added anywhere. The `darkColorScheme` merge happens entirely inside `ThemeProvider` before the context value is vended — consumers see a resolved `colorScheme` without any changes to their own code.
- ✅ **IV. Cross-Platform Parity** — `Appearance.getColorScheme()` and `Appearance.addChangeListener` are available on both iOS and Android since RN 0.62. All 7 themes are RN-only; no platform-specific branching inside preset files.
- ✅ **V. Accessibility by Default** — All `onBackground`/`onSurface` color values verified to meet WCAG AA (≥ 4.5:1 contrast ratio, per D-005 in research.md). Unit tests will assert contrast ratios using a `wcagContrast()` helper.
- ✅ **VI. Performance Contract** — No animations added. `ThemeProvider` already uses `useMemo`; the new `Appearance` subscription is a lightweight `useEffect` with proper cleanup (`sub.remove()`). No risk of memory leaks.

---

## Project Structure

### Documentation (this feature)

```text
specs/012-platform-themes/
├── plan.md              ← This file (Phase 0–1 output)
├── spec.md              ← Feature spec (FR-001 – FR-011)
├── research.md          ← Phase 0: 7 design decisions
├── data-model.md        ← Phase 1: entities + relationships
├── quickstart.md        ← Phase 1: developer usage guide
├── contracts/
│   └── theme-api.md     ← Phase 1: updated Theme interface + export contracts
└── tasks.md             ← Phase 2 output (/speckit.tasks — NOT yet created)
```

### Source Code Changes

```text
src/
├── theme/
│   ├── types.ts                  ← MODIFY: add darkColorScheme?: Partial<ColorScheme>
│   ├── ThemeProvider.tsx         ← MODIFY: Appearance subscription + darkColorScheme merge
│   └── presets/                  ← NEW DIRECTORY
│       ├── iPhoneTheme.ts        ← NEW
│       ├── UbuntuTheme.ts        ← NEW
│       ├── MAUITheme.ts          ← NEW
│       ├── Windows11Theme.ts     ← NEW
│       ├── macOSTheme.ts         ← NEW
│       ├── FacebookTheme.ts      ← NEW
│       ├── TikTokTheme.ts        ← NEW
│       └── index.ts              ← NEW (re-exports all 7)
└── index.ts                      ← MODIFY: add 7 named exports

tests/
└── unit/
    ├── themes/                   ← NEW DIRECTORY
    │   ├── iPhoneTheme.test.ts   ← NEW
    │   ├── UbuntuTheme.test.ts   ← NEW
    │   ├── MAUITheme.test.ts     ← NEW
    │   ├── Windows11Theme.test.ts← NEW
    │   ├── macOSTheme.test.ts    ← NEW
    │   ├── FacebookTheme.test.ts ← NEW
    │   └── TikTokTheme.test.ts   ← NEW
    └── theme/
        └── ThemeProvider.test.tsx ← MODIFY: add Appearance subscription tests
```

**Structure Decision**: Single-library structure (Option 1). All changes fall within the existing `src/` tree. No new projects or workspaces needed. New `src/theme/presets/` subdirectory follows the established pattern of `src/tokens/` for cross-cutting concerns.

### Implementation Order (dependency-ordered for `/speckit.tasks`)

1. Extend `Theme` interface in `src/theme/types.ts` (unblocks all subsequent steps)
2. Modify `ThemeProvider.tsx` — add Appearance subscription + darkColorScheme merge
3. Create `src/theme/presets/iPhoneTheme.ts` through `TikTokTheme.ts` (7 files, parallelizable)
4. Create `src/theme/presets/index.ts` (depends on all 7 preset files)
5. Update `src/index.ts` exports (depends on presets/index.ts)
6. Write unit tests — 7 theme shape/WCAG tests (parallelizable)
7. Write ThemeProvider Appearance tests (depends on ThemeProvider modification)
8. Run full test suite (`npm test`)

---

## Complexity Tracking

> No Constitution Check violations. No complexity justification required.
