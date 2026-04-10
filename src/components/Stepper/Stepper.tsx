import React, { memo, useMemo } from 'react';
import { type AccessibilityRole, StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import { StepperContext } from './StepperContext';
import { StepConnector } from './StepConnector';
import type { StepperProps, StepState } from './types';

function getStepState(index: number, activeStep: number, explicitState?: StepState): StepState {
  if (explicitState) return explicitState;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'upcoming';
}

const Stepper = memo(function Stepper(rawProps: StepperProps) {
  const props = useComponentDefaults('Stepper', rawProps);
  const {
    steps,
    activeStep,
    orientation = 'horizontal',
    nonLinear = false,
    onStepPress,
    testID,
    sx,
    style,
    slots,
    slotProps,
    // composable-only
    children,
    connector,
  } = props as any;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const isHorizontal = orientation === 'horizontal';
  const layoutStyles = styleSheet(isHorizontal);

  const isComposable = steps === undefined;

  // ─── Composable mode ──────────────────────────────────────────────────────
  if (isComposable) {
    const stepChildren = React.Children.toArray(children);
    const totalSteps = stepChildren.length;

    const contextValue = { activeStep: activeStep ?? 0, orientation, totalSteps };

    const stepElements = stepChildren.map((child, index) => {
      const isLast = index === totalSteps - 1;
      const cloned = React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { index, last: isLast })
        : child;

      return (
        <React.Fragment key={index}>
          {cloned}
          {!isLast && (connector != null ? connector : <StepConnector />)}
        </React.Fragment>
      );
    });

    return (
      <StepperContext.Provider value={contextValue}>
        <View
          style={[isHorizontal ? layoutStyles.rootH : layoutStyles.rootV, sxStyle, style]}
          accessibilityRole="progressbar"
          accessible
          accessibilityValue={{ min: 0, max: totalSteps - 1, now: activeStep ?? 0 }}
          testID={testID}
        >
          {stepElements}
        </View>
      </StepperContext.Provider>
    );
  }

  // ─── Data-driven mode (existing) ─────────────────────────────────────────
  const RootSlot = slots?.Root ?? View;
  const StepIndicatorSlot = slots?.StepIndicator ?? View;
  const StepLabelSlot = slots?.StepLabel ?? View;
  const ConnectorSlot = slots?.Connector ?? View;

  const dataDrivenContextValue = useMemo(
    () => ({ activeStep: activeStep ?? 0, orientation, totalSteps: steps.length }),
    [activeStep, orientation, steps.length],
  );

  const ddStyles = styleSheet(isHorizontal);

  return (
    <StepperContext.Provider value={dataDrivenContextValue}>
      <RootSlot
      {...slotProps?.Root}
      style={[isHorizontal ? ddStyles.rootH : ddStyles.rootV, sxStyle, style, slotProps?.Root?.style]}
      accessibilityRole="progressbar"
      accessible
      accessibilityValue={{ min: 0, max: steps.length - 1, now: activeStep }}
      testID={testID}
    >
      {(steps as import('./types').StepItem[]).map((step, index: number) => {
        const state = getStepState(index, activeStep, step.state);
        const isCompleted = state === 'completed';
        const isActive = state === 'active';
        const isError = state === 'error';
        const isLast = index === steps.length - 1;

        const canPress = onStepPress != null && (nonLinear ? isCompleted : false);

        const circleColor = isError
          ? theme.colorScheme.error
          : isCompleted || isActive
          ? bg
          : theme.colorScheme.outline;

        const circleBg = isCompleted || isActive || isError
          ? circleColor
          : 'transparent';

        const circleTextColor = isCompleted || isActive || isError
          ? fg
          : theme.colorScheme.onSurfaceVariant;

        const labelColor = isActive
          ? theme.colorScheme.onSurface
          : theme.colorScheme.onSurfaceVariant;

        const connectorColor = isCompleted
          ? bg
          : theme.colorScheme.outlineVariant;

        const stepIndicator = (
          <StepIndicatorSlot
            {...slotProps?.StepIndicator}
            style={[
              ddStyles.circle,
              {
                backgroundColor: circleBg,
                borderColor: circleColor,
                borderWidth: isCompleted || isActive || isError ? 0 : 1.5,
              },
              slotProps?.StepIndicator?.style,
            ]}
          >
            {isCompleted ? (
              <Text variant="labelMedium" color={circleTextColor}>✓</Text>
            ) : isError ? (
              <Text variant="labelMedium" color={circleTextColor}>!</Text>
            ) : (
              <Text variant="labelMedium" color={circleTextColor}>
                {String(index + 1)}
              </Text>
            )}
          </StepIndicatorSlot>
        );

        const stepLabel = (
          <StepLabelSlot {...slotProps?.StepLabel} style={[isHorizontal ? ddStyles.labelH : ddStyles.labelV, slotProps?.StepLabel?.style]}>
            <Text variant="labelMedium" color={labelColor}>{step.label}</Text>
            {step.optional && (
              <Text variant="labelSmall" color={theme.colorScheme.onSurfaceVariant}>
                Optional
              </Text>
            )}
            {step.description && !isHorizontal && (
              <Text variant="bodySmall" color={theme.colorScheme.onSurfaceVariant}>
                {step.description}
              </Text>
            )}
          </StepLabelSlot>
        );

        const stepContent = (
          <View style={isHorizontal ? ddStyles.stepH : ddStyles.stepV}>
            {isHorizontal ? (
              <>
                {stepIndicator}
                {stepLabel}
              </>
            ) : (
              <View style={ddStyles.stepVInner}>
                <View style={ddStyles.stepVLeft}>
                  {stepIndicator}
                  {!isLast && (
                    <ConnectorSlot {...slotProps?.Connector} style={[ddStyles.connectorV, { backgroundColor: connectorColor }, slotProps?.Connector?.style]} />
                  )}
                </View>
                {stepLabel}
              </View>
            )}
          </View>
        );

        return (
          <React.Fragment key={index}>
            {canPress ? (
              <TouchableRipple
                onPress={() => onStepPress?.(index)}
                accessibilityRole={'listitem' as AccessibilityRole}
                accessibilityLabel={step.label}
              >
                {stepContent}
              </TouchableRipple>
            ) : (
              <View accessibilityRole={'listitem' as AccessibilityRole} accessible>
                {stepContent}
              </View>
            )}
            {/* Horizontal connector */}
            {isHorizontal && !isLast && (
              <View style={ddStyles.connectorHWrapper}>
                <ConnectorSlot {...slotProps?.Connector} style={[ddStyles.connectorH, { backgroundColor: connectorColor }, slotProps?.Connector?.style]} />
              </View>
            )}
          </React.Fragment>
        );
      })}
    </RootSlot>
    </StepperContext.Provider>
  );
});

function styleSheet(_isHorizontal: boolean) {
  return StyleSheet.create({
    rootH: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    rootV: {
      flexDirection: 'column',
      paddingHorizontal: 16,
    },
    stepH: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    stepV: {
      flexDirection: 'row',
    },
    stepVInner: {
      flexDirection: 'row',
    },
    stepVLeft: {
      alignItems: 'center',
      marginEnd: 12,
    },
    circle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelH: {
      alignItems: 'center',
      marginTop: 4,
    },
    labelV: {
      flex: 1,
      paddingVertical: 4,
      paddingBottom: 16,
    },
    connectorHWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    connectorH: {
      height: 1.5,
      width: '100%',
    },
    connectorV: {
      flex: 1,
      width: 1.5,
      marginVertical: 4,
    },
  });
}

export { Stepper };
