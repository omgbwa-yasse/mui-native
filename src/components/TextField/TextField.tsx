import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated as RNAnimated,
} from 'react-native';
import type { TextProps, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { Select } from '../Select';
import type { TextFieldProps, TextFieldVariant } from './types';

function createTextFieldStyles(
  colorScheme: ReturnType<typeof useTheme>['theme']['colorScheme'],
  shape: ReturnType<typeof useTheme>['theme']['shape'],
  variant: TextFieldVariant,
  hasError: boolean,
  primaryColor: string,
  fullWidth: boolean,
) {
  const borderColor = hasError ? colorScheme.error : colorScheme.outline;
  const focusBorderColor = hasError ? colorScheme.error : primaryColor;

  const containerBase = {
    borderRadius: variant === 'filled' ? 0 : variant === 'standard' ? 0 : shape.extraSmall,
    minHeight: 56,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 16,
  };

  return StyleSheet.create({
    wrapper: { marginBottom: 4, ...(fullWidth && { width: '100%' }) },
    container:
      variant === 'filled'
        ? {
            ...containerBase,
            backgroundColor: colorScheme.surfaceVariant,
            borderTopStartRadius: shape.extraSmall,
            borderTopEndRadius: shape.extraSmall,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
          }
        : variant === 'standard'
        ? {
            ...containerBase,
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
          }
        : {
            ...containerBase,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor,
          },
    containerFocused:
      variant === 'standard'
        ? { borderBottomWidth: 2, borderBottomColor: focusBorderColor }
        : variant === 'filled'
        ? { borderBottomColor: focusBorderColor, borderBottomWidth: 2 }
        : { borderColor: focusBorderColor, borderWidth: 2 },
    input: {
      color: colorScheme.onSurface,
      fontSize: 16,
      paddingTop: 20,
      paddingBottom: 8,
      minHeight: 56,
    },
    label: {
      position: 'absolute' as const,
      start: 16,
      color: hasError ? colorScheme.error : colorScheme.onSurfaceVariant,
      pointerEvents: 'none' as const,
    },
    supportingText: {
      fontSize: 12,
      marginTop: 4,
      marginStart: 16,
      color: colorScheme.onSurfaceVariant,
    },
    errorText: {
      fontSize: 12,
      marginTop: 4,
      marginStart: 16,
      color: colorScheme.error,
    },
    row: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    iconWrapper: { marginEnd: 8 },
    leadingIcon: { marginEnd: 8 },
    disabledOverlay: {
      opacity: 0.38,
    },
  });
}

export function TextField(rawProps: TextFieldProps): React.ReactElement {
  const props = useComponentDefaults('TextField', rawProps);
  const {
    label,
    value,
    onChangeText,
    variant = 'filled',
    placeholder,
    supportingText,
    helperText,
    error,
    disabled = false,
    trailingIcon,
    leadingIcon,
    secureTextEntry = false,
    keyboardType,
    returnKeyType,
    onBlur,
    onFocus,
    multiline = false,
    rows,
    minRows,
    maxRows,
    fullWidth = false,
    required = false,
    select = false,
    options = [],
    testID,
    accessibilityLabel,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const hasError = Boolean(error);
  const errorText = typeof error === 'string' ? error : undefined;
  const resolvedHelper = helperText ?? errorText ?? supportingText;
  const [focused, setFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState<number | undefined>(undefined);
  const labelAnim = useRef(new RNAnimated.Value(value ? 1 : 0)).current;
  const SlotRoot = slots?.Root ?? View;
  const SlotInput = slots?.Input ?? TextInput;
  const SlotLabel = slots?.Label ?? RNAnimated.Text;
  const SlotSupportingText = (slots?.SupportingText ?? Text) as React.ComponentType<TextProps & { accessibilityRole?: string }>;

  const LINE_HEIGHT = 20;
  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ): void => {
    if (!multiline || rows != null) return;
    let h = e.nativeEvent.contentSize.height;
    if (minRows != null) h = Math.max(h, minRows * LINE_HEIGHT);
    if (maxRows != null) h = Math.min(h, maxRows * LINE_HEIGHT);
    setInputHeight(h);
  };

  const displayLabel = required ? `${label} *` : label;

  const styles = useMemo(
    () => createTextFieldStyles(theme.colorScheme, theme.shape, variant, hasError, theme.colorScheme.primary, fullWidth),
    [theme, variant, hasError, fullWidth],
  );

  const handleFocus = (): void => {
    setFocused(true);
    RNAnimated.timing(labelAnim, { toValue: 1, duration: 150, useNativeDriver: false }).start();
    onFocus?.();
  };

  const handleBlur = (): void => {
    setFocused(false);
    if (!value) {
      RNAnimated.timing(labelAnim, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    }
    onBlur?.();
  };

  const labelTop = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 8] });
  const labelSize = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 12] });

  return (
    <SlotRoot {...slotProps?.Root} style={[styles.wrapper, disabled && styles.disabledOverlay, sxStyle, style, slotProps?.Root?.style]}>
      <View style={[styles.container, focused && styles.containerFocused]}>
        <View style={styles.row}>
          {leadingIcon != null && <View style={styles.leadingIcon}>{leadingIcon}</View>}
          <View style={{ flex: 1 }}>
            <SlotLabel
              {...slotProps?.Label}
              style={[styles.label, { top: labelTop, fontSize: labelSize }, slotProps?.Label?.style]}
              numberOfLines={1}
            >
              {displayLabel}
            </SlotLabel>
            {select ? (
              <Select
                value={value ?? null}
                onValueChange={(v) =>
                  onChangeText?.(Array.isArray(v) ? (v[0] ?? '') : v)
                }
                options={options}
                disabled={disabled}
                testID={testID}
                style={{ flex: 1 }}
              />
            ) : (
              <SlotInput
                value={value}
                onChangeText={onChangeText}
                placeholder={focused ? placeholder : undefined}
                placeholderTextColor={theme.colorScheme.onSurfaceVariant}
                editable={!disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                multiline={multiline}
                numberOfLines={rows != null ? rows : undefined}
                onContentSizeChange={handleContentSizeChange}
                testID={testID}
                accessibilityLabel={accessibilityLabel ?? label}
                accessibilityState={{ disabled }}
                {...slotProps?.Input}
                style={[
                  styles.input,
                  inputHeight != null ? { height: inputHeight } : undefined,
                  slotProps?.Input?.style,
                ]}
              />
            )}
          </View>
          {trailingIcon != null && <View style={styles.iconWrapper}>{trailingIcon}</View>}
        </View>
      </View>
      {resolvedHelper != null ? (
        <SlotSupportingText
          {...slotProps?.SupportingText}
          style={[hasError ? styles.errorText : styles.supportingText, slotProps?.SupportingText?.style]}
          accessibilityRole={hasError ? 'alert' : undefined}
        >
          {resolvedHelper}
        </SlotSupportingText>
      ) : null}
    </SlotRoot>
  );
}
