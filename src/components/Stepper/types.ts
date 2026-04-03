export type StepState = 'completed' | 'active' | 'upcoming' | 'error';

export interface StepItem {
  label: string;
  description?: string;
  state?: StepState;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  nonLinear?: boolean;
  onStepPress?: (index: number) => void;
  testID?: string;
}
