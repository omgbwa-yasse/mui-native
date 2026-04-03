import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { MenuItemProps } from './types';

const MenuItem = memo(function MenuItem({
  label,
  leadingIcon,
  onPress,
  disabled = false,
  testID,
}: MenuItemProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 48,
      paddingHorizontal: 12,
    },
    icon: {
      marginEnd: 12,
      width: 24,
      alignItems: 'center',
    },
  });

  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      <View style={styles.container}>
        {leadingIcon != null && <View style={styles.icon}>{leadingIcon}</View>}
        <Text
          variant="bodyLarge"
          color={
            disabled
              ? theme.colorScheme.onSurface + '61' // 38% opacity
              : theme.colorScheme.onSurface
          }
        >
          {label}
        </Text>
      </View>
    </TouchableRipple>
  );
});

export { MenuItem };
