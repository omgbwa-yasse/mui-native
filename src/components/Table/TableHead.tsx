import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { TableSectionContext } from './TableContext';

export interface TableHeadSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableHeadProps extends SlotPropsConfig<TableHeadSlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const TableHead = memo(function TableHead(props: TableHeadProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme } = theme;

  return (
    <TableSectionContext.Provider value={{ variant: 'head' }}>
      <View
        style={[styles.head, { backgroundColor: colorScheme.surfaceVariant }, sxStyle, style]}
        testID={testID}
      >
        {children}
      </View>
    </TableSectionContext.Provider>
  );
});

const styles = StyleSheet.create({
  head: {
    width: '100%',
  },
});

export { TableHead };
