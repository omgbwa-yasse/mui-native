import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { TimelineOppositeContentProps } from './types';

export function TimelineOppositeContent({ children, style }: TimelineOppositeContentProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
