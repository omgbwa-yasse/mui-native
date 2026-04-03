import type { ReactNode } from 'react';

export interface SpeedDialActionItem {
  key: string;
  icon: ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface SpeedDialProps {
  actions: SpeedDialActionItem[];
  icon?: ReactNode;
  openIcon?: ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  testID?: string;
}
