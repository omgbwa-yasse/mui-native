import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTimelineContext } from './TimelineContext';
import type { TimelineItemProps } from './types';

export function TimelineItem({ children, style }: TimelineItemProps) {
  const { position, registerItem } = useTimelineContext();
  const indexRef = useRef<number | null>(null);

  if (indexRef.current === null) {
    indexRef.current = registerItem();
  }

  const index = indexRef.current;
  const isOdd = index % 2 !== 0;
  const shouldReverse =
    position === 'left' || (position === 'alternate' && isOdd);

  return (
    <View
      style={[
        styles.root,
        shouldReverse ? styles.reversed : undefined,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reversed: {
    flexDirection: 'row-reverse',
  },
});
