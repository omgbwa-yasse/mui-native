import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { TableSectionContext } from './TableContext';

export interface TableBodySlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableBodyProps extends SlotPropsConfig<TableBodySlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const TableBody = memo(function TableBody(props: TableBodyProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <TableSectionContext.Provider value={{ variant: 'body' }}>
      <View style={[styles.body, sxStyle, style]} testID={testID}>
        {children}
      </View>
    </TableSectionContext.Provider>
  );
});

const styles = StyleSheet.create({
  body: {
    width: '100%',
  },
});

export { TableBody };
