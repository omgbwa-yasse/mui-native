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
import { useLocalizationOptional } from '../DatePicker/useLocalization';
import { createDatePickerStyles } from '../DatePicker/DatePicker.styles';
import type { DateTimePickerProps } from './types';

// Optional peer dependency
let RNDateTimePicker: React.ComponentType<{
  value: Date;
  mode: 'date' | 'time' | 'datetime';
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
 * DateTimePicker — combined date + time selection using native OS pickers.
 * Android shows a sequential date-then-time modal session.
 * iOS shows both selectors in a single modal using 'datetime' mode.
 *
 * Requires the optional peer dependency `@react-native-community/datetimepicker`.
 */
export const DateTimePicker = React.memo(function DateTimePicker(rawProps: DateTimePickerProps) {
  const props = useComponentDefaults('DateTimePicker', rawProps);
  const {
    value,
    defaultValue,
    onChange,
    onAccept,
    label,
    disabled = false,
    readOnly = false,
    minDate,
    maxDate,
    minDateTime,
    maxDateTime,
    disableFuture,
    disablePast,
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
    sx,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
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

  // Android: two-step flow — first date, then time
  const [androidStep, setAndroidStep] = useState<'date' | 'time'>('date');

  const effectiveFormat = format ?? localization.formats.fullDateTime;
  const displayValue = useMemo(() => {
    if (!currentDate) return null;
    return localization.adapter.format(currentDate, effectiveFormat);
  }, [currentDate, localization.adapter, effectiveFormat]);

  const is24Hour = ampm !== undefined ? !ampm : undefined;

  const resolvedMin = minDateTime ?? minDate;
  const resolvedMax = maxDateTime ?? maxDate;

  const effectiveMin = useMemo(() => {
    if (disablePast) {
      const now = new Date();
      return resolvedMin && resolvedMin > now ? resolvedMin : now;
    }
    return resolvedMin;
  }, [disablePast, resolvedMin]);

  const effectiveMax = useMemo(() => {
    if (disableFuture) {
      const now = new Date();
      return resolvedMax && resolvedMax < now ? resolvedMax : now;
    }
    return resolvedMax;
  }, [disableFuture, resolvedMax]);

  const openPicker = useCallback(() => {
    if (disabled || readOnly) return;
    pendingDateRef.current = currentDate ?? new Date();
    if (Platform.OS === 'android') setAndroidStep('date');
    if (!isOpenControlled) setInternalOpen(true);
    onOpen?.();
  }, [disabled, readOnly, currentDate, isOpenControlled, onOpen]);

  const handleClose = useCallback(() => {
    if (!isOpenControlled) setInternalOpen(false);
    onClose?.();
  }, [isOpenControlled, onClose]);

  const handleAndroidChange = useCallback(
    (event: unknown, date?: Date) => {
      if (!date) {
        // User dismissed
        handleClose();
        return;
      }
      if (androidStep === 'date') {
        // Merge selected date with current time portion
        const pending = pendingDateRef.current ?? new Date();
        const merged = new Date(date);
        merged.setHours(pending.getHours(), pending.getMinutes(), 0, 0);
        pendingDateRef.current = merged;
        setAndroidStep('time');
      } else {
        // Time step — merge time into pending date
        const pending = pendingDateRef.current ?? new Date();
        const merged = new Date(pending);
        merged.setHours(date.getHours(), date.getMinutes(), 0, 0);
        const final = merged;
        handleClose();
        if (!isControlled) setInternalDate(final);
        onChange?.(final);
        onAccept?.(final);
      }
    },
    [androidStep, handleClose, isControlled, onChange, onAccept],
  );

  const handleIOSChange = useCallback(
    (event: unknown, date?: Date) => {
      const updated = date ?? null;
      pendingDateRef.current = updated;
      onChange?.(updated);
    },
    [onChange],
  );

  const handleIOSConfirm = useCallback(() => {
    const confirmed = pendingDateRef.current;
    if (!isControlled) setInternalDate(confirmed);
    onAccept?.(confirmed);
    handleClose();
  }, [isControlled, onAccept, handleClose]);

  const slotError = slotProps?.textField?.error ?? false;

  return (
    <View style={[sxStyle, style]} testID={testID}>
      <Pressable
        onPress={openPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? 'Date and time picker'}
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
            <Text style={styles.trailingIcon}>📅</Text>
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
                    mode="datetime"
                    display="spinner"
                    onChange={handleIOSChange}
                    minimumDate={effectiveMin}
                    maximumDate={effectiveMax}
                    is24Hour={is24Hour}
                    locale={localization.locale}
                    testID={`${testID ?? 'datetimepicker'}-native`}
                  />
                ) : (
                  <Text style={styles.valueText}>
                    Install @react-native-community/datetimepicker to enable
                    native date/time selection.
                  </Text>
                )}
                <Pressable
                  onPress={handleIOSConfirm}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm date and time selection"
                  style={{ alignSelf: 'flex-end', padding: 12 }}
                >
                  <Text
                    style={{
                      ...theme.typography.labelLarge,
                      color: bg,
                    }}
                  >
                    OK
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : RNDateTimePicker ? (
          // Android: sequential date → time modal
          <RNDateTimePicker
            value={pendingDateRef.current ?? new Date()}
            mode={androidStep}
            display="default"
            onChange={handleAndroidChange}
            minimumDate={effectiveMin}
            maximumDate={effectiveMax}
            is24Hour={is24Hour}
            locale={localization.locale}
            testID={`${testID ?? 'datetimepicker'}-native-${androidStep}`}
          />
        ) : null
      ) : null}
    </View>
  );
});
