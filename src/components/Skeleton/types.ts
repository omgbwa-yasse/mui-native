import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

/**
 * Props for the Skeleton loading placeholder component.
 */
export interface SkeletonProps {
  /** Width in dp or percentage string. */
  width: number | string;
  /** Height in dp. */
  height: number;
  /** Shape variant. Defaults to 'rectangular'. */
  variant?: 'rectangular' | 'circular' | 'text';
  /** Animation type. `false` disables animation. Defaults to 'wave'. */
  animation?: 'wave' | 'pulse' | false;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
