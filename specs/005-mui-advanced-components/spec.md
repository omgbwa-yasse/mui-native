# Feature Specification: MUI X Advanced Components Integration

**Feature Branch**: `005-mui-advanced-components`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "Integre aussi les components pour le Date and time picker, Chart, Tre View, Et data Grid. Analyse le site MUI et recupre les API tu met dans UN MD avant de les intégrer Un à Un dans NUI-NATIVE"

**API Reference**: See [mui-api-reference.md](./mui-api-reference.md)

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Date & Time Picker Components (Priority: P1)

A developer using MUI-NATIVE needs to collect date and time input from users in forms. They want to use `DatePicker`, `TimePicker`, and `DateTimePicker` components that behave consistently with the rest of the MUI-NATIVE library, support controlled and uncontrolled modes, display a calendar/clock popup, and work correctly on both mobile and desktop layouts.

**Why this priority**: Date/time input is one of the most frequently needed form components across dashboards, scheduling, and booking interfaces. It has the widest immediate applicability in real products using MUI-NATIVE.

**Independent Test**: Can be fully tested by rendering a `<DatePicker>` wrapped in `<LocalizationProvider>`, selecting a date from the calendar popup, and verifying the `onChange` callback receives the correct date value — without any other component from this feature being present.

**Acceptance Scenarios**:

1. **Given** a form using MUI-NATIVE, **When** the developer renders `<DatePicker value={date} onChange={setDate} label="Birth date" />` inside a `<LocalizationProvider>`, **Then** a text input with a calendar icon appears, clicking it opens a calendar popup, and selecting a date calls `onChange` with the new date value.
2. **Given** a `DatePicker` with `minDate` and `maxDate` set, **When** the user opens the calendar, **Then** dates outside the range are visually disabled and unselectable.
3. **Given** a `TimePicker`, **When** the user opens the picker, **Then** a time selection interface (clock or digital column) is displayed, and the `ampm` prop toggles 12h/24h mode.
4. **Given** a `DateTimePicker`, **When** the user interacts with it, **Then** both date and time can be selected in a single picker session, and the combined value is passed to `onChange`.
5. **Given** any picker rendered with `disabled={true}`, **When** the user attempts interaction, **Then** no popup opens and the input is non-editable.
6. **Given** a picker with `readOnly={true}`, **When** the user focuses the input, **Then** the value is visible but editable actions are blocked.

---

### User Story 2 - DataGrid Component (Priority: P2)

A developer needs to display, sort, filter, and paginate tabular data within a MUI-NATIVE screen. They want a `DataGrid` component that renders rows and columns, supports user-driven sorting and filtering, and can operate in both client-side and server-side data modes.

**Why this priority**: DataGrid is the most complex component in this feature but has extremely high demand in data-heavy applications (admin panels, reporting dashboards, analytics). Its value justifies early integration.

**Independent Test**: Can be fully tested by rendering `<DataGrid rows={[...]} columns={[...]} />` with sample data, verifying rows render correctly, clicking a sortable column header to sort, and verifying pagination controls update the visible rows — with no dependency on other components in this feature.

**Acceptance Scenarios**:

1. **Given** an array of rows and column definitions, **When** the developer renders `<DataGrid rows={rows} columns={columns} />`, **Then** a table renders with headers matching column definitions and one row per data item.
2. **Given** a DataGrid with multiple columns, **When** the user clicks a column header, **Then** rows are sorted by that column (ascending, then descending on second click).
3. **Given** a DataGrid with `checkboxSelection={true}`, **When** the user clicks a row's checkbox, **Then** the row is visually highlighted and the `onRowSelectionModelChange` callback fires with the selected row IDs.
4. **Given** a DataGrid with pagination, **When** the user changes the page or page size, **Then** the displayed rows update to the corresponding page of data.
5. **Given** a DataGrid with `editMode="cell"` and an editable column, **When** the user double-clicks a cell, **Then** an inline editor appears, and saving triggers `processRowUpdate` with the new row value.
6. **Given** a DataGrid with `loading={true}`, **When** it renders, **Then** a loading overlay is displayed over the grid body.

---

### User Story 3 - Chart Components (Priority: P3)

A developer building an analytics screen needs to render bar charts and line charts from data arrays. They want `BarChart` and `LineChart` components that accept a `series` prop, automatically handle axes, show tooltips on hover, display a legend, and support color customization.

