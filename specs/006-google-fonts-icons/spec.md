# Feature Specification: Google Fonts Material Icons Integration

**Feature Branch**: `006-google-fonts-icons`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "https://fonts.google.com/icons importe les icones et intègre dans le framework"

## Clarifications

### Session 2026-04-03

- Q: Which peer-dependency icon library should the framework integrate with? → A: `react-native-vector-icons` — most widely adopted, ships all 5 Material Icon font families (`MaterialIcons`, `MaterialCommunityIcons`), offline-capable via native font linking, not restricted to any specific host workflow.
- Q: How should the Two Tone variant's second color be determined? → A: The secondary layer is always rendered at 40% opacity of the primary `color` value — no additional prop required.
- Q: What should happen when the theme provider is absent (no ThemeContext)? → A: Fall back to a hardcoded default color of `#000000` and emit a development-mode warning — mirrors the graceful degradation pattern of the existing `Icon` component.
- Q: What is the icon name catalogue update policy when Google releases new icons? → A: An automated CI script regenerates the `MaterialIconName` TypeScript union from the upstream Google Fonts Material Icons codepoints file (`MaterialIcons-Regular.codepoints`) on each framework release.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use Named Material Icons as Components (Priority: P1)

A developer building a React Native app with this framework wants to display a Material Icon from Google Fonts by simply specifying its name (e.g., "home", "star", "settings"), without having to wire up an external icon library manually. The icon renders at the correct size, inherits the active theme color by default, and supports all 5 Material Icon variants (Filled, Outlined, Rounded, Sharp, Two Tone).

**Why this priority**: This is the core deliverable. Without a named icon API, every developer must build their own integration glue. A string-based `<MaterialIcon name="home" />` API is the minimum useful integration.

**Independent Test**: Can be tested by importing `MaterialIcon` from the package, rendering it inside a test host with a theme provider, and verifying the icon element renders with the correct `name` and default size of 24.

**Acceptance Scenarios**:

1. **Given** the framework is installed, **When** a developer writes `<MaterialIcon name="home" />`, **Then** a Home icon renders at size 24 using the theme's default icon color.
2. **Given** a `variant` prop is supplied, **When** the developer writes `<MaterialIcon name="home" variant="outlined" />`, **Then** the Outlined variant of the Home icon renders.
3. **Given** no `color` prop is supplied, **When** the component is placed inside an active theme, **Then** the icon color resolves to the theme's `onSurface` token.
4. **Given** a `color` prop is explicitly set, **When** the component renders, **Then** the explicit color overrides the theme default.
5. **Given** a `size` prop is supplied, **When** the component renders, **Then** the icon scales to exactly that number of density-independent pixels.

---

### User Story 2 - Source Factory for Composing Icons with the Existing `Icon` Component (Priority: P2)

A developer using the existing render-prop `Icon` component wants to create a `source` value from a Material Icon name rather than writing a full render-prop function. The framework provides a helper (`materialIconSource`) that accepts an icon name and optional variant, returning a valid `IconSource` — composable with the existing `Icon` component without any breaking changes.

**Why this priority**: The existing `Icon` component is already adopted across the codebase (AppBar, Buttons, etc.). A backward-compatible bridge keeps continuity and avoids migration cost for existing usages.

**Independent Test**: Can be tested by calling `materialIconSource("star", "outlined")` and verifying it returns a function that, when invoked with `{ size: 24, color: "#000" }`, returns a valid React element.

**Acceptance Scenarios**:

1. **Given** `materialIconSource` is imported, **When** called with `("star")`, **Then** it returns an `IconSource`-compatible function.
2. **Given** the returned function is passed as the `source` prop to `<Icon />`, **When** the `Icon` component renders, **Then** the Star icon renders correctly.
3. **Given** a variant is specified in `materialIconSource("star", "rounded")`, **When** rendered, **Then** the Rounded Star icon appears.

---

### User Story 3 - Icon Name Type Safety and Auto-Complete (Priority: P3)

A developer using TypeScript wants auto-complete and type safety when specifying icon names, so typos are caught at build time rather than as silent render failures at runtime. The framework exports a `MaterialIconName` type enumerating the full set of available Google Fonts Material Icon names.

**Why this priority**: Developer-experience improvement built on top of P1/P2. Does not affect runtime behavior but dramatically reduces integration errors.

