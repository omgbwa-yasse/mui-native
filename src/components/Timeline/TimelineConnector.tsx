import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import type { TimelineConnectorProps } from './types';

export function TimelineConnector({ style }: TimelineConnectorProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.root,
        { borderLeftColor: theme.colorScheme.outline },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderLeftWidth: 2,
    minHeight: 20,
  },
});