**Why this priority**: Charts are essential for dashboards and analytics features. Bar and line charts cover the majority of charting use cases. Priority P3 because charts typically appear alongside other data components rather than as standalone MVP features.

**Independent Test**: Can be fully tested by rendering a `<BarChart series={[{data:[10,20,30]}]} height={300} />` and verifying three bars appear with proportional heights, a tooltip appears on hover, and the chart is responsive to container width — completely independently of other components.

**Acceptance Scenarios**:

1. **Given** a `BarChart` with a `series` prop containing data arrays, **When** it renders, **Then** one bar group per data point appears, with bar heights proportional to values.
2. **Given** a `LineChart` with multiple series, **When** it renders, **Then** one line per series appears with the legend showing each series label.
3. **Given** any chart with `loading={true}`, **When** rendered, **Then** a loading overlay is displayed instead of the chart content.
4. **Given** a `BarChart` with `layout="horizontal"`, **When** rendered, **Then** bars extend horizontally and axis labels appear on the correct axis.
5. **Given** a chart where the user presses/touches a data point, **When** pressing, **Then** a tooltip displays the series name and value at that point.
6. **Given** a chart with `skipAnimation={true}`, **When** it first renders, **Then** bars/lines appear immediately without transition animations.

---

### User Story 4 - TreeView Component (Priority: P4)

A developer needs to render hierarchical data (folder trees, menu structures, category trees) in a MUI-NATIVE screen. They want a `SimpleTreeView` with `TreeItem` children that supports expand/collapse, single and multi-selection, and keyboard navigation.

**Why this priority**: TreeView has more limited use cases compared to the other three components. It is valuable for file explorer-like UIs but is not required for most product screens.

**Independent Test**: Can be fully tested by rendering a `<SimpleTreeView>` with two levels of `<TreeItem>` nodes, clicking a parent node to expand it, and verifying child nodes become visible — independently of all other components in this feature.

**Acceptance Scenarios**:

1. **Given** a `SimpleTreeView` with nested `TreeItem` children, **When** the user clicks a parent item, **Then** its children expand/collapse with each click.
2. **Given** a `SimpleTreeView` with `multiSelect={false}` (default), **When** the user clicks an item, **Then** it becomes selected and any previously selected item is deselected.
3. **Given** a `SimpleTreeView` with `multiSelect={true}`, **When** the user ctrl+clicks multiple items, **Then** all clicked items are simultaneously selected.
4. **Given** a `SimpleTreeView` with `checkboxSelection={true}`, **When** rendered, **Then** each item shows a checkbox that toggles selection.
5. **Given** a `SimpleTreeView`, **When** using an assistive technology, **Then** navigation via `accessibilityActions` moves focus between items (next/previous) and expands/collapses groups (RN-DEVIATION: keyboard arrow keys become accessibility actions; see `types.ts`).
6. **Given** a `TreeItem` with `disabled={true}`, **When** the user clicks it, **Then** it cannot be selected and appears visually dimmed.

---

### Edge Cases

- What happens when `DataGrid` receives an empty `rows` array? → The grid renders with headers visible and an empty state (no rows message or custom empty overlay if provided).
- What happens when a `DatePicker` value is `null`? → The input renders empty; `onChange` fires with `null` when the user clears the field.
- What happens when `BarChart` or `LineChart` `series` contains `null` values in a data array? → `null` values render as gaps (LineChart) or zero-height bars (BarChart) by default.
- What happens when `SimpleTreeView` `expandedItems` is empty and all items are collapsed? → The tree renders all top-level items visible, children hidden.
- What happens when a `DataGrid` column with `editable={true}` attempts to save an invalid value? → `processRowUpdate` is called; if it throws or returns a rejected Promise, `onProcessRowUpdateError` fires and the edit is reverted.
- What happens when `LocalizationProvider` is missing from the component tree above a picker? → An error is thrown indicating the provider is required; the picker cannot render.

---

## Requirements *(mandatory)*

### Functional Requirements

**Date & Time Pickers**

