import React, { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { Portal } from '../Portal/Portal';
import type { MenuProps } from './types';

const ANIM_DURATION = 150;

interface MenuPosition {
  top: number;
  left: number;
}

const Menu = memo(function Menu({
  visible,
  anchor,
  onDismiss,
  children,
  testID,
}: MenuProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();

  const [position, setPosition] = useState<MenuPosition | null>(null);
  const [mounted, setMounted] = useState(visible);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Measure anchor position before showing
  useEffect(() => {
    if (!visible) return;

    setMounted(true);
    anchor.current?.measure((_x, _y, _w, h, pageX, pageY) => {
      setPosition({ top: pageY + h, left: pageX });
    });

    if (reduceMotion.value) {
      opacity.value = 1;
      scale.value = 1;
    } else {
      opacity.value = withTiming(1, { duration: ANIM_DURATION });
      scale.value = withTiming(1, { duration: ANIM_DURATION });
    }
  }, [visible, anchor, opacity, scale, reduceMotion]);

  useEffect(() => {
    if (visible) return;

    if (reduceMotion.value) {
      opacity.value = 0;
      scale.value = 0.9;
      setMounted(false);
      setPosition(null);
    } else {
      opacity.value = withTiming(0, { duration: ANIM_DURATION });
      scale.value = withTiming(0.9, { duration: ANIM_DURATION });
      const timer = setTimeout(() => {
        setMounted(false);
        setPosition(null);
      }, ANIM_DURATION + 20);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [visible, opacity, scale, reduceMotion]);

  const menuAnimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!mounted) return null;

  const styles = StyleSheet.create({
    scrim: {
      ...StyleSheet.absoluteFillObject,
    },
    menu: {
      position: 'absolute',
      top: position?.top ?? 0,
      left: position?.left ?? 0,
      backgroundColor: theme.colorScheme.surface,
      borderRadius: theme.shape.extraSmall,
      minWidth: 112,
      maxWidth: 280,
      elevation: 8,
      overflow: 'hidden',
    },
  });

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* Invisible scrim to dismiss on outside tap */}
        <Pressable
          style={styles.scrim}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
        <Animated.View
          style={[styles.menu, menuAnimStyle]}
          accessibilityRole="menu"
          accessible
          testID={testID}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
});

export { Menu };
