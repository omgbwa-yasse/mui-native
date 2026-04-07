import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Text } from '../Text/Text';
import { StepContext } from './Step';
import type { StepLabelProps } from './types';

const StepLabel = memo(function StepLabel({
  children,
  icon,
  optional,
  error = false,
  sx,
  style,
  ...rest
}: StepLabelProps) {
  const { active, completed, disabled, index } = useContext(StepContext);
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg } = useColorRole('primary');

  const isError = error;

  const circleBg =
    isError
      ? theme.colorScheme.error
      : completed || active
      ? bg
      : 'transparent';

  const circleTextColor =
    isError || completed || active
      ? isError ? theme.colorScheme.onError : fg
      : theme.colorScheme.onSurfaceVariant;

  const circleBorder = !(completed || active || isError);

  const labelColor = disabled
    ? theme.colorScheme.onSurfaceVariant
    : active
    ? theme.colorScheme.onSurface
    : theme.colorScheme.onSurfaceVariant;

  const indicator = icon ?? (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: circleBg,
          borderColor: isError
            ? theme.colorScheme.error
            : completed || active
            ? bg
            : theme.colorScheme.outline,
          borderWidth: circleBorder ? 1.5 : 0,
        },
      ]}
    >
      <Text variant="labelMedium" color={circleTextColor}>
        {completed ? '✓' : isError ? '!' : String(index + 1)}
      </Text>
    </View>
  );

  return (
    <View style={[styles.root, sxStyle, style]} {...rest}>
      {indicator}
      <View style={styles.labelContainer}>
        <Text variant="labelMedium" color={labelColor}>
          {children}
        </Text>
        {optional != null && (
          <Text variant="labelSmall" color={theme.colorScheme.onSurfaceVariant}>
            {optional}
          </Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
});

export { StepLabel };
