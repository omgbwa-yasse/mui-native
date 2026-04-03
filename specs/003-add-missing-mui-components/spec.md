# Feature Specification: Add Missing MUI Components to mui-native

**Feature Branch**: `003-add-missing-mui-components`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "Je veux qu et intègre l'ensemble de composantes qui manquent dans MUI-NATIVE venant de MUI et test tout à la fin, jusqu'avoir 100%"

## Context

Based on the comparative analysis in `docs/mui-comparison.md`, mui-native currently covers ~75% of the MUI component surface. The following implementable components are absent:

| # | Component | MUI Category | Priority |
|---|-----------|-------------|---------|
| 1 | `CircularProgress` | Feedback | P1 |
| 2 | `LinearProgress` | Feedback | P1 |
| 3 | `Popover` | Utils | P1 |
| 4 | `Fade` / `Grow` / `Slide` / `Zoom` / `Collapse` | Utils | P2 |
| 5 | `Popper` | Utils | P2 |
| 6 | `Masonry` | Lab | P3 |
| 7 | `Timeline` + sub-components | Lab | P3 |

Web-only MUI utilities (CSS Baseline, No SSR, Textarea Autosize, useMediaQuery, Click-Away Listener) are explicitly excluded.

---

## Clarifications

### Session 2026-04-03

- Q: What should the default animation `timeout` be for Fade, Grow, Slide, and Zoom when no `timeout` prop is provided? → A: 300ms for both enter and exit (React Native mobile convention).
- Q: When a Transition component is rendered with `in={false}` and neither `mountOnEnter` nor `unmountOnExit` is set, what is the default state of the child? → A: Mounted-but-hidden (child is rendered, visibility suppressed via opacity/scale); children are only unmounted when `unmountOnExit={true}` is explicitly provided.
- Q: Should progress components expose accessibility roles/values by default? → A: Yes — `CircularProgress` and `LinearProgress` must set `accessibilityRole="progressbar"` automatically; determinate variants must also expose `accessibilityValue={{ min: 0, max: 100, now: value }}`.
- Q: Should new components follow the existing mui-native `style` prop pattern or introduce an `sx`-style API? → A: Follow existing pattern — all new components accept a `style` prop (React Native `StyleSheet`-compatible); no `sx` prop (web-only).
- Q: Should `Masonry`'s `columns` prop accept responsive breakpoint objects (like MUI web) or integers only? → A: Integers only — React Native targets mobile-only form factors; breakpoint objects are out of scope.

---

## User Scenarios & Testing

### User Story 1 - Progress Indicators (Priority: P1)

As a developer, I can render circular and linear progress indicators — both in indeterminate and determinate modes — so that users receive clear visual feedback about ongoing or quantified operations.

**Why this priority**: Progress indicators are foundational feedback components used across nearly every mobile app. They unblock the entire feedback category, which is currently absent from mui-native.

**Independent Test**: Can be fully tested by mounting `CircularProgress` and `LinearProgress` with various `variant` and `value` props and asserting the rendered output. Delivers visible loading and progress feedback with zero other components required.

**Acceptance Scenarios**:

1. **Given** `<CircularProgress variant="indeterminate" />` is rendered, **When** the component mounts, **Then** an animated spinning indicator is visible with no explicit value required.
2. **Given** `<CircularProgress variant="determinate" value={75} />` is rendered, **When** the component mounts, **Then** an arc representing 75% completion is displayed.
3. **Given** `<LinearProgress variant="indeterminate" />` is rendered, **When** the component mounts, **Then** an animated bar moving back and forth is visible.
4. **Given** `<LinearProgress variant="determinate" value={40} />` is rendered, **When** the component mounts, **Then** a filled bar representing 40% of the track width is displayed.
5. **Given** `<LinearProgress variant="buffer" value={60} valueBuffer={80} />` is rendered, **When** the component mounts, **Then** a solid fill at 60% and a lighter fill at 80% are both visible.
6. **Given** a `color` prop is provided to either component, **When** the component renders, **Then** the indicator uses the corresponding theme color.
7. **Given** a `size` prop is provided to `CircularProgress`, **When** the component renders, **Then** the diameter of the circle matches the given size value.

---

### User Story 2 - Popover: Anchored Contextual Overlays (Priority: P1)

