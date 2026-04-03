import React, { memo, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { RadioButtonContext } from './RadioButtonContext';
import type { RadioButtonProps } from './types';

const OUTER = 20;
const INNER = 10;
const ANIM_DURATION = 150;

const RadioButton = memo(function RadioButton({
  value,
  disabled: propDisabled = false,
  color,
  testID,
  accessibilityLabel,
}: RadioButtonProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();
  const group = useContext(RadioButtonContext);

  const isSelected = group ? group.value === value : false;
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
      width: OUTER,
      height: OUTER,
      borderRadius: OUTER / 2,
      borderWidth: 2,
      borderColor: border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inner: {
      width: INNER,
      height: INNER,
      borderRadius: INNER / 2,
      backgroundColor: dot,
    },
  });

  return (
    <TouchableRipple
      onPress={disabled ? undefined : () => group?.onValueChange(value)}
      disabled={disabled}
      borderless
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: isSelected, disabled }}
      testID={testID}
    >
      <View style={{ padding: 8 }}>
        <View style={styles.outer}>
          <Animated.View style={[styles.inner, innerStyle]} />
        </View>
      </View>
    </TouchableRipple>
  );
});

export { RadioButton };
