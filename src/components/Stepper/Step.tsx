import React, { createContext, memo, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { StepperContext } from './StepperContext';
import type { StepProps } from './types';

/**
 * Internal context shared only between Step and its immediate children
 * (StepLabel, StepContent). Not exported.
 */
export interface StepContextValue {
  active: boolean;
  completed: boolean;
  disabled: boolean;
  index: number;
  /** True when this step is the last in the sequence */
  last: boolean;
}

/** @internal */
export const StepContext = createContext<StepContextValue>({
  active: false,
  completed: false,
  disabled: false,
  index: 0,
  last: false,
});

const Step = memo(function Step(rawProps: StepProps) {
  const {
    index = 0,
    active: activeProp,
    completed: completedProp,
    disabled = false,
    last = false,
    children,
    sx,
    style,
    ...rest
  } = rawProps;

  const { activeStep } = useContext(StepperContext);
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  // Derive from StepperContext unless caller overrides
  const active = activeProp !== undefined ? activeProp : index === activeStep;
  const completed = completedProp !== undefined ? completedProp : index < activeStep;

  const contextValue = useMemo<StepContextValue>(
    () => ({ active, completed, disabled, index, last }),
    [active, completed, disabled, index, last],
  );

  return (
    <StepContext.Provider value={contextValue}>
      <View
        style={[styles.root, sxStyle, style]}
        accessible
        accessibilityRole={"listitem" as import('react-native').AccessibilityRole}
        {...rest}
      >
        {children}
      </View>
    </StepContext.Provider>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
});

export { Step };
