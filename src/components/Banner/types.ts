import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface BannerAction {
  label: string;
  onPress: () => void;
}

export interface BannerSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Content: React.ComponentType<ViewProps>;
}

export interface BannerProps extends SlotPropsConfig<BannerSlots> {
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
