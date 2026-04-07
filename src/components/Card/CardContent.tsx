import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface CardContentSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface CardContentProps extends SlotPropsConfig<CardContentSlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CardContent = memo(function CardContent(props: CardContentProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View style={[styles.content, sxStyle, style]} testID={testID}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export { CardContent };
