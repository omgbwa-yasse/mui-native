import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface NumberFieldProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  testID?: string;
  accessibilityLabel?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
