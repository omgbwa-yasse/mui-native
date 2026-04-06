import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

// ─── Base ──────────────────────────────────────────────────────────────────────

export interface PickerBaseProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}

// ─── DateAdapter ──────────────────────────────────────────────────────────────

/**
 * Minimal date-adapter interface. The built-in IntlDateAdapter is used
 * when no dateAdapter prop is provided via LocalizationProvider.
 */
export interface DateAdapter<TDate = Date> {
  format(date: TDate, formatStr: string): string;
  parse(value: string, formatStr: string): TDate | null;
  isValid(value: TDate | null): boolean;
  isBefore(a: TDate, b: TDate): boolean;
  isAfter(a: TDate, b: TDate): boolean;
}

// ─── LocalizationProvider ─────────────────────────────────────────────────────

export interface LocalizationContextValue {
  locale: string;
  adapter: DateAdapter<Date>;
  formats: {
    fullDate: string;
    fullTime: string;
    fullDateTime: string;
  };
}

export interface LocalizationProviderProps {
  children: React.ReactNode;
  locale?: string;
  dateAdapter?: DateAdapter;
  dateFormats?: {
    fullDate?: string;
    fullTime?: string;
    fullDateTime?: string;
  };
}

// ─── Slots ────────────────────────────────────────────────────────────────────

export interface TextFieldSlotProps {
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

export interface DatePickerProps extends PickerBaseProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  /** Fires only when the user confirms selection — not on each picker tick. */
  onAccept?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  /**
   * @RN-DEVIATION Native OS date picker supports 'day' | 'month' | 'year' only.
   * default: ['day', 'month', 'year']
   */
  views?: Array<'day' | 'month' | 'year'>;
  /** Display format passed to the active DateAdapter. Overrides LocalizationProvider. */
  format?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  /**
   * @RN-DEVIATION iOS only. Controls native picker presentation style.
   * Ignored on Android (always uses the system dialog).
   * default: 'default'
   */
  display?: 'default' | 'spinner' | 'compact' | 'inline';
  slotProps?: {
    textField?: Partial<TextFieldSlotProps>;
  };
}

export interface PickerValidationProps {
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export type PickerSlots = {
  textField?: Partial<TextFieldSlotProps>;
};

export type MaybeDate = Date | null | undefined;
