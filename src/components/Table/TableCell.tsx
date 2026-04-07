import React, { memo, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { TableContext, TableSectionContext } from './TableContext';
import type { TablePaddingVariant, TableSize, TableVariant } from './TableContext';

export interface TableCellSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableCellProps extends SlotPropsConfig<TableCellSlots> {
  children?: React.ReactNode;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  padding?: TablePaddingVariant;
  size?: TableSize;
  sortDirection?: 'asc' | 'desc' | false;
  variant?: TableVariant;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const TableCell = memo(function TableCell(props: TableCellProps) {
  const {
    children,
    align = 'left',
    padding: paddingProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp,
    sx,
    style,
    textStyle,
    testID,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, typography } = theme;

  const tableCtx = useContext(TableContext);
  const sectionCtx = useContext(TableSectionContext);

  const resolvedVariant: TableVariant = variantProp ?? sectionCtx.variant;
  const resolvedSize: TableSize = sizeProp ?? tableCtx.size;
  const resolvedPadding: TablePaddingVariant = paddingProp ?? tableCtx.padding;

  const isHead = resolvedVariant === 'head';

  // Compute cell padding
  const cellPaddingStyle = (() => {
    if (resolvedPadding === 'none') return {};
    if (resolvedPadding === 'checkbox') return { paddingHorizontal: 4, paddingVertical: resolvedSize === 'small' ? 4 : 8 };
    // 'normal'
    if (resolvedSize === 'small') return { paddingVertical: 4, paddingHorizontal: 8 };
    return { paddingVertical: 8, paddingHorizontal: 16 };
  })();

  // Compute horizontal alignment
  const alignStyle: ViewStyle = (() => {
    switch (align) {
      case 'center': return { alignItems: 'center' };
      case 'right': return { alignItems: 'flex-end' };
      case 'justify': return { alignItems: 'stretch' };
      default: return { alignItems: 'flex-start' };
    }
  })();

  const textAlignStyle: TextStyle = (() => {
    switch (align) {
      case 'center': return { textAlign: 'center' };
      case 'right': return { textAlign: 'right' };
      default: return { textAlign: 'left' };
    }
  })();

  const cellStyle = [
    styles.cell,
    cellPaddingStyle,
    alignStyle,
    isHead && { borderBottomColor: colorScheme.outline, borderBottomWidth: 1 },
    sxStyle,
    style,
  ];

  const baseTextStyle = [
    isHead ? typography.labelMedium : typography.bodyMedium,
    { color: colorScheme.onSurface },
    textAlignStyle,
    textStyle,
  ];

  return (
    <View
      style={cellStyle}
      testID={testID}
      role={isHead ? 'columnheader' : 'cell'}
      accessible={true}
      aria-sort={sortDirection || undefined}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={baseTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    overflow: 'hidden',
  },
});

export { TableCell };
