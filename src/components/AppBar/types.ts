import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface AppBarSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Title: React.ComponentType<any>;
  NavigationIcon: React.ComponentType<ViewProps>;
  Actions: React.ComponentType<ViewProps>;
}

export type AppBarVariant = 'center' | 'small' | 'medium' | 'large';

export interface AppBarProps extends SlotPropsConfig<AppBarSlots> {
  /** Title text. */
  title: string;
  /** Visual variant. Defaults to 'center'. */
  variant?: AppBarVariant;
  /** Leading navigation icon (e.g. back arrow). */
  navigationIcon?: React.ReactElement;
  /** Trailing action icons. */
  actions?: React.ReactElement[];
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
