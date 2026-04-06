import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface HumanizationScoreBarProps {
  fleschKincaidBefore: number;
  fleschKincaidAfter: number;
  /** Max score for bar scaling (default 100). */
  maxScore?: number;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
