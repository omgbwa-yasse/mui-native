import type { AccessibilityRole } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

/**
 * MD3 Button variants.
 * https://m3.material.io/components/buttons/overview
 */
export type ButtonVariant =
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'text'
  | 'elevated';

/**
 * Props for the MD3 Button component.
 */
export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Visual style variant. Defaults to 'filled'. */
  variant?: ButtonVariant;
  /** Disable the button — prevents interactions and shows disabled state. */
  disabled?: boolean;
  /** Leading icon element rendered before the label. */
  icon?: React.ReactElement;
  /** Called when the button is pressed. */
  onPress?: () => void;
  /** Accessibility label override. Defaults to `label` prop value. */
  accessibilityLabel?: string;
  /** Accessibility role. Defaults to 'button'. */
  accessibilityRole?: AccessibilityRole;
  /** Test id for automated queries. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
