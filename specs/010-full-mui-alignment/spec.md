# Feature Specification: Full MUI-Native ↔ Material UI Alignment

**Feature Branch**: `010-full-mui-alignment`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Align MUI-Native à Material UI entièrement, fait un fetch du site de la documentation pour tout Savoir"  
**MUI source fetched**: https://mui.com/material-ui/all-components/ + individual API pages (2026-04-06)  
**Baseline**: mui-native 78 components · ~85% MUI coverage (excl. web-only) · branch `009-mui-config-sync` in-progress

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Familiar API for MUI Web Migrants (Priority: P1)

A developer who has built with Material UI Web wants to adopt MUI-Native for a React Native project. They expect to write the same component usage they already know — `open` on Dialog, `checked`/`onChange` on Switch, `badgeContent` on Badge, `helperText` on TextField — without reading a migration guide or renaming every prop.

**Why this priority**: This is the single biggest barrier to adoption. Every prop name mismatch forces a lookup and a code change; eliminating them unlocks the library's core value proposition of "drop-in RN replacement."

**Independent Test**: Import `Dialog`, `Switch`, `Badge`, and `TextField` from `mui-native`. Use the props `open`, `checked`, `onChange`, `badgeContent`, and `helperText` exactly as they appear in MUI Web documentation. Confirm all components render and behave correctly with no PropTypes warnings or TypeScript errors.

**Acceptance Scenarios**:

1. **Given** a developer uses `<Dialog open={isOpen} onClose={handleClose}>`, **When** the component renders, **Then** it opens and closes using those prop names without requiring `visible` or `onDismiss`
2. **Given** a developer uses `<Switch checked={value} onChange={e => setValue(e.target.checked)} />`, **When** the state updates, **Then** the switch toggles using `checked`/`onChange` semantics
3. **Given** a developer uses `<Badge badgeContent={4} />` and `<Badge invisible={true} />`, **When** rendered, **Then** badge shows count and hides correctly under these MUI-idiomatic prop names
4. **Given** a developer uses `<TextField helperText="Required field" error={true} />`, **When** rendered, **Then** helper text and error styling apply with `error` as a boolean (not a string)
5. **Given** a developer uses `<Menu open={menuOpen} onClose={handleClose}>`, **When** rendered, **Then** menu shows and hides under MUI-idiomatic prop names

---

### User Story 2 — Missing Progress Indicators (Priority: P1)

A developer is building a data-loading UI and needs progress feedback components. MUI provides `CircularProgress` (spinner with determinate arc) and `LinearProgress` (horizontal bar with buffer and query variants). Both are completely absent from mui-native today, leaving developers to either build from scratch or use ActivityIndicator as a partial substitute.

**Why this priority**: Progress indicators are among the most frequently used feedback components in any data-driven app. Their absence is a hard blocker, not a stylistic gap.

**Independent Test**: Import `CircularProgress` and `LinearProgress` from `mui-native`. Render `<CircularProgress variant="determinate" value={60} />` — confirms a circular arc at approximately 216°. Render `<LinearProgress variant="buffer" value={40} valueBuffer={70} />` — confirms two independently tracked bars. Both work without ActivityIndicator.

**Acceptance Scenarios**:

1. **Given** `<CircularProgress />`, **When** rendered, **Then** an animated indeterminate spinner displays using the theme primary color
2. **Given** `<CircularProgress variant="determinate" value={75} />`, **When** rendered, **Then** a 270° arc is shown (75% of full circle)
3. **Given** `<CircularProgress size={64} thickness={6} color="secondary" />`, **When** rendered, **Then** spinner dimensions and color match props
4. **Given** `<LinearProgress variant="determinate" value={50} />`, **When** rendered, **Then** bar fills exactly 50% of container width
5. **Given** `<LinearProgress variant="buffer" value={40} valueBuffer={70} />`, **When** rendered, **Then** primary track at 40% and buffer track at 70% are both visible
6. **Given** `<LinearProgress variant="indeterminate" />`, **When** rendered, **Then** an animated bar cycles across the full width continuously

---

### User Story 3 — Full-Featured Form TextField (Priority: P2)

