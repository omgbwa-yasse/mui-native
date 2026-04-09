import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Text } from '../Text/Text';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { AlertProps, AlertSeverity } from './types';

function getSeverityColors(
  severity: AlertSeverity,
  colorScheme: { error: string; tertiary: string; primary: string; errorContainer: string; tertiaryContainer: string; primaryContainer: string; secondaryContainer: string; secondary: string },
): { iconColor: string; bgColor: string } {
  switch (severity) {
    case 'error':
      return { iconColor: colorScheme.error, bgColor: colorScheme.errorContainer };
    case 'warning':
      return { iconColor: colorScheme.tertiary, bgColor: colorScheme.tertiaryContainer };
    case 'success':
      return { iconColor: colorScheme.primary, bgColor: colorScheme.primaryContainer };
    case 'info':
    default:
      return { iconColor: colorScheme.secondary, bgColor: colorScheme.secondaryContainer };
  }
}

/**
 * Alert — MD3 severity-coded message box.
 *
 * Maps severity to MD3 color roles; renders an optional title, body content,
 * and optional close/action controls.
 */
export const Alert = memo(function Alert(rawProps: AlertProps): React.ReactElement {
  const props = useComponentDefaults('Alert', rawProps);
  const {
    severity,
    title,
    action,
    onClose,
    children,
    sx,
    style,
    testID,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { iconColor, bgColor } = getSeverityColors(severity, theme.colorScheme as never);

  const SlotRoot = slots?.Root ?? View;
  const SlotCloseButton = slots?.CloseButton ?? TouchableRipple;

  return (
    <SlotRoot
      {...slotProps?.Root}
      style={[styles.container, { backgroundColor: bgColor, borderLeftColor: iconColor }, sxStyle, style, slotProps?.Root?.style]}
      accessibilityRole="alert"
      accessible
      testID={testID}
    >
      <View style={styles.content}>
        <View style={styles.body}>
          {title != null && (
            <Text variant="titleSmall" color={iconColor} style={styles.title}>
              {title}
            </Text>
          )}
          {children != null && (
            <Text variant="bodyMedium">{children}</Text>
          )}
        </View>
        <View style={styles.actions}>
          {action}
          {onClose != null && (
            <SlotCloseButton
              {...slotProps?.CloseButton}
              onPress={onClose}
              borderless
              accessibilityRole="button"
              accessibilityLabel="Close alert"
            >
              <View style={styles.closeIcon}>
                <Text variant="labelLarge" color={iconColor}>✕</Text>
              </View>
            </SlotCloseButton>
          )}
        </View>
      </View>
    </SlotRoot>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginStart: 8,
  },
  closeIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
