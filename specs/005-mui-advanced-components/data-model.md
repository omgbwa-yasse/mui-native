# Data Model: MUI X Advanced Components

**Branch**: `005-mui-advanced-components` | **Date**: 2026-04-03
**Source spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

All TypeScript interfaces live in each component's `types.ts` file at
`src/components/<ComponentName>/types.ts`.

**Shared base** (imported from existing codebase conventions):
```ts
import type { StyleProp, ViewStyle } from 'react-native';

interface BaseProps {
  testID?:             string;
  style?:              StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
```

---

## Entity 1: LocalizationProvider

**MD3 reference**: https://m3.material.io/foundations/content-design/date-and-time
**MUI X reference**: `@mui/x-date-pickers/LocalizationProvider`
**File**: `src/components/DatePicker/types.ts` (shared with DatePicker group)

```ts
export interface DateAdapter<TDate = Date> {
  /**
   * Format a date value to a display string.
   * @param date   The date to format.
   * @param formatStr  Format token string (e.g. 'MM/dd/yyyy').
   */
  format:    (date: TDate, formatStr: string) => string;
  /**
   * Parse a string back into a date value.
   * Returns null if the string cannot be parsed.
   */
  parse:     (value: string, formatStr: string) => TDate | null;
  isValid:   (value: TDate | null) => boolean;
  isBefore:  (a: TDate, b: TDate) => boolean;
  isAfter:   (a: TDate, b: TDate) => boolean;
}

export interface LocalizationProviderProps {
  children:     React.ReactNode;
  /** BCP-47 locale string; defaults to device locale via Intl */
  locale?:      string;
  /** Date adapter; defaults to built-in IntlDateAdapter */
  dateAdapter?: DateAdapter;
  /** Override display format strings used in picker TextInput triggers */
  dateFormats?: {
    fullDate?:     string;    // e.g. 'MM/dd/yyyy'
    fullTime?:     string;    // e.g. 'hh:mm a'
    fullDateTime?: string;    // e.g. 'MM/dd/yyyy hh:mm a'
  };
}
```

**State transitions**: None — purely a context provider. No error state.

**Validation rules**:
- `locale` must be a valid BCP-47 tag if provided; invalid values fall back to device locale.
- If `dateAdapter` is provided it must implement all five interface methods.

---

## Entity 2: DatePicker

**MD3 reference**: https://m3.material.io/components/date-pickers
**MUI X reference**: `@mui/x-date-pickers/DatePicker`
**File**: `src/components/DatePicker/types.ts`

```ts
export interface DatePickerProps extends BaseProps {
  // ── Controlled / uncontrolled ──────────────────────────────────────
  value?:            Date | null;
  defaultValue?:     Date | null;
  onChange?:         (date: Date | null) => void;
  /** Fires only on Modal confirm (not on each spinner tick). */
  onAccept?:         (date: Date | null) => void;

  // ── Labels ────────────────────────────────────────────────────────
  label?:            string;
  placeholder?:      string;

  // ── State ─────────────────────────────────────────────────────────
  disabled?:         boolean;
  readOnly?:         boolean;

  // ── Bounds ────────────────────────────────────────────────────────
  minDate?:          Date;
  maxDate?:          Date;
  disableFuture?:    boolean;
  disablePast?:      boolean;

  // ── View config ───────────────────────────────────────────────────
  /**
   * @RN-DEVIATION Native picker supports 'day' | 'month' | 'year' only.
   * Compound views (e.g. inline calendar grid) are not supported.
   * default: ['day', 'month', 'year']
   */
  views?:            Array<'day' | 'month' | 'year'>;
  /** Display format for the TextInput trigger. */
  format?:           string;

  // ── Open / close ──────────────────────────────────────────────────
  open?:             boolean;
  onOpen?:           () => void;
  onClose?:          () => void;
  /**
   * @RN-DEVIATION iOS only. Controls native presentation style.
   * Ignored on Android (always uses system dialog).
   * default: 'default'
   */
  display?:          'default' | 'spinner' | 'compact' | 'inline';

  // ── Slot customisation ────────────────────────────────────────────
  slotProps?: {
    /** Props forwarded to the TextInput trigger component. */
    textField?: Partial<TextFieldProps>;
  };
}
```

