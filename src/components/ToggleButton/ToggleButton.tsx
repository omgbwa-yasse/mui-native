import React, { memo, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { useTheme } from '../../theme/ThemeContext';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import type { ToggleButtonProps } from './types';

export const ToggleButton = memo(function ToggleButton({
  value,
  disabled = false,
  accessibilityLabel,
  children,
  testID,
}: ToggleButtonProps) {
  const { theme } = useTheme();
  const group = useContext(ToggleButtonGroupContext);

  const isSelected = group
    ? Array.isArray(group.value)
      ? group.value.includes(value)
      : group.value === value
    : false;

  const isDisabled = disabled || (group?.disabled ?? false);

  function handlePress() {
    if (!isDisabled && group) {
      group.onValueChange(value);
    }
  }

  const { colorScheme } = theme;

  return (
    <TouchableRipple
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? colorScheme.secondaryContainer
            : 'transparent',
          borderRadius: theme.shape.small ?? 4,
          opacity: isDisabled ? 0.38 : 1,
        },
      ]}
    >
      <>{children}</>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  container: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
