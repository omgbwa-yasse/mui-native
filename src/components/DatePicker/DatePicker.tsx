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
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useLocalizationOptional } from './useLocalization';
import { createDatePickerStyles } from './DatePicker.styles';
import type { DatePickerProps } from './types';

// Optional peer dependency — gracefully degrade if not installed
let RNDateTimePicker: React.ComponentType<{
  value: Date;
  mode: 'date';
  display?: string;
  onChange: (event: unknown, date?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  locale?: string;
  testID?: string;
}> | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  RNDateTimePicker =
    require('@react-native-community/datetimepicker').default ?? null;
} catch {
  // Peer dep not installed — the picker will show a placeholder message
}

function resolveEffectiveDate(
  value: Date | null | undefined,
  defaultValue: Date | null | undefined,
): Date | null {
  if (value !== undefined) return value ?? null;
  if (defaultValue !== undefined) return defaultValue ?? null;
  return null;
}

/**
 * DatePicker — modal date selection backed by the native OS date picker.
 * Requires the optional peer dependency `@react-native-community/datetimepicker`.
 */
export const DatePicker = React.memo(function DatePicker(rawProps: DatePickerProps) {
  const props = useComponentDefaults('DatePicker', rawProps) as DatePickerProps;
  const {
    value,
    defaultValue,
    onChange,
    onAccept,
    label,
    placeholder,
    disabled = false,
    readOnly = false,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    views: _views,
    format,
    open: controlledOpen,
    onOpen,
    onClose,
    display = 'default',
    slotProps,
    testID,
    style,
    accessibilityLabel,
    sx,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const localization = useLocalizationOptional();
  const styles = useMemo(() => createDatePickerStyles(theme, theme.colorScheme.primary), [theme]);

  // Uncontrolled internal state for the date value
  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(
    resolveEffectiveDate(value, defaultValue),
  );
  const currentDate = isControlled ? (value ?? null) : internalDate;

  // Open state
  const isOpenControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled ? (controlledOpen ?? false) : internalOpen;

  // Pending date used while the picker is open (Android commits on confirm)
  const pendingDateRef = useRef<Date | null>(currentDate);

  const effectiveFormat = format ?? localization.formats.fullDate;
  const displayValue = useMemo(() => {
    if (!currentDate) return null;
    return localization.adapter.format(currentDate, effectiveFormat);
  }, [currentDate, localization.adapter, effectiveFormat]);

  const open = useCallback(() => {
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
        // Android: picker auto-closes on confirm or cancel
        handleClose();
        if (date) {
          if (!isControlled) setInternalDate(date);
          onChange?.(date);
          onAccept?.(date);
        }
      } else {
        // iOS: picker stays open — onChange fires on each tick
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

  const resolvedMinDate = useMemo(() => {
    if (disablePast) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return minDate && minDate > today ? minDate : today;
    }
    return minDate;
  }, [disablePast, minDate]);

  const resolvedMaxDate = useMemo(() => {
    if (disableFuture) {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return maxDate && maxDate < today ? maxDate : today;
    }
    return maxDate;
  }, [disableFuture, maxDate]);

  const slotError = slotProps?.textField?.error ?? false;
  const helperText = slotProps?.textField?.helperText;

  return (
    <View style={[sxStyle, style]} testID={testID}>
      {/* Trigger */}
      <Pressable
        onPress={open}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? 'Date picker'}
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
              {displayValue ??
                (placeholder ??
                  slotProps?.textField?.placeholder ??
                  effectiveFormat)}
            </Text>
            <Text style={styles.trailingIcon}>📅</Text>
          </View>
        </View>
      </Pressable>

      {helperText ? (
        <Text
          style={[styles.helperText, slotError && styles.helperTextError]}
        >
          {helperText}
        </Text>
      ) : null}

      {/* Picker modal */}
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
                    mode="date"
                    display={display}
                    onChange={handleChange}
                    minimumDate={resolvedMinDate}
                    maximumDate={resolvedMaxDate}
                    locale={localization.locale}
                    testID={`${testID ?? 'datepicker'}-native`}
                  />
                ) : (
                  <Text style={styles.valueText}>
                    Install @react-native-community/datetimepicker to enable
                    native date selection.
                  </Text>
                )}
                <Pressable
                  onPress={handleIOSConfirm}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm date selection"
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
            mode="date"
            display={display}
            onChange={handleChange}
            minimumDate={resolvedMinDate}
            maximumDate={resolvedMaxDate}
            locale={localization.locale}
            testID={`${testID ?? 'datepicker'}-native`}
          />
        ) : null
      ) : null}
    </View>
  );
});
