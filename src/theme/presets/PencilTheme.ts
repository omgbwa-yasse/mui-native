/**
 * PencilTheme — Microsoft .NET MAUI design language preset.
 *
 * Primary: #0078D4 (Fluent Blue), Secondary: #2B88D8.
 * Uses the Segoe UI typeface.
 */
import { baseLightColors } from '../../tokens/colors';
import type { Theme } from '../types';
import type { ElevationScale } from '../../tokens/elevation';

const ELEVATION: ElevationScale = {
  level0: { shadowOffsetX: 0, shadowOffsetY: 0, shadowRadius: 0, shadowOpacity: 0, elevation: 0 },
  level1: { shadowOffsetX: 0, shadowOffsetY: 1, shadowRadius: 2, shadowOpacity: 0.15, elevation: 1 },
  level2: { shadowOffsetX: 0, shadowOffsetY: 2, shadowRadius: 4, shadowOpacity: 0.15, elevation: 3 },
  level3: { shadowOffsetX: 0, shadowOffsetY: 4, shadowRadius: 8, shadowOpacity: 0.15, elevation: 6 },
  level4: { shadowOffsetX: 0, shadowOffsetY: 6, shadowRadius: 10, shadowOpacity: 0.15, elevation: 8 },
  level5: { shadowOffsetX: 0, shadowOffsetY: 8, shadowRadius: 12, shadowOpacity: 0.15, elevation: 12 },
};

export const PencilTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#0078D4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CCE4F6',
    onPrimaryContainer: '#003D6B',
    secondary: '#2B88D8',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D0E8F8',
    onSecondaryContainer: '#00396B',
    background: '#FFFFFF',
    onBackground: '#1F1F1F',
    surface: '#F5F5F5',
    onSurface: '#1F1F1F',
  },
  darkColorScheme: {
    background: '#1F1F1F',
    surface: '#2D2D2D',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    primary: '#2B88D8',
    onPrimary: '#FFFFFF',
  },
  typography: {
    displayLarge:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '300', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'Segoe UI', sans-serif", fontWeight: '300', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'Segoe UI', sans-serif", fontWeight: '600', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 4,
    large: 6,
    extraLarge: 8,
    full: 9999,
  },
  elevation: ELEVATION,
};

