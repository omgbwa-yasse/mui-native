# Feature Specification: Apply Missing MUI-Aligned Components

**Feature Branch**: `011-apply-missing-elements`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Applique les elemnts qui manquent"

## Context

The alignment report (`docs/mui-comparison.md`, generated 2026-04-06) identified that mui-native covers **96.4% of applicable MUI components**, but 7 components have partial coverage and 2 are absent. This feature closes those gaps to reach full MUI composable parity for the highest-impact items.

**Gaps to close (from report):**

| Component | Gap Type | Priority |
|-----------|----------|----------|
| `List` | Missing sub-components: `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` | High |
| `Accordion` | Only top-level export; missing `AccordionSummary`, `AccordionDetails`, `AccordionActions` composable exports | High |
| `Stepper` | Data-driven only; missing composable `Step`, `StepLabel`, `StepContent`, `MobileStepper` | High |
| `RadioGroup` | No `RadioGroup` wrapper; no `Radio` alias for `RadioButton` | Medium |
| `useMediaQuery` | Hook completely absent; no breakpoint utility | Medium |
| `TransferList` | Drag-to-reorder variant absent | Low |
| `Popper` | Anchor engine improvements for flip/offset modifiers | Low |

## Clarifications

### Session 2026-04-06

- Q: Accordion dual-mode coexistence — what should happen when both a `title` prop (data-driven) and `<AccordionSummary>` children (composable) are provided to the same `<Accordion>`? → A: TypeScript mutually exclusive overloads — two separate prop shapes enforced at compile time; the compiler prevents mixing; no runtime detection needed.
- Q: Accessibility role for new pressable sub-components (`ListItemButton`, `AccordionSummary`) — what default role should they declare? → A: `role="button"` + `accessible={true}` for both, consistent with all other pressable components in the library (`Button`, `Chip`, `FAB`, etc.).
- Q: `useMediaQuery` raw query string parsing scope — which CSS media features must be supported beyond named breakpoints? → A: `min-width` and `max-width` only; orientation and other media features are out of scope for v1 (covers 95% of responsive layout use cases).
- Q: Should `ListSubheader` implement sticky positioning (equivalent to CSS `position: sticky`) inside a scroll container? → A: No sticky positioning — renders as a styled non-pressable label only; sticky behavior requires `SectionList` on the consumer side and is out of scope.
- Q: Should `RadioGroup` support the `row` prop for horizontal layout? → A: Yes — `row` prop (boolean) switches flex direction to horizontal, matching MUI API exactly.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Composable List (Priority: P1)

A developer building a settings screen needs a pressable, icon-decorated list that matches the MUI `List` composable pattern — i.e., `<List>`, `<ListItemButton>`, `<ListItemIcon>`, `<ListItemText>`, `<ListSubheader>` as independent exports — so that porting existing MUI code requires no structural rewrite.

**Why this priority**: `List` is the most frequently used navigation pattern in mobile apps. The current gap (missing `ListItemButton`, `ListItemIcon`, `ListItemText`) forces every consumer to hand-roll wrappers, breaking MUI parity and increasing migration cost.

**Independent Test**: A settings screen renders a `<List>` with `<ListItemButton>` rows, each using `<ListItemIcon>` + `<ListItemText>` primary and secondary, and a `<ListSubheader>` for grouping — all imported directly from mui-native.

**Acceptance Scenarios**:

1. **Given** a developer imports `{ List, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, ListSubheader }` from mui-native, **When** they render a standard settings list, **Then** the layout, typography, and touch feedback match MUI web output on equivalent screen size.
2. **Given** a `ListItemButton` is pressed, **When** an `onClick`/`onPress` handler is provided, **Then** a ripple feedback is shown and the handler fires once.
3. **Given** a `ListSubheader` is placed as first child in a `List` section, **When** rendered, **Then** it appears as a sticky-ish or non-pressable category label styled per MD3 spec.
4. **Given** `ListItemAvatar` wraps an `Avatar`, **When** rendered inside a `ListItemButton`, **Then** the avatar is vertically centered and correctly spaced.

---

### User Story 2 — Composable Accordion (Priority: P1)

A developer needs to build FAQ and settings-group collapsible sections using the MUI composable pattern: `<Accordion>` + `<AccordionSummary expandIcon={...}>` + `<AccordionDetails>` + `<AccordionActions>` as separate exports so that header content (icon, trailing elements) and body content are fully customizable.

**Why this priority**: The current `Accordion` is a black-box data-driven component. Teams porting MUI web UIs cannot replicate custom accordion headers (with icons, counts, or right-aligned actions) without forking the component.

