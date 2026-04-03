import type { ReactNode } from 'react';

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
}
