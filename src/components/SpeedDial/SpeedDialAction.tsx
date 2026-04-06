import React, { memo, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { Text } from '../Text/Text';
import type { SpeedDialActionItem } from './types';

const ACTION_DURATION = 150;
const MINI_FAB_SIZE = 40;

interface SpeedDialActionProps {
  action: SpeedDialActionItem;
  open: boolean;
  index: number;
  totalActions: number;
  direction: 'up' | 'down' | 'left' | 'right';
  onPress: (actionOnPress?: () => void) => void;
}

const SpeedDialAction = memo(function SpeedDialAction({
  action,
  open,
  index,
  totalActions,
  direction,
  onPress,
}: SpeedDialActionProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();

  const opacity = useSharedValue(0);
  const translate = useSharedValue(16);

  useEffect(() => {
    const staggerIndex = open ? index : totalActions - 1 - index;
    const delay = reduceMotion.value ? 0 : staggerIndex * 50;
    const targetOpacity = open ? 1 : 0;
    const targetTranslate = open ? 0 : 16;

    opacity.value = reduceMotion.value
      ? targetOpacity
      : withDelay(delay, withTiming(targetOpacity, { duration: ACTION_DURATION }));
    translate.value = reduceMotion.value
      ? targetTranslate
      : withDelay(delay, withTiming(targetTranslate, { duration: ACTION_DURATION }));
  }, [open, index, totalActions, opacity, translate, reduceMotion]);

  const animStyle = useAnimatedStyle(() => {
    const translateProp =
      direction === 'up'
        ? { translateY: translate.value }
        : direction === 'down'
        ? { translateY: -translate.value }
        : direction === 'left'
        ? { translateX: translate.value }
        : { translateX: -translate.value };

    return {
      opacity: opacity.value,
      transform: [translateProp],
    };
  });

  return (
    <Animated.View style={[styles.actionWrapper, animStyle]}>
      {action.label && (
        <View style={[styles.labelBubble, { backgroundColor: theme.colorScheme.surface, shadowColor: theme.colorScheme.shadow }]}>
          <Text variant="labelMedium" color={theme.colorScheme.onSurface}>
            {action.label}
          </Text>
        </View>
      )}
      <Pressable
        onPress={() => onPress(action.onPress)}
        disabled={action.disabled}
        style={[
          styles.miniFab,
          {
            backgroundColor: theme.colorScheme.primaryContainer,
            opacity: action.disabled ? 0.38 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={action.label ?? `Action ${action.key}`}
        accessibilityState={{ disabled: action.disabled }}
      >
        {action.icon}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  labelBubble: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginEnd: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  miniFab: {
    width: MINI_FAB_SIZE,
    height: MINI_FAB_SIZE,
    borderRadius: MINI_FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SpeedDialAction };
