import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { createButtonStyles } from './Button.styles';
import type { ButtonProps } from './types';

export function Button({
  label,
  variant = 'filled',
  disabled = false,
  icon,
  onPress,
  accessibilityLabel,
  accessibilityRole = 'button',
  testID,
}: ButtonProps): React.ReactElement {
  const { theme } = useTheme();
  const styles = useMemo(() => createButtonStyles(theme, variant), [theme, variant]);
  const reduceMotion = useReducedMotionValue();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const callOnPress = (): void => { onPress?.(); };

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(!disabled)
        .onBegin(() => {
          'worklet';
          if (!reduceMotion.value) {
            scale.value = withTiming(0.96, { duration: 100 });
            opacity.value = withTiming(0.88, { duration: 100 });
          }
        })
        .onFinalize(() => {
          'worklet';
          if (!reduceMotion.value) {
            scale.value = withTiming(1, { duration: 150 });
            opacity.value = withTiming(1, { duration: 150 });
          }
        })
        .onEnd(() => {
          'worklet';
          runOnJS(callOnPress)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, onPress, reduceMotion],
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[
          styles.container,
          disabled && styles.disabledContainer,
          animatedStyle,
        ]}
        accessible
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled }}
        testID={testID}
      >
        {icon != null && <View style={styles.iconWrapper}>{icon}</View>}
        <Text
          style={[styles.label, disabled && styles.disabledLabel]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

