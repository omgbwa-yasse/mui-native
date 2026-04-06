import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  title: string;
  children: ReactElement;
  placement?: TooltipPlacement;
  enterDelay?: number;
  leaveDelay?: number;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
