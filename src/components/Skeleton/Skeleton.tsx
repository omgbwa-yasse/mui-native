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
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { SkeletonProps } from './types';

/**
 * Skeleton — shimmer / pulse loading placeholder.
 *
 * Uses Reanimated color interpolation worklet. Respects reduce-motion.
 */
export const Skeleton = memo(function Skeleton(rawProps: SkeletonProps): React.ReactElement {
  const props = useComponentDefaults('Skeleton', rawProps);
  const {
    width,
    height,
    variant = 'rectangular',
    animation = 'wave',
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
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
        sxStyle,
        style,
      ]}
      accessibilityElementsHidden={true}
      importantForAccessibility="no"
    />
  );
});
