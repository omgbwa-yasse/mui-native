import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

export interface DialogContentTextSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface DialogContentTextProps extends SlotPropsConfig<DialogContentTextSlots> {
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

const DialogContentText = memo(function DialogContentText(props: DialogContentTextProps) {
  const { children, sx, style, testID } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, typography } = theme;

  return (
    <Text
      style={[
        styles.text,
        { ...typography.bodyMedium, color: colorScheme.onSurfaceVariant },
        sxStyle,
        style,
      ]}
      testID={testID}
    >
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  text: {
    // base layout — typography and color come from theme above
  },
});

export { DialogContentText };
