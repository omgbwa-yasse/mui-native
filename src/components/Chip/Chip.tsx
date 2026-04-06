import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
import type { ChipProps } from './types';

const DefaultLabel = Text;
const DefaultDeleteIcon = Text;

export function Chip(rawProps: ChipProps): React.ReactElement {
  const props = useComponentDefaults('Chip', rawProps);
  const {
    label,
    variant = 'assist',
    selected = false,
    icon,
    onPress,
    onRemove,
    disabled = false,
    size,
    color,
    sx,
    style,
    accessibilityLabel,
    testID,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const { colorScheme, shape, typography } = theme;
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);

  const CHIP_HEIGHTS = { small: 24, medium: 32, large: 40 } as const;
  const chipHeight = CHIP_HEIGHTS[size ?? 'medium'];

  const isSelected = variant === 'filter' && selected;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: chipHeight,
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

  const Root = slots?.Root ?? Animated.View;
  const LabelSlot = slots?.Label ?? DefaultLabel;
  const DeleteIconSlot = slots?.DeleteIcon ?? DefaultDeleteIcon;

  return (
    <GestureDetector gesture={tapGesture}>
      <Root
        {...slotProps?.Root}
        style={[styles.container, animatedStyle, sxStyle, style, slotProps?.Root?.style]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled, selected: isSelected }}
        testID={testID}
      >
        {icon != null && <View style={styles.iconWrapper}>{icon}</View>}
        <LabelSlot {...slotProps?.Label} style={[styles.label, slotProps?.Label?.style]}>{label}</LabelSlot>
        {onRemove != null && (
          <View style={styles.removeWrapper}>
            <DeleteIconSlot
              {...slotProps?.DeleteIcon}
              onPress={disabled ? undefined : onRemove}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${label}`}
            >
              ✕
            </DeleteIconSlot>
          </View>
        )}
      </Root>
    </GestureDetector>
  );
}
