import type { ViewProps as RNViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp } from '../../types/shared';

export interface ViewProps extends RNViewProps {
  /** Extended style system — merged with highest specificity */
  sx?: ViewStyle;
  /** Size variant */
  size?: SizeProp;
  /** Color variant */
  color?: ColorProp;
}
