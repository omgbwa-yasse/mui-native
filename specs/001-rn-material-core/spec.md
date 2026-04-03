# Feature Specification: RN-Material Core Framework

**Feature Branch**: `001-rn-material-core`
**Created**: 2026-04-02
**Status**: Draft
**Input**: User description: "Build the RN-Material framework — a React Native component library inspired by Material UI / Material Design 3, with design tokens, ThemeProvider, light/dark mode, and core MD3 components (Button, TextField, Card, AppBar, FAB, Chip, Dialog, BottomSheet). Also leverage @react-native-material/core where it adds value."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install and Render a Themed Button (Priority: P1)

A developer adds RN-Material to their React Native project, wraps the app in
`<ThemeProvider>`, and renders a `<Button variant="filled">` on both iOS and Android.
The button displays with the correct MD3 primary color, shape, and elevation without
the developer writing a single inline style.

**Why this priority**: This is the zero-to-one proof of concept. It validates the entire
pipeline — package installation → token loading → ThemeProvider injection → component
rendering — and constitutes a minimal but working demo of the library's value proposition.

**Independent Test**: Install the package in a fresh Expo project, add `<ThemeProvider>`
at the root, and mount one `<Button variant="filled" onPress={...}>Save</Button>`. The
button must render on both platforms with MD3 primary blue background and white label
without any additional style props.

**Acceptance Scenarios**:

1. **Given** a React Native app with `ThemeProvider` at the root and no custom theme,
   **When** `<Button variant="filled">Save</Button>` is rendered,
   **Then** the button shows a filled surface in the default MD3 primary color (`#1976D2`)
   with white label text on both iOS and Android.

2. **Given** the same setup,
   **When** the developer inspects `src/tokens/colors.ts`,
   **Then** every color value in the rendered button traces back to a named token with
   no hardcoded hex literals in the component file.

3. **Given** the same setup,
   **When** the button is pressed,
   **Then** a ripple/press animation plays smoothly at 60 fps without dropping frames
   on a mid-range Android device.

---

### User Story 2 — Runtime Light/Dark Theme Switch (Priority: P2)

A developer provides a toggle in their app that switches the entire UI between light and
dark mode. All RN-Material components instantly update their colors with no component
unmounting, prop drilling, or re-imports.

**Why this priority**: Theme-First Architecture (Constitution Principle III) is a
foundational promise of the library. Verifying it early prevents downstream rework across
every component.

**Independent Test**: Render a screen containing `Button`, `Card`, and `TextField`.
Toggle the theme from light to dark via a control (e.g., `Switch`). All three components
must visually update within one animation frame; their source files must contain zero
`if (mode === 'dark')` branches.

**Acceptance Scenarios**:

1. **Given** the app is in light mode,
   **When** the user toggles to dark mode,
   **Then** all rendered components switch to the MD3 dark-palette equivalents without
   any visible flicker or flash of the previous theme.

2. **Given** a custom seed color is passed to `ThemeProvider`,
   **When** the app renders,
   **Then** all components use dynamically derived MD3 roles generated from that seed
   color, covering both light and dark variants.

3. **Given** a platform override is defined in the theme (`ios.elevationShadow: ...`),
   **When** the same component renders on iOS vs Android,
   **Then** it uses the platform-specific override on iOS and the default value on
   Android, without branching logic in the component file.

---

### User Story 3 — Build a Full Screen with Core MD3 Components (Priority: P3)

A developer builds a complete feature screen using `AppBar`, `Card`, `TextField`,
`Chip`, `FAB`, `Dialog`, and `BottomSheet`. Every component matches the visual spec of
its MUI v6 counterpart at matching viewport size and follows MD3 interaction patterns
(press states, elevation changes, transitions).

**Why this priority**: This story proves the breadth of the library is sufficient for
real-world screens. It is lower priority than the theming foundation but is the primary
deliverable from a consumer's perspective.

**Independent Test**: Render a "Contact Profile" screen composed of all seven components.
Take reference screenshots side-by-side with an equivalent MUI v6 web screen and verify
visual parity. Each component must also render correctly in Storybook on both platforms.

**Acceptance Scenarios**:

1. **Given** a screen with `AppBar`, `Card`, `TextField` (outlined), and `FAB`,
   **When** the screen renders in light mode,
   **Then** each component's surface color, elevation shadow, and typography match the
   MD3 specification within a 1-dp tolerance.

2. **Given** a `Dialog` is triggered,
   **When** it appears,
   **Then** it animates in with the MD3 container-transform pattern and the background
   is scrim-dimmed per MD3 spec.

3. **Given** a `BottomSheet` is open,
   **When** the user swipes it down,
   **Then** it dismisses with a smooth spring animation driven by a Reanimated worklet,
   and focus returns to the triggering element.

