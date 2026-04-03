import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated as RNAnimated,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { TextFieldProps, TextFieldVariant } from './types';

function createTextFieldStyles(
  colorScheme: ReturnType<typeof useTheme>['theme']['colorScheme'],
  shape: ReturnType<typeof useTheme>['theme']['shape'],
  variant: TextFieldVariant,
  hasError: boolean,
) {
  const borderColor = hasError ? colorScheme.error : colorScheme.outline;
  const focusBorderColor = hasError ? colorScheme.error : colorScheme.primary;

  const containerBase = {
    borderRadius: variant === 'filled' ? 0 : shape.extraSmall,
    minHeight: 56,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 16,
  };

  return StyleSheet.create({
    wrapper: { marginBottom: 4 },
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
        : {
            ...containerBase,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor,
          },
    containerFocused: {
      borderBottomColor: focusBorderColor,
      borderColor: focusBorderColor,
      borderBottomWidth: variant === 'filled' ? 2 : undefined,
      borderWidth: variant === 'outlined' ? 2 : undefined,
    },
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

export function TextField({
  label,
  value,
  onChangeText,
  variant = 'filled',
  placeholder,
  supportingText,
  error,
  disabled = false,
  trailingIcon,
  leadingIcon,
  secureTextEntry = false,
  keyboardType,
  returnKeyType,
  onBlur,
  onFocus,
  testID,
  accessibilityLabel,
}: TextFieldProps): React.ReactElement {
  const { theme } = useTheme();
  const hasError = Boolean(error);
  const [focused, setFocused] = useState(false);
  const labelAnim = useRef(new RNAnimated.Value(value ? 1 : 0)).current;

  const styles = useMemo(
    () => createTextFieldStyles(theme.colorScheme, theme.shape, variant, hasError),
    [theme, variant, hasError],
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
    <View style={[styles.wrapper, disabled && styles.disabledOverlay]}>
      <View style={[styles.container, focused && styles.containerFocused]}>
        <View style={styles.row}>
          {leadingIcon != null && <View style={styles.leadingIcon}>{leadingIcon}</View>}
          <View style={{ flex: 1 }}>
            <RNAnimated.Text
              style={[styles.label, { top: labelTop, fontSize: labelSize }]}
              numberOfLines={1}
            >
              {label}
            </RNAnimated.Text>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={styles.input}
              placeholder={focused ? placeholder : undefined}
              placeholderTextColor={theme.colorScheme.onSurfaceVariant}
              editable={!disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              testID={testID}
              accessibilityLabel={accessibilityLabel ?? label}
              accessibilityState={{ disabled }}
            />
          </View>
          {trailingIcon != null && <View style={styles.iconWrapper}>{trailingIcon}</View>}
        </View>
      </View>
      {error != null && error.length > 0 ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : supportingText != null ? (
        <Text style={styles.supportingText}>{supportingText}</Text>
      ) : null}
    </View>
  );
}
