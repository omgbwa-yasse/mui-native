import { createContext, useContext } from 'react';
import type { ThemeContextValue } from './types';

/**
 * ThemeContext — null when accessed outside a ThemeProvider.
 * useTheme() enforces non-null at runtime with a clear error message.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Hook to consume the current MD3 theme.
 *
 * @throws Error if called outside a {@link ThemeProvider}.
 *
 * @example
 * const { theme, mode, setMode } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error(
      '[mui-native] useTheme() must be called inside a <ThemeProvider>. ' +
        'Wrap your component tree with <ThemeProvider>.</ThemeProvider>.',
    );
  }
  return ctx;
}
