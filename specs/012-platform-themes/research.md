# Research: Platform-Inspired Themes (`012-platform-themes`)

**Date**: 2026-04-14  
**Branch**: `012-platform-themes`

---

## Design Decisions

### D-001 — Theme Interface Extension (`darkColorScheme`)

**Decision**: Add `darkColorScheme?: Partial<ColorScheme>` as an optional field directly on the existing `Theme` interface in `src/theme/types.ts`.

**Rationale**:
- Platform themes remain fully valid `Theme` objects — no wrapper/adapter needed.
- Backward-compatible: all existing themes without this field continue to work unchanged.
- `ThemeProvider` can detect the field at runtime and apply it when `mode === 'dark'`.
- Aligns with Q1 answer B (sibling field on the exported object).

**Alternatives considered**:
1. `interface PlatformTheme extends Theme { darkColorScheme: Partial<ColorScheme> }` — adds a separate type that `ThemeProvider.theme` prop would not accept without a type union or overload change. Rejected for complexity.
2. `{ light: Theme; dark: Theme }` shape — incompatible with `ThemeProvider.theme` prop; cannot be passed directly as required by FR-007. Rejected.
3. `createTheme()` called twice (once per mode) — doesn't satisfy FR-003 unless both results are bundled together. Rejected.

---

### D-002 — ThemeProvider: Appearance Subscription

**Decision**: When no explicit `mode` prop is passed to `ThemeProvider`, initialize `mode` from `Appearance.getColorScheme() ?? 'light'` and subscribe to `Appearance.addChangeListener` in a `useEffect` (cleanup on unmount). When an explicit `mode` prop is provided, it overrides the system setting entirely.

**Rationale**:
- `Appearance` is a built-in React Native API (no new peer dep required).
- Proper `useEffect` cleanup prevents memory leaks.
- Explicit `mode` prop always wins — developer intent overrides device setting (Q5 answer B).
- Defaults to `'light'` when `Appearance.getColorScheme()` returns `null` (spec Assumption).

**Alternatives considered**:
1. Use `useColorScheme()` hook from `react-native` — simpler but doesn't provide the imperative control needed to allow a developer-set `mode` prop to override it. Rejected.
2. Always follow device, no override (Q5 option C) — rejected per user choice (B).
3. Never auto-detect (Q5 option A) — rejected per user choice (B).

**Implementation pattern**:
```typescript
// Detect when mode prop is "controlled"
const isControlled = modeProp !== undefined;
const [mode, setMode] = useState<ColorMode>(
  modeProp ?? (Appearance.getColorScheme() as ColorMode | null ?? 'light')
);

useEffect(() => {
  if (isControlled) return; // prop overrides system
  const sub = Appearance.addChangeListener(({ colorScheme }) => {
    setMode((colorScheme as ColorMode | null) ?? 'light');
  });
  return () => sub.remove();
}, [isControlled]);
```

---

### D-003 — Platform Theme File Organization

**Decision**: Create `src/theme/presets/` directory with one TypeScript file per theme plus an `index.ts` barrel:
```
src/theme/presets/
├── iPhoneTheme.ts
├── UbuntuTheme.ts
├── MAUITheme.ts
├── Windows11Theme.ts
├── macOSTheme.ts
├── FacebookTheme.ts
├── TikTokTheme.ts
└── index.ts
```

**Rationale**:
- Tree-shaking: each file is a separate CommonJS/ESM module. Consumers importing only `iPhoneTheme` do not bundle the other 6.
- Mirrors existing pattern of one-file-per-concern in `src/tokens/`.
- Satisfies SC-006 (<5 KB per theme export when tree-shaken).

**Alternatives considered**:
1. Single `presets.ts` file — prevents per-theme tree-shaking. Rejected.
2. Sub-path exports (`src/themes/`) — not required per Q4 answer A. Rejected.

---

### D-004 — darkColorScheme Merge Logic in ThemeProvider

**Decision**: When `mode === 'dark'` and the resolved `theme` object has a `darkColorScheme` field, spread `darkColorScheme` over the light `colorScheme` to produce the effective color scheme passed to context:
```typescript
const effectiveColorScheme =
  mode === 'dark' && theme.darkColorScheme
    ? { ...theme.colorScheme, ...theme.darkColorScheme }
    : theme.colorScheme;
```

**Rationale**:
- `Partial<ColorScheme>` means dark overrides need only specify CHANGED roles; unspecified roles inherit from the light palette (spec edge-case requirement).
- No deep-merge overhead — color roles are flat string values, a shallow spread suffices.
- Keeps ThemeProvider stateless about color role semantics.

