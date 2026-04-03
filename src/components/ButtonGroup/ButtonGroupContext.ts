import { createContext } from 'react';
import type { ButtonGroupContextValue } from './types';

export const ButtonGroupContext =
  createContext<ButtonGroupContextValue | null>(null);
