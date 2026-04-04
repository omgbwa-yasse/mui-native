import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { TimelineDotProps, TimelineDotColor } from './types';

function resolveDotColor(
  color: TimelineDotColor,
  colorScheme: ReturnType<typeof useTheme>['theme']['colorScheme']
): string {
  switch (color) {
    case 'primary':   return colorScheme.primary;
    case 'secondary': return colorScheme.secondary;
    case 'error':     return colorScheme.error;
    case 'info':      return colorScheme.tertiary;
    case 'success':   return colorScheme.secondaryContainer;
    case 'warning':   return colorScheme.errorContainer;
    case 'grey':      return colorScheme.onSurfaceVariant;
    case 'inherit':   return 'inherit';
    default:          return colorScheme.onSurfaceVariant;
  }
}

export function TimelineDot({
  variant = 'filled',
  color = 'grey',
  children,
  style,
}: TimelineDotProps) {
  const { theme } = useTheme();
  const resolvedColor = resolveDotColor(color, theme.colorScheme);

  const dotStyle =
    variant === 'filled'
      ? { backgroundColor: resolvedColor }
      : { backgroundColor: 'transparent' as const, borderWidth: 2, borderColor: resolvedColor };

  return (
    <View
      style={[styles.root, dotStyle, style]}
      accessible={false}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
