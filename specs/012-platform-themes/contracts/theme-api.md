# Public API Contracts: Platform-Inspired Themes (`012-platform-themes`)

**Date**: 2026-04-14  
**Library**: `mui-native`  
**Import path**: `import { ... } from 'mui-native'`

---

## 1. Updated `Theme` Interface Contract

**File**: `src/theme/types.ts`

```typescript
/**
 * MUI Native theme object.
 * The `darkColorScheme` field is new — optional and backward-compatible.
 * When present and `mode === 'dark'`, ThemeProvider merges it over `colorScheme`.
 */
export interface Theme {
  /** Light-mode (or default) color palette — 50 MD3 + extended roles. */
  colorScheme: ColorScheme;

  /**
   * Dark-mode overrides for `colorScheme`.
   * Partial: only changed roles need to be specified.
   * When absent, `colorScheme` is used for both light and dark mode.
   * @since 012-platform-themes
   */
  darkColorScheme?: Partial<ColorScheme>;

  /** MD3 typography — 15 type styles (displayLarge → labelSmall). */
  typography: TypographyScale;

  /** Border-radius scale — none / extraSmall / small / medium / large / extraLarge / full. */
  shape: ShapeScale;

  /** Elevation shadow scale — level0 through level5. */
  elevation: ElevationScale;

  /** Active color mode. Defaults to 'light'. */
  mode: ColorMode;

  /** Per-component style overrides (optional). */
  components?: ComponentsConfig;
}
```

**Backward-compat guarantee**: All existing code that reads from `Theme` is unaffected — no field is removed or renamed; `darkColorScheme` is optional.

---

## 2. Named Theme Exports

All 7 presets are exported as named `const`s from the library root:

```typescript
import {
  iPhoneTheme,
  UbuntuTheme,
  MAUITheme,
  Windows11Theme,
  macOSTheme,
  FacebookTheme,
  TikTokTheme,
} from 'mui-native';
```

Each export satisfies the `Theme` interface.

### 2a. Export Map

| Export name | File | Platform |
|---|---|---|
| `iPhoneTheme` | `src/theme/presets/iPhoneTheme.ts` | Apple iOS / iPhone |
| `UbuntuTheme` | `src/theme/presets/UbuntuTheme.ts` | Canonical Ubuntu |
| `MAUITheme` | `src/theme/presets/MAUITheme.ts` | Microsoft .NET MAUI |
| `Windows11Theme`| `src/theme/presets/Windows11Theme.ts` | Microsoft Fluent 2 / Windows 11 |
| `macOSTheme` | `src/theme/presets/macOSTheme.ts` | Apple macOS |
| `FacebookTheme` | `src/theme/presets/FacebookTheme.ts` | Meta / Facebook |
| `TikTokTheme` | `src/theme/presets/TikTokTheme.ts` | TikTok / ByteDance |

### 2b. Common Preset Shape

Every preset has the following shape (TypeScript type: `Theme`):

```typescript
const <Name>Theme: Theme = {
  mode: 'light',                    // preset default mode
  colorScheme: { /* all 50 roles */  },
  darkColorScheme: { /* partial overrides for dark mode */ },
  typography: { /* all 15 styles with platform font family */ },
  shape: { /* 7 levels: none/extraSmall/small/medium/large/extraLarge/full */ },
  elevation: { /* level0 through level5 */ },
};
```

---

## 3. Updated `ThemeProviderProps` Contract

**File**: `src/theme/types.ts`

```typescript
export interface ThemeProviderProps {
  /**
   * Platform theme or partial theme overrides.
   * Pass one of the 7 named theme presets, or a custom DeepPartial<Theme>.
   * If a preset with `darkColorScheme` is passed, dark mode colors are handled automatically.
   */
  theme?: DeepPartial<Theme>;

  /**
   * Explicitly set the color mode.
   * When omitted, ThemeProvider auto-detects the system setting via
   * `Appearance.getColorScheme()` and subscribes to system changes.
   * @since 012-platform-themes (auto-detect behavior is new)
   */
  mode?: ColorMode;

  children: React.ReactNode;
}
```

**New `ThemeProvider` behavior** (no prop-level change — behavior change only):
- When `mode` prop is `undefined`: reads `Appearance.getColorScheme()` on mount; subscribes to system color scheme changes via `Appearance.addChangeListener`; unsubscribes on unmount.
- When `mode` prop is defined: controlled mode; Appearance subscription is inactive.

---

## 4. `ThemeContext` Value Contract

**File**: `src/theme/types.ts` — `ThemeContextValue` interface  
**No change to this interface**.  
The `effectiveColorScheme` (dark-merged when applicable) is already reflected in `theme.colorScheme` by the time it enters context:

```typescript
// Inside ThemeProvider useMemo — context consumers see merged colorScheme:
const contextTheme: Theme = {
  ...resolvedTheme,
  colorScheme:
    mode === 'dark' && resolvedTheme.darkColorScheme
      ? { ...resolvedTheme.colorScheme, ...resolvedTheme.darkColorScheme }
      : resolvedTheme.colorScheme,
  mode,
};
```

Context consumers (`useTheme()`) always receive a `Theme` where `colorScheme` is the effective palette for the current mode — no consumer needs to know about `darkColorScheme`.

---

## 5. Internal Module Boundaries

```
src/theme/presets/index.ts      → re-exports all 7 Theme objects
src/index.ts                    → adds 7 named exports (tree-shakeable)
tests/unit/themes/              → one test file per theme preset
tests/unit/theme/ThemeProvider.test.tsx → Appearance subscription tests added
```

No new peer dependencies. `Appearance` is a core `react-native` API available since RN 0.62.
