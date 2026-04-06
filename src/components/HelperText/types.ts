import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface HelperTextProps {
  type: 'normal' | 'error' | 'info';
  visible?: boolean;
  padding?: 'normal' | 'none';
  children: React.ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
