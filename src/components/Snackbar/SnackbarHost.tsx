import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useSnackbarQueue } from './useSnackbarQueue';
import { Snackbar } from './Snackbar';
import type { SnackbarContextValue, SnackbarHostProps } from './types';

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

function SnackbarHost({ children }: SnackbarHostProps) {
  const { active, show, dismiss, scheduleAutoDismiss } = useSnackbarQueue();

  // Auto-dismiss when active item changes
  useEffect(() => {
    if (active) {
      scheduleAutoDismiss(active);
    }
  }, [active, scheduleAutoDismiss]);

  const ctx = useMemo<SnackbarContextValue>(
    () => ({ show, dismiss }),
    [show, dismiss],
  );

  return (
    <SnackbarContext.Provider value={ctx}>
      {children}
      {active != null && (
        <Snackbar
          key={active.id}
          item={active}
          onDismiss={dismiss}
        />
      )}
    </SnackbarContext.Provider>
  );
}

function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (__DEV__ && ctx === null) {
    console.warn(
      '[Snackbar] useSnackbar() called without a <SnackbarHost> in the tree.',
    );
  }
  return ctx as SnackbarContextValue;
}

export { SnackbarHost, useSnackbar };
