import type { ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface GridProps extends ViewProps {
  /** Number of columns in the grid. Default: 12 */
  columns?: number;
  /** Gap (row + column) — raw dp. Default: 0 */
  spacing?: number;
  /** Column gap override — raw dp */
  columnSpacing?: number;
  /** Row gap override — raw dp */
  rowSpacing?: number;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}

export interface GridItemProps extends ViewProps {
  /** Column span for all breakpoints (RN: always applies) */
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  /** Explicit width override (internal use from Grid parent) */
  _computedWidth?: number;
}
