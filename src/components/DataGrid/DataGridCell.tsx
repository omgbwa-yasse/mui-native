import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import type { GridCellParams, GridDensity, GridRowData } from './types';

interface DataGridCellProps<TRow extends GridRowData = GridRowData> {
  params: GridCellParams<TRow>;
  density: GridDensity;
  isEditing?: boolean;
  onPress?: (params: GridCellParams<TRow>) => void;
  testID?: string;
}

const VERTICAL_PADDING: Record<GridDensity, number> = {
  compact: 4,
  standard: 8,
};

function DataGridCellInner<TRow extends GridRowData = GridRowData>({
  params,
  density,
  isEditing = false,
  onPress,
  testID,
}: DataGridCellProps<TRow>): React.ReactElement {
  const { theme } = useTheme();
  const { colDef, value } = params;

  const resolvedValue = useMemo(() => {
    if (colDef.valueGetter) {
      return colDef.valueGetter({ row: params.row, field: colDef.field });
    }
    return value;
  }, [colDef, params.row, value]);

  const displayText = useMemo(() => {
    if (colDef.valueFormatter) {
      return colDef.valueFormatter({ value: resolvedValue });
    }
    if (resolvedValue === null || resolvedValue === undefined) {
      return '';
    }
    return String(resolvedValue);
  }, [colDef, resolvedValue]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cell: {
          flex: colDef.flex ?? (colDef.width ? undefined : 1),
          width: colDef.flex ? undefined : colDef.width,
          paddingVertical: VERTICAL_PADDING[density],
          paddingHorizontal: 8,
          justifyContent: 'center',
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: theme.colorScheme.outlineVariant,
        } as const,
        text: {
          color: theme.colorScheme.onSurface,
          fontSize: 14,
        } as const,
      }),
    [theme, density, colDef.flex, colDef.width],
  );

  const content = useMemo(() => {
    if (isEditing) {
      // When editing, DataGridCellEditor is rendered by DataGridRow in place of this cell
      return null;
    }
    if (colDef.renderCell) {
      return colDef.renderCell(params);
    }
    return <Text style={styles.text}>{displayText}</Text>;
  }, [isEditing, colDef, params, styles.text, displayText]);

  if (onPress) {
    return (
      <Pressable
        style={styles.cell}
        onPress={() => onPress(params)}
        accessibilityRole="button"
        accessibilityLabel={displayText || (colDef.headerName ?? colDef.field)}
        testID={testID}
      >
        <View>{content}</View>
      </Pressable>
    );
  }

  return (
    <View style={styles.cell} testID={testID}>
      {content}
    </View>
  );
}

export const DataGridCell = React.memo(
  DataGridCellInner,
) as typeof DataGridCellInner;
