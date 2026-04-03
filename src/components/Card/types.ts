/**
 * MD3 Card component props.
 * https://m3.material.io/components/cards
 */

export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps {
  /** Card visual style. Defaults to 'elevated'. */
  variant?: CardVariant;
  /** Content rendered inside the card. */
  children: React.ReactNode;
  /** Optional press handler — makes the card interactive. */
  onPress?: () => void;
  /** Accessibility label. */
  accessibilityLabel?: string;
  /** Test id. */
  testID?: string;
}
