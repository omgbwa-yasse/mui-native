import React from 'react';

export type TableSize = 'small' | 'medium';
export type TablePaddingVariant = 'normal' | 'checkbox' | 'none';
export type TableVariant = 'head' | 'body' | 'footer';

export interface TableContextValue {
  size: TableSize;
  padding: TablePaddingVariant;
  stickyHeader: boolean;
}

export interface TableSectionContextValue {
  /** Which section (head/body/footer) the cell is in. */
  variant: TableVariant;
}

export const TableContext = React.createContext<TableContextValue>({
  size: 'medium',
  padding: 'normal',
  stickyHeader: false,
});

export const TableSectionContext = React.createContext<TableSectionContextValue>({
  variant: 'body',
});
