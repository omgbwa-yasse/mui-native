# Feature Specification: MUI-Native Component Showcase Application

**Feature Branch**: `007-component-showcase-app`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "Je veux que dans le test tu crée un application complet avec MUI-Native elle va consister à présenter le code source de chaque composant et en bas 3 exemples utilisations alignés verticalement ou horizontalement. Cela est regroupé en catégorie"

## Clarifications

### Session 2026-04-04

- Q: What is the app bootstrap / runtime environment? → A: React Native CLI (bare React Native) — full native control, no Expo overhead
- Q: Is the code block monospace text only, or syntax-highlighted? → A: Syntax-highlighted — showcase is educational; colour-coded tokens are the standard expectation
- Q: Where does the showcase app live in the repo? → A: `apps/showcase/` — standard monorepo convention, separate from library source and test suites
- Q: Must 100% of ~50+ components have authored examples in v1, or is a curated subset acceptable? → A: V1 covers at least 15 priority components with full examples; remaining components show a placeholder
- Q: Are the 5 listed categories the complete v1 set, or a minimum floor with more to follow? → A: Complete v1 set — the 5 categories (Inputs, Data Display, Feedback, Navigation, Layout) match MUI's own top-level groupings

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Components by Category (Priority: P1)

A developer opens the showcase application and is presented with a home screen listing all component categories (e.g., Inputs, Data Display, Feedback, Navigation, Layout). They tap a category to see all components in that group, then tap a specific component to open its detail page.

**Why this priority**: This is the entry point of the entire app. Without category navigation, no other feature is accessible. This story alone constitutes a usable MVP.

**Independent Test**: Launch the app, verify the home screen shows all categories, tap each category and verify it lists the expected components, then tap a component and verify its detail page opens.

**Acceptance Scenarios**:

1. **Given** the app is launched, **When** the home screen loads, **Then** all component categories are visible as a scrollable list
2. **Given** the home screen is visible, **When** a category is tapped, **Then** all components belonging to that category are listed
3. **Given** a category component list is visible, **When** a component name is tapped, **Then** the detail page for that component opens
4. **Given** a component detail page is open, **When** the user presses back, **Then** the category list is restored

---

### User Story 2 - View Component Source Code (Priority: P2)

A developer opens a component detail page and sees a clearly formatted display of the internal library source code of the component (the actual file from `src/components/ComponentName/`) at the top of the page. This is distinct from the 3 usage examples below, which show how a consumer would use the component.

**Why this priority**: The code block is the primary educational content on each page — it differentiates this app from a simple component gallery.

**Independent Test**: Open any component detail page, verify a formatted code block is displayed at the top, and confirm the displayed code corresponds to the selected component.

**Acceptance Scenarios**:

1. **Given** a component detail page is open, **When** the page loads, **Then** a formatted code block is displayed above the examples
2. **Given** the code block is visible, **When** the user scrolls within it, **Then** the code block scrolls independently without disrupting the rest of the page
3. **Given** a code block containing more than one screen's height of content, **When** displayed, **Then** the block is scrollable and does not overflow the page layout

---

### User Story 3 - View Live Usage Examples (Priority: P3)

A developer scrolls below the code section on a component detail page and sees exactly 3 rendered usage examples of the component. Each example shows the component in a different state or configuration (e.g., primary variant / secondary variant / disabled state).

**Why this priority**: Live rendered examples make the code tangible and let developers verify visual behavior before adopting a component.

**Independent Test**: Open any fully-authored component detail page (e.g., Button or Alert), scroll past the code block, verify exactly 3 distinctly different rendered examples are displayed without errors. Then open a non-priority component detail page and verify the "Examples coming soon" placeholder is displayed without errors.

**Acceptance Scenarios**:

1. **Given** a component detail page is open, **When** the user scrolls below the code block, **Then** exactly 3 rendered usage examples are visible
2. **Given** the 3 examples are visible, **When** the user observes them, **Then** each demonstrates a visually or functionally distinct state, variant, or prop combination
3. **Given** an example that is interactive (e.g., a Button), **When** the user taps it, **Then** the interaction responds as expected

---

### User Story 4 - Toggle Example Layout Direction (Priority: P4)

A developer wants to compare the 3 usage examples side by side. They use a toggle control on the component detail page to switch examples from a vertical stack to a horizontal row.

**Why this priority**: Horizontal layout enables quick visual comparison of variants. The app is fully functional with vertical layout alone, making this an enhancement.

**Independent Test**: Open any component detail page, activate the layout toggle, verify examples switch between vertical (stacked) and horizontal (row) arrangement.

**Acceptance Scenarios**:

