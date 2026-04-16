# Data Model: Platform-Inspired Themes (`012-platform-themes`)

**Date**: 2026-04-14  
**Branch**: `012-platform-themes`  
**Source**: `specs/012-platform-themes/spec.md` + `research.md`

---

## Entity Catalogue

### 1. `Theme` (existing — extended)

**File**: `src/theme/types.ts`  
**Change**: Add one optional field; all existing fields unchanged.

```typescript
export interface Theme {
  colorScheme: ColorScheme;          // (existing) light-mode palette
  darkColorScheme?: Partial<ColorScheme>; // (NEW) dark-mode overrides; absent = use colorScheme
  typography: TypographyScale;       // (existing)
  shape: ShapeScale;                 // (existing)
  elevation: ElevationScale;         // (existing)
  mode: ColorMode;                   // (existing) 'light' | 'dark'
  components?: ComponentsConfig;     // (existing, optional)
}
```

**Validation rules**:
- `colorScheme` must satisfy the full `ColorScheme` interface (50 roles).
- `darkColorScheme` is `Partial<ColorScheme>` — any subset of roles is valid; missing roles fall back to `colorScheme` values at runtime.
- `mode` on a preset object is always `'light'` (the preset declares its default appearance mode).

**Backward compatibility**: Adding an optional field is non-breaking; all existing callers/consumers of `Theme` require no changes.

---

### 2. `PlatformThemePreset` (conceptual alias — no new TS type exported)

This is the conceptual name for theme objects that carry both `colorScheme` and `darkColorScheme`. In TypeScript they simply satisfy `Theme` (since `darkColorScheme` is now an optional field on `Theme`).

```typescript
// Conceptual shape — all 7 exported presets conform to this
const examplePreset: Theme = {
  mode: 'light',
  colorScheme: { /* full 50-role light palette */ },
  darkColorScheme: { /* partial dark overrides — only changed roles */ },
  typography: { /* 15-style MD3 scale using platform font family */ },
  shape: { /* 7-level border-radius scale with platform-specific values */ },
  elevation: { /* 6-level shadow scale */ },
};
```

---

### 3. `ThemeProvider` (existing — modified behavior)

**File**: `src/theme/ThemeProvider.tsx`  
**Changes**:
1. When `mode` prop is `undefined`, initialize state from `Appearance.getColorScheme() ?? 'light'`.
2. Subscribe to `Appearance.addChangeListener` in `useEffect`; unsubscribe on cleanup.
3. When computing the active `colorScheme` for context, merge `darkColorScheme` when `mode === 'dark'`.

**State transitions**:

```
[Mount]
  ├─ mode prop provided → use prop value (controlled)  
  └─ mode prop absent   → read Appearance.getColorScheme() → subscribe to changes

[System dark/light change fires (only when mode prop absent)]
  └─ Appearance listener → setMode('light' | 'dark') → context re-render

[Developer calls setMode('dark')]
  └─ setModeState('dark') → context re-render

[theme prop changes]
  └─ useMemo recalculates effective colorScheme → context re-render
```

**Effective color scheme logic** (derived, not stored):
```typescript
const effectiveColorScheme =
  mode === 'dark' && resolvedTheme.darkColorScheme
    ? { ...resolvedTheme.colorScheme, ...resolvedTheme.darkColorScheme }
    : resolvedTheme.colorScheme;
```

---

### 4. The 7 Platform Theme Preset Objects

Each is a `const` declaration of type `Theme`, located at `src/theme/presets/<Name>.ts`.

#### 4a. `iPhoneTheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#007AFF` (iOS system blue) |
| `colorScheme.secondary` | `#34C759` (iOS System Green) |
| `colorScheme.background` | `#F2F2F7` (grouped-table grey) |
| `colorScheme.surface` | `#FFFFFF` |
| `darkColorScheme` | background `#000000`, surface `#1C1C1E`, onBackground `#FFFFFF` |
| `typography.fontFamily` | `'SF Pro Display', 'SF Pro Text', System` |
| `shape.full` | 9999 (pill); `extraLarge` 22dp, `large` 18dp, `medium` 14dp |

#### 4b. `UbuntuTheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#E95420` (Ubuntu orange) |
| `colorScheme.secondary` | `#772953` (Aubergine) |
| `colorScheme.background` | `#FFFFFF` |
| `darkColorScheme` | background `#300A24` (Ubuntu dark aubergine), surface `#1F0A1A` |
| `typography.fontFamily` | `'Ubuntu', sans-serif` |
| `shape.medium` | 8dp; `large` 12dp; `full` 9999 |

