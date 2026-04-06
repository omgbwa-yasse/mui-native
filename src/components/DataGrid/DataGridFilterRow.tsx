import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../../theme';
import type { GridColDef, GridDensity, GridFilterItem, GridFilterModel, GridRowData } from './types';

interface DataGridFilterRowProps<TRow extends GridRowData = GridRowData> {
  columns: GridColDef<TRow>[];
  density: GridDensity;
  filterModel: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  checkboxSelection?: boolean;
  testID?: string;
}

function DataGridFilterRowInner<TRow extends GridRowData = GridRowData>({
  columns,
  density,
  filterModel,
  onFilterModelChange,
  checkboxSelection = false,
  testID,
}: DataGridFilterRowProps<TRow>): React.ReactElement {
  const { theme } = useTheme();

  const getFilterValue = useCallback(
    (field: string): string => {
      return filterModel.items.find((f) => f.field === field)?.value ?? '';
    },
    [filterModel.items],
  );

  const handleFilterChange = useCallback(
    (field: string, value: string) => {
      if (!onFilterModelChange) return;
      const existingIndex = filterModel.items.findIndex((f) => f.field === field);
      if (value === '') {
        // Remove filter for this field
        onFilterModelChange({
          items: filterModel.items.filter((f) => f.field !== field),
        });
        return;
      }
      const newItem: GridFilterItem = {
        field,
        operator: 'contains',
        value,
      };
      const items = [...filterModel.items];
      if (existingIndex >= 0) {
        items[existingIndex] = newItem;
      } else {
        items.push(newItem);
      }
      onFilterModelChange({ items });
    },
    [filterModel.items, onFilterModelChange],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colorScheme.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colorScheme.outline,
        } as const,
        checkboxPlaceholder: {
          width: 48,
        } as const,
        filterCell: {
          flex: 1,
          paddingVertical: density === 'compact' ? 2 : 4,
          paddingHorizontal: 8,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: theme.colorScheme.outlineVariant,
        } as const,
        input: {
          borderWidth: 1,
          borderColor: theme.colorScheme.outline,
          borderRadius: 4,
          paddingHorizontal: 6,
          paddingVertical: density === 'compact' ? 2 : 4,
          fontSize: 13,
          color: theme.colorScheme.onSurface,
          backgroundColor: theme.colorScheme.surfaceVariant,
        } as const,
      }),
    [theme, density],
  );

  return (
    <View style={styles.row} testID={testID} role="row">
      {checkboxSelection && <View style={styles.checkboxPlaceholder} />}

      {columns.map((colDef) => {
        const canFilter = colDef.filterable !== false;
        const cellStyle =
          colDef.flex != null
            ? [styles.filterCell, { flex: colDef.flex }]
            : colDef.width != null
              ? [styles.filterCell, { width: colDef.width, flex: undefined }]
              : styles.filterCell;

        return (
          <View key={colDef.field} style={cellStyle as object}>
            {canFilter ? (
              <TextInput
                value={getFilterValue(colDef.field)}
                onChangeText={(text) => handleFilterChange(colDef.field, text)}
                placeholder="Filter…"
                placeholderTextColor={theme.colorScheme.onSurfaceVariant}
                style={styles.input}
                accessibilityLabel={`Filter by ${colDef.headerName ?? colDef.field}`}
                returnKeyType="search"
                clearButtonMode="while-editing"
                testID={testID != null ? `${testID}-filter-${colDef.field}` : undefined}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

export const DataGridFilterRow = React.memo(
  DataGridFilterRowInner,
) as typeof DataGridFilterRowInner;
