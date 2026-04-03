# Feature Specification: Add Missing UI Components

**Feature Branch**: `002-add-missing-components`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "Ajoute ces components (ceux qui n'existent pas encore)"

## Context

The library currently ships 9 components (AppBar, BottomSheet, Button, Card, Chip, Dialog, FAB, NavigationBar, TextField). Two reference libraries — MUI and React Native Paper — define the full component surface expected of a production-ready React Native design system. This feature adds every component present in those references that is not yet implemented.

**Components to add (46 total):**

| # | Component | Present in |
|---|-----------|-----------|
| 1 | Accordion | MUI |
| 2 | ActivityIndicator / Progress | RN Paper + MUI |
| 3 | Alert | MUI |
| 4 | Autocomplete | MUI |
| 5 | Avatar | RN Paper + MUI |
| 6 | Backdrop | MUI |
| 7 | Badge | RN Paper + MUI |
| 8 | Banner | RN Paper |
| 9 | Box | MUI |
| 10 | Breadcrumbs | MUI |
| 11 | ButtonGroup | MUI |
| 12 | Checkbox | RN Paper + MUI |
| 13 | Container | MUI |
| 14 | DataTable / Table | RN Paper + MUI |
| 15 | Divider | RN Paper + MUI |
| 16 | Drawer | RN Paper + MUI |
| 17 | Grid | MUI |
| 18 | HelperText | RN Paper |
| 19 | Icon | RN Paper + MUI |
| 20 | IconButton | RN Paper + MUI |
| 21 | ImageList | MUI |
| 22 | Link | MUI |
| 23 | List | RN Paper + MUI |
| 24 | Menu | RN Paper + MUI |
| 25 | Modal | RN Paper + MUI |
| 26 | NumberField | MUI |
| 27 | Pagination | MUI |
| 28 | Paper / Surface | RN Paper + MUI |
| 29 | Portal | RN Paper |
| 30 | RadioButton / RadioGroup | RN Paper + MUI |
| 31 | Rating | MUI |
| 32 | Searchbar | RN Paper |
| 33 | SegmentedButtons | RN Paper |
| 34 | Select | MUI |
| 35 | Skeleton | MUI |
| 36 | Slider | MUI |
| 37 | Snackbar | RN Paper + MUI |
| 38 | SpeedDial | MUI |
| 39 | Stack | MUI |
| 40 | Stepper | MUI |
| 41 | Switch | RN Paper + MUI |
| 42 | Tabs | MUI |
| 43 | Text / Typography | RN Paper + MUI |
| 44 | ToggleButton | RN Paper + MUI |
| 45 | Tooltip | RN Paper + MUI |
| 46 | TouchableRipple | RN Paper |
| 47 | TransferList | MUI |

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Feedback & Overlay Components (Priority: P1)

A developer building a React Native app needs to communicate async operations, errors, and transient messages to the user without building these patterns from scratch.

**Why this priority**: Feedback components (Alert, Snackbar, Progress/ActivityIndicator, Skeleton, Modal, Backdrop) are required in virtually every screen that performs network calls or user actions. Without them, the library cannot support production apps.

**Independent Test**: Render each component in isolation inside a ThemeProvider; verify it displays correctly for all variants and respects the active color scheme.

**Acceptance Scenarios**:

1. **Given** a loading state, **When** `<ActivityIndicator />` is rendered, **Then** an animated spinner is visible that conforms to the current theme colors.
2. **Given** a success event, **When** `<Snackbar message="Saved" visible />` is rendered, **Then** a dismissible toast appears at the bottom of the screen.
3. **Given** an error state, **When** `<Alert severity="error">...</Alert>` is rendered, **Then** the container uses the theme's error color with matching icon.
4. **Given** content loading, **When** `<Skeleton width={200} height={20} />` is rendered, **Then** a shimmering placeholder rectangle is displayed.
5. **Given** an open modal, **When** `<Modal visible><View /></Modal>` is rendered, **Then** content is overlaid above all other content with a dimmed backdrop.
6. **Given** an overlay is active, **When** `<Backdrop visible />` is rendered, **Then** the screen is dimmed and touch input is blocked behind it.

---

### User Story 2 — Form Control Components (Priority: P1)

A developer building forms needs a complete set of input controls: checkboxes, radio buttons, switches, sliders, selects, and search — all consistent with the design system.

**Why this priority**: Form controls are the second most-used component category after navigation. Missing any of them forces developers to reach for other libraries, breaking visual consistency.

**Independent Test**: Each control can be rendered with `value` and `onChange` props; state changes are reflected visually and can be verified with `@testing-library/react-native` queries.

