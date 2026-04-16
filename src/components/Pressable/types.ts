import type { PressableProps as RNPressableProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface PressableProps extends RNPressableProps {
  /** Extended style system (applied as a static style layer) */
  sx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}
