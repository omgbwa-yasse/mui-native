import type { StyleProp, ViewStyle } from 'react-native';
import type { TextFieldSlotProps } from '../DatePicker/types';

export interface TimePickerProps {
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
  minTime?: Date;
  maxTime?: Date;
  /** 12 h (true) or 24 h (false). Default: derived from device locale. */
  ampm?: boolean;
  /**
   * @RN-DEVIATION Native time picker supports 'hours' | 'minutes' only.
   * Passing 'seconds' is silently ignored on both platforms.
   * default: ['hours', 'minutes']
   */
  views?: Array<'hours' | 'minutes' | 'seconds'>;
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  slotProps?: {
    textField?: Partial<TextFieldSlotProps>;
  };
}
