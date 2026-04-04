import type { StyleProp, ViewStyle } from 'react-native';

export type CircularProgressVariant = 'determinate' | 'indeterminate';

export interface CircularProgressProps {
  /** Controls the animation style. Defaults to 'indeterminate'. */
  variant?: CircularProgressVariant;
  /**
   * Value between 0 and 100 (inclusive). Only used when `variant="determinate"`.
   * Values outside [0, 100] are clamped.
   */
  value?: number;
  /** Diameter of the circle in dp. Defaults to 40. */
  size?: number;
  /** Color of the progress indicator. Defaults to theme primary color. */
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
