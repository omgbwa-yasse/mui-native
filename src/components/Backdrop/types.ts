import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

/**
 * Props for the Backdrop component.
 */
export interface BackdropProps {
  /** Controls backdrop visibility. */
  visible: boolean;
  /** Called when the scrim is pressed. */
  onDismiss?: () => void;
  /** Scrim opacity (0–1). Defaults to 0.5. */
  opacity?: number;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
