import { useState, useEffect, useRef } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { useReducedMotionValue } from '../theme/useReduceMotion';

export type TransitionState = 'ENTERING' | 'ENTERED' | 'EXITING' | 'EXITED';

export interface TransitionOptions {
  /** Whether the component is transitioning in (visible). */
  in: boolean;
  /** Duration in ms or per-direction object. Defaults to 300. */
  timeout?: number | { enter: number; exit: number };
  /** If true, don't mount children until `in` becomes true for the first time. */
  mountOnEnter?: boolean;
  /** If true, unmount children after they have fully exited. */
  unmountOnExit?: boolean;
}

export interface TransitionResult {
  /** Current transition state. */
  state: TransitionState;
  /**
   * Animated progress value: 0 = fully exited, 1 = fully entered.
   * Use this inside `useAnimatedStyle()` in each consumer to derive transforms.
   */
  progress: SharedValue<number>;
  /** Whether the children should currently be in the React tree. */
  shouldMount: boolean;
}

function resolveTimeouts(
  timeout: number | { enter: number; exit: number } = 300,
): { enter: number; exit: number } {
  if (typeof timeout === 'number') return { enter: timeout, exit: timeout };
  return timeout;
}

/**
 * Shared transition state-machine hook consumed by Fade, Grow, Slide, Zoom, Collapse.
 *
 * Manages:
 * - ENTERING / ENTERED / EXITING / EXITED state machine
 * - Reanimated `progress` SharedValue (0 → 1) driven by `withTiming` worklets
 * - `reduceMotion` short-circuit (instant jump when the OS setting is active)
 * - `mountOnEnter` / `unmountOnExit` lifecycle flags
 *
 * Each consumer derives its own `useAnimatedStyle()` from `progress.value`.
 */
export function useTransition(options: TransitionOptions): TransitionResult {
  const { in: inProp, timeout = 300, mountOnEnter = false, unmountOnExit = false } = options;
  const { enter: enterDuration, exit: exitDuration } = resolveTimeouts(timeout);

  const reduceMotion = useReducedMotionValue();
  const progress = useSharedValue(inProp ? 1 : 0);

  const [state, setState] = useState<TransitionState>(inProp ? 'ENTERED' : 'EXITED');

  // Track whether we have ever mounted (for mountOnEnter)
  const hasMountedRef = useRef(inProp);
  if (inProp) hasMountedRef.current = true;

  // Skip the transition on the very first render — initial state is already
  // correct (ENTERED/progress=1 or EXITED/progress=0).
  const isFirstRender = useRef(true);

  const shouldMount = (() => {
    if (inProp) return true;
    if (state === 'EXITED') {
      if (unmountOnExit) return false;
      if (mountOnEnter) return hasMountedRef.current;
      return true;
    }
    return true; // EXITING — keep mounted while animating out
  })();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    if (inProp) {
      setState('ENTERING');
      if (reduceMotion.value) {
        progress.value = 1;
        setState('ENTERED');
      } else {
        progress.value = withTiming(1, { duration: enterDuration });
        const timer = setTimeout(() => setState('ENTERED'), enterDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setState('EXITING');
      if (reduceMotion.value) {
        progress.value = 0;
        setState('EXITED');
      } else {
        progress.value = withTiming(0, { duration: exitDuration });
        const timer = setTimeout(() => setState('EXITED'), exitDuration);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProp]);

  return { state, progress, shouldMount };
}
