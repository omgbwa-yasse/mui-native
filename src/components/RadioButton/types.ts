import type React from 'react';

export interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
}

export interface RadioButtonProps {
  value: string;
  disabled?: boolean;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}
