import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface CardActionsSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface CardActionsProps extends SlotPropsConfig<CardActionsSlots> {
  children?: React.ReactNode;
  /** When true, removes the default gap between action buttons. */
  disableSpacing?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CardActions = memo(function CardActions(props: CardActionsProps) {
  const { children, disableSpacing = false, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View
      style={[styles.row, disableSpacing ? styles.noGap : styles.gap, sxStyle, style]}
      testID={testID}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  gap: { gap: 8 },
  noGap: {},
});

export { CardActions };
