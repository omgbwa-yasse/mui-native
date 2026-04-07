/**
 * AvatarGroup Props Contract
 * Feature: 010-full-mui-alignment
 * FR-014 / FR-015
 *
 * Implementation approach (see research.md Decision 3):
 *   - flexDirection: 'row' parent container
 *   - Negative marginLeft on each child after the first for overlap
 *   - zIndex stacking: higher-indexed children appear in front
 *   - Surplus avatar renders when children.length > max
 */
import type { ReactNode } from 'react';

export interface AvatarGroupProps {
  /** Avatar children to display. */
  children: ReactNode;
  /** Maximum number of avatars to show before displaying the surplus element. Default: 5 */
  max?: number;
  /**
   * Override the computed surplus count.
   * Useful when not all avatars are rendered as children (e.g., lazy-loading).
   * surplus = total - (max - 1)
   */
  total?: number;
  /**
   * Overlap spacing between avatars.
   * 'medium' → marginLeft: -8 dp
   * 'small'  → marginLeft: -4 dp
   * number   → marginLeft: -number dp
   * Default: 'medium'
   */
  spacing?: 'medium' | 'small' | number;
  /** Shape applied to all child Avatars and the surplus Avatar. Default: 'circular' */
  variant?: 'circular' | 'rounded' | 'square';
  /**
   * Custom renderer for the surplus "+N" avatar shown when children exceed `max`.
   * Receives the surplus count as its only argument.
   * If not provided, a default Avatar with "+N" text is rendered.
   */
  renderSurplus?: (surplus: number) => ReactNode;
}
