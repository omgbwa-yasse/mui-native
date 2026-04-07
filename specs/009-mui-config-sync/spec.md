# Feature Specification: MUI API Alignment — Global Config, Size, Color & sx

**Feature Branch**: `009-mui-config-sync`
**Created**: 2026-04-05
**Status**: Draft
**Input**: User description: "Importe MUI et analyse son code et copie la configuration des components et applique à tout MUI-NATIVE"

## Overview

MUI (Material UI for web) defines a set of API conventions that developers know by heart: a `theme.components` dictionary for global default props and style overrides, a `size` prop on all interactive components, a `color` semantic prop on all colorable components, and an `sx` prop for quick inline token-based styling.

MUI-Native currently has none of these conventions applied uniformly. This feature aligns MUI-Native's component API and theme system with MUI's conventions so that any developer already familiar with MUI can use MUI-Native immediately without re-learning prop names, patterns, or configuration mechanisms.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Global component configuration via `theme.components` (Priority: P1)

A developer using MUI-Native wants to set default props for every `Button` in the app (e.g., always `variant="tonal"`) and override the visual style of `TextField` labels globally — without touching each call site.

**Why this priority**: This is the most impactful MUI convention. It unblocks design system teams from managing per-instance overrides and enables white-labelling. All other conventions build on top of it.

**Independent Test**: Create a `ThemeProvider` with `components: { Button: { defaultProps: { variant: 'tonal' } } }`. Render a `<Button label="Test" />` with no explicit `variant`. Verify it renders as tonal.

**Acceptance Scenarios**:

1. **Given** `theme.components.Button.defaultProps.variant = 'tonal'`, **When** a `<Button>` is rendered with no `variant` prop, **Then** it displays the tonal style.
2. **Given** `theme.components.TextField.styleOverrides.label = { color: '#FF0000' }`, **When** any `<TextField>` is rendered, **Then** its label text appears red.
3. **Given** a component prop is set both in `defaultProps` and directly on the instance, **When** the component mounts, **Then** the instance prop takes precedence over `defaultProps`.
4. **Given** `theme.components.Button.defaultProps.disabled = true`, **When** a `<Button disabled={false} />` is rendered, **Then** the instance value (`false`) overrides the default.

---

### User Story 2 — Uniform `size` prop on all interactive components (Priority: P2)

A developer wants to render a compact form by passing `size="small"` to `Button`, `TextField`, `Checkbox`, `Switch`, `IconButton`, `Chip`, `Avatar`, `Badge`, `Select`, and all other interactive components — using the same prop name with consistent visual scaling.

**Why this priority**: UI density control is the second most-requested MUI feature. Today `size` exists on only 5 of 70+ components, creating inconsistency.

**Independent Test**: Render `<Button size="small" label="X" />` and `<Button size="large" label="X" />` side by side. Verify the small variant is visually smaller in both height and font.

**Acceptance Scenarios**:

1. **Given** `size="small"`, **When** an interactive component renders, **Then** its padding and text are reduced relative to `size="medium"` (the default) while its touch target remains ≥48×48 dp (constitution Principle V).
2. **Given** `size="large"`, **When** an interactive component renders, **Then** its touch target, padding, and text are increased relative to `size="medium"`.
3. **Given** no `size` prop, **When** a component renders, **Then** it behaves identically to `size="medium"`.
4. **Given** `theme.components.Button.defaultProps.size = 'small'`, **When** any `<Button>` renders without an explicit `size`, **Then** it uses the small scale.

**Components in scope**: All 78 MUI-Native components receive the `size` prop in this feature. Complete parity with MUI is the goal; no component is excluded.

---

### User Story 3 — Semantic `color` prop on all colorable components (Priority: P3)

A developer wants to use `<Button color="error" />`, `<Chip color="success" />`, `<CircularProgress color="secondary" />` — the same semantic color names that MUI uses — and have them automatically map to the correct MD3 color roles from the active theme.

