import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { SegmentedButtonsProps } from './types';

const SegmentedButtons = memo(function SegmentedButtons(rawProps: SegmentedButtonsProps) {
  const props = useComponentDefaults('SegmentedButtons', rawProps);
  const {
    value,
    onValueChange,
    buttons,
    multiSelect = false,
    density = 'regular',
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const isSelected = (v: string) =>
    Array.isArray(value) ? value.includes(v) : value === v;

  const handlePress = (v: string) => {
    if (multiSelect && Array.isArray(value)) {
      const next = isSelected(v)
        ? value.filter((x) => x !== v)
        : [...value, v];
      onValueChange(next);
    } else {
      onValueChange(v);
    }
  };

  const height = density === 'dense' ? 36 : 40;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: height / 2,
      borderWidth: 1,
      borderColor: theme.colorScheme.outline,
      overflow: 'hidden',
    },
    divider: {
      width: 1,
      backgroundColor: theme.colorScheme.outline,
    },
    button: {
      flex: 1,
      height,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
  });

  return (
    <View
      style={[styles.container, sxStyle, style]}
      accessibilityRole={multiSelect ? undefined : 'radiogroup'}
      accessible={!multiSelect}
      testID={testID}
    >
      {buttons.map((btn, idx) => {
        const selected = isSelected(btn.value);
        return (
          <React.Fragment key={btn.value}>
            {idx > 0 && <View style={styles.divider} />}
            <TouchableRipple
              onPress={btn.disabled ? undefined : () => handlePress(btn.value)}
              disabled={btn.disabled}
              accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
              accessibilityLabel={btn.label}
              accessibilityState={{ checked: selected, disabled: btn.disabled }}
            >
              <View
                style={[
                  styles.button,
                  selected && {
                    backgroundColor: theme.colorScheme.secondaryContainer,
                  },
                ]}
              >
                {btn.icon}
                {btn.label != null && (
                  <Text
                    variant="labelLarge"
                    color={
                      selected
                        ? theme.colorScheme.onSecondaryContainer
                        : theme.colorScheme.onSurface
                    }
                  >
                    {btn.label}
                  </Text>
                )}
              </View>
            </TouchableRipple>
          </React.Fragment>
        );
      })}
    </View>
  );
});

export { SegmentedButtons };
