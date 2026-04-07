import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'text' | 'filled';
}

/**
 * Reason code passed to `onClose` when the dialog is dismissed.
 * // RN-DEVIATION: 'escapeKeyDown' is not applicable in React Native.
 * 'backdropPressOutside' is renamed 'backdropPress' to match tap semantics.
 */
export type DialogOnCloseReason = 'backdropPress' | 'hardwareBackPress';

/** Slot overrides for Dialog sub-components. */
export interface DialogSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Title: React.ComponentType<any>;
  Content: React.ComponentType<ViewProps>;
  Actions: React.ComponentType<ViewProps>;
}

export type DialogMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
export type DialogScroll = 'body' | 'paper';

export interface DialogProps extends SlotPropsConfig<DialogSlots> {
  /** Whether the dialog is visible. */
  visible: boolean;
  /**
   * MUI-idiomatic alias for `visible`.
   * When both are provided, `open` takes precedence.
   */
  open?: boolean;
  /** If true, the dialog stretches to fill the screen. */
  fullScreen?: boolean;
  /** If true, the dialog stretches to the container's maximum width. */
  fullWidth?: boolean;
  /**
   * Sets the max-width for the dialog paper.
   * xs=444, sm=600, md=900, lg=1200, xl=1536; false = no constraint.
   */
  maxWidth?: DialogMaxWidth;
  /**
   * 'paper' — only the dialog content scrolls.
   * 'body' — the whole dialog scrolls.
   */
  scroll?: DialogScroll;
  /** Dialog title. */
  title: string;
  /** Dialog body text or custom content. */
  children?: React.ReactNode;
  /** Action buttons (max 2 recommended). */
  actions?: DialogAction[];
  /** Called when backdrop is pressed. */
  onDismiss?: () => void;
  /**
   * MUI-idiomatic alias for `onDismiss`.
   * Receives a `DialogOnCloseReason` describing why the dialog was closed.
   */
  onClose?: (reason: DialogOnCloseReason) => void;
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
