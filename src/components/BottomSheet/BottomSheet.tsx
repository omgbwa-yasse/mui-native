import React, { useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import type { BottomSheetProps } from './types';

/**
 * BottomSheet — uses RNGK v2 Gesture.Pan() for drag-to-dismiss.
 *
 * Replaces the deprecated useAnimatedGestureHandler + PanGestureHandler API.
 */
export function BottomSheet(rawProps: BottomSheetProps): React.ReactElement {
  const props = useComponentDefaults('BottomSheet', rawProps);
  const {
    visible,
    open,
    children,
    onDismiss,
    onClose,
    snapPoints = [0.5],
    showHandle = true,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const { colorScheme, shape } = theme;
  const { height: windowHeight } = useWindowDimensions();

  // Resolve MUI-idiomatic `open` alias → `visible`
  const isVisible = open ?? visible;

  // Resolve `onClose` → `onDismiss` alias
  const handleDismiss = (): void => {
    onClose?.();
    onDismiss?.();
  };

  // Height of the sheet (first snap point)
  const sheetHeight = windowHeight * (snapPoints[0] ?? 0.5);
  const translateY = useSharedValue(sheetHeight);
  const backdropOpacity = useSharedValue(0);
  const startY = useSharedValue(0);

  const callDismiss = (): void => { handleDismiss(); };
  const reduceMotion = useReducedMotionValue();

  useEffect(() => {
    if (isVisible) {
      if (reduceMotion.value) {
        translateY.value = 0;
        backdropOpacity.value = 1;
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
        backdropOpacity.value = withTiming(1, { duration: 300 });
      }
    } else {
      if (reduceMotion.value) {
        translateY.value = sheetHeight;
        backdropOpacity.value = 0;
      } else {
        translateY.value = withTiming(sheetHeight, { duration: 300 });
        backdropOpacity.value = withTiming(0, { duration: 300 });
      }
    }
  }, [isVisible, sheetHeight, translateY, backdropOpacity, reduceMotion]);

  // RNGK v2: Gesture.Pan() — NO deprecated PanGestureHandler / useAnimatedGestureHandler
  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          'worklet';
          startY.value = translateY.value;
        })
        .onUpdate((event) => {
          'worklet';
          const newY = startY.value + event.translationY;
          // Only allow dragging downward
          translateY.value = Math.max(0, newY);
        })
        .onEnd((event) => {
          'worklet';
          const threshold = sheetHeight * 0.4;
          if (event.translationY > threshold || event.velocityY > 500) {
            translateY.value = withTiming(sheetHeight, { duration: 300 });
            backdropOpacity.value = withTiming(0, { duration: 300 });
            runOnJS(callDismiss)();
          } else {
            translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
          }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sheetHeight, onDismiss],
  );

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        backdrop: {
          position: 'absolute',
          top: 0,
          end: 0,
          bottom: 0,
          start: 0,
          backgroundColor: colorScheme.scrim,
        },
        sheet: {
          position: 'absolute',
          bottom: 0,
          start: 0,
          end: 0,
          height: sheetHeight,
          backgroundColor: colorScheme.surface,
          borderTopStartRadius: shape.extraLarge,
          borderTopEndRadius: shape.extraLarge,
          paddingHorizontal: 16,
          paddingBottom: 24,
        },
        handle: {
          width: 32,
          height: 4,
          borderRadius: 2,
          backgroundColor: colorScheme.onSurfaceVariant,
          alignSelf: 'center',
          marginTop: 8,
          marginBottom: 16,
          opacity: 0.4,
        },
      }),
    [theme, sheetHeight],
  );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleDismiss}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleDismiss} accessible={false}>
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
      </TouchableWithoutFeedback>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, sheetAnimatedStyle, sxStyle, style]} testID={testID}>
          {showHandle && <View style={styles.handle} accessibilityRole="none" />}
          {children}
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
}
