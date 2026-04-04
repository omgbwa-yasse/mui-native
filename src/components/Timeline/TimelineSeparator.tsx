import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { TimelineSeparatorProps } from './types';

export function TimelineSeparator({ children, style }: TimelineSeparatorProps) {
  return (
    <View style={[styles.root, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 24,
  },
});
