import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle, TextInputProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface SearchbarSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Input: React.ComponentType<TextInputProps>;
}

export interface SearchbarProps extends SlotPropsConfig<SearchbarSlots> {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onClearIconPress?: () => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  /** Leading icon (default is a magnifying glass) */
  icon?: React.ReactElement;
  /** Trailing icon (default is a clear cross) */
  clearIcon?: React.ReactElement;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
