import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { GridColDef, GridDensity, GridRowData, GridSortItem, GridSortModel } from './types';

interface DataGridHeaderRowProps<TRow extends GridRowData = GridRowData> {
  columns: GridColDef<TRow>[];
  density: GridDensity;
  sortModel: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
  disableColumnSorting?: boolean;
  checkboxSelection?: boolean;
  disableColumnFilter?: boolean;
  filterVisible: boolean;
  onToggleFilter?: () => void;
  testID?: string;
}

function getSortDirection(
  sortModel: GridSortModel,
  field: string,
): GridSortItem['sort'] | null {
  return sortModel.find((s) => s.field === field)?.sort ?? null;
}

function nextSortDirection(
  current: GridSortItem['sort'] | null,
): GridSortItem['sort'] | null {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null; // cycle back to unsorted
}

const SORT_ICONS: Record<NonNullable<GridSortItem['sort']>, string> = {
  asc: ' ↑',
  desc: ' ↓',
};

const VERTICAL_PADDING: Record<GridDensity, number> = {
  compact: 6,
  standard: 10,
};

function DataGridHeaderRowInner<TRow extends GridRowData = GridRowData>({
  columns,
  density,
  sortModel,
  onSortModelChange,
  disableColumnSorting = false,
  checkboxSelection = false,
  disableColumnFilter = false,
  filterVisible,
  onToggleFilter,
  testID,
}: DataGridHeaderRowProps<TRow>): React.ReactElement {
  const { theme } = useTheme();

  const handleSortPress = useCallback(
    (field: string) => {
      if (!onSortModelChange) return;
      const current = getSortDirection(sortModel, field);
      const next = nextSortDirection(current);
      if (next === null) {
        // Remove this field from sort
        onSortModelChange(sortModel.filter((s) => s.field !== field));
      } else {
        // Replace or add
        const others = sortModel.filter((s) => s.field !== field);
        onSortModelChange([{ field, sort: next }, ...others]);
      }
    },
    [sortModel, onSortModelChange],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colorScheme.surfaceVariant,
          borderBottomWidth: 1,
          borderBottomColor: theme.colorScheme.outline,
        } as const,
        checkboxPlaceholder: {
          width: 48,
        } as const,
        headerCell: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: VERTICAL_PADDING[density],
          paddingHorizontal: 8,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: theme.colorScheme.outlineVariant,
        } as const,
        headerCellFixed: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: VERTICAL_PADDING[density],
          paddingHorizontal: 8,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: theme.colorScheme.outlineVariant,
        } as const,
        headerText: {
          fontWeight: '600',
          fontSize: 12,
          color: theme.colorScheme.onSurfaceVariant,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          flex: 1,
        } as const,
        sortIndicator: {
          color: theme.colorScheme.primary,
          fontWeight: '700',
          fontSize: 12,
        } as const,
        filterToggle: {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          backgroundColor: filterVisible
            ? theme.colorScheme.primaryContainer
            : 'transparent',
        } as const,
        filterToggleText: {
          color: filterVisible
            ? theme.colorScheme.onPrimaryContainer
            : theme.colorScheme.onSurfaceVariant,
          fontSize: 12,
        } as const,
      }),
    [theme, density, filterVisible],
  );

  return (
    <View style={styles.header} testID={testID} role="row">
      {checkboxSelection && <View style={styles.checkboxPlaceholder} />}

      {columns.map((colDef) => {
        const direction = getSortDirection(sortModel, colDef.field);
        const canSort = !disableColumnSorting && (colDef.sortable !== false) && !!onSortModelChange;
        const canFilter = !disableColumnFilter && (colDef.filterable !== false);
        const label = colDef.headerName ?? colDef.field;
        const cellStyle =
          colDef.flex != null
            ? [styles.headerCell, { flex: colDef.flex }]
            : colDef.width != null
              ? [styles.headerCellFixed, { width: colDef.width }]
              : styles.headerCell;

        if (colDef.renderHeader) {
          return (
            <View key={colDef.field} style={cellStyle as object}>
              {colDef.renderHeader({ field: colDef.field, colDef })}
              {canFilter && onToggleFilter && (
                <Pressable
                  style={styles.filterToggle}
                  onPress={onToggleFilter}
                  accessibilityRole="button"
                  accessibilityLabel="Toggle column filters"
                >
                  <Text style={styles.filterToggleText}>⊟</Text>
                </Pressable>
              )}
            </View>
          );
        }

        return (
          <Pressable
            key={colDef.field}
            style={cellStyle as object}
            onPress={canSort ? () => handleSortPress(colDef.field) : undefined}
            role={canSort ? 'button' : 'columnheader'}
            accessibilityLabel={
              canSort
                ? `Sort by ${label}${direction ? `, currently ${direction}ending` : ''}`
                : label
            }
          >
            <Text style={styles.headerText} numberOfLines={1}>
              {label}
              {direction != null && (
                <Text style={styles.sortIndicator}>{SORT_ICONS[direction]}</Text>
              )}
            </Text>

            {canFilter && onToggleFilter && (
              <Pressable
                style={styles.filterToggle}
                onPress={onToggleFilter}
                accessibilityRole="button"
                accessibilityLabel="Toggle column filters"
                hitSlop={8}
              >
                <Text style={styles.filterToggleText}>{filterVisible ? '⊟' : '⊞'}</Text>
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export const DataGridHeaderRow = React.memo(
  DataGridHeaderRowInner,
) as typeof DataGridHeaderRowInner;
