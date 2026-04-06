# Feature Specification: 3 Usage Examples for All Components

**Feature Branch**: `008-3-examples-all-components`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Intègres 3 exemples d'ustilsation de tous les conponenets dans l'application de test"

## Clarifications

### Session 2026-04-05

- Q: Should the catalogue be kept in a single `examples.tsx` file or split into per-category files as coverage grows to 78 components? → A: Split into per-category barrel files (`examples.inputs.tsx`, `examples.dataDisplay.tsx`, `examples.feedback.tsx`, `examples.navigation.tsx`, `examples.layout.tsx`); the existing `examples.tsx` becomes a re-export barrel only — no logic moves; the `ExampleConfig` contract is unchanged
- Q: How should examples handle the 4 components not exported from `@mui-native` (CodeInput, HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow)? → A: These 4 components must be added to `src/index.ts` as pre-requisite companion sub-tasks before their examples are authored; all examples import exclusively from `@mui-native` — direct relative imports from showcase into library source are not permitted
- Q: Are the new examples required to pass the existing a11y test suite? → A: New examples must apply the same a11y baseline as the 15 existing examples (accessibilityLabel on interactive elements, accessibilityRole where applicable) and must not introduce new regressions; they are not subject to a dedicated new a11y pass in this feature
- Q: What is the quantifiable criterion for "meaningfully distinct" examples (FR-002)? → A: At least 2 of the 3 examples for a given component must produce a visually or behaviorally different output; different prop values that yield identical rendered appearance do not satisfy this criterion
- Q: Should interactive component examples be validated by automated tests or manual verification only (SC-005)? → A: Manual verification is the accepted approach for interactive examples in this feature; no new automated interaction tests are required; T046 (component-registry integrity) remains the sole automated gate
- Q: Should each rendered example display its JSX usage code above the preview with syntax highlighting? → A: Yes — every rendered example MUST show the corresponding JSX snippet above the preview; syntax highlighting MUST visually distinguish JSX element tags, attribute names, attribute values, and text content using VS Code standard theme colour conventions; a `code: string` field is added to `ExampleConfig` for this purpose
- Q: Are the ~20 pre-existing runtime bugs in the running showcase app (e.g. `useTheme is not a function`, invalid `accessibilityRole` values, broken Accordion / Modal / Drawer / Snackbar / SpeedDial) in scope for Feature 008? → A: Yes — in scope as companion fix tasks tracked within Feature 008; SC-002's "0 runtime errors" criterion applies to ALL 78 component detail pages including those with pre-existing bugs; bug fixes are organised as a "Phase 0 — Bug Fixes" section in tasks.md and are a hard pre-requisite before DoD is assessed
- Q: For list items and navigation containers, what `accessibilityRole` should new examples use given that `listitem` and `navigation` are invalid values in React Native 0.76? → A: Use `accessibilityRole="none"` for elements that would semantically be list items or navigation containers; web-only roles (`listitem`, `navigation`, `article`, `region`, etc.) MUST NOT appear in any new or modified example
- Q: Must the `code` field in `ExampleConfig` be byte-for-byte identical to the JSX in `render`, or may it be simplified for readability? → A: Simplified and prettified JSX is acceptable; the `code` field must convey the same component name, props, and structural intent as the `render` function but may omit internal state wiring (e.g. `onPress` handler bodies, `useState` declarations) and may be reformatted for single-screen readability — the goal is instructional clarity, not verbatim reproduction
- Q: Which library/component renders the syntax-highlighted code display on the component detail page? → A: `react-native-syntax-highlighter` (already added to `apps/showcase/package.json`); use its `SyntaxHighlighter` component with the `vs` or `vscodeDark` style; no additional installation is required

## Context

Feature 007 delivered the showcase application with full examples for 15 priority components and a placeholder ("Examples coming soon") for the remaining 63 components. This feature (008) completes the showcase by authoring exactly 3 usage examples for every one of the 63 placeholder components, achieving 100% example coverage across all 78 components.

