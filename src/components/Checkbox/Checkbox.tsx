import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { CheckboxProps } from './types';

const BOX_SIZE = 20;
const ANIM_DURATION = 150;

const Checkbox = memo(function Checkbox({
  status,
  onPress,
  disabled = false,
  color,
  testID,
  accessibilityLabel,
}: CheckboxProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();

  const isChecked = status === 'checked';
  const isIndeterminate = status === 'indeterminate';
  const isActive = isChecked || isIndeterminate;

  const resolvedColor = color ?? theme.colorScheme.primary;
  const disabledColor = theme.colorScheme.onSurface + '61'; // 38% opacity

  const scale = useSharedValue(isActive ? 1 : 0);
  const opacity = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    const targetScale = isActive ? 1 : 0;
    const targetOpacity = isActive ? 1 : 0;
    if (reduceMotion.value) {
      scale.value = targetScale;
      opacity.value = targetOpacity;
    } else {
      scale.value = withTiming(targetScale, { duration: ANIM_DURATION });
      opacity.value = withTiming(targetOpacity, { duration: ANIM_DURATION });
    }
  }, [isActive, scale, opacity, reduceMotion]);

  const markStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const boxColor = disabled ? disabledColor : (isActive ? resolvedColor : 'transparent');
  const borderColor = disabled ? disabledColor : (isActive ? resolvedColor : theme.colorScheme.onSurface);

  const styles = StyleSheet.create({
    box: {
      width: BOX_SIZE,
      height: BOX_SIZE,
      borderWidth: 2,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor,
      backgroundColor: boxColor,
    },
    checkmark: {
      width: isIndeterminate ? 10 : 12,
      height: isIndeterminate ? 2 : 8,
      backgroundColor: disabled ? disabledColor : theme.colorScheme.onPrimary,
      borderRadius: 1,
      ...(isIndeterminate
        ? {}
        : {
            width: 6,
            height: 10,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: theme.colorScheme.onPrimary,
            backgroundColor: 'transparent',
            transform: [{ rotate: '45deg' }, { translateY: -1 }],
          }),
    },
  });

  return (
    <TouchableRipple
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      borderless
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: isChecked, disabled }}
      testID={testID}
    >
      <View style={{ padding: 8 }}>
        <View style={styles.box}>
          <Animated.View style={[styles.checkmark, markStyle]} />
        </View>
      </View>
    </TouchableRipple>
  );
});

export { Checkbox };
