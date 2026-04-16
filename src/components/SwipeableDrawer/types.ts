import type { DrawerProps } from '../Drawer/types';

export interface SwipeableDrawerProps extends DrawerProps {
  /**
   * Called when the component requests to be opened.
   * Required because swiping from the edge can open the drawer.
   */
  onOpen?: () => void;
  /**
   * Width of the invisible edge zone from which a swipe-to-open gesture
   * can be initiated (in pixels).
   * @default 20
   */
  swipeAreaWidth?: number;
  /**
   * Fraction of the drawer's width that the user must swipe past before
   * the drawer snaps open/closed on release.
   * @default 0.52
   */
  hysteresis?: number;
  /**
   * Minimum fling velocity (px/s) required to trigger open/close even if the
   * hysteresis threshold has not been passed.
   * @default 450
   */
  minFlingVelocity?: number;
  /**
   * Disable the edge swipe-to-open gesture.  The component still responds
   * to swipe-to-close when open.
   * @default false
   */
  disableSwipeToOpen?: boolean;
}