**Scope**: 63 components currently showing a placeholder. The 15 priority components (Button, TextField, Select, Text, Avatar, Chip, Alert, CircularProgress, Snackbar, AppBar, Tabs, Drawer, Card, Stack, Divider) retain their existing examples unchanged.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Zero Placeholders in the Showcase (Priority: P1)

A developer browsing the showcase application opens any component from any of the 5 categories and sees 3 rendered examples below the code block — never a "coming soon" placeholder. This applies to all 78 components.

**Why this priority**: Full example coverage is the explicit goal. A developer who encounters a placeholder on a component they need to evaluate loses trust in the showcase as a reference tool.

**Independent Test**: Launch the showcase, open every component from every category, and confirm that exactly 3 live rendered examples appear for each one. No "Examples coming soon" message appears anywhere.

**Acceptance Scenarios**:

1. **Given** the showcase app is running, **When** a developer opens any of the 63 previously-placeholder components, **Then** exactly 3 rendered examples are visible below the code block
2. **Given** a developer opens one of the original 15 priority components, **When** the page loads, **Then** the existing 3 examples still display correctly and are unchanged
3. **Given** a developer opens a component detail page, **When** the examples section loads, **Then** each of the 3 examples has a descriptive label identifying the variant being shown

---

### User Story 2 - Examples Reflect Meaningful Distinct States (Priority: P2)

For each component, a developer sees 3 examples that demonstrate genuinely different states, configurations, or usage patterns — not 3 copies of the same usage. Each example teaches something distinct about the component's capabilities.

**Why this priority**: Redundant examples that show the same variant three times provide no educational value. The showcase's purpose is to help developers understand a component's full range.

**Independent Test**: Randomly sample 10 of the 63 newly-authored components. For each, verify that the 3 example labels are distinct and the rendered outputs are visually or behaviorally different from one another.

**Acceptance Scenarios**:

1. **Given** a component detail page is open, **When** all 3 examples are visible, **Then** each example has a unique label that describes a distinct variant (e.g., "Default", "Outlined", "Disabled")
2. **Given** an interactive component (e.g., Checkbox, Switch, Slider), **When** a developer interacts with its example, **Then** the example responds correctly to input
3. **Given** a stateless display component (e.g., Badge, Skeleton, LinearProgress), **When** the 3 examples are visible, **Then** they demonstrate different visual configurations (size, color, or state)

---

### User Story 3 - Animation/Transition Components Are Demonstrable (Priority: P3)

For components that involve show/hide animations (Fade, Grow, Zoom, Slide, Collapse), a developer can trigger the animation from within the example so the transition behavior is observable — not just a frozen visible state.

**Why this priority**: An animation component shown only in its final visible state conveys no information about its defining characteristic (the transition itself). Without triggering controls, these examples are as uninformative as a placeholder.

**Independent Test**: Open the detail page for Fade, Grow, Zoom, Slide, and Collapse. For each, verify that Example 1 includes a simple toggle control (show/hide), and Examples 2 & 3 each use a realistic trigger that mirrors real-world usage of that transition component. Tap each control and confirm the animation plays in both directions.

**Acceptance Scenarios**:

1. **Given** a transition component detail page is open, **When** the examples section loads, **Then** each example includes a control (e.g., a button) that triggers the transition
2. **Given** the trigger control is tapped, **When** the transition plays, **Then** the animated component moves from its hidden to visible state (or vice versa) with a visible animation
3. **Given** the animation completes, **When** the control is tapped again, **Then** the reverse transition plays

---

### Edge Cases

