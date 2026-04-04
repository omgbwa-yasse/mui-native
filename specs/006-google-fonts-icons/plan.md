# Implementation Plan: 006-google-fonts-icons

**Branch**: `006-google-fonts-icons` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-google-fonts-icons/spec.md`

## Summary

Add a `MaterialIcon` component and `materialIconSource` factory function that expose all 5 Google Fonts Material Icon variants (Filled, Outlined, Rounded, Sharp, Two Tone) to consumers of the `mui-native` library. The implementation wraps `react-native-vector-icons` (new peer dependency ≥ 10.0.0), generates a compile-time `MaterialIconName` union type from Google's official codepoints file via a CI script, resolves icon color from the MD3 theme (falling back to `#000000` with a dev-mode warning when no `ThemeProvider` is present), and renders Two Tone icons as two overlapping `Text` glyphs — primary at full opacity and secondary at 40% opacity.

The existing `Icon` component and all its exports remain unchanged.

---

## Technical Context

**Language/Version**: TypeScript 5.x — `"strict": true` mandatory  
**Primary Dependencies**: `react-native` ≥ 0.73, `react-native-vector-icons` ≥ 10.0.0 (new peer dep), `@react-native-vector-icons/common` (createIconSet API)  
**Storage**: N/A — stateless UI library  
**Testing**: Jest 29 + `@testing-library/react-native`  
**Target Platform**: iOS 15+ and Android API 24+ (both required, parity enforced)  
**Project Type**: Library (published npm package, consumed by host app)  
**Performance Goals**: Icon render overhead < 5% compared to baseline `Icon` component; no new Reanimated worklets (static icon, no animation)  
**Constraints**: Offline-capable (fonts embedded via native linking, no network calls at render time); TypeScript strict throughout; no runtime font-file bundling inside library (peer dep pattern)  
**Scale/Scope**: ~2,500 icon names across 5 variants; single new component + factory function + generated catalogue type file

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

- [x] **I. Component Fidelity** — `MaterialIcon` maps directly to Google Material Design iconography guidelines. Two Tone secondary color at 40% opacity follows the MD3 two-tone icon spec. No MD3 deviations requiring `// RN-DEVIATION:` annotation.
- [x] **II. Design Token Supremacy** — Icon color resolves via `useContext(ThemeContext)` → `theme.colorScheme.onSurface`. The only hardcoded color is `#000000` in the no-provider fallback path, emitted with `__DEV__ && console.warn(...)` and documented as intentional. No color literals in the render path when a `ThemeProvider` is present.
- [x] **III. Theme-First Architecture** — Uses `useContext(ThemeContext)` directly (NOT `useTheme()`) because `useTheme()` throws outside a provider. This is the safe pattern that still honors theme colors without crashing standalone usage. The raw `ThemeContext` is already exported from `src/theme/ThemeContext.ts`.
- [x] **IV. Cross-Platform Parity** — Font linking documented for both iOS (CocoaPods) and Android (fonts.gradle). All 5 variants use the same `createIconSet` API, identical code path on both platforms. Tests run in the RN test environment covering both platforms.
- [x] **V. Accessibility by Default** — `MaterialIcon` forwards `accessibilityLabel` → `accessibilityRole="image"` when provided, `"none"` otherwise (mirrors existing `Icon` component pattern). Touch target is controlled by the parent; the icon itself is presentational.
- [x] **VI. Performance Contract** — No animations; `React.memo` applied to `MaterialIcon`. Two Tone renders as two `Text` elements (no Reanimated needed). The icon sets are instantiated once at module load via `createIconSet` (static, not per-render).

**Post-design re-check** (after Phase 1): All 6 items confirmed compliant. The `useContext(ThemeContext)` approach (Decision 5 in research.md) is the key architectural decision that preserves Theme-First Architecture without violating it.

---

## Design Rationale: Why `MaterialIcon` is a Separate Component from `Icon`

> This section addresses the question: *"Why can't we just import `Icon` directly instead of `MaterialIcon`?"*

**You CAN use `Icon` directly** — via the `materialIconSource` bridge (US-2, FR-005):

```ts
import { Icon, materialIconSource } from 'mui-native';
<Icon source={materialIconSource('home', 'outlined')} size={24} />
```

`MaterialIcon` exists as a separate, first-class component because four independent constraints make direct `Icon` extension impossible without breaking changes:

