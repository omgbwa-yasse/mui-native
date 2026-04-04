import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

// ─── Base ──────────────────────────────────────────────────────────────────────

export interface DataGridBaseProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

// ─── Row / Column ─────────────────────────────────────────────────────────────

/** Base row type. Every row must have a unique `id`. */
export interface GridRowData {
  id: string | number;
  [key: string]: unknown;
}

export interface GridCellParams<TRow extends GridRowData = GridRowData> {
  row: TRow;
  field: string;
  value: unknown;
  colDef: GridColDef<TRow>;
  rowIndex: number;
}

export interface GridColumnHeaderParams<TRow extends GridRowData = GridRowData> {
  field: string;
  colDef: GridColDef<TRow>;
}

/**
 * Column definition — mirrors MUI X GridColDef.
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
  renderHeader?: (params: GridColumnHeaderParams<TRow>) => React.ReactNode;
  valueFormatter?: (params: { value: unknown }) => string;
  valueGetter?: (params: { row: TRow; field: string }) => unknown;
  hide?: boolean;
}

// ─── Sort / Filter / Pagination ───────────────────────────────────────────────

export type GridRowId = string | number;

/** Single sort specification (field + direction). */
export interface GridSortItem {
  field: string;
  sort: 'asc' | 'desc';
}

/** Ordered list of sort specs (DataGrid applies them left-to-right). */
export type GridSortModel = GridSortItem[];

export interface GridFilterItem {
  field: string;
  /**
   * @RN-DEVIATION Supported operators: contains, equals, startsWith, endsWith (string);
   * gt, lt, equals (number). Custom filter functions are not supported in v1.
   */
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt';
  value: string;
}

export interface GridFilterModel {
  items: GridFilterItem[];
}

/** Pagination model — 0-based page index. */
export interface GridPaginationModel {
  page: number;
  pageSize: number;
}

export type GridSelectionModel = GridRowId[];

// ─── Density ──────────────────────────────────────────────────────────────────

/**
 * @RN-DEVIATION 'comfortable' is not supported. default: 'standard'
 */
export type GridDensity = 'compact' | 'standard';

// ─── Edit mode ────────────────────────────────────────────────────────────────

export type GridEditMode = 'cell' | 'row';

// ─── API ref ──────────────────────────────────────────────────────────────────

/**
 * Programmatic DataGrid control.
 *
 * @RN-DEVIATION Methods not supported in v1: exportDataAsCsv, autosizeColumns,
 * pinColumn, unstable_* experimental APIs.
 */
export interface GridApiRef {
  setPage(page: number): void;
  setSortModel(model: GridSortModel): void;
  getSelectedRows(): GridRowData[];
  scrollToRow(rowIndex: number): void;
}

export function useGridApiRef(): React.RefObject<GridApiRef> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useRef } = require('react') as typeof import('react');
  return useRef<GridApiRef>(null);
}

// ─── DataGridProps ─────────────────────────────────────────────────────────────

export interface DataGridProps<TRow extends GridRowData = GridRowData>
  extends DataGridBaseProps {
  /** @required */
  rows: TRow[];
  /** @required */
  columns: GridColDef<TRow>[];
  loading?: boolean;

  // Selection
  checkboxSelection?: boolean;
  onRowSelectionModelChange?: (ids: GridSelectionModel) => void;
  rowSelectionModel?: GridSelectionModel;
  disableRowSelectionOnClick?: boolean;
  onRowClick?: (params: GridCellParams<TRow>) => void;

  density?: GridDensity;

  // Sorting
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
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
  editMode?: GridEditMode;
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