**Why this priority**: Color semantics are the third pillar of MUI's API. Currently only `FAB` has a `color` prop; all other components hard-code `colorScheme.primary`, making it impossible to create a "danger" button without custom styling.

**Independent Test**: Render `<Button color="error" label="Delete" />`. Verify it uses the theme's error color (not the primary color).

**Acceptance Scenarios**:

1. **Given** `color="primary"`, **When** the component renders, **Then** it uses `colorScheme.primary` and `colorScheme.onPrimary`.
2. **Given** `color="secondary"`, **When** the component renders, **Then** it uses `colorScheme.secondary` and `colorScheme.onSecondary`.
3. **Given** `color="error"`, **When** the component renders, **Then** it uses `colorScheme.error` and `colorScheme.onError`.
4. **Given** `color="success"` or `color="warning"`, **When** the component renders, **Then** it uses the success/warning color roles defined in the extended color scheme.
5. **Given** no `color` prop, **When** the component renders, **Then** behavior is unchanged from today (defaults to `primary`).

**Color tokens required**: `success`, `onSuccess`, `successContainer`, `onSuccessContainer`, `warning`, `onWarning`, `warningContainer`, `onWarningContainer`, `info`, `onInfo`, `infoContainer`, `onInfoContainer` must be added to `ColorScheme` with static baseline values and seedColor support.

---

### User Story 4 — `sx` prop for inline token-based overrides (Priority: P4)

A developer wants to apply one-off spacing, color, or typography adjustments using design tokens directly on the component — without creating a `StyleSheet`, wrapping in a `View`, or importing the theme.

**Why this priority**: Prototyping speed. The `sx` prop is the most-used MUI productivity feature for quick UI tweaks.

**Independent Test**: Render `<Button sx={{ mt: 2, px: 3 }} label="Save" />`. Verify the button has a top margin of 8dp and horizontal padding of 12dp (using the 4dp grid).

**Acceptance Scenarios**:

1. **Given** `sx={{ mt: 2 }}` on any component, **When** it renders, **Then** it applies a top margin of `theme.spacing[2]` (8dp).
2. **Given** `sx={{ color: 'secondary' }}`, **When** a Text component renders, **Then** it uses `colorScheme.secondary`.
3. **Given** `sx` values conflict with explicit `style` props, **When** the component renders, **Then** `style` prop values take precedence over `sx`.
4. **Given** a component has no `sx` prop passed, **When** it renders, **Then** no performance overhead is introduced.

**`sx` shorthand scope**: Full MUI-parity system — array syntax, nested selectors, and responsive breakpoints (`xs/sm/md/lg/xl`) are included. On React Native, breakpoints resolve against the device's screen width using `useWindowDimensions`; nested selectors and CSS-only features are adapted to the React Native style model where applicable.

---

### User Story 5 — `slots` and `slotProps` for sub-component customization (Priority: P5)

A developer wants to replace or augment specific internal parts of a composite component — e.g., replace the `Chip`'s delete icon with a custom component, or inject extra `accessibilityLabel` onto the `TextField` inner input — using `slots` and `slotProps`.

**Why this priority**: Lower priority than prop parity. Only needed for advanced customization scenarios.

**Independent Test**: Render `<Chip slots={{ deleteIcon: MyCustomIcon }} label="Tag" onDelete={() => {}} />`. Verify the delete action renders `MyCustomIcon` instead of the default icon.

**Acceptance Scenarios**:

1. **Given** `slots.deleteIcon = CustomIcon` on `Chip`, **When** the chip renders with `onDelete`, **Then** it shows `CustomIcon` instead of the default cancel icon.
2. **Given** `slotProps.input = { accessibilityLabel: 'Search field' }` on `TextField`, **When** the field renders, **Then** the inner input has the provided accessibility label.
3. **Given** a `slots` key is not provided, **When** the component renders, **Then** it uses its default sub-component (no regression).

