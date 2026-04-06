import type { ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ContainerProps extends ViewProps {
  /** Max width breakpoint. false = full width. Default: 'lg' */
  maxWidth?: ContainerMaxWidth;
  /** Remove horizontal gutters. Default: false */
  disableGutters?: boolean;
  /** Fixed width (does not grow beyond maxWidth pixel value) */
  fixed?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}
