import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

/** Alert severity level — maps to MD3 color roles. */
export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

/** Slot overrides for Alert sub-components. */
export interface AlertSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  CloseButton: React.ComponentType<any>;
}

/**
 * Props for the Alert component.
 */
export interface AlertProps extends SlotPropsConfig<AlertSlots> {
  /** Severity level — controls colors and default icon. */
  severity: AlertSeverity;
  /** Optional bold title. */
  title?: string;
  /** Optional action element (e.g. a Button). */
  action?: React.ReactNode;
  /** Called when the close icon is pressed. Shows close icon when provided. */
  onClose?: () => void;
  children?: React.ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