**Independent Test**: Can be tested by compiling a TypeScript file that assigns an invalid icon name (e.g., `"notanicon"`) and confirming a type error is produced.

**Acceptance Scenarios**:

1. **Given** TypeScript strict mode is active, **When** a developer types an unknown icon name, **Then** a compile-time type error is reported.
2. **Given** a developer uses a known icon name, **When** TypeScript compiles, **Then** no type error is produced.
3. **Given** the `MaterialIconName` type is imported, **When** used to annotate a variable, **Then** auto-complete in IDEs surfaces valid icon names.

---

### User Story 4 - Accessible Icon Labeling (Priority: P3)

A developer implementing accessible screens must be able to label decorative vs. meaningful icons correctly. Icons marked as decorative are hidden from assistive technologies; icons with an `accessibilityLabel` are announced to screen readers. This mirrors the existing `Icon` component's accessibility model.

**Why this priority**: Accessibility is a compliance requirement and must be available from the first release of any icon component.

**Independent Test**: Can be tested by rendering `<MaterialIcon name="home" accessibilityLabel="Navigate home" />` and asserting the element has `accessibilityRole="image"` and the correct label.

**Acceptance Scenarios**:

1. **Given** `accessibilityLabel` is omitted, **When** rendered, **Then** the icon is hidden from accessibility trees (`accessible={false}` and `accessibilityRole="none"`).
2. **Given** `accessibilityLabel="Navigate home"` is set, **When** rendered, **Then** `accessibilityRole="image"` and the label are exposed to assistive technology.

---

### Edge Cases

- **Invalid icon name at runtime**: Component renders a placeholder glyph (provided by the underlying icon library) and emits a development-mode warning (see FR-008). No crash.
- **`size` set to `0` or negative**: Render at the specified value unchanged; no clamping. The host application is responsible for supplying a valid size.
- **No ThemeContext provider**: Component falls back to `#000000` color and emits a dev-mode warning (see FR-009).
- **Two Tone variant in dark mode**: The secondary layer uses primary `color` at 40% opacity regardless of color scheme; no separate dark-mode override is applied at this level.
- **`variant` not available for a specific icon name**: `react-native-vector-icons` gracefully renders a question-mark placeholder glyph when a glyph is absent from the selected font family; no additional handling required at the framework layer.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The framework MUST provide a `MaterialIcon` component that accepts a `name` string, optional `variant`, optional `size`, optional `color`, and optional `accessibilityLabel`.
- **FR-002**: The `MaterialIcon` component MUST support all five Google Fonts Material Icon variants: `filled` (default), `outlined`, `rounded`, `sharp`, and `two-tone`.
- **FR-003**: When `color` is omitted, `MaterialIcon` MUST resolve its color from the active theme's `onSurface` token, consistent with the existing `Icon` component behavior.
- **FR-004**: When `size` is omitted, `MaterialIcon` MUST default to 24 density-independent pixels.
- **FR-005**: The framework MUST export a `materialIconSource` factory function that accepts an icon name and optional variant, and returns a value compatible with the existing `Icon` component's `source` prop (i.e., `IconSource` type).
- **FR-006**: The framework MUST export a `MaterialIconName` TypeScript type representing the union of all valid Google Fonts Material Icon names.
- **FR-007**: The `MaterialIcon` component MUST set `accessibilityRole="image"` and expose the provided label to assistive technologies when `accessibilityLabel` is supplied; otherwise it MUST suppress the element from the accessibility tree.
- **FR-008**: Providing an invalid icon name at runtime MUST NOT crash the application; the component MUST emit a development-mode warning in `__DEV__` mode. The visual fallback (typically a question-mark placeholder) is delegated to `react-native-vector-icons` internals and is explicitly not guaranteed to be identical across library versions — the framework is responsible only for the warning, not the fallback glyph.
- **FR-009**: The `MaterialIcon` component MUST be theme-aware and update its resolved color when the active theme changes without requiring a re-mount. When no `ThemeContext` provider is present, the component MUST fall back to `#000000` as the default color and emit a development-mode warning.
- **FR-009b**: The Two Tone variant MUST render the icon's secondary layer at 40% opacity of the resolved primary `color` value. No additional `secondaryColor` prop is required.
- **FR-010**: All icon assets MUST be available without requiring an active internet connection at runtime (bundled or resolved at build time via `react-native-vector-icons` native font linking). Automated verification: render `<MaterialIcon name="home" />` in a test environment where all `fetch`/`XMLHttpRequest` calls are mocked to reject; assert the component renders without error and without triggering any network call.
- **FR-011**: The icon integration MUST NOT break existing uses of the `Icon` component; no existing public API surface of `Icon` or `IconSource` may change.
- **FR-012**: The `MaterialIcon` component MUST accept a `testID` prop for automated test queries.

