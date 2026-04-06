import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'text' | 'filled';
}

/** Slot overrides for Dialog sub-components. */
export interface DialogSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Title: React.ComponentType<any>;
  Content: React.ComponentType<ViewProps>;
  Actions: React.ComponentType<ViewProps>;
}

export interface DialogProps extends SlotPropsConfig<DialogSlots> {
  /** Whether the dialog is visible. */
  visible: boolean;
  /** Dialog title. */
  title: string;
  /** Dialog body text or custom content. */
  children?: React.ReactNode;
  /** Action buttons (max 2 recommended). */
  actions?: DialogAction[];
  /** Called when backdrop is pressed. */
  onDismiss?: () => void;
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
