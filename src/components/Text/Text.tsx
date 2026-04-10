import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { isColorProp, colorRoleMap } from '../../types/shared';
import { typographyVariantMap } from '../../tokens/typography';
import type { TextProps } from './types';

/**
 * Text — MD3 typography-aware text primitive.
 *
 * Resolves font style from the active theme's type scale and ensures correct
 *
 * @example
 * <Text variant="bodyLarge">Hello world</Text>
 */
export const Text = memo(function Text(rawProps: TextProps): React.ReactElement {
  const props = useComponentDefaults('Text', rawProps);
  const {
    variant,
    align,
    children,
    accessibilityRole = 'text',
    testID,
    style,
    sx,
    ...rest
  } = props;
  const { theme } = useTheme();
  const { color } = props;
  const sxStyle = useSx(sx, theme);

  // Resolve MD2 variant names (e.g. 'body1', 'h4') to their MD3 equivalents
  const resolvedVariant = (typographyVariantMap as Record<string, string>)[variant as string] ?? variant;

  const resolvedColor = useMemo(() => {
    if (color && isColorProp(color)) {
      return theme.colorScheme[colorRoleMap[color].bg];
    }
    return color ?? theme.colorScheme.onSurface;
  }, [color, theme.colorScheme]);

  const resolvedStyle = useMemo(
    () => [
      theme.typography[resolvedVariant as keyof typeof theme.typography],
      { color: resolvedColor },
      align != null ? { textAlign: align } : undefined,
      sxStyle,
      style,
    ],
    [theme, resolvedVariant, resolvedColor, align, sxStyle, style],
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
