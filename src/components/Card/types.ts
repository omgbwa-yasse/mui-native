/**
 * MD3 Card component props.
 * https://m3.material.io/components/cards
 */
import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface CardSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
}

export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps extends SlotPropsConfig<CardSlots> {
  /** Card visual style. Defaults to 'elevated'. */
  variant?: CardVariant;
  /** Content rendered inside the card. */
  children: React.ReactNode;
  /** Optional press handler — makes the card interactive. */
  onPress?: () => void;
  /** Accessibility label. */
  accessibilityLabel?: string;
  /** Test id. */
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
