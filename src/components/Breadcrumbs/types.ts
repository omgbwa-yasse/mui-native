import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  testID?: string;
}
