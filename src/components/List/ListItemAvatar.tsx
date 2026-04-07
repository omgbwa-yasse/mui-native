import React, { memo } from 'react';
import { View } from 'react-native';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';
import type { ListItemAvatarProps } from './types';

const ListItemAvatar = memo(function ListItemAvatar({
  children,
  sx,
  style,
  ...rest
}: ListItemAvatarProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  return (
    <View
      style={[
        {
          minWidth: 56,
          alignItems: 'center',
          justifyContent: 'center',
        },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

export { ListItemAvatar };