**Independent Test**: An FAQ screen renders 3 `<Accordion>` items each with a custom `<AccordionSummary>` that includes an `expandIcon` and a trailing badge, plus `<AccordionDetails>` with arbitrary content — fully imported from mui-native.

**Acceptance Scenarios**:

1. **Given** a developer renders `<Accordion>` with `<AccordionSummary expandIcon={<Icon>}>`, **When** the summary is tapped, **Then** the panel toggles and the expand icon rotates 180°.
2. **Given** `<AccordionDetails>` contains form fields, **When** the accordion is expanded, **Then** the fields are visible and interactive.
3. **Given** `<AccordionActions>` contains two action buttons, **When** the accordion is expanded, **Then** the action buttons appear right-aligned at the bottom of the panel.
4. **Given** multiple accordions are on screen with default `expanded` prop unset, **When** one is opened, **Then** others remain in their own state (no shared state implied).

---

### User Story 3 — Composable Stepper (Priority: P2)

A developer building a multi-step onboarding or checkout flow needs composable stepper components — `<Step>`, `<StepLabel>`, `<StepContent>`, `<StepConnector>` — and a mobile-friendly `<MobileStepper>` (dot/progress/text indicator) so that step layouts can include custom icons, descriptions, and inline content.

**Why this priority**: The current data-driven `Stepper` only supports a flat `steps: string[]` array. Complex onboarding flows require inline step content, custom step icons, and per-step validation states that the current API cannot express.

**Independent Test**: A three-step checkout screen renders `<Stepper activeStep={step}><Step><StepLabel>...</StepLabel><StepContent>...</StepContent></Step></Stepper>` with inline form content per step — imported from mui-native. A separate screen renders `<MobileStepper variant="dots" steps={5} activeStep={2} />`.

**Acceptance Scenarios**:

1. **Given** a `<Stepper activeStep={1}>` with three `<Step>` children, **When** rendered, **Then** step 0 shows as completed (checkmark), step 1 as active, step 2 as upcoming.
2. **Given** `<StepContent>` contains a form, **When** the step is active, **Then** the content is visible and the next step's content is hidden.
3. **Given** a `<MobileStepper variant="dots" steps={5} activeStep={2} backButton={...} nextButton={...}>`, **When** rendered, **Then** 5 dots appear with dot index 2 highlighted and the navigation buttons are positioned correctly.
4. **Given** `<MobileStepper variant="progress">`, **When** rendered, **Then** a progress bar shows proportional fill based on `activeStep / steps`.

---

### User Story 4 — RadioGroup wrapper (Priority: P2)

A developer building a preference form needs `<RadioGroup>` as a composable wrapper that manages selection state for a set of `<Radio>` children, matching the MUI `<RadioGroup>` + `<Radio>` API.

**Why this priority**: Currently grouped radio buttons require the consuming developer to manage selection state, accessibility grouping, and keyboard navigation manually — which the MUI `RadioGroup` handles automatically.

**Independent Test**: A form renders `<RadioGroup name="plan" value={val} onChange={setVal}>` with three `<Radio value="free" label="Free" />` children — all from mui-native — and selection state updates correctly.

**Acceptance Scenarios**:

1. **Given** `<RadioGroup>` wraps multiple `<Radio>` components with unique `value` props, **When** a `<Radio>` is pressed, **Then** only that radio becomes selected and the `onChange` fires with its value.
2. **Given** `<RadioGroup>` is controlled (`value` prop set), **When** `value` changes externally, **Then** the correct `<Radio>` reflects the selected state.
3. **Given** `<Radio>` is used standalone (outside `<RadioGroup>`), **When** pressed, **Then** it behaves as an independent checkbox-style toggle (backward-compatible with existing `RadioButton` behavior).

---

### User Story 5 — useMediaQuery / useBreakpoints hook (Priority: P3)

A developer building a responsive layout needs a `useMediaQuery` hook that accepts a breakpoint query string (e.g., `"(min-width: 600px)"`) or a named breakpoint (e.g., `"sm"`) and returns a boolean reflecting whether the current window matches — matching the MUI `useMediaQuery` signature.

**Why this priority**: Responsive layouts across tablet and large-screen form factors are increasingly required. Without this hook, developers must write per-component `useWindowDimensions` logic that diverges from the familiar MUI API.

**Independent Test**: A screen imports `useMediaQuery` from mui-native, calls `const isDesktop = useMediaQuery("lg")`, and conditionally renders a two-column layout; rotating the device/resizing the window rerenders the layout correctly.

**Acceptance Scenarios**:

