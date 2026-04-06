import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

/** Duration presets or custom ms value. */
export type SnackbarDuration = 'short' | 'long' | number;

/** A single item in the snackbar queue. */
export interface SnackbarItem {
  id: string;
  message: string;
  duration?: SnackbarDuration;
  action?: {
    label: string;
    onPress: () => void;
  };
}

/** Slot overrides for Snackbar sub-components. */
export interface SnackbarSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Message: React.ComponentType<any>;
  Action: React.ComponentType<any>;
}

/**
 * Props for the Snackbar display component.
 */
export interface SnackbarProps extends SlotPropsConfig<SnackbarSlots> {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Props for SnackbarHost — place once near the root (inside PortalHost).
 */
export interface SnackbarHostProps {
  children: React.ReactNode;
}

/** Context value exposed to useSnackbar() consumers. */
export interface SnackbarContextValue {
  show: (item: Omit<SnackbarItem, 'id'>) => void;
  dismiss: (id?: string) => void;
}