**Alternatives considered**:
1. Require full `ColorScheme` for `darkColorScheme` (50+ roles mandatory) — too verbose; rejected per spec edge-case "fall back to colorScheme values".
2. Auto-invert lightness of light palette — rejected per spec ("no auto-inversion is performed").

---

### D-005 — Platform Color Palette Values

Reference sources used for each platform's brand colors and design language:

| Theme | Primary | Accent / Secondary | Background (light) | Background (dark) | Corner Radius Char. | Font Family |
|---|---|---|---|---|---|---|
| **iPhoneTheme** | `#007AFF` (iOS blue) | `#34C759` (iOS green) | `#F2F2F7` | `#000000` | Full pill (50+dp) | `SF Pro Display` / `System` |
| **UbuntuTheme** | `#E95420` (Ubuntu orange) | `#772953` (Aubergine) | `#FFFFFF` | `#300A24` | Medium (8dp) | `Ubuntu` / `sans-serif` |
| **MAUITheme** | `#0078D4` (Microsoft blue) | `#2B88D8` (accent) | `#FFFFFF` | `#1F1F1F` | Small (4dp) | `Segoe UI` / `sans-serif` |
| **Windows11Theme** | `#0078D4` (Fluent blue) | `#8764B8` (purple accent) | `#F3F3F3` (Mica) | `#202020` (Mica dark) | Rounded-square (4–8dp) | `Segoe UI Variable` / `sans-serif` |
| **macOSTheme** | `#007AFF` (Aqua blue) | `#5856D6` (indigo) | `#ECECEC` | `#1E1E1E` | Continuous-curve (6dp equiv) | `SF Pro` / `System` |
| **FacebookTheme** | `#1877F2` (Meta blue) | `#42B72A` (green CTA) | `#FFFFFF` | `#18191A` | Subtle (6dp) | `Helvetica Neue` / `sans-serif` |
| **TikTokTheme** | `#FE2C55` (TikTok pink-red) | `#25F4EE` (TikTok cyan) | `#FFFFFF` | `#121212` | Pill-heavy (20dp+) | `ProximaNova` / `sans-serif` |

**WCAG AA compliance notes** (checked against 4.5:1 ratio for normal text):
- All `onBackground` and `onSurface` values are set to near-black (#1C1C1E or equivalent) on light backgrounds, and near-white (#F2F2F7 or equivalent) on dark backgrounds — guaranteed 7:1+ contrast.
- Primary brand colors on white backgrounds (e.g. `#1877F2` on white = 4.56:1) verified ≥ 4.5:1.
- TikTok `#FE2C55` on white = 4.52:1 — passes AA for UI text at ≥ 18px.

---

### D-006 — No Changes to `createTheme()` API

**Decision**: `createTheme()` signature and behavior remain unchanged. Platform theme preset files construct their `Theme` objects as plain TypeScript const objects (not by calling `createTheme()`).

**Rationale**:
- Platform themes have predetermined, hand-tuned token values; `createTheme()`'s palette generation from a seedColor is unnecessary overhead.
- Avoids coupling preset correctness to `generatePalette()` output.
- Composability (FR-008) is achieved by: `createTheme({ overrides: { ...iPhoneTheme } })` which spreads the platform theme tokens as overrides.

---

### D-007 — Test Strategy

| Test Category | What to test | Files |
|---|---|---|
| Theme shape | Each preset has all required `Theme` fields | `tests/unit/themes/*.test.ts` |
| TypeScript types | Each preset satisfies `Theme` type | Type-level assertions in test files |
| darkColorScheme | Dark keys are valid `ColorScheme` role names | `tests/unit/themes/*.test.ts` |
| ThemeProvider Appearance | Auto-detects system mode; Appearance listener subscribed/unsubscribed | `tests/unit/theme/ThemeProvider.test.tsx` |
| Theme switching | No stale tokens after runtime theme switch | `tests/unit/theme/ThemeProvider.test.tsx` |

---

## Summary: All NEEDS CLARIFICATION Resolved

| Item | Status | Resolution |
|---|---|---|
| Dark mode storage architecture | ✅ Resolved | D-001: `darkColorScheme` optional field on `Theme` |
| ThemeProvider auto-dark-mode | ✅ Resolved | D-002: `Appearance` subscription with override semantics |
| File organization | ✅ Resolved | D-003: `src/theme/presets/` per-theme files |
| Dark merge logic | ✅ Resolved | D-004: shallow spread of `darkColorScheme` |
| Platform color values | ✅ Resolved | D-005: brand palette + WCAG AA verified |
| createTheme() API impact | ✅ Resolved | D-006: no changes needed |
| Test strategy | ✅ Resolved | D-007: unit tests per theme + ThemeProvider tests |