**State machine** (modal lifecycle):
```
CLOSED → (user presses TextInput) → OPEN → (user confirms) → onChange/onAccept → CLOSED
                                        ↘ (user cancels / taps backdrop) → CLOSED
```

**Validation rules**:
- `maxDate` must be ≥ `minDate` if both are set; violated values are ignored.
- `disableFuture` takes precedence over `maxDate` if both are set.
- `disablePast` takes precedence over `minDate` if both are set.

---

## Entity 3: TimePicker

**MD3 reference**: https://m3.material.io/components/time-pickers
**MUI X reference**: `@mui/x-date-pickers/TimePicker`
**File**: `src/components/TimePicker/types.ts`

```ts
export interface TimePickerProps extends BaseProps {
  value?:            Date | null;
  defaultValue?:     Date | null;
  onChange?:         (date: Date | null) => void;
  onAccept?:         (date: Date | null) => void;
  label?:            string;
  disabled?:         boolean;
  readOnly?:         boolean;
  minTime?:          Date;
  maxTime?:          Date;
  /** 12 h (true) or 24 h (false). Default: derived from device locale. */
  ampm?:             boolean;
  /**
   * @RN-DEVIATION Native time picker supports 'hours' | 'minutes' only.
   * 'seconds' is silently ignored.
   * default: ['hours', 'minutes']
   */
  views?:            Array<'hours' | 'minutes' | 'seconds'>;
  format?:           string;
  open?:             boolean;
  onOpen?:           () => void;
  onClose?:          () => void;
  slotProps?: {
    textField?: Partial<TextFieldProps>;
  };
}
```

---

## Entity 4: DateTimePicker

**MD3 reference**: https://m3.material.io/components/date-pickers
**MUI X reference**: `@mui/x-date-pickers/DateTimePicker`
**File**: `src/components/DateTimePicker/types.ts`

```ts
export interface DateTimePickerProps extends BaseProps {
  value?:            Date | null;
  defaultValue?:     Date | null;
  onChange?:         (date: Date | null) => void;
  onAccept?:         (date: Date | null) => void;
  label?:            string;
  disabled?:         boolean;
  readOnly?:         boolean;
  minDate?:          Date;
  maxDate?:          Date;
  /** Combined bounds — take precedence over minDate/maxDate when set. */
  minDateTime?:      Date;
  maxDateTime?:      Date;
  disableFuture?:    boolean;
  disablePast?:      boolean;
  ampm?:             boolean;
  /**
   * @RN-DEVIATION Restricted to native-supported combinations.
   * Android shows separate date then time steps in one modal session.
   */
  views?:            Array<'day' | 'month' | 'year' | 'hours' | 'minutes'>;
  format?:           string;
  open?:             boolean;
  onOpen?:           () => void;
  onClose?:          () => void;
  slotProps?: {
    textField?: Partial<TextFieldProps>;
  };
}
```

---

## Entity 5: DataGrid

**MD3 reference**: https://m3.material.io/components/data-tables
**MUI X reference**: `@mui/x-data-grid`
**File**: `src/components/DataGrid/types.ts`

