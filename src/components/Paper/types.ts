import type { ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export type PaperElevation = 0 | 1 | 2 | 3 | 4 | 5;
export type PaperMode = 'flat' | 'elevated';

export interface PaperProps extends ViewProps {
  /** Shadow level. Default: 1 */
  elevation?: PaperElevation;
  /** Rendering mode. Default: 'elevated' */
  mode?: PaperMode;
  /** Removes border radius. Default: false */
  square?: boolean;
  /** Explicit border radius — overrides shape token */
  borderRadius?: number;
  style?: ViewStyle | ViewStyle[];
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}
