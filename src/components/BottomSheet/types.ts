import type React from 'react';

export interface BottomSheetProps {
  /** Whether the sheet is open. */
  visible: boolean;
  /** Content rendered inside the sheet. */
  children: React.ReactNode;
  /** Called when sheet is dismissed (dragged down or backdrop tap). */
  onDismiss?: () => void;
  /** Snap points as relative heights (0–1). Defaults to [0.5]. */
  snapPoints?: number[];
  /** Show drag handle indicator. Defaults to true. */
  showHandle?: boolean;
  /** Test id. */
  testID?: string;
}
