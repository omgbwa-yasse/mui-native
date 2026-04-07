import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  /**
   * MUI-idiomatic callback — called alongside `onValueChange` with a MUI-compatible signature.
   * // RN-DEVIATION: first arg is `null` (no DOM Event in React Native).
   */
  onChange?: (event: null, value: number) => void;
  onSlidingComplete?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  marks?: boolean | SliderMark[];
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
