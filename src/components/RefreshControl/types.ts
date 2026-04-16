import type {
  RefreshControlProps as RNRefreshControlProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface RefreshControlProps extends Omit<RNRefreshControlProps, 'style'> {
  /** MUI-native sx styling */
  sx?: SxProps;
  /** Override wrapper style */
  style?: StyleProp<ViewStyle>;
}
