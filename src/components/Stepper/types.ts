import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SlotPropsConfig, SxProps } from '../../types/shared';

export interface StepperSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  StepIndicator: React.ComponentType<ViewProps>;
  StepLabel: React.ComponentType<ViewProps>;
  Connector: React.ComponentType<ViewProps>;
}

export type StepState = 'completed' | 'active' | 'upcoming' | 'error';

export interface StepItem {
  label: string;
  description?: string;
  state?: StepState;
  optional?: boolean;
}

export interface StepperProps extends SlotPropsConfig<StepperSlots> {
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  onStepPress?: (index: number) => void;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
