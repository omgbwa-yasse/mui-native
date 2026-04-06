import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
}

export interface RadioButtonProps {
  value: string;
  disabled?: boolean;
  color?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
