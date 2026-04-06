import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface TimelineSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
}

export type TimelinePosition = 'left' | 'right' | 'alternate';

export interface TimelineProps extends SlotPropsConfig<TimelineSlots> {
  /**
   * Determines which side of the separator content appears.
   * 'alternate' flips layout for every other item.
   * @default 'right'
   */
  position?: TimelinePosition;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
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
