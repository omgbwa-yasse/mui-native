import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: number | string;
  numeric?: boolean;
  sortable?: boolean;
  renderCell?: (row: T) => ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  selectedRows?: string[];
  onRowSelect?: (keys: string[]) => void;
  emptyState?: ReactNode;
  onEndReached?: () => void;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
