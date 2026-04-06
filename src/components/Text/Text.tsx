import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
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
export const Text = memo(function Text(rawProps: TextProps): React.ReactElement {
  const props = useComponentDefaults('Text', rawProps);
  const {
    variant,
    color,
    align,
    children,
    accessibilityRole = 'text',
    testID,
    style,
    sx,
    ...rest
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const resolvedStyle = useMemo(
    () => [
      theme.typography[variant],
      { color: color ?? theme.colorScheme.onSurface },
      align != null ? { textAlign: align } : undefined,
      sxStyle,
      style,
    ],
    [theme, variant, color, align, style, sxStyle],
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
