import type { SectionListProps as RNSectionListProps, DefaultSectionT } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface SectionListProps<ItemT = unknown, SectionT = DefaultSectionT>
  extends RNSectionListProps<ItemT, SectionT> {
  /** Extended style system for the outer list container */
  sx?: SxProps;
  /** Extended style system for the inner content container */
  contentSx?: SxProps;
  size?: SizeProp;
  color?: ColorProp;
}

/** Non-generic alias used in ComponentPropsMap */
export type SectionListBaseProps = SectionListProps<unknown>;