| Constraint | Detail | Spec reference |
|-----------|--------|----------------|
| **`Icon`'s API is render-prop only** | `Icon` accepts `source: (props) => ReactElement`. It has no `name` prop and is intentionally library-agnostic. Adding a `name` prop would couple a generic component to Material Icons specifically. | FR-011 |
| **Two Tone is architecturally incompatible with `Icon`'s single-source model** | `Icon` calls `source()` exactly once and renders the result. Two Tone requires two overlapping glyphs at different opacities — not expressible via a single `IconSource` inside `Icon`'s `<View>` wrapper. | FR-009b, research.md Decision 4 |
| **`Icon` uses `useTheme()` which throws outside `ThemeProvider`** | FR-009 requires `MaterialIcon` to never throw when no provider is present. `Icon` cannot fulfill this requirement; retrofitting a null-safe path into `Icon` would silently change its existing behavior for all callers. | FR-009, research.md Decision 5 |
| **FR-011 forbids any change to `Icon`'s public API** | Any addition of `name`, `variant`, or material-icon-specific props to `Icon` would widen its API surface, creating a backward-compatibility risk and coupling the generic component to a specific icon library. | FR-011 |

**Summary**: `materialIconSource` is the deliberate bridge between the two systems. `MaterialIcon` is the convenience API for direct named usage, type-safe `name` prop, Two Tone support, and graceful standalone rendering.

---

### Documentation (this feature)

```text
specs/006-google-fonts-icons/
├── plan.md              ✅ (this file)
├── spec.md              ✅
├── research.md          ✅
├── data-model.md        ✅
├── quickstart.md        ✅
├── contracts/
│   └── public-api.md    ✅
└── tasks.md             ← created by /speckit.tasks (not this command)
```

### Source Code

```text
src/
├── components/
│   ├── Icon/                         # UNCHANGED — existing component
│   │   ├── Icon.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   └── MaterialIcon/                 # NEW
│       ├── MaterialIcon.tsx          # Component (React.memo, useContext(ThemeContext))
│       ├── materialIconSource.ts     # Factory returning IconSource-compatible function
│       ├── iconSets.ts               # createIconSet calls for all 5 variants
│       ├── types.ts                  # IconVariant, MaterialIconProps (re-exports MaterialIconName)
│       ├── catalogue.ts              # GENERATED — MaterialIconName union type (~2500 names)
│       └── index.ts                  # Barrel: exports component, factory, types
├── index.ts                          # MODIFIED — add MaterialIcon exports + existing Icon exports

scripts/
└── generate-material-icon-names.ts   # CI script: fetches codepoints → writes catalogue.ts
```

```text
tests/unit/components/
└── MaterialIcon/
    ├── MaterialIcon.test.tsx         # Unit tests (renders, variants, theme, a11y, fallback)
    └── materialIconSource.test.ts    # Factory tests (returned function renders correctly)

stories/components/
└── MaterialIcon/
    └── MaterialIcon.stories.tsx      # Storybook stories for all 5 variants
```

**Structure Decision**: Single-project library layout. `MaterialIcon/` folder sits beside `Icon/` in `src/components/`. Generated `catalogue.ts` is checked into source (regenerated in CI) so consumers get types without running scripts.

---

## Implementation Phases

### Phase 0 — Research ✅ (complete)
- Confirmed `react-native-vector-icons` ≥ 10 ships all 5 Material Icon variants.
- Confirmed `createIconSet` API from `@react-native-vector-icons/common`.
- Confirmed codepoints URL for CI type generation.
- Confirmed Two Tone single-font two-layer rendering strategy.
- Confirmed `useContext(ThemeContext)` safe pattern (see research.md — Decision 5).

**Output**: `research.md`

### Phase 1 — Design & Contracts ✅ (complete)
- `data-model.md` — entities, `IconVariant`, `MaterialIconName`, `MaterialIconProps`, validation rules.
- `contracts/public-api.md` — full TypeScript signatures; unchanged-exports guarantee for `Icon`.
- `quickstart.md` — host-app font linking steps, usage examples, troubleshooting table.

**Output**: `data-model.md`, `contracts/public-api.md`, `quickstart.md`

