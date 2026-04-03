import React, { memo, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import type { DimensionValue } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import type { SkeletonProps } from './types';

/**
 * Skeleton — shimmer / pulse loading placeholder.
 *
 * Uses Reanimated color interpolation worklet. Respects reduce-motion.
 */
export const Skeleton = memo(function Skeleton({
  width,
  height,
  variant = 'rectangular',
  animation = 'wave',
  testID,
}: SkeletonProps): React.ReactElement {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();
  const progress = useSharedValue(0);

  const base = theme.colorScheme.surfaceVariant;
  const highlight = theme.colorScheme.surface;

  useEffect(() => {
    if (animation !== false && !reduceMotion.value) {
      progress.value = withRepeat(
        withTiming(1, {
          duration: animation === 'pulse' ? 1200 : 1600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    } else {
      cancelAnimation(progress);
      progress.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 0.5, 1], [base, highlight, base]),
  }));

  const borderRadius =
    variant === 'circular'
      ? (typeof width === 'number' ? width : 40) / 2
      : variant === 'text'
      ? 4
      : 4;

  return (
    <Animated.View
      testID={testID}
      style={[
        {
          width: width as DimensionValue,
          height,
          borderRadius,
        },
        animatedStyle,
      ]}
      accessibilityElementsHidden={true}
      importantForAccessibility="no"
    />
  );
});
