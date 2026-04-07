/**
 * MD3 Typography scale tokens.
 * 15 text styles as per Material Design 3 specification.
 * Font values: Reference R-06 (Roboto / system font stack).
 *
 * https://m3.material.io/styles/typography/type-scale-tokens
 */

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface TypographyScale {
  displayLarge: TypographyStyle;
  displayMedium: TypographyStyle;
  displaySmall: TypographyStyle;
  headlineLarge: TypographyStyle;
  headlineMedium: TypographyStyle;
  headlineSmall: TypographyStyle;
  titleLarge: TypographyStyle;
  titleMedium: TypographyStyle;
  titleSmall: TypographyStyle;
  bodyLarge: TypographyStyle;
  bodyMedium: TypographyStyle;
  bodySmall: TypographyStyle;
  labelLarge: TypographyStyle;
  labelMedium: TypographyStyle;
  labelSmall: TypographyStyle;
}

const FONT_FAMILY = 'Roboto, system-ui, sans-serif';

export const typography: TypographyScale = {
  displayLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

// ── MD2 typography aliases ────────────────────────────────────────────────────
// Maps the 13 Material Design 2 variant names to their MD3 equivalents.
// Enables MUI Web copy-paste compatibility (FR-034, FR-035).

/** The 13 Material Design 2 typography variant names. */
export type TypographyMD2Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

/**
 * Maps each MD2 typography variant name to its MD3 `TypographyScale` key.
 * All 15 MD3 type-scale roles remain the canonical default.
 */
export const typographyVariantMap: Record<TypographyMD2Variant, keyof TypographyScale> = {
  h1:        'displayLarge',
  h2:        'displayMedium',
  h3:        'displaySmall',
  h4:        'headlineLarge',
  h5:        'headlineMedium',
  h6:        'headlineSmall',
  subtitle1: 'titleLarge',
  subtitle2: 'titleMedium',
  body1:     'bodyLarge',
  body2:     'bodyMedium',
  caption:   'labelSmall',
  button:    'labelLarge',
  overline:  'labelMedium',
};
