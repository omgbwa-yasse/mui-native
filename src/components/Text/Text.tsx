import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { TextProps } from './types';

/**
 * Text — MD3 typography-aware text primitive.
 *
 * Resolves font style from the active theme's type scale and ensures correct
 * color, scaling, and accessibility attributes.
 *
 * @example
 * <Text variant="bodyLarge">Hello world</Text>
 */
export const Text = memo(function Text({
  variant,
  color,
  align,
  children,
  accessibilityRole = 'text',
  testID,
  style,
  ...rest
}: TextProps): React.ReactElement {
  const { theme } = useTheme();

  const resolvedStyle = useMemo(
    () => [
      theme.typography[variant],
      { color: color ?? theme.colorScheme.onSurface },
      align != null ? { textAlign: align } : undefined,
      style,
    ],
    [theme, variant, color, align, style],
  );

  return (
    <RNText
      {...rest}
      style={resolvedStyle}
      allowFontScaling={true}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {children}
    </RNText>
  );
});