- **FR-001**: The library MUST expose `DatePicker`, `TimePicker`, and `DateTimePicker` components that accept `value`, `onChange`, `label`, `disabled`, and `readOnly` props consistent with the MUI X API.
- **FR-002**: All picker components MUST require a `LocalizationProvider` ancestor wrapping them; the library MUST document this requirement and MUST re-export `LocalizationProvider` from the pickers integration module as a convenience re-export.
- **FR-003**: Pickers MUST support date range validation:
  - `DatePicker`: `minDate`, `maxDate`, `disableFuture`, `disablePast`
  - `TimePicker`: `minTime`, `maxTime`
  - `DateTimePicker`: all six — `minDate`, `maxDate`, `minTime`, `maxTime`, `disableFuture`, `disablePast`
- **FR-004**: Pickers MUST support both controlled mode (with `value` + `onChange`) and uncontrolled mode (with `defaultValue`).
- **FR-005**: `DateTimePicker` MUST support all views: `day`, `month`, `year`, `hours`, `minutes`, `seconds`.
- **FR-006**: All pickers MUST support slot customization via `slots` and `slotProps` props. Required slot names: `textField` (the `TextInput` trigger), `openPickerIcon` (calendar/clock icon button), `dialog` (the `Modal` container).

**DataGrid**

- **FR-007**: The library MUST expose a `DataGrid` component that accepts `rows`, `columns`, `loading`, `checkboxSelection`, `density`, and `paginationModel` as minimum viable props.
- **FR-008**: `DataGrid` MUST support client-side sorting by clicking column headers when `sortable` is enabled on a column.
- **FR-009**: `DataGrid` MUST support client-side pagination through the `paginationModel` and `pageSizeOptions` props.
- **FR-027**: `DataGrid` MUST support client-side column filtering via the built-in filter toolbar, activatable through the column menu or `toolbar` slot; filtering MUST work on `string`, `number`, `date`, and `boolean` column types.
- **FR-010**: `DataGrid` MUST support row selection with `onRowSelectionModelChange` callback.
- **FR-011**: `DataGrid` MUST support inline cell and row editing via `editMode`, `processRowUpdate`, and editable column definitions.
- **FR-012**: `DataGrid` MUST expose an `apiRef` prop accepting a `useGridApiRef()` ref for programmatic control.

**Charts**

- **FR-013**: The library MUST expose `BarChart` and `LineChart` components accepting `series`, `width`, `height`, `xAxis`, `yAxis`, `colors`, and `layout` props. The `layout` prop accepts `'vertical'` (default, bars/lines extend upward) or `'horizontal'` (bars/lines extend rightward).
- **FR-014**: Charts MUST display a legend by default when multiple series are provided, with a `hideLegend` prop to suppress it. When only one series is provided, the legend is hidden by default regardless of the `hideLegend` prop value.
- **FR-015**: Charts MUST display an interactive tooltip on data-point press/touch (React Native equivalent of hover; documented as `RN-DEVIATION` in `types.ts`).
- **FR-016**: Charts MUST support a `loading` prop that displays a loading overlay.
- **FR-017**: Charts MUST support animation with a `skipAnimation` prop to disable it.
- **FR-018**: The library MAY expose `ChartsContainer` for advanced composition use cases.

**TreeView**

- **FR-019**: The library MUST expose `SimpleTreeView` and `TreeItem` components where `TreeItem` nodes are rendered as JSX children.
- **FR-020**: `SimpleTreeView` MUST support expand/collapse of item groups via click or keyboard navigation.
- **FR-021**: `SimpleTreeView` MUST support `multiSelect` mode enabling simultaneous selection of multiple items.
- **FR-022**: `SimpleTreeView` MUST support `checkboxSelection` rendering a checkbox per item.
- **FR-023**: `SimpleTreeView` MUST expose `onSelectedItemsChange` and `onExpandedItemsChange` callbacks.

**General**

- **FR-024**: All four component groups MUST be individually importable to avoid bundling unused code.
- **FR-025**: All components MUST accept a `sx` prop for MUI system styling overrides.
- **FR-026**: All components MUST be documented with usage examples showing minimum required props.

### Key Entities

