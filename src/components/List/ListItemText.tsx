import React, { memo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Text } from '../Text/Text';
import type { ListItemTextProps } from './types';

const ListItemText = memo(function ListItemText({
  primary,
  secondary,
  primaryTypographyProps,
  secondaryTypographyProps,
  disableTypography = false,
  inset = false,
  sx,
  style,
  ...rest
}: ListItemTextProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const renderPrimary = () => {
    if (primary == null) return null;
    if (disableTypography) return <>{primary}</>;
    return (
      <Text
        variant="bodyLarge"
        color={theme.colorScheme.onSurface}
        numberOfLines={1}
        {...primaryTypographyProps}
      >
        {primary}
      </Text>
    );
  };

  const renderSecondary = () => {
    if (secondary == null) return null;
    if (disableTypography) return <>{secondary}</>;
    return (
      <Text
        variant="bodyMedium"
        color={theme.colorScheme.onSurfaceVariant}
        numberOfLines={2}
        {...secondaryTypographyProps}
      >
        {secondary}
      </Text>
    );
  };

  return (
    <View
      style={[
        {
          flex: 1,
          marginLeft: inset ? 56 : 0,
        },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {renderPrimary()}
      {renderSecondary()}
    </View>
  );
});

export { ListItemText };
