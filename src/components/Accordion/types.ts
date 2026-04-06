import type React from 'react';
import type { ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface AccordionProps extends ViewProps {
  /** Header label */
  title: string;
  /** Accordion body content */
  children: React.ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Called when header is pressed with new expanded value */
  onToggle?: (expanded: boolean) => void;
  /** Prevents any interaction. Default: false */
  disabled?: boolean;
  /** Leading element rendered before title */
  left?: React.ReactNode;
  /** Trailing element — receives current expanded state */
  right?: (expanded: boolean) => React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}
