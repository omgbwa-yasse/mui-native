import type { ColorScheme, TypographyScale, ShapeScale, ElevationScale } from '../tokens';

/** Recursive deep-partial utility — allows partial theme overrides */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Color mode — 'light' or 'dark' */
export type ColorMode = 'light' | 'dark';

/**
 * Full MD3 Theme object consumed by all components via useTheme().
 *
 * Each field maps to a token category.
 */
export interface Theme {
  colorScheme: ColorScheme;
  typography: TypographyScale;
  shape: ShapeScale;
  elevation: ElevationScale;
  mode: ColorMode;
}

/**
 * Value exposed by ThemeContext — includes the theme and a mode setter.
 */
export interface ThemeContextValue {
  theme: Theme;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
}

/**
 * Props accepted by ThemeProvider.
 * All fields are optional: omitting them uses the default MD3 light theme.
 */
export interface ThemeProviderProps {
  /** Initial color mode. Defaults to 'light'. */
  mode?: ColorMode;
  /** Partial theme overrides merged on top of the default. */
  theme?: DeepPartial<Theme>;
  children: React.ReactNode;
}
