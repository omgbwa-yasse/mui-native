import type { AccessibilityRole } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

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

import type { ButtonSlots } from './Button';

/**
 * Props for the MD3 Button component.
 */
export interface ButtonProps extends SlotPropsConfig<ButtonSlots> {
  /**
   * Button content. When provided, it takes precedence over the `label` prop.
   * Following MUI Web standards, this is the preferred way to provide content.
   */
  children?: React.ReactNode;
  /** Button label text (Legacy/MD3-Native specific) */
  label?: string;
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
