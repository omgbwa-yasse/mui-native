import { createContext } from 'react';
import type { ToggleButtonGroupContextValue } from './types';

export const ToggleButtonGroupContext =
  createContext<ToggleButtonGroupContextValue | null>(null);
