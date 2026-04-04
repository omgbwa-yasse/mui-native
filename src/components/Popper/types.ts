import type React from 'react';
import type { View, StyleProp, ViewStyle } from 'react-native';

export type PopperPlacement =
  | 'top'          | 'top-start'    | 'top-end'
  | 'bottom'       | 'bottom-start' | 'bottom-end'
  | 'left'         | 'left-start'   | 'left-end'
  | 'right'        | 'right-start'  | 'right-end';

export interface PopperProps {
  /** Whether the popper is visible. */
  open: boolean;
  /** Ref to the anchor View element. */
  anchorRef: React.RefObject<View | null>;
  /** Position of the popper relative to the anchor. @default 'bottom' */
  placement?: PopperPlacement;
  /** Render inline in component tree instead of via Portal. @default false */
  disablePortal?: boolean;
  /**
   * Keep children mounted in the tree when `open={false}`.
   * @default false
   */
  keepMounted?: boolean;
  children?: React.ReactNode;
  /** StyleSheet-compatible style override. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
