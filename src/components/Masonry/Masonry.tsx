import React, { memo, useState, useCallback, Children } from 'react';
import { View, StyleSheet } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { MasonryProps } from './types';
import { useTheme } from '../../theme';

// RN-DEVIATION: column layout via onLayout+argmin; CSS column-count unavailable in RN
export const Masonry = memo(function Masonry(rawProps: MasonryProps) {
  const props = useComponentDefaults('Masonry', rawProps);
  const { theme } = useTheme();
  const {
    columns,
    defaultColumns = 2,
    spacing = 2,
    children,
    style,
    sx,
  } = props;
  const sxStyle = useSx(sx, theme);

  const colCount = columns ?? defaultColumns;
  const childArray = Children.toArray(children);

  // Track column assignments: index → colIndex
  const [columnAssignment, setColumnAssignment] = useState<number[]>(() =>
    childArray.map((_, i) => i % colCount)
  );
  // Track cumulative heights per column for argmin selection
  const [columnHeights, setColumnHeights] = useState<number[]>(() =>
    Array.from({ length: colCount }, () => 0)
  );

  const handleChildLayout = useCallback(
    (childIndex: number) => (event: LayoutChangeEvent) => {
      const h = event.nativeEvent.layout.height;
      setColumnHeights(prev => {
        const next = [...prev];
        // Ensure we have enough columns (colCount may have changed)
        while (next.length < colCount) next.push(0);
        const minCol = next.indexOf(Math.min(...next.slice(0, colCount)));
        next[minCol] += h + spacing;
        setColumnAssignment(prevAssign => {
          const nextAssign = [...prevAssign];
          nextAssign[childIndex] = minCol;
          return nextAssign;
        });
        return next;
      });
    },
    [colCount, spacing]
  );

  // Build column buckets
  const cols: React.ReactNode[][] = Array.from({ length: colCount }, () => []);
  childArray.forEach((child, i) => {
    const col = columnAssignment[i] !== undefined ? columnAssignment[i] : i % colCount;
    const safeCol = col < colCount ? col : i % colCount;
    cols[safeCol].push(
      <View
        key={i}
        onLayout={handleChildLayout(i)}
        style={i > 0 ? { marginTop: spacing } : undefined}
      >
        {child}
      </View>
    );
  });

  return (
    <View style={[styles.row, sxStyle, style]}>
      {cols.map((colChildren, colIndex) => (
        <View
          key={colIndex}
          style={[
            styles.column,
            colIndex > 0 ? { marginLeft: spacing } : undefined,
          ]}
        >
          {colChildren}
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
});
