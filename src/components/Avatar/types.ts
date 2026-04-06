import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export interface AvatarProps {
  source?: ImageSourcePropType;
  label?: string;
  icon?: IconSource;
  /** Numeric diameter in dp, or semantic token 'small' (24) / 'medium' (40) / 'large' (56). */
  size?: SizeProp | number;
  color?: string;
  labelColor?: string;
  testID?: string;
  accessibilityLabel?: string;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
