import React, { memo } from 'react';
import type { AccessibilityRole } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { ListItemProps } from './types';

const MIN_HEIGHT = 48;

const ListItem = memo(function ListItem({
  title,
  description,
  left,
  right,
  onPress,
  disabled = false,
  selected = false,
  testID,
}: ListItemProps) {
  const { theme } = useTheme();
  const textColor = disabled
    ? theme.colorScheme.onSurface
    : theme.colorScheme.onSurface;
  const iconColor = theme.colorScheme.onSurfaceVariant;

  const content = (
    <View
      style={[
        styles.content,
        selected && { backgroundColor: theme.colorScheme.primaryContainer },
        { minHeight: MIN_HEIGHT },
      ]}
    >
      {left && <View style={styles.left}>{left({ color: iconColor })}</View>}
      <View style={styles.textBox}>
        <Text variant="bodyLarge" color={textColor} numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text
            variant="bodyMedium"
            color={theme.colorScheme.onSurfaceVariant}
            numberOfLines={2}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {right && <View style={styles.right}>{right({ color: iconColor })}</View>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        accessibilityRole={'listitem' as AccessibilityRole}
        accessibilityState={{ disabled, selected }}
        testID={testID}
      >
        {content}
      </TouchableRipple>
    );
  }

  return (
    <View
      accessible
      accessibilityRole={'listitem' as AccessibilityRole}
      testID={testID}
    >
      {content}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  left: {
    marginEnd: 16,
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    marginStart: 16,
    justifyContent: 'center',
  },
});

export { ListItem };
