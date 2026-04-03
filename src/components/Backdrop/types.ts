/**
 * Props for the Backdrop component.
 */
export interface BackdropProps {
  /** Controls backdrop visibility. */
  visible: boolean;
  /** Called when the scrim is pressed. */
  onDismiss?: () => void;
  /** Scrim opacity (0–1). Defaults to 0.5. */
  opacity?: number;
  testID?: string;
}
