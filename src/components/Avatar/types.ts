import type { ImageSourcePropType } from 'react-native';
import type { IconSource } from '../Icon/types';

export interface AvatarProps {
  source?: ImageSourcePropType;
  label?: string;
  icon?: IconSource;
  size?: number;
  color?: string;
  labelColor?: string;
  testID?: string;
  accessibilityLabel?: string;
}
