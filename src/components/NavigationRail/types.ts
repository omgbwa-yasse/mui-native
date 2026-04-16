import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SxProps } from '../../types/shared';

export interface NavigationRailItem {
  /** Icon element to display above label. */
  icon: React.ReactElement;
  /** Destination label. */
  label: string;
  /** Unique value identifying this destination — passed to onChange. */
  value: string | number;
  /** Accessibility label override. Defaults to label value. */
  accessibilityLabel?: string;
  /** Disable this item. */
  disabled?: boolean;
}

export interface NavigationRailProps {
  /** Value of the currently active destination. */
  value?: string | number;
  /** Called when a destination is selected.  Receives the item `value`. */
  onChange?: (value: string | number) => void;
  /** Navigation destinations (2–7 per MD3 spec). */
  items: NavigationRailItem[];
  /**
   * Side of the screen the rail is anchored to.
   * @default 'left'
   */
  position?: 'left' | 'right';
  /**
   * Optional header slot — typically a FAB or a logo.
   * Rendered above the navigation items.
   */
  header?: React.ReactNode;
  /**
   * Whether to show text labels below each icon.
   * @default true
   */
  showLabels?: boolean;
  /** Test id forwarded to the root View. */
  testID?: string;
  /** `sx` style overrides. */
  sx?: SxProps;
  /** Additional style applied to the root View. */
  style?: StyleProp<ViewStyle>;
}
