export interface NumberFieldProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  testID?: string;
  accessibilityLabel?: string;
}
