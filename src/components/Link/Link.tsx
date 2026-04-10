import React, { memo, useCallback } from 'react';
import type { AccessibilityRole } from 'react-native';
import { Linking, Pressable } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Text } from '../Text/Text';
import type { LinkProps } from './types';

const Link = memo(function Link(rawProps: LinkProps) {
  const props = useComponentDefaults('Link', rawProps);
  const {
    href,
    onPress,
    underline = 'always',
    testID,
    style,
    children,
    color,
    sx,
    ...textProps
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const linkColor = color ?? theme.colorScheme.primary;

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href);
    }
  }, [href, onPress]);

  const textDecorationLine =
    underline === 'always' ? 'underline' : ('none' as const);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole={'link' as AccessibilityRole}
      style={[{ minHeight: 48, justifyContent: 'center' }, sxStyle]}
      testID={testID}
    >
      <Text
        variant="bodyMedium"
        color={linkColor}
        style={[
          { textDecorationLine },
          ...(Array.isArray(style) ? style : style ? [style] : []),
        ]}
        {...textProps}
      >
        {children}
      </Text>
    </Pressable>
  );
});

export { Link };
