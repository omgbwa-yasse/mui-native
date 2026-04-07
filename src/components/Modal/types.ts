import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ModalProps {
  /** Controls visibility. */
  visible: boolean;
  /**
   * MUI-idiomatic alias for `visible`.
   * When both are provided, `open` takes precedence.
   */
  open?: boolean;
  /** Called when the backdrop is pressed (only when dismissible). */
  onDismiss?: () => void;
  /** MUI-idiomatic alias for `onDismiss`. */
  onClose?: () => void;
  /** Whether pressing the backdrop dismisses the modal. Default: true. */
  dismissible?: boolean;
  children: React.ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
