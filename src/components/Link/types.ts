import type { TextProps } from '../Text/types';

export interface LinkProps extends Omit<TextProps, 'variant'> {
  href?: string;
  onPress?: () => void;
  underline?: 'always' | 'hover' | 'none';
  color?: string;
  testID?: string;
}
