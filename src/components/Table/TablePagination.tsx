import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';
import { useSx } from '../../hooks/useSx';
import { useTheme } from '../../theme';

// RN-DEVIATION: event arg dropped — no MouseEvent in RN.
// MUI signature: onPageChange(event: MouseEvent, page: number) → here: onPageChange(page: number)
// RN-DEVIATION: rowsPerPage selector is a simple set of Pressable text options, not a <Select> input.

export interface TablePaginationSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<any>;
}

export interface TablePaginationProps extends SlotPropsConfig<TablePaginationSlots> {
  /** Total number of rows. Use -1 to indicate unknown. */
  count: number;
  /** Zero-based index of the current page. */
  page: number;
  /** Number of rows per page. */
  rowsPerPage: number;
  /** Called when the page changes. page is zero-based. */
  onPageChange: (page: number) => void;
  /** Called when rows-per-page changes. */
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  /** Options for rows per page. Default: [10, 25, 50, 100] */
  rowsPerPageOptions?: number[];
  showFirstButton?: boolean;
  showLastButton?: boolean;
  labelRowsPerPage?: string;
  /** Custom renderer for the "X–Y of Z" label. */
  labelDisplayedRows?: (params: { from: number; to: number; count: number; page: number }) => string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const DEFAULT_ROWS_OPTIONS = [10, 25, 50, 100];

const defaultLabelDisplayedRows = ({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
  page: number;
}) => `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;

const TablePagination = memo(function TablePagination(props: TablePaginationProps) {
  const {
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = DEFAULT_ROWS_OPTIONS,
    showFirstButton = false,
    showLastButton = false,
    labelRowsPerPage = 'Rows per page:',
    labelDisplayedRows = defaultLabelDisplayedRows,
    sx,
    style,
    testID,
  } = props;

  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { colorScheme, typography } = theme;

  const lastPage = count !== -1 ? Math.max(0, Math.ceil(count / rowsPerPage) - 1) : -1;
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = count !== -1 ? Math.min(count, (page + 1) * rowsPerPage) : (page + 1) * rowsPerPage;

  const canGoBack = page > 0;
  const canGoForward = count === -1 || page < lastPage;

  const textStyle = [typography.bodySmall, { color: colorScheme.onSurface }];
  const labelStyle = [typography.bodySmall, { color: colorScheme.onSurfaceVariant }];

  const iconButtonStyle = (disabled: boolean) => [
    styles.iconButton,
    { opacity: disabled ? 0.38 : 1 },
  ];

  return (
    <View style={[styles.root, sxStyle, style]} testID={testID}>
      {/* Rows per page selector */}
      {onRowsPerPageChange && rowsPerPageOptions.length > 0 && (
        <View style={styles.rowsPerPage}>
          <Text style={labelStyle}>{labelRowsPerPage}</Text>
          <View style={styles.rowsOptions}>
            {rowsPerPageOptions.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => onRowsPerPageChange(opt)}
                style={[
                  styles.rowOption,
                  opt === rowsPerPage && { backgroundColor: colorScheme.primaryContainer },
                ]}
                accessibilityRole="menuitem"
                accessibilityState={{ selected: opt === rowsPerPage }}
              >
                <Text
                  style={[
                    typography.labelSmall,
                    { color: opt === rowsPerPage ? colorScheme.onPrimaryContainer : colorScheme.onSurface },
                  ]}
                >
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Page display */}
      <Text style={[textStyle, styles.displayedRows]}>
        {labelDisplayedRows({ from, to, count, page })}
      </Text>

      {/* Navigation buttons */}
      <View style={styles.actions}>
        {showFirstButton && (
          <Pressable
            onPress={() => onPageChange(0)}
            disabled={!canGoBack}
            style={iconButtonStyle(!canGoBack)}
            accessibilityRole="button"
            accessibilityLabel="First page"
            accessibilityState={{ disabled: !canGoBack }}
            testID={testID ? `${testID}-first` : undefined}
          >
            <Text style={textStyle}>«</Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => onPageChange(page - 1)}
          disabled={!canGoBack}
          style={iconButtonStyle(!canGoBack)}
          accessibilityRole="button"
          accessibilityLabel="Previous page"
          accessibilityState={{ disabled: !canGoBack }}
          testID={testID ? `${testID}-prev` : undefined}
        >
          <Text style={textStyle}>‹</Text>
        </Pressable>

        <Pressable
          onPress={() => onPageChange(page + 1)}
          disabled={!canGoForward}
          style={iconButtonStyle(!canGoForward)}
          accessibilityRole="button"
          accessibilityLabel="Next page"
          accessibilityState={{ disabled: !canGoForward }}
          testID={testID ? `${testID}-next` : undefined}
        >
          <Text style={textStyle}>›</Text>
        </Pressable>

        {showLastButton && (
          <Pressable
            onPress={() => onPageChange(lastPage)}
            disabled={!canGoForward || lastPage === -1}
            style={iconButtonStyle(!canGoForward || lastPage === -1)}
            accessibilityRole="button"
            accessibilityLabel="Last page"
            accessibilityState={{ disabled: !canGoForward || lastPage === -1 }}
            testID={testID ? `${testID}-last` : undefined}
          >
            <Text style={textStyle}>»</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    minHeight: 52,
  },
  rowsPerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rowsOptions: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 4,
  },
  rowOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  displayedRows: {
    marginHorizontal: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    padding: 8,
    minWidth: 32,
    alignItems: 'center',
  },
});

export { TablePagination };
