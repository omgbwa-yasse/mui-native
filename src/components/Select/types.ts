import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Trigger: React.ComponentType<ViewProps>;
  Dropdown: React.ComponentType<ViewProps>;
  Option: React.ComponentType<ViewProps>;
}

export interface SelectProps extends SlotPropsConfig<SelectSlots> {
  value: string | string[] | null;
  onValueChange: (value: string | string[]) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
