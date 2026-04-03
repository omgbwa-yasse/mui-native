export interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  testID?: string;
}
