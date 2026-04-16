# Feature Specification: Platform-Inspired Themes

**Feature Branch**: `012-platform-themes`  
**Created**: 2026-04-14  
**Status**: Draft  
**Input**: User description: "Crée moi 5 theme que l'on peut appliquer sur le frame work. inspiré des captures les noms seront [iPhone, Ubuntu, MAUI, Windows11, macOS, Facebook, TikTok]"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Apply a Platform Theme to the Entire App (Priority: P1)

A developer wants their React Native app to instantly adopt the visual identity of a familiar platform (iPhone, macOS, Windows 11, Ubuntu, MAUI, Facebook, or TikTok) by passing a single theme preset to `ThemeProvider`.

**Why this priority**: This is the core deliverable. Every other story depends on themes being importable and applicable.

**Independent Test**: Import `iPhoneTheme` from the library, wrap a sample screen in `<ThemeProvider theme={iPhoneTheme}>`, and verify that all rendered components reflect iOS-style colors, typography, and shapes — without any custom styling on individual components.

**Acceptance Scenarios**:

1. **Given** a fresh React Native app, **When** the developer wraps content with `<ThemeProvider theme={iPhoneTheme}>`, **Then** all child components automatically inherit the iPhone color palette, San Francisco-inspired typography scale, and fully-rounded shapes.
2. **Given** any of the 7 provided themes is applied, **When** a component reads `useTheme()`, **Then** the returned `colorScheme`, `typography`, and `shape` reflect the chosen platform's design language.
3. **Given** a theme is applied, **When** no `mode` prop is provided, **Then** the theme defaults to light mode.

---

### User Story 2 — Switch Between Themes at Runtime (Priority: P2)

A developer wants to let end-users switch between platform themes at runtime (e.g., a settings screen with theme picker), without restarting the app.

**Why this priority**: Enables theme-switcher demonstrations and user customisation flows.

**Independent Test**: Render a `Button` and a `Card` inside a stateful wrapper that toggles between `iPhoneTheme` and `Windows11Theme` on press, and verify both components visibly update their styles on each press.

**Acceptance Scenarios**:

1. **Given** an app with a theme picker UI, **When** the user selects a different platform theme, **Then** all components re-render with the new theme's tokens within the same session.
2. **Given** a theme switch occurs, **When** the previous theme was `TikTokTheme` and the new one is `macOSTheme`, **Then** no theme token from `TikTokTheme` leaks into the components after the switch.

---

### User Story 3 — Support Dark Mode for Each Theme (Priority: P3)

Each platform theme must support a dark mode variant, switchable via the `mode` prop on `ThemeProvider` or the `setMode` function from `useTheme()`.

**Why this priority**: Dark mode is a standard user expectation on all target platforms.

**Independent Test**: Apply `<ThemeProvider theme={macOSTheme} mode="dark">` and verify the background color becomes the macOS dark surface color (near-black) and text becomes near-white.

**Acceptance Scenarios**:

1. **Given** any platform theme, **When** `mode="dark"` is set, **Then** background and surface colors switch to their dark-mode variants while maintaining the platform's brand accent color.
2. **Given** `mode="light"` is set, **When** the user switches to `mode="dark"` at runtime via `setMode("dark")`, **Then** all components reflect dark palette tokens.

---

### User Story 4 — Compose Platform Theme with Custom Overrides (Priority: P4)

A developer wants to start from a platform theme and override specific tokens (e.g. change the primary brand color) without rewriting the whole theme.

**Why this priority**: Enables enterprise and white-label scenarios where a platform theme is the visual base but corporate branding overrides the accent colors.

**Independent Test**: Create `createTheme({ ...iPhoneTheme, overrides: { colorScheme: { primary: '#FF0000' } } })` and verify the `primary` token is `#FF0000` while all other tokens remain unchanged from `iPhoneTheme`.

**Acceptance Scenarios**:

1. **Given** a platform theme object, **When** the developer deep-merges overrides, **Then** only the overridden tokens change; all unspecified tokens come from the base platform theme.
2. **Given** an overridden theme, **When** it is passed to `ThemeProvider`, **Then** components render with the merged values.