---

### Edge Cases

- What happens when `defaultProps` in `theme.components` sets a prop the component does not recognize? (Must be silently ignored — no crash.)
- How does `sx` interact with the `style` prop when both are provided? (`style` prop wins — applied on top of `sx`.)
- How does `color="error"` behave when the theme has no custom error configuration? (Uses static baseline error color from MD3.)
- Can `size` cascade from a group component to its children (e.g., `ButtonGroup size="small"`)? (Yes — via context, matching MUI behavior.)
- What happens when `theme.components` references a component name that does not exist? (Should be type-safe at compile time; ignored at runtime.)

## Requirements *(mandatory)*

### Functional Requirements

#### FR-001 — `theme.components` extension
- **FR-001a**: `createTheme()` MUST accept a `components` key structured as `{ [ComponentName]: { defaultProps?: Partial<ComponentProps>; styleOverrides?: Record<string, object> } }`.
- **FR-001b**: Every component MUST read its own `defaultProps` from `theme.components` at render time and merge them with instance props (instance wins on conflict).
- **FR-001c**: Every component MUST apply `styleOverrides` from `theme.components` as a base style layer underneath its own internal styles. Specifically: `styleOverrides` are applied after the component's baseline layout styles but before token-derived color/typography styles, so visual overrides (e.g., label color) are respected. Style merge order is: baseline layout → `styleOverrides` → token-derived styles → `sx` → `style` prop.
- **FR-001d**: The `Theme` TypeScript interface MUST expose a fully-typed `components` dictionary covering all component names.

#### FR-002 — Uniform `size` prop
- **FR-002a**: All 78 MUI-Native components MUST accept `size?: 'small' | 'medium' | 'large'`, defaulting to `'medium'`.
- **FR-002b**: Visual scaling between sizes MUST be consistent: `small` reduces font size by ~20% and padding proportionally; `large` increases by ~20%. Touch targets MUST remain ≥48×48 dp for all size variants per constitution Principle V (WCAG 2.1 AA).
- **FR-002c**: `size` MUST cascade from group components to children via context (e.g., `ButtonGroup`, `ToggleButtonGroup`).
- **FR-002d**: `size` MUST be settable via `theme.components.ComponentName.defaultProps.size`.

#### FR-003 — Semantic `color` prop
- **FR-003a**: `ColorScheme` MUST be extended with six new semantic groups: `success`, `onSuccess`, `successContainer`, `onSuccessContainer`, `warning`, `onWarning`, `warningContainer`, `onWarningContainer`, `info`, `onInfo`, `infoContainer`, `onInfoContainer`.
- **FR-003b**: `createTheme()` MUST populate these roles in both light and dark modes with Material Design 3-compatible baseline values.
- **FR-003c**: All colorable components MUST accept `color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'`, defaulting to `'primary'`.
- **FR-003d**: Each `color` value MUST map to the corresponding container/on-container pair from `colorScheme`.

#### FR-004 — `sx` prop
- **FR-004a**: A shared `SxProps` type MUST be defined and available on all non-layout non-utility components.
- **FR-004b**: The `sx` system MUST resolve spacing shorthand keys (`m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`) using `theme.spacing`.
- **FR-004c**: The `sx` system MUST resolve color aliases (`color`, `backgroundColor`, `bg`, `borderColor`) using `colorScheme` role names as string aliases (e.g., `'primary'`, `'error'`).
- **FR-004d**: `sx` MUST support array syntax (last value wins), responsive breakpoints (`xs/sm/md/lg/xl` resolved against device screen width), and nested style objects where React Native's style model permits.
- **FR-004e**: `sx` values MUST be applied with lower specificity than the component's own `style` prop. When `sx` is absent or `undefined`, `useSx` MUST return `undefined` with zero allocation (no object creation, no memoization overhead).

