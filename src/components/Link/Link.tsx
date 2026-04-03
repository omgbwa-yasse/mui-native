import React, { memo, useCallback } from 'react';
import type { AccessibilityRole } from 'react-native';
import { Linking, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text/Text';
import type { LinkProps } from './types';

const Link = memo(function Link({
  href,
  onPress,
  underline = 'always',
  color,
  testID,
  style,
  children,
  ...textProps
}: LinkProps) {
  const { theme } = useTheme();
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
      style={{ minHeight: 48, justifyContent: 'center' }}
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
