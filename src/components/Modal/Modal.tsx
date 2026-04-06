import React, { memo, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Portal } from '../Portal/Portal';
import type { ModalProps } from './types';

const SPRING_CONFIG = { damping: 20, stiffness: 200 };
const FADE_DURATION = 200;

const Modal = memo(function Modal(rawProps: ModalProps) {
  const props = useComponentDefaults('Modal', rawProps);
  const {
    visible,
    onDismiss,
    dismissible = true,
    children,
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const reduceMotion = useReducedMotionValue();

  /**
   * Keep the portal mounted until the exit animation completes, so the
   * component doesn't vanish before fading out.
   */
  const [mounted, setMounted] = useState(visible);

  const opacity = useSharedValue(visible ? 1 : 0);
  const scale = useSharedValue(visible ? 1 : 0.9);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      if (reduceMotion.value) {
        opacity.value = 1;
        scale.value = 1;
      } else {
        opacity.value = withTiming(1, { duration: FADE_DURATION });
        scale.value = withSpring(1, SPRING_CONFIG);
      }
    } else {
      if (reduceMotion.value) {
        opacity.value = 0;
        scale.value = 0.9;
        setMounted(false);
      } else {
        opacity.value = withTiming(0, { duration: FADE_DURATION }, (done) => {
          if (done) {
            // Must be done via a layout-thread-safe mechanism.
            // Using a simple flag updated in JS thread is fine for unmounting.
          }
        });
        scale.value = withSpring(0.9, SPRING_CONFIG);
        // Unmount after longest animation
        const timer = setTimeout(() => setMounted(false), FADE_DURATION + 50);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, [visible, opacity, scale, reduceMotion]);

  const surfaceStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!mounted) return null;

  const backdropStyle = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });

  const styles = StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    surface: {
      backgroundColor: theme.colorScheme.surface,
      borderRadius: theme.shape.extraLarge,
      padding: 24,
      marginHorizontal: 24,
      maxWidth: 560,
      width: '100%',
      elevation: 3,
    },
  });

  return (
    <Portal>
      <View style={styles.root} testID={testID}>
        {/* Scrim */}
        <Pressable
          style={backdropStyle.backdrop}
          onPress={dismissible ? onDismiss : undefined}
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        />
        {/* Dialog surface */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Animated.View
            style={[styles.surface, surfaceStyle, sxStyle, style]}
            accessibilityViewIsModal
            accessibilityRole="none"
          >
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  );
});

export { Modal };
