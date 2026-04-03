import type { FlexStyle, ViewProps } from 'react-native';
import type { SpacingKey } from '../../tokens/spacing';
import type React from 'react';

export interface StackProps extends ViewProps {
  /** Flex direction. Default: 'column' */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Gap between items — SpacingKey or raw number in dp. Default: 0 */
  spacing?: SpacingKey | number;
  /** ReactElement cloned and rendered between each pair of children */
  divider?: React.ReactElement;
  /** Flex wrap. Default: 'nowrap' */
  flexWrap?: 'wrap' | 'nowrap';
  /** Align items */
  alignItems?: FlexStyle['alignItems'];
  /** Justify content */
  justifyContent?: FlexStyle['justifyContent'];
}
