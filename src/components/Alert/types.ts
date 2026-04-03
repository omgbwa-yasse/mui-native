import type React from 'react';

/** Alert severity level — maps to MD3 color roles. */
export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

/**
 * Props for the Alert component.
 */
export interface AlertProps {
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
}
