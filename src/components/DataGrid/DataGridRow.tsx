import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox } from '../Checkbox';
import { useTheme } from '../../theme';
import { DataGridCell } from './DataGridCell';
import { DataGridCellEditor } from './DataGridCellEditor';
import type {
  GridCellParams,
  GridColDef,
  GridDensity,
  GridEditMode,
  GridRowData,
  GridRowId,
} from './types';

interface DataGridRowProps<TRow extends GridRowData = GridRowData> {
  row: TRow;
  rowIndex: number;
  columns: GridColDef<TRow>[];
  density: GridDensity;
  selected?: boolean;
  checkboxSelection?: boolean;
  onRowSelectionChange?: (id: GridRowId, selected: boolean) => void;
  disableRowSelectionOnClick?: boolean;
  onRowClick?: (params: GridCellParams<TRow>) => void;
  editMode?: GridEditMode;
  processRowUpdate?: (newRow: TRow, oldRow: TRow) => TRow | Promise<TRow>;
  onProcessRowUpdateError?: (error: Error) => void;
  onRowUpdate?: (updatedRow: TRow) => void;
  testID?: string;
}

function DataGridRowInner<TRow extends GridRowData = GridRowData>({
  row,
  rowIndex,
  columns,
  density,
  selected = false,
  checkboxSelection = false,
  onRowSelectionChange,
  disableRowSelectionOnClick = false,
  onRowClick,
  editMode,
  processRowUpdate,
  onProcessRowUpdateError,
  onRowUpdate,
  testID,
}: DataGridRowProps<TRow>): React.ReactElement {
  const { theme } = useTheme();
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleCellPress = useCallback(
    (params: GridCellParams<TRow>) => {
      onRowClick?.(params);
      if (!disableRowSelectionOnClick) {
        onRowSelectionChange?.(row.id, !selected);
      }
      if (editMode === 'cell' && params.colDef.editable) {
        setEditingField(params.field);
      }
    },
    [row.id, selected, onRowClick, disableRowSelectionOnClick, onRowSelectionChange, editMode],
  );

  const handleEditCommit = useCallback(
    (updatedRow: TRow) => {
      setEditingField(null);
      onRowUpdate?.(updatedRow);
    },
    [onRowUpdate],
  );

  const handleEditCancel = useCallback(() => {
    setEditingField(null);
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: selected
            ? theme.colorScheme.secondaryContainer
            : rowIndex % 2 === 0
              ? theme.colorScheme.surface
              : theme.colorScheme.surfaceVariant,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colorScheme.outlineVariant,
        } as const,
        checkboxCell: {
          width: 48,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: density === 'compact' ? 4 : 8,
        } as const,
      }),
    [theme, selected, rowIndex, density],
  );

  return (
    <Pressable
      style={styles.row}
      onPress={
        !disableRowSelectionOnClick
          ? () => onRowSelectionChange?.(row.id, !selected)
          : undefined
      }
      role="row"
      accessibilityState={{ selected }}
      testID={testID}
    >
      {checkboxSelection && (
        <View style={styles.checkboxCell}>
          <Checkbox
            status={selected ? 'checked' : 'unchecked'}
            onPress={() => onRowSelectionChange?.(row.id, !selected)}
            accessibilityLabel={`Select row ${rowIndex + 1}`}
          />
        </View>
      )}

      {columns.map((colDef) => {
        const value = colDef.valueGetter
          ? colDef.valueGetter({ row, field: colDef.field })
          : row[colDef.field];

        const cellParams: GridCellParams<TRow> = {
          row,
          field: colDef.field,
          value,
          colDef,
          rowIndex,
        };

        const isEditing = editingField === colDef.field && colDef.editable;

        if (isEditing) {
          return (
            <DataGridCellEditor
              key={colDef.field}
              params={cellParams}
              density={density}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={onProcessRowUpdateError}
              onCommit={handleEditCommit}
              onCancel={handleEditCancel}
            />
          );
        }

        return (
          <DataGridCell
            key={colDef.field}
            params={cellParams}
            density={density}
            onPress={
              onRowClick || (!disableRowSelectionOnClick && editMode === 'cell' && colDef.editable)
                ? handleCellPress
                : undefined
            }
          />
        );
      })}
    </Pressable>
  );
}

export const DataGridRow = React.memo(DataGridRowInner) as typeof DataGridRowInner;
