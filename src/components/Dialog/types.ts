import type React from 'react';

export interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'text' | 'filled';
}

export interface DialogProps {
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
}
