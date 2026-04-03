import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import type { ToggleButtonGroupProps } from './types';

export function ToggleButtonGroup({
  value,
  onValueChange,
  disabled = false,
  children,
  testID,
}: ToggleButtonGroupProps) {
  return (
    <ToggleButtonGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <View style={styles.row} testID={testID}>
        {children}
      </View>
    </ToggleButtonGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
