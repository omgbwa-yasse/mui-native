import React, { memo, useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { SliderProps } from './types';

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 20;
const HIT_SLOP = 24;
const TRACK_WIDTH = 280; // fallback; real width captured via onLayout

function clamp(v: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, min), max);
}

function snapToStep(v: number, min: number, step: number) {
  'worklet';
  return Math.round((v - min) / step) * step + min;
}

const Slider = memo(function Slider(rawProps: SliderProps) {
  const props = useComponentDefaults('Slider', rawProps);
  const {
    value,
    onValueChange,
    onChange,
    onSlidingComplete,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    testID,
    accessibilityLabel,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const trackWidthRef = useRef(TRACK_WIDTH);

  const thumbX = useSharedValue(((value - min) / (max - min)) * TRACK_WIDTH);
  const prevThumbX = useSharedValue(0);

  const updateValue = useCallback(
    (rawX: number) => {
      const w = trackWidthRef.current;
      const ratio = clamp(rawX / w, 0, 1);
      const raw = min + ratio * (max - min);
      const stepped = clamp(snapToStep(raw, min, step), min, max);
      onValueChange(stepped);
      onChange?.(null, stepped);
    },
    [min, max, step, onValueChange, onChange],
  );

  const finishValue = useCallback(
    (rawX: number) => {
      const w = trackWidthRef.current;
      const ratio = clamp(rawX / w, 0, 1);
      const raw = min + ratio * (max - min);
      const stepped = clamp(snapToStep(raw, min, step), min, max);
      onSlidingComplete?.(stepped);
    },
    [min, max, step, onSlidingComplete],
  );

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      'worklet';
      prevThumbX.value = thumbX.value;
    })
    .onUpdate((e) => {
      const newX = clamp(prevThumbX.value + e.translationX, 0, trackWidthRef.current);
      thumbX.value = newX;
      runOnJS(updateValue)(newX);
    })
    .onEnd(() => {
      runOnJS(finishValue)(thumbX.value);
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value - THUMB_SIZE / 2 }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: thumbX.value,
  }));

  const styles = StyleSheet.create({
    container: {
      height: HIT_SLOP * 2,
      justifyContent: 'center',
      opacity: disabled ? 0.38 : 1,
    },
    track: {
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      backgroundColor: theme.colorScheme.surfaceVariant,
    },
    fill: {
      position: 'absolute',
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      backgroundColor: theme.colorScheme.primary,
    },
    thumb: {
      position: 'absolute',
      top: '50%',
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      backgroundColor: theme.colorScheme.primary,
      marginTop: -(THUMB_SIZE / 2),
    },
  });

  return (
    <GestureDetector gesture={pan}>
      <View
        style={[styles.container, sxStyle, style]}
        onLayout={(e) => {
          trackWidthRef.current = e.nativeEvent.layout.width;
          thumbX.value = ((value - min) / (max - min)) * e.nativeEvent.layout.width;
        }}
        accessibilityRole="adjustable"
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ min, max, now: value }}
        testID={testID}
      >
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </GestureDetector>
  );
});

export { Slider };