- **DateValue**: A date/time object compatible with the configured date adapter (dayjs, date-fns, luxon, or moment). Represents the value flowing through picker components.
- **ColumnDefinition (GridColDef)**: Defines a single DataGrid column — field mapping, display name, type, editability, sorting, and custom cell renderer.
- **ChartSeries**: Describes one data series in a chart — array of numeric values, label, color, and optional stacking behavior.
- **TreeNode**: Represents one item in the tree — identified by a unique string `itemId`, has a display `label`, optional `disabled` state, and zero or more child `TreeNode` instances.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can render a functional `DatePicker` that opens a calendar popup and returns a date value in under 5 minutes, following only the documentation.
- **SC-002**: A developer can render a `DataGrid` displaying 100 rows with sorting and pagination enabled in under 10 minutes using the provided integration guide.
- **SC-003**: A developer can render a `BarChart` with two series and a visible legend in under 5 minutes.
- **SC-004**: A developer can render a `SimpleTreeView` with three levels of nesting that expands/collapses via click in under 5 minutes.
- **SC-005**: All four component groups pass their respective unit tests with 100% of acceptance scenarios covered.
- **SC-006**: Each component group can be imported and rendered in isolation without requiring any other component from this feature to be present (independent integrability).
- **SC-007**: No existing MUI-NATIVE component tests regress after integrating the four new component groups.
- **SC-008**: Bundle size impact is documented per component group so consumers can make informed tree-shaking decisions.

---

## Clarifications

### Session 2026-04-03

- Q: How should the 4 new MUI X component groups be integrated into the library? → A: **RN-native reimplementation** — MUI X packages (`@mui/x-date-pickers`, `@mui/x-charts`, `@mui/x-tree-view`, `@mui/x-data-grid`) have hard DOM dependencies (`document`, `window`, CSS) and physically cannot run in a React Native runtime. Each component group is therefore built from scratch using React Native primitives (`TextInput`, `Modal`, `FlatList`, `TouchableOpacity`, Reanimated) but exposes the **same prop API surface** as its MUI X counterpart. Each group's wrapper lives at `src/components/<Name>/<Name>.tsx`, applies `sx` normalization through the theme system, and documents all divergences with `// RN-DEVIATION:` comments. Direct re-exports of MUI X packages are not permitted.
- Q: Is client-side column filtering in scope for DataGrid (prose in US2 mentions "filter" but no FR existed)? → A: Yes, in scope — added FR-027 for client-side filter toolbar support.
- Q: Should the date adapter (dayjs) be enforced by the library, or remain adapter-agnostic? → A: Adapter-agnostic — consumers supply their own adapter via `LocalizationProvider`; the library documentation uses dayjs in all examples but does not add dayjs as a dependency.
- Q: What is the documented maximum row count for client-side DataGrid mode? → A: 1,000 rows — beyond this limit consumers should switch to server-side pagination/sorting/filtering.
- Q: Should providing a `LocalizationProvider` re-export be a hard requirement (not just "if possible")? → A: Yes, hard requirement — `LocalizationProvider` MUST be re-exported from the pickers integration module (FR-002 updated).

---

## Assumptions

- The project's existing `@mui/material` installation is already present and compatible with MUI X v8.x peer dependencies.
- The date adapter is **adapter-agnostic**: the library does not bundle or require any specific date adapter. Consumers must supply a compatible adapter (e.g., `@date-io/dayjs`) and wrap their app in `LocalizationProvider`. All documentation examples use dayjs.
- All components in this feature are from the **MUI X Community tier** (free, Apache 2.0 license) — no Pro or Premium license is required.
- This library is **React Native-first**. Components in this feature are RN-native implementations that expose MUI X-compatible prop APIs. There is no web/DOM rendering path and no dependency on `react-dom`. Accessibility, animation, and gesture semantics all follow React Native conventions.
- "Intégrer Un à Un" means each component group is implemented as a separate, independently mergeable unit of work — not all four in a single commit.
- `ChartsContainer` (composition API) is optional and lower priority than `BarChart`/`LineChart`; it will be included as a re-export if time permits.
- Server-side DataGrid features (server-side pagination, filtering, sorting) are out of scope for v1; client-side modes are the initial target.
- Accessibility (keyboard navigation, ARIA) is handled by MUI X itself; no additional a11y work is required beyond ensuring props are correctly forwarded.
- All four component groups follow the **RN-native wrapper pattern**: each component is implemented from scratch in `src/components/<Name>/`, exposes the MUI `sx` prop, and mirrors the MUI X prop API surface. All divergences from MUI X behavior are annotated with `// RN-DEVIATION: <reason>` in source files and in `contracts/components.contract.ts`. Direct imports of MUI X packages are not permitted in any component file.
- Client-side DataGrid mode is documented as suitable for up to **1,000 rows**. Consumers with larger datasets are directed to use server-side `paginationMode`, `sortingMode`, and `filterMode`.

