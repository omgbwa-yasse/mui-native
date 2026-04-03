import type { ReactNode } from 'react';

export interface ListProps {
  children?: ReactNode;
  testID?: string;
}

export interface ListItemProps {
  title: string;
  description?: string;
  left?: (props: { color: string }) => ReactNode;
  right?: (props: { color: string }) => ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  testID?: string;
}

export interface ListSectionProps {
  title?: string;
  children?: ReactNode;
  testID?: string;
}

export interface ListAccordionProps {
  title: string;
  description?: string;
  left?: (props: { color: string }) => ReactNode;
  right?: (props: { color: string }) => ReactNode;
  expanded?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  children: ReactNode;
  testID?: string;
}
