import type React from 'react';

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
  testID?: string;
}
