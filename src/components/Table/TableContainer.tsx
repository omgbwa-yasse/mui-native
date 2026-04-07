import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface TableContainerSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableContainerProps extends SlotPropsConfig<TableContainerSlots> {
  children?: React.ReactNode;
  /** If true, enables horizontal scrolling. */
  horizontal?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const TableContainer = memo(function TableContainer(props: TableContainerProps) {
  const { children, horizontal = false, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <ScrollView
      horizontal={horizontal}
      style={[styles.container, sxStyle, style]}
      testID={testID}
    >
      {children}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { TableContainer };