```ts
/** Column definition — mirrors MUI X GridColDef */
export interface GridColDef<TRow extends GridRowData = GridRowData> {
  /** @required Field key used as value source from each row object. */
  field:            string;
  headerName?:      string;
  width?:           number;
  /** Proportional flex sizing (shares remaining space). */
  flex?:            number;
  type?:            'string' | 'number' | 'date' | 'boolean';
  /** default: true */
  sortable?:        boolean;
  /** default: true */
  filterable?:      boolean;
  /** default: false */
  editable?:        boolean;
  renderCell?:      (params: GridCellParams<TRow>) => React.ReactNode;
  renderHeader?:    (params: GridColumnHeaderParams) => React.ReactNode;
  valueFormatter?:  (params: { value: unknown }) => string;
  valueGetter?:     (params: { row: TRow; field: string }) => unknown;
  hide?:            boolean;
}

export interface GridRowData {
  /** @required Must be unique within the rows array. */
  id:        string | number;
  [key: string]: unknown;
}

export interface GridCellParams<TRow extends GridRowData = GridRowData> {
  row:       TRow;
  field:     string;
  value:     unknown;
  colDef:    GridColDef<TRow>;
  rowIndex:  number;
}

export interface GridColumnHeaderParams {
  field:     string;
  colDef:    GridColDef;
}

/** 0-based page index */
export interface GridPaginationModel {
  page:      number;
  pageSize:  number;
}

export interface GridSortModel {
  field:     string;
  sort:      'asc' | 'desc';
}

export interface GridFilterModel {
  items: Array<{
    field:     string;
    operator:  'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt';
    value:     string;
  }>;
}

/** Programmatic DataGrid control — subset of MUI X GridApiRef */
export interface GridApiRef {
  setPage:         (page: number) => void;
  setSortModel:    (model: GridSortModel[]) => void;
  getSelectedRows: () => GridRowData[];
  scrollToRow:     (rowIndex: number) => void;
}

export interface DataGridProps<TRow extends GridRowData = GridRowData> extends BaseProps {
  /** @required */
  rows:       TRow[];
  /** @required */
  columns:    GridColDef<TRow>[];
  loading?:   boolean;

  // ── Selection ─────────────────────────────────────────────────────
  checkboxSelection?:           boolean;
  onRowSelectionModelChange?:   (ids: Array<string | number>) => void;
  rowSelectionModel?:           Array<string | number>;
  disableRowSelectionOnClick?:  boolean;
  onRowClick?:                  (params: GridCellParams<TRow>) => void;

  // ── Density ───────────────────────────────────────────────────────
  /** @RN-DEVIATION 'comfortable' is not supported. default: 'standard' */
  density?:   'compact' | 'standard';

  // ── Sorting ───────────────────────────────────────────────────────
  sortModel?:              GridSortModel[];
  onSortModelChange?:      (model: GridSortModel[]) => void;
  disableColumnSorting?:   boolean;

  // ── Filtering ─────────────────────────────────────────────────────
  filterModel?:            GridFilterModel;
  onFilterModelChange?:    (model: GridFilterModel) => void;
  disableColumnFilter?:    boolean;

  // ── Pagination ────────────────────────────────────────────────────
  paginationModel?:        GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  /** default: [10, 25, 50] */
  pageSizeOptions?:        number[];
  /** Total row count for server-side pagination. */
  rowCount?:               number;

  // ── Editing ───────────────────────────────────────────────────────
  editMode?:               'cell' | 'row';
  processRowUpdate?:       (newRow: TRow, oldRow: TRow) => TRow | Promise<TRow>;
  onProcessRowUpdateError?: (error: Error) => void;

  // ── Programmatic control ──────────────────────────────────────────
  apiRef?:                 React.RefObject<GridApiRef>;

  // ── Slots ─────────────────────────────────────────────────────────
  slots?: {
    noRowsOverlay?:    React.ComponentType;
    loadingOverlay?:   React.ComponentType;
    toolbar?:          React.ComponentType;
  };
}
```

**Validation rules**:
- `rows` must be an array of objects each with a unique `id` field.
- `pageSize` in `paginationModel` must be a member of `pageSizeOptions` (or defaults).
- Client-side row cap: 1,000 rows (FR-027). Logs a console.warn above the cap.
- `processRowUpdate` returning a rejected Promise triggers `onProcessRowUpdateError` and
  reverts the cell to its original value.

---

## Entity 6: BarChart / LineChart

**MUI X reference**: `@mui/x-charts`
**File**: `src/components/Charts/types.ts`

