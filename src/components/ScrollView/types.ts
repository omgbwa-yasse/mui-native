import type { ScrollViewProps as RNScrollViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface ScrollViewProps extends RNScrollViewProps {
  /** Extended style system applied to the outer scroll container */
  sx?: SxProps;
  /** Extended style system applied to the inner content container */
  contentSx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}
