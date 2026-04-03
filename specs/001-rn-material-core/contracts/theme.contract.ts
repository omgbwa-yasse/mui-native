/**
 * RN-Material Public Theme API Contract
 *
 * This file documents the stable public surface for theming.
 * Any change to these types is a breaking change (semver major).
 *
 * @packageDocumentation
 */

// ─── Color ───────────────────────────────────────────────────────────────────

export interface ColorScheme {
  primary:              string;
  onPrimary:            string;
  primaryContainer:     string;
  onPrimaryContainer:   string;
  secondary:            string;
  onSecondary:          string;
  secondaryContainer:   string;
  onSecondaryContainer: string;
  tertiary:             string;
  onTertiary:           string;
  tertiaryContainer:    string;
  onTertiaryContainer:  string;
  error:                string;
  onError:              string;
  errorContainer:       string;
  onErrorContainer:     string;
  background:           string;
  onBackground:         string;
  surface:              string;
  onSurface:            string;
  surfaceVariant:       string;
  onSurfaceVariant:     string;
  outline:              string;
  outlineVariant:       string;
  shadow:               string;
  scrim:                string;
  inverseSurface:       string;
  inverseOnSurface:     string;
  inversePrimary:       string;
  surfaceTint:          string;
}

// ─── Typography ──────────────────────────────────────────────────────────────

export interface TypeStyle {
  fontFamily:     string;
  fontSize:       number;
  lineHeight:     number;
  fontWeight:     '400' | '500' | '700';
  letterSpacing?: number;
}

export interface TypeScale {
  displayLarge:    TypeStyle;
  displayMedium:   TypeStyle;
  displaySmall:    TypeStyle;
  headlineLarge:   TypeStyle;
  headlineMedium:  TypeStyle;
  headlineSmall:   TypeStyle;
  titleLarge:      TypeStyle;
  titleMedium:     TypeStyle;
  titleSmall:      TypeStyle;
  bodyLarge:       TypeStyle;
  bodyMedium:      TypeStyle;
  bodySmall:       TypeStyle;
  labelLarge:      TypeStyle;
  labelMedium:     TypeStyle;
  labelSmall:      TypeStyle;
}

// ─── Spacing ─────────────────────────────────────────────────────────────────

export interface SpacingScale {
  none:   0;
  xxs:    2;
  xs:     4;
  sm:     8;
  md:     12;
  lg:     16;
  xl:     24;
  xxl:    32;
  xxxl:   48;
  xxxxl:  64;
}

// ─── Shape ───────────────────────────────────────────────────────────────────

export interface ShapeStyle {
  borderRadius: number;
}

export interface ShapeScale {
  none:       ShapeStyle;
  extraSmall: ShapeStyle;
  small:      ShapeStyle;
  medium:     ShapeStyle;
  large:      ShapeStyle;
  extraLarge: ShapeStyle;
  full:       ShapeStyle;
}

// ─── Elevation ───────────────────────────────────────────────────────────────

export interface ElevationStyle {
  level:         0 | 1 | 2 | 3 | 4 | 5;
  tintOpacity:   number;
  elevation?:    number;
  shadowColor?:  string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export interface ElevationScale {
  level0: ElevationStyle;
  level1: ElevationStyle;
  level2: ElevationStyle;
  level3: ElevationStyle;
  level4: ElevationStyle;
  level5: ElevationStyle;
}

// ─── Motion ──────────────────────────────────────────────────────────────────

export interface MotionTokens {
  duration: {
    short1: number;  short2: number;  short3: number;  short4: number;
    medium1: number; medium2: number; medium3: number; medium4: number;
    long1: number;   long2: number;
  };
  easing: {
    standard:             string;
    standardDecelerate:   string;
    standardAccelerate:   string;
    emphasized:           string;
    emphasizedDecelerate: string;
    emphasizedAccelerate: string;
  };
}

// ─── Root Theme ──────────────────────────────────────────────────────────────

export interface Theme {
  colorScheme:  ColorScheme;
  typography:   TypeScale;
  spacing:      SpacingScale;
  shape:        ShapeScale;
  elevation:    ElevationScale;
  motion:       MotionTokens;
  mode:         'light' | 'dark';
  seedColor?:   string;
}

// ─── ThemeProvider ───────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  theme?:     DeepPartial<Theme>;
  seedColor?: string;
  mode?:      'light' | 'dark' | 'system';
  children:   React.ReactNode;
}

// ─── useTheme ────────────────────────────────────────────────────────────────

/**
 * Returns the current Theme and a function to switch mode.
 * MUST be called inside a <ThemeProvider> subtree; throws otherwise.
 *
 * @example
 *   const { theme, setMode } = useTheme();
 *   setMode('dark');
 */
export interface UseThemeReturn {
  theme:   Theme;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
