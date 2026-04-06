import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import type { FABProps, FABSize, FABVariant } from './types';

const SIZE_MAP: Record<FABSize, number> = { small: 40, medium: 56, large: 96 };
const ICON_SIZE_MAP: Record<FABSize, number> = { small: 24, medium: 24, large: 36 };

export function FAB(rawProps: FABProps): React.ReactElement {
  const props = useComponentDefaults('FAB', rawProps);
  const {
    icon,
    label,
    variant = 'primary',
    size = 'medium',
    onPress,
    color,
    sx,
    style,
    accessibilityLabel,
    testID,
  } = props;
  const { theme } = useTheme();
  const { colorScheme, shape, elevation: elev } = theme;
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);

  const containerColor: Record<FABVariant, string> = {
    primary: container,
    secondary: colorScheme.secondaryContainer,
    tertiary: colorScheme.tertiaryContainer,
    surface: colorScheme.surface,
  };

  const iconColor: Record<FABVariant, string> = {
    primary: onContainer,
    secondary: colorScheme.onSecondaryContainer,
    tertiary: colorScheme.onTertiaryContainer,
    surface: bg,
  };

  const dim = SIZE_MAP[size];
  const isExtended = label != null && label.length > 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: dim,
          minWidth: dim,
          borderRadius: isExtended ? shape.large : shape.large,
          backgroundColor: containerColor[variant],
          paddingHorizontal: isExtended ? 20 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          shadowColor: colorScheme.shadow,
          shadowOffset: { width: 0, height: elev.level3.shadowOffsetY },
          shadowRadius: elev.level3.shadowRadius,
          shadowOpacity: elev.level3.shadowOpacity,
          elevation: elev.level3.elevation,
        },
        label: {
          color: iconColor[variant],
          marginStart: 12,
          fontSize: 14,
          fontWeight: '500',
        },
        iconWrapper: {
          width: ICON_SIZE_MAP[size],
          height: ICON_SIZE_MAP[size],
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [theme, variant, size, isExtended, container, onContainer, bg],
  );

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const reduceMotion = useReducedMotionValue();
  const callOnPress = (): void => { onPress?.(); };

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(onPress != null)
        .onBegin(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(0.94, { duration: 100 });
        })
        .onFinalize(() => {
          'worklet';
          if (!reduceMotion.value) scale.value = withTiming(1, { duration: 200 });
        })
        .onEnd(() => {
          'worklet';
          if (onPress) runOnJS(callOnPress)();
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPress],
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[styles.container, animatedStyle, sxStyle, style]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        <View style={styles.iconWrapper}>{icon}</View>
        {isExtended && <Text style={styles.label}>{label}</Text>}
      </Animated.View>
    </GestureDetector>
  );
}
