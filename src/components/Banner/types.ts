import type { ReactNode } from 'react';
import type { IconSource } from '../Icon/types';

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
}
