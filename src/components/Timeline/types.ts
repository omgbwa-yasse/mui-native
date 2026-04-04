import type { StyleProp, ViewStyle } from 'react-native';

export type TimelinePosition = 'left' | 'right' | 'alternate';

export interface TimelineProps {
  /**
   * Determines which side of the separator content appears.
   * 'alternate' flips layout for every other item.
   * @default 'right'
   */
  position?: TimelinePosition;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TimelineItemProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TimelineSeparatorProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export type TimelineDotVariant = 'filled' | 'outlined';
export type TimelineDotColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'grey';

export interface TimelineDotProps {
  /** @default 'filled' */
  variant?: TimelineDotVariant;
  /** @default 'grey' */
  color?: TimelineDotColor;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TimelineConnectorProps {
  style?: StyleProp<ViewStyle>;
}

export interface TimelineContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TimelineOppositeContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Context value provided by Timeline to its children */
export interface TimelineContextValue {
  position: TimelinePosition;
  registerItem: () => number;
}
