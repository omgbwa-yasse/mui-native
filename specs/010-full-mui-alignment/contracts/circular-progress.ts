/**
 * Extended CircularProgress Props Contract
 * Feature: 010-full-mui-alignment
 * FR-008 / FR-009 / FR-010
 *
 * Adds 3 missing props to the existing CircularProgress component.
 * react-native-svg ≥ 15.0.0 is required (already an optional peer dep in package.json).
 *
 * Implementation approach (see research.md Decision 1):
 *   - SVG arc via react-native-svg: Svg + Circle + strokeDasharray/strokeDashoffset
 *   - Indeterminate: Reanimated rotation worklet on Svg container + strokeDashoffset oscillation
 *   - Determinate: strokeDashoffset = circumference * (1 - value / 100)
 *   - enableTrackSlot: second Circle with strokeOpacity: 0.15 behind the arc
 */
import type { ViewStyle } from 'react-native';

export type CircularProgressVariant = 'determinate' | 'indeterminate';

export interface CircularProgressExtendedProps {
  /** Determinate shows a static arc; indeterminate animates continuously. Default: 'indeterminate' */
  variant?: CircularProgressVariant;
  /** Progress value 0–100. Values are clamped. Used only for variant="determinate". */
  value?: number;
  /** Diameter of the spinner in dp. Default: 40 */
  size?: number | string;
  /**
   * Color of the progress arc.
   * Enumerated roles map to theme tokens; arbitrary string passes through as-is (C2 exception — consumer responsibility).
   * Default: 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
    | string;
  // ── NEW PROPS (FR-008) ──────────────────────────────────────────────────────
  /** Stroke width of the circular arc in dp. Default: 3.6 */
  thickness?: number;
  /** Disable the shrink animation on indeterminate spinner. Default: false */
  disableShrink?: boolean;
  /** Render a full-circle background track ring behind the progress arc. Default: false */
  enableTrackSlot?: boolean;
  // ── Existing cross-cutting props ────────────────────────────────────────────
  style?: ViewStyle;
  testID?: string;
}
