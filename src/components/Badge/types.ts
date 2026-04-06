import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export interface BadgeAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeProps {
  content?: number | string;
  max?: number;
  visible?: boolean;
  color?: string;
  labelColor?: string;
  children?: ReactNode;
  anchorOrigin?: BadgeAnchorOrigin;
  testID?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
