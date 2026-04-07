import React, { memo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { ListItemIconProps } from './types';

const ListItemIcon = memo(function ListItemIcon({
  children,
  sx,
  style,
  ...rest
}: ListItemIconProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View
      style={[
        {
          minWidth: 40,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
        },
        // Note: 'color' is not a valid React Native ViewStyle prop; icon tinting handled by child component
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

export { ListItemIcon };
