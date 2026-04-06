import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { createDataGridStyles } from './DataGrid.styles';
import { DataGridFilterRow } from './DataGridFilterRow';
import { DataGridHeaderRow } from './DataGridHeaderRow';
import { DataGridPagination } from './DataGridPagination';
import { DataGridRow } from './DataGridRow';
import type {
  DataGridProps,
  GridApiRef,
  GridFilterItem,
  GridPaginationModel,
  GridRowData,
  GridRowId,
  GridSelectionModel,
  GridSortModel,
} from './types';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50];
const DEFAULT_PAGINATION: GridPaginationModel = { page: 0, pageSize: 10 };

// ─── Sort helpers ─────────────────────────────────────────────────────────────

function applySortModel<TRow extends GridRowData>(
  rows: TRow[],
  sortModel: GridSortModel,
): TRow[] {
  if (sortModel.length === 0) return rows;
  return [...rows].sort((a, b) => {
    for (const { field, sort } of sortModel) {
      const av = a[field];
      const bv = b[field];
      let cmp = 0;
      if (av == null && bv == null) cmp = 0;
      else if (av == null) cmp = -1;
      else if (bv == null) cmp = 1;
      else if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      if (cmp !== 0) return sort === 'asc' ? cmp : -cmp;
    }
    return 0;
  });
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

function applyFilterItem<TRow extends GridRowData>(
  row: TRow,
  item: GridFilterItem,
): boolean {
  const raw = row[item.field];
  const value = raw == null ? '' : String(raw).toLowerCase();
  const filterValue = item.value.toLowerCase();

  switch (item.operator) {
    case 'contains':
      return value.includes(filterValue);
    case 'equals':
      return value === filterValue;
    case 'startsWith':
      return value.startsWith(filterValue);
    case 'endsWith':
      return value.endsWith(filterValue);
    case 'gt':
      return Number(raw) > Number(item.value);
    case 'lt':
      return Number(raw) < Number(item.value);
    default:
      return true;
  }
}

function applyFilters<TRow extends GridRowData>(
  rows: TRow[],
  items: GridFilterItem[],
): TRow[] {
  if (items.length === 0) return rows;
  return rows.filter((row) => items.every((item) => applyFilterItem(row, item)));
}

// ─── Pagination helpers ───────────────────────────────────────────────────────

function applyPagination<TRow extends GridRowData>(
  rows: TRow[],
  model: GridPaginationModel,
): TRow[] {
  const start = model.page * model.pageSize;
  return rows.slice(start, start + model.pageSize);
}

// ─── DataGrid component ───────────────────────────────────────────────────────

function DataGridInner<TRow extends GridRowData = GridRowData>(
  rawProps: DataGridProps<TRow>,
): React.ReactElement {
  const props = useComponentDefaults('DataGrid', rawProps) as DataGridProps<TRow>;
  const {
    rows,
    columns,
    loading = false,
    checkboxSelection = false,
    disableRowSelectionOnClick = false,
    onRowClick,
    density = 'standard',
    sortModel: sortModelProp,
    onSortModelChange,
    disableColumnSorting = false,
    filterModel: filterModelProp,
    onFilterModelChange,
    disableColumnFilter = false,
    paginationModel: paginationModelProp,
    onPaginationModelChange,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    rowCount,
    editMode,
    processRowUpdate,
    onProcessRowUpdateError,
    apiRef,
    slots,
    onRowSelectionModelChange,
    rowSelectionModel,
    style,
    testID,
    accessibilityLabel,
    color,
    sx,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const styles = useMemo(() => createDataGridStyles(theme, density), [theme, density]);
  const flatListRef = useRef<FlatList>(null);

  // ── Controlled / uncontrolled state ─────────────────────────────────────────

  const isControlledSort = sortModelProp !== undefined;
  const [internalSortModel, setInternalSortModel] = useState<GridSortModel>([]);
  const sortModel = isControlledSort ? sortModelProp! : internalSortModel;
  const setSortModel = useCallback(
    (model: GridSortModel) => {
      if (!isControlledSort) setInternalSortModel(model);
      onSortModelChange?.(model);
    },
    [isControlledSort, onSortModelChange],
  );

  const isControlledFilter = filterModelProp !== undefined;
  const [internalFilterModel, setInternalFilterModel] = useState({ items: [] as GridFilterItem[] });
  const filterModel = isControlledFilter ? filterModelProp! : internalFilterModel;
  const setFilterModel = useCallback(
    (model: { items: GridFilterItem[] }) => {
      if (!isControlledFilter) setInternalFilterModel(model);
      onFilterModelChange?.(model);
    },
    [isControlledFilter, onFilterModelChange],
  );

  const isControlledPagination = paginationModelProp !== undefined;
  const [internalPaginationModel, setInternalPaginationModel] =
    useState<GridPaginationModel>({ page: 0, pageSize: pageSizeOptions[0] ?? 10 });
  const paginationModel = isControlledPagination ? paginationModelProp! : internalPaginationModel;
  const setPaginationModel = useCallback(
    (model: GridPaginationModel) => {
      if (!isControlledPagination) setInternalPaginationModel(model);
      onPaginationModelChange?.(model);
    },
    [isControlledPagination, onPaginationModelChange],
  );

  const isControlledSelection = rowSelectionModel !== undefined;
  const [internalSelectionModel, setInternalSelectionModel] = useState<GridSelectionModel>([]);
  const selectionModel = isControlledSelection ? rowSelectionModel! : internalSelectionModel;
  const setSelectionModel = useCallback(
    (ids: GridSelectionModel) => {
      if (!isControlledSelection) setInternalSelectionModel(ids);
      onRowSelectionModelChange?.(ids);
    },
    [isControlledSelection, onRowSelectionModelChange],
  );

  const handleSelectionChange = useCallback(
    (id: GridRowId, selected: boolean) => {
      const next = selected
        ? [...selectionModel, id]
        : selectionModel.filter((sid) => sid !== id);
      setSelectionModel(next);
    },
    [selectionModel, setSelectionModel],
  );

  // ── Filter row visibility ────────────────────────────────────────────────────

  const [filterVisible, setFilterVisible] = useState(false);
  const handleToggleFilter = useCallback(() => {
    setFilterVisible((v) => !v);
  }, []);

  // ── Internal row mutations (edit mode) ──────────────────────────────────────

  const [localRows, setLocalRows] = useState<TRow[]>(rows);
  // Sync when external rows change
  const prevRowsRef = useRef<TRow[]>(rows);
  if (prevRowsRef.current !== rows) {
    prevRowsRef.current = rows;
    setLocalRows(rows);
  }

  const handleRowUpdate = useCallback((updatedRow: TRow) => {
    setLocalRows((prev) =>
      prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)),
    );
  }, []);

  // ── Data pipeline: sort → filter → paginate ──────────────────────────────────

  const sortedRows = useMemo(
    () => applySortModel(localRows, sortModel),
    [localRows, sortModel],
  );

  const filteredRows = useMemo(
    () => applyFilters(sortedRows, filterModel.items),
    [sortedRows, filterModel.items],
  );

  const totalCount = rowCount ?? filteredRows.length;

  const pagedRows = useMemo(
    () => applyPagination(filteredRows, paginationModel),
    [filteredRows, paginationModel],
  );

  // Reset page when filter changes
  const prevFilterRef = useRef(filterModel);
  if (prevFilterRef.current !== filterModel) {
    prevFilterRef.current = filterModel;
    if (paginationModel.page !== 0) {
      setPaginationModel({ ...paginationModel, page: 0 });
    }
  }

  // ── apiRef wiring ─────────────────────────────────────────────────────────────

  useImperativeHandle(
    apiRef,
    (): GridApiRef => ({
      setPage: (page) => setPaginationModel({ ...paginationModel, pageSize: paginationModel.pageSize, page }),
      setSortModel,
      getSelectedRows: () =>
        localRows.filter((r) => selectionModel.includes(r.id as GridRowId)),
      scrollToRow: (rowIndex) => {
        flatListRef.current?.scrollToIndex({ index: rowIndex, animated: true });
      },
    }),
    [setPaginationModel, setSortModel, paginationModel, localRows, selectionModel],
  );

  // ── Visible columns ──────────────────────────────────────────────────────────

  const visibleColumns = useMemo(
    () => columns.filter((c) => !c.hide),
    [columns],
  );

  // ── Render helpers ────────────────────────────────────────────────────────────

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<TRow>) => (
      <DataGridRow
        row={item}
        rowIndex={index}
        columns={visibleColumns}
        density={density}
        selected={selectionModel.includes(item.id as GridRowId)}
        checkboxSelection={checkboxSelection}
        onRowSelectionChange={handleSelectionChange}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        onRowClick={onRowClick}
        editMode={editMode}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        onRowUpdate={handleRowUpdate}
        testID={testID != null ? `${testID}-row-${index}` : undefined}
      />
    ),
    [
      visibleColumns,
      density,
      selectionModel,
      checkboxSelection,
      handleSelectionChange,
      disableRowSelectionOnClick,
      onRowClick,
      editMode,
      processRowUpdate,
      onProcessRowUpdateError,
      handleRowUpdate,
      testID,
    ],
  );

  const keyExtractor = useCallback(
    (item: TRow) => String(item.id),
    [],
  );

  const ListEmptyComponent = useMemo(() => {
    if (loading) return null;
    if (slots?.noRowsOverlay) {
      const NoRowsOverlay = slots.noRowsOverlay;
      return <NoRowsOverlay />;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No rows</Text>
      </View>
    );
  }, [loading, slots, styles.emptyContainer, styles.emptyText]);

  return (
    <View
      style={[styles.container, sxStyle, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      role="grid"
    >
      {/* Optional toolbar slot */}
      {slots?.toolbar && <slots.toolbar />}

      {/* Header */}
      <DataGridHeaderRow
        columns={visibleColumns}
        density={density}
        sortModel={sortModel}
        onSortModelChange={!disableColumnSorting ? setSortModel : undefined}
        disableColumnSorting={disableColumnSorting}
        checkboxSelection={checkboxSelection}
        disableColumnFilter={disableColumnFilter}
        filterVisible={filterVisible}
        onToggleFilter={!disableColumnFilter ? handleToggleFilter : undefined}
        testID={testID != null ? `${testID}-header` : undefined}
      />

      {/* Filter row (collapsible) */}
      {!disableColumnFilter && filterVisible && (
        <DataGridFilterRow
          columns={visibleColumns}
          density={density}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          checkboxSelection={checkboxSelection}
          testID={testID != null ? `${testID}-filters` : undefined}
        />
      )}

      {/* Data rows */}
      <FlatList
        ref={flatListRef}
        data={pagedRows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews
        testID={testID != null ? `${testID}-list` : undefined}
      />

      {/* Pagination */}
      <DataGridPagination
        paginationModel={paginationModel}
        rowCount={totalCount}
        pageSizeOptions={pageSizeOptions}
        onPaginationModelChange={setPaginationModel}
        testID={testID != null ? `${testID}-pagination` : undefined}
      />

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          {slots?.loadingOverlay ? (
            <slots.loadingOverlay />
          ) : (
            <ActivityIndicator
              size="large"
              color={bg}
              accessibilityLabel="Loading data"
            />
          )}
        </View>
      )}
    </View>
  );
}

export const DataGrid = React.memo(DataGridInner) as typeof DataGridInner;
export { DEFAULT_PAGINATION };
