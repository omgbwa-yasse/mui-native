import type {
  TouchableHighlightProps as RNTouchableHighlightProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface TouchableHighlightProps extends Omit<RNTouchableHighlightProps, 'style'> {
  /** MUI-native sx styling */
  sx?: SxProps;
  /** Override wrapper style */
  style?: StyleProp<ViewStyle>;
}
