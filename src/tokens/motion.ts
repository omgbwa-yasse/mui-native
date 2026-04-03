/**
 * MD3 Motion tokens — duration and easing values.
 * Reference: R-04 — Motion (react-native-reanimated Easing)
 * https://m3.material.io/styles/motion/easing-and-duration/tokens
 *
 * Durations use Reanimated withTiming/withSpring.
 * Easings are Reanimated Easing functions (imported at usage site).
 */

/** Duration values in milliseconds */
export const motionDuration = {
  /** Immediate — 0ms */
  instant: 0,
  /** Extra short — 50ms */
  short1: 50,
  /** Short — 100ms */
  short2: 100,
  /** Short medium — 150ms */
  short3: 150,
  /** Short long — 200ms */
  short4: 200,
  /** Medium short — 250ms */
  medium1: 250,
  /** Medium — 300ms */
  medium2: 300,
  /** Medium long — 350ms */
  medium3: 350,
  /** Medium extra long — 400ms */
  medium4: 400,
  /** Long — 450ms */
  long1: 450,
  /** Extra Long — 500ms */
  long2: 500,
} as const;

export type MotionDurationKey = keyof typeof motionDuration;

/**
 * Easing curve descriptors.
 *
 * These string identifiers map to Reanimated `Easing.*` presets.
 * Components import `Easing` from 'react-native-reanimated' and look up
 * the function using these keys:
 *
 *   Easing.bezier(0.2, 0, 0, 1)  → emphasized
 *   Easing.bezier(0.3, 0, 1, 1)  → emphasizedAccelerate
 *   Easing.bezier(0.05, 0.7, 0.1, 1)  → emphasizedDecelerate
 *   Easing.bezier(0.2, 0, 1, 1)  → standard
 *   Easing.bezier(0.3, 0, 1, 1)  → standardAccelerate
 *   Easing.bezier(0.05, 0.7, 0.1, 1)  → standardDecelerate
 */
export const motionEasing = {
  emphasized: [0.2, 0, 0, 1] as const,
  emphasizedAccelerate: [0.3, 0, 1, 1] as const,
  emphasizedDecelerate: [0.05, 0.7, 0.1, 1] as const,
  standard: [0.2, 0, 1, 1] as const,
  standardAccelerate: [0.3, 0, 1, 1] as const,
  standardDecelerate: [0.0, 0.0, 0.0, 1.0] as const,
} as const;

export type MotionEasingKey = keyof typeof motionEasing;

export const motion = {
  duration: motionDuration,
  easing: motionEasing,
} as const;
