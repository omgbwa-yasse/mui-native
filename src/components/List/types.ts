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

// ─── New MUI-aligned sub-component prop types ─────────────────────────────────

export interface ListItemButtonProps extends ViewProps {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  /** If true, compact vertical padding */
  dense?: boolean;
  /** Vertical alignment of children */
  alignItems?: 'flex-start' | 'center';
  disableRipple?: boolean;
  children?: ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface ListItemIconProps extends ViewProps {
  children?: ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemAvatarProps extends ViewProps {
  children?: ReactNode;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemTextProps extends ViewProps {
  primary?: ReactNode;
  secondary?: ReactNode;
  /** Props applied to the primary typography element */
  primaryTypographyProps?: object;
  /** Props applied to the secondary typography element */
  secondaryTypographyProps?: object;
  /** If true, primary/secondary are rendered as-is without Typography wrappers */
  disableTypography?: boolean;
  /** If true, indented to align with list items that have a leading element */
  inset?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

export interface ListSubheaderProps extends ViewProps {
  children?: ReactNode;
  /** Color variant */
  color?: 'default' | 'primary' | 'inherit';
  /** Removes left/right gutters */
  disableGutters?: boolean;
  /** Indented to align with inset items */
  inset?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
