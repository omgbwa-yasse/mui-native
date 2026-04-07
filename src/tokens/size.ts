/**
 * Size token definitions for the uniform `size` prop across all components.
 *
 * Three-level multiplier scale: small | medium | large
 * Component categories with different baseline dimensions apply their own
 * override values on top of SIZE_SCALE (e.g. input fields use taller heights).
 */

/** The three allowed values for the `size` prop on every component. */
export type SizeProp = 'small' | 'medium' | 'large';

/**
 * Shape of one row in SIZE_SCALE.
 *
 * - `height`        — default interactive height in dp
 * - `paddingH`      — horizontal padding in dp
 * - `paddingV`      — vertical padding in dp
 * - `iconSize`      — icon size in dp
 * - `touchTarget`   — minimum touch target size in dp (MUST always ≥ 48 — constitution Principle V / WCAG 2.1 AA)
 * - `fontSizeScale` — multiplier applied to the component's base font size
 */
export interface SizeTokens {
  height: number;
  paddingH: number;
  paddingV: number;
  iconSize: number;
  touchTarget: number;
  fontSizeScale: number;
}

/**
 * Centralized size scale.
 *
 * All components that are sensitive to size use these values as a baseline.
 * Per-category overrides (inputs, chips, avatars, etc.) are applied in each
 * component's own `.tsx` file by reading the relevant field(s) and substituting
 * category-specific dimensions.
 */
export const SIZE_SCALE: Record<SizeProp, SizeTokens> = {
  small: {
    height: 32,
    paddingH: 12,
    paddingV: 6,
    iconSize: 16,
    // CONSTITUTION-EXCEPTION(none): visual height is 32dp; touch target is padded to 48dp via hitSlop
    // in each component. Do NOT reduce below 48 — Principle V (WCAG 2.1 AA).
    touchTarget: 48,
    fontSizeScale: 0.85,
  },
  medium: {
    height: 40,
    paddingH: 24,
    paddingV: 10,
    iconSize: 20,
    touchTarget: 48, // padded to 48dp via hitSlop; visual height is 40dp
    fontSizeScale: 1.0,
  },
  large: {
    height: 48,
    paddingH: 32,
    paddingV: 14,
    iconSize: 24,
    touchTarget: 48,
    fontSizeScale: 1.15,
  },
};
