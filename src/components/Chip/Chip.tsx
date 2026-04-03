import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import type { ChipProps } from './types';

export function Chip({
  label,
  variant = 'assist',
  selected = false,
  icon,
  onPress,
  onRemove,
  disabled = false,
  accessibilityLabel,
  testID,
}: ChipProps): React.ReactElement {
  const { theme } = useTheme();
  const { colorScheme, shape, typography } = theme;

  const isSelected = variant === 'filter' && selected;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: 32,
          borderRadius: shape.small,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: isSelected ? 'transparent' : colorScheme.outline,
          backgroundColor: isSelected ? colorScheme.secondaryContainer : 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.38 : 1,
        },
        label: {
          ...typography.labelLarge,
          color: isSelected ? colorScheme.onSecondaryContainer : colorScheme.onSurfaceVariant,
        },
        iconWrapper: { marginEnd: 8 },
        removeWrapper: { marginStart: 8 },
      }),
    [theme, isSelected, disabled],
  );

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const reduceMotion = useReducedMotionValue();
  const callOnPress = (): void => { onPress?.(); };

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(!disabled && onPress != null)
        .onBegin(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(0.96, { duration: 80 });
        })
        .onFinalize(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(1, { duration: 120 });
        })
        .onEnd(() => {
          'worklet';
          if (onPress) runOnJS(callOnPress)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, onPress],
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled, selected: isSelected }}
        testID={testID}
      >
        {icon != null && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={styles.label}>{label}</Text>
        {onRemove != null && (
          <View style={styles.removeWrapper}>
            <Text
              onPress={disabled ? undefined : onRemove}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${label}`}
            >
              ✕
            </Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
