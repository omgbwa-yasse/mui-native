import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../theme';
import { VALID_ICON_NAMES } from './catalogue';
import {
  FilledIcons,
  OutlinedIcons,
  RoundedIcons,
  SharpIcons,
  TwoToneIcons,
} from './iconSets';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { MaterialIconProps } from './types';

// CONSTITUTION-EXCEPTION: no-provider fallback color — Constitution II permits this literal
// when the component spec (FR-009) requires graceful rendering outside ThemeProvider.
// A __DEV__ warning is emitted at render time whenever this path is taken.
const FALLBACK_COLOR = '#000000';

const VARIANT_ICON_SETS = {
  filled: FilledIcons,
  outlined: OutlinedIcons,
  rounded: RoundedIcons,
  sharp: SharpIcons,
  'two-tone': TwoToneIcons,
} as const;

/**
 * MaterialIcon — renders a Google Fonts Material Icon glyph via
 * react-native-vector-icons, with MD3 theme color integration.
 *
 * Supports all five Material Icons variants:
 * `filled` (default) | `outlined` | `rounded` | `sharp` | `two-tone`
 *
 * Color resolution order:
 *  1. Explicit `color` prop
 *  2. `theme.colorScheme.onSurface` from ThemeProvider
 *  3. `#000000` fallback (no ThemeProvider) — CONSTITUTION-EXCEPTION: no-ThemeProvider fallback per spec FR-009
 *
 * @example
 * <MaterialIcon name="star" variant="outlined" size={32} />
 */
export const MaterialIcon = memo(function MaterialIcon(rawProps: MaterialIconProps): React.ReactElement {
  const props = useComponentDefaults('MaterialIcon', rawProps);
  const {
    name,
    variant = 'filled',
    size = 24,
    accessibilityLabel,
    testID,
    sx,
    style,
  } = props;
  // CONSTITUTION-EXCEPTION: useContext(ThemeContext) instead of useTheme() — Constitution II
  // requires useTheme(), but useTheme() throws outside ThemeProvider. Per FR-009 and
  // research.md Decision 5, useContext returns null safely, enabling the fallback path below.
  const ctx = useContext(ThemeContext);
  const sxStyle = useSx(sx, ctx?.theme as never);

  if (__DEV__ && ctx === null) {
    console.warn(
      '[mui-native] MaterialIcon: no ThemeProvider found, falling back to #000000',
    );
  }

  if (__DEV__ && !VALID_ICON_NAMES.has(name)) {
    console.warn(`[mui-native] MaterialIcon: unknown icon name "${name}"`);
  }

  const resolvedColor = color ?? ctx?.theme.colorScheme.onSurface ?? FALLBACK_COLOR;
  const MATERIAL_ICON_SIZES = { small: 16, medium: 20, large: 24 } as const;
  const numericSize: number = typeof size === 'number' ? size : MATERIAL_ICON_SIZES[size];

  const accessibilityProps = {
    accessible: accessibilityLabel != null,
    accessibilityRole: (accessibilityLabel != null ? 'image' : 'none') as
      | 'image'
      | 'none',
    accessibilityLabel,
    testID,
  };

  if (variant === 'two-tone') {
    return (
      <View
        style={{ position: 'relative', width: numericSize, height: numericSize }}
        {...accessibilityProps}
      >
        <TwoToneIcons name={name} size={numericSize} color={resolvedColor} />
        <TwoToneIcons
          name={name}
          size={numericSize}
          color={resolvedColor}
          style={[StyleSheet.absoluteFill, { opacity: 0.4 }, sxStyle, style]}
        />
      </View>
    );
  }

  const IconSet = VARIANT_ICON_SETS[variant];

  return (
    <View {...accessibilityProps}>
      <IconSet name={name} size={numericSize} color={resolvedColor} />
    </View>
  );
});
