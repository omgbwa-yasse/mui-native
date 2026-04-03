/**
 * Generates a full MD3 ColorScheme from a hex seed color.
 *
 * Uses @material/material-color-utilities (listed in `dependencies` so it
 * ships with the package — not a peer dep).
 *
 * @param seedHex - Source color as hex string, e.g. '#1976D2'
 * @param dark    - If true, returns the dark-mode palette. Default: false.
 * @returns       Full {@link ColorScheme} with all 30 MD3 color roles.
 */

import { argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import type { ColorScheme } from '../tokens/colors';

function argbToHex(argb: number): string {
  // ARGB: 0xAARRGGBB → '#RRGGBB'
  const r = (argb >> 16) & 0xff;
  const g = (argb >> 8) & 0xff;
  const b = argb & 0xff;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

export function generatePalette(seedHex: string, dark = false): ColorScheme {
  const argb = argbFromHex(seedHex);
  const { schemes } = themeFromSourceColor(argb);
  const scheme = dark ? schemes.dark : schemes.light;

  return {
    primary: argbToHex(scheme.primary),
    onPrimary: argbToHex(scheme.onPrimary),
    primaryContainer: argbToHex(scheme.primaryContainer),
    onPrimaryContainer: argbToHex(scheme.onPrimaryContainer),
    secondary: argbToHex(scheme.secondary),
    onSecondary: argbToHex(scheme.onSecondary),
    secondaryContainer: argbToHex(scheme.secondaryContainer),
    onSecondaryContainer: argbToHex(scheme.onSecondaryContainer),
    tertiary: argbToHex(scheme.tertiary),
    onTertiary: argbToHex(scheme.onTertiary),
    tertiaryContainer: argbToHex(scheme.tertiaryContainer),
    onTertiaryContainer: argbToHex(scheme.onTertiaryContainer),
    error: argbToHex(scheme.error),
    onError: argbToHex(scheme.onError),
    errorContainer: argbToHex(scheme.errorContainer),
    onErrorContainer: argbToHex(scheme.onErrorContainer),
    background: argbToHex(scheme.background),
    onBackground: argbToHex(scheme.onBackground),
    surface: argbToHex(scheme.surface),
    onSurface: argbToHex(scheme.onSurface),
    surfaceVariant: argbToHex(scheme.surfaceVariant),
    onSurfaceVariant: argbToHex(scheme.onSurfaceVariant),
    outline: argbToHex(scheme.outline),
    outlineVariant: argbToHex(scheme.outlineVariant),
    shadow: argbToHex(scheme.shadow),
    scrim: argbToHex(scheme.scrim),
    inverseSurface: argbToHex(scheme.inverseSurface),
    inverseOnSurface: argbToHex(scheme.inverseOnSurface),
    inversePrimary: argbToHex(scheme.inversePrimary),
    surfaceTint: argbToHex(scheme.primary),
  };
}
