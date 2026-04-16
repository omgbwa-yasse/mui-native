/**
 * PulseTheme — ByteDance TikTok design language preset.
 *
 * Primary: #FE2C55 (TikTok Red/Pink), Secondary: #25F4EE (TikTok Cyan).
 * Uses ProximaNova typeface (falls back to system sans-serif).
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

export const PulseTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#FE2C55',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFD6DF',
    onPrimaryContainer: '#660018',
    secondary: '#25F4EE',
    onSecondary: '#003D3B',
    secondaryContainer: '#B3FDFB',
    onSecondaryContainer: '#002020',
    background: '#FFFFFF',
    onBackground: '#121212',
    surface: '#F8F8F8',
    onSurface: '#121212',
  },
  darkColorScheme: {
    background: '#121212',
    surface: '#1E1E1E',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    primary: '#FE2C55',
    onPrimary: '#FFFFFF',
    secondary: '#25F4EE',
    onSecondary: '#003D3B',
  },
  typography: {
    displayLarge:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '700', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '700', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '700', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'ProximaNova', 'Proxima Nova', sans-serif", fontWeight: '600', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 20,
    large: 24,
    extraLarge: 32,
    full: 9999,
  },
  elevation: ELEVATION,
};

