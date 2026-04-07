import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { TableContext } from './TableContext';
import type { TableSize, TablePaddingVariant } from './TableContext';

export interface TableSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableProps extends SlotPropsConfig<TableSlots> {
  children?: React.ReactNode;
  /**
   * If true, the table head rows will be "sticky".
   * // RN-DEVIATION: CSS position:sticky unavailable in RN — implemented via
   * position:'absolute' on TableHead + matching paddingTop on TableBody.
   */
  stickyHeader?: boolean;
  padding?: TablePaddingVariant;
  size?: TableSize;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Table = memo(function Table(props: TableProps) {
  const { children, stickyHeader = false, padding = 'normal', size = 'medium', sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <TableContext.Provider value={{ size, padding, stickyHeader }}>
      <View style={[styles.table, sxStyle, style]} testID={testID}>
        {children}
      </View>
    </TableContext.Provider>
  );
});

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
});

export { Table };
