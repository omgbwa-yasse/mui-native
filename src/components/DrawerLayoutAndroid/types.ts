import type {
  DrawerLayoutAndroidProps as RNDrawerLayoutAndroidProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface DrawerLayoutAndroidProps extends Omit<RNDrawerLayoutAndroidProps, 'style'> {
  /** MUI-native sx styling */
  sx?: SxProps;
  /** Override wrapper style */
  style?: StyleProp<ViewStyle>;
}
