import type { StyleProp, ViewStyle } from 'react-native';
import type { TextFieldSlotProps } from '../DatePicker/types';

export interface DateTimePickerProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  /** Fires only when the user confirms selection — not on each picker tick. */
  onAccept?: (date: Date | null) => void;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Overrides minDate when time precision matters. */
  minDateTime?: Date;
  /** Overrides maxDate when time precision matters. */
  maxDateTime?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  /** 12 h (true) or 24 h (false). Default: derived from device locale. */
  ampm?: boolean;
  /**
   * @RN-DEVIATION Restricted to native-supported combinations.
   * Android shows separate date → time steps in a sequential modal session.
   */
  views?: Array<'day' | 'month' | 'year' | 'hours' | 'minutes'>;
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  slotProps?: {
    textField?: Partial<TextFieldSlotProps>;
  };
}