4. **Given** any `Chip` variant (assist, filter, input, suggestion),
   **When** rendered in a list,
   **Then** its selected/unselected state toggles correctly and the state change is
   announced to screen readers via `accessibilityState`.

---

### User Story 4 — Leverage @react-native-material/core for Extended Coverage (Priority: P4)

A developer who has installed `@react-native-material/core` can import components from
that library alongside RN-Material components in the same screen. Both sets of components
share the same `ThemeProvider` context so colors remain consistent.

**Why this priority**: The constitution allows optional peer dependencies for extended
coverage. Interoperability with `@react-native-material/core` broadens the component
catalogue immediately without requiring RN-Material to implement every MD3 component
from scratch in v1.

**Independent Test**: Install both libraries. Render an RN-Material `Button` and a
`@react-native-material/core` `TextInput` on the same screen inside a single
`ThemeProvider`. Both must use the same primary color.

**Acceptance Scenarios**:

1. **Given** both packages are installed and `ThemeProvider` wraps the app,
   **When** an `@react-native-material/core` component is rendered alongside an
   RN-Material component,
   **Then** both use the active theme's primary color without duplicating the
   `ThemeProvider` or passing manual color props.

2. **Given** the developer does NOT install `@react-native-material/core`,
   **When** the app builds,
   **Then** RN-Material builds and runs without errors (peer dependency is truly optional).

---

### User Story 5 — Accessible UI Out of the Box (Priority: P5)

An end-user who relies on a screen reader (VoiceOver on iOS, TalkBack on Android) can
navigate a screen built entirely with RN-Material components without encountering
unlabelled interactive elements or inaccessible touch targets.

**Why this priority**: Accessibility is non-negotiable per the constitution (Principle V)
but is listed last because it augments every other story rather than delivering a
standalone user-visible feature. It must pass before any component is considered "Done".

**Independent Test**: Run an automated accessibility audit (`toBeAccessible` assertions)
against every component in the test suite. Separately, manually navigate the Storybook
stories of all interactive components using VoiceOver on iOS.

**Acceptance Scenarios**:

1. **Given** any interactive RN-Material component (Button, TextField, FAB, Chip),
   **When** inspected via accessibility tooling,
   **Then** it reports the correct `accessibilityRole`, a meaningful `accessibilityLabel`,
   and the current `accessibilityState` (disabled, selected, checked as applicable).

2. **Given** a `Button` is disabled,
   **When** a screen reader focuses it,
   **Then** it announces "Save, button, dimmed" (or OS-equivalent) and the touch action
   is suppressed.

3. **Given** any animated component and the device has "Reduce Motion" enabled,
   **When** the animation would normally play,
   **Then** the component transitions instantly without any motion animation.

---

### Edge Cases

- What happens when `ThemeProvider` is missing from the tree? — Components must throw a
  clear development-mode error: `"RN-Material: useTheme() called outside ThemeProvider"`.
- What happens when a token is deleted from the token file? — TypeScript compilation
  fails immediately (strict typing on token keys prevents silent runtime breakage).
- What happens when `@react-native-material/core` is a different major version? — The
  library must surface a peer-dependency warning at install time; runtime behavior must
  not crash (graceful degradation).
- What happens on RTL layouts (Arabic, Hebrew)? — All components must use logical
  properties (`start`/`end`) rather than `left`/`right` so they mirror correctly.
- What happens when the device font scale is set to 200%? — Typography tokens must use
  relative units; touch targets must remain ≥ 48 dp at all font scales.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The framework MUST expose a complete MD3 design token set covering all
  color roles, the MD3 type scale (Display, Headline, Title, Body, Label sizes), spacing
  scale (4 dp grid), shape tokens (extra-small → extra-large radius), and five elevation
  levels — all defined in `src/tokens/` with zero hardcoded values in component files.

- **FR-002**: The framework MUST expose a `ThemeProvider` component that injects the
  active token set into all descendant components via React context; switching the active
  theme MUST NOT require unmounting components or prop drilling.

- **FR-003**: The framework MUST support both a built-in light theme and a built-in dark
  theme; passing a `mode` prop to `ThemeProvider` MUST switch the palette for all
  descendants instantly.

- **FR-004**: The framework MUST support dynamic color generation from a single seed
  color supplied to `ThemeProvider`, producing all MD3 color roles for both light and
  dark modes.

- **FR-005**: The framework MUST export a fully functional `Button` component supporting
  variants: `text`, `outlined`, `filled` (contained), `tonal`, and `elevated`, each
  matching the corresponding MD3 button style.

- **FR-006**: The framework MUST export a `TextField` component supporting `outlined`
  and `filled` variants with label, helper text, error state, and leading/trailing icon
  slots.

