import type { ColorScheme, TypographyScale, ShapeScale, ElevationScale } from '../tokens';
import type { ComponentsConfig } from './componentsDefs';

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
  /**
   * Dark-mode color overrides. Partial: only changed roles need to be specified.
   * When present and `mode === 'dark'`, ThemeProvider merges these over `colorScheme`.
   * When absent, `colorScheme` is used for both light and dark mode.
   * @since 012-platform-themes
   */
  darkColorScheme?: Partial<ColorScheme>;
  typography: TypographyScale;
  shape: ShapeScale;
  elevation: ElevationScale;
  mode: ColorMode;
  /** Optional global component config — set via `createTheme({ components: { ... } })`. */
  components?: ComponentsConfig;
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
