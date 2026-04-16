import type {
  VirtualizedListProps as RNVirtualizedListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { SxProps } from '../../types/shared';

export interface VirtualizedListProps<T>
  extends Omit<RNVirtualizedListProps<T>, 'style' | 'contentContainerStyle'> {
  /** MUI-native sx styling for the outer list container */
  sx?: SxProps;
  /** Override the outer list style */
  style?: StyleProp<ViewStyle>;
  /** MUI-native sx styling for the inner content container */
  contentSx?: SxProps;
  /** Override the content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * Non-generic alias used by ComponentPropsMap.
 * Components using VirtualizedList<T> should use VirtualizedListProps<T> directly.
 */
export type VirtualizedListBaseProps = VirtualizedListProps<unknown>;
