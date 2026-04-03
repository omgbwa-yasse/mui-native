import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';

/**
 * MD3 TextField variants.
 * https://m3.material.io/components/text-fields
 */
export type TextFieldVariant = 'filled' | 'outlined';

export interface TextFieldProps {
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
}
