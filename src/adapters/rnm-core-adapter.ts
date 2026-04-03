/**
 * Optional adapter layer for `@react-native-material/core` (rnm-core) consumers.
 *
 * This module lets teams already using rnm-core pass rn-material `Theme` tokens
 * into rnm-core's styling system without a full migration.  The adapter is
 * deliberately thin — it maps rn-material's MD3 color-scheme to the flat
 * color-palette shape that rnm-core expects, and re-exports rn-material's
 * typography/spacing values unchanged.
 *
 * **Usage:**
 * ```tsx
 * import { buildRnmCoreTheme } from 'rn-material/adapters';
 * import { Provider } from '@react-native-material/core';
 * import { ThemeProvider, createTheme } from 'rn-material';
 *
 * const rnMaterialTheme = createTheme();
 * const rnmTheme = buildRnmCoreTheme(rnMaterialTheme);
 *
 * export default function App() {
 *   return (
 *     <ThemeProvider>
 *       <Provider theme={rnmTheme}>
 *         <YourApp />
 *       </Provider>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
import type { Theme } from '../theme/types';

/** Flat palette shape accepted by `@react-native-material/core` Provider. */
export interface RnmCorePalette {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  outline: string;
}

/** The theme shape passed to rnm-core's `<Provider theme={...}>`. */
export interface RnmCoreTheme {
  palette: RnmCorePalette;
  typography: Theme['typography'];
}

/**
 * Build an rnm-core-compatible theme object from a rn-material `Theme`.
 * Only the color roles that rnm-core's Provider consumes are mapped; all other
 * MD3 roles remain available directly through `useTheme()` in rn-material.
 */
export function buildRnmCoreTheme(theme: Theme): RnmCoreTheme {
  const { colorScheme, typography } = theme;

  const palette: RnmCorePalette = {
    primary: colorScheme.primary,
    onPrimary: colorScheme.onPrimary,
    primaryContainer: colorScheme.primaryContainer,
    onPrimaryContainer: colorScheme.onPrimaryContainer,
    secondary: colorScheme.secondary,
    onSecondary: colorScheme.onSecondary,
    secondaryContainer: colorScheme.secondaryContainer,
    onSecondaryContainer: colorScheme.onSecondaryContainer,
    error: colorScheme.error,
    onError: colorScheme.onError,
    errorContainer: colorScheme.errorContainer,
    onErrorContainer: colorScheme.onErrorContainer,
    background: colorScheme.background,
    onBackground: colorScheme.onBackground,
    surface: colorScheme.surface,
    onSurface: colorScheme.onSurface,
    outline: colorScheme.outline,
  };

  return { palette, typography };
}
