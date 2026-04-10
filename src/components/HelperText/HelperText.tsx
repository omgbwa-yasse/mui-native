import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Text/Text';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { HelperTextProps } from './types';

export const HelperText = memo(function HelperText(rawProps: HelperTextProps) {
  const props = useComponentDefaults('HelperText', rawProps);
  const {
    type,
    visible = true,
    padding = 'normal',
    children,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

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
        sxStyle,
        style,
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
