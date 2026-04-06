import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { DividerProps } from './types';

const Divider = memo(function Divider(rawProps: DividerProps) {
  const props = useComponentDefaults('Divider', rawProps);
  const {
    orientation = 'horizontal',
    variant = 'fullWidth',
    bold = false,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const thickness = bold ? 2 : 1;
  const color = theme.colorScheme.outlineVariant;

  if (orientation === 'vertical') {
    return (
      <View
        style={[styles.vertical, { width: thickness, backgroundColor: color }, sxStyle, style]}
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
        style={[styles.horizontal, { height: thickness, backgroundColor: color }, marginStyle, sxStyle, style]}
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
