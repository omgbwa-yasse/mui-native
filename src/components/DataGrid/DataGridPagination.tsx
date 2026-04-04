import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { GridPaginationModel } from './types';

interface DataGridPaginationProps {
  paginationModel: GridPaginationModel;
  rowCount: number;
  pageSizeOptions: number[];
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  testID?: string;
}

function DataGridPaginationInner({
  paginationModel,
  rowCount,
  pageSizeOptions,
  onPaginationModelChange,
  testID,
}: DataGridPaginationProps): React.ReactElement {
  const { theme } = useTheme();
  const { page, pageSize } = paginationModel;

  const totalPages = Math.max(1, Math.ceil(rowCount / pageSize));
  const firstRow = rowCount === 0 ? 0 : page * pageSize + 1;
  const lastRow = Math.min((page + 1) * pageSize, rowCount);

  const handlePrev = useCallback(() => {
    if (page <= 0 || !onPaginationModelChange) return;
    onPaginationModelChange({ page: page - 1, pageSize });
  }, [page, pageSize, onPaginationModelChange]);

  const handleNext = useCallback(() => {
    if (page >= totalPages - 1 || !onPaginationModelChange) return;
    onPaginationModelChange({ page: page + 1, pageSize });
  }, [page, totalPages, pageSize, onPaginationModelChange]);

  const handlePageSizeChange = useCallback(
    (size: number) => {
      if (!onPaginationModelChange) return;
      onPaginationModelChange({ page: 0, pageSize: size });
    },
    [onPaginationModelChange],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.colorScheme.outline,
          backgroundColor: theme.colorScheme.surface,
          gap: 8,
        } as const,
        label: {
          fontSize: 13,
          color: theme.colorScheme.onSurfaceVariant,
        } as const,
        pageButton: {
          minWidth: 36,
          height: 36,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 8,
        } as const,
        pageButtonDisabled: {
          opacity: 0.38,
        } as const,
        pageButtonText: {
          fontSize: 18,
          color: theme.colorScheme.onSurface,
        } as const,
        pageSizeSelector: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        } as const,
        pageSizeOption: {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
        } as const,
        pageSizeOptionActive: {
          backgroundColor: theme.colorScheme.primaryContainer,
        } as const,
        pageSizeOptionText: {
          fontSize: 13,
          color: theme.colorScheme.onSurface,
        } as const,
        pageSizeOptionTextActive: {
          color: theme.colorScheme.onPrimaryContainer,
          fontWeight: '600',
        } as const,
      }),
    [theme],
  );

  return (
    <View style={styles.container} testID={testID} accessibilityRole="toolbar">
      {/* Page size selector */}
      <View style={styles.pageSizeSelector}>
        <Text style={styles.label}>Rows:</Text>
        {pageSizeOptions.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.pageSizeOption,
              size === pageSize && styles.pageSizeOptionActive,
            ]}
            onPress={() => handlePageSizeChange(size)}
            accessibilityRole="button"
            accessibilityLabel={`Show ${size} rows per page`}
            accessibilityState={{ selected: size === pageSize }}
            testID={testID != null ? `${testID}-pagesize-${size}` : undefined}
          >
            <Text
              style={[
                styles.pageSizeOptionText,
                size === pageSize && styles.pageSizeOptionTextActive,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Row range label */}
      <Text style={styles.label}>
        {firstRow}–{lastRow} of {rowCount}
      </Text>

      {/* Previous page */}
      <Pressable
        style={[styles.pageButton, page <= 0 && styles.pageButtonDisabled]}
        onPress={handlePrev}
        disabled={page <= 0}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: page <= 0 }}
        testID={testID != null ? `${testID}-prev` : undefined}
      >
        <Text style={styles.pageButtonText}>‹</Text>
      </Pressable>

      {/* Next page */}
      <Pressable
        style={[styles.pageButton, page >= totalPages - 1 && styles.pageButtonDisabled]}
        onPress={handleNext}
        disabled={page >= totalPages - 1}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: page >= totalPages - 1 }}
        testID={testID != null ? `${testID}-next` : undefined}
      >
        <Text style={styles.pageButtonText}>›</Text>
      </Pressable>
    </View>
  );
}

export const DataGridPagination = React.memo(DataGridPaginationInner);
