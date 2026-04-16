/**
 * NovaTheme — Meta / Facebook design language preset.
 *
 * Primary: #1877F2 (Facebook Blue), Secondary: #42B72A (Facebook Green).
 * Uses the Helvetica Neue typeface stack.
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

export const NovaTheme: Theme = {
  mode: 'light',
  colorScheme: {
    ...baseLightColors,
    primary: '#1877F2',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D3E5FD',
    onPrimaryContainer: '#003D7A',
    secondary: '#42B72A',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D3F5CB',
    onSecondaryContainer: '#1A5210',
    background: '#FFFFFF',
    onBackground: '#1C1E21',
    surface: '#F0F2F5',
    onSurface: '#1C1E21',
  },
  darkColorScheme: {
    background: '#18191A',
    surface: '#242526',
    onBackground: '#E4E6EB',
    onSurface: '#E4E6EB',
    primary: '#2D88FF',
    onPrimary: '#FFFFFF',
  },
  typography: {
    displayLarge:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '300', fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    displayMedium: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '300', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
    displaySmall:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
    headlineLarge:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    headlineMedium: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    headlineSmall:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    titleLarge:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    titleMedium: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
    titleSmall:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    bodyLarge:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    bodyMedium: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
    bodySmall:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    labelLarge:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
    labelMedium: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
    labelSmall:  { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: '700', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
  },
  shape: {
    none: 0,
    extraSmall: 4,
    small: 8,
    medium: 6,
    large: 8,
    extraLarge: 10,
    full: 9999,
  },
  elevation: ELEVATION,
};

