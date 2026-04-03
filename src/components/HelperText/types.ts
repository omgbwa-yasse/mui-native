import type React from 'react';

export interface HelperTextProps {
  type: 'normal' | 'error' | 'info';
  visible?: boolean;
  padding?: 'normal' | 'none';
  children: React.ReactNode;
  testID?: string;
}
