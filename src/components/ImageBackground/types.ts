import type {
  ImageBackgroundProps as RNImageBackgroundProps,
  StyleProp,
  ImageStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface ImageBackgroundProps extends Omit<RNImageBackgroundProps, 'style' | 'width' | 'height'> {
  /** Shorthand URI string (alternative to source={{ uri }} ) */
  src?: string;
  /** Sets accessibilityLabel on the underlying view */
  alt?: string;
  /** MUI-native sx styling applied to the outer container view */
  sx?: SxProps;
  /** Override the outer container style */
  style?: StyleProp<ImageStyle>;
  /** Width shorthand — applied as a style */
  width?: number | string;
  /** Height shorthand — applied as a style */
  height?: number | string;
}
