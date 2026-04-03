import type { ViewProps } from 'react-native';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ContainerProps extends ViewProps {
  /** Max width breakpoint. false = full width. Default: 'lg' */
  maxWidth?: ContainerMaxWidth;
  /** Remove horizontal gutters. Default: false */
  disableGutters?: boolean;
  /** Fixed width (does not grow beyond maxWidth pixel value) */
  fixed?: boolean;
}
