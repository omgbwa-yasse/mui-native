import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ButtonGroupContextValue {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  disabled?: boolean;
  size?: SizeProp;
  orientation?: 'horizontal' | 'vertical';
  count: number;
}

export interface ButtonGroupProps {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  size?: SizeProp;
  children: React.ReactNode;
  testID?: string;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
