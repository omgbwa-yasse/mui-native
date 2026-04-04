import { createIconSet } from '@react-native-vector-icons/common';
import { materialIconsGlyphMap } from './catalogue';

/**
 * Pre-built icon set components for each Material Icons variant.
 * All sets share the same glyph map; only the font family/file differs.
 */
export const FilledIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIcons',
  'MaterialIcons.ttf',
);

export const OutlinedIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIconsOutlined-Regular',
  'MaterialIconsOutlined-Regular.otf',
);

export const RoundedIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIconsRound-Regular',
  'MaterialIconsRound-Regular.otf',
);

export const SharpIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIconsSharp-Regular',
  'MaterialIconsSharp-Regular.otf',
);

export const TwoToneIcons = createIconSet(
  materialIconsGlyphMap,
  'MaterialIconsTwoTone-Regular',
  'MaterialIconsTwoTone-Regular.otf',
);