A developer building a form needs a text input that supports all standard MUI props: three visual variants (`filled`, `outlined`, `standard`), multiline with controlled row counts, full-width layout, required field marking, and boolean error state. The current TextField is missing `variant="standard"`, `multiline`, `rows`, `fullWidth`, and `required`.

**Why this priority**: Forms are the primary interaction surface in most apps. A half-implemented TextField forces developers to build custom wrappers, harming productivity and consistency.

**Independent Test**: Copy a MUI Web TextField example using `variant="standard" multiline rows={4} fullWidth required error={true} helperText="This field is required"`. Paste into a mui-native file. Confirm it renders and TypeScript does not flag any prop as unknown.

**Acceptance Scenarios**:

1. **Given** `<TextField variant="standard" />`, **When** rendered, **Then** an underline-style input with no border box is displayed
2. **Given** `<TextField multiline rows={4} />`, **When** rendered, **Then** a 4-line tall input area is displayed
3. **Given** `<TextField fullWidth />`, **When** rendered, **Then** the input stretches to fill its parent container width
4. **Given** `<TextField required />`, **When** rendered, **Then** a required indicator (asterisk) is shown on the label
5. **Given** `<TextField error={true} helperText="Invalid input" />`, **When** rendered, **Then** error color applies to border/text and helper text is shown in error color

---

### User Story 4 — Composable Sub-Components (Priority: P2)

A developer building a card layout, a confirmation dialog, or a data table expects to compose MUI sub-components the same way they do on web: `<Card><CardHeader /><CardMedia /><CardContent /><CardActions /></Card>`, `<Dialog><DialogTitle /><DialogContent /><DialogActions /></Dialog>`, and `<TableContainer><Table><TableHead>...</TableHead></Table></TableContainer>`. These sub-components are either missing or incomplete in mui-native.

**Why this priority**: Composable patterns are how MUI's design system achieves flexible, accessible layouts. Missing sub-components mean developers cannot follow MUI tutorials or copy code examples at all.

**Independent Test**: Copy the "Basic Card" and "Confirmation Dialog" from the official MUI documentation. Paste both into a mui-native screen. Confirm both compile and render without adding any new imports beyond `mui-native`.

**Acceptance Scenarios**:

1. **Given** a Card with `CardHeader`, `CardMedia`, `CardContent`, and `CardActions`, **When** rendered, **Then** each section occupies its correct layout position with correct spacing
2. **Given** a `Dialog` with `DialogTitle`, `DialogContent`, `DialogContentText`, and `DialogActions`, **When** opened, **Then** the structured layout renders with title, scrollable body, and action buttons
3. **Given** `<Dialog fullScreen>` and `<Dialog maxWidth="lg" fullWidth>`, **When** rendered, **Then** the dialog fills the screen or is constrained to the specified width
4. **Given** a `Table` composed of `TableContainer`, `TableHead`, `TableBody`, `TableRow`, and `TableCell`, **When** rendered, **Then** a structured grid with header and data rows is displayed
5. **Given** `<TablePagination count={100} rowsPerPage={10} page={0} onPageChange={fn} />`, **When** rendered, **Then** pagination controls show page count and navigate between pages

---

### User Story 5 — Exportable Transition Utilities (Priority: P3)

A developer building animated overlays, drawers, or custom animations wants to use MUI named transition components — `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse` — as standalone wrappers around any React Native element. Today these exist internally but are not exported from the public API.

**Why this priority**: Transitions are reused across many custom components. Not exporting them forces duplication. Low-effort, high-value.

**Independent Test**: Write `import { Fade, Grow, Slide, Zoom, Collapse } from 'mui-native'` in a new file. TypeScript resolves all five without errors. Render `<Fade in={show}><View /></Fade>` — the child fades in/out when `show` toggles.

**Acceptance Scenarios**:

1. **Given** `import { Fade } from 'mui-native'`, **When** `in={true}` transitions to `in={false}`, **Then** the child's opacity animates from 1 to 0
2. **Given** `<Collapse in={expanded}>`, **When** `in` changes, **Then** the child expands or collapses with a vertical size animation
3. **Given** `<Slide direction="up" in={open}>`, **When** `in` changes, **Then** the child translates into or out of view from the specified direction
4. **Given** all five transitions imported from top-level, **When** compiled with TypeScript strict mode, **Then** no type errors occur

---

