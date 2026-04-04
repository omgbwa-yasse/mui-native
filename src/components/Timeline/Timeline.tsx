import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimelineContextProvider } from './TimelineContext';
import type { TimelineProps } from './types';

export function Timeline({ position = 'right', children, style }: TimelineProps) {
  const counterRef = useRef(0);

  const registerItem = () => {
    const index = counterRef.current;
    counterRef.current += 1;
    return index;
  };

  return (
    <TimelineContextProvider value={{ position, registerItem }}>
      <View style={[styles.root, style]}>{children}</View>
    </TimelineContextProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
});
