import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface NavigationBarSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Item: React.ComponentType<ViewProps>;
  Indicator: React.ComponentType<ViewProps>;
}

export interface NavigationBarItem {
  /** Icon element to display above label. */
  icon: React.ReactElement;
  /** Navigation item label. */
  label: string;
  /** Called when this item is tapped. */
  onPress: () => void;
  /** Accessibility label override. Defaults to label value. */
  accessibilityLabel?: string;
}

export interface NavigationBarProps extends SlotPropsConfig<NavigationBarSlots> {
  /** Index of the currently active destination. */
  activeIndex: number;
  /** Navigation destinations (max 5 per MD3 spec). */
  items: NavigationBarItem[];
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
