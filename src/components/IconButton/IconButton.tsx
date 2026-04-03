import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../Icon/Icon';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { IconButtonProps } from './types';

const CONTAINER_SIZE = 40;

const IconButton = memo(function IconButton({
  icon,
  onPress,
  disabled = false,
  selected = false,
  variant = 'standard',
  size = 24,
  accessibilityLabel,
  testID,
}: IconButtonProps) {
  const { theme } = useTheme();
  const cs = theme.colorScheme;

  let bgColor: string | undefined;
  let iconColor: string;
  let borderColor: string | undefined;

  switch (variant) {
    case 'filled':
      bgColor = selected ? cs.primary : cs.surfaceVariant;
      iconColor = selected ? cs.onPrimary : cs.onSurfaceVariant;
      break;
    case 'filled-tonal':
      bgColor = selected ? cs.secondaryContainer : cs.surfaceVariant;
      iconColor = selected ? cs.onSecondaryContainer : cs.onSurfaceVariant;
      break;
    case 'outlined':
      bgColor = selected ? cs.inverseSurface : 'transparent';
      iconColor = selected ? cs.inverseOnSurface : cs.onSurfaceVariant;
      borderColor = cs.outline;
      break;
    default: // standard
      bgColor = 'transparent';
      iconColor = selected ? cs.primary : cs.onSurfaceVariant;
  }

  if (disabled) {
    iconColor = cs.onSurface;
  }

  const icSize = Math.max(CONTAINER_SIZE, size + 16);
  // No explicit width/height — TouchableRipple guarantees minWidth/minHeight: 48dp.
  // borderRadius uses at least 24 so the container is a perfect circle at the 48dp minimum.
  const containerStyle = [
    styles.container,
    {
      borderRadius: Math.max(24, icSize / 2),
      backgroundColor: bgColor,
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor ?? 'transparent',
    },
  ];

  return (
    <TouchableRipple
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected }}
      testID={testID}
    >
      <View style={styles.content} pointerEvents="none">
        <Icon source={icon} size={size} color={iconColor} />
      </View>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { IconButton };
