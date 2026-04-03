import type React from 'react';

export interface ToggleButtonGroupContextValue {
  value: string | string[] | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export interface ToggleButtonGroupProps {
  value: string | string[] | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
}

export interface ToggleButtonProps {
  value: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  children: React.ReactNode;
  testID?: string;
}