As a developer, I can render a `Popover` that positions itself relative to a trigger element so that users see contextual content (menus, tooltips, info panels) anchored to the element they interacted with.

**Why this priority**: Popover is the primary UI pattern for contextual overlays (dropdown menus, info tooltips, color pickers). Its absence forces workarounds with plain modals that lose the anchor relationship.

**Independent Test**: Can be fully tested by rendering a `View` with a ref as the anchor element next to a `Popover`, toggling `open`, and asserting that content appears positioned near the anchor. Delivers anchored overlay behavior independently.

**Acceptance Scenarios**:

1. **Given** `<Popover open={false} anchorRef={ref} />`, **When** the component renders, **Then** the popover content is not visible.
2. **Given** `<Popover open={true} anchorRef={ref} />` with `ref` pointing to a rendered `View`, **When** the component mounts, **Then** the popover content is visible and positioned near the anchor.
3. **Given** a popover is open and the user taps outside its bounds, **When** the tap occurs, **Then** the `onClose` callback is called.
4. **Given** `anchorOrigin={{ vertical: "bottom", horizontal: "left" }}`, **When** the popover opens, **Then** the popover top-left corner is aligned to the anchor's bottom-left corner.
5. **Given** `anchorOrigin={{ vertical: "top", horizontal: "right" }}`, **When** the popover opens, **Then** the popover is positioned relative to the anchor's top-right corner.
6. **Given** the parent sets `open={false}` after the user triggers `onClose`, **When** state updates, **Then** the popover content disappears.

---

### User Story 3 - Transition Components (Priority: P2)

As a developer, I can wrap any child element with `Fade`, `Grow`, `Slide`, `Zoom`, or `Collapse` and control visibility with an `in` boolean so that UI elements appear and disappear with smooth, composable animations.

**Why this priority**: Transitions are composable wrappers that elevate the perceived quality of every animated UI interaction. While not individually essential, they enable the remaining overlay components (Popover, Popper) to animate correctly and are expected by developers familiar with MUI.

**Independent Test**: Each transition component can be tested independently by toggling `in` from false to true and asserting visibility changes. Delivers smooth animation behavior for any wrapped child without depending on any other new component.

**Acceptance Scenarios**:

1. **Given** `<Fade in={false}><View /></Fade>` is rendered with no `unmountOnExit` prop, **When** the component mounts, **Then** the child is mounted but not visible (opacity 0); it is not unmounted.
2. **Given** `<Fade in={true}><View /></Fade>` is rendered, **When** `in` transitions to true, **Then** the child fades in to full opacity.
3. **Given** `<Grow in={true}><View /></Grow>` with a `timeout` of 300ms, **When** `in` transitions to true, **Then** the child scales from a small size to full size over 300ms.
4. **Given** `<Slide in={true} direction="up"><View /></Slide>`, **When** `in` transitions to true, **Then** the child slides in from the bottom toward its final position.
5. **Given** `<Zoom in={true}><View /></Zoom>`, **When** `in` transitions to true, **Then** the child scales up from zero to full size.
6. **Given** `<Collapse in={true}><View /></Collapse>` with `orientation="vertical"`, **When** `in` transitions to true, **Then** the child animates from `collapsedSize` (default 0) height to full height.
7. **Given** `<Collapse in={false} collapsedSize={40}><View /></Collapse>`, **When** the component renders, **Then** the collapsed container height is 40 units (not 0).
8. **Given** any transition with `unmountOnExit={true}` and `in={false}`, **When** the exit animation completes, **Then** the child is removed from the render tree.
9. **Given** any transition with `mountOnEnter={true}` and `in={false}` initially, **When** `in` becomes true for the first time, **Then** the child is mounted and enters.

---

### User Story 4 - Popper: Low-Level Anchored Positioning (Priority: P2)

As a developer, I can use `Popper` as a lower-level positioning primitive that places content near an anchor without blocking the rest of the screen so that I can build autocomplete dropdowns, tooltips, and custom overlays that allow background interaction.

**Why this priority**: Popper differs from Popover by omitting the backdrop, making it the correct choice for non-blocking overlays (autocomplete suggestions, tooltips). It completes the overlay positioning API for advanced component composition.

