/**
 * AuroraTheme — Microsoft Windows 11 / WinUI 3 design language preset.
 *
 * Primary: #0078D4 (Fluent Blue), Secondary: #8764B8 (Fluent Grape/Purple).
 * Uses Segoe UI Variable typeface (falls back to Segoe UI).
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

export const AuroraTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#0078D4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CCE4F6',
    onPrimaryContainer: '#003D6B',
    secondary: '#8764B8',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEFF',
    onSecondaryContainer: '#3B1F6B',
    background: '#F3F3F3',
    onBackground: '#1A1A1A',
    surface: '#FFFFFF',
    onSurface: '#1A1A1A',
  },
  darkColorScheme: {
    background: '#202020',
    surface: '#2C2C2C',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    primary: '#60CDFF',
    onPrimary: '#003355',
  },
  typography: {
    displayLarge:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '300', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '300', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", fontWeight: '600', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 4,
    large: 8,
    extraLarge: 8,
    full: 9999,
  },
  elevation: ELEVATION,
};

