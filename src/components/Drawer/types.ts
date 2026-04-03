import type { ReactNode } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: 'left' | 'right';
  variant?: 'temporary' | 'persistent' | 'permanent';
  children?: ReactNode;
  drawerWidth?: number;
  testID?: string;
}
