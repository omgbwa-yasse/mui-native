import { createContext, useContext } from 'react';
import type { LocalizationContextValue } from './types';
import { IntlDateAdapter } from './IntlDateAdapter';

const DEFAULT_FORMATS = {
  fullDate: 'MM/dd/yyyy',
  fullTime: 'hh:mm a',
  fullDateTime: 'MM/dd/yyyy hh:mm a',
};

export const LocalizationContext =
  createContext<LocalizationContextValue | null>(null);

/**
 * Returns the nearest LocalizationContext value.
 * Throws if called outside a LocalizationProvider.
 */
export function useLocalization(): LocalizationContextValue {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error(
      'useLocalization must be used within a <LocalizationProvider>',
    );
  }
  return ctx;
}

/**
 * Returns the nearest LocalizationContext value, or a sensible default
 * when called outside a LocalizationProvider (allows unsupervised usage).
 */
export function useLocalizationOptional(): LocalizationContextValue {
  const ctx = useContext(LocalizationContext);
  if (ctx) return ctx;
  return {
    locale: 'en',
    adapter: IntlDateAdapter,
    formats: DEFAULT_FORMATS,
  };
}
