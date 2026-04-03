import { baseLightColors, baseDarkColors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { shape } from '../tokens/shape';
import { elevation } from '../tokens/elevation';
import { generatePalette } from './generatePalette';
import type { Theme, DeepPartial, ColorMode } from './types';

/**
 * Options for createTheme().
 */
export interface CreateThemeOptions {
  /**
   * Color mode — 'light' | 'dark'. Defaults to 'light'.
   */
  mode?: ColorMode;
  /**
   * Hex seed color for MD3 palette generation, e.g. '#1976D2'.
   * When provided, the full 30-role ColorScheme is generated at runtime
   * via generatePalette(). When omitted, the static baseline colors are used.
   */
  seedColor?: string;
  /**
   * Partial theme overrides merged onto the generated theme.
   * Deep-merged: nested objects are combined, not replaced.
   */
  overrides?: DeepPartial<Theme>;
}

function deepMerge<T extends object>(base: T, overrides: DeepPartial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const override = overrides[key];
    if (override !== undefined) {
      if (typeof override === 'object' && override !== null && !Array.isArray(override)) {
        result[key] = deepMerge(base[key] as object, override as DeepPartial<object>) as T[keyof T];
      } else {
        result[key] = override as T[keyof T];
      }
    }
  }
  return result;
}

/**
 * Create a fully-resolved MD3 {@link Theme}.
 *
 * @example
 * // Default light theme
 * const theme = createTheme();
 *
 * @example
 * // Dark theme generated from a custom seed
 * const theme = createTheme({ mode: 'dark', seedColor: '#E91E63' });
 */
export function createTheme(options: CreateThemeOptions = {}): Theme {
  const { mode = 'light', seedColor, overrides } = options;

  let colorScheme = mode === 'dark' ? baseDarkColors : baseLightColors;

  if (seedColor) {
    colorScheme = generatePalette(seedColor, mode === 'dark');
  }

  const base: Theme = {
    colorScheme,
    typography,
    shape,
    elevation,
    mode,
  };

  return overrides ? deepMerge(base, overrides) : base;
}
