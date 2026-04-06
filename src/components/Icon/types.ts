import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

/** Render-prop function that returns an icon element given size and color. */
export type IconSource = (props: { size: number; color: string }) => React.ReactElement | null;

/**
 * Props for the Icon component.
 */
export interface IconProps {
  /** Icon render-prop — receives `{ size, color }` and returns a ReactElement. */
  source: IconSource;
  /** Icon size: numeric dp or semantic token ('small'→16, 'medium'→20, 'large'→24). */
  size?: SizeProp | number;
  /** Icon color. Defaults to theme `colorScheme.onSurface`. */
  color?: string;
  /** Accessible label — sets `accessibilityRole="image"` when provided. */
  accessibilityLabel?: string;
  /** Test id for automated queries. */
  testID?: string;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
