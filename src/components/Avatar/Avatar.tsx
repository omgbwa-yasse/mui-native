import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Icon } from '../Icon/Icon';
import type { AvatarProps } from './types';

const DEFAULT_AVATAR_SIZE = 40;

const Avatar = memo(function Avatar(rawProps: AvatarProps) {
  const props = useComponentDefaults('Avatar', rawProps);
  const {
    source,
    label,
    icon,
    size = DEFAULT_AVATAR_SIZE,
    color,
    labelColor,
    testID,
    accessibilityLabel,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const [imageError, setImageError] = useState(false);

  const bgColor = color ?? theme.colorScheme.primaryContainer;
  const fgColor = labelColor ?? theme.colorScheme.onPrimaryContainer;
  const initials = label ? label.trim().slice(0, 2).toUpperCase() : null;
  const AVATAR_SEMANTIC_SIZES = { small: 24, medium: 40, large: 56 } as const;
  const numericSize: number = typeof size === 'number' ? size : AVATAR_SEMANTIC_SIZES[size];
  const fontSize = Math.round(numericSize * 0.4);
  const iconSize = Math.round(numericSize * 0.6);

  const containerStyle = [
    styles.container,
    { width: numericSize, height: numericSize, borderRadius: numericSize / 2, backgroundColor: bgColor },
  ];

  const showImage = source && !imageError;

  const Root = slots?.Root ?? View;
  const Label = slots?.Label ?? Text;

  return (
    <Root
      {...slotProps?.Root}
      style={[containerStyle, sxStyle, style, slotProps?.Root?.style]}
      accessibilityRole="image"
      accessible
      accessibilityLabel={accessibilityLabel ?? label ?? 'avatar'}
      testID={testID}
    >
      {showImage ? (
        <Image
          source={source}
          style={[styles.image, { width: numericSize, height: numericSize, borderRadius: numericSize / 2 }]}
          onError={() => setImageError(true)}
          accessibilityIgnoresInvertColors
        />
      ) : initials ? (
        <Label {...slotProps?.Label} style={[styles.initials, { fontSize, color: fgColor }, slotProps?.Label?.style]}>{initials}</Label>
      ) : icon ? (
        <Icon source={icon} size={iconSize} color={fgColor} />
      ) : (
        // Generic account icon placeholder
        <View style={[styles.iconPlaceholder, { width: iconSize, height: iconSize, borderRadius: Math.round(iconSize / 2), backgroundColor: fgColor }]} />
      )}
    </Root>
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
