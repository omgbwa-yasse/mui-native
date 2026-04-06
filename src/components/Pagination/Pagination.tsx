import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import { Text } from '../Text/Text';
import type { PaginationProps } from './types';

/** Build the page range array with ellipsis markers */
function buildPageRange(
  page: number,
  count: number,
  siblingCount: number,
  boundaryCount: number,
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  const showStartEllipsis = siblingsStart > boundaryCount + 2;
  const showEndEllipsis = siblingsEnd < count - boundaryCount - 1;

  const siblings = range(siblingsStart, siblingsEnd);

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [
    ...startPages,
    ...(showStartEllipsis ? (['ellipsis-start'] as const) : range(boundaryCount + 1, siblingsStart - 1)),
    ...siblings,
    ...(showEndEllipsis ? (['ellipsis-end'] as const) : range(siblingsEnd + 1, count - boundaryCount)),
    ...endPages,
  ];

  // Deduplicate and filter
  const seen = new Set<number | string>();
  return pages.filter((p) => {
    const key = typeof p === 'number' ? p : p;
    if (seen.has(key)) return false;
    seen.add(key);
    return typeof p !== 'number' || (p >= 1 && p <= count);
  });
}

const Pagination = memo(function Pagination(rawProps: PaginationProps) {
  const props = useComponentDefaults('Pagination', rawProps);
  const {
    count,
    page,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    showFirstButton = false,
    showLastButton = false,
    disabled = false,
    size = 'medium',
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);

  const btnSize = size === 'small' ? 32 : size === 'large' ? 48 : 40;
  const fontSize = size === 'small' ? ('labelSmall' as const) : ('labelMedium' as const);

  const pageRange = buildPageRange(
    Math.max(1, Math.min(page, count)),
    count,
    siblingCount,
    boundaryCount,
  );

  const handlePress = useCallback(
    (p: number) => { onPageChange(Math.max(1, Math.min(p, count))); },
    [onPageChange, count],
  );

  const renderButton = (label: string, targetPage: number, isCurrentPage: boolean, key: string | number) => {
    const isDisabled = disabled || targetPage < 1 || targetPage > count;
    const btnBg = isCurrentPage ? bg : 'transparent';
    const textColor = isCurrentPage
      ? fg
      : isDisabled
      ? `${theme.colorScheme.onSurface}61`
      : theme.colorScheme.onSurface;

    return (
      <TouchableRipple
        key={key}
        onPress={() => handlePress(targetPage)}
        disabled={isDisabled}
        rippleColor={`${theme.colorScheme.onSurface}1F`}
        accessibilityRole="button"
        accessibilityState={{ selected: isCurrentPage, disabled: isDisabled }}
        accessibilityLabel={label}
        style={styles.btn}
      >
        <View style={[styles.btnInner, { width: btnSize, height: btnSize, backgroundColor: btnBg, borderRadius: btnSize / 2 }]}>
          <Text variant={fontSize} color={textColor}>{label}</Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View
      style={[styles.root, sxStyle, style]}
      accessibilityRole="none"
      accessibilityLabel="pagination"
      testID={testID}
    >
      {showFirstButton && renderButton('«', 1, false, 'first')}
      {renderButton('‹', page - 1, false, 'prev')}

      {pageRange.map((item, i) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <View key={`ellipsis-${i}`} style={[styles.btn, { width: btnSize, height: btnSize }]}>
              <View style={styles.btnInner}>
                <Text variant={fontSize} color={theme.colorScheme.onSurfaceVariant}>…</Text>
              </View>
            </View>
          );
        }
        return renderButton(String(item), item, item === page, item);
      })}

      {renderButton('›', page + 1, false, 'next')}
      {showLastButton && renderButton('»', count, false, 'last')}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  btnInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Pagination };