**Independent Test**: Can be independently tested by rendering a `Popper` with `open={true}`, `anchorRef`, and `placement`, and asserting that the content is visible near the anchor and that UI elements behind it remain reachable.

**Acceptance Scenarios**:

1. **Given** `<Popper open={false} anchorRef={ref} />`, **When** the component renders, **Then** its content is not visible.
2. **Given** `<Popper open={true} anchorRef={ref} placement="bottom" />`, **When** the component mounts, **Then** the popper content is visible and positioned below the anchor element.
3. **Given** `placement="top"`, **When** the popper opens, **Then** the content appears above the anchor.
4. **Given** `placement="bottom-start"`, **When** the popper opens, **Then** the content appears below and left-aligned with the anchor start edge.
5. **Given** `disablePortal={true}`, **When** the popper renders, **Then** the content is rendered inline in the component tree rather than in a portal.
6. **Given** a `Popper` is open, **When** the user interacts with a UI element behind the popper, **Then** that interaction is not blocked (no backdrop intercepts touches).

---

### User Story 5 - Masonry Layout (Priority: P3)

As a developer, I can use `Masonry` to arrange children into a multi-column staggered grid that fills columns shortest-first so that content of varying heights is displayed without large gaps.

**Why this priority**: Masonry is a Lab component with niche but distinct use cases (image galleries, card feeds). It is the most self-contained of the P3 items and adds layout flexibility absent from standard Flexbox/Grid.

**Independent Test**: Can be tested independently by rendering a `Masonry` with child views of varying heights, asserting column distribution and that no column is more than one item taller than the shortest column.

**Acceptance Scenarios**:

1. **Given** `<Masonry columns={3}>` with 9 equal-height children, **When** rendered, **Then** each column contains exactly 3 children.
2. **Given** children with varying heights, **When** each child's height is measured, **Then** the next child is placed in the shortest column (column-filling algorithm).
3. **Given** a `spacing` prop, **When** the masonry renders, **Then** a consistent gap equal to `spacing` units is applied between all children.
4. **Given** `defaultColumns={2}` and no `columns` override, **When** the component renders before layout measurement, **Then** children are arranged in 2 columns as the fallback.

---

### User Story 6 - Timeline Component (Priority: P3)

