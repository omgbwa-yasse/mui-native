import { createContext } from 'react';
import type { RadioGroupContextValue } from './types';

export const RadioButtonContext = createContext<RadioGroupContextValue | null>(null);
