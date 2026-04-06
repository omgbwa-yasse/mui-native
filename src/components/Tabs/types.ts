import type React from 'react';
import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface TabsSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  TabBar: React.ComponentType<ViewProps>;
  Tab: React.ComponentType<ViewProps>;
  Indicator: React.ComponentType<ViewProps>;
}

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps extends SlotPropsConfig<TabsSlots> {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'primary' | 'secondary';
  scrollable?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  children?: (activeValue: string) => ReactNode;
  testID?: string;
}

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}
