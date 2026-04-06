import React, { memo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { ImageListItemProps, ImageListProps } from './types';
import { useTheme } from '../../theme';

/**
 * Returns the `cols` and `rows` span of a child by reading its props.
 * Defaults to 1 for any missing span.
 */
function getItemSpan(child: React.ReactElement<ImageListItemProps>) {
  const colSpan = child.props.cols ?? 1;
  const rowSpan = child.props.rows ?? 1;
  return { colSpan, rowSpan };
}

const ImageList = memo<ImageListProps>(function ImageList(rawProps: ImageListProps) {
  const props = useComponentDefaults('ImageList', rawProps as unknown as ImageListItemProps) as unknown as ImageListProps;
  const { theme } = useTheme();
  const {
    children,
    cols = 2,
    gap = 4,
    variant = 'standard',
    rowHeight = 120,
    style,
    color,
    sx,
    ...rest
  } = props;
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const [containerWidth, setContainerWidth] = useState(0);

  const items = React.Children.toArray(children) as React.ReactElement<ImageListItemProps>[];

  if (containerWidth === 0) {
    return (
      <View
        style={[styles.root, sxStyle, style]}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        {...rest}
      />
    );
  }

  if (variant === 'masonry') {
    return renderMasonry({ items, cols, gap, containerWidth, style, rest });
  }

  if (variant === 'quilted') {
    return renderQuilted({ items, cols, gap, containerWidth, rowHeight, style, rest });
  }

  // standard (and woven — treated as standard)
  return renderStandard({ items, cols, gap, containerWidth, rowHeight, style, rest });
});

// ─── Standard ────────────────────────────────────────────────────────────────

interface RenderStandardArgs {
  items: React.ReactElement<ImageListItemProps>[];
  cols: number;
  gap: number;
  containerWidth: number;
  rowHeight: number | 'auto';
  style: ImageListProps['style'];
  rest: Record<string, unknown>;
}

function renderStandard({ items, cols, gap, containerWidth, rowHeight, style, rest }: RenderStandardArgs) {
  const totalGapWidth = gap * (cols - 1);
  const cellWidth = (containerWidth - totalGapWidth) / cols;
  const cellHeight = rowHeight === 'auto' ? cellWidth : rowHeight;

  return (
    <ScrollView
      style={style}
      contentContainerStyle={styles.standardContent}
      {...rest}
    >
      <View
        style={[
          styles.standardGrid,
          { gap },
        ]}
      >
        {items.map((child, index) =>
          React.cloneElement(child, {
            key: child.key ?? index,
            _cellWidth: cellWidth,
            _cellHeight: cellHeight,
          } as Partial<ImageListItemProps> & { _cellWidth: number; _cellHeight: number }),
        )}
      </View>
    </ScrollView>
  );
}

// ─── Masonry ─────────────────────────────────────────────────────────────────

interface RenderMasonryArgs {
  items: React.ReactElement<ImageListItemProps>[];
  cols: number;
  gap: number;
  containerWidth: number;
  style: ImageListProps['style'];
  rest: Record<string, unknown>;
}

function renderMasonry({ items, cols, gap, containerWidth, style, rest }: RenderMasonryArgs) {
  const totalGapWidth = gap * (cols - 1);
  const colWidth = (containerWidth - totalGapWidth) / cols;

  // Distribute items across columns in order
  const columns: React.ReactElement<ImageListItemProps>[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    columns[i % cols].push(item);
  });

  return (
    <ScrollView style={style} {...rest}>
      <View style={[styles.masonryRow, { gap }]}>
        {columns.map((colItems, colIndex) => (
          <View key={colIndex} style={{ width: colWidth, gap }}>
            {colItems.map((item, rowIndex) => {
              // Auto height for masonry: each item has no fixed height (content-driven via Image aspect)
              const cellHeight = 120 + ((colIndex + rowIndex) % 3) * 40; // stagger height for visual effect
              return React.cloneElement(item, {
                key: item.key ?? rowIndex,
                _cellWidth: colWidth,
                _cellHeight: cellHeight,
              } as Partial<ImageListItemProps> & { _cellWidth: number; _cellHeight: number });
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Quilted ─────────────────────────────────────────────────────────────────

interface RenderQuiltedArgs {
  items: React.ReactElement<ImageListItemProps>[];
  cols: number;
  gap: number;
  containerWidth: number;
  rowHeight: number | 'auto';
  style: ImageListProps['style'];
  rest: Record<string, unknown>;
}

interface QuiltedCell {
  item: React.ReactElement<ImageListItemProps>;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
}

function renderQuilted({ items, cols, gap, containerWidth, rowHeight, style, rest }: RenderQuiltedArgs) {
  const baseRowHeight = rowHeight === 'auto' ? 120 : rowHeight;
  const totalGapWidth = gap * (cols - 1);
  const unitWidth = (containerWidth - totalGapWidth) / cols;

  // Simple packing: place each item into the grid left-to-right, top-to-bottom
  const occupied: boolean[][] = []; // occupied[row][col]

  function isOccupied(row: number, col: number, colSpan: number, rowSpan: number): boolean {
    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        if (c >= cols || (occupied[r]?.[c] ?? false)) return true;
      }
    }
    return false;
  }

  function occupy(row: number, col: number, colSpan: number, rowSpan: number) {
    for (let r = row; r < row + rowSpan; r++) {
      if (!occupied[r]) occupied[r] = [];
      for (let c = col; c < col + colSpan; c++) {
        occupied[r][c] = true;
      }
    }
  }

  const placements: QuiltedCell[] = [];
  let currentRow = 0;
  let currentCol = 0;

  for (const item of items) {
    const { colSpan, rowSpan } = getItemSpan(item);

    // Find next available slot
    let placed = false;
    while (!placed) {
      if (currentCol + colSpan > cols) {
        currentRow++;
        currentCol = 0;
      }
      if (!isOccupied(currentRow, currentCol, colSpan, rowSpan)) {
        occupy(currentRow, currentCol, colSpan, rowSpan);
        placements.push({ item, col: currentCol, row: currentRow, colSpan, rowSpan });
        currentCol += colSpan;
        placed = true;
      } else {
        currentCol++;
      }
    }
  }

  const maxRow = placements.reduce((m, p) => Math.max(m, p.row + p.rowSpan), 0);
  const totalHeight = maxRow * baseRowHeight + (maxRow - 1) * gap;

  return (
    <ScrollView style={style} {...rest}>
      <View style={[styles.quiltedContainer, { height: totalHeight }]}>
        {placements.map(({ item, col, row, colSpan, rowSpan }, index) => {
          const left = col * unitWidth + col * gap;
          const top = row * baseRowHeight + row * gap;
          const width = colSpan * unitWidth + (colSpan - 1) * gap;
          const height = rowSpan * baseRowHeight + (rowSpan - 1) * gap;
          return React.cloneElement(item, {
            key: item.key ?? index,
            _cellWidth: width,
            _cellHeight: height,
            style: { position: 'absolute', left, top },
          } as Partial<ImageListItemProps> & { _cellWidth: number; _cellHeight: number });
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  standardContent: {
    flexGrow: 1,
  },
  standardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  masonryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quiltedContainer: {
    position: 'relative',
    width: '100%',
  },
});

export { ImageList };
