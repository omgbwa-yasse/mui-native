import type { TransitionBaseProps } from '../Fade/types';

export type { TransitionBaseProps } from '../Fade/types';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

/** Slide translates the child in/out from an edge based on `direction`. */
export interface SlideProps extends TransitionBaseProps {
  /**
   * Direction the child slides in from.
   * - 'up'    → child enters from bottom
   * - 'down'  → child enters from top
   * - 'left'  → child enters from right
   * - 'right' → child enters from left
   * @default 'down'
   */
  direction?: SlideDirection;
}
