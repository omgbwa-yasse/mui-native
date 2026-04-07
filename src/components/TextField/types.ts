import type React from 'react';
import type { StyleProp, ViewStyle, ViewProps, TextInputProps, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import type { SelectOption } from '../Select/types';

/**
 * MD3 TextField variants.
 * https://m3.material.io/components/text-fields
 */
export type TextFieldVariant = 'filled' | 'outlined' | 'standard';

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
  /** MUI-idiomatic alias for `supportingText`. When both are provided, `helperText` takes precedence. */
  helperText?: React.ReactNode;
  /** Error message or boolean error flag. A non-empty string auto-renders as helper text. */
  error?: boolean | string;
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
  /** Allow multiline input. */
  multiline?: boolean;
  /** Fixed number of rows (sets height). */
  rows?: number;
  /** Minimum rows for auto-grow. */
  minRows?: number;
  /** Maximum rows for auto-grow. */
  maxRows?: number;
  /** Stretch to full container width. */
  fullWidth?: boolean;
  /** Mark field as required; appends asterisk to label. */
  required?: boolean;
  /** Render a Select dropdown in place of TextInput. */
  select?: boolean;
  /** Options used when select=true. */
  options?: SelectOption[];
  /** Test id. */
  testID?: string;
  /** Accessibility label. */
  accessibilityLabel?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
