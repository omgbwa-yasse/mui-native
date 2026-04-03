import React, { useState, useMemo, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';
import { createTheme } from './createTheme';
import type { ThemeProviderProps, Theme, ColorMode, DeepPartial } from './types';

/**
 * ThemeProvider — wraps the component tree and provides MD3 theme context.
 *
 * @example
 * // Default light theme
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * // Start in dark mode with a custom seed color
 * <ThemeProvider mode="dark" theme={{ /* overrides *\/ }}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  mode: initialMode = 'light',
  theme: overrides,
  children,
}: ThemeProviderProps): React.ReactElement {
  const [mode, setModeState] = useState<ColorMode>(initialMode);

  const setMode = useCallback((newMode: ColorMode) => {
    setModeState(newMode);
  }, []);

  const theme = useMemo<Theme>(
    () =>
      createTheme({
        mode,
        overrides: overrides as DeepPartial<Theme> | undefined,
      }),
    [mode, overrides],
  );

  const value = useMemo(
    () => ({ theme, mode, setMode }),
    [theme, mode, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