- What happens when a component requires a parent context (e.g., Menu requires an anchor element)? → The example provides a self-contained trigger within the rendered example.
- What happens when a complex component (DataGrid, DataTable, Charts) needs data? → Examples use concise static inline data (5–10 rows or data points) defined within the example.
- What happens when domain-specific components (HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow) reference domain models? → Examples use realistic synthetic mock data that mirrors the expected data shape.
- What happens when an existing test (e.g., T046 component-registry integrity) runs after all 63 examples are added? → All examples must be registered in the component catalogue; T046 must continue to pass.
- What happens when a component has no meaningful variant differences? → The 3 examples demonstrate size, color, or content variations to ensure distinct educational value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All 78 components MUST have exactly 3 authored usage examples available in the showcase catalogue; 0 components may show a placeholder after this feature is complete
- **FR-002**: Each set of 3 examples for a given component MUST demonstrate meaningfully distinct states, configurations, or usage patterns; at least 2 of the 3 examples must produce a visually or behaviorally different rendered output — different prop values that yield identical rendered appearance do not satisfy this criterion
- **FR-003**: Every example MUST include a short descriptive label (e.g., "Indeterminate", "Determinate 60%", "Buffer") that identifies the specific variant being shown
- **FR-004**: Interactive components (Checkbox, Switch, Slider, RadioButton, Rating, ToggleButton, etc.) MUST have at least one example that responds to user interaction; `accessibilityLabel` and `accessibilityRole` MUST be applied to interactive elements in each example, consistent with the a11y baseline of the existing 15 priority examples; only React Native–valid `accessibilityRole` values MAY be used — the web-only values `listitem` and `navigation` are invalid in React Native 0.76 and MUST be replaced with `"none"` in both new and existing components touched during this feature
- **FR-005**: Animation and transition components (Fade, Grow, Zoom, Slide, Collapse) MUST include a trigger control in each example; Example 1 MUST use a simple toggle (show/hide) to clearly demonstrate the animation, and Examples 2 & 3 MUST use a realistic trigger that mirrors real-world usage of the component; a static frozen-visible render is not acceptable for any of the 3 examples
- **FR-006**: All 63 new example sets MUST follow the `ExampleConfig` triple-tuple pattern; examples MUST be organised into per-category source files (`examples.inputs.tsx`, `examples.dataDisplay.tsx`, `examples.feedback.tsx`, `examples.navigation.tsx`, `examples.layout.tsx`) and re-exported through the existing `examples.tsx` barrel; the `ExampleConfig` interface is extended with a required `code: string` field (see FR-012); all other export and structural conventions remain unchanged
- **FR-007**: Domain-specific components (HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow) MUST use realistic synthetic mock data that accurately represents the component's expected input shape; all examples MUST import these components from `@mui-native` — this requires a pre-requisite companion task to add CodeInput, HumanizationScoreBar, InvitationStatusBadge, and WorkerAgentRow to `src/index.ts`
- **FR-008**: Complex data components (DataGrid, DataTable, Charts, Timeline, TreeView, TransferList) MUST use concise static inline data (minimum 3 items; maximum 10 rows/data points) defined within the example
- **FR-009**: The existing 15 priority component examples MUST remain behaviorally unchanged; their render logic, labels, and descriptions MUST NOT be modified; a minimal `code` string stub MAY be added to each entry to satisfy TypeScript compilation requirements for the updated `ExampleConfig` interface — this is not considered a behavioral change
- **FR-010**: The showcase app MUST render all 78 components without runtime errors or console warnings; pre-existing runtime bugs (including but not limited to circular-import failures causing `useTheme is not a function`, invalid `accessibilityRole` values, broken overlay triggers for Modal/Drawer/Menu/Snackbar/SpeedDial, and non-functioning interactive components) MUST be resolved as companion sub-tasks in Phase 0 of tasks.md before example-authoring phases begin; this requirement applies to the entire app, not only to newly-authored examples
- **FR-011**: The component catalogue integrity test (T046) MUST pass after all examples are registered
- **FR-012**: Every newly-authored `ExampleConfig` entry MUST include a `code` field (type: `string`) containing a JSX snippet that conveys the same component name, props, and structural intent as its `render` function; the snippet MAY omit internal state wiring (e.g. `onPress` bodies, `useState` declarations) and MAY be reformatted for single-screen readability — byte-for-byte identity is not required; this snippet MUST be displayed above the rendered preview on the component detail page using `react-native-syntax-highlighter`'s `SyntaxHighlighter` component (already installed in `apps/showcase/package.json`) with the `vs` or `vscodeDark` style, visually distinguishing JSX element tags (e.g. `<Button`), attribute names (e.g. `variant=`), attribute values (e.g. `"contained"`), and text content

### Key Entities

