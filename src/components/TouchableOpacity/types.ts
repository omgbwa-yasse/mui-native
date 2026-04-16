import type {
  TouchableOpacityProps as RNTouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface TouchableOpacityProps extends Omit<RNTouchableOpacityProps, 'style'> {
  /** MUI-native sx styling */
  sx?: SxProps;
  /** Override wrapper style */
  style?: StyleProp<ViewStyle>;
}
