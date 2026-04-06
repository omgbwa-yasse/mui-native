import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

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
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