---

### User Story 5 — Discover Available Themes via Exports (Priority: P5)

A developer browses the library's public API and can find all 7 platform themes as named exports without reading internal source.

**Why this priority**: Discoverability is essential for adoption. Themes must be first-class exports.

**Independent Test**: Import `{ iPhoneTheme, UbuntuTheme, MAUITheme, Windows11Theme, macOSTheme, FacebookTheme, TikTokTheme }` from the library root and assert each is a valid theme object with at least `colorScheme`, `typography`, `shape`, and `mode` properties.

**Acceptance Scenarios**:

1. **Given** a developer imports from `@mui-native` (or the library root), **When** they destructure theme exports, **Then** all 7 themes are available as named exports.
2. **Given** TypeScript strict mode, **When** a theme export is used, **Then** type-checking passes without explicit casting.

---

### Edge Cases

- What happens when a developer passes a partial platform theme (missing `typography`)? → Must fall back to library defaults for missing tokens.
- What happens when `mode="dark"` is set but the theme only defines light values (no `darkColorScheme`)? → `ThemeProvider` falls back to the `colorScheme` (light) values; no auto-inversion is performed.
- How does the system handle an unknown theme object shape at runtime? → TypeScript types prevent this at compile time; no runtime validation overhead needed.
- What if a user switches themes and one theme has more elevation levels than another? → Elevation tokens must align to the same `ElevationScale` interface; any missing levels default to `0`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The library MUST export 7 named platform theme presets using the **device/product name** convention: `iPhoneTheme`, `UbuntuTheme`, `MAUITheme`, `Windows11Theme`, `macOSTheme`, `FacebookTheme`, `TikTokTheme`. Alternative names (e.g. `iOSTheme`, `AppleTheme`) MUST NOT be used.
- **FR-002**: Each theme MUST be a fully-resolved `Theme` object compatible with the existing `createTheme()` return type, covering `colorScheme`, `typography`, `shape`, `elevation`, and `mode`.
- **FR-003**: Each theme MUST provide both a light-mode and a dark-mode color palette as two sibling fields on the same exported object: `colorScheme` (light values) and `darkColorScheme` (dark values). `ThemeProvider` selects between them based on the active `mode`.
- **FR-004**: Each theme's `colorScheme` MUST cover all 30+ MD3 color roles defined in `ColorScheme` (including the library's extended `success`, `warning`, `info` triads).
- **FR-005**: Each theme's `typography` MUST use a typeface and scale that accurately reflects the target platform's design language.
- **FR-006**: Each theme's `shape` MUST reflect the platform's characteristic border-radius conventions (e.g. pill shapes for iPhone, square-with-subtle-radius for Windows 11).
- **FR-007**: Platform themes MUST be usable as a direct `theme` prop to `ThemeProvider` without any intermediate conversion.
- **FR-008**: Platform themes MUST be composable with `createTheme()` via its `overrides` option so developers can customize individual tokens.
- **FR-009**: All theme exports MUST be fully typed and pass TypeScript strict-mode type checking.
- **FR-010**: All 7 theme presets MUST be exported from the library root (`src/index.ts`) so they are importable as `import { iPhoneTheme } from 'mui-native'`. No sub-path exports (e.g. `mui-native/themes`) are required.
- **FR-011**: When `ThemeProvider` is rendered **without** an explicit `mode` prop, it MUST automatically read `Appearance.getColorScheme()` from React Native to determine the active mode (`'light'` or `'dark'`). When an explicit `mode` prop is provided, that value MUST take precedence over the system setting. The provider MUST subscribe to `Appearance` change events and re-render if the system theme changes while no explicit `mode` prop is set.

### Key Entities

