import type { ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'primary' | 'secondary';
  scrollable?: boolean;
  children?: (activeValue: string) => ReactNode;
  testID?: string;
}

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}
