import type { TextProps } from '../Text/types';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export interface LinkProps extends Omit<TextProps, 'variant'> {
  href?: string;
  onPress?: () => void;
  underline?: 'always' | 'hover' | 'none';
  color?: string;
  testID?: string;
  size?: SizeProp;
  sx?: SxProps;
}
