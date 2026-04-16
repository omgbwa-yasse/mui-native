import type { ImageProps as RNImageProps, ImageSourcePropType } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ImageProps extends Omit<RNImageProps, 'source' | 'style' | 'src'> {
  /** URI string or `require()` asset — takes precedence over `source`. */
  src?: string | ImageSourcePropType;
  /** Native source prop (used when `src` is not provided). */
  source?: ImageSourcePropType;
  /** Accessible description — mapped to `accessibilityLabel`. */
  alt?: string;
  /** Width in logical pixels */
  width?: number;
  /** Height in logical pixels */
  height?: number;
  /** Style override */
  style?: RNImageProps['style'];
  /** Extended style system */
  sx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}
