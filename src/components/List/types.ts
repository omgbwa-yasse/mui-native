import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface ListSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
}

export interface ListProps extends SlotPropsConfig<ListSlots> {
  children?: ReactNode;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
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
