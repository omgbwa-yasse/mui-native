import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { TimelineContentProps } from './types';

export function TimelineContent({ children, style }: TimelineContentProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
