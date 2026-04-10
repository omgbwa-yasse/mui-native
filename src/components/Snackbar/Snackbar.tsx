import React, { memo, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { Portal } from '../Portal/Portal';
import { Text } from '../Text/Text';
import type { SnackbarProps } from './types';

const ANIM_DURATION = 300;
const BOTTOM_OFFSET = 16;
const SLIDE_DISTANCE = 80;

const Snackbar = memo(function Snackbar(rawProps: SnackbarProps) {
  const props = useComponentDefaults('Snackbar', rawProps);
  const {
    item,
    onDismiss,
    open,
    testID,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(SLIDE_DISTANCE);

  // Enter animation
  useEffect(() => {
    if (reduceMotion.value) {
      opacity.value = 1;
      translateY.value = 0;
    } else {
      opacity.value = withTiming(1, { duration: ANIM_DURATION });
      translateY.value = withTiming(0, { duration: ANIM_DURATION });
    }
  }, [opacity, translateY, reduceMotion]);

  const handleDismiss = () => {
    const id = item.id;
    if (reduceMotion.value) {
      opacity.value = 0;
      translateY.value = SLIDE_DISTANCE;
      onDismiss(id);
    } else {
      opacity.value = withTiming(0, { duration: ANIM_DURATION });
      translateY.value = withTiming(
        SLIDE_DISTANCE,
        { duration: ANIM_DURATION },
        (finished) => {
          if (finished) runOnJS(onDismiss)(id);
        },
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: BOTTOM_OFFSET,
      start: 16,
      end: 16,
      borderRadius: theme.shape.medium,
      backgroundColor: theme.colorScheme.inverseSurface,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 6,
    },
    message: {
      flex: 1,
      marginEnd: 8,
    },
    action: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });

  const SlotRoot = slots?.Root ?? Animated.View;
  const SlotMessage = slots?.Message ?? Text;
  const SlotAction = slots?.Action ?? Pressable;

  if (open === false) return null;

  return (
    <Portal>
      <SlotRoot
        {...slotProps?.Root}
        style={[styles.container, animatedStyle, sxStyle, style, slotProps?.Root?.style]}
        accessibilityLiveRegion="polite"
        testID={testID}
      >
        <View style={styles.message}>
          <SlotMessage
            {...slotProps?.Message}
            variant="bodyMedium"
            color={theme.colorScheme.inverseOnSurface}
          >
            {item.message}
          </SlotMessage>
        </View>
        {item.action != null && (
          <SlotAction
            {...slotProps?.Action}
            style={[styles.action, slotProps?.Action?.style]}
            onPress={() => {
              item.action?.onPress();
              handleDismiss();
            }}
            accessibilityRole="button"
            accessibilityLabel={item.action.label}
          >
            <Text
              variant="labelLarge"
              color={theme.colorScheme.inversePrimary}
            >
              {item.action.label}
            </Text>
          </SlotAction>
        )}
      </SlotRoot>
    </Portal>
  );
});

export { Snackbar };
