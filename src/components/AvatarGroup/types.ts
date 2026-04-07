import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface AvatarGroupSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface AvatarGroupProps extends SlotPropsConfig<AvatarGroupSlots> {
  /** Avatar elements to display. */
  children: React.ReactNode;
  /** Maximum number of Avatars before showing surplus. Defaults to 5. */
  max?: number;
  /** Override total count used for surplus calculation. */
  total?: number;
  /** Horizontal overlap spacing. 'medium' = -8, 'small' = -4. Defaults to 'medium'. */
  spacing?: 'medium' | 'small' | number;
  /** Avatar variant ('circular' | 'square' | 'rounded') — forwarded to surplus Avatar. */
  variant?: string;
  /** Custom renderer for the surplus count element. */
  renderSurplus?: (surplus: number) => React.ReactElement;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
