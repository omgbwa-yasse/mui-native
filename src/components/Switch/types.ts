export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}
