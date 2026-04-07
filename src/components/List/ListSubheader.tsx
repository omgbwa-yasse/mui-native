import React, { memo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Text } from '../Text/Text';
import type { ListSubheaderProps } from './types';

const ListSubheader = memo(function ListSubheader({
  children,
  color = 'default',
  disableGutters = false,
  inset = false,
  sx,
  style,
  ...rest
}: ListSubheaderProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const resolveColor = () => {
    if (color === 'primary') return theme.colorScheme.primary;
    if (color === 'inherit') return 'inherit' as const;
    return theme.colorScheme.onSurfaceVariant;
  };

  return (
    <View
      style={[
        {
          paddingHorizontal: disableGutters ? 0 : 16,
          paddingVertical: 8,
          marginLeft: inset ? 56 : 0,
          backgroundColor: theme.colorScheme.surface,
        },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      <Text
        variant="labelMedium"
        color={resolveColor() === 'inherit' ? theme.colorScheme.onSurface : resolveColor()}
      >
        {children}
      </Text>
    </View>
  );
});

export { ListSubheader };
