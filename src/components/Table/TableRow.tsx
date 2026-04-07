import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface TableRowSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableRowProps extends SlotPropsConfig<TableRowSlots> {
  children?: React.ReactNode;
  selected?: boolean;
  hover?: boolean;
  onPress?: () => void;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const TableRow = memo(function TableRow(props: TableRowProps) {
  const { children, selected = false, hover = false, onPress, sx, style, testID, accessibilityLabel } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme } = theme;

  const rowStyle = [
    styles.row,
    selected && { backgroundColor: colorScheme.secondaryContainer + '1F' }, // ~12% alpha
    hover && { backgroundColor: colorScheme.onSurface + '0A' },             // ~4% alpha
    sxStyle,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...rowStyle,
          pressed && { backgroundColor: colorScheme.onSurface + '1A' },     // ~10% alpha on press
        ]}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={rowStyle}
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export { TableRow };
