import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface BottomSheetProps {
  /** Whether the sheet is open. */
  visible: boolean;
  /**
   * MUI-idiomatic alias for `visible`.
   * When both are provided, `open` takes precedence.
   */
  open?: boolean;
  /** Content rendered inside the sheet. */
  children: React.ReactNode;
  /** Called when sheet is dismissed (dragged down or backdrop tap). */
  onDismiss?: () => void;
  /** MUI-idiomatic alias for `onDismiss`. */
  onClose?: () => void;
  /** Snap points as relative heights (0–1). Defaults to [0.5]. */
  snapPoints?: number[];
  /** Show drag handle indicator. Defaults to true. */
  showHandle?: boolean;
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