### Phase 2 — Type Catalogue Generation
- Write `scripts/generate-material-icon-names.ts` (Node.js, TypeScript).
  - Fetch `MaterialIcons-Regular.codepoints` from Google Fonts GitHub (pinned SHA).
  - Parse lines → icon name list.
  - Write `src/components/MaterialIcon/catalogue.ts` with `export type MaterialIconName = 'abc' | 'accessible' | 'home' | ...`.
- Run script once; commit generated `catalogue.ts`.
- Add `npm run generate:icon-names` script to `package.json`.

**Acceptance**: `catalogue.ts` exports `MaterialIconName` union; TypeScript accepts valid names; rejects typos at compile time.

### Phase 3 — Icon Sets
- Write `iconSets.ts`:
  - Import `createIconSet` from `@react-native-vector-icons/common`.
  - Create and export one icon set per variant: `FilledIcons`, `OutlinedIcons`, `RoundedIcons`, `SharpIcons`, `TwoToneIcons`.
  - Font family strings must match the `.ttf` filenames shipped by `react-native-vector-icons`.

**Acceptance**: Each icon set renders a glyph for `"home"` with the correct font family.

### Phase 4 — `MaterialIcon` Component
- Write `MaterialIcon.tsx`:
  - Props: `MaterialIconProps` (name, variant='filled', size=24, color, accessibilityLabel, testID).
  - Use `useContext(ThemeContext)` to get theme; if null → fallback `#000000` + `__DEV__` warning.
  - Resolve final color: `props.color ?? theme?.colorScheme.onSurface ?? '#000000'`.
  - For non-Two Tone: delegate to the appropriate icon set component.
  - For Two Tone: render two overlapping `Text` glyphs (see Phase 5).
  - Wrap in `React.memo`.
  - Apply `accessibilityRole="image"` when `accessibilityLabel` provided; `"none"` otherwise.

**Acceptance**: Renders icon, respects theme color, falls back gracefully without provider.

### Phase 5 — Two Tone Rendering
- In `MaterialIcon.tsx` (Two Tone branch):
  - Render primary glyph at `opacity: 1` using `TwoToneIcons`.
  - Render secondary glyph at `opacity: 0.4` using `TwoToneIcons` with `style={StyleSheet.absoluteFill}`.
  - Wrap both in a `View` with `style={{ position: 'relative' }}`.
- No secondary color prop required (spec decision FR-009b).

**Acceptance**: Two Tone icon shows layered color effect; secondary layer at ~40% opacity visually.

### Phase 6 — `materialIconSource` Factory
- Write `materialIconSource.ts`:
  - Signature: `materialIconSource(name: MaterialIconName, variant?: IconVariant): IconSource`
  - Returns a function `(props: { size: number; color: string }) => ReactElement | null` — exactly the `IconSource` shape from `src/components/Icon/types.ts`.
  - Internally creates a minimal `MaterialIcon`-like render using the resolved icon set.
  - This factory enables using Material Icons with the existing `<Icon source={...}>` API.

**Acceptance**: `<Icon source={materialIconSource("star", "outlined")} size={24} />` renders the outlined star icon.

### Phase 7 — Tests & Storybook
- Write `MaterialIcon.test.tsx`:
  - Renders without crashing (filled, all 5 variants).
  - Applies theme color when `ThemeProvider` wraps.
  - Falls back to `#000000` when no provider (no crash).
  - `accessibilityRole="image"` when label provided; `"none"` otherwise.
  - `testID` prop forwarded.
  - Two Tone renders two glyph children.
- Write `materialIconSource.test.ts`:
  - Returned function renders a ReactElement.
  - Works with `<Icon source={...}>`.
- Write `MaterialIcon.stories.tsx`:
  - Story per variant, a11y story, theme story.

**Acceptance**: `npm test` passes; no regressions.

### Phase 8 — Barrel Exports & Peer Dep
- Edit `src/components/MaterialIcon/index.ts` — export `MaterialIcon`, `materialIconSource`, `MaterialIconProps`, `IconVariant`, `MaterialIconName`.
- Edit `src/index.ts` — add new exports; also add `Icon`, `IconProps`, `IconSource` if not already present.
- Edit `package.json` — add `"react-native-vector-icons": ">=10.0.0"` to `peerDependencies`.

**Acceptance**: `import { MaterialIcon, materialIconSource, MaterialIconName } from 'mui-native'` resolves without error; existing imports unchanged.

---

## Complexity Tracking

*No Constitution Check violations. No entries required.*
