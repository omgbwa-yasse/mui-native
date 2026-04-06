import React, { memo, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import type { ToggleButtonProps, ToggleButtonGroupProps } from './types';

export const ToggleButton = memo(function ToggleButton(rawProps: ToggleButtonProps) {
  const props = useComponentDefaults('ToggleButton', rawProps as unknown as ToggleButtonGroupProps) as ToggleButtonProps;
  const {
    value,
    disabled = false,
    accessibilityLabel,
    children,
    color,
    sx,
    style,
    testID,
  } = props;
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
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);

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
        sxStyle,
        style,
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
