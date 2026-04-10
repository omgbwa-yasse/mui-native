import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { AppBarProps } from './types';

export function AppBar(rawProps: AppBarProps): React.ReactElement {
  const props = useComponentDefaults('AppBar', rawProps);
  const {
    title,
    variant = 'center',
    navigationIcon,
    actions,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;

  const RootSlot = slots?.Root ?? View;
  const TitleSlot = slots?.Title ?? Text;
  const NavigationIconSlot = slots?.NavigationIcon ?? View;
  const ActionsSlot = slots?.Actions ?? View;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
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
    <RootSlot {...slotProps?.Root} style={[styles.container, sxStyle, style, slotProps?.Root?.style]} testID={testID} accessibilityRole="header">
      {navigationIcon != null && <NavigationIconSlot {...slotProps?.NavigationIcon} style={[styles.navIcon, slotProps?.NavigationIcon?.style]}>{navigationIcon}</NavigationIconSlot>}
      <View style={styles.titleContainer}>
        <TitleSlot {...slotProps?.Title} style={[styles.title, slotProps?.Title?.style]} numberOfLines={1} accessibilityRole="text">
          {title}
        </TitleSlot>
      </View>
      {actions != null && actions.length > 0 && (
        <ActionsSlot {...slotProps?.Actions} style={[styles.actions, slotProps?.Actions?.style]}>
          {actions.map((action, idx) => (
            <View key={idx} style={{ padding: 8 }}>
              {action}
            </View>
          ))}
        </ActionsSlot>
      )}
    </RootSlot>
  );
}
