import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps, SlotPropsConfig } from '../../types/shared';

export interface SwitchSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
}

export interface SwitchProps extends SlotPropsConfig<SwitchSlots> {
  value: boolean;
  onValueChange: (value: boolean) => void;
  /** MUI-idiomatic alias for `value`. When both are provided, `checked` takes precedence. */
  checked?: boolean;
  /** MUI-idiomatic alias — called alongside `onValueChange` with a synthetic-event shape. */
  onChange?: (event: { target: { checked: boolean } }) => void;
  disabled?: boolean;
  color?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