As a developer, I can compose `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, and `TimelineOppositeContent` to render a vertical sequence of events with connecting lines and styled markers so that users can scan through historical or step-by-step content.

**Why this priority**: Timeline is a composable display component for event logs, changelogs, and step-progress UIs. All sub-components are needed together, making this a single cohesive unit rather than independent pieces.

**Independent Test**: Can be fully tested by rendering a `Timeline` wrapping several `TimelineItem` groups and asserting structure, dot colors, connectors, and labels are correctly displayed.

**Acceptance Scenarios**:

1. **Given** a `Timeline` with three `TimelineItem` children, **When** rendered, **Then** items are displayed in a vertical column in order.
2. **Given** a `TimelineSeparator` containing a `TimelineDot` and `TimelineConnector`, **When** rendered within an item, **Then** a dot marker and a vertical connecting line are visible.
3. **Given** `<TimelineDot color="primary" />`, **When** rendered, **Then** the dot displays in the primary theme color.
4. **Given** `<TimelineDot variant="outlined" />`, **When** rendered, **Then** the dot has a border with a transparent fill instead of a solid fill.
5. **Given** a `TimelineItem` with `TimelineOppositeContent` and `TimelineContent`, **When** rendered, **Then** content appears on both the left and right sides of the separator.
6. **Given** `<Timeline position="alternate">`, **When** rendered with multiple items, **Then** item content alternates between left and right sides of the connector line.

---

### User Story 7 - Full Test Suite at 100% (Priority: P1)

As a developer, I can run `npm test` after all components are implemented and see zero failing tests, confirming that every new component is verified and no existing component was regressed.

**Why this priority**: A 100% passing test suite at the end is the primary acceptance gate of the entire feature. Without it, the feature is incomplete regardless of implementation quality.

**Independent Test**: Run `npm test` and observe the output. All tests pass = feature accepted.

**Acceptance Scenarios**:

1. **Given** all 7 component groups are implemented, **When** `npm test` is run, **Then** the output shows 0 failures and all test suites pass.
2. **Given** each new component has its own test file, **When** that test file is run in isolation, **Then** it passes independently.
3. **Given** the 100 pre-existing tests that were passing before this feature, **When** `npm test` is run after implementation, **Then** all 100 of those tests still pass (zero regressions).
4. **Given** each new component's test file, **When** reviewed, **Then** it contains at minimum a render test, a primary props/variants test, and one edge case test.

---

### Edge Cases

- `CircularProgress` with `value` outside 0–100 → value is silently clamped to the valid range; no error or warning is thrown.
- `LinearProgress` with `valueBuffer` less than `value` → buffer fill renders at `value` (treated as minimum); no visual anomaly or throw.
- `Popover` with a null or undefined `anchorRef` → popover does not render and does not throw.
- Transition component with both `unmountOnExit={true}` and `mountOnEnter={true}` toggles `in` → child is properly unmounted after exit and re-mounted on next enter.
- `Masonry` with zero children → renders an empty container with no error.
- `Collapse` with `collapsedSize` set to a negative number → treated as 0 (no negative heights).
- `Timeline` with a single `TimelineItem` containing no `TimelineConnector` → no connector line is rendered; no layout error.

---

## Requirements

### Functional Requirements

- **FR-001**: Package MUST export a `CircularProgress` component accepting `variant` (`indeterminate` | `determinate`), `value` (0–100), `size`, and `color` props.
- **FR-002**: Package MUST export a `LinearProgress` component accepting `variant` (`indeterminate` | `determinate` | `buffer`), `value`, `valueBuffer`, and `color` props.
- **FR-003**: Both progress components MUST silently clamp `value` to [0, 100] when an out-of-range value is supplied.
- **FR-004**: Package MUST export a `Popover` component accepting `open`, `anchorRef` (React ref to a `View`), `onClose`, `anchorOrigin`, and `transformOrigin` props.
- **FR-005**: `Popover` MUST use the anchor element's measured position to calculate its rendered coordinates relative to the screen.
- **FR-006**: `Popover` MUST render its content inside a modal layer so it appears above all other content.
- **FR-007**: Package MUST export five transition components: `Fade`, `Grow`, `Slide`, `Zoom`, and `Collapse`.
- **FR-008**: Each transition component MUST accept an `in` boolean prop that controls the visible / hidden state.
- **FR-009**: Each transition component MUST accept `mountOnEnter` and `unmountOnExit` boolean props controlling child lifecycle.
- **FR-010**: Each transition component MUST accept a `timeout` prop that is either a single number (ms) or an object `{ enter: number; exit: number }` (default: 300ms for both enter and exit when not provided).
- **FR-011**: `Slide` MUST accept a `direction` prop with values `up` | `down` | `left` | `right`.
- **FR-012**: `Collapse` MUST accept an `orientation` prop (`horizontal` | `vertical`) and a `collapsedSize` number prop (default 0).
- **FR-013**: Package MUST export a `Popper` component accepting `open`, `anchorRef`, `placement`, and `disablePortal` props.
- **FR-014**: `Popper` MUST NOT render a backdrop; all touches outside the popper content MUST pass through to elements beneath it.
- **FR-015**: Package MUST export a `Masonry` component accepting `columns` (integer), `spacing`, and `defaultColumns` (integer) props. Responsive breakpoint objects are not supported.
- **FR-016**: Package MUST export all seven `Timeline` composable components: `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, and `TimelineOppositeContent`.
- **FR-017**: `Timeline` MUST accept a `position` prop with values `left` | `right` | `alternate`.
- **FR-018**: `TimelineDot` MUST accept a `variant` prop (`filled` | `outlined`) and a `color` prop.
- **FR-019**: All new components MUST be exported from the package root (`index.ts`).
- **FR-020**: Each new component MUST have a `types.ts` file defining its props interface in TypeScript strict mode with no use of `any` in public APIs.
- **FR-021**: Each new component MUST have a `*.test.tsx` file containing at minimum: a render test, a primary props / variants test, and one edge case test.
- **FR-022**: The full test suite MUST pass at 100% (zero failures, zero regressions on pre-existing tests) after all components are implemented.
- **FR-023**: `CircularProgress` and `LinearProgress` MUST set `accessibilityRole="progressbar"` by default. When `variant="determinate"`, both MUST additionally set `accessibilityValue={{ min: 0, max: 100, now: value }}` to expose progress to assistive technologies.
- **FR-024**: All new components MUST accept a `style` prop compatible with React Native's `StyleSheet` API, consistent with the existing 55 mui-native components. No `sx` prop is exposed.

