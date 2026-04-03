import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { AppBarProps } from './types';

export function AppBar({
  title,
  variant = 'center',
  navigationIcon,
  actions,
  testID,
}: AppBarProps): React.ReactElement {
  const { theme } = useTheme();
  const { colorScheme, typography, elevation: elev } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colorScheme.surface,
          paddingHorizontal: 4,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: variant === 'medium' ? 112 : variant === 'large' ? 152 : 64,
          shadowColor: colorScheme.shadow,
          shadowOffset: { width: 0, height: elev.level2.shadowOffsetY },
          shadowRadius: elev.level2.shadowRadius,
          shadowOpacity: elev.level2.shadowOpacity,
          elevation: elev.level2.elevation,
        },
        navIcon: { padding: 8 },
        titleContainer: {
          flex: 1,
          alignItems: variant === 'center' ? 'center' : 'flex-start',
          paddingHorizontal: 8,
        },
        title: {
          ...typography.titleLarge,
          color: colorScheme.onSurface,
        },
        actions: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
    [theme, variant],
  );

  return (
    <View style={styles.container} testID={testID} accessibilityRole="header">
      {navigationIcon != null && <View style={styles.navIcon}>{navigationIcon}</View>}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} accessibilityRole="text">
          {title}
        </Text>
      </View>
      {actions != null && actions.length > 0 && (
        <View style={styles.actions}>
          {actions.map((action, idx) => (
            <View key={idx} style={{ padding: 8 }}>
              {action}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
