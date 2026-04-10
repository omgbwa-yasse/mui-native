import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Icon } from '../Icon/Icon';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { IconButtonProps } from './types';

const CONTAINER_SIZE = 40;

const IconButton = memo(React.forwardRef<View, IconButtonProps>(function IconButton(rawProps, ref) {
  const props = useComponentDefaults('IconButton', rawProps);
  const {
    icon,
    onPress,
    disabled = false,
    selected = false,
    variant = 'standard',
    size = 24,
    sx,
    style,
    accessibilityLabel,
    testID,
  } = props;
  const { theme } = useTheme();
  const cs = theme.colorScheme;
  const sxStyle = useSx(sx, theme);

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

  const ICON_SEMANTIC_SIZES = { small: 16, medium: 20, large: 24 } as const;
  const numericSize: number = typeof size === 'number' ? size : ICON_SEMANTIC_SIZES[size];
  const icSize = Math.max(CONTAINER_SIZE, numericSize + 16);

  const containerStyle = [
    styles.container,
    {
      borderRadius: Math.max(24, icSize / 2),
      backgroundColor: bgColor,
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor ?? 'transparent',
    },
    sxStyle,
    style,
  ];

  return (
    <TouchableRipple
      ref={ref}
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected }}
      testID={testID}
    >
      <View style={styles.content} pointerEvents="none">
        <Icon source={icon} size={numericSize} color={iconColor} />
      </View>
    </TouchableRipple>
  );
}));

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
