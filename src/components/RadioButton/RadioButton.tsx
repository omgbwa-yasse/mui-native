import React, { memo, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { RadioButtonContext } from './RadioButtonContext';
import type { RadioButtonProps, RadioGroupProps, RadioProps } from './types';

const CONTROL_SIZES = { small: 16, medium: 20, large: 24 } as const;
const ANIM_DURATION = 150;

const RadioButton = memo(function RadioButton(rawProps: RadioButtonProps) {
  const props = useComponentDefaults('RadioButton', rawProps as unknown as RadioGroupProps) as RadioProps;
  const {
    value,
    disabled: propDisabled = false,
    size,
    sx,
    style,
    testID,
    accessibilityLabel,
    onChange,
    checked: checkedProp,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();
  const group = useContext(RadioButtonContext);

  const outer = CONTROL_SIZES[size ?? 'medium'];
  const inner = Math.round(outer / 2);

  const isSelected = checkedProp !== undefined ? checkedProp : (group ? group.value === value : false);
  const disabled = propDisabled || (group?.disabled ?? false);
  const resolvedColor = color ?? theme.colorScheme.primary;
  const disabledColor = theme.colorScheme.onSurface + '61';

  const scale = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    if (reduceMotion.value) {
      scale.value = isSelected ? 1 : 0;
    } else {
      scale.value = withTiming(isSelected ? 1 : 0, { duration: ANIM_DURATION });
    }
  }, [isSelected, scale, reduceMotion]);

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dot = disabled ? disabledColor : resolvedColor;
  const border = disabled ? disabledColor : (isSelected ? resolvedColor : theme.colorScheme.onSurface);

  const styles = StyleSheet.create({
    outer: {
      width: outer,
      height: outer,
      borderRadius: outer / 2,
      borderWidth: 2,
      borderColor: border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inner: {
      width: inner,
      height: inner,
      borderRadius: inner / 2,
      backgroundColor: dot,
    },
  });

  return (
    <TouchableRipple
      onPress={disabled ? undefined : () => {
        group?.onValueChange(value);
        onChange?.(undefined, !isSelected);
      }}
      disabled={disabled}
      borderless
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: isSelected, disabled }}
      testID={testID}
    >
      <View style={[{ padding: 8 }, sxStyle, style]}>
        <View style={styles.outer}>
          <Animated.View style={[styles.inner, innerStyle]} />
        </View>
      </View>
    </TouchableRipple>
  );
});

export { RadioButton };
