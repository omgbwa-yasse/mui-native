import { StyleSheet } from 'react-native';
import type { Theme } from '../../theme/types';
import type { GridDensity } from './types';

export function createDataGridStyles(theme: Theme, density: GridDensity) {
  const cellPaddingVertical = density === 'compact' ? 4 : 8;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colorScheme.surface,
      borderWidth: 1,
      borderColor: theme.colorScheme.outline,
      borderRadius: 4,
      overflow: 'hidden',
    },
    flatList: {
      flex: 1,
    },
    flatListContent: {
      flexGrow: 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colorScheme.scrim + '33', // 20% opacity
    },
    loadingText: {
      color: theme.colorScheme.onSurface,
      marginTop: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 48,
    },
    emptyText: {
      color: theme.colorScheme.onSurfaceVariant,
      fontSize: 14,
    },
    // Cell dimensional helpers (consumed by sub-components via density prop)
    cell: {
      paddingVertical: cellPaddingVertical,
      paddingHorizontal: 8,
    },
  });
}