**Acceptance Scenarios**:

1. **Given** a Checkbox with `checked={false}`, **When** the user taps it, **Then** `onValueChange(true)` is called and the checkbox appears filled.
2. **Given** a group of RadioButtons with one selected, **When** another is tapped, **Then** only the tapped item becomes selected.
3. **Given** a Switch with `value={false}`, **When** toggled, **Then** `onValueChange(true)` fires and the track slides to the on position.
4. **Given** a Slider with `min={0}` `max={100}` `value={50}`, **When** dragged, **Then** `onValueChange` is called with the new position.
5. **Given** a Select with options, **When** the user taps and picks an option, **Then** the selected label is displayed and `onValueChange` fires.
6. **Given** a Searchbar, **When** the user types, **Then** `onChangeText` fires with each keystroke and a clear button appears when the field is non-empty.
7. **Given** `<SegmentedButtons>` with 3 options, **When** one is selected, **Then** it receives the active visual state and `onValueChange` is called.

---

### User Story 3 — Navigation & Structural Components (Priority: P2)

A developer needs in-page navigation, multi-step flows, drawers, and paginated lists — components that structure the app's information architecture.

**Why this priority**: These components are used on almost every complex screen but are less critical than feedback and form controls for an MVP feature set.

**Independent Test**: Render Tabs with multiple panels; verify active tab changes on press. Render Drawer; verify it opens/closes. Render Stepper; verify step progression.

**Acceptance Scenarios**:

1. **Given** `<Tabs>` with 3 tabs, **When** a tab label is tapped, **Then** the corresponding panel becomes visible and the active indicator moves.
2. **Given** a closed `<Drawer>`, **When** the open prop becomes true, **Then** the drawer slides in from the side with an animation.
3. **Given** a `<Stepper>` at step 2 of 4, **When** rendered, **Then** steps 1–2 appear completed, step 3 appears active, step 4 appears upcoming.
4. **Given** `<Pagination count={10} page={1} />`, **When** a page number is tapped, **Then** `onPageChange` fires with the new page number.
5. **Given** `<Breadcrumbs>` with 3 levels, **When** rendered, **Then** each level is visible with separators and the last level has no link affordance.

---

### User Story 4 — Display & Content Components (Priority: P2)

A developer needs components for showing avatars, badges, lists of items, data tables, icons, and contextual tooltips in consistent visual language.

**Why this priority**: Content display components are used pervasively but are individually less blocking than form controls — they can be substituted temporarily with placeholder views.

**Independent Test**: Render each component with representative props; verify rendered output matches expected a11y roles and visual structure.

**Acceptance Scenarios**:

1. **Given** `<Avatar source={{ uri: '...' }} />`, **When** rendered, **Then** the image appears in a circular container sized correctly.
2. **Given** `<Avatar />` with no source, **When** rendered, **Then** initials or a fallback icon is shown.
3. **Given** `<Badge content={5}>`, **When** rendered around a child, **Then** a numbered indicator appears at the top-right corner.
4. **Given** `<List>` with 5 items, **When** rendered, **Then** each item is touchable, labeled, and keyboard-accessible.
5. **Given** `<DataTable>` with headers and rows, **When** rendered, **Then** each cell is aligned and sortable column headers fire `onSort`.
6. **Given** `<Tooltip title="Info">`, **When** the wrapped element is long-pressed, **Then** the tooltip label appears near the element.
7. **Given** `<Divider />`, **When** rendered, **Then** a thin separator line appears that adapts its color to the current theme.

---

### User Story 5 — Layout Primitives (Priority: P3)

A developer needs layout abstractions (Box, Container, Grid, Stack, Paper), image galleries, and accordion sections to scaffold screens quickly.

**Why this priority**: Layout primitives improve developer experience significantly but do not block feature delivery since developers can compose raw View/StyleSheet equivalents in the interim.

**Independent Test**: Render a Grid with 3 columns and 6 items; verify items distribute correctly. Render Accordion with 2 panels; verify only the expanded one shows content.

**Acceptance Scenarios**:

1. **Given** `<Stack spacing={2}>` with 3 children, **When** rendered, **Then** children are laid out in a column with uniform spacing between them.
2. **Given** `<Grid columns={2}>` with 4 items, **When** rendered, **Then** items appear in a 2-column layout with consistent gutters.
3. **Given** `<Paper elevation={2}>`, **When** rendered, **Then** content appears inside a surface with appropriate shadow matching the elevation token.
4. **Given** `<Accordion>` with a summary and details, **When** the summary is tapped, **Then** the details panel toggles open/closed with animation.
5. **Given** `<ImageList>` with 6 images, **When** rendered, **Then** images appear in a masonry or fixed-column grid.