1. **Given** a component detail page is open with layout set to "vertical", **When** the user views the examples section, **Then** the 3 examples are stacked one above the other
2. **Given** the layout is set to "vertical", **When** the user activates the layout toggle, **Then** the 3 examples rearrange into a side-by-side horizontal row
3. **Given** the layout preference is changed on one component page, **When** the user navigates to a different component, **Then** the layout preference persists globally for the session — the new page opens with the same layout the user previously selected

---

### Edge Cases

- **No authored examples** *(resolved)* — FR-010 mandates an `ExamplesPlaceholder` ("Examples coming soon") for any component where `hasFullExamples === false`. The component always appears in the category list; it is never hidden or skipped.
- **Horizontal layout with extra-wide components** *(resolved — assumption)* — Overflow in horizontal layout is delegated to the `ScrollView`'s natural horizontal scroll. No clipping or forced wrapping is applied; users can scroll to see wider examples.
- **Code block over 200 lines** *(resolved — assumption)* — Code blocks are not truncated in v1; the block remains fully scrollable via its inner `ScrollView`. The plan.md Risk Register notes a future enhancement: cap at 150 lines with an expand toggle if performance degrades on low-end devices.
- **Multi-category components** *(resolved — assumption)* — Each component in v1 belongs to exactly one category. Multi-category assignment is out of scope for v1 and deferred to a future iteration.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST display all MUI-Native library components grouped by named categories on a home or navigation screen
- **FR-002**: The app MUST support exactly the following 5 categories for v1: Inputs, Data Display, Feedback, Navigation, Layout — matching MUI's top-level component groupings
- **FR-003**: Each component detail page MUST display a syntax-highlighted, scrollable code block showing the component's internal library source file above the examples section
- **FR-004**: Each component detail page MUST display exactly 3 live rendered usage examples below the code block where the component has authored examples (`hasFullExamples === true`); otherwise MUST display the placeholder defined in FR-010
- **FR-005**: Each of the 3 usage examples MUST demonstrate a visually or functionally distinct variant, state, or prop combination
- **FR-006**: The app MUST provide a layout toggle on each component detail page to switch example arrangement between vertical and horizontal
- **FR-007**: The app MUST allow users to navigate back from a component detail page to its parent category list
- **FR-008**: Every component present in the MUI-Native library MUST have a corresponding entry in the showcase catalogue; v1 MUST fully author examples for at least 15 priority-tier components across all 5 categories, with remaining entries showing a "Examples coming soon" placeholder
- **FR-009**: The app MUST be self-contained and runnable without any external backend or network dependency
- **FR-010**: Components without authored examples MUST display a clearly labelled placeholder instead of an empty or broken section

### Key Entities

- **Category**: A named group of related components. Has a display name, an optional icon, and an ordered list of `ComponentEntry` references.
- **ComponentEntry**: A catalogue record for one component. Has a component name, parent category reference, a code block content value, and an `examples` field that is `null` when no examples are authored, or an array of exactly 3 `ExampleConfig` objects when fully authored (`hasFullExamples: true`).
- **ExampleConfig**: The definition of a single rendered example. Has a short descriptive label and the rendered preview of the component in a specific variant or state.
- **LayoutPreference**: A user-controllable setting (vertical or horizontal) that governs how the 3 `ExampleConfig` items are displayed on a detail page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can navigate from app launch to a specific component's detail page in 3 taps or fewer
- **SC-002**: 100% of MUI-Native library components are represented in the catalogue; at least 15 priority-tier components (minimum 3 per category) have fully authored code blocks and 3 live usage examples in v1
- **SC-003**: All 3 usage examples on every fully-authored component page render without errors
- **SC-003b**: Every non-priority component page displays the `ExamplesPlaceholder` without errors
- **SC-004**: The layout toggle rearranges examples without any perceptible delay (under 300 milliseconds)
- **SC-005**: The app reaches its home screen in under 3 seconds from launch on a mid-range device

## Assumptions

- The showcase is a new standalone React Native CLI application located at `apps/showcase/` in the repository root, separate from the component library source and test suites
- The showcase app is bootstrapped with React Native CLI (`react-native init`); native linking for peer dependencies (e.g. `react-native-vector-icons`) is handled via standard autolinking
- The 3 usage examples per component are manually authored per component, not auto-generated from prop types
- The layout toggle defaults to vertical on initial launch; the preference persists globally for the remainder of the session
- Components without authored examples display a "Examples coming soon" placeholder rather than being hidden from the catalogue
- V1 fully authors examples for at least 15 priority-tier components (minimum 3 per category); all other entries carry the placeholder
- Categories for v1 are exactly: Inputs, Data Display, Feedback, Navigation, Layout
- The showcase app targets the same React Native version as the existing library peer dependency (≥ 0.73)
- No user authentication, accounts, or server-side data persistence is required
