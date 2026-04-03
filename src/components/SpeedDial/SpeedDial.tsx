import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { Portal } from '../Portal/Portal';
import { SpeedDialAction } from './SpeedDialAction';
import type { SpeedDialProps } from './types';

const FAB_SIZE = 56;
const SCRIM_DURATION = 150;

const SpeedDial = memo(function SpeedDial({
  actions,
  icon,
  openIcon,
  open: controlledOpen,
  onOpen,
  onClose,
  direction = 'up',
  testID,
}: SpeedDialProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotionValue();

  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? (controlledOpen ?? false) : internalOpen;

  const [mounted, setMounted] = useState(open);

  const scrimOpacity = useSharedValue(open ? 0.32 : 0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      scrimOpacity.value = reduceMotion.value
        ? 0.32
        : withTiming(0.32, { duration: SCRIM_DURATION });
    } else {
      scrimOpacity.value = reduceMotion.value
        ? 0
        : withTiming(0, { duration: SCRIM_DURATION });
      const delay = reduceMotion.value ? 0 : SCRIM_DURATION + actions.length * 50 + 20;
      const timer = setTimeout(() => setMounted(false), delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, scrimOpacity, reduceMotion, actions.length]);

  const handleToggle = useCallback(() => {
    if (open) {
      if (!isControlled) setInternalOpen(false);
      onClose?.();
    } else {
      if (!isControlled) setInternalOpen(true);
      onOpen?.();
    }
  }, [open, isControlled, onOpen, onClose]);

  const handleActionPress = useCallback(
    (actionOnPress?: () => void) => {
      actionOnPress?.();
      if (!isControlled) setInternalOpen(false);
      onClose?.();
    },
    [isControlled, onClose],
  );

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));

  const isVertical = direction === 'up' || direction === 'down';

  return (
    <View style={styles.wrapper} testID={testID}>
      {mounted && (
        <Portal>
          <Animated.View
            style={[styles.scrim, { backgroundColor: theme.colorScheme.scrim }, scrimStyle]}
            pointerEvents={open ? 'auto' : 'none'}
          >
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={() => {
                if (!isControlled) setInternalOpen(false);
                onClose?.();
              }}
              accessibilityLabel="Close speed dial"
            />
          </Animated.View>
        </Portal>
      )}

      <View
        style={[
          styles.container,
          isVertical ? styles.containerV : styles.containerH,
          direction === 'up' && styles.directionUp,
        ]}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={action.key}
            action={action}
            open={open}
            index={index}
            totalActions={actions.length}
            direction={direction}
            onPress={handleActionPress}
          />
        ))}

        {/* Main FAB */}
        <Pressable
          onPress={handleToggle}
          style={[styles.fab, { backgroundColor: theme.colorScheme.primaryContainer }]}
          accessibilityRole="button"
          accessibilityLabel="Speed Dial"
          accessibilityState={{ expanded: open }}
        >
          {open && openIcon ? openIcon : icon}
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-end',
  },
  container: {
    alignItems: 'center',
  },
  containerV: {
    flexDirection: 'column',
  },
  containerH: {
    flexDirection: 'row',
  },
  directionUp: {
    flexDirection: 'column-reverse',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SpeedDial };
