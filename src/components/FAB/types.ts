import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorProp, SxProps } from '../../types/shared';

export type FABSize = 'small' | 'medium' | 'large';
export type FABVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

export interface FABProps {
  /** Icon element to display. Required. */
  icon: React.ReactElement;
  /** Optional label — renders an extended FAB when provided. */
  label?: string;
  /** Color variant. Defaults to 'primary'. */
  variant?: FABVariant;
  /** Size. Defaults to 'medium'. */
  size?: FABSize;
  /** Press handler. */
  onPress?: () => void;
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Test id. */
  testID?: string;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
