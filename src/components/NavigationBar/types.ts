import type React from 'react';

export interface NavigationBarItem {
  /** Icon element to display above label. */
  icon: React.ReactElement;
  /** Navigation item label. */
  label: string;
  /** Called when this item is tapped. */
  onPress: () => void;
  /** Accessibility label override. Defaults to label value. */
  accessibilityLabel?: string;
}

export interface NavigationBarProps {
  /** Index of the currently active destination. */
  activeIndex: number;
  /** Navigation destinations (max 5 per MD3 spec). */
  items: NavigationBarItem[];
  /** Test id. */
  testID?: string;
}
