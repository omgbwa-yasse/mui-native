import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: 'left' | 'right';
  variant?: 'temporary' | 'persistent' | 'permanent';
  children?: ReactNode;
  drawerWidth?: number;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
