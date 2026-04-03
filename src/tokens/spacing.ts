/**
 * MD3 Spacing tokens — 4dp grid system.
 * All values are multiples of 4 (base unit).
 *
 * Usage: spacing[4] → 16dp
 */

export const spacing = {
  /** 0dp */
  0: 0,
  /** 4dp */
  1: 4,
  /** 8dp */
  2: 8,
  /** 12dp */
  3: 12,
  /** 16dp */
  4: 16,
  /** 20dp */
  5: 20,
  /** 24dp */
  6: 24,
  /** 28dp */
  7: 28,
  /** 32dp */
  8: 32,
  /** 36dp */
  9: 36,
  /** 40dp */
  10: 40,
  /** 44dp */
  11: 44,
  /** 48dp */
  12: 48,
  /** 56dp */
  14: 56,
  /** 64dp */
  16: 64,
} as const;

export type SpacingKey = keyof typeof spacing;

/** Helper: returns the dp value for a given grid unit */
export function getSpacing(unit: SpacingKey): number {
  return spacing[unit];
}
