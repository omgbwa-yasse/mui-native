import React, { createContext, useContext, useState } from 'react';
import type { LayoutDirection, LayoutPreferenceContextValue } from '../catalogue/types';

const LayoutPreferenceContext = createContext<LayoutPreferenceContextValue | null>(null);

export function LayoutPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<LayoutDirection>('vertical');

  const toggle = () =>
    setDirection(prev => (prev === 'vertical' ? 'horizontal' : 'vertical'));

  return (
    <LayoutPreferenceContext.Provider value={{ direction, toggle }}>
      {children}
    </LayoutPreferenceContext.Provider>
  );
}

export function useLayoutPreference(): LayoutPreferenceContextValue {
  const ctx = useContext(LayoutPreferenceContext);
  if (!ctx) {
    throw new Error('useLayoutPreference must be used inside LayoutPreferenceProvider');
  }
  return ctx;
}

export { LayoutPreferenceContext };
