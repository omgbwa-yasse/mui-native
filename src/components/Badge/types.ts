import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps, SlotPropsConfig } from '../../types/shared';

export interface BadgeAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Badge: React.ComponentType<ViewProps>;
}

export interface BadgeProps extends SlotPropsConfig<BadgeSlots> {
  content?: number | string;
  /** MUI-idiomatic alias for `content`. When both are provided, `badgeContent` takes precedence. */
  badgeContent?: number | string;
  max?: number;
  visible?: boolean;
  /** MUI-idiomatic alias — inverse of `visible`. `invisible=true` hides the badge. */
  invisible?: boolean;
  color?: string;
  labelColor?: string;
  children?: ReactNode;
  anchorOrigin?: BadgeAnchorOrigin;
  testID?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
