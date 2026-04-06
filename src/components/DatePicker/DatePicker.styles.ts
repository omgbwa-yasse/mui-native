import { StyleSheet } from 'react-native';
import type { Theme } from '../../theme/types';

/**
 * Returns a StyleSheet for the DatePicker component.
 * Called inside the component and memoized on theme changes.
 */
export function createDatePickerStyles(theme: Theme, primaryColor?: string) {
  const { colorScheme, shape, typography } = theme;
  const primary = primaryColor ?? colorScheme.primary;

  return StyleSheet.create({
    triggerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colorScheme.outline,
      borderRadius: shape.medium,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colorScheme.surface,
      minHeight: 56,
    },
    triggerContainerFocused: {
      borderColor: primary,
      borderWidth: 2,
    },
    triggerContainerError: {
      borderColor: colorScheme.error,
    },
    triggerContainerDisabled: {
      borderColor: `${colorScheme.onSurface}1F`,
      backgroundColor: `${colorScheme.onSurface}0A`,
    },
    labelFloating: {
      ...typography.bodySmall,
      color: colorScheme.onSurfaceVariant,
      marginBottom: 2,
    },
    labelFloatingFocused: {
      color: primary,
    },
    labelFloatingError: {
      color: colorScheme.error,
    },
    valueText: {
      ...typography.bodyLarge,
      color: colorScheme.onSurface,
      flex: 1,
    },
    placeholderText: {
      ...typography.bodyLarge,
      color: colorScheme.onSurfaceVariant,
      flex: 1,
    },
    disabledText: {
      color: `${colorScheme.onSurface}61`,
    },
    trailingIcon: {
      marginStart: 8,
      tintColor: colorScheme.onSurfaceVariant,
    },
    helperText: {
      ...typography.bodySmall,
      color: colorScheme.onSurfaceVariant,
      marginTop: 4,
      marginHorizontal: 16,
    },
    helperTextError: {
      color: colorScheme.error,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.32)',
      justifyContent: 'flex-end',
    },
  });
}
