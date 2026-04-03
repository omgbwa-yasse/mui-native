import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Text/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { HelperTextProps } from './types';

export const HelperText = memo(function HelperText({
  type,
  visible = true,
  padding = 'normal',
  children,
  testID,
}: HelperTextProps) {
  const { theme } = useTheme();

  if (!visible) {
    return null;
  }

  const { colorScheme } = theme;

  const color =
    type === 'error'
      ? colorScheme.error
      : type === 'info'
        ? colorScheme.secondary
        : colorScheme.onSurfaceVariant;

  return (
    <Text
      variant="bodySmall"
      accessibilityRole="text"
      testID={testID}
      style={[
        styles.base,
        padding === 'normal' ? styles.paddingNormal : undefined,
        { color },
      ]}
    >
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  base: {
    flexShrink: 1,
  },
  paddingNormal: {
    paddingStart: 16,
    paddingTop: 4,
  },
});