- **FR-007**: The framework MUST export the following components, each matching its MD3
  specification: `Card` (elevated, filled, outlined), `AppBar` (small, medium, large,
  center), `FAB` (small, regular, large, extended), `Chip` (assist, filter, input,
  suggestion), `Dialog` (basic, full-screen), `BottomSheet` (standard, modal),
  `NavigationBar` (with badge support and animated selection indicator).

- **FR-008**: The framework MUST provide a `useTheme()` hook that gives any component
  access to the full active token set; accessing theme values outside `useTheme()` MUST
  produce a TypeScript compilation error.

- **FR-009**: The framework MUST accept `@react-native-material/core` as an optional
  peer dependency and MUST expose a thin adapter that feeds the active RN-Material theme
  into that library's theming context, enabling visual consistency when both libraries
  are used together.

- **FR-010**: Every interactive component MUST set `accessibilityLabel`,
  `accessibilityRole`, and `accessibilityState`; touch targets MUST be at least 48 × 48 dp.

- **FR-011**: All animations (ripple, theme transition, dialog/sheet entry/exit) MUST
  be implemented as Reanimated worklets; no animation logic may run on the JavaScript
  thread.

- **FR-012**: The framework MUST respect the device `reduceMotion` accessibility
  preference and disable all animations when it is enabled.

- **FR-013**: Every component MUST be fully typed in TypeScript with strict mode; the
  public API MUST be exported from a single `index.ts` barrel file.

- **FR-014**: The framework MUST support RTL layouts; all positional styles MUST use
  logical properties (`start`/`end`) rather than `left`/`right`.

### Key Entities

- **Theme**: A complete set of active MD3 token values for one mode (light or dark),
  including color roles, type scale, spacing, shape, elevation, and motion duration.
  Derived either from built-in defaults or from a provided seed color.

- **ThemeProvider**: A React context provider that holds the active `Theme` and exposes
  it to all descendant components via `useTheme()`. Manages mode switching and dynamic
  color derivation.

- **Token**: A named, versioned design value within `src/tokens/` (e.g.,
  `color.primary.main`). Tokens are the atomic unit of the design system — no component
  may reference a raw value that is not a token.

- **Component**: An atomic or composite UI element that exclusively consumes `Theme`
  tokens for all visual properties. Each component has one or more `variant` prop values
  that select a predefined style configuration.

- **Variant**: A named style configuration of a component (e.g., `Button` "filled" vs
  "outlined"). Variants are resolved at render time from token lookups; they contain no
  hardcoded values.

- **Adapter**: A thin bridge layer that maps the active RN-Material `Theme` into the
  expected shape of `@react-native-material/core`'s theme context, enabling mixed use
  of both libraries without visual inconsistency.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can install the package, add `ThemeProvider`, and render a
  working `Button` in under 5 minutes following the quickstart guide (measured by first-
  time use test with three external developers).

- **SC-002**: All 10 core exported elements (ThemeProvider, Button, TextField, Card,
  AppBar, FAB, Chip, Dialog, BottomSheet, NavigationBar) render on both iOS and Android
  without platform-specific layout bugs; visual parity with MD3 reference screenshots is
  confirmed by side-by-side comparison.

- **SC-003**: Theme switching between light and dark completes within one animation
  frame (≤ 16 ms) measured on a mid-range 2024 Android device; no flash or
  intermediate state is visible.

- **SC-004**: 100% of interactive components pass automated accessibility audits
  (`toBeAccessible` assertions green); all touch targets measure ≥ 48 × 48 dp in both
  modes.

- **SC-005**: Zero hardcoded color or size literals (`#`, numeric pixel values, or
  opacity fractions) are found in any component source file — verified by a grep audit
  as part of the CI pipeline.

- **SC-006**: Every component has a Storybook story covering all its variants; all
  stories load and render correctly on both platform simulators.

- **SC-007**: The `@react-native-material/core` adapter produces visually consistent
  colors when confirmed by rendering both a native RN-Material component and an
  `@react-native-material/core` component side-by-side in the same screen under
  identical theme settings.

## Assumptions

- Host applications use React Native ≥ 0.73 and TypeScript with strict mode enabled.
- `react-native-reanimated` (v3+) and `react-native-gesture-handler` (v2+) are
  installed as peer dependencies in the host app; the library will not bundle them.
- Both Expo (managed and bare workflow) and bare React Native projects are supported
  target environments.
- `@react-native-material/core` is an optional peer dependency; the library is fully
  functional without it. The adapter (FR-009) is only active when the peer is present.
- The framework is distributed as an npm package (`rn-material`); monorepo or direct
  source usage is out of scope for this specification.
- Token values for the default theme match MUI v5/v6 defaults (MD3 baseline palette)
  as documented in Prompt.md; divergences require explicit spec-level justification.
- Storybook is used for visual review only; it is not a required runtime dependency.
- Web (React Native Web) support is desirable but out of scope for v1; the API is
  designed to be web-extension-friendly but web rendering is not a success criterion.
