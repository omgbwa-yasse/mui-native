/**
 * T058 — Typography token unit tests.
 *
 * SC-006: typographyVariantMap has exactly 13 entries; all values are valid
 * TypeScaleVariant keys.
 */
import { typographyVariantMap } from '../../../src/tokens/typography';
import type { TypographyMD2Variant } from '../../../src/tokens/typography';

// The 13 expected MD2 variant names
const expectedMD2Variants: TypographyMD2Variant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2',
  'body1', 'body2',
  'caption', 'button', 'overline',
];

// The 15 valid MD3 TypeScaleVariant keys
const validMD3Keys = new Set([
  'displayLarge', 'displayMedium', 'displaySmall',
  'headlineLarge', 'headlineMedium', 'headlineSmall',
  'titleLarge', 'titleMedium', 'titleSmall',
  'bodyLarge', 'bodyMedium', 'bodySmall',
  'labelLarge', 'labelMedium', 'labelSmall',
]);

describe('typographyVariantMap', () => {
  it('has exactly 13 entries', () => {
    expect(Object.keys(typographyVariantMap)).toHaveLength(13);
  });

  it('contains all 13 expected MD2 variant names as keys', () => {
    const keys = Object.keys(typographyVariantMap);
    for (const variant of expectedMD2Variants) {
      expect(keys).toContain(variant);
    }
  });

  it('maps all entries to valid TypeScaleVariant (MD3) keys', () => {
    for (const [md2Variant, md3Variant] of Object.entries(typographyVariantMap)) {
      expect(validMD3Keys.has(md3Variant)).toBe(true);
      // If not in set, fail with a descriptive message
      if (!validMD3Keys.has(md3Variant)) {
        fail(`typographyVariantMap["${md2Variant}"] = "${md3Variant}" is not a valid TypeScaleVariant`);
      }
    }
  });

  it('maps h1 → displayLarge', () => {
    expect(typographyVariantMap.h1).toBe('displayLarge');
  });

  it('maps h4 → headlineLarge', () => {
    expect(typographyVariantMap.h4).toBe('headlineLarge');
  });

  it('maps body1 → bodyLarge', () => {
    expect(typographyVariantMap.body1).toBe('bodyLarge');
  });

  it('maps body2 → bodyMedium', () => {
    expect(typographyVariantMap.body2).toBe('bodyMedium');
  });

  it('maps caption → labelSmall', () => {
    expect(typographyVariantMap.caption).toBe('labelSmall');
  });

  it('maps button → labelLarge', () => {
    expect(typographyVariantMap.button).toBe('labelLarge');
  });

  it('maps overline → labelMedium', () => {
    expect(typographyVariantMap.overline).toBe('labelMedium');
  });

  it('snapshot — full map is stable', () => {
    expect(typographyVariantMap).toMatchSnapshot();
  });
});
