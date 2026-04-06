import type { StyleProp, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface IconButtonProps {
  icon: IconSource;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  variant?: 'standard' | 'filled' | 'filled-tonal' | 'outlined';
  /** Touch target size: numeric dp or semantic token ('small'→32, 'medium'→40, 'large'→48). */
  size?: SizeProp | number;
  accessibilityLabel: string;
  testID?: string;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