#### FR-005 — `slots` / `slotProps`
- **FR-005a**: Composite components with distinct named sub-parts MUST accept `slots?: Partial<Record<SlotName, React.ComponentType>>` to swap those parts.
- **FR-005b**: Those same components MUST accept `slotProps?: Partial<Record<SlotName, object>>` to pass extra props to the default or custom slot component.
- **FR-005c**: Slot and slotProps definitions MUST be fully typed per-component.

#### FR-006 — No regressions
- **FR-006a**: All existing component APIs MUST remain unchanged; this feature only adds optional props.
- **FR-006b**: TypeScript strict mode MUST remain error-free across the library and showcase.
- **FR-006c**: All existing registry tests MUST continue to pass.

### Key Entities

- **`theme.components`**: A per-component configuration dictionary attached to `Theme`, holding `defaultProps` and `styleOverrides` keyed by component display name.
- **`SxProps`**: A shared type describing the flat token shorthand record accepted by the `sx` prop.
- **`ColorProp`**: Union type `'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info'` shared across all colorable components.
- **`SizeProp`**: Union type `'small' | 'medium' | 'large'` shared across all size-aware components.
- **`SlotDef`**: Per-component interface mapping slot names to expected React component types.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: *(Post-launch outcome metric — not a buildable deliverable)* A developer familiar with MUI can configure global component defaults in under 5 minutes using only their existing MUI knowledge. Validated informally during internal dogfooding; a formal usability checklist is out of scope for this sprint.
- **SC-002**: 100% of interactive components in scope respond to `size="small"` and `size="large"` with a visually distinct and consistent scaling.
- **SC-003**: 100% of colorable components render correctly with all 7 color values (`primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`) without visual regression.
- **SC-004**: TypeScript strict mode reports 0 errors across the entire library after all changes.
- **SC-005**: Existing snapshot and registry tests continue to pass at 100% (0 regressions).
- **SC-006**: The `sx` prop resolves spacing and color tokens correctly for 100% of documented shorthand keys.
- **SC-007**: Any component rendered without the new optional props (`size`, `color`, `sx`, `slots`, `slotProps`) is visually and functionally identical to its pre-feature state — confirmed by side-by-side screenshot comparison.

---

## Assumptions

- **Spacing base**: The 4dp grid (`spacing[1] = 4`) is the established base used for `sx` spacing shorthand computation. No new spacing scale is introduced.
- **Color mapping for `success`/`warning`/`info`**: These roles are not part of MD3's 30 core color roles; baseline values will use Material Design 3-compatible tonal palette derivations (green seed for success, amber for warning, blue-teal for info).
- **`styleOverrides` format**: Uses React Native `StyleSheet`-compatible objects, not CSS strings. This is a native-specific adaptation of MUI's convention.
- **`sx` scope for v1**: Full shorthand system — spacing shorthands, color aliases, array notation (last value wins), and responsive breakpoints (`xs/sm/md/lg/xl` resolved against device screen width via `useWindowDimensions`) are in scope per FR-004d. CSS-only features (pseudo-selectors, `@media` strings, `display` values other than `'flex'|'none'`) are silently ignored and documented with `// RN-DEVIATION:` comments.
- **Slot scope for v1**: Only composite components with clearly named sub-parts (e.g., `Chip`, `TextField`, `AppBar`, `Autocomplete`, `Stepper`) will receive `slots`/`slotProps`; atomic components (e.g., `Button`, `Switch`) do not have distinct slots.
- **No peer dependency changes**: The feature uses only existing peer dependencies (`react-native`, `react-native-reanimated`, `react-native-gesture-handler`).
- **`theme.components` is optional**: Omitting it entirely produces a theme with behavior identical to today (zero breaking change).
- [Assumption about data/environment, e.g., "Existing authentication system will be reused"]
- [Dependency on existing system/service, e.g., "Requires access to the existing user profile API"]
