import type React from 'react';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps {
  /** Chip label. */
  label: string;
  /** Chip variant. Defaults to 'assist'. */
  variant?: ChipVariant;
  /** Whether a filter chip is currently selected. */
  selected?: boolean;
  /** Leading icon. */
  icon?: React.ReactElement;
  /** Called when chip is pressed. */
  onPress?: () => void;
  /** Called when the remove icon is pressed (input chips). */
  onRemove?: () => void;
  /** Disable chip. */
  disabled?: boolean;
  /** Accessibility label. */
  accessibilityLabel?: string;
  /** Test id. */
  testID?: string;
}
