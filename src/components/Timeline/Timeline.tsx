import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimelineContextProvider } from './TimelineContext';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { TimelineProps } from './types';
import { useTheme } from '../../theme';

export function Timeline(rawProps: TimelineProps) {
  const props = useComponentDefaults('Timeline', rawProps);
  const { sx, position = 'right', children, style, slots, slotProps } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const counterRef = useRef(0);
  const Root = slots?.Root ?? View;

  const registerItem = () => {
    const index = counterRef.current;
    counterRef.current += 1;
    return index;
  };

  return (
    <TimelineContextProvider value={{ position, registerItem }}>
      <Root {...slotProps?.Root} style={[styles.root, sxStyle, style, slotProps?.Root?.style]}>{children}</Root>
    </TimelineContextProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
});
