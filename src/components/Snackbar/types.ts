import type React from 'react';

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

/**
 * Props for the Snackbar display component.
 */
export interface SnackbarProps {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
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
