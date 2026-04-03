import React, { memo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { IconProps } from './types';

/**
 * Icon — render-prop icon wrapper.
 *
 * Resolves color from the active theme when not explicitly supplied, and
 * forwards the accessibility label so screen readers can announce the icon.
 *
 * @example
 * <Icon source={({ size, color }) => <MaterialIcon name="star" size={size} color={color} />} />
 */
export const Icon = memo(function Icon({
  source,
  size = 24,
  color,
  accessibilityLabel,
  testID,
}: IconProps): React.ReactElement {
  const { theme } = useTheme();
  const resolvedColor = color ?? theme.colorScheme.onSurface;

  return (
    <View
      accessibilityRole={accessibilityLabel != null ? 'image' : 'none'}
      accessible={accessibilityLabel != null}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {source({ size, color: resolvedColor })}
    </View>
  );
});
