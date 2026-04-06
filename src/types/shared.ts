/**
 * Shared type definitions used across all components.
 *
 * Exports:
 *   - ColorProp          — semantic color names for the `color` prop
 *   - SxObject           — flat token shorthand record for the `sx` prop
 *   - SxProps            — full sx prop type (object or array)
 *   - SlotPropsConfig<T> — generic slots + slotProps pattern
 *   - isColorProp()      — type guard
 *   - colorRoleMap       — maps ColorProp → four colorScheme keys
 */

import type { ColorScheme } from '../tokens/colors';

// ─── ColorProp ────────────────────────────────────────────────────────────────

/**
 * The set of semantic color values accepted by the `color` prop on every
 * component. Values correspond to `colorScheme` role groups in the theme.
 */
export type ColorProp =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

const COLOR_PROP_VALUES: readonly ColorProp[] = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'success',
  'warning',
  'info',
] as const;

/** Type guard — returns true when `value` is a valid `ColorProp`. */
export function isColorProp(value: unknown): value is ColorProp {
  return COLOR_PROP_VALUES.includes(value as ColorProp);
}

// ─── colorRoleMap ─────────────────────────────────────────────────────────────

/** Maps each ColorProp to the four colorScheme keys used for filled surfaces. */
export const colorRoleMap: Record<
  ColorProp,
  {
    bg: keyof ColorScheme;
    fg: keyof ColorScheme;
    container: keyof ColorScheme;
    onContainer: keyof ColorScheme;
  }
> = {
  primary: {
    bg: 'primary',
    fg: 'onPrimary',
    container: 'primaryContainer',
    onContainer: 'onPrimaryContainer',
  },
  secondary: {
    bg: 'secondary',
    fg: 'onSecondary',
    container: 'secondaryContainer',
    onContainer: 'onSecondaryContainer',
  },
  tertiary: {
    bg: 'tertiary',
    fg: 'onTertiary',
    container: 'tertiaryContainer',
    onContainer: 'onTertiaryContainer',
  },
  error: {
    bg: 'error',
    fg: 'onError',
    container: 'errorContainer',
    onContainer: 'onErrorContainer',
  },
  success: {
    bg: 'success',
    fg: 'onSuccess',
    container: 'successContainer',
    onContainer: 'onSuccessContainer',
  },
  warning: {
    bg: 'warning',
    fg: 'onWarning',
    container: 'warningContainer',
    onContainer: 'onWarningContainer',
  },
  info: {
    bg: 'info',
    fg: 'onInfo',
    container: 'infoContainer',
    onContainer: 'onInfoContainer',
  },
};

// ─── SxProps ──────────────────────────────────────────────────────────────────

/**
 * Flat shorthand record for inline token overrides via the `sx` prop.
 *
 * Spacing keys resolve through `theme.spacing`.
 * Color keys resolve through `theme.colorScheme` when the value is a ColorProp.
 * All other values are passed through to the React Native style object as-is.
 *
 * CSS-only properties (pseudo-selectors, @media, child selectors) are silently
 * ignored with an `// RN-DEVIATION:` comment in useSx.ts.
 */
export type SxObject = {
  // Spacing shorthands
  m?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mx?: number | string;
  my?: number | string;
  p?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  px?: number | string;
  py?: number | string;
  // Color
  color?: ColorProp | string;
  bg?: ColorProp | string;
  backgroundColor?: ColorProp | string;
  borderColor?: ColorProp | string;
  // Layout
  width?: number | string;
  w?: number | string;
  height?: number | string;
  h?: number | string;
  flex?: number;
  display?: 'flex' | 'none';
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  position?: 'relative' | 'absolute';
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderRadius?: number | string;
  borderWidth?: number;
  // Responsive breakpoint — nested values override at the given min-width
  [key: string]: unknown;
};

/**
 * Full `sx` prop type.
 * Accepts a single SxObject or an array containing SxObjects and falsy guards.
 */
export type SxProps = SxObject | ReadonlyArray<SxObject | false | null | undefined>;

// ─── SlotPropsConfig ──────────────────────────────────────────────────────────

/**
 * Generic slots + slotProps pattern for composite components.
 *
 * `TSlots` is an interface mapping slot names (e.g. `'root' | 'icon'`) to the
 * React component type expected for that slot.
 *
 * Usage:
 * ```ts
 * interface ChipSlots { Root: React.ComponentType; DeleteIcon: React.ComponentType }
 * interface ChipProps extends SlotPropsConfig<ChipSlots> { ... }
 * ```
 */
export interface SlotPropsConfig<TSlots extends Record<string, React.ComponentType<unknown>>> {
  /** Override sub-component implementations. */
  slots?: Partial<TSlots>;
  /** Additional props forwarded to each sub-component slot. */
  slotProps?: Partial<{
    [K in keyof TSlots]: TSlots[K] extends React.ComponentType<infer P> ? Partial<P> : never;
  }>;
}
