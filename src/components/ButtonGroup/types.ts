import type React from 'react';

export interface ButtonGroupContextValue {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  count: number;
}

export interface ButtonGroupProps {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  testID?: string;
}
