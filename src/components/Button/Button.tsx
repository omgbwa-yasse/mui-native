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
import type { ViewProps } from 'react-native';

export interface ButtonSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Label: React.ComponentType<any>;
}

const DefaultRoot = Animated.View;
const DefaultLabel = Text;

export function Button(rawProps: ButtonProps): React.ReactElement {
  const props = useComponentDefaults('Button', rawProps);
  const {
    label,
    children,
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
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg } = useColorRole(color);
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

  const Root = slots?.Root ?? DefaultRoot;
  const Label = slots?.Label ?? DefaultLabel;

  return (
    <GestureDetector gesture={tapGesture}>
      <Root
        {...slotProps?.Root}
        style={[
          styles.container,
          { minHeight: sz.height, paddingHorizontal: sz.paddingH, paddingVertical: sz.paddingV },
          disabled && styles.disabledContainer,
          animatedStyle,
          sxStyle,
          style,
          slotProps?.Root?.style,
        ]}
        accessible
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : label)}
        accessibilityState={{ disabled }}
        testID={testID}
      >
        {icon != null && <View style={styles.iconWrapper}>{icon}</View>}
        {children !== undefined ? (
          typeof children === 'string' ? (
            <Label
              {...slotProps?.Label}
              style={[styles.label, disabled && styles.disabledLabel, slotProps?.Label?.style]}
              numberOfLines={1}
            >
              {children}
            </Label>
          ) : (
            children
          )
        ) : (
          <Label
            {...slotProps?.Label}
            style={[styles.label, disabled && styles.disabledLabel, slotProps?.Label?.style]}
            numberOfLines={1}
          >
            {label}
          </Label>
        )}
      </Root>
    </GestureDetector>
  );
}

