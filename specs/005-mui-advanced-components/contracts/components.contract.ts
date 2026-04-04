/**
 * MUI X Advanced Components — Public Component API Contract
 *
 * This file defines the stable prop-type signatures for all components
 * in the `005-mui-advanced-components` feature.
 *
 * Breaking-change rules:
 *  - Removing a required prop is a MAJOR (breaking) change.
 *  - Narrowing an existing prop type is a MAJOR (breaking) change.
 *  - Adding a required prop is a MAJOR (breaking) change.
 *  - Adding an optional prop is a MINOR (non-breaking) change.
 *
 * RN-DEVIATION comments mark props or behaviours that cannot be fully
 * reproduced on the React Native platform and document the divergence
 * from the MUI X web API specification.
 *
 * @packageDocumentation
 */

import type { StyleProp, ViewStyle } from 'react-native';

// ─── Shared Base ──────────────────────────────────────────────────────────────

/**
 * Props shared by every public component in this feature.
 * Extends the project-wide RNMBaseProps convention.
 */
export interface RNMBaseProps {
  /** Used for E2E test selectors and snapshot matchers. */
  testID?: string;
  /** Container style override. Accepts any valid RN ViewStyle. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label forwarded to the root accessible element. */
  accessibilityLabel?: string;
}

// ─── LocalizationProvider ─────────────────────────────────────────────────────

/**
 * Minimal date-adapter interface.
 * Consumers may pass a dayjs or date-fns adapter; the built-in IntlDateAdapter
 * is used when no dateAdapter prop is provided.
 *
 * @see https://mui.com/x/api/date-pickers/localization-provider/
 */
export interface DateAdapter<TDate = Date> {
  format(date: TDate, formatStr: string): string;
  parse(value: string, formatStr: string): TDate | null;
  isValid(value: TDate | null): boolean;
  isBefore(a: TDate, b: TDate): boolean;
  isAfter(a: TDate, b: TDate): boolean;
}

/**
 * LocalizationProvider — React Native context that supplies locale and date-adapter
 * to all DatePicker / TimePicker / DateTimePicker descendants.
 *
 * @see https://mui.com/x/api/date-pickers/localization-provider/
 *
 * @example
 * ```tsx
 * <LocalizationProvider locale="fr-FR">
 *   <DatePicker value={date} onChange={setDate} />
 * </LocalizationProvider>
 * ```
 */
export interface LocalizationProviderProps {
  /** @required */
  children: React.ReactNode;
  /** BCP-47 locale tag. Default: device locale via `Intl`. */
  locale?: string;
  /** Date formatting and parsing adapter. Default: IntlDateAdapter. */
  dateAdapter?: DateAdapter;
  /** Override display format strings for the TextInput trigger. */
  dateFormats?: {
    /** e.g. 'MM/dd/yyyy' */
    fullDate?: string;
    /** e.g. 'hh:mm a' */
    fullTime?: string;
    /** e.g. 'MM/dd/yyyy hh:mm a' */
    fullDateTime?: string;
  };
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

/**
 * DatePicker — modal date selection using the native OS date picker.
 *
 * @see https://mui.com/x/api/date-pickers/date-picker/
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onChange={(d) => setDate(d)}
 *   label="Birth date"
 *   minDate={new Date('1900-01-01')}
 * />
 * ```
 */
export interface DatePickerProps extends RNMBaseProps {
  // Controlled / uncontrolled
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  /** Fires only when the user confirms selection (not on each picker tick). */
  onAccept?: (date: Date | null) => void;

  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;

  // Bounds
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;

  /**
   * @RN-DEVIATION Native OS date picker supports 'day' | 'month' | 'year' only.
   * Compound view modes (inline calendar grid, month-range) are not supported.
   * default: ['day', 'month', 'year']
   */
  views?: Array<'day' | 'month' | 'year'>;

  /** Display format passed to the active DateAdapter. Overrides LocalizationProvider. */
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  /**
   * @RN-DEVIATION iOS only. Controls native presentation style.
   * Ignored on Android (always uses the system dialog).
   * default: 'default'
   */
  display?: 'default' | 'spinner' | 'compact' | 'inline';

