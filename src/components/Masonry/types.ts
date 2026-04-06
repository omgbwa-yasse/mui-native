import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface MasonryProps {
  /** Number of columns. Must be a positive integer. @default value of defaultColumns */
  columns?: number;
  /** Fallback column count used before layout measurement. @default 2 */
  defaultColumns?: number;
  /** Gap between children in dp. @default 2 */
  spacing?: number;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override. Applied to outer container. */
  style?: StyleProp<ViewStyle>;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}
