import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ToggleButtonGroupContextValue {
  value: string | string[] | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export interface ToggleButtonGroupProps {
  value: string | string[] | null;
  onValueChange: (value: string | string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  testID?: string;
}

export interface ToggleButtonProps {
  value: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  testID?: string;
}
