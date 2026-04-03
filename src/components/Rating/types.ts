import type { IconSource } from '../Icon/types';

export interface RatingProps {
  value?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  precision?: 0.5 | 1;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: IconSource;
  emptyIcon?: IconSource;
  testID?: string;
}