### User Story 6 — Typography MUI Variant Vocabulary (Priority: P3)

A developer used to MUI Typography variant names (`h1`, `h2`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `overline`) wants to use them in mui-native without learning a separate MD3 vocabulary.

**Why this priority**: Typography is one of the first things a developer uses and the most frequent friction point when migrating. Additive aliases have zero runtime cost.

**Independent Test**: Write `<Typography variant="body1">Hello</Typography>` and `<Typography variant="h4">Title</Typography>` in a mui-native project. Both render with appropriate MD3-equivalent styling; TypeScript accepts both MD2 and MD3 variant names.

**Acceptance Scenarios**:

1. **Given** `<Typography variant="h1">`, **When** rendered, **Then** text is styled with the MD3 `displayLarge` equivalent
2. **Given** `<Typography variant="body1">` and `<Typography variant="bodyMedium">`, **When** both rendered, **Then** both produce the same visual output (MD2 and MD3 are aliases for the same style)
3. **Given** a TypeScript file using all 13 MUI MD2 variant names, **When** compiled, **Then** no type errors occur

---

### Edge Cases

- What happens when both the old prop name (e.g., `visible`) and the new alias (`open`) are passed to the same component? The MUI-idiomatic name takes precedence; a console warning is emitted in development builds only.
- What happens when `CircularProgress value` is outside 0–100? Values are clamped: below 0 is treated as 0, above 100 is treated as 100.
- What happens when `LinearProgress variant="buffer"` is used without `valueBuffer`? The buffer track defaults to the `value` prop value.
- What happens when Dialog sub-components are used outside a `Dialog` parent? Each sub-component renders standalone without errors, matching MUI Web behavior.
- What happens when `AvatarGroup` contains more children than `max`? Excess avatars are hidden and a `+N` surplus avatar is shown using `renderSurplus` or a default renderer.
- What happens when `Table` is rendered without `TableContainer`? It renders correctly; `TableContainer` adds optional scroll wrapping only.
- What happens when `TextField error` receives a string value (legacy usage)? The string triggers error styling AND is automatically rendered as the helper text if no separate `helperText` prop is provided; if both are supplied, `helperText` takes precedence.

## Requirements *(mandatory)*

### Functional Requirements

**Prop Alignment (Additive Aliases)**

