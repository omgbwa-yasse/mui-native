import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps {
  status: CheckboxStatus;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
