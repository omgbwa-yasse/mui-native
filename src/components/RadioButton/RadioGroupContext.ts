import { createContext } from 'react';

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (event: unknown, value: string) => void;
  row?: boolean;
  disabled?: boolean;
}

/** Internal context — supersedes RadioButtonContext; do not export from index.ts */
export const RadioGroupContext = createContext<RadioGroupContextValue>({});
