# MUI-Native vs. Material UI — Alignment Report

> **Generated**: 2026-04-06  
> **MUI source**: [mui.com/material-ui/all-components/](https://mui.com/material-ui/all-components/) (live fetch — v7.x)  
> **mui-native audited**: `src/components/` — Feature 010 complete — 188 exports  
> **Branch**: `009-mui-config-sync` (post feature-010)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Fully aligned — component + main sub-components match MUI API |
| ⚠️ | Partial — component exists but sub-components or API diverge from MUI |
| ❌ | Absent — MUI component not present in mui-native |
| 🚫 | Intentionally excluded — documented in `rn-deviations.md`; N/A or impossible in React Native |
| ➕ | Extra — present in mui-native but not in MUI core (RN-specific or domain additions) |

---

## Summary Statistics

| Category | Total MUI | ✅ Full | ⚠️ Partial | ❌ Absent | 🚫 N/A |
|----------|-----------|---------|-----------|---------|--------|
| Inputs | 13 | 10 | 3 | 0 | 0 |
| Data Display | 10 | 9 | 1 | 0 | 0 |
| Feedback | 6 | 6 | 0 | 0 | 0 |
| Surface | 4 | 3 | 1 | 0 | 0 |
| Navigation | 9 | 8 | 1 | 0 | 0 |
| Layout | 6 | 5 | 0 | 1 | 0 |
| Lab | 2 | 2 | 0 | 0 | 0 |
| Utils | 10 | 4 | 1 | 1 | 4 |
| **TOTAL** | **60** | **47** | **7** | **2** | **4** |

**Applicable components** (60 − 4 N/A = 56):
- ✅ Fully aligned: **47 / 56 = 83.9%**
- ⚠️ Partial coverage: **7 / 56 = 12.5%**
- ❌ Missing: **2 / 56 = 3.6%**
- **Overall coverage (✅ + ⚠️): 54 / 56 = 96.4%**

---

## Extra Components (➕ — in mui-native, NOT in MUI core)

mui-native ships **18 extra components** beyond MUI's catalog, mostly React-Native-specific patterns or MUI X category components ported to RN:

| Component | Type | Notes |
|-----------|------|-------|
| `ActivityIndicator` | RN-native | React Native built-in loading spinner wrapper |
| `Banner` | Custom | Material-style informational banner |
| `BottomSheet` | Custom | Mobile modal bottom sheet (no MUI web equivalent) |
| `Charts` | Extra (MUI X-inspired) | Wraps `react-native-gifted-charts` |
| `CodeInput` | Custom | OTP / PIN entry field |
| `DataGrid` | Extra (MUI X-inspired) | Tabular data with sorting, filtering |
| `DataTable` | Custom | Simplified table with built-in state management |
| `DatePicker` | Extra (MUI X-inspired) | Calendar date picker for RN |
| `DateTimePicker` | Extra (MUI X-inspired) | Combined date + time picker |
| `HelperText` | Custom | Standalone form helper text |
| `HumanizationScoreBar` | Domain | Specialized score visualization |
| `InvitationStatusBadge` | Domain | Guest invitation state indicator |
| `NumberField` | Extra | Numeric input with increment/decrement |
| `Searchbar` | Custom | Prominent search input (Material 3 pattern) |
| `SegmentedButtons` | Custom | Segmented control (Material 3) |
| `TimePicker` | Extra (MUI X-inspired) | Time picker for RN |
| `TouchableRipple` | RN-native | Ripple feedback on press (ButtonBase equivalent) |
| `TreeView` | Extra (moved to MUI X) | Hierarchical tree structure |
| `WorkerAgentRow` | Domain | Agent worker list item |

---

## Detailed Component-by-Component Analysis

### 1. Inputs

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 1 | Autocomplete | `Autocomplete` | `src/components/Autocomplete/` | ✅ | Full filtering, freeSolo, multiple supported |
| 2 | Button | `Button` | `src/components/Button/` | ✅ | `text`/`contained`/`outlined` variants, `startIcon`, `endIcon`, `size`, `color`, `loading` |
| 3 | Button Group | `ButtonGroup` | `src/components/ButtonGroup/` | ✅ | Horizontal/vertical orientation, variant, size |
| 4 | Checkbox | `Checkbox` | `src/components/Checkbox/` | ✅ | Controlled/uncontrolled, `indeterminate`, `color`, `size` |
| 5 | Floating Action Button | `FAB` | `src/components/FAB/` | ✅ | `size` (small/medium/large/extended), `color`, `icon` |
| 6 | Radio Group | `RadioButton` | `src/components/RadioButton/` | ⚠️ | Component named `RadioButton` (not `Radio`/`RadioGroup`); no composable `RadioGroup` wrapper |
| 7 | Rating | `Rating` | `src/components/Rating/` | ✅ | `value`, `max`, `precision`, `readOnly`, `disabled`, `size` |
| 8 | Select | `Select` | `src/components/Select/` | ✅ | `native`, `multiple`, `variant`, `renderValue` |
| 9 | Slider | `Slider` | `src/components/Slider/` | ✅ | Range slider, `marks`, `step`, `valueLabelDisplay` |
| 10 | Switch | `Switch` | `src/components/Switch/` | ✅ | Controlled/uncontrolled, `color`, `size`, `disabled` |
| 11 | Text Field | `TextField` | `src/components/TextField/` | ✅ | All 3 variants, `multiline`, `rows`, `minRows`, `maxRows`, `helperText`, `error`, adornments |
| 12 | Transfer List | `TransferList` | `src/components/TransferList/` | ⚠️ | Implemented with checkbox selection; drag-and-drop variant excluded (see `rn-deviations.md`) |
| 13 | Toggle Button | `ToggleButton` + `ToggleButtonGroup` | `src/components/ToggleButton/` | ✅ | `exclusive`, `value`, `orientation`; full group context |

**Partial coverage details:**
- **RadioButton (⚠️)**: MUI exposes `<Radio>` + `<RadioGroup>` as composable pair. mui-native uses `<RadioButton>` as a standalone with no `RadioGroup` wrapper; consumer must manage group state manually.
- **TransferList (⚠️)**: checkbox-based transfer is fully functional; MUI's drag-and-drop reorder variant is excluded per `rn-deviations.md` (gesture-heavy, platform divergence).

---

### 2. Data Display

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 14 | Avatar | `Avatar` + `AvatarGroup` | `src/components/Avatar/` | ✅ | Image/text/icon variants; `AvatarGroup` with `max`, `spacing` (bonus) |
| 15 | Badge | `Badge` | `src/components/Badge/` | ✅ | `badgeContent`, `color`, `variant` (standard / dot), `max`, `anchorOrigin` |
| 16 | Chip | `Chip` | `src/components/Chip/` | ✅ | `variant`, `color`, `size`, `avatar`, `icon`, `onDelete`, `clickable` |
| 17 | Divider | `Divider` | `src/components/Divider/` | ✅ | Horizontal/vertical, `textAlign`, `variant` (fullWidth/inset/middle) |
| 18 | Icons | `Icon` | `src/components/Icon/` | ✅ | Named icon system; maps to react-native-vector-icons |
| 19 | Material Icons | `MaterialIcon` | `src/components/MaterialIcon/` | ✅ | Full Material Symbols integration via `react-native-vector-icons` |
| 20 | List | `List` + `ListItem` + `ListSection` + `ListAccordion` | `src/components/List/` | ⚠️ | Missing MUI sub-components: `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` |
| 21 | Table | `Table` + 8 sub-components | `src/components/Table/` | ✅ | Full set: `TableBody`, `TableCell`, `TableContainer`, `TableFooter`, `TableHead`, `TablePagination`, `TableRow`, `TableSortLabel` |
| 22 | Tooltip | `Tooltip` | `src/components/Tooltip/` | ✅ | `title`, `placement`, `arrow`, `open` (controlled) |
| 23 | Typography | `Text` (alias `Typography`) | `src/components/Text/` | ✅ | All MUI variants (h1–h6, subtitle1/2, body1/2, caption, overline, button); dual export |

**Partial coverage details:**
- **List (⚠️)**: `ListSection` and `ListAccordion` are mui-native-specific additions. The missing MUI sub-components (`ListItemButton` for pressable rows, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader`) limit compositional parity. Consumers must use `ListItem` directly with manual children.

---

### 3. Feedback

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 24 | Alert | `Alert` | `src/components/Alert/` | ✅ | `severity` (error/warning/info/success), `variant` (standard/filled/outlined), `icon`, `action`, `onClose` |
| 25 | Backdrop | `Backdrop` | `src/components/Backdrop/` | ✅ | `open`, `invisible`, `onClick`; uses `Modal` internally |
| 26 | Dialog | `Dialog` + 4 sub-components | `src/components/Dialog/` | ✅ | Full set: `DialogActions`, `DialogContent`, `DialogContentText`, `DialogTitle`; `fullScreen`, `maxWidth`, `scroll` |
| 27 | Progress | `CircularProgress` + `LinearProgress` | `src/components/CircularProgress/` + `LinearProgress/` | ✅ | Both determinate/indeterminate variants; `value`, `color`, `size`; buffer variant on Linear |
| 28 | Skeleton | `Skeleton` | `src/components/Skeleton/` | ✅ | `variant` (text/circular/rectangular/rounded), `animation` (pulse/wave/false), `width`, `height` |
| 29 | Snackbar | `Snackbar` + `SnackbarHost` + `useSnackbarQueue` | `src/components/Snackbar/` | ✅ | Core Snackbar; bonus: `SnackbarHost` + `useSnackbarQueue` for queue management (advantageous RN pattern) |

All 6 Feedback components are **fully aligned**. Snackbar exceeds MUI API with RN-optimized queue management.

---

### 4. Surface

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 30 | Accordion | `Accordion` | `src/components/Accordion/` | ⚠️ | Self-contained one-file component; `AccordionSummary`, `AccordionDetails`, `AccordionActions` NOT exported as separate components |
| 31 | App Bar | `AppBar` | `src/components/AppBar/` | ✅ | `position` (fixed/sticky/static), `color`, `elevation`, `enableColorOnDark` |
| 32 | Card | `Card` + 5 sub-components | `src/components/Card/` | ✅ | Full set: `CardActionArea`, `CardActions`, `CardContent`, `CardHeader`, `CardMedia`; `variant` (elevation/outlined) |
| 33 | Paper | `Paper` | `src/components/Paper/` | ✅ | `elevation`, `variant` (elevation/outlined), `square` |

**Partial coverage details:**
- **Accordion (⚠️)**: Currently a monolithic component managing its own expand/collapse. MUI's composable pattern (`<Accordion><AccordionSummary expandIcon={...}>...</AccordionSummary><AccordionDetails>...</AccordionDetails></Accordion>`) is not replicable — consumers cannot customize header/content/actions as separate exports.

---

### 5. Navigation

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 34 | Bottom Navigation | `NavigationBar` | `src/components/NavigationBar/` | ✅ | Renamed to `NavigationBar` (matches MD3 naming); `value`, `onChange`, `showLabels` |
| 35 | Breadcrumbs | `Breadcrumbs` | `src/components/Breadcrumbs/` | ✅ | `separator`, `maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse` |
| 36 | Drawer | `Drawer` | `src/components/Drawer/` | ✅ | `anchor` (left/right/top/bottom), `variant` (temporary/permanent/persistent), `open` |
| 37 | Link | `Link` | `src/components/Link/` | ✅ | `href`, `color`, `underline`, `variant`; uses RN `Linking` API |
| 38 | Menu | `Menu` + `MenuItem` | `src/components/Menu/` | ✅ | `anchorEl`, `open`, `dense`; `MenuItem` with `selected`, `disabled`, `divider` |
| 39 | Pagination | `Pagination` | `src/components/Pagination/` | ✅ | `count`, `page`, `shape`, `size`, `variant`, `siblingCount`, `boundaryCount` |
| 40 | Speed Dial | `SpeedDial` + `SpeedDialAction` | `src/components/SpeedDial/` | ✅ | `ariaLabel`, `direction`, `open`, `icon`; `SpeedDialAction` with `icon`, `tooltipTitle` |
| 41 | Stepper | `Stepper` | `src/components/Stepper/` | ⚠️ | Data-driven API (`steps` array prop); no composable `Step`, `StepLabel`, `StepContent`, `StepButton`, `StepConnector`, `MobileStepper` |
| 42 | Tabs | `Tabs` + `TabPanel` | `src/components/Tabs/` | ✅ | `value`, `onChange`, `orientation`, `variant` (scrollable/fullWidth); `TabPanel` for content |

**Partial coverage details:**
- **Stepper (⚠️)**: Uses a data-driven `steps: StepItem[]` prop. The MUI composable API (`<Stepper><Step><StepLabel>...<StepContent>...`) is not available. Also missing `MobileStepper` (dot/progress/text indicator for mobile use).

---

### 6. Layout

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 43 | Box | `Box` | `src/components/Box/` | ✅ | Full `sx` prop support; `component` prop; layout shorthand props |
| 44 | Container | `Container` | `src/components/Container/` | ✅ | `maxWidth`, `fixed`, `disableGutters` |
| 45 | GridLegacy | — | — | ❌ | Intentionally absent; MUI deprecated `GridLegacy` in v7; CSS-grid based system has no RN equivalent |
| 46 | Grid | `Grid` | `src/components/Grid/` | ✅ | Flexbox-based grid; `container`, `item`, `xs`/`sm`/`md`/`lg`/`xl`, `spacing`, `columns` |
| 47 | Stack | `Stack` | `src/components/Stack/` | ✅ | `direction`, `spacing`, `divider`, `useFlexGap`, `flexWrap` |
| 48 | Image List | `ImageList` + `ImageListItem` | `src/components/ImageList/` | ✅ | `cols`, `rowHeight`, `gap`, `variant` (standard/masonry/quilted/woven) |

**Notes:**
- **GridLegacy (❌)**: Absence is intentional. MUI itself deprecated it; React Native uses flexbox natively, making a CSS-legacy grid irrelevant.

---

### 7. Lab

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 49 | Masonry | `Masonry` | `src/components/Masonry/` | ✅ | `columns`, `spacing`, `defaultHeight`, `defaultColumns`; RN FlatList-based |
| 50 | Timeline | `Timeline` + 6 sub-components | `src/components/Timeline/` | ✅ | Full set: `TimelineItem`, `TimelineConnector`, `TimelineContent`, `TimelineDot`, `TimelineOppositeContent`, `TimelineSeparator` |

Both Lab components are **fully aligned** and feature-complete.

---

### 8. Utils

| # | MUI Component | mui-native Component | Path | Status | Notes |
|---|---------------|---------------------|------|--------|-------|
| 51 | Click-Away Listener | — | — | 🚫 | N/A — touch model in RN has no "click outside" concept; use `Modal` backdrop or `Pressable` wrappers instead |
| 52 | CSS Baseline | — | — | 🚫 | N/A — React Native has no CSS cascade or browser normalization; styling via StyleSheet is baseline |
| 53 | Modal | `Modal` | `src/components/Modal/` | ✅ | `open`, `onClose`, `disablePortal`, `keepMounted`, `BackdropComponent`, `BackdropProps` |
| 54 | No SSR | — | — | 🚫 | N/A — React Native has no server-side rendering phase |
| 55 | Popover | `Popover` | `src/components/Popover/` | ✅ | `anchorEl`, `anchorOrigin`, `transformOrigin`, `open`; uses `Modal` + position engine |
| 56 | Popper | `Popper` | `src/components/Popper/` | ⚠️ | Partial — implemented via `Modal` + `onLayout` measurements; no CSS `position: absolute` anchoring; see `rn-deviations.md` |
| 57 | Portal | `Portal` + `PortalHost` | `src/components/Portal/` | ✅ | React context-based portal; `PortalHost` registers render target; equivalent to React DOM `createPortal` |
| 58 | Textarea Autosize | — | — | 🚫 | N/A as standalone — use `<TextField multiline minRows={n} />` instead; documented in `rn-deviations.md` |
| 59 | Transitions | `Fade` + `Grow` + `Slide` + `Zoom` + `Collapse` | Multiple `src/components/` | ✅ | All 5 MUI transitions implemented with `react-native-reanimated`; `in` prop, `timeout`, `unmountOnExit` |
| 60 | useMediaQuery | — | — | ❌ | Not implemented; React Native uses `useWindowDimensions` + `Dimensions` API; no `@media` concept |

**Partial / absent details:**
- **Popper (⚠️)**: Full CSS-based absolute positioning with `modifiers` (flip, preventOverflow, offset) is impossible in RN. The implementation approximates with layout measurements. See `rn-deviations.md`.
- **useMediaQuery (❌)**: Not implemented. Consumers should use RN's `useWindowDimensions()` + custom breakpoint logic, or the upcoming `useBreakpoint` hook.

---

## Gap Analysis — Priority Roadmap

### High Priority (user-facing API gaps)

| Component | Gap | Effort |
|-----------|-----|--------|
| **List** | Add `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader` | Medium |
| **Accordion** | Export `AccordionSummary`, `AccordionDetails`, `AccordionActions` as composable sub-components | Medium |
| **Stepper** | Add composable `Step`, `StepLabel`, `StepContent`; add `MobileStepper` | High |
| **RadioGroup** | Add `RadioGroup` wrapper component; rename/alias `RadioButton` → `Radio` | Low |

### Medium Priority

| Component | Gap | Effort |
|-----------|-----|--------|
| **useMediaQuery** | Add `useBreakpoints` / `useMediaQuery` hook wrapping `useWindowDimensions` | Low |
| **TransferList** | Drag-to-reorder variant (using `react-native-gesture-handler`) | High |
| **Popper** | Improve anchor engine with better offset/flip modifiers | High |

### Low Priority / Intentionally Deferred

| Component | Reason |
|-----------|--------|
| GridLegacy | Deprecated; no RN need |
| Click-Away Listener | No RN equivalent; modal backdrop suffices |
| CSS Baseline | No RN equivalent |
| No SSR | No RN equivalent |
| Textarea Autosize | Covered by `TextField multiline` |

---

## React Native Deviations Reference

See [`rn-deviations.md`](./rn-deviations.md) for full documentation of API differences. Summary:

| MUI Component | Deviation |
|---------------|-----------|
| TransferList | Drag-and-drop variant replaced by checkbox-based transfer |
| TextareaAutosize | Not standalone; use `<TextField multiline />` |
| Popper | CSS absolute positioning unavailable; uses layout measurements |
| Portal | Implemented via React context (`PortalHost`) instead of DOM `createPortal` |
| No SSR | Not applicable in React Native |
| Typography | Also exported as `Text`; both names valid |

---

## Component API Alignment Notes

### Sub-component Completeness by Key Component

| MUI Component | MUI Sub-components | mui-native Sub-components | Coverage |
|---------------|-------------------|--------------------------|----------|
| Card | Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia | ✅ All 6 | **100%** |
| Dialog | Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide | ✅ 5/6 (Slide via Transitions) | **100%** |
| Table | Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel | ✅ All 9 | **100%** |
| Timeline | Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent, TimelineSeparator | ✅ All 7 | **100%** |
| List | List, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, ListDivider, ListSubheader | ⚠️ 3/8 (List, ListItem + extras) | **~37%** |
| Accordion | Accordion, AccordionSummary, AccordionDetails, AccordionActions | ⚠️ 1/4 (self-contained) | **25%** |
| Stepper | Stepper, Step, StepLabel, StepContent, StepIcon, StepConnector, StepButton, MobileStepper | ⚠️ 1/8 (data-driven) | **12%** |

---

*Report generated by auditing live MUI docs (https://mui.com/material-ui/all-components/) and the current workspace `src/components/` directory tree.*
