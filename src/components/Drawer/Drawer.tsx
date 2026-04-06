import React, { memo, useCallback, useEffect, useState } from 'react';
import { type AccessibilityRole, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Portal } from '../Portal/Portal';
import type { DrawerProps } from './types';

const SPRING_CONFIG = { damping: 20, stiffness: 200 };
const DEFAULT_DRAWER_WIDTH = 280;

const Drawer = memo(function Drawer(rawProps: DrawerProps) {
  const props = useComponentDefaults('Drawer', rawProps);
  const {
    open,
    onClose,
    anchor = 'left',
    variant = 'temporary',
    children,
    drawerWidth = DEFAULT_DRAWER_WIDTH,
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const reduceMotion = useReducedMotionValue();

  const offscreen = anchor === 'right' ? drawerWidth : -drawerWidth;
  const translateX = useSharedValue(open ? 0 : offscreen);
  const scrimOpacity = useSharedValue(open ? 0.5 : 0);

  const [mounted, setMounted] = useState(open || variant === 'permanent');

  const openDrawer = useCallback(() => {
    setMounted(true);
    if (reduceMotion.value) {
      translateX.value = 0;
      scrimOpacity.value = 0.5;
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      scrimOpacity.value = withSpring(0.5, SPRING_CONFIG);
    }
  }, [translateX, scrimOpacity, reduceMotion]);

  const closeDrawer = useCallback(() => {
    if (reduceMotion.value) {
      translateX.value = offscreen;
      scrimOpacity.value = 0;
      if (variant !== 'permanent') setMounted(false);
    } else {
      translateX.value = withSpring(offscreen, SPRING_CONFIG);
      scrimOpacity.value = withSpring(0, SPRING_CONFIG, (done) => {
        'worklet';
        if (done) {
          // unmount happens via runOnJS; approximated via setTimeout in effect
        }
      });
      const delay = 350; // approximate spring settle time
      const timer = setTimeout(() => {
        if (variant !== 'permanent') setMounted(false);
      }, delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [translateX, scrimOpacity, offscreen, variant, reduceMotion]);

  useEffect(() => {
    if (open) {
      openDrawer();
    } else if (variant !== 'permanent') {
      closeDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));

  const swipeGesture = Gesture.Pan()
    .onStart(() => {
      // nothing needed — translation state held in translateX
    })
    .onUpdate((e) => {
      'worklet';
      const newX =
        anchor === 'left'
          ? Math.min(0, Math.max(offscreen, e.translationX))
          : Math.max(0, Math.min(offscreen, e.translationX));
      translateX.value = newX;
      // opacity proportional to drawer position
      const progress =
        anchor === 'left'
          ? 1 - Math.abs(newX) / drawerWidth
          : 1 - Math.abs(newX) / drawerWidth;
      scrimOpacity.value = progress * 0.5;
    })
    .onEnd((e) => {
      'worklet';
      const threshold = drawerWidth * 0.4;
      const shouldClose =
        anchor === 'left' ? e.translationX < -threshold : e.translationX > threshold;
      if (shouldClose) {
        translateX.value = withSpring(offscreen, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0, SPRING_CONFIG);
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0.5, SPRING_CONFIG);
      }
    });

  /** Permanent: render inline, no portal, no overlay */
  if (variant === 'permanent') {
    return (
      <View
        style={[
          styles.drawer,
          anchor === 'right' ? styles.anchorRight : styles.anchorLeft,
          { width: drawerWidth, backgroundColor: theme.colorScheme.surface, shadowColor: theme.colorScheme.shadow },
          sxStyle,
          style,
        ]}
        accessibilityRole={"none" as AccessibilityRole}
        testID={testID}
      >
        {children}
      </View>
    );
  }

  if (!mounted) return null;

  const drawerEl = (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View
        style={[
          styles.drawer,
          anchor === 'right' ? styles.anchorRight : styles.anchorLeft,
          { width: drawerWidth, backgroundColor: theme.colorScheme.surface, shadowColor: theme.colorScheme.shadow },
          drawerStyle,
          sxStyle,
          style,
        ]}
        accessibilityRole={"none" as AccessibilityRole}
        accessibilityViewIsModal={variant === 'temporary'}
        testID={testID}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );

  if (variant === 'temporary') {
    return (
      <Portal>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[styles.scrim, { backgroundColor: theme.colorScheme.scrim }, scrimStyle]}
            pointerEvents={open ? 'auto' : 'none'}
          >
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={onClose}               accessible              accessibilityRole="button"              accessibilityLabel="Close drawer"
            />
          </Animated.View>
          {drawerEl}
        </View>
      </Portal>
    );
  }

  // persistent: no scrim, no portal — inline placement
  return drawerEl;
});

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 16,
  },
  anchorLeft: {
    left: 0,
  },
  anchorRight: {
    right: 0,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { Drawer };
