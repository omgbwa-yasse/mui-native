import { createContext } from 'react';

export interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
}

/** Internal context — do not export from index.ts */
export const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
  totalSteps: 0,
});
