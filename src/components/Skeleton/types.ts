/**
 * Props for the Skeleton loading placeholder component.
 */
export interface SkeletonProps {
  /** Width in dp or percentage string. */
  width: number | string;
  /** Height in dp. */
  height: number;
  /** Shape variant. Defaults to 'rectangular'. */
  variant?: 'rectangular' | 'circular' | 'text';
  /** Animation type. `false` disables animation. Defaults to 'wave'. */
  animation?: 'wave' | 'pulse' | false;
  testID?: string;
}
