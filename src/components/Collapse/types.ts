import type { TransitionBaseProps } from '../Fade/types';

export type { TransitionBaseProps } from '../Fade/types';

export type CollapseOrientation = 'horizontal' | 'vertical';

/** Collapse animates height (vertical) or width (horizontal) between `collapsedSize` and natural size. */
export interface CollapseProps extends TransitionBaseProps {
  /**
   * Collapse axis.
   * @default 'vertical'
   */
  orientation?: CollapseOrientation;
  /**
   * Size in dp when fully collapsed. Clamped to Math.max(0, collapsedSize).
   * @default 0
   */
  collapsedSize?: number;
}
