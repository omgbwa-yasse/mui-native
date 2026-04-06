import type React from 'react';
import type { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface MenuItemProps {
  label: string;
  leadingIcon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
}

export interface MenuProps {
  /** Whether the menu is visible. */
  visible: boolean;
  /**
   * Ref to the anchor view used to compute the menu's position.
   * The menu opens below (or above, if no space) the anchor.
   */
  anchor: React.RefObject<View>;
  onDismiss?: () => void;
  children: React.ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
