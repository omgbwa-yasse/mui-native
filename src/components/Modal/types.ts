import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ModalProps {
  /** Controls visibility. */
  visible: boolean;
  /** Called when the backdrop is pressed (only when dismissible). */
  onDismiss?: () => void;
  /** Whether pressing the backdrop dismisses the modal. Default: true. */
  dismissible?: boolean;
  children: React.ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
