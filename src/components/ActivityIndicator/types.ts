/**
 * Props for the ActivityIndicator component.
 */
export interface ActivityIndicatorProps {
  /** Size variant. Defaults to 'medium'. */
  size?: 'small' | 'medium' | 'large';
  /** Color override. Defaults to `theme.colorScheme.primary`. */
  color?: string;
  /** Whether the indicator is animating. Defaults to true. */
  animating?: boolean;
  /** When true, hides the view when not animating. Defaults to true. */
  hidesWhenStopped?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}
