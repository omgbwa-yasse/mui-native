import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export type CircularProgressVariant = 'determinate' | 'indeterminate';

export interface CircularProgressProps {
  /** Controls the animation style. Defaults to 'indeterminate'. */
  variant?: CircularProgressVariant;
  /**
   * Value between 0 and 100 (inclusive). Only used when `variant="determinate"`.
   * Values outside [0, 100] are clamped.
   */
  value?: number;
  /** Diameter: numeric dp or semantic token ('small'→32, 'medium'→40, 'large'→48). */
  size?: SizeProp | number;
  /** Color of the progress indicator. Defaults to theme primary color. */
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  sx?: SxProps;
}
