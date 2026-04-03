import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { DividerProps } from './types';

const Divider = memo(function Divider({
  orientation = 'horizontal',
  variant = 'fullWidth',
  bold = false,
  testID,
}: DividerProps) {
  const { theme } = useTheme();
  const thickness = bold ? 2 : 1;
  const color = theme.colorScheme.outlineVariant;

  if (orientation === 'vertical') {
    return (
      <View
        style={[styles.vertical, { width: thickness, backgroundColor: color }]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        testID={testID}
      />
    );
  }

  const marginStyle =
    variant === 'inset'
      ? styles.inset
      : variant === 'middle'
      ? styles.middle
      : undefined;

  return (
    <View
      style={[styles.horizontal, { height: thickness, backgroundColor: color }, marginStyle]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      testID={testID}
    />
  );
});

const styles = StyleSheet.create({
  horizontal: {
    alignSelf: 'stretch',
  },
  vertical: {
    alignSelf: 'stretch',
  },
  inset: {
    marginStart: 56,
  },
  middle: {
    marginHorizontal: 16,
  },
});

export { Divider };
