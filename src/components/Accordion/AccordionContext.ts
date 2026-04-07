import { createContext } from 'react';

export interface AccordionContextValue {
  isExpanded: boolean;
  toggle: () => void;
  disabled: boolean;
}

/** Internal context — do not export from index.ts */
export const AccordionContext = createContext<AccordionContextValue>({
  isExpanded: false,
  toggle: () => {},
  disabled: false,
});
