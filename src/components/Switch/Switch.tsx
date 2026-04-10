import React, { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { SwitchProps } from './types';

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = 24;
const THUMB_PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2;
const THUMB_OFF_X = THUMB_PADDING;
const THUMB_ON_X = TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING;
const ANIM_DURATION = 150;

const Switch = memo(function Switch(rawProps: SwitchProps) {
  const props = useComponentDefaults('Switch', rawProps);
  const {
    value,
    checked,
    onValueChange,
    onChange,
    disabled = false,
    testID,
    accessibilityLabel,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();

  // Resolve MUI-idiomatic `checked` alias → `value`
  const isChecked = checked ?? value;

  const progress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    const target = isChecked ? 1 : 0;
    if (reduceMotion.value) {
      progress.value = target;
    } else {
      progress.value = withTiming(target, { duration: ANIM_DURATION });
    }
  }, [isChecked, progress, reduceMotion]);

  const trackOn = color ?? theme.colorScheme.primary;
  const trackOff = theme.colorScheme.surfaceVariant;
  const thumbOn = theme.colorScheme.onPrimary;
  const thumbOff = theme.colorScheme.outline;

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [trackOff, trackOn]),
    opacity: disabled ? 0.38 : 1,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          THUMB_OFF_X + (THUMB_ON_X - THUMB_OFF_X) * progress.value,
      },
    ],
    backgroundColor: interpolateColor(progress.value, [0, 1], [thumbOff, thumbOn]),
  }));

  const tap = Gesture.Tap()
    .enabled(!disabled)
    .onEnd(() => {
      const newValue = !isChecked;
      runOnJS(onValueChange)(newValue);
      if (onChange) {
        runOnJS(onChange)({ target: { checked: newValue } });
      }
    });

  const styles = StyleSheet.create({
    hitSlop: {
      minWidth: 48,
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    track: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      justifyContent: 'center',
    },
    thumb: {
      position: 'absolute',
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      top: THUMB_PADDING,
    },
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[styles.hitSlop, sxStyle, style]}
        accessibilityRole="switch"
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ checked: isChecked, disabled }}
        testID={testID}
      >
        <Animated.View style={[styles.track, trackStyle]}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
});

export { Switch };
