import type {
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

/**
 * TextInputProps — raw React Native TextInput with sx support.
 *
 * This is the low-level primitive. For a fully styled MUI-style
 * form field (with label, helper text, outlined/filled variants),
 * use `TextField` instead.
 */
export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** MUI-native sx styling */
  sx?: SxProps;
  /** Override text input style */
  style?: StyleProp<TextStyle>;
}
