import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps, SlotPropsConfig } from '../../types/shared';

export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
}

export interface CheckboxProps extends SlotPropsConfig<CheckboxSlots> {
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
