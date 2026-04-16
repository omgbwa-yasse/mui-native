/**
 * BreezeTheme — Apple macOS / AppKit design language preset.
 *
 * Primary: #007AFF (System Blue), Secondary: #5856D6 (System Purple).
 * Uses the San Francisco (SF Pro) typeface stack.
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

export const BreezeTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CCE5FF',
    onPrimaryContainer: '#00336B',
    secondary: '#5856D6',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E3E2FF',
    onSecondaryContainer: '#1D1B6B',
    background: '#ECECEC',
    onBackground: '#1E1E1E',
    surface: '#FFFFFF',
    onSurface: '#1E1E1E',
  },
  darkColorScheme: {
    background: '#1E1E1E',
    surface: '#2A2A2A',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    primary: '#0A84FF',
    onPrimary: '#FFFFFF',
    secondary: '#5E5CE6',
    onSecondary: '#FFFFFF',
  },
  typography: {
    displayLarge:  { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '300', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '300', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '700', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '700', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'SF Pro', 'SF Pro Display', System", fontWeight: '700', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'SF Pro', System", fontWeight: '600', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'SF Pro', System", fontWeight: '600', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'SF Pro', System", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'SF Pro', System", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'SF Pro', System", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'SF Pro', System", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'SF Pro', System", fontWeight: '500', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'SF Pro', System", fontWeight: '500', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'SF Pro', System", fontWeight: '500', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 6,
    large: 10,
    extraLarge: 16,
    full: 9999,
  },
  elevation: ELEVATION,
};

