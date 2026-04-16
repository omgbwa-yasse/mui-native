/**
 * BeautifulTheme — Canonical Ubuntu / GNOME design language preset.
 *
 * Primary: #E95420 (Ubuntu Orange), Secondary: #772953 (Ubuntu Purple).
 * Uses the Ubuntu typeface.
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

export const BeautifulTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#E95420',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FBDDD4',
    onPrimaryContainer: '#5B1A08',
    secondary: '#772953',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#F3D0E2',
    onSecondaryContainer: '#3A0B27',
    background: '#FFFFFF',
    onBackground: '#1A1A1A',
    surface: '#F7F7F7',
    onSurface: '#1A1A1A',
  },
  darkColorScheme: {
    background: '#300A24',
    surface: '#1F0A1A',
    onBackground: '#F7F7F7',
    onSurface: '#F7F7F7',
    primary: '#FF7043',
    onPrimary: '#FFFFFF',
  },
  typography: {
    displayLarge:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '300', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'Ubuntu', sans-serif", fontWeight: '300', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'Ubuntu', sans-serif", fontWeight: '500', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 8,
    large: 12,
    extraLarge: 28,
    full: 9999,
  },
  elevation: ELEVATION,
};

