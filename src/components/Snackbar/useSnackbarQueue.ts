import { useCallback, useReducer, useRef } from 'react';
import type { SnackbarItem, SnackbarDuration } from './types';

const SHORT_MS = 4000;
const LONG_MS = 7000;

function durationMs(d: SnackbarDuration | undefined): number {
  if (d === 'long') return LONG_MS;
  if (typeof d === 'number') return d;
  return SHORT_MS; // 'short' or undefined
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------
type Action =
  | { type: 'ADD'; item: SnackbarItem }
  | { type: 'DISMISS'; id: string }
  | { type: 'NEXT' };

interface SnackbarQueueState {
  queue: SnackbarItem[];
  active: SnackbarItem | null;
}

function reducer(state: SnackbarQueueState, action: Action): SnackbarQueueState {
  switch (action.type) {
    case 'ADD': {
      if (state.active === null) {
        return { ...state, active: action.item };
      }
      return { ...state, queue: [...state.queue, action.item] };
    }
    case 'DISMISS': {
      if (state.active?.id !== action.id) return state;
      const [next, ...rest] = state.queue;
      return { queue: rest, active: next ?? null };
    }
    case 'NEXT': {
      const [next, ...rest] = state.queue;
      return { queue: rest, active: next ?? null };
    }
    default:
      return state;
  }
}

const INITIAL_STATE: SnackbarQueueState = { queue: [], active: null };

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
let idCounter = 0;

export function useSnackbarQueue() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(
    (id?: string) => {
      clearTimer();
      const targetId = id ?? state.active?.id;
      if (targetId) {
        dispatch({ type: 'DISMISS', id: targetId });
      }
    },
    [clearTimer, state.active?.id],
  );

  const scheduleAutoDismiss = useCallback(
    (item: SnackbarItem) => {
      clearTimer();
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'DISMISS', id: item.id });
      }, durationMs(item.duration));
    },
    [clearTimer],
  );

  const show = useCallback(
    (partial: Omit<SnackbarItem, 'id'>) => {
      idCounter += 1;
      const item: SnackbarItem = { ...partial, id: String(idCounter) };
      dispatch({ type: 'ADD', item });
    },
    [],
  );

  // Start timer whenever active changes
  const activeItem = state.active;

  return { active: activeItem, show, dismiss, scheduleAutoDismiss };
}
