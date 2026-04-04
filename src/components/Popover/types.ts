import type React from 'react';
import type { StyleProp, ViewStyle, View } from 'react-native';

export type VerticalPosition = 'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface AnchorOrigin {
  vertical: VerticalPosition;
  horizontal: HorizontalPosition;
}

export interface PopoverProps {
  /** Whether the popover is visible. Required. */
  open: boolean;
  /** Ref to the anchor View element. A null ref suppresses render. */
  anchorRef: React.RefObject<View | null>;
  /** Called when the backdrop is pressed. */
  onClose?: () => void;
  /**
   * Which point on the anchor element the popover attaches to.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin?: AnchorOrigin;
  /**
   * Which point on the popover surface is placed at the anchorOrigin point.
   * @default { vertical: 'top', horizontal: 'left' }
   */
  transformOrigin?: AnchorOrigin;
  /** MD3 elevation level. @default 8 */
  elevation?: number;
  /** Render inline instead of via Portal. @default false */
  disablePortal?: boolean;
  children?: React.ReactNode;
  /** Style override applied to the popover surface. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