---

### Edge Cases

- What happens when a controlled component receives `undefined` for its value — it should silently fall back to an uncontrolled state or documented default.
- How does Snackbar behave when multiple messages are queued in rapid succession — only one should be visible at a time; subsequent ones should queue.
- How does Modal render when the keyboard is open — it must not be obscured by the software keyboard.
- What happens when Badge receives a count > 99 — it should display "99+" or a configurable maximum string.
- How does DataTable handle an empty dataset — an empty-state slot must be renderable.
- How does Skeleton appear in both light and dark themes — shimmer colors must use theme tokens, not hard-coded values.
- How does Drawer behave below the minimum touch-target size — all interactive elements must meet ≥ 44×44 pt touch target.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each component MUST accept and forward a `testID` prop for test targeting.
- **FR-002**: Each component MUST support light and dark mode via the existing ThemeProvider context.
- **FR-003**: Each interactive component MUST expose an accessible `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` where applicable.
- **FR-004**: Each component MUST be exported from the library barrel (`src/index.ts`).
- **FR-005**: Each component MUST have a corresponding Storybook story demonstrating its primary variants.
- **FR-006**: Controlled components MUST accept a `value`/`onValueChange` (or equivalent) pair and work as both controlled and uncontrolled.
- **FR-007**: All color, spacing, typography, shape, and elevation values MUST be sourced from theme tokens — no hard-coded style literals.
- **FR-008**: Animated components MUST respect the `reduceMotion` accessibility setting.
- **FR-009**: Components that render above other content (Modal, Backdrop, Snackbar, Tooltip, Menu) MUST use the Portal pattern for correct z-ordering.
- **FR-010**: Each component MUST have a TypeScript `Props` interface exported from its `types.ts` file, with all required and optional props documented.
- **FR-011**: Layout primitives (Box, Container, Grid, Stack) MUST compose cleanly with existing components without imposing visual side-effects.
- **FR-012**: The DataTable MUST support sortable columns, row selection, and pagination via controlled props.
- **FR-013**: The Drawer MUST support both left and right anchors and a modal (overlay) mode.
- **FR-014**: The Tabs component MUST support scrollable tab bars when the number of tabs exceeds the viewport width.
- **FR-015**: Form controls (Checkbox, RadioButton, Switch, Slider, Select, SegmentedButtons, ToggleButton) MUST support a `disabled` state.

### Key Entities

- **Component**: A self-contained, themed, accessible React Native component with a defined Props interface, default export, named type export, and barrel index.
- **Story**: A Storybook story file that renders the component in its primary states (default, disabled, variants, dark mode).
- **Token reference**: Any style value that comes from the theme context rather than a literal.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 47 missing components are present in `src/components/` and exported from `src/index.ts`.
- **SC-002**: `tsc --noEmit` exits 0 with zero type errors after all components are added.
- **SC-003**: `npm run lint` exits 0 (zero errors) after all components are added.
- **SC-004**: Each component renders without runtime errors inside a ThemeProvider in both light and dark mode.
- **SC-005**: Each component exposes the correct `accessibilityRole` as verified by `getByRole` queries in tests.
- **SC-006**: All animated components skip or simplify animations when `reduceMotion` is enabled, verified by the existing `useReduceMotion` hook.
- **SC-007**: Storybook loads all 47 new stories without console errors.

---

## Assumptions

- The same token system (colors, elevation, motion, shape, spacing, typography) established in `001-rn-material-core` is reused for all new components without modification.
- Peer dependencies (`react-native`, `react-native-reanimated`, `react-native-gesture-handler`) remain at the versions already installed.
- "Transfer List" is interpreted as two side-by-side lists where items can be moved between them.
- "TouchableRipple" is a low-level pressable wrapper that applies a Material ink-ripple animation and is used as the press primitive inside other components.
- "Portal" is a utility component (not visual) that renders its children at the root of the view tree.
- "HelperText" is a small caption component used below form fields to show hints or validation messages.
- "NumberField" is a text input restricted to numeric values with optional increment/decrement controls.
- "Link" is a styled Text element that triggers navigation or an `onPress` callback.
- Icons are rendered via a passed `name` string prop; the library does not bundle an icon font — it accepts a render prop or icon component as a child (compatible with `react-native-vector-icons` or similar).
- Story files follow the existing pattern already established in `stories/components/`.
- RTL layout: components follow the same RTL conventions established in `001-rn-material-core` (logical `start`/`end` instead of `left`/`right`).

