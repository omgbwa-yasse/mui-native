import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface BannerAction {
  label: string;
  onPress: () => void;
}

export interface BannerProps {
  visible: boolean;
  children: ReactNode;
  actions?: BannerAction[];
  icon?: IconSource;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