1. **Given** `useMediaQuery("md")` is called on a narrow screen (< 900 dp), **When** rendered, **Then** the hook returns `false`.
2. **Given** `useMediaQuery("md")` is called on a wide screen (≥ 900 dp), **When** rendered, **Then** the hook returns `true`.
3. **Given** screen orientation changes, **When** the viewport crosses a named breakpoint threshold, **Then** the hook's return value updates and the component re-renders.
4. **Given** `useMediaQuery` is called with a raw media-query string like `"(min-width: 1200px)"`, **When** evaluated, **Then** it returns a boolean consistent with the current window width.

---

### Edge Cases

- What happens when `<AccordionSummary>` is rendered without an `expandIcon` prop — does the accordion still expand?
- What happens when `<Stepper>` receives no `<Step>` children — does it render an empty state without crashing?
- What happens when `<RadioGroup>` receives a `value` that matches none of the child `<Radio>` values — nothing should be selected, no error.
- What happens when `useMediaQuery` is called while the device is in split-screen mode and the viewport width changes mid-session — it should update reactively.
- What happens when `ListItemButton` is disabled — tap target is invisible but the button still occupies space and does not fire `onPress`.
- What happens when `<MobileStepper activeStep={steps}>` (last step exceeded) — rendered without crash, next button should be disabled.

## Requirements *(mandatory)*

### Functional Requirements

#### List Sub-components

- **FR-001**: The library MUST export `ListItemButton` as a pressable list row with ripple feedback, `disabled`, `selected`, `dense`, and `alignItems` props. It MUST declare `role="button"` and `accessible={true}` by default.
- **FR-002**: The library MUST export `ListItemIcon` as a container for an icon placed at the start of a list item, with correct spacing and vertical alignment.
- **FR-003**: The library MUST export `ListItemAvatar` as a container for an `Avatar` placed at the start of a list item.
- **FR-004**: The library MUST export `ListItemText` with `primary`, `secondary`, `primaryTypographyProps`, and `secondaryTypographyProps` props, rendering stacked text with correct MUI typography variants.
- **FR-005**: The library MUST export `ListSubheader` that renders a non-pressable, styled category label inside a `List`. It MUST NOT implement sticky positioning; sticky scroll behavior is the responsibility of the consumer (e.g., via `SectionList`).
- **FR-006**: All new List sub-components MUST be composable with the existing `ListItem` and `List` exports.

#### Accordion Sub-components

- **FR-007**: The library MUST export `AccordionSummary` as a pressable header accepting `expandIcon` and arbitrary `children`; it MUST communicate expand/collapse state to its parent `Accordion` via context. It MUST declare `role="button"` and `accessible={true}` by default.
- **FR-008**: The library MUST export `AccordionDetails` as a container for arbitrary body content, shown/hidden based on parent `Accordion` expanded state.
- **FR-009**: The library MUST export `AccordionActions` as a right-aligned row container for action buttons, shown at the bottom of an expanded `Accordion`.
- **FR-010**: The `Accordion` component MUST expose two mutually exclusive TypeScript prop shapes via discriminated union or overloads: (1) the existing data-driven shape (`title`, `content`, `expanded`, etc.) and (2) the new composable shape that accepts `AccordionSummary` / `AccordionDetails` / `AccordionActions` as `children`. The TypeScript compiler MUST prevent a consumer from providing both prop shapes simultaneously; no runtime mode-detection logic is required.
- **FR-011**: The expand/collapse animation MUST use the existing `Collapse` component to maintain consistency.

#### Stepper Sub-components

- **FR-012**: The library MUST export `Step` as a container that wraps `StepLabel` and optionally `StepContent`; it MUST accept `active`, `completed`, `disabled` props or derive them from parent `Stepper` context.
- **FR-013**: The library MUST export `StepLabel` that renders a step number (or custom icon) alongside a label text and optional sub-label.
- **FR-014**: The library MUST export `StepContent` that renders inline content visible only when the step is active, with a collapse animation.
- **FR-015**: The library MUST export `StepConnector` that renders the visual line between steps (horizontal or vertical); it MUST be replaceable via the `connector` prop on `Stepper`.
- **FR-016**: The library MUST export `MobileStepper` with `variant` (`dots` | `progress` | `text`), `steps`, `activeStep`, `backButton`, `nextButton` props.
- **FR-017**: The existing `Stepper` data-driven API MUST remain functional and backward-compatible.

#### Radio Components

