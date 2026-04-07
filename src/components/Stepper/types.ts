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

// ─── Data-driven shape (existing) ────────────────────────────────────────────
export interface StepperDataDrivenProps extends SlotPropsConfig<StepperSlots> {
  /** steps array presence signals data-driven mode */
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

// ─── Composable shape (new) ───────────────────────────────────────────────────
export interface StepperComposableProps extends SlotPropsConfig<StepperSlots> {
  /** steps must be absent to trigger composable mode */
  steps?: never;
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  /** Labels displayed below step icons on the opposite side */
  alternativeLabel?: boolean;
  nonLinear?: boolean;
  /** Custom connector element between steps */
  connector?: React.ReactNode;
  children?: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Discriminated union */
export type StepperProps = StepperDataDrivenProps | StepperComposableProps;

// ─── Composable sub-component types (new) ────────────────────────────────────
export interface StepProps extends ViewProps {
  /** Zero-based index (injected by Stepper) */
  index?: number;
  /** Whether this step is currently active (injected by Stepper) */
  active?: boolean;
  /** Whether this step is completed */
  completed?: boolean;
  /** Visually disabled */
  disabled?: boolean;
  expanded?: boolean;
  last?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
}

export interface StepLabelProps extends ViewProps {
  /** Custom step icon */
  icon?: React.ReactNode;
  /** Supporting text below label */
  optional?: React.ReactNode;
  /** Disable auto error styling */
  error?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
}

export interface StepContentProps extends ViewProps {
  /** Custom transition component */
  TransitionComponent?: React.ComponentType<{ in?: boolean; children?: React.ReactNode }>;
  children?: React.ReactNode;
  sx?: SxProps;
}

export interface StepConnectorProps extends ViewProps {
  sx?: SxProps;
}

export type MobileStepperVariant = 'dots' | 'text' | 'progress';
export type MobileStepperPosition = 'bottom' | 'top' | 'static';

export interface MobileStepperProps extends ViewProps {
  variant?: MobileStepperVariant;
  /** Total number of steps */
  steps: number;
  activeStep: number;
  backButton: React.ReactNode;
  nextButton: React.ReactNode;
  /** Positioning within parent. Default: 'bottom' */
  position?: MobileStepperPosition;
  sx?: SxProps;
  testID?: string;
}
