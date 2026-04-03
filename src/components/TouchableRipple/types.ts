import type React from 'react';
import type { AccessibilityRole, AccessibilityState, StyleProp, ViewStyle } from 'react-native';

/**
 * Props for TouchableRipple — the MD3 press primitive.
 */
export interface TouchableRippleProps {
  /** Called when the element is pressed. */
  onPress?: () => void;
  /** Called on long press. */
  onLongPress?: () => void;
  /** Ripple color. Defaults to `theme.colorScheme.onSurface` at 12 % opacity. */
  rippleColor?: string;
  /** Disables all interactions. */
  disabled?: boolean;
  /** Clip ripple to bounds (false = borderless overflow). */
  borderless?: boolean;
  children: React.ReactNode;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  style?: StyleProp<ViewStyle>;
}
