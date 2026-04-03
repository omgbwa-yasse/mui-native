/**
 * MD3 Shape tokens — border radius scale.
 * https://m3.material.io/styles/shape/shape-scale-tokens
 */

export interface ShapeScale {
  /** None — 0dp */
  none: number;
  /** Extra Small — 4dp */
  extraSmall: number;
  /** Small — 8dp */
  small: number;
  /** Medium — 12dp */
  medium: number;
  /** Large — 16dp */
  large: number;
  /** Extra Large — 28dp */
  extraLarge: number;
  /** Full — 9999dp (pill) */
  full: number;
}

export const shape: ShapeScale = {
  none: 0,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 9999,
};
