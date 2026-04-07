import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

export interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  /** MUI-aligned callback: (event, value) => void */
  onChange?: (event: unknown, value: string) => void;
  disabled?: boolean;
  /** Optional name for the radio group form element */
  name?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Arrange radio buttons in a horizontal row */
  row?: boolean;
  children: React.ReactNode;
  testID?: string;
}

export interface RadioButtonProps {
  value: string;
  disabled?: boolean;
  color?: string;
  size?: SizeProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

/** MUI-aligned Radio props */
export interface RadioProps extends RadioButtonProps {
  /** MUI-aligned callback called with (event, checked) */
  onChange?: (event: unknown, checked: boolean) => void;
  /** Controlled checked state */
  checked?: boolean;
}
