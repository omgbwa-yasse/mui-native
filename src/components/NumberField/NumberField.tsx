import React, { memo, useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Text } from '../Text/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { NumberFieldProps } from './types';

function clamp(val: number, min?: number, max?: number): number {
  let result = val;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

function round(val: number, scale: number): number {
  const factor = Math.pow(10, scale);
  return Math.round(val * factor) / factor;
}

export const NumberField = memo(function NumberField({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  decimalScale = 0,
  prefix,
  suffix,
  disabled = false,
  label,
  placeholder,
  testID,
  accessibilityLabel,
}: NumberFieldProps) {
  const { theme } = useTheme();
  const { colorScheme, shape, typography } = theme;

  const [inputText, setInputText] = useState<string>(
    String(round(value, decimalScale))
  );
  const [focused, setFocused] = useState(false);

  function commit(text: string) {
    const parsed = parseFloat(text);
    if (isNaN(parsed)) {
      setInputText(String(round(value, decimalScale)));
    } else {
      const clamped = round(clamp(parsed, min, max), decimalScale);
      setInputText(String(clamped));
      onValueChange(clamped);
    }
  }

  function increment() {
    const next = round(clamp(value + step, min, max), decimalScale);
    setInputText(String(next));
    onValueChange(next);
  }

  function decrement() {
    const next = round(clamp(value - step, min, max), decimalScale);
    setInputText(String(next));
    onValueChange(next);
  }

  const canIncrement = max === undefined || value < max;
  const canDecrement = min === undefined || value > min;

  const borderColor = focused ? colorScheme.primary : colorScheme.outline;

  return (
    <View testID={testID} style={[styles.wrapper, { opacity: disabled ? 0.38 : 1 }]}>
      {label ? (
        <Text
          variant="bodySmall"
          style={[styles.label, { color: colorScheme.onSurfaceVariant }]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.container,
          {
            borderColor,
            borderRadius: shape.extraSmall ?? 4,
            backgroundColor: colorScheme.surface,
          },
        ]}
      >
        {/* Decrement */}
        <Pressable
          onPress={decrement}
          disabled={disabled || !canDecrement}
          accessibilityLabel="Decrement"
          accessibilityRole="button"
          style={[
            styles.stepButton,
            {
              borderRightWidth: 1,
              borderRightColor: colorScheme.outline,
              opacity: !canDecrement ? 0.38 : 1,
            },
          ]}
        >
          <Text
            variant="titleLarge"
            style={{ color: colorScheme.onSurface, lineHeight: 28 }}
          >
            −
          </Text>
        </Pressable>

        {/* Input */}
        <View style={styles.inputRow}>
          {prefix ? (
            <Text
              variant="bodyLarge"
              style={[styles.affix, { color: colorScheme.onSurfaceVariant }]}
            >
              {prefix}
            </Text>
          ) : null}
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              commit(inputText);
            }}
            keyboardType="numeric"
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor={colorScheme.onSurfaceVariant}
            accessibilityRole="spinbutton"
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityValue={{ min, max, now: value }}
            style={[
              styles.input,
              {
                color: colorScheme.onSurface,
                ...typography.bodyLarge,
              },
            ]}
          />
          {suffix ? (
            <Text
              variant="bodyLarge"
              style={[styles.affix, { color: colorScheme.onSurfaceVariant }]}
            >
              {suffix}
            </Text>
          ) : null}
        </View>

        {/* Increment */}
        <Pressable
          onPress={increment}
          disabled={disabled || !canIncrement}
          accessibilityLabel="Increment"
          accessibilityRole="button"
          style={[
            styles.stepButton,
            {
              borderLeftWidth: 1,
              borderLeftColor: colorScheme.outline,
              opacity: !canIncrement ? 0.38 : 1,
            },
          ]}
        >
          <Text
            variant="titleLarge"
            style={{ color: colorScheme.onSurface, lineHeight: 28 }}
          >
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {},
  label: {
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    overflow: 'hidden',
  },
  stepButton: {
    width: 48,
    height: '100%' as unknown as number,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    minHeight: 40,
  },
  affix: {
    paddingHorizontal: 4,
  },
});
