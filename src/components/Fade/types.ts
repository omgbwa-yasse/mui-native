import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface TransitionTimeout {
  enter: number;
  exit: number;
}
export type TransitionTimeoutProp = number | TransitionTimeout;

export interface TransitionBaseProps {
  /** Controls visibility. @default false */
  in?: boolean;
  /** Duration in ms for both enter and exit, or per-direction. @default 300 */
  timeout?: TransitionTimeoutProp;
  /** Defer mounting child until first `in=true`. @default false */
  mountOnEnter?: boolean;
  /** Unmount child after exit animation completes. @default false */
  unmountOnExit?: boolean;
  /** The single child element to animate. Required. */
  children: React.ReactElement;
  /** Style override applied to the animation wrapper. */
  style?: StyleProp<ViewStyle>;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  testID?: string;
}

/** Fade animates opacity 0 ↔ 1. */
export interface FadeProps extends TransitionBaseProps {}
