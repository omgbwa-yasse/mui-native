import React, { memo } from 'react';
import { type AccessibilityRole, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { StepperProps, StepState } from './types';

function getStepState(index: number, activeStep: number, explicitState?: StepState): StepState {
  if (explicitState) return explicitState;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'upcoming';
}

const Stepper = memo(function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  nonLinear = false,
  onStepPress,
  testID,
}: StepperProps) {
  const { theme } = useTheme();
  const isHorizontal = orientation === 'horizontal';

  const styles = styleSheet(isHorizontal);

  return (
    <View
      style={isHorizontal ? styles.rootH : styles.rootV}
      accessibilityRole="progressbar"
      accessible
      accessibilityValue={{ min: 0, max: steps.length - 1, now: activeStep }}
      testID={testID}
    >
      {steps.map((step, index) => {
        const state = getStepState(index, activeStep, step.state);
        const isCompleted = state === 'completed';
        const isActive = state === 'active';
        const isError = state === 'error';
        const isLast = index === steps.length - 1;

        const canPress = onStepPress != null && (nonLinear ? isCompleted : false);

        const circleColor = isError
          ? theme.colorScheme.error
          : isCompleted || isActive
          ? theme.colorScheme.primary
          : theme.colorScheme.outline;

        const circleBg = isCompleted || isActive || isError
          ? circleColor
          : 'transparent';

        const circleTextColor = isCompleted || isActive || isError
          ? theme.colorScheme.onPrimary
          : theme.colorScheme.onSurfaceVariant;

        const labelColor = isActive
          ? theme.colorScheme.onSurface
          : theme.colorScheme.onSurfaceVariant;

        const connectorColor = isCompleted
          ? theme.colorScheme.primary
          : theme.colorScheme.outlineVariant;

        const stepIndicator = (
          <View
            style={[
              styles.circle,
              {
                backgroundColor: circleBg,
                borderColor: circleColor,
                borderWidth: isCompleted || isActive || isError ? 0 : 1.5,
              },
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
          </View>
        );

        const stepLabel = (
          <View style={isHorizontal ? styles.labelH : styles.labelV}>
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
          </View>
        );

        const stepContent = (
          <View style={isHorizontal ? styles.stepH : styles.stepV}>
            {isHorizontal ? (
              <>
                {stepIndicator}
                {stepLabel}
              </>
            ) : (
              <View style={styles.stepVInner}>
                <View style={styles.stepVLeft}>
                  {stepIndicator}
                  {!isLast && (
                    <View style={[styles.connectorV, { backgroundColor: connectorColor }]} />
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
              <View style={styles.connectorHWrapper}>
                <View style={[styles.connectorH, { backgroundColor: connectorColor }]} />
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
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
