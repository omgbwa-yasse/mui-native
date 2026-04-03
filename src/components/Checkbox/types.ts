export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps {
  status: CheckboxStatus;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}
