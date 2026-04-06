import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export type LinearProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface LinearProgressProps {
  /** Controls the animation style. Defaults to 'indeterminate'. */
  variant?: LinearProgressVariant;
  /**
   * Value between 0 and 100 (inclusive). Progress fill amount (primary bar).
   * Values outside [0, 100] are clamped.
   */
  value?: number;
  /**
   * Buffer value between 0 and 100 (secondary bar shown behind primary).
   * Only relevant when `variant="buffer"`.
   * Values outside [0, 100] are clamped.
   */
  valueBuffer?: number;
  /** Color of the primary indicator. Defaults to theme primary color. */
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: SizeProp;
  sx?: SxProps;
}
