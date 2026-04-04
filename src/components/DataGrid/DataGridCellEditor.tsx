import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { GridCellParams, GridDensity, GridRowData } from './types';

interface DataGridCellEditorProps<TRow extends GridRowData = GridRowData> {
  params: GridCellParams<TRow>;
  density: GridDensity;
  processRowUpdate?: (newRow: TRow, oldRow: TRow) => TRow | Promise<TRow>;
  onProcessRowUpdateError?: (error: Error) => void;
  onCommit: (updatedRow: TRow) => void;
  onCancel: () => void;
  testID?: string;
}

const VERTICAL_PADDING: Record<GridDensity, number> = {
  compact: 4,
  standard: 8,
};

function DataGridCellEditorInner<TRow extends GridRowData = GridRowData>({
  params,
  density,
  processRowUpdate,
  onProcessRowUpdateError,
  onCommit,
  onCancel,
  testID,
}: DataGridCellEditorProps<TRow>): React.ReactElement {
  const { theme } = useTheme();
  const { row, colDef, value } = params;

  const initialText = useMemo(() => {
    if (value === null || value === undefined) return '';
    if (colDef.valueFormatter) {
      return colDef.valueFormatter({ value });
    }
    return String(value);
  }, [value, colDef]);

  const [editText, setEditText] = useState(initialText);
  const committed = useRef(false);

  const commitEdit = useCallback(async () => {
    if (committed.current) return;
    committed.current = true;

    const updatedRow: TRow = { ...row, [colDef.field]: editText };

    if (processRowUpdate) {
      try {
        const result = await processRowUpdate(updatedRow, row);
        onCommit(result);
      } catch (err) {
        committed.current = false;
        onProcessRowUpdateError?.(err instanceof Error ? err : new Error(String(err)));
        onCancel();
      }
    } else {
      onCommit(updatedRow);
    }
  }, [row, colDef.field, editText, processRowUpdate, onProcessRowUpdateError, onCommit, onCancel]);

  const handleBlur = useCallback(() => {
    void commitEdit();
  }, [commitEdit]);

  const handleSubmitEditing = useCallback(() => {
    void commitEdit();
  }, [commitEdit]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: colDef.flex ?? (colDef.width ? undefined : 1),
          width: colDef.flex ? undefined : colDef.width,
          paddingVertical: VERTICAL_PADDING[density] - 2,
          paddingHorizontal: 6,
          justifyContent: 'center',
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: theme.colorScheme.outlineVariant,
        } as const,
        input: {
          color: theme.colorScheme.onSurface,
          fontSize: 14,
          borderWidth: 1,
          borderColor: theme.colorScheme.primary,
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
          backgroundColor: theme.colorScheme.surface,
        } as const,
      }),
    [theme, density, colDef.flex, colDef.width],
  );

  return (
    <View style={styles.container} accessibilityRole="none" testID={testID}>
      <TextInput
        value={editText}
        onChangeText={setEditText}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        style={styles.input}
        autoFocus
        returnKeyType="done"
        accessibilityLabel={`Edit ${colDef.headerName ?? colDef.field}`}
        testID={testID != null ? `${testID}-input` : undefined}
      />
    </View>
  );
}

export const DataGridCellEditor = React.memo(
  DataGridCellEditorInner,
) as typeof DataGridCellEditorInner;
