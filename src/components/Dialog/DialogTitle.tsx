import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface DialogTitleSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface DialogTitleProps extends SlotPropsConfig<DialogTitleSlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

const DialogTitle = memo(function DialogTitle(props: DialogTitleProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, typography } = theme;

  return (
    <Text
      style={[styles.title, { ...typography.headlineSmall, color: colorScheme.onSurface }, sxStyle, style]}
      testID={testID}
      accessibilityRole="header"
    >
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  title: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
  },
});

export { DialogTitle };
