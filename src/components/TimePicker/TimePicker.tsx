import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useLocalizationOptional } from '../DatePicker/useLocalization';
import { createDatePickerStyles } from '../DatePicker/DatePicker.styles';
import type { TimePickerProps } from './types';

// Optional peer dependency
let RNDateTimePicker: React.ComponentType<{
  value: Date;
  mode: 'time';
  display?: string;
  onChange: (event: unknown, date?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  is24Hour?: boolean;
  locale?: string;
  testID?: string;
}> | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  RNDateTimePicker =
    require('@react-native-community/datetimepicker').default ?? null;
} catch {
  // Peer dep not installed
}

/**
 * TimePicker — modal time selection backed by the native OS time picker.
 * Requires the optional peer dependency `@react-native-community/datetimepicker`.
 */
export const TimePicker = React.memo(function TimePicker({
  value,
  defaultValue,
  onChange,
  onAccept,
  label,
  disabled = false,
  readOnly = false,
  minTime,
  maxTime,
  ampm,
  views: _views,
  format,
  open: controlledOpen,
  onOpen,
  onClose,
  slotProps,
  testID,
  style,
  accessibilityLabel,
}: TimePickerProps) {
  const { theme } = useTheme();
  const localization = useLocalizationOptional();
  const styles = useMemo(() => createDatePickerStyles(theme), [theme]);

  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(
    value !== undefined ? (value ?? null) : (defaultValue ?? null),
  );
  const currentDate = isControlled ? (value ?? null) : internalDate;

  const isOpenControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled ? (controlledOpen ?? false) : internalOpen;

  const pendingDateRef = useRef<Date | null>(currentDate);

  const effectiveFormat = format ?? localization.formats.fullTime;
  const displayValue = useMemo(() => {
    if (!currentDate) return null;
    return localization.adapter.format(currentDate, effectiveFormat);
  }, [currentDate, localization.adapter, effectiveFormat]);

  // Derive is24Hour from ampm prop or device locale
  const is24Hour = ampm !== undefined ? !ampm : undefined;

  const openPicker = useCallback(() => {
    if (disabled || readOnly) return;
    pendingDateRef.current = currentDate ?? new Date();
    if (!isOpenControlled) setInternalOpen(true);
    onOpen?.();
  }, [disabled, readOnly, currentDate, isOpenControlled, onOpen]);

  const handleClose = useCallback(() => {
    if (!isOpenControlled) setInternalOpen(false);
    onClose?.();
  }, [isOpenControlled, onClose]);

  const handleChange = useCallback(
    (event: unknown, date?: Date) => {
      if (Platform.OS === 'android') {
        handleClose();
        if (date) {
          if (!isControlled) setInternalDate(date);
          onChange?.(date);
          onAccept?.(date);
        }
      } else {
        const updated = date ?? null;
        pendingDateRef.current = updated;
        onChange?.(updated);
      }
    },
    [handleClose, isControlled, onChange, onAccept],
  );

  const handleIOSConfirm = useCallback(() => {
    const confirmed = pendingDateRef.current;
    if (!isControlled) setInternalDate(confirmed);
    onAccept?.(confirmed);
    handleClose();
  }, [isControlled, onAccept, handleClose]);

  const slotError = slotProps?.textField?.error ?? false;

  return (
    <View style={[style]} testID={testID}>
      <Pressable
        onPress={openPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? 'Time picker'}
        accessibilityState={{ disabled }}
        testID={slotProps?.textField?.testID}
      >
        <View
          style={[
            styles.triggerContainer,
            slotError && styles.triggerContainerError,
            disabled && styles.triggerContainerDisabled,
            slotProps?.textField?.style as StyleProp<ViewStyle>,
          ]}
        >
          {label ? (
            <Text
              style={[
                styles.labelFloating,
                slotError && styles.labelFloatingError,
              ]}
            >
              {label}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                displayValue ? styles.valueText : styles.placeholderText,
                disabled && styles.disabledText,
              ]}
              numberOfLines={1}
            >
              {displayValue ?? effectiveFormat}
            </Text>
            <Text style={styles.trailingIcon}>🕐</Text>
          </View>
        </View>
      </Pressable>

      {isOpen ? (
        Platform.OS === 'ios' ? (
          <Modal
            transparent
            animationType="slide"
            visible={isOpen}
            onRequestClose={handleClose}
          >
            <View style={styles.modalOverlay}>
              <View
                style={{
                  backgroundColor: theme.colorScheme.surface,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                }}
              >
                {RNDateTimePicker ? (
                  <RNDateTimePicker
                    value={pendingDateRef.current ?? new Date()}
                    mode="time"
                    display="spinner"
                    onChange={handleChange}
                    minimumDate={minTime}
                    maximumDate={maxTime}
                    is24Hour={is24Hour}
                    locale={localization.locale}
                    testID={`${testID ?? 'timepicker'}-native`}
                  />
                ) : (
                  <Text style={styles.valueText}>
                    Install @react-native-community/datetimepicker to enable
                    native time selection.
                  </Text>
                )}
                <Pressable
                  onPress={handleIOSConfirm}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm time selection"
                  style={{ alignSelf: 'flex-end', padding: 12 }}
                >
                  <Text
                    style={{
                      ...theme.typography.labelLarge,
                      color: theme.colorScheme.primary,
                    }}
                  >
                    OK
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : RNDateTimePicker ? (
          <RNDateTimePicker
            value={pendingDateRef.current ?? new Date()}
            mode="time"
            display="default"
            onChange={handleChange}
            minimumDate={minTime}
            maximumDate={maxTime}
            is24Hour={is24Hour}
            locale={localization.locale}
            testID={`${testID ?? 'timepicker'}-native`}
          />
        ) : null
      ) : null}
    </View>
  );
});
