import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export function ChartLoadingOverlay(): React.ReactElement {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colorScheme.scrim + '33',
          zIndex: 10,
        } as const,
      }),
    [theme],
  );

  return (
    <View style={styles.overlay} accessibilityRole="progressbar" accessibilityLabel="Loading chart">
      <ActivityIndicator
        size="large"
        color={theme.colorScheme.primary}
      />
    </View>
  );
}