### Key Entities

- **CircularProgress**: A circular animated indicator. Key attributes: `variant`, `value` (0–100), `size`, `color`. Stateless; all state is controlled by props.
- **LinearProgress**: A horizontal bar indicator. Key attributes: `variant`, `value`, `valueBuffer`, `color`. Supports a three-layer track (background, buffer, fill).
- **Popover**: An anchored overlay container. Key attributes: `open`, `anchorRef`, `onClose`, `anchorOrigin`, `transformOrigin`. Depends on screen coordinates derived from the anchor view.
- **Transition (shared concept)**: A visibility-animation wrapper. Key attributes: `in`, `timeout`, `mountOnEnter`, `unmountOnExit`. Concrete subtypes: Fade, Grow, Slide, Zoom, Collapse. Collapse adds `orientation` and `collapsedSize`; Slide adds `direction`.
- **Popper**: A non-blocking anchored overlay primitive. Key attributes: `open`, `anchorRef`, `placement`, `disablePortal`. Subset of Popover behavior without modal backdrop.
- **Masonry**: A multi-column staggered layout container. Key attributes: `columns` (integer), `spacing`, `defaultColumns` (integer). Distributes children to the shortest available column on each layout pass. Responsive breakpoint objects are not supported.
- **Timeline (composable set)**: A vertical event-sequence display. Root: `Timeline` (`position`). Item: `TimelineItem`. Separator: `TimelineSeparator`. Marker: `TimelineDot` (`variant`, `color`). Line: `TimelineConnector`. Body: `TimelineContent`. Mirror body: `TimelineOppositeContent`.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 7 component groups (`CircularProgress`, `LinearProgress`, `Popover`, Transitions ×5, `Popper`, `Masonry`, Timeline ×7) are importable from the package root with no import errors.
- **SC-002**: Running `npm test` produces 0 failures and 0 errors across the entire test suite.
- **SC-003**: No component throws an error or warning when rendered with fully valid props.
- **SC-004**: Each component degrades gracefully when given out-of-range or missing optional props (e.g., clamped values, no-render on null ref) without unhandled exceptions.
- **SC-005**: Each new component's test file covers: at least one render assertion, at least two prop/variant assertions, and at least one edge case assertion.
- **SC-006**: All tests that were passing before this feature (100 tests) continue to pass after implementation, confirming zero regressions.
- **SC-007**: No TypeScript `any` type appears in any public-facing props interface across the new components.
- **SC-008**: The package's exported module index lists every new component, making the complete set discoverable via a single import path.

---

## Assumptions

- Animations for `CircularProgress`, `LinearProgress`, and all five Transition components are implemented using react-native-reanimated 3.x, which is already a declared peer dependency.
- `Popover` and `Popper` determine on-screen anchor coordinates using React Native's `ref.measure()` API; no third-party positioning library is required.
- Web-only MUI utilities (CSS Baseline, No SSR, Textarea Autosize, useMediaQuery, Click-Away Listener) are intentionally excluded from this feature because they have no applicable mobile equivalent.
- `Masonry` implements the column-filling algorithm using React Native's `onLayout` callback to measure child heights; no native module or external dependency is required.
- No `react-transition-group` is used; it is a web-only library.
- AvatarGroup and incremental API enhancements to existing components (e.g., Button loading state, TextField multiline improvements) are out of scope for this feature.
- The test runner environment and test utilities (jest + @testing-library/react-native) remain unchanged from the current setup.
- The default animation `timeout` for all Transition components (`Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`) is 300ms for both enter and exit when the `timeout` prop is not supplied by the consumer.
- Transition components render children as mounted-but-hidden by default when `in={false}` (e.g., opacity 0, scale 0). Children are only removed from the render tree when `unmountOnExit={true}` is explicitly set.
- All new components accept a `style` prop (React Native `StyleSheet`-compatible) for style overrides. No `sx` prop is introduced, consistent with the existing component library pattern.
- `Masonry`'s `columns` and `defaultColumns` props accept plain integers only; responsive breakpoint objects are out of scope for the mobile-only React Native target.
