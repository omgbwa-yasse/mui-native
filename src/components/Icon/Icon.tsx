import React, { memo } from 'react';
import { View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
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
export const Icon = memo(function Icon(rawProps: IconProps): React.ReactElement {
  const props = useComponentDefaults('Icon', rawProps);
  const {
    source,
    size = 24,
    color,
    accessibilityLabel,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const resolvedColor = color ?? theme.colorScheme.onSurface;
  const ICON_SEMANTIC_SIZES = { small: 16, medium: 20, large: 24 } as const;
  const numericSize: number = typeof size === 'number' ? size : ICON_SEMANTIC_SIZES[size];

  return (
    <View
      accessibilityRole={accessibilityLabel != null ? 'image' : 'none'}
      accessible={accessibilityLabel != null}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[sxStyle, style]}
    >
      {source({ size: numericSize, color: resolvedColor })}
    </View>
  );
});