- **FR-018**: The library MUST export `Radio` as an alias or replacement for `RadioButton`, accepting `value`, `checked`, `onChange`, `disabled`, `color`, `size` props.
- **FR-019**: The library MUST export `RadioGroup` as a context provider that manages `value` and fires `onChange` for child `Radio` components, accepting `name`, `value`, `defaultValue`, `onChange`, `row` props. When `row={true}`, child `Radio` components MUST be arranged in a horizontal flex row.
- **FR-020**: `RadioButton` MUST remain exported (backward compatibility); it MUST behave identically to `Radio`.

#### useMediaQuery Hook

- **FR-021**: The library MUST export a `useMediaQuery` hook accepting either a named breakpoint string (`"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`) or a raw query string. Raw query strings MUST support `min-width` and `max-width` features only (e.g., `"(min-width: 600px)"`, `"(max-width: 899px)"`); other CSS media features (orientation, resolution, etc.) are out of scope.
- **FR-022**: `useMediaQuery` MUST return `true` when the current window width satisfies the query and `false` otherwise.
- **FR-023**: `useMediaQuery` MUST update reactively when window dimensions change (orientation change, split-screen resize).
- **FR-024**: Named breakpoints in `useMediaQuery` MUST use the same breakpoint values as the existing theme (`xs: 0`, `sm: 600`, `md: 900`, `lg: 1200`, `xl: 1536` — in dp).

#### General

- **FR-025**: All new and modified components MUST be fully exported from the library's main `src/index.ts` entry point.
- **FR-026**: All new components MUST have TypeScript type definitions with strict types; no `any` types in public API surfaces.
- **FR-027**: All new components MUST have unit tests with ≥ 80% branch coverage for their public props.
- **FR-028**: All new components MUST support the `sx` prop for style overrides consistent with existing components.
- **FR-029**: The existing library test suite MUST continue to pass (0 regressions) after all changes.

### Key Entities

- **Component**: A React Native functional component exported from the library; receives typed props; renders via `StyleSheet`.
- **Sub-component**: A component that only functions meaningfully as a child of a parent component, communicating state via React context.
- **Hook**: A React hook (`use*`) exported from the library; stateless; derived from existing RN APIs.
- **Context**: An internal React context object shared between a parent component and its composable children; not part of the public API.
- **Breakpoint**: A named width threshold (`xs/sm/md/lg/xl`) defined in the theme; used by `useMediaQuery` and responsive layout props.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All new components and sub-components are importable directly from `mui-native` with zero additional setup — verified by importing in a fresh showcase screen and rendering without error.
- **SC-002**: A developer migrating a typical MUI web `List` screen to React Native with the new sub-components completes the migration without adding any custom wrapper components.
- **SC-003**: The full library test suite (currently 451 tests / 36 suites) passes with 0 failures after all changes are applied.
- **SC-004**: TypeScript strict mode reports 0 errors across the new and modified source files.
- **SC-005**: `useMediaQuery` returns the correct boolean for all 5 named breakpoints on both portrait and landscape orientations within a single test run.
- **SC-006**: The alignment report coverage improves from **83.9% fully aligned to ≥ 94%** (measured against 56 applicable components).
- **SC-007**: All partial-coverage components (`List`, `Accordion`, `Stepper`, `RadioGroup`) are reclassified from ⚠️ to ✅ in the updated alignment report.

## Assumptions

- **Scope**: `TransferList` drag-to-reorder and `Popper` anchor engine improvements are **out of scope** for this feature (classified as Low priority; require separate gesture-heavy work tracked in future spec).
- **Backward compatibility**: All existing component APIs remain unchanged. New sub-components are additive exports only.
- **Theme alignment**: Named breakpoints (`xs/sm/md/lg/xl`) already defined in the existing theme tokens; `useMediaQuery` consumes them without new theme changes.
- **Animation**: Accordion expand/collapse uses the existing `Collapse` component; no new animation primitives needed.
- **Composable Accordion**: The existing data-driven `Accordion` props (`title`, `expanded`, `content`, etc.) continue to work; the composable API is an additional usage pattern layered via React context internally.
- **Stepper backward compatibility**: The existing `Stepper` with `steps: string[]` prop continues to render correctly; the composable pattern is an alternative usage mode detected by the presence of `Step` children.
- **RadioButton/Radio**: Both names are exported; `Radio` is the canonical name going forward; `RadioButton` is kept as a re-export alias to avoid breaking existing usage.
- **Test tooling**: RNTL 12.9.0 is in use; `accessible={true}` must be set alongside `role=` props on `View`-based components for `getByRole()` to work correctly in tests.
- **No new peer dependencies**: All required capabilities (`Animated`, `useWindowDimensions`, `StyleSheet`, `Pressable`) are available in the existing `react-native` ≥ 0.73 peer dep; no new packages needed.
