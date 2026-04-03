import type React from 'react';

/** Render-prop function that returns an icon element given size and color. */
export type IconSource = (props: { size: number; color: string }) => React.ReactElement | null;

/**
 * Props for the Icon component.
 */
export interface IconProps {
  /** Icon render-prop — receives `{ size, color }` and returns a ReactElement. */
  source: IconSource;
  /** Icon size in dp. Defaults to 24. */
  size?: number;
  /** Icon color. Defaults to theme `colorScheme.onSurface`. */
  color?: string;
  /** Accessible label — sets `accessibilityRole="image"` when provided. */
  accessibilityLabel?: string;
  /** Test id for automated queries. */
  testID?: string;
}
