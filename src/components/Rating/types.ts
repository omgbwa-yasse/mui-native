import type { StyleProp, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface RatingProps {
  value?: number | null;
  onValueChange?: (value: number) => void;
  /**
   * MUI-idiomatic callback — called alongside `onValueChange` with a MUI-compatible signature.
   * // RN-DEVIATION: first arg is `null` (no DOM SyntheticEvent in React Native).
   */
  onChange?: (event: null, value: number | null) => void;
  max?: number;
  precision?: 0.5 | 1;
  disabled?: boolean;
  readOnly?: boolean;
  size?: SizeProp;
  icon?: IconSource;
  emptyIcon?: IconSource;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
