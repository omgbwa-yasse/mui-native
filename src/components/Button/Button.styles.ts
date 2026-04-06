import { StyleSheet } from 'react-native';
import type { Theme } from '../../theme/types';
import type { ButtonVariant } from './types';

/**
 * Returns a StyleSheet for the given variant and theme.
 * Called inside the Button component (recreated on theme change via useMemo).
 */
export function createButtonStyles(
  theme: Theme,
  variant: ButtonVariant,
  bgRole?: string,
  fgRole?: string,
) {
  const { colorScheme, shape, typography } = theme;
  const primary = bgRole ?? colorScheme.primary;
  const onPrimary = fgRole ?? colorScheme.onPrimary;

  const base = {
    minHeight: 40,
    minWidth: 48,
    borderRadius: shape.full,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const containerStyles: Record<ButtonVariant, object> = {
    filled: {
      ...base,
      backgroundColor: primary,
    },
    tonal: {
      ...base,
      backgroundColor: colorScheme.secondaryContainer,
    },
    outlined: {
      ...base,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colorScheme.outline,
    },
    text: {
      ...base,
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
    elevated: {
      ...base,
      backgroundColor: colorScheme.surface,
    },
  };

  const labelStyles: Record<ButtonVariant, object> = {
    filled: {
      ...typography.labelLarge,
      color: onPrimary,
    },
    tonal: {
      ...typography.labelLarge,
      color: colorScheme.onSecondaryContainer,
    },
    outlined: {
      ...typography.labelLarge,
      color: primary,
    },
    text: {
      ...typography.labelLarge,
      color: primary,
    },
    elevated: {
      ...typography.labelLarge,
      color: primary,
    },
  };

  const disabledContainer = {
    backgroundColor: `${colorScheme.onSurface}1F`, // 12% opacity
    borderColor: 'transparent',
    borderWidth: 0,
  };

  const disabledLabel = {
    color: `${colorScheme.onSurface}61`, // 38% opacity
  };

  return StyleSheet.create({
    container: containerStyles[variant],
    label: labelStyles[variant],
    disabledContainer,
    disabledLabel,
    iconWrapper: {
      marginEnd: 8,
    },
  });
}
