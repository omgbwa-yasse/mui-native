# Research: Google Fonts Material Icons Integration

**Feature**: 006-google-fonts-icons  
**Phase**: 0 — Pre-design research  
**Date**: 2026-04-03

---

## Decision 1: Icon rendering library

**Decision**: Use `react-native-vector-icons` with the `@react-native-vector-icons/common` `createIconSet` API for all 5 Material Icon variants.

**Rationale**: `react-native-vector-icons` ships all 5 Google Fonts Material Icon families as separate `.ttf` font files (`MaterialIcons`, `MaterialIcons-Outlined`, `MaterialIcons-Round`, `MaterialIcons-Sharp`, `MaterialIcons-TwoTone`). Using `createIconSet()` from `@react-native-vector-icons/common`, each variant becomes its own icon set — keyed by a codepoint map — allowing a single `MaterialIcon` component to dispatch to the correct family via a `variant` prop.

**Alternatives considered**:
- *Custom SVG renderer from Google Fonts SVG assets* — rejected; requires shipping ~2,500+ SVG files per variant (~12,500 total), unacceptably large bundle footprint and complex SVG parsing at runtime.
- *Library-agnostic adapter pattern* — deferred; adds API complexity before adoption is proven.
- *`@expo/vector-icons`* — rejected; Expo-only, restricts host apps to Expo managed/bare workflow.

---

## Decision 2: Peer dependency declaration

**Decision**: Declare `react-native-vector-icons` (the classic package, which re-exports `@react-native-vector-icons/common`) as a `peerDependency` in `package.json`. Host apps install it; the framework ships integration code only. Font files (`MaterialIcons*.ttf`) are bundled inside `react-native-vector-icons` and linked by the host app via the standard `rnpm`/autolinking mechanism or CocoaPods.

**Rationale**: Font files are binary assets (~150–300 KB each × 5 variants = ~1–1.5 MB); embedding them in the library would bloat every downstream app even when only one variant is used. Host-side linking is the established pattern for all icon libraries.

**Known caveats**:
- In monorepos with symlinked pods (pnpm/yarn workspaces), CocoaPods may fail to resolve `s.resources` paths that escape symlinks. Host apps must add a build phase script copying fonts to the app's local directory.
- The library must add `@types/react-native-vector-icons` (or rely on the bundled types in v10+) for TypeScript coverage.

---

## Decision 3: MaterialIconName type generation

**Decision**: Maintain a generated TypeScript union type `MaterialIconName` sourced from the Google Material Design Icons codepoints file. A CI script fetches the codepoints at:  
`https://raw.githubusercontent.com/google/material-design-icons/{TAG}/font/MaterialIcons-Regular.codepoints`  
and generates `src/components/MaterialIcon/catalogue.ts`. The script runs as part of the version-bump workflow; developers do not edit `catalogue.ts` manually.

**Rationale**: The codepoints file is a plain-text map of `icon_name hex_codepoint` pairs (one per line). Parsing it into a `string[]` literal and emitting a TypeScript union type is trivial. The type is ~2,500+ members but tree-shaken at compile time — it contributes only to typechecking, not to runtime bundle size.

**Alternatives considered**:
- *Manual maintenance* — rejected; error-prone and stale within a single Google release cycle.
- *Runtime validation against a fetched list* — rejected; violates FR-010 (offline-capable).

---

## Decision 4: Two Tone rendering strategy

**Decision**: The Two Tone variant is rendered as **two overlapping `Text` glyphs** using the `MaterialIcons-TwoTone` font file. The primary glyph renders at 100% opacity; a second, identical glyph is placed absolutely behind or above it at 40% opacity. The `color` prop controls the primary layer; the secondary layer derives its color from the same value at 40% opacity via `rgba` / `opacity` composition — no additional prop required.

**Rationale**: The `MaterialIcons-TwoTone` font encodes a single Unicode glyph per icon. The two-tone visual effect on the web is achieved via CSS `opacity`. In React Native the equivalent is an `<Animated.View>` wrapper with two `<Icon>` glyphs — outer at 100% opacity, inner at `opacity={0.4}`. This matches the spec decision (FR-009b) exactly.

**Alternatives considered**:
- *Single glyph at blended color* — rejected; loses the two-tone visual effect entirely.
- *Secondary color prop* — deferred per spec decision; adds API surface; 40% opacity approximation is visually adequate.

---

## Decision 5: Theme color resolution pattern for standalone rendering

**Decision**: Use `useContext(ThemeContext)` directly in `MaterialIcon` instead of `useTheme()`. When the context is `null` (no `ThemeProvider` in the tree), fall back to `'#000000'` and emit a `__DEV__` warning.

**Rationale**: The spec (FR-009) requires graceful fallback to `#000000` with a dev-mode warning when no `ThemeProvider` is present. The existing `useTheme()` hook **throws** when called outside a provider — wiring that throw-path into `MaterialIcon` would crash standalone usages (e.g., third-party renderings, deep-link screens that skip the app's theme tree). `useContext(ThemeContext)` returns `null` safely, enabling a clean null-check before accessing theme values.

**Implementation**:
```ts
// CONSTITUTION-EXCEPTION: useContext instead of useTheme — see FR-009 and constitution.md II
const ctx = useContext(ThemeContext);
if (__DEV__ && ctx === null) {
  console.warn('[mui-native] MaterialIcon: no ThemeProvider found, falling back to #000000');
}
const resolvedColor = color ?? ctx?.theme.colorScheme.onSurface ?? FALLBACK_COLOR;
```

**Alternatives considered**:
- *`try { const { theme } = useTheme(); } catch { ... }`* — rejected; wrapping a React hook call in `try/catch` is explicitly an anti-pattern (hooks must not be called conditionally or in error-catch paths per the Rules of Hooks). Functionally equivalent but architecturally unsound.
- *Asserting non-null `ThemeProvider` (no fallback)* — rejected; violates FR-009 which explicitly requires standalone rendering to not crash.

**Constitution note**: This decision is covered by the `useContext(ThemeContext)` exception clause added to constitution.md Principle II. The theme is still consumed when present — this is not an exemption from Theme-First Architecture.
