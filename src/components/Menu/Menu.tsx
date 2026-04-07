import React, { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Portal } from '../Portal/Portal';
import type { MenuProps, MenuItemProps } from './types';

const ANIM_DURATION = 150;

interface MenuPosition {
  top: number;
  left: number;
}

const Menu = memo(function Menu(rawProps: MenuProps) {
  const props = useComponentDefaults('Menu', rawProps as unknown as MenuItemProps) as unknown as MenuProps;
  const {
    visible,
    open,
    anchor,
    onDismiss,
    onClose,
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

  // Resolve MUI-idiomatic `open` alias → `visible`
  const isVisible = open ?? visible;

  // Resolve `onClose` → `onDismiss` alias
  const handleDismiss = () => {
    onClose?.();
    onDismiss?.();
  };

  const [position, setPosition] = useState<MenuPosition | null>(null);
  const [mounted, setMounted] = useState(isVisible);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Measure anchor position before showing
  useEffect(() => {
    if (!isVisible) return;

    setMounted(true);
    anchor.current?.measure((_x: number, _y: number, _w: number, h: number, pageX: number, pageY: number) => {
      setPosition({ top: pageY + h, left: pageX });
    });

    if (reduceMotion.value) {
      opacity.value = 1;
      scale.value = 1;
    } else {
      opacity.value = withTiming(1, { duration: ANIM_DURATION });
      scale.value = withTiming(1, { duration: ANIM_DURATION });
    }
  }, [isVisible, anchor, opacity, scale, reduceMotion]);

  useEffect(() => {
    if (isVisible) return;

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
  }, [isVisible, opacity, scale, reduceMotion]);

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
          onPress={handleDismiss}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
        <Animated.View
          style={[styles.menu, menuAnimStyle, sxStyle, style]}
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
