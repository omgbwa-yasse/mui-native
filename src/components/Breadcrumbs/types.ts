import type React from 'react';
import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface BreadcrumbsSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
  Separator: React.ComponentType<ViewProps>;
}

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends SlotPropsConfig<BreadcrumbsSlots> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
