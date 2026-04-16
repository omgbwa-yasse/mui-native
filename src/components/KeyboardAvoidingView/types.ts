import type { KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface KeyboardAvoidingViewProps extends RNKeyboardAvoidingViewProps {
  /** Extended style system */
  sx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}