#### 4c. `MAUITheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#0078D4` (Microsoft blue) |
| `colorScheme.background` | `#FFFFFF` |
| `colorScheme.surface` | `#F5F5F5` |
| `darkColorScheme` | background `#1F1F1F`, surface `#2D2D2D`, primary `#2B88D8` |
| `typography.fontFamily` | `'Segoe UI', sans-serif` |
| `shape.medium` | 4dp; `large` 6dp; `extraLarge` 8dp |

#### 4d. `Windows11Theme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#0078D4` (Fluent Design blue) |
| `colorScheme.secondary` | `#8764B8` (purple accent) |
| `colorScheme.background` | `#F3F3F3` (Mica/acrylic light) |
| `darkColorScheme` | background `#202020` (Mica dark), surface `#2C2C2C` |
| `typography.fontFamily` | `'Segoe UI Variable', 'Segoe UI', sans-serif` |
| `shape.medium` | 4dp; `large` 8dp; `extraLarge` 8dp |

#### 4e. `macOSTheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#007AFF` (macOS Aqua blue) |
| `colorScheme.secondary` | `#5856D6` (indigo) |
| `colorScheme.background` | `#ECECEC` (window chrome grey) |
| `darkColorScheme` | background `#1E1E1E`, surface `#2A2A2A`, onBackground `#FFFFFF` |
| `typography.fontFamily` | `'SF Pro', 'SF Pro Display', System` |
| `shape.medium` | 6dp; `large` 10dp; `extraLarge` 16dp |

#### 4f. `FacebookTheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#1877F2` (Meta blue) |
| `colorScheme.secondary` | `#42B72A` (green CTA) |
| `colorScheme.background` | `#FFFFFF` |
| `darkColorScheme` | background `#18191A`, surface `#242526`, onBackground `#E4E6EB` |
| `typography.fontFamily` | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| `shape.medium` | 6dp; `large` 8dp; `extraLarge` 10dp |

#### 4g. `TikTokTheme`
| Token Group | Key Characteristics |
|---|---|
| `colorScheme.primary` | `#FE2C55` (TikTok pink-red) |
| `colorScheme.secondary` | `#25F4EE` (TikTok cyan) |
| `colorScheme.background` | `#FFFFFF` |
| `darkColorScheme` | background `#121212`, surface `#1E1E1E`, onBackground `#FFFFFF` |
| `typography.fontFamily` | `'ProximaNova', 'Proxima Nova', sans-serif` |
| `shape.medium` | 20dp; `large` 24dp; `extraLarge` 32dp |

---

## Relationships

```
Theme (extended)
  └── darkColorScheme?: Partial<ColorScheme>   [NEW optional field]

ThemeProvider (modified)
  ├── reads: theme.colorScheme                  [always]
  ├── reads: theme.darkColorScheme              [when mode='dark', if present]
  ├── reads: Appearance.getColorScheme()        [on mount when mode prop absent]
  └── subscribes: Appearance.addChangeListener [when mode prop absent]

src/theme/presets/index.ts
  └── exports: iPhoneTheme, UbuntuTheme, MAUITheme,
               Windows11Theme, macOSTheme, FacebookTheme, TikTokTheme

src/index.ts
  └── re-exports: all 7 from src/theme/presets/index.ts
```

---

## State Transitions

### ThemeProvider mode resolution

```
Initial render
  ├── mode prop !== undefined  →  mode = prop value (CONTROLLED)
  │     └── Appearance changes ignored for mode
  └── mode prop === undefined  →  mode = Appearance.getColorScheme() ?? 'light' (UNCONTROLLED)
        └── Appearance.addChangeListener active → updates mode on system change

Developer calls setMode(newMode) → mode state updates → context value re-computed
Developer changes mode prop → effect re-runs → if now controlled, removes listener
```

---

## Validation Rules

| Rule | Where Enforced |
|---|---|
| All 50 `ColorScheme` roles present in `colorScheme` | TypeScript compile-time (full `ColorScheme` type) |
| `darkColorScheme` keys are valid `ColorScheme` role names | TypeScript compile-time (`Partial<ColorScheme>`) |
| `mode` on preset = `'light'` | By convention (enforced by unit test assertions) |
| All required `TypographyScale` styles present (15 styles) | TypeScript compile-time |
| All `ShapeScale` levels defined | TypeScript compile-time |
| All `ElevationScale` levels defined | TypeScript compile-time |
| `onBackground`/`onSurface` contrast ≥ 4.5:1 vs background/surface | Unit test (WCAG check) |