### Key Entities

- **MaterialIcon**: A named icon component wrapping the Google Fonts Material Icons catalogue. Attributes: `name`, `variant`, `size`, `color`, `accessibilityLabel`, `testID`.
- **IconVariant**: Enumerated value representing one of the five Material Icon styles — `"filled"`, `"outlined"`, `"rounded"`, `"sharp"`, `"two-tone"`.
- **MaterialIconName**: A TypeScript union type enumerating all valid icon name strings from the Google Fonts Material Icons catalogue (~2,500+ names).
- **IconSource (existing)**: The existing render-prop type `(props: { size: number; color: string }) => ReactElement | null` — unchanged.
- **materialIconSource**: A factory function `(name: MaterialIconName, variant?: IconVariant) => IconSource` bridging named icons with the existing `Icon` component.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: *(design guideline — verified by code review, not automated test)* A developer can place a themed Material Icon on screen in under 5 lines of code with no icon-library boilerplate. See `quickstart.md` for the reference snippet.
- **SC-002**: All 5 icon variants are accessible and visually distinct in a reference storybook story.
- **SC-003**: Providing an unknown icon name produces a compile-time TypeScript error, reducing icon-related typo bugs to 0 at build time.
- **SC-004**: No regression in existing tests — 100% of pre-existing unit and integration tests continue to pass after the feature is merged.
- **SC-005**: Each `MaterialIcon` render completes with no measurable additional overhead above a 5% threshold compared to the existing `Icon` component in benchmark mode.
- **SC-006**: Accessibility acceptance scenarios pass in automated testing for both the labeled and decorative icon cases.
- **SC-007**: The package bundle size increase attributable to icon metadata (name catalogue type) does not exceed 50 KB gzipped.

## Constraints & Tradeoffs

- **Font-based rendering chosen over SVG-direct**: A custom SVG renderer sourced from Google Fonts SVG assets was considered but rejected — it would require shipping ~2,500+ SVG files per variant, significantly increasing bundle size and complexity. `react-native-vector-icons` font files are more compact and integrate via the native font linking that React Native already supports.
- **Adapter pattern deferred**: A library-agnostic adapter interface (where developers plug in their own icon backend) was considered but deferred to a future version. The added abstraction layer increases API surface complexity before the feature has proven adoption.
- **Material Symbols out of scope**: The variable-font Material Symbols set (with optical size/weight/fill/grade axes) is out of scope for this version due to significantly different rendering requirements (custom font metrics, no font family in `react-native-vector-icons`). It can be addressed as a dedicated follow-up feature.

## Assumptions

- The Google Fonts Material Icons catalogue (https://fonts.google.com/icons) refers specifically to **Material Icons** (the classic, stable icon set) covering all 5 variants: Filled, Outlined, Rounded, Sharp, and Two Tone.
- The newer **Material Symbols** (variable-font with customizable optical size/weight/fill/grade axes) are out of scope for this version and may be addressed in a follow-up feature.
- Icon rendering relies on `react-native-vector-icons` as a peer-dependency that the host application installs; the framework ships the integration layer (component, types, factory) but does not bundle the icon fonts themselves. The five Material Icon font families used are: `MaterialIcons` (filled), `MaterialIconsOutlined-Regular` (outlined), `MaterialIconsRound-Regular` (rounded), `MaterialIconsSharp-Regular` (sharp), and `MaterialIconsTwoTone-Regular` (two-tone).
- The `MaterialIconName` type is regenerated automatically via a CI script that fetches the upstream Google Fonts Material Icons codepoints file (`MaterialIcons-Regular.codepoints`) on each framework release — not updated manually.
- The feature targets React Native ≥ 0.73 and TypeScript 5.x strict mode, consistent with the rest of the framework.
- No server-side rendering or dynamic icon fetching at runtime is required; all icons are resolved statically.
- The existing `Icon` component's public API (`source`, `size`, `color`, `accessibilityLabel`, `testID`) remains unchanged — this feature is purely additive.
