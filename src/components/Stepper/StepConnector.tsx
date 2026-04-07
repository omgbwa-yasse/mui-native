import React, { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { StepperContext } from './StepperContext';
import type { StepConnectorProps } from './types';

const StepConnector = memo(function StepConnector({
  sx,
  style,
  ...rest
}: StepConnectorProps) {
  const { orientation } = useContext(StepperContext);
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg } = useColorRole('primary');

  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        isHorizontal ? styles.horizontal : styles.verticalWrapper,
        sxStyle,
        style,
      ]}
      testID="step-connector"
      {...rest}
    >
      <View
        style={[
          isHorizontal ? styles.lineH : styles.lineV,
          { backgroundColor: theme.colorScheme.outlineVariant },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalWrapper: {
    alignItems: 'center',
  },
  lineH: {
    height: 1.5,
    width: '100%',
  },
  lineV: {
    width: 1.5,
    height: 24,
    marginVertical: 4,
  },
});

export { StepConnector };
