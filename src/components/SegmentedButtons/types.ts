import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export type SegmentDensity = 'regular' | 'dense';

export interface SegmentButtonItem {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedButtonsProps {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  buttons: SegmentButtonItem[];
  multiSelect?: boolean;
  density?: SegmentDensity;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
