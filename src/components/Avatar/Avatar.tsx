import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../Icon/Icon';
import type { AvatarProps } from './types';

const DEFAULT_AVATAR_SIZE = 40;

const Avatar = memo(function Avatar({
  source,
  label,
  icon,
  size = DEFAULT_AVATAR_SIZE,
  color,
  labelColor,
  testID,
  accessibilityLabel,
}: AvatarProps) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const bgColor = color ?? theme.colorScheme.primaryContainer;
  const fgColor = labelColor ?? theme.colorScheme.onPrimaryContainer;
  const initials = label ? label.trim().slice(0, 2).toUpperCase() : null;
  const fontSize = Math.round(size * 0.4);
  const iconSize = Math.round(size * 0.6);

  const containerStyle = [
    styles.container,
    { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor },
  ];

  const showImage = source && !imageError;

  return (
    <View
      style={containerStyle}
      accessibilityRole="image"
      accessible
      accessibilityLabel={accessibilityLabel ?? label ?? 'avatar'}
      testID={testID}
    >
      {showImage ? (
        <Image
          source={source}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          onError={() => setImageError(true)}
          accessibilityIgnoresInvertColors
        />
      ) : initials ? (
        <Text style={[styles.initials, { fontSize, color: fgColor }]}>{initials}</Text>
      ) : icon ? (
        <Icon source={icon} size={iconSize} color={fgColor} />
      ) : (
        // Generic account icon placeholder
        <View style={[styles.iconPlaceholder, { width: iconSize, height: iconSize, borderRadius: iconSize / 2, backgroundColor: fgColor }]} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
  },
  iconPlaceholder: {
    opacity: 0.6,
  },
});

export { Avatar };
