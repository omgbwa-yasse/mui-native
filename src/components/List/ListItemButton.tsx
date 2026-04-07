import React, { memo } from 'react';
import type { AccessibilityRole } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { ListItemButtonProps } from './types';

const ListItemButton = memo(function ListItemButton({
  onPress,
  onLongPress,
  disabled = false,
  selected = false,
  dense = false,
  alignItems = 'center',
  disableRipple = false,
  children,
  sx,
  style,
  testID,
  ...rest
}: ListItemButtonProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <TouchableRipple
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      rippleColor={disableRipple ? 'transparent' : undefined}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityState={{ disabled, selected }}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems,
          paddingHorizontal: dense ? 8 : 16,
          paddingVertical: dense ? 4 : 8,
          minHeight: dense ? 36 : 48,
          backgroundColor: selected
            ? theme.colorScheme.primaryContainer
            : undefined,
        },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      <>{children}</>
    </TouchableRipple>
  );
});

export { ListItemButton };
