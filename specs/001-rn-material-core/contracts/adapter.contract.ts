/**
 * RN-Material Adapter Contract: @react-native-material/core Bridge
 *
 * This file defines the stable interface for the optional peer-dependency
 * adapter that bridges RN-Material's theme to @react-native-material/core.
 *
 * This adapter is a NO-OP when @react-native-material/core is not installed.
 * Consumers MUST install @react-native-material/core ≥ 1.0.0 as a peer
 * dependency to activate the bridge.
 *
 * @packageDocumentation
 */
import type { ReactNode } from 'react';

// ─── Mapped Palette ───────────────────────────────────────────────────────────

/**
 * The subset of color roles that @react-native-material/core reads from
 * its ThemeContext. All values are hex strings.
 *
 * @see research.md § R-02
 */
export interface RNMCorePalette {
  primary:            string;
  onPrimary:          string;
  primaryContainer:   string;
  onPrimaryContainer: string;
  secondary:          string;
  onSecondary:        string;
  surface:            string;
  onSurface:          string;
  background:         string;
  onBackground:       string;
  error:              string;
  onError:            string;
}

// ─── Adapter Props ───────────────────────────────────────────────────────────

export interface RNMCoreAdapterProps {
  children: ReactNode;
}

// ─── Adapter Component ───────────────────────────────────────────────────────

/**
 * Wraps @react-native-material/core ThemeProvider as a child of RN-Material
 * ThemeProvider, mapping RN-Material color tokens to the rnm-core palette shape.
 *
 * Usage (inside <ThemeProvider>):
 *
 *   import { ThemeProvider } from 'rn-material';
 *   import { RNMCoreAdapter } from 'rn-material/adapters';
 *   import { Button } from '@react-native-material/core'; // optional peer
 *
 *   function App() {
 *     return (
 *       <ThemeProvider seedColor="#6750A4">
 *         <RNMCoreAdapter>
 *           <Button title="Legacy Button" />  // painted by RN-Material tokens
 *         </RNMCoreAdapter>
 *       </ThemeProvider>
 *     );
 *   }
 *
 * When @react-native-material/core is NOT installed:
 *   - RNMCoreAdapter renders <>{children}</> without error (graceful degradation)
 *   - A console.warn is printed once in development builds
 *
 * @see research.md § R-02
 */
export type RNMCoreAdapterComponent = React.FC<RNMCoreAdapterProps>;

// ─── Mapping Function ────────────────────────────────────────────────────────

/**
 * Pure function: derives RNMCorePalette from a Theme's ColorScheme.
 * Exported for consumers who need direct access to the mapping logic.
 *
 * @param colorScheme - The current RN-Material ColorScheme
 * @returns           - The mapped RNMCorePalette
 */
export type MapThemeToRNMCorePalette = (
  colorScheme: import('./theme.contract').ColorScheme
) => RNMCorePalette;
