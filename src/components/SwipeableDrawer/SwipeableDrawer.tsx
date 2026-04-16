import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  type AccessibilityRole,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { Portal } from '../Portal/Portal';
import type { SwipeableDrawerProps } from './types';

const SPRING_CONFIG = { damping: 20, stiffness: 200 };
const DEFAULT_DRAWER_WIDTH = 280;
const DEFAULT_SWIPE_AREA_WIDTH = 20;
const DEFAULT_HYSTERESIS = 0.52;
const DEFAULT_MIN_FLING_VELOCITY = 450;

/**
 * SwipeableDrawer — extends `Drawer` with edge swipe-to-open and swipe-to-close
 * gesture support.
 *
 * The key addition over `Drawer` is an invisible "hot zone" along the screen edge
 * that allows users to initiate an open gesture even when the drawer is closed.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = React.useState(false);
 *
 * <SwipeableDrawer
 *   open={open}
 *   onOpen={() => setOpen(true)}
 *   onClose={() => setOpen(false)}
 *   swipeAreaWidth={30}
 * >
 *   <DrawerContent />
 * </SwipeableDrawer>
 * ```
 */
export const SwipeableDrawer = memo(function SwipeableDrawer(
  props: SwipeableDrawerProps,
) {
  const {
    open,
    onClose,
    onOpen,
    anchor = 'left',
    variant = 'temporary',
    children,
    drawerWidth = DEFAULT_DRAWER_WIDTH,
    swipeAreaWidth = DEFAULT_SWIPE_AREA_WIDTH,
    hysteresis = DEFAULT_HYSTERESIS,
    minFlingVelocity = DEFAULT_MIN_FLING_VELOCITY,
    disableSwipeToOpen = false,
    testID,
    sx,
    style,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const reduceMotion = useReducedMotionValue();

  // translateX: 0 = fully open, ±drawerWidth = fully closed (offscreen)
  const offscreen = anchor === 'right' ? drawerWidth : -drawerWidth;
  const translateX = useSharedValue(open ? 0 : offscreen);
  const scrimOpacity = useSharedValue(open ? 0.5 : 0);

  const [mounted, setMounted] = useState(open || variant === 'permanent');

  // Keep a stable ref to onOpen/onClose to avoid stale closures in worklets
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const snapOpen = useCallback(() => {
    setMounted(true);
    if (reduceMotion.value) {
      translateX.value = 0;
      scrimOpacity.value = 0.5;
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      scrimOpacity.value = withSpring(0.5, SPRING_CONFIG);
    }
  }, [translateX, scrimOpacity, reduceMotion]);

  const snapClosed = useCallback(() => {
    if (reduceMotion.value) {
      translateX.value = offscreen;
      scrimOpacity.value = 0;
      if (variant !== 'permanent') setMounted(false);
    } else {
      translateX.value = withSpring(offscreen, SPRING_CONFIG);
      scrimOpacity.value = withSpring(0, SPRING_CONFIG);
      const timer = setTimeout(() => {
        if (variant !== 'permanent') setMounted(false);
      }, 350);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [translateX, scrimOpacity, offscreen, variant, reduceMotion]);

  useEffect(() => {
    if (open) {
      snapOpen();
    } else if (variant !== 'permanent') {
      snapClosed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Animated styles ────────────────────────────────────────────────────────

  const drawerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scrimAnimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));

  // ── Swipe-to-close gesture (runs when drawer is open) ─────────────────────

  const swipeCloseGesture = Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      const newX =
        anchor === 'left'
          ? Math.min(0, Math.max(offscreen, e.translationX))
          : Math.max(0, Math.min(offscreen, e.translationX));
      translateX.value = newX;
      const progress = 1 - Math.abs(newX) / drawerWidth;
      scrimOpacity.value = progress * 0.5;
    })
    .onEnd((e) => {
      'worklet';
      const threshold = drawerWidth * hysteresis;
      const fastEnough =
        anchor === 'left'
          ? e.velocityX < -minFlingVelocity
          : e.velocityX > minFlingVelocity;
      const shouldClose =
        fastEnough ||
        (anchor === 'left'
          ? e.translationX < -threshold
          : e.translationX > threshold);

      if (shouldClose) {
        translateX.value = withSpring(offscreen, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0, SPRING_CONFIG);
        runOnJS(() => onCloseRef.current?.())();
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0.5, SPRING_CONFIG);
      }
    });

  // ── Swipe-to-open gesture (runs over the edge hot zone when closed) ────────

  const swipeOpenGesture = Gesture.Pan()
    .enabled(!disableSwipeToOpen)
    .onUpdate((e) => {
      'worklet';
      // Translate the drawer from offscreen toward 0 based on drag distance
      const raw =
        anchor === 'left'
          ? offscreen + e.translationX   // offscreen is negative for left anchor
          : offscreen - e.translationX;  // offscreen is positive for right anchor
      const clamped =
        anchor === 'left'
          ? Math.min(0, Math.max(offscreen, raw))
          : Math.max(0, Math.min(offscreen, raw));
      translateX.value = clamped;
      const progress = 1 - Math.abs(clamped) / drawerWidth;
      scrimOpacity.value = progress * 0.5;
    })
    .onEnd((e) => {
      'worklet';
      const threshold = drawerWidth * hysteresis;
      const fastEnough =
        anchor === 'left'
          ? e.velocityX > minFlingVelocity
          : e.velocityX < -minFlingVelocity;
      const shouldOpen =
        fastEnough ||
        (anchor === 'left'
          ? e.translationX > threshold
          : e.translationX < -threshold);

      if (shouldOpen) {
        translateX.value = withSpring(0, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0.5, SPRING_CONFIG);
        runOnJS(() => onOpenRef.current?.())();
      } else {
        translateX.value = withSpring(offscreen, SPRING_CONFIG);
        scrimOpacity.value = withSpring(0, SPRING_CONFIG);
      }
    });

  // ── Permanent variant ──────────────────────────────────────────────────────

  if (variant === 'permanent') {
    return (
      <View
        style={[
          styles.drawer,
          anchor === 'right' ? styles.anchorRight : styles.anchorLeft,
          { width: drawerWidth, backgroundColor: theme.colorScheme.surface },
          sxStyle,
          style,
        ]}
        accessibilityRole={'none' as AccessibilityRole}
        testID={testID}
      >
        {children}
      </View>
    );
  }

  if (!mounted) {
    if (disableSwipeToOpen) return null;

    // Even when unmounted, render an invisible edge zone so swipe-to-open works
    return (
      <GestureDetector gesture={swipeOpenGesture}>
        <Animated.View
          style={[
            styles.swipeArea,
            anchor === 'right'
              ? { right: 0, width: swipeAreaWidth }
              : { left: 0, width: swipeAreaWidth },
          ]}
          pointerEvents="box-only"
        />
      </GestureDetector>
    );
  }

  const drawerEl = (
    <GestureDetector gesture={swipeCloseGesture}>
      <Animated.View
        style={[
          styles.drawer,
          anchor === 'right' ? styles.anchorRight : styles.anchorLeft,
          { width: drawerWidth, backgroundColor: theme.colorScheme.surface },
          drawerAnimStyle,
          sxStyle,
          style,
        ]}
        accessibilityRole={'none' as AccessibilityRole}
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
          {/* Scrim */}
          <Animated.View
            style={[
              styles.scrim,
              { backgroundColor: theme.colorScheme.scrim },
              scrimAnimStyle,
            ]}
            pointerEvents={open ? 'auto' : 'none'}
          >
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={onClose}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Close drawer"
            />
          </Animated.View>

          {drawerEl}

          {/* Edge swipe-to-open zone rendered on top of the scrim when closed */}
          {!open && !disableSwipeToOpen && (
            <GestureDetector gesture={swipeOpenGesture}>
              <Animated.View
                style={[
                  styles.swipeArea,
                  anchor === 'right'
                    ? { right: 0, width: swipeAreaWidth }
                    : { left: 0, width: swipeAreaWidth },
                ]}
                pointerEvents="box-only"
              />
            </GestureDetector>
          )}
        </View>
      </Portal>
    );
  }

  // persistent variant
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
  /** Invisible touch zone along the screen edge for swipe-to-open. */
  swipeArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    // width is applied dynamically
  },
});
