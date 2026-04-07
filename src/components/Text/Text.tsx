import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { typographyVariantMap } from '../../tokens/typography';
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

  // Resolve MD2 variant names (e.g. 'body1', 'h4') to their MD3 equivalents
  const resolvedVariant = (typographyVariantMap as Record<string, string>)[variant as string] ?? variant;

  const resolvedStyle = useMemo(
    () => [
      theme.typography[resolvedVariant as keyof typeof theme.typography],
      { color: color ?? theme.colorScheme.onSurface },
      align != null ? { textAlign: align } : undefined,
      sxStyle,
      style,
    ],
    [theme, variant, resolvedVariant, color, align, style, sxStyle],
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
