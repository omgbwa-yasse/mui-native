import type React from 'react';
import type { StyleProp, ViewStyle, ViewProps, TextInputProps, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

/**
 * MD3 TextField variants.
 * https://m3.material.io/components/text-fields
 */
export type TextFieldVariant = 'filled' | 'outlined';

export interface TextFieldSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Input: React.ComponentType<TextInputProps>;
  Label: React.ComponentType<any>;
  SupportingText: React.ComponentType<any>;
}

export interface TextFieldProps extends SlotPropsConfig<TextFieldSlots> {
  /** Input label text. */
  label: string;
  /** Controlled value. */
  value?: string;
  /** Called when text changes. */
  onChangeText?: (text: string) => void;
  /** Visual style variant. Defaults to 'filled'. */
  variant?: TextFieldVariant;
  /** Placeholder text shown when empty. */
  placeholder?: string;
  /** Supporting helper text shown below the field. */
  supportingText?: string;
  /** Error message — triggers error state when non-empty. */
  error?: string;
  /** Disable the field. */
  disabled?: boolean;
  /** Trailing icon element. */
  trailingIcon?: React.ReactElement;
  /** Leading icon element. */
  leadingIcon?: React.ReactElement;
  /** Secure text entry (password). */
  secureTextEntry?: boolean;
  /** Keyboard type. */
  keyboardType?: KeyboardTypeOptions;
  /** Return key type. */
  returnKeyType?: ReturnKeyTypeOptions;
  /** Called when editing ends. */
  onBlur?: () => void;
  /** Called when the field gains focus. */
  onFocus?: () => void;
  /** Test id. */
  testID?: string;
  /** Accessibility label. */
  accessibilityLabel?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
