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
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { createButtonStyles } from './Button.styles';
import type { ButtonProps } from './types';
import { SIZE_SCALE } from '../../tokens/size';
import { useGroupSize } from '../ButtonGroup/SizeContext';

export function Button(rawProps: ButtonProps): React.ReactElement {
  const props = useComponentDefaults('Button', rawProps);
  const {
    label,
    variant = 'filled',
    disabled = false,
    icon,
    onPress,
    size,
    color,
    sx,
    style,
    accessibilityLabel,
    accessibilityRole = 'button',
    testID,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const styles = useMemo(() => createButtonStyles(theme, variant, bg, fg), [theme, variant, bg, fg]);
  const groupSize = useGroupSize();
  const resolvedSize = groupSize ?? size ?? 'medium';
  const sz = SIZE_SCALE[resolvedSize];
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
          { minHeight: sz.height, paddingHorizontal: sz.paddingH, paddingVertical: sz.paddingV },
          disabled && styles.disabledContainer,
          animatedStyle,
          sxStyle,
          style,
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

