import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import { TableSectionContext } from './TableContext';

export interface TableFooterSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableFooterProps extends SlotPropsConfig<TableFooterSlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const TableFooter = memo(function TableFooter(props: TableFooterProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme } = theme;

  return (
    <TableSectionContext.Provider value={{ variant: 'footer' }}>
      <View
        style={[styles.footer, { borderTopColor: colorScheme.outlineVariant, borderTopWidth: 1 }, sxStyle, style]}
        testID={testID}
      >
        {children}
      </View>
    </TableSectionContext.Provider>
  );
});

const styles = StyleSheet.create({
  footer: {
    width: '100%',
  },
});

export { TableFooter };
