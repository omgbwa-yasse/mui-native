import type { ImageSourcePropType, ViewProps } from 'react-native';

export type ImageListVariant = 'standard' | 'masonry' | 'quilted';

export interface ImageListItemProps {
  /** Span additional columns (quilted only) */
  cols?: number;
  /** Span additional rows (quilted only) */
  rows?: number;
  /** Image source */
  img: ImageSourcePropType;
  /** Optional title overlay at the bottom of the cell */
  title?: string;
  /** Optional action icon element shown in the title bar */
  actionIcon?: React.ReactNode;
}

export interface ImageListProps extends Omit<ViewProps, 'children'> {
  /** Child `ImageListItem` elements */
  children: React.ReactNode;
  /** Number of columns (default: 2) */
  cols?: number;
  /** Gap between items in dp (default: 4) */
  gap?: number;
  /** Layout variant (default: 'standard') */
  variant?: ImageListVariant;
  /** Row height in dp, or 'auto' (default: 120) */
  rowHeight?: number | 'auto';
}