- **ExampleConfig**: A named usage example for a component; has `label` (string describing the variant), `code` (string: the JSX snippet displayed above the rendered preview using VS Code standard theme syntax highlighting — tags, attribute names, attribute values, and text content in distinct colours), and `render` (function returning a React element); grouped in fixed-length tuples of exactly 3
- **ExampleTuple**: A fixed-length array of exactly 3 `ExampleConfig` items assigned to a single component; replaces a `null` (placeholder) entry in the component registry
- **ComponentRegistry Entry**: The mapping from a `componentKey` string to either an `ExampleTuple` (authored) or `null` (placeholder); after this feature, all 78 entries MUST have an `ExampleTuple`
- **Stateful Wrapper**: A locally-defined React function component that provides state (via `useState`) to examples that require controlled inputs; must not use hooks inside a plain render function

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 78 out of 78 components display exactly 3 live rendered examples; 0 placeholders remain in any category
- **SC-002**: 0 runtime errors or warnings are produced when navigating through all 78 component detail pages in the showcase app; pre-existing runtime bugs identified during manual testing (e.g. `useTheme is not a function`, invalid `accessibilityRole` values, non-functional overlays) MUST be resolved in Phase 0 before this criterion is assessed
- **SC-003**: 100% of new example tuples pass the component catalogue integrity check (T046 test suite)
- **SC-004**: Each new example tuple has 3 examples with distinct labels; 0 tuples have duplicate labels within the same component
- **SC-005**: All interactive component examples respond to user input without errors during manual verification; no new automated interaction tests are required by this feature — T046 (component-registry integrity) is the sole automated gate
- **SC-006**: 100% of the 63 newly-authored `ExampleConfig` entries include a non-empty `code` field whose contents accurately reflect the JSX used in the corresponding `render` function; the syntax-highlighted snippet is visible above the rendered preview on each component detail page

## Assumptions

- The `ExampleConfig` interface is extended with a required `code: string` field; the triple-tuple contract is otherwise unchanged; `examples.tsx` becomes a re-export barrel alongside 5 new per-category source files (`examples.inputs.tsx`, `examples.dataDisplay.tsx`, `examples.feedback.tsx`, `examples.navigation.tsx`, `examples.layout.tsx`); the 15 existing priority-component entries will receive a minimum-viable `code` string stub to satisfy TypeScript compilation — authoring their complete snippets is a companion task deferred post-feature
- The 5 categories (Inputs, Data Display, Feedback, Navigation, Layout) remain the complete component grouping; no new categories are added in this feature
- Domain-specific components (HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow) are fully functional library components — they accept props and render without requiring backend connections
- Stateful wrapper components for controlled inputs continue to be defined locally within each per-category source file (`examples.inputs.tsx`, `examples.dataDisplay.tsx`, etc.) — co-located with the component's `ExampleTuple`, not extracted to a shared module and not living inside the barrel `examples.tsx`
- All native peer dependencies (react-native-reanimated, react-native-gesture-handler) are already installed and linked in `apps/showcase/android/` and `apps/showcase/ios/`; no new native setup is required
- Components that render incorrectly or crash with minimal props will be fixed in `src/components/` as companion sub-tasks; the 4 components currently missing from `src/index.ts` exports (CodeInput, HumanizationScoreBar, InvitationStatusBadge, WorkerAgentRow) MUST be added before their example tuples are authored
- SpeedDial, BottomSheet, and Popover examples will include a self-contained trigger embedded in the example so the overlay component is observable without navigating away
- Pre-existing runtime bugs in `src/components/` and `apps/showcase/` are in scope for this feature; they are tracked as a "Phase 0 — Bug Fixes" section in tasks.md ordered before all example-authoring phases; the known bug list includes: `useTheme` circular-import failure (DatePicker and others), invalid `accessibilityRole` values (`listitem`, `navigation`), broken Accordion, broken Modal open trigger, broken Menu open trigger, broken Drawer, broken Snackbar queue, broken SpeedDial, broken Stepper, broken CircularProgress animation, non-visible TreeView, broken Link prop, broken Tabs illustrations, broken DataGrid/DataTable renders, broken Skeleton text lines, Stack/HumanizationScoreBar missing colors, and broken Timeline/Tooltip/MaterialIcon renders
