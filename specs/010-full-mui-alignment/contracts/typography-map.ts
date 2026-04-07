/**
 * Typography MD2 → MD3 Variant Map Contract
 * Feature: 010-full-mui-alignment
 * FR-034 / FR-035
 *
 * Source of truth lives in src/tokens/typography.ts.
 * This contract file documents the exact shape and mapping for specification purposes.
 *
 * Implementation:
 *   1. Add `TypographyMD2Variant` union type to src/tokens/typography.ts
 *   2. Add `typographyVariantMap` const to src/tokens/typography.ts
 *   3. Export both from src/tokens/typography.ts (and re-export from src/index.ts)
 *   4. Widen Text.variant prop type from TypeScaleVariant to TypeScaleVariant | TypographyMD2Variant
 *   5. Resolve at render time: typographyVariantMap[variant] ?? variant
 */

// TypeScaleVariant (already exported) = keyof TypographyScale
// = 'displayLarge' | 'displayMedium' | 'displaySmall' |
//   'headlineLarge' | 'headlineMedium' | 'headlineSmall' |
//   'titleLarge' | 'titleMedium' | 'titleSmall' |
//   'bodyLarge' | 'bodyMedium' | 'bodySmall' |
//   'labelLarge' | 'labelMedium' | 'labelSmall'

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
 * Canonical MD2 → MD3 mapping.
 * Exported as `typographyVariantMap` from src/tokens/typography.ts.
 *
 * Rationale for each mapping:
 *   h1        → displayLarge   (largest heading = largest display)
 *   h2        → displayMedium
 *   h3        → displaySmall
 *   h4        → headlineLarge  (section heading level)
 *   h5        → headlineMedium
 *   h6        → headlineSmall
 *   subtitle1 → titleLarge     (emphasized subtitle = largest title)
 *   subtitle2 → titleMedium    (secondary subtitle)
 *   body1     → bodyMedium     (primary body text)
 *   body2     → bodySmall      (secondary / smaller body text)
 *   caption   → labelSmall     (smallest informational text)
 *   button    → labelLarge     (button label — prominent label)
 *   overline  → labelMedium    (overline / secondary label)
 */
export const typographyVariantMapShape = {
  h1:        'displayLarge',
  h2:        'displayMedium',
  h3:        'displaySmall',
  h4:        'headlineLarge',
  h5:        'headlineMedium',
  h6:        'headlineSmall',
  subtitle1: 'titleLarge',
  subtitle2: 'titleMedium',
  body1:     'bodyMedium',
  body2:     'bodySmall',
  caption:   'labelSmall',
  button:    'labelLarge',
  overline:  'labelMedium',
} as const satisfies Record<TypographyMD2Variant, string>;
