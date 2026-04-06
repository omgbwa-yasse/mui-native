import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SizeProvider } from '../ButtonGroup/SizeContext';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import type { ToggleButtonGroupProps } from './types';

export function ToggleButtonGroup({
  value,
  onValueChange,
  multiple = false,
  disabled = false,
  size,
  children,
  testID,
}: ToggleButtonGroupProps) {
  function handleValueChange(clickedValue: string) {
    if (multiple) {
      const current = Array.isArray(value) ? value : value ? [value] : [];
      const next = current.includes(clickedValue)
        ? current.filter(v => v !== clickedValue)
        : [...current, clickedValue];
      onValueChange(next);
    } else {
      onValueChange(clickedValue);
    }
  }

  return (
    <ToggleButtonGroupContext.Provider value={{ value, onValueChange: handleValueChange, disabled }}>
      <SizeProvider value={size ?? 'medium'}>
        <View style={styles.row} testID={testID}>
          {children}
        </View>
      </SizeProvider>
    </ToggleButtonGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