```ts
export interface ChartAxisConfig {
  /** Category labels or numeric tick values for the axis. */
  data?:           Array<string | number>;
  label?:          string;
  min?:            number;
  max?:            number;
  tickNumber?:     number;
  valueFormatter?: (value: number) => string;
}

export interface BarSeriesData {
  /** @required Array of numeric values; null renders as zero-height with // RN-DEVIATION. */
  data:     Array<number | null>;
  label?:   string;
  color?:   string;
  /** Stack group key; bars with the same key are stacked. */
  stack?:   string;
  id?:      string;
}

export interface BarChartProps extends BaseProps {
  /** @required */
  series:          BarSeriesData[];
  /** default: parent view width */
  width?:          number;
  /** default: 300 */
  height?:         number;
  xAxis?:          ChartAxisConfig[];
  yAxis?:          ChartAxisConfig[];
  colors?:         string[];
  /** default: 'vertical' */
  layout?:         'horizontal' | 'vertical';
  loading?:        boolean;
  skipAnimation?:  boolean;
  hideLegend?:     boolean;
  borderRadius?:   number;
  /** @RN-DEVIATION Fires on bar press, not hover. */
  onItemClick?:    (event: unknown, params: { seriesIndex: number; dataIndex: number }) => void;
}

export interface LineSeriesData {
  /** @required */
  data:            Array<number | null>;
  label?:          string;
  color?:          string;
  /** Fill area below the line. default: false */
  area?:           boolean;
  curve?:          'linear' | 'monotoneX' | 'catmullRom' | 'step';
  connectNulls?:   boolean;
  id?:             string;
}

export interface LineChartProps extends BaseProps {
  /** @required */
  series:          LineSeriesData[];
  width?:          number;
  height?:         number;
  xAxis?:          ChartAxisConfig[];
  yAxis?:          ChartAxisConfig[];
  colors?:         string[];
  loading?:        boolean;
  skipAnimation?:  boolean;
  hideLegend?:     boolean;
  /** @RN-DEVIATION Fires on line-path press. */
  onLineClick?:    (event: unknown, params: { seriesIndex: number; dataIndex: number }) => void;
  /** @RN-DEVIATION Fires on data-point marker press. */
  onMarkClick?:    (event: unknown, params: { seriesIndex: number; dataIndex: number }) => void;
}
```

**Validation rules**:
- All `series[i].data` arrays must be the same length (enforced by console.warn in dev).
- `xAxis[0].data` length, when provided, must equal `series[i].data.length`.
- `height` must be > 0; defaults to 300 if omitted or ≤ 0.

---

## Entity 7: SimpleTreeView / TreeItem

**MD3 reference**: https://m3.material.io/components/lists (hierarchical list)
**MUI X reference**: `@mui/x-tree-view/SimpleTreeView`
**File**: `src/components/TreeView/types.ts`

```ts
export type TreeViewItemId = string;

export interface SimpleTreeViewProps extends BaseProps {
  /** @required Tree nodes as `TreeItem` children. */
  children:                  React.ReactNode;
  /** Controlled set of expanded item IDs. */
  expandedItems?:            TreeViewItemId[];
  /** Uncontrolled default expanded items. */
  defaultExpandedItems?:     TreeViewItemId[];
  onExpandedItemsChange?:    (items: TreeViewItemId[]) => void;

  /**
   * Controlled selected item(s).
   * String for single-select; string[] for multi-select.
   */
  selectedItems?:            TreeViewItemId | TreeViewItemId[] | null;
  defaultSelectedItems?:     TreeViewItemId | TreeViewItemId[] | null;
  onSelectedItemsChange?:    (items: TreeViewItemId | TreeViewItemId[] | null) => void;

  /** Allow multiple simultaneous selections. default: false */
  multiSelect?:              boolean;
  /** Show selection checkboxes. default: false */
  checkboxSelection?:        boolean;
  disableSelection?:         boolean;
  /** Which element triggers expand/collapse. default: 'content' */
  expansionTrigger?:         'content' | 'iconContainer';
}

export interface TreeItemProps extends BaseProps {
  /** @required Unique node identifier within the tree. */
  itemId:    TreeViewItemId;
  /** @required Display text or React node. */
  label:     string | React.ReactNode;
  /** Nested TreeItem nodes. */
  children?: React.ReactNode;
  disabled?: boolean;
  /** Leading icon node. */
  icon?:     React.ReactNode;
  /** Trailing decorator for leaf nodes. */
  endIcon?:  React.ReactNode;
  /** Optional tap handler in addition to selection. */
  onPress?:  () => void;
}
```

**State machine** (per item, managed by SimpleTreeView):
```
COLLAPSED → (user taps expansionTrigger) → [hasChildren?] → EXPANDED → (tap again) → COLLAPSED
            (user taps item)             → [!disableSelection] → SELECTED (highlight)
```

**Validation rules**:
- `itemId` must be unique across the entire tree.
- `multiSelect: false` (default): selecting a new item deselects the previous one.
- A disabled item cannot be expanded or selected; it is skipped by keyboard navigation.
