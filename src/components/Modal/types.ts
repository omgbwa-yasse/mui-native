import type React from 'react';

export interface ModalProps {
  /** Controls visibility. */
  visible: boolean;
  /** Called when the backdrop is pressed (only when dismissible). */
  onDismiss?: () => void;
  /** Whether pressing the backdrop dismisses the modal. Default: true. */
  dismissible?: boolean;
  children: React.ReactNode;
  testID?: string;
}
