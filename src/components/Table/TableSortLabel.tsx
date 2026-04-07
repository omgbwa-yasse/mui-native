import React, { memo } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface TableSortLabelSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TableSortLabelProps extends SlotPropsConfig<TableSortLabelSlots> {
  /** Whether the sort indicator is active */
  active: boolean;
  /** Current sort direction */
  direction?: 'asc' | 'desc';
  /** Hide the sort icon when the column is not active */
  hideSortIcon?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const TableSortLabel = memo(function TableSortLabel(props: TableSortLabelProps) {
  const {
    active,
    direction = 'asc',
    hideSortIcon = false,
    onPress,
    children,
    sx,
    style,
    testID,
    accessibilityLabel,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, typography } = theme;

  const showIcon = active || !hideSortIcon;
  // asc → ↑ (arrow up), desc → ↓ (arrow down)
  const arrowChar = direction === 'desc' ? '↓' : '↑';

  const labelStyle = [
    typography.labelMedium,
    { color: active ? colorScheme.primary : colorScheme.onSurface },
  ];

  const iconStyle = [
    styles.icon,
    typography.labelSmall,
    { color: active ? colorScheme.primary : colorScheme.onSurfaceVariant, opacity: active ? 1 : 0.4 },
  ];

  return (
    <Pressable
      onPress={onPress}
      style={[styles.root, sxStyle, style]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      // @ts-ignore — aria-sort is valid
      aria-sort={active ? direction : undefined}
    >
      <Text style={labelStyle}>{children}</Text>
      {showIcon && (
        <View style={styles.iconWrapper}>
          <Text style={iconStyle}>{arrowChar}</Text>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    // @ts-ignore -- cursor is web-only, not in RN ViewStyle
    cursor: 'pointer' as unknown as undefined,
  },
  iconWrapper: {
    marginLeft: 2,
  },
  icon: {
    lineHeight: 16,
  },
});

export { TableSortLabel };