  slotProps?: {
    /**
     * Props forwarded to the TextInput trigger component.
     * @RN-DEVIATION Only the textField slot is supported — no calendar day slot.
     */
    textField?: Partial<TextFieldSlotProps>;
  };
}

/** Subset of TextFieldProps accepted by DatePicker's textField slot. */
export interface TextFieldSlotProps {
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// ─── TimePicker ───────────────────────────────────────────────────────────────

/**
 * TimePicker — modal time selection using the native OS time picker.
 *
 * @see https://mui.com/x/api/date-pickers/time-picker/
 */
export interface TimePickerProps extends RNMBaseProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  onAccept?: (date: Date | null) => void;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minTime?: Date;
  maxTime?: Date;
  /** 12 h (true) or 24 h (false). Default: derived from device locale. */
  ampm?: boolean;
  /**
   * @RN-DEVIATION Native time picker supports 'hours' | 'minutes' only.
   * Passing 'seconds' is silently ignored on both platforms.
   * default: ['hours', 'minutes']
   */
  views?: Array<'hours' | 'minutes' | 'seconds'>;
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  slotProps?: {
    textField?: Partial<TextFieldSlotProps>;
  };
}

// ─── DateTimePicker ───────────────────────────────────────────────────────────

/**
 * DateTimePicker — combined date and time selection using native OS pickers.
 *
 * @see https://mui.com/x/api/date-pickers/date-time-picker/
 */
export interface DateTimePickerProps extends RNMBaseProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  onAccept?: (date: Date | null) => void;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Overrides minDate when time precision matters. */
  minDateTime?: Date;
  /** Overrides maxDate when time precision matters. */
  maxDateTime?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  ampm?: boolean;
  /**
   * @RN-DEVIATION Restricted to native-supported combinations.
   * Android shows separate date → time steps in a sequential modal session.
   */
  views?: Array<'day' | 'month' | 'year' | 'hours' | 'minutes'>;
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  slotProps?: {
    textField?: Partial<TextFieldSlotProps>;
  };
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────

/** Base row type. Every row must have a unique `id`. */
export interface GridRowData {
  id: string | number;
  [key: string]: unknown;
}

/**
 * Column definition — mirrors MUI X GridColDef.
 *
 * @see https://mui.com/x/api/data-grid/grid-col-def/
 */
export interface GridColDef<TRow extends GridRowData = GridRowData> {
  /** @required Field key used as the default value source from each row. */
  field: string;
  headerName?: string;
  width?: number;
  /** Proportional flex sizing; shares remaining space with other flex columns. */
  flex?: number;
  type?: 'string' | 'number' | 'date' | 'boolean';
  /** default: true */
  sortable?: boolean;
  /** default: true */
  filterable?: boolean;
  /** default: false */
  editable?: boolean;
  renderCell?: (params: GridCellParams<TRow>) => React.ReactNode;
  renderHeader?: (params: GridColumnHeaderParams) => React.ReactNode;
  valueFormatter?: (params: { value: unknown }) => string;
  valueGetter?: (params: { row: TRow; field: string }) => unknown;
  hide?: boolean;
}

export interface GridCellParams<TRow extends GridRowData = GridRowData> {
  row: TRow;
  field: string;
  value: unknown;
  colDef: GridColDef<TRow>;
  rowIndex: number;
}

export interface GridColumnHeaderParams {
  field: string;
  colDef: GridColDef;
}

/** Pagination model — 0-based page index. */
export interface GridPaginationModel {
  page: number;
  pageSize: number;
}

export interface GridSortModel {
  field: string;
  sort: 'asc' | 'desc';
}

export interface GridFilterModel {
  items: Array<{
    field: string;
    /**
     * @RN-DEVIATION Supported operators: contains, equals, startsWith, endsWith (string);
     * gt, lt, equals (number). Custom filter functions are not supported in v1.
     */
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt';
    value: string;
  }>;
}

/**
 * Programmatic DataGrid control — subset of MUI X GridApiRef.
 *
 * @RN-DEVIATION Methods not supported in v1: `exportDataAsCsv`, `autosizeColumns`,
 * `pinColumn`, `unstable_*` experimental APIs.
 */
export interface GridApiRef {
  setPage(page: number): void;
  setSortModel(model: GridSortModel[]): void;
  getSelectedRows(): GridRowData[];
  scrollToRow(rowIndex: number): void;
}

/**
 * DataGrid — high-functionality data table with sorting, filtering, pagination,
 * and inline editing. Built on RN FlatList.
 *
 * @see https://mui.com/x/api/data-grid/data-grid/
 *
 * @example
 * ```tsx
 * <DataGrid
 *   rows={rows}
 *   columns={[
 *     { field: 'id',   headerName: 'ID',   width: 60 },
 *     { field: 'name', headerName: 'Name', flex: 1 },
 *   ]}
 *   paginationModel={{ page: 0, pageSize: 25 }}
 *   onPaginationModelChange={setPaginationModel}
 * />
 * ```
 */
export interface DataGridProps<TRow extends GridRowData = GridRowData>
  extends RNMBaseProps {
  /** @required */
  rows: TRow[];
  /** @required */
  columns: GridColDef<TRow>[];
  loading?: boolean;

  // Selection
  checkboxSelection?: boolean;
  onRowSelectionModelChange?: (ids: Array<string | number>) => void;
  rowSelectionModel?: Array<string | number>;
  disableRowSelectionOnClick?: boolean;
  onRowClick?: (params: GridCellParams<TRow>) => void;

  /**
   * @RN-DEVIATION 'comfortable' is not supported. default: 'standard'
   */
  density?: 'compact' | 'standard';

  // Sorting
  sortModel?: GridSortModel[];
  onSortModelChange?: (model: GridSortModel[]) => void;
  disableColumnSorting?: boolean;

  // Filtering
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  disableColumnFilter?: boolean;

  // Pagination
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  /** default: [10, 25, 50] */
  pageSizeOptions?: number[];
  /** Total row count for server-side pagination mode. */
  rowCount?: number;

  // Editing
  editMode?: 'cell' | 'row';
  processRowUpdate?: (newRow: TRow, oldRow: TRow) => TRow | Promise<TRow>;
  onProcessRowUpdateError?: (error: Error) => void;

  // Programmatic control
  apiRef?: React.RefObject<GridApiRef>;

  // Slots
  slots?: {
    noRowsOverlay?: React.ComponentType;
    loadingOverlay?: React.ComponentType;
    toolbar?: React.ComponentType;
  };
}

// ─── Charts ───────────────────────────────────────────────────────────────────

export interface ChartAxisConfig {
  /** Category labels (string) or numeric tick values for the axis. */
  data?: Array<string | number>;
  label?: string;
  min?: number;
  max?: number;
  tickNumber?: number;
  valueFormatter?: (value: number) => string;
}

export interface BarSeriesData {
  /**
   * @required Numeric values per category.
   * null renders as zero-height with a // RN-DEVIATION placeholder.
   */
  data: Array<number | null>;
  label?: string;
  color?: string;
  /** Stack group key; bars with the same key are stacked. */
  stack?: string;
  id?: string;
}

/**
 * BarChart — categorical bar chart backed by react-native-gifted-charts.
 *
 * @see https://mui.com/x/api/charts/bar-chart/
 *
 * @example
 * ```tsx
 * <BarChart
 *   series={[{ data: [10, 20, 30], label: 'Revenue' }]}
 *   xAxis={[{ data: ['Jan', 'Feb', 'Mar'] }]}
 *   height={300}
 * />
 * ```
 */
export interface BarChartProps extends RNMBaseProps {
  /** @required */
  series: BarSeriesData[];
  /** default: parent view width */
  width?: number;
  /** default: 300 */
  height?: number;
  xAxis?: ChartAxisConfig[];
  yAxis?: ChartAxisConfig[];
  colors?: string[];
  /** default: 'vertical' */
  layout?: 'horizontal' | 'vertical';
  loading?: boolean;
  skipAnimation?: boolean;
  hideLegend?: boolean;
  borderRadius?: number;
  /**
   * @RN-DEVIATION Fires on bar press, not on hover/mouseenter.
   */
  onItemClick?: (
    event: unknown,
    params: { seriesIndex: number; dataIndex: number },
  ) => void;
}

export interface LineSeriesData {
  /** @required */
  data: Array<number | null>;
  label?: string;
  color?: string;
  /** Fill area below the line. default: false */
  area?: boolean;
  curve?: 'linear' | 'monotoneX' | 'catmullRom' | 'step';
  connectNulls?: boolean;
  id?: string;
}

/**
 * LineChart — time-series or category line chart backed by react-native-gifted-charts.
 *
 * @see https://mui.com/x/api/charts/line-chart/
 */
export interface LineChartProps extends RNMBaseProps {
  /** @required */
  series: LineSeriesData[];
  width?: number;
  height?: number;
  xAxis?: ChartAxisConfig[];
  yAxis?: ChartAxisConfig[];
  colors?: string[];
  loading?: boolean;
  skipAnimation?: boolean;
  hideLegend?: boolean;
  /** @RN-DEVIATION Fires on line-path press. */
  onLineClick?: (
    event: unknown,
    params: { seriesIndex: number; dataIndex: number },
  ) => void;
  /** @RN-DEVIATION Fires on data-point marker press. */
  onMarkClick?: (
    event: unknown,
    params: { seriesIndex: number; dataIndex: number },
  ) => void;
}

// ─── TreeView ─────────────────────────────────────────────────────────────────

export type TreeViewItemId = string;

/**
 * SimpleTreeView — recursive list with expand/collapse and selection state.
 * Animations use react-native-reanimated worklets.
 *
 * @see https://mui.com/x/api/tree-view/simple-tree-view/
 *
 * @example
 * ```tsx
 * <SimpleTreeView defaultExpandedItems={['root']}>
 *   <TreeItem itemId="root" label="Root">
 *     <TreeItem itemId="child-1" label="Child 1" />
 *     <TreeItem itemId="child-2" label="Child 2" />
 *   </TreeItem>
 * </SimpleTreeView>
 * ```
 */
export interface SimpleTreeViewProps extends RNMBaseProps {
  /** @required TreeItem nodes. */
  children: React.ReactNode;
  expandedItems?: TreeViewItemId[];
  defaultExpandedItems?: TreeViewItemId[];
  onExpandedItemsChange?: (items: TreeViewItemId[]) => void;
  /**
   * Controlled selected item(s).
   * Use string for single-select and string[] when multiSelect is true.
   */
  selectedItems?: TreeViewItemId | TreeViewItemId[] | null;
  defaultSelectedItems?: TreeViewItemId | TreeViewItemId[] | null;
  onSelectedItemsChange?: (
    items: TreeViewItemId | TreeViewItemId[] | null,
  ) => void;
  /** default: false */
  multiSelect?: boolean;
  /** default: false */
  checkboxSelection?: boolean;
  disableSelection?: boolean;
  /** default: 'content' */
  expansionTrigger?: 'content' | 'iconContainer';
}

/**
 * TreeItem — a single node inside a SimpleTreeView.
 *
 * @see https://mui.com/x/api/tree-view/tree-item/
 */
export interface TreeItemProps extends RNMBaseProps {
  /** @required Unique node identifier across the entire tree. */
  itemId: TreeViewItemId;
  /** @required Display text or React element. */
  label: string | React.ReactNode;
  /** Nested TreeItem nodes. */
  children?: React.ReactNode;
  disabled?: boolean;
  /** Leading icon rendered before the label. */
  icon?: React.ReactNode;
  /** Trailing decorator for leaf nodes. */
  endIcon?: React.ReactNode;
  /** Optional press handler invoked in addition to selection logic. */
  onPress?: () => void;
}
