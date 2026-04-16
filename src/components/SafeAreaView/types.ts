import type { ViewProps as RNViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface SafeAreaViewProps extends RNViewProps {
  /** Extended style system */
  sx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}