- **PlatformTheme**: A fully-resolved `Theme` object (see existing `Theme` interface) with `colorScheme`, `typography`, `shape`, `elevation`, `mode`, and optional `components` fields — built specifically to reflect a target platform's design language.
- **ColorScheme**: 30+ MD3 color role tokens mapped to platform-specific hex values. Each `PlatformTheme` carries two instances: `colorScheme` for light mode and `darkColorScheme` for dark mode. `ThemeProvider` switches between them automatically based on `mode`.
- **TypographyScale**: Font families and size/weight/line-height ramp; each platform theme maps these to the platform's native typeface (or closest cross-platform equivalent).
- **ShapeScale**: Border-radius values for small, medium, large, and extra-large surface sizes; each platform theme expresses its characteristic corner style.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 7 platform themes are importable and applicable with a **single line change** — replacing the `theme` prop on `ThemeProvider` — with no other modifications needed in consuming code.
- **SC-002**: 100% of the library's existing unit tests continue to pass after adding platform themes.
- **SC-003**: Each theme object is fully typed; zero TypeScript `any` types or compiler errors in strict mode.
- **SC-004**: Each theme's color contrast ratio between primary text and background meets **WCAG AA** (4.5:1 for normal text) in both light and dark modes.
- **SC-005**: Switching between any two platform themes at runtime does not cause a full app re-mount — only a context re-render at the `ThemeProvider` level.
- **SC-006**: Each theme export adds less than **5 KB** to the bundled output (tree-shaken; consumers only pay for the themes they import).
- **SC-007**: A developer can apply any platform theme with no `mode` prop and the app automatically renders in light or dark mode matching the device system setting, within one context re-render cycle.

## Assumptions

- **7 themes in scope**: All 7 names provided by the user are implemented in this version: **iPhoneTheme**, **UbuntuTheme**, **MAUITheme**, **Windows11Theme**, **macOSTheme**, **FacebookTheme**, **TikTokTheme**.
- **iPhoneTheme secondary color**: `colorScheme.secondary` is iOS System Green (`#34C759`); see `data-model.md §4a` for the complete `iPhoneTheme` palette reference.
- **No system font loading**: Platform themes reference typeface *names* only (e.g. `"SF Pro"`, `"Ubuntu"`, `"Segoe UI"`). Actual font loading is the hosting app's responsibility; the theme does not bundle or load fonts.
- **Existing `createTheme()` API is not changed**: Platform themes are built using the existing `createTheme()` and `deepMerge` mechanisms; no new public API is introduced.
- **No new peer dependencies**: All platform theme values are static JSON-like objects; no external theming engine or color generation library is added beyond what already exists (`generatePalette`).
- **Light mode is the default for explicit themes**: Each exported theme object has `mode: 'light'`; when no `mode` prop is passed to `ThemeProvider`, the active mode is resolved from `Appearance.getColorScheme()` (defaulting to `'light'` if the system returns `null`).
- **Showcase app integration is out of scope for this spec**: Adding theme selection to the showcase app is a follow-on feature.
- **No i18n/RTL impact**: Themes affect visual tokens only; layout direction is unaffected.
- **`darkColorScheme` field**: Each platform theme export object carries a `darkColorScheme` field (same `ColorScheme` type) alongside `colorScheme`. `ThemeProvider` uses `darkColorScheme` when `mode="dark"` is active.

## Clarifications

### Session 2026-04-14

- Q: How should dark-mode color values be stored on a platform theme object? → A: Option B — each theme exports a single object carrying both `colorScheme` (light palette) and `darkColorScheme` (dark palette) fields; `ThemeProvider` selects between them based on the active `mode`.
- Q: How many themes should be delivered in this version — 5 or all 7 originally named? → A: All 7 — iPhoneTheme, UbuntuTheme, MAUITheme, Windows11Theme, macOSTheme, FacebookTheme, TikTokTheme.
- Q: What naming convention should theme exports use (device/product name vs OS name vs brand name)? → A: Device/product name — `iPhoneTheme`, `macOSTheme`, `UbuntuTheme`, `Windows11Theme`, `MAUITheme`, `FacebookTheme`, `TikTokTheme`.
- Q: Where should platform themes be importable from — library root or a sub-path? → A: Library root — `import { iPhoneTheme } from 'mui-native'`; no sub-path export needed.
- Q: Should `ThemeProvider` auto-follow device dark/light mode when no `mode` prop is set? → A: Yes — auto-detect via `Appearance.getColorScheme()` when `mode` is unset; explicit `mode` prop always overrides.
