// RN-DEVIATION: No MD3 equivalent for segmented numeric OTP input; follows MD3 TextField
// interaction pattern (outlined text input, ripple feedback) applied to 7 discrete segments.

import React, { useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { CodeInputProps } from './types';

export type { CodeInputProps } from './types';

const SEGMENT_COUNT = 7;

export function CodeInput(rawProps: CodeInputProps) {
  const props = useComponentDefaults('CodeInput', rawProps);
  const { color, sx, style, value, onChange, disabled = false } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const inputRefs = useRef<Array<TextInput | null>>(
    Array.from({ length: SEGMENT_COUNT }, () => null),
  );

  const segments = value.padEnd(SEGMENT_COUNT, '').split('').slice(0, SEGMENT_COUNT);

  const handleChange = useCallback(
    (index: number, char: string) => {
      const digit = char.replace(/\D/g, '').slice(-1);
      const newValue = segments
        .map((s, i) => (i === index ? digit : s))
        .join('')
        .trimEnd();
      onChange(newValue);

      if (digit && index < SEGMENT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [segments, onChange],
  );

  const handleKeyPress = useCallback(
    (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === 'Backspace' && !segments[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [segments],
  );

  return (
    <View style={[styles.row, sxStyle, style]} accessibilityRole="none">
      {segments.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          style={[
            styles.cell,
            {
              borderColor: digit
                ? bg
                : theme.colorScheme.outline,
              color: theme.colorScheme.onSurface,
              backgroundColor: theme.colorScheme.surface,
            },
          ]}
          value={digit}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={(e) => handleKeyPress(index, e)}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          accessibilityLabel={`Digit ${index + 1} of ${SEGMENT_COUNT}`}
          accessibilityRole="none"
          testID={`code-input-digit-${index}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  cell: {
    width: 48,
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
});
