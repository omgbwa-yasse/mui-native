import React, { Children, cloneElement, isValidElement, memo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import type { GridItemProps, GridProps } from './types';
import { useTheme } from '../../theme';

/** Resolve active span for current screen width */
function resolveSpan(
  item: GridItemProps,
  width: number,
  columns: number
): number {
  const { xs, sm, md, lg, xl } = item;
  let span: number | 'auto' | undefined;

  if (width >= 1200 && xl !== undefined) span = xl;
  else if (width >= 992 && lg !== undefined) span = lg;
  else if (width >= 900 && md !== undefined) span = md;
  else if (width >= 600 && sm !== undefined) span = sm;
  else if (xs !== undefined) span = xs;

  if (span === 'auto' || span === undefined) return columns;
  return Math.min(span, columns);
}

// ── GridItem ──────────────────────────────────────────────────────────────────

const GridItem = memo<GridItemProps>(function GridItem({
  _computedWidth,
  xs: _xs,
  sm: _sm,
  md: _md,
  lg: _lg,
  xl: _xl,
  style,
  children,
  ...rest
}) {
  return (
    <View
      style={[
        _computedWidth !== undefined ? { width: _computedWidth } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

// ── Grid ─────────────────────────────────────────────────────────────────────

const Grid = memo<GridProps>(function Grid(rawProps: GridProps) {
  const props = useComponentDefaults('Grid', rawProps);
  const { theme } = useTheme();
  const {
    columns = 12,
    spacing = 0,
    columnSpacing,
    rowSpacing,
    style,
    children,
    sx,
    ...rest
  } = props;
  const sxStyle = useSx(sx, theme);

  const { width: screenWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(screenWidth);

  const colGap = columnSpacing ?? spacing;
  const rowGap = rowSpacing ?? spacing;

  const childArray = Children.toArray(children);

  const items = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as GridItemProps;
    const span = resolveSpan(childProps, screenWidth, columns);
    const totalGapWidth = colGap * (columns - 1);
    const itemWidth =
      span === columns
        ? containerWidth
        : ((containerWidth - totalGapWidth) * span) / columns;

    return cloneElement(child as React.ReactElement<GridItemProps>, {
      key: (child as React.ReactElement).key ?? index,
      _computedWidth: itemWidth,
    });
  });

  return (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: colGap,
          rowGap: rowGap,
        },
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {items}
    </View>
  );
});

export { Grid, GridItem };
