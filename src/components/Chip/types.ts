import type React from 'react';
import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface ChipSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Label: React.ComponentType<any>;
  DeleteIcon: React.ComponentType<any>;
}

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps extends SlotPropsConfig<ChipSlots> {
  /** Chip label. */
  label: string;
  /** Chip variant. Defaults to 'assist'. */
  variant?: ChipVariant;
  /** Whether a filter chip is currently selected. */
  selected?: boolean;
  /** Leading icon. */
  icon?: React.ReactElement;
  /** Called when chip is pressed. */
  onPress?: () => void;
  /** Called when the remove icon is pressed (input chips). */
  onRemove?: () => void;
  /** Disable chip. */
  disabled?: boolean;
  /** Accessibility label. */
  accessibilityLabel?: string;
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
