/**
 * Table Family Props Contracts
 * Feature: 010-full-mui-alignment
 * FR-028 / FR-029 / FR-030
 *
 * All 8 components exported as named top-level exports from src/index.ts.
 * Co-located in src/components/Table/.
 *
 * Design context (see research.md Decision 5):
 *   - TableContainer: ScrollView wrapper (optional horizontal scroll)
 *   - Table: direct children composition (not FlatList)
 *   - stickyHeader: position-based (RN-DEVIATION — no CSS position:sticky)
 *   - For > 500 rows with virtualization, recommend DataTable instead.
 *
 * RN-DEVIATION (FR-030): TablePagination.onPageChange drops the `event` first arg.
 * RN-DEVIATION (FR-029): Table.stickyHeader uses RN-specific absolute positioning.
 */
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

// ─── TableContainer ──────────────────────────────────────────────────────────

export interface TableContainerProps {
  children?: ReactNode;
  /** Pass `true` for horizontal scrolling tables. */
  horizontal?: boolean;
  style?: ViewStyle;
}

// ─── Table ───────────────────────────────────────────────────────────────────

export interface TableProps {
  children?: ReactNode;
  /**
   * Pins the TableHead at the top during vertical scroll.
   * RN-DEVIATION: Implemented via position: 'absolute' + paddingTop on TableBody.
   * Does not use CSS position:sticky (unavailable in React Native).
   * Default: false
   */
  stickyHeader?: boolean;
  /** Cell padding density. Default: 'normal' */
  padding?: 'normal' | 'checkbox' | 'none';
  /** Row/cell size density. Default: 'medium' */
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

// ─── TableHead ───────────────────────────────────────────────────────────────

export interface TableHeadProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── TableBody ───────────────────────────────────────────────────────────────

export interface TableBodyProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── TableFooter ─────────────────────────────────────────────────────────────

export interface TableFooterProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── TableRow ────────────────────────────────────────────────────────────────

export interface TableRowProps {
  children?: ReactNode;
  /** Highlight the row as selected. Default: false */
  selected?: boolean;
  /** Apply hover highlight styling. Default: false */
  hover?: boolean;
  /** Press handler — row becomes touchable when provided. */
  onPress?: () => void;
  style?: ViewStyle;
}

// ─── TableCell ───────────────────────────────────────────────────────────────

export interface TableCellProps {
  children?: ReactNode;
  /** Content alignment. Default: 'inherit' */
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  /** Cell padding override. Inherits from Table.padding when not set. */
  padding?: 'normal' | 'checkbox' | 'none';
  /** Cell size override. Inherits from Table.size when not set. */
  size?: 'small' | 'medium';
  /** Current sort direction. Used for accessibility aria-sort equivalent. */
  sortDirection?: 'asc' | 'desc' | false;
  /**
   * Variant determines accessibilityRole and default styling.
   * 'head'   → accessibilityRole="columnheader"
   * 'body'   → accessibilityRole="cell" (default)
   * 'footer' → accessibilityRole="cell"
   */
  variant?: 'body' | 'footer' | 'head';
  style?: ViewStyle;
}

// ─── TableSortLabel ──────────────────────────────────────────────────────────

export interface TableSortLabelProps {
  /** Whether this column is the active sort column. Default: false */
  active?: boolean;
  /** Current sort direction shown by the sort icon. Default: 'asc' */
  direction?: 'asc' | 'desc';
  /** Press handler — called when the sort label is pressed. */
  onPress?: () => void;
  children?: ReactNode;
  /** Hide the sort icon when the column is not active. Default: false */
  hideSortIcon?: boolean;
  style?: ViewStyle;
}

// ─── TablePagination ─────────────────────────────────────────────────────────

export interface TablePaginationProps {
  /** Total number of rows. Pass -1 for unknown count. */
  count: number;
  /** Current zero-based page index. */
  page: number;
  /** Number of rows per page. */
  rowsPerPage: number;
  /**
   * Called when the page changes.
   * RN-DEVIATION: Signature is (page: number) instead of MUI Web's (event, page).
   * React Native has no React.MouseEvent; the event arg is omitted.
   */
  onPageChange: (page: number) => void;
  /** Called when rows-per-page selection changes. */
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  /** Options for the rows-per-page selector. Default: [10, 25, 50, 100] */
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  /** Label for the rows-per-page selector. Default: 'Rows per page:' */
  labelRowsPerPage?: ReactNode;
  /** Custom label for the displayed rows range. */
  labelDisplayedRows?: (info: { from: number; to: number; count: number }) => string;
  /** Show a first-page button. Default: false */
  showFirstButton?: boolean;
  /** Show a last-page button. Default: false */
  showLastButton?: boolean;
  style?: ViewStyle;
}
