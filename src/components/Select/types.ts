export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string | string[] | null;
  onValueChange: (value: string | string[]) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  testID?: string;
}
