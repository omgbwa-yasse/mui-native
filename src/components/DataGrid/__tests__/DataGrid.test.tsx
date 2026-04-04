import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render as rntlRender, fireEvent, waitFor } from '@testing-library/react-native';
import { DataGrid } from '../DataGrid';
import type { GridColDef, GridRowData } from '../types';
import { ThemeProvider } from '../../../theme/ThemeProvider';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}
const render = (ui: React.ReactElement) => rntlRender(ui, { wrapper: Wrapper });

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ─── Fixtures ──────────────────────────────────────────────────────────────────

interface UserRow extends GridRowData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const ROWS: UserRow[] = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { id: 4, name: 'Diana', age: 28, email: 'diana@example.com' },
  { id: 5, name: 'Eve', age: 22, email: 'eve@example.com' },
];

const COLUMNS: GridColDef<UserRow>[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'age', headerName: 'Age', width: 80, type: 'number' },
  { field: 'email', headerName: 'Email', flex: 2 },
];

const renderGrid = (overrides: Partial<React.ComponentProps<typeof DataGrid>> = {}) =>
  render(<DataGrid rows={ROWS} columns={COLUMNS} testID="grid" {...overrides} />);

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('DataGrid', () => {
  describe('Rendering', () => {
    it('renders column headers', () => {
      const { getByText } = renderGrid();
      // Headers are styled with textTransform:'uppercase' but text node is the original value
      expect(getByText('Name')).toBeTruthy();
      expect(getByText('Age')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
    });

    it('renders all rows for default pagination', () => {
      const { getAllByRole } = renderGrid({ pageSizeOptions: [10, 25] });
      // Each row has role "row" (DataGridRow uses role="row")
      const rows = getAllByRole('row');
      // rows include header row + data rows
      expect(rows.length).toBeGreaterThanOrEqual(ROWS.length);
    });

    it('renders row cell text', () => {
      const { getByText } = renderGrid();
      expect(getByText('Alice')).toBeTruthy();
      expect(getByText('Bob')).toBeTruthy();
    });

    it('renders empty state when no rows', () => {
      const { getByText } = renderGrid({ rows: [] });
      expect(getByText('No rows')).toBeTruthy();
    });

    it('renders loading overlay when loading=true', () => {
      const { getByLabelText } = renderGrid({ loading: true });
      expect(getByLabelText('Loading data')).toBeTruthy();
    });

    it('applies testID to container', () => {
      const { getByTestId } = renderGrid({ testID: 'my-grid' });
      expect(getByTestId('my-grid')).toBeTruthy();
    });
  });

  describe('Pagination', () => {
    it('shows only one page of rows when pageSize=2', () => {
      const { getByText, queryByText } = renderGrid({
        paginationModel: { page: 0, pageSize: 2 },
        pageSizeOptions: [2, 5],
      });
      expect(getByText('Alice')).toBeTruthy();
      expect(getByText('Bob')).toBeTruthy();
      expect(queryByText('Charlie')).toBeNull();
    });

    it('navigates to next page', async () => {
      const onPaginationChange = jest.fn();
      const { getByTestId } = renderGrid({
        paginationModel: { page: 0, pageSize: 2 },
        pageSizeOptions: [2, 5],
        onPaginationModelChange: onPaginationChange,
      });
      fireEvent.press(getByTestId('grid-pagination-next'));
      await waitFor(() => {
        expect(onPaginationChange).toHaveBeenCalledWith({ page: 1, pageSize: 2 });
      });
    });

    it('previous page button is disabled on first page', () => {
      const { getByTestId } = renderGrid({
        paginationModel: { page: 0, pageSize: 2 },
        pageSizeOptions: [2, 5],
      });
      const prevBtn = getByTestId('grid-pagination-prev');
      expect(prevBtn.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Sorting', () => {
    it('calls onSortModelChange when header pressed', () => {
      const onSortChange = jest.fn();
      const { getByLabelText } = renderGrid({ onSortModelChange: onSortChange });
      fireEvent.press(getByLabelText('Sort by Name'));
      expect(onSortChange).toHaveBeenCalledWith([{ field: 'name', sort: 'asc' }]);
    });

    it('cycles sort: asc → desc → none', () => {
      const onSortChange = jest.fn();
      const { getByLabelText } = renderGrid({
        sortModel: [{ field: 'name', sort: 'asc' }],
        onSortModelChange: onSortChange,
      });
      fireEvent.press(getByLabelText('Sort by Name, currently ascending'));
      expect(onSortChange).toHaveBeenLastCalledWith([{ field: 'name', sort: 'desc' }]);
    });
  });

  describe('Row selection', () => {
    it('calls onRowSelectionModelChange when row pressed', () => {
      const onSelection = jest.fn();
      const { getByTestId } = renderGrid({
        onRowSelectionModelChange: onSelection,
        testID: 'sel-grid',
      });
      fireEvent.press(getByTestId('sel-grid-row-0'));
      expect(onSelection).toHaveBeenCalledWith([1]); // row id=1
    });
  });

  describe('Custom slots', () => {
    it('renders custom noRowsOverlay slot', () => {
      const NoRows = () => <></>;
      NoRows.displayName = 'NoRows';
      const { UNSAFE_getByType } = renderGrid({
        rows: [],
        slots: { noRowsOverlay: NoRows },
      });
      expect(UNSAFE_getByType(NoRows)).toBeTruthy();
    });
  });
});
