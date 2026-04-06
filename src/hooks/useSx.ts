/**
 * useSx — converts an `SxProps` value into a React Native `ViewStyle`.
 *
 * @param sx    The sx prop (object, array, or undefined/null/false).
 * @param theme The current `Theme` (obtained from `useTheme().theme` by the caller).
 * @returns     A React Native style object, or `undefined` when `sx` is falsy.
 *
 * Design decisions (see research.md):
 *  - Zero-allocation fast path: when `sx` is falsy, `undefined` is returned
 *    immediately without any object creation (D5).
 *  - Array notation is supported: falsy items (null, false, undefined) are
 *    filtered out; remaining objects are merged left→right.
 *  - Breakpoints use `useWindowDimensions().width`; resolved once per render
 *    and shared across all responsive properties (xs/sm/md/lg/xl).
 *  - CSS-only properties (pseudo-selectors, @media strings, etc.) are silently
 *    dropped with a `// RN-DEVIATION:` comment.
 *  - The result is memoized on `[sx, viewportWidth]` to avoid re-allocation.
 *
 * @example
 * const sxStyle = useSx(props.sx, theme);
 * <View style={StyleSheet.flatten([ownStyles, sxStyle, props.style])} />
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import type { ViewStyle } from 'react-native';
import { isColorProp, colorRoleMap } from '../types/shared';
import type { SxObject, SxProps } from '../types/shared';
import type { Theme } from '../theme/types';
import { spacing as spacingTokens } from '../tokens/spacing';

// ─── Breakpoint table ─────────────────────────────────────────────────────────

const BREAKPOINTS: [string, number][] = [
  ['xl', 1536],
  ['lg', 1200],
  ['md', 900],
  ['sm', 600],
  ['xs', 0],
];

/** Picks the value corresponding to the active breakpoint. */
function resolveResponsive<T>(
  value: T | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>,
  viewportWidth: number,
): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'object' || Array.isArray(value)) {
    // It is a plain scalar — not a responsive map
    return value as T;
  }
  const map = value as Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;
  for (const [bp, minWidth] of BREAKPOINTS) {
    if (viewportWidth >= minWidth) {
      const v = (map as Record<string, T | undefined>)[bp];
      if (v !== undefined) return v;
    }
  }
  return undefined;
}

// ─── Shorthand → RN key mapping ───────────────────────────────────────────────

const SHORTHAND_MAP: Partial<Record<keyof SxObject, string>> = {
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  bg: 'backgroundColor',
  w: 'width',
  h: 'height',
  border: 'borderWidth',
};

// ─── Color resolution ──────────────────────────────────────────────────────────

function resolveColor(value: unknown, theme: Theme): unknown {
  if (typeof value === 'string' && isColorProp(value)) {
    const roles = colorRoleMap[value];
    return theme.colorScheme[roles.bg];
  }
  return value;
}

// ─── Spacing resolution ────────────────────────────────────────────────────────

/** Color-bearing props, resolved via colorRoleMap */
const COLOR_PROPS = new Set(['color', 'bg', 'backgroundColor', 'borderColor']);

/** Spacing-bearing props, resolved via theme.spacing */
const SPACING_PROPS = new Set([
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my',
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py',
  'gap', 'rowGap', 'columnGap',
]);

function resolveSpacing(value: unknown, _theme: Theme): unknown {
  if (typeof value !== 'number') return value;
  // Use the spacing token table; fall back to 8dp base unit for out-of-range values
  const spacingMap = spacingTokens as Record<number, number>;
  return spacingMap[value] !== undefined ? spacingMap[value] : value * 8;
}

// ─── CSS-only properties to silently drop ─────────────────────────────────────

// RN-DEVIATION: Pseudo-selectors and @media queries are CSS-only; React Native
// has no runtime concept of :hover, :focus, :active, ::before, ::after, or
// media query strings. These keys are silently dropped.
const CSS_ONLY_PREFIXES = [':', '@'];
function isCssOnly(key: string): boolean {
  return CSS_ONLY_PREFIXES.some((p) => key.startsWith(p));
}

// ─── Core resolution for a single SxObject ───────────────────────────────────

function resolveSxObject(
  obj: SxObject,
  theme: Theme,
  viewportWidth: number,
): ViewStyle {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    // RN-DEVIATION: Skip CSS pseudo-selectors and @-rules silently
    if (isCssOnly(key)) continue;

    let rawValue: unknown = (obj as Record<string, unknown>)[key];
    if (rawValue === undefined || rawValue === null) continue;

    // Resolve responsive value
    rawValue = resolveResponsive(rawValue as any, viewportWidth);
    if (rawValue === undefined) continue;

    // Apply spacing resolution for spacing props
    if (SPACING_PROPS.has(key)) {
      rawValue = resolveSpacing(rawValue, theme);
    }

    // Apply color resolution for color-bearing props
    if (COLOR_PROPS.has(key)) {
      rawValue = resolveColor(rawValue, theme);
    }

    // Map shorthand to RN key
    const rnKey = (SHORTHAND_MAP as Record<string, string | undefined>)[key] ?? key;
    result[rnKey] = rawValue;
  }

  return result as ViewStyle;
}

// ─── Public hook ──────────────────────────────────────────────────────────────

/**
 * Converts `SxProps` to a React Native `ViewStyle` (or `undefined` when falsy).
 * Memoized on `[sx, viewportWidth]`.
 */
export function useSx(sx: SxProps | undefined, theme: Theme): ViewStyle | undefined {
  const { width: viewportWidth } = useWindowDimensions();

  return useMemo<ViewStyle | undefined>(() => {
    // Fast path: zero allocation
    if (!sx) return undefined;

    // Normalise to array
    const items: SxObject[] = Array.isArray(sx)
      ? (sx as ReadonlyArray<unknown>).filter(
          (item): item is SxObject =>
            !!item && typeof item === 'object' && !Array.isArray(item),
        )
      : [sx as SxObject];

    if (items.length === 0) return undefined;

    // Merge left→right
    let merged: ViewStyle = {};
    for (const item of items) {
      const resolved = resolveSxObject(item, theme, viewportWidth);
      merged = { ...merged, ...resolved };
    }

    return merged;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sx, viewportWidth]);
}
