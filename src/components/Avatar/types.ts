import type { ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { IconSource } from '../Icon/types';
import type { SizeProp } from '../../tokens/size';
import type { SxProps, SlotPropsConfig } from '../../types/shared';

export interface AvatarSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Label: React.ComponentType<any>;
}

export interface AvatarProps extends SlotPropsConfig<AvatarSlots> {
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
