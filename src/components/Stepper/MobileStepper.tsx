import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Text } from '../Text/Text';
import { LinearProgress } from '../LinearProgress/LinearProgress';
import type { MobileStepperProps } from './types';

const DOT_SIZE = 8;
const DOT_GAP = 4;

const MobileStepper = memo(function MobileStepper({
  variant = 'dots',
  steps,
  activeStep,
  backButton,
  nextButton,
  position = 'bottom',
  sx,
  style,
  testID,
  ...rest
}: MobileStepperProps) {
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg } = useColorRole('primary');

  const progressValue = steps > 1 ? (activeStep / (steps - 1)) * 100 : 0;

  const progress =
    variant === 'dots' ? (
      <View style={styles.dots} testID="mobile-stepper-dots">
        {Array.from({ length: steps }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  i === activeStep ? bg : theme.colorScheme.outlineVariant,
              },
            ]}
          />
        ))}
      </View>
    ) : variant === 'progress' ? (
      <View style={styles.progressWrapper} testID="mobile-stepper-progress">
        <LinearProgress variant="determinate" value={progressValue} />
      </View>
    ) : (
      <Text
        variant="bodyMedium"
        color={theme.colorScheme.onSurface}
        testID="mobile-stepper-text"
      >
        {activeStep + 1} / {steps}
      </Text>
    );

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colorScheme.surface },
        position === 'bottom' && styles.positionBottom,
        position === 'top' && styles.positionTop,
        sxStyle,
        style,
      ]}
      testID={testID}
      {...rest}
    >
      <View>{backButton}</View>
      {progress}
      <View>{nextButton}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  positionBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  positionTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DOT_GAP,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  progressWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export { MobileStepper };
