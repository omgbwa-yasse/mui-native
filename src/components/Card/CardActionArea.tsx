import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface CardActionAreaSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface CardActionAreaProps extends SlotPropsConfig<CardActionAreaSlots> {
  children?: React.ReactNode;
  /** Press handler. Makes the area interactive. */
  onPress?: () => void;
  disabled?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const CardActionArea = memo(function CardActionArea(props: CardActionAreaProps) {
  const { children, onPress, disabled, sx, style, testID, accessibilityLabel } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.area, sxStyle, style]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled ?? false }}
    >
      {children}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  area: {
    // Minimum 48dp touch target per Material guidelines
    minHeight: 48,
    width: '100%',
  },
});

export { CardActionArea };
