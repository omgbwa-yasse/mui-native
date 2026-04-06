import React, { memo, useCallback } from 'react';
import type { AccessibilityRole } from 'react-native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { DataTableColumn, DataTableProps } from './types';

function DataTableHeaderCell<T>({
  column,
  sortColumn,
  sortDirection,
  onSort,
}: {
  column: DataTableColumn<T>;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (col: string, dir: 'asc' | 'desc') => void;
}) {
  const { theme } = useTheme();
  const isSorted = sortColumn === column.key;
  const nextDir: 'asc' | 'desc' = isSorted && sortDirection === 'asc' ? 'desc' : 'asc';

  const handlePress = useCallback(() => {
    if (column.sortable && onSort) {
      onSort(column.key, nextDir);
    }
  }, [column.key, column.sortable, onSort, nextDir]);

  const colWidth = column.width;

  return column.sortable ? (
    <TouchableOpacity
      style={[styles.headerCell, colWidth ? { width: colWidth as number } : styles.flex]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Sort by ${column.label}`}
    >
      <Text
        variant="labelMedium"
        color={theme.colorScheme.onSurface}
        style={column.numeric ? styles.numeric : undefined}
      >
        {column.label}
        {isSorted ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
      </Text>
    </TouchableOpacity>
  ) : (
    <View
      style={[styles.headerCell, colWidth ? { width: colWidth as number } : styles.flex]}
      accessibilityRole={'columnheader' as AccessibilityRole}
    >
      <Text
        variant="labelMedium"
        color={theme.colorScheme.onSurface}
        style={column.numeric ? styles.numeric : undefined}
      >
        {column.label}
      </Text>
    </View>
  );
}

function DataTable<T = Record<string, unknown>>(rawProps: DataTableProps<T>) {
  const props = useComponentDefaults(
    'DataTable',
    rawProps as unknown as DataTableProps<Record<string, unknown>>,
  ) as DataTableProps<T>;
  const {
    columns,
    rows,
    keyExtractor,
    sortColumn,
    sortDirection,
    onSort,
    selectedRows,
    onRowSelect,
    emptyState,
    onEndReached,
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const selectedSet = new Set(selectedRows ?? []);

  const handleRowSelect = useCallback(
    (key: string) => {
      if (!onRowSelect) return;
      const next = new Set(selectedSet);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      onRowSelect(Array.from(next));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onRowSelect, selectedRows],
  );

  const renderRow = useCallback(
    ({ item }: { item: T }) => {
      const key = keyExtractor(item);
      const isSelected = selectedSet.has(key);
      const rowContent = (
        <View
          style={[
            styles.row,
            isSelected && { backgroundColor: container + '28' },
          ]}
          accessibilityRole={'row' as AccessibilityRole}
        >
          {columns.map((col) => (
            <View
              key={col.key}
              style={[styles.cell, col.width ? { width: col.width as number } : styles.flex]}
              accessibilityRole={'cell' as AccessibilityRole}
            >
              {col.renderCell ? (
                col.renderCell(item)
              ) : (
                <Text
                  variant="bodyMedium"
                  color={theme.colorScheme.onSurface}
                  style={col.numeric ? styles.numeric : undefined}
                  numberOfLines={1}
                >
                  {String((item as Record<string, unknown>)[col.key] ?? '')}
                </Text>
              )}
            </View>
          ))}
        </View>
      );

      if (onRowSelect) {
        return (
          <TouchableRipple
            onPress={() => handleRowSelect(key)}
            accessibilityRole={'row' as AccessibilityRole}
            accessibilityState={{ selected: isSelected }}
          >
            {rowContent}
          </TouchableRipple>
        );
      }
      return rowContent;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, theme, keyExtractor, onRowSelect, handleRowSelect, selectedRows],
  );

  return (
    <View style={[styles.container, sxStyle, style]} accessibilityRole={'grid' as AccessibilityRole} accessible testID={testID}>
      {/* Non-virtualized header */}
      <View style={[styles.header, { backgroundColor: theme.colorScheme.surfaceVariant }]}>
        {columns.map((col) => (
          <DataTableHeaderCell
            key={col.key}
            column={col}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        ))}
      </View>
      {rows.length === 0 ? (
        <View style={styles.emptyState}>{emptyState}</View>
      ) : (
        <FlatList<T>
          data={rows}
          keyExtractor={keyExtractor}
          renderItem={renderRow}
          windowSize={5}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const MemoDataTable = memo(DataTable) as typeof DataTable;
export { MemoDataTable as DataTable };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  cell: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  numeric: {
    // eslint-disable-next-line local/no-left-right-style
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