- **FR-001**: The `Dialog`, `Modal`, `Menu`, `Snackbar`, and `BottomSheet` components MUST accept `open: boolean` as a direct alias for their existing `visible` prop.
- **FR-002**: The `Menu` and `Modal` components MUST accept `onClose: () => void` as a direct alias for `onDismiss`. (Dialog's `onClose` is separately specified in FR-027, which carries a `DialogOnCloseReason` argument.)
- **FR-003**: The `Switch` component MUST accept `checked: boolean` as a readable alias for its boolean value prop, and `onChange(event: { target: { checked: boolean } }) => void` as an alias for `onValueChange`. The `Rating` component MUST accept `value: number | null` as its primary value prop and `onChange: (event: React.SyntheticEvent | null, value: number | null) => void` as an alias for `onValueChange`; a `checked: boolean` alias is **not** applicable to `Rating` due to semantic incompatibility (Rating is a numeric 0–5 picker, not a boolean toggle).
- **FR-004**: The `Slider` component MUST accept `onChange(event, value) => void` with the standard MUI callback signature.
- **FR-005**: The `TextField` component MUST accept `helperText: ReactNode` as a direct alias for `supportingText`, and `error: boolean | string`. A boolean `true` triggers error styling. A non-empty string triggers error styling AND is automatically rendered as the helper text if no separate `helperText` prop is provided (if both are given, `helperText` takes precedence). This preserves backward compatibility while giving the string a visible role.
- **FR-006**: The `Badge` component MUST accept `badgeContent: ReactNode` as a direct alias for `content`, and `invisible: boolean` (`invisible={true}` hides the badge — inverse of `visible`).
- **FR-007**: All alias props MUST be strictly additive and backward-compatible. Existing mui-native prop names MUST continue to work without deprecation warnings.

**New Components: Progress Indicators**

- **FR-008**: The library MUST provide a `CircularProgress` component with props: `variant: 'determinate' | 'indeterminate'` (default: `'indeterminate'`), `value: number` (0–100), `color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | string` (default: `'primary'`), `size: number | string` (default: `40`), `thickness: number` (default: `3.6`), `disableShrink: boolean` (default: `false`), `enableTrackSlot: boolean` (default: `false`).
- **FR-009**: `CircularProgress` with `variant="determinate"` MUST render a static arc whose sweep angle corresponds to `value` (0 → 0°, 100 → 360°). With `variant="indeterminate"` it MUST animate continuously.
- **FR-010**: When `enableTrackSlot={true}`, `CircularProgress` MUST render a subtle full-circle background ring behind the progress arc.
- **FR-011**: The library MUST provide a `LinearProgress` component with props: `variant: 'buffer' | 'determinate' | 'indeterminate' | 'query'` (default: `'indeterminate'`), `value: number` (0–100), `valueBuffer: number` (0–100, for buffer variant), `color: 'inherit' | 'primary' | 'secondary' | string` (default: `'primary'`).
- **FR-012**: `LinearProgress` with `variant="buffer"` MUST render two independently animated tracks: a primary track at `value`% and a buffer track at `valueBuffer`%.
- **FR-013**: The existing `ActivityIndicator` component MUST remain exported and unchanged. It is NOT replaced by `CircularProgress`.

**New Component: AvatarGroup**

- **FR-014**: The library MUST provide an `AvatarGroup` component with props: `max: number` (default: `5`), `total: number` (overrides computed surplus count), `spacing: 'medium' | 'small' | number` (default: `'medium'`), `variant: 'circular' | 'rounded' | 'square'` (default: `'circular'`), `renderSurplus: (surplus: number) => ReactNode`.
- **FR-015**: When `Avatar` children count exceeds `max`, `AvatarGroup` MUST hide the excess and display a surplus element showing `+N` using `renderSurplus` if provided, or a default `Avatar` with count text.

**TextField Completeness**

- **FR-016**: `TextField` MUST support `variant: 'filled' | 'outlined' | 'standard'` (default: `'outlined'`). The `'standard'` variant MUST render an underline-only input with no surrounding box or background fill.
- **FR-017**: `TextField` MUST support `multiline: boolean`, `rows: number`, `minRows: number`, and `maxRows: number`. When `multiline={true}` and `rows` is set, the height is fixed; when `minRows`/`maxRows` are set, the input auto-grows within those bounds.
- **FR-018**: `TextField` MUST support `fullWidth: boolean` — input stretches to fill its parent container when `true`.
- **FR-019**: `TextField` MUST support `required: boolean` — an asterisk is rendered alongside the label when `true`.
- **FR-020**: `TextField` MUST support `select: boolean` — when `true`, a `Select` component is rendered inside the text field, matching MUI's composition pattern.

**Card Sub-Components**

- **FR-021**: The library MUST export `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, and `CardActionArea` as top-level named exports.
- **FR-022**: `CardHeader` MUST accept `avatar: ReactNode`, `title: ReactNode`, `subheader: ReactNode`, and `action: ReactNode`.
- **FR-023**: `CardMedia` MUST accept `image: string` (URI), `component: string | ComponentType`, `alt: string`, and `height: number | string`.
- **FR-024**: `CardActions` MUST accept `disableSpacing: boolean` (default: `false`) to suppress default button spacing.

**Dialog Sub-Components**

- **FR-025**: The library MUST export `DialogTitle`, `DialogContent`, `DialogContentText`, and `DialogActions` as top-level named exports.
- **FR-026**: `Dialog` MUST support `fullScreen: boolean`, `fullWidth: boolean`, `maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false` (default: `'sm'`), and `scroll: 'body' | 'paper'` (default: `'paper'`).
- **FR-027**: `Dialog`'s `onClose` callback MUST receive a `reason` argument. RN-equivalent reasons are `'backdropPress'` and `'hardwareBackPress'` (documented as RN-DEVIATION from MUI Web's `'backdropClick'` / `'escapeKeyDown'`).

**Table Sub-Components**

- **FR-028**: The library MUST export `Table`, `TableContainer`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableSortLabel`, and `TablePagination` as top-level named exports alongside the existing `DataTable`.
- **FR-029**: `Table` MUST support `stickyHeader: boolean` (default: `false`) for a fixed header during vertical scroll.
- **FR-030**: `TablePagination` MUST accept `count: number`, `page: number`, `rowsPerPage: number`, `onPageChange: (page: number) => void`, and `rowsPerPageOptions: number[]`. The `event` first-argument from MUI Web's `(event: React.MouseEvent | null, page: number) => void` is dropped as a **RN-DEVIATION** — React Native has no synthetic mouse events.

**Transition Exports**

- **FR-031**: `Fade`, `Grow`, `Slide`, `Zoom`, and `Collapse` MUST be exported as named top-level exports from the library's public API (`src/index.ts`).
- **FR-032**: Each transition component MUST accept at minimum `in: boolean`, `timeout: number | { enter: number; exit: number }`, and `children: ReactElement`.
- **FR-033**: `Slide` MUST accept `direction: 'down' | 'left' | 'right' | 'up'` (default: `'down'`).

**Typography MD2 Aliases**

- **FR-034**: The `Typography` component MUST accept all 13 MUI MD2 variant names as valid `variant` values: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline'`.
- **FR-035**: A `typographyVariantMap` object MUST be exported from `src/tokens/typography.ts` (and re-exported through `src/tokens/index.ts`), mapping each MD2 name to its MD3 equivalent. MD3 names remain the default; MD2 names are resolved through this map at render time.

**RN-Deviation Documentation**

- **FR-036**: All intentionally web-only MUI features MUST have a `// RN-DEVIATION:` comment in source plus a corresponding documentation note explaining the web feature and its recommended RN alternative. Minimum scope: `TransferList`, `TextareaAutosize`, `NoSsr`, `Popper`, `Portal`.

**Cross-Cutting**

- **FR-037**: All new and modified components MUST support `sx`, `slots`, `slotProps`, `size`, and `color` props as standardized by feature `009-mui-config-sync`.
- **FR-038**: All new components MUST have unit tests covering required prop combinations and edge cases.
- **FR-039**: All exported symbols MUST be TypeScript-compatible under `"strict": true` with no `any` in public-facing prop types.

### Key Entities

- **Prop Alias Map**: Developer-facing contract linking each MUI-idiomatic prop name (e.g., `open`) to the current internal name (e.g., `visible`). Attributes: MUI prop name, internal prop name, affected components, direction (read/write/both).
- **Component Coverage Matrix**: Tabular record of all 58 MUI components, their status in mui-native (present / missing / partial), and MUI category (Inputs, Feedback, etc.).
- **Typography Variant Map**: Key-value export mapping all 13 MUI MD2 typography variant names to their MD3 equivalents (e.g., `body1 → bodyMedium`).
- **RN-Deviation Registry**: List of intentionally absent or different features, each with: MUI feature name, reason for deviation (web DOM API, web drag API, SSR, etc.), recommended RN alternative.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can copy any MUI Web code example for `Dialog`, `Switch`, `Badge`, `TextField`, `Menu`, `Snackbar`, or `Rating` and paste it into a mui-native project with **zero prop renames** required for the aliased props defined in FR-001 through FR-006.
- **SC-002**: `CircularProgress` with `variant="determinate"` renders an arc whose angular coverage matches the `value` prop to within ±2° for values 0, 25, 50, 75, and 100 — verified by snapshot tests at all five values.
- **SC-003**: `LinearProgress` renders all four variants (`indeterminate`, `determinate`, `buffer`, `query`) without errors, and the buffer variant displays two visually distinct fills for `value` and `valueBuffer` simultaneously.
- **SC-004**: All five transition components (`Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`) are importable by name from `mui-native` with no TypeScript strict-mode errors.
- **SC-005**: The official MUI documentation examples for "Basic Card" (with sub-components), "Confirmation Dialog" (with sub-components), and "Basic Table" (with `TableContainer` / `TableHead` / `TableBody` / `TableRow` / `TableCell`) compile and render in mui-native with **5 or fewer** prop changes per example.
- **SC-006**: `Typography` accepts all 13 MUI MD2 variant names and renders each with the correct MD3-equivalent text styling — verified by side-by-side snapshot comparison with MD3 names.
- **SC-007**: The library's overall MUI component coverage rises from approximately 85% to **≥95%** as measured by re-running the component parity analysis against the official MUI all-components page (at least 53 of 55 applicable non-web-only components covered). The 55 applicable count is derived from 58 total MUI components minus 3 formal web-only component exclusions: `TransferList`, `TextareaAutosize`, and `Popper`. `Portal` and `NoSsr` are utility wrappers not counted in the 58-component census and are documented separately under FR-036.
- **SC-008**: All new and modified components pass TypeScript compilation under `"strict": true` with zero type errors and no `any` in public-facing prop types.
- **SC-009**: Every intentionally absent web-only MUI feature (minimum 5) is documented with a `// RN-DEVIATION:` comment in source code plus a corresponding entry in the library's documentation, so consumers are never silently surprised by a missing feature.

## Assumptions

- **Scope of "complete"**: Full alignment means ≥95% prop parity with MUI v7.3.9, not 100%. Features that rely on browser DOM APIs (`TransferList` drag-and-drop, `TextareaAutosize`, `Popper`, `Portal`, `NoSsr`) are intentional React Native deviations excluded from the coverage target — they must only be documented.
- **No breaking changes**: All prop additions are strictly additive. Existing mui-native prop names (`visible`, `onDismiss`, `supportingText`, etc.) continue to work indefinitely and are not deprecated in this feature.
- **MD3 default preserved**: Material Design 3 remains the default and preferred design vocabulary. MD2 variant names are additive aliases resolved through the typography variant map; they do not change any default styling.
- **Feature 009 prerequisite**: The `sx`, `slots`, `slotProps`, `size`, and `color` standardization from `009-mui-config-sync` MUST be merged before implementing this feature (**hard gate** — feature 010 implementation is blocked until 009 is merged and its public API is stable). All new components in this spec assume that infrastructure is already in place.
- **ActivityIndicator preserved**: `ActivityIndicator` remains as a distinct exported component serving the native RN use case. `CircularProgress` is a new peer providing MUI API parity.
- **MUI version pinned**: This spec targets MUI v7.3.9 APIs fetched on 2026-04-06. If the MUI API changes significantly before implementation begins, the plan phase should re-fetch and reconcile.
- **Snackbar queue behavior preserved**: The queue-based Snackbar architecture is intentional for mobile UX. The `open`/`onClose` aliases are added for direct-mode usage only; queue-mode remains the recommended pattern.
- **Table composable vs DataTable**: The existing `DataTable` (opinionated, with sorting, pagination, virtualization) is preserved unchanged. The new `Table` + sub-components form a separate low-level composable API.
- **Dialog `onClose` reason mapping**: MUI Web uses `'escapeKeyDown'` and `'backdropClick'`. The RN equivalents (`'hardwareBackPress'` and `'backdropPress'`) are documented as RN-DEVIATION for the `reason` argument type.

## Clarifications

### Session 2026-04-06

- Q: Should FR-003's `checked` alias apply to both `Switch` and `Rating`, or should they be split since Rating is a numeric 0–5 picker? → A: Split — `Switch` retains `checked: boolean` / `onChange({ target: { checked } })`; `Rating` uses `value: number | null` / `onChange(event, value)`. `checked` is not applicable to `Rating` (semantic incompatibility). FR-003 updated accordingly.
- Q: SC-007 targets "53 of 55 applicable" from 58 total, but FR-036 names 5 web-only features — are 3 or 5 components excluded from the 55 count? → A: 3 formal web-only React components are excluded from the 58 census (`TransferList`, `TextareaAutosize`, `Popper`). `Portal` and `NoSsr` are utility wrappers not counted among the 58 components. SC-007 updated to name the 3 exclusions explicitly.
- Q: When `TextField error` receives a string, does the string become the helper text automatically, or only trigger error styling? → A: The string both triggers error styling AND auto-renders as helper text if no separate `helperText` is provided; `helperText` takes precedence when both are given. FR-005 and Edge Cases updated.
- Q: Should `TablePagination.onPageChange` keep MUI Web's `(event, page) => void` signature or drop the event arg as a RN-DEVIATION? → A: Drop the event arg — use `(page: number) => void`, documented as RN-DEVIATION. FR-030 updated.
- Q: Is Feature 009 a soft or hard prerequisite for Feature 010 implementation? → A: Hard gate — Feature 010 implementation is blocked until Feature 009 is merged and stable. Assumptions section updated.
