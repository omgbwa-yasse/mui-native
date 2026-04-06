import { createIconSet } from '@react-native-vector-icons/common';
import { materialIconsGlyphMap } from './catalogue';

/**
 * Pre-built icon set components for each Material Icons variant.
 * All sets share the same glyph map and the same bundled font file
 * (MaterialIcons.ttf from react-native-vector-icons). Outlined/Round/Sharp/
 * TwoTone variant OTF files are not included in the npm package, so we fall
 * back to the filled font for all variants to ensure glyphs render correctly.
 */
export const FilledIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);

export const OutlinedIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);

export const RoundedIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);

export const SharpIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);

export const TwoToneIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);
