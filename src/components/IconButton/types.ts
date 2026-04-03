import type { IconSource } from '../Icon/types';

export interface IconButtonProps {
  icon: IconSource;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  variant?: 'standard' | 'filled' | 'filled-tonal' | 'outlined';
  size?: number;
  accessibilityLabel: string;
  testID?: string;
}
