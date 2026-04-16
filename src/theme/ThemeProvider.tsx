import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Appearance } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { createTheme } from './createTheme';
import type { ThemeProviderProps, Theme, ColorMode, DeepPartial } from './types';

/**
 * ThemeProvider — wraps the component tree and provides MD3 theme context.
 *
 * When `mode` prop is omitted the provider auto-detects the OS color scheme
 * via `Appearance` and subscribes to changes. Pass an explicit `mode` to
 * override auto-detection (controlled mode).
 *
 * @example
 * // Auto-detect OS theme
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * // Force dark mode with a custom preset
 * <ThemeProvider mode="dark" theme={PureTheme}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  mode: modeProp,
  theme: overrides,
  children,
}: ThemeProviderProps): React.ReactElement {
  const isControlled = modeProp !== undefined;

  const [mode, setModeState] = useState<ColorMode>(
    () => modeProp ?? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'),
  );

  // Keep uncontrolled mode in sync with OS appearance changes.
  useEffect(() => {
    if (isControlled) return;
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setModeState(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => subscription.remove();
  }, [isControlled]);

  // When controlled mode prop changes, follow it.
  useEffect(() => {
    if (isControlled && modeProp !== undefined) {
      setModeState(modeProp);
    }
  }, [isControlled, modeProp]);

  const setMode = useCallback((newMode: ColorMode) => {
    setModeState(newMode);
  }, []);

  const theme = useMemo<Theme>(() => {
    const base = createTheme({
      mode,
      overrides: overrides as DeepPartial<Theme> | undefined,
    });
    // Merge dark overrides when in dark mode and the preset supplies them.
    if (mode === 'dark' && base.darkColorScheme) {
      return {
        ...base,
        mode, // Explicitly set mode in case it was overridden by overrides
        colorScheme: { ...base.colorScheme, ...base.darkColorScheme },
      };
    }
    // Ensure mode field matches the active mode state (in case it was overridden by overrides)
    return {
      ...base,
      mode,
    };
  }, [mode, overrides]);

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

