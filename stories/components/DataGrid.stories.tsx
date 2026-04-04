import React, { useState } from 'react';
import { View } from 'react-native';
import { DataGrid } from '../../src/components/DataGrid/DataGrid';
import type { GridColDef, GridRowData } from '../../src/components/DataGrid/types';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Advanced/DataGrid',
};

// ─── Shared fixtures ─────────────────────────────────────────────────────────

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 60, sortable: false },
  { field: 'name', headerName: 'Name', width: 160, sortable: true, filterable: true },
  { field: 'status', headerName: 'Status', width: 120, sortable: true, filterable: true },
  { field: 'score', headerName: 'Score', width: 80, type: 'number', sortable: true },
];

const STATUSES = ['Active', 'Inactive', 'Pending', 'Archived'];
const NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];

const ROWS: GridRowData[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `${NAMES[i % NAMES.length]} ${String.fromCharCode(65 + Math.floor(i / NAMES.length))}`,
  status: STATUSES[i % STATUSES.length],
  score: Math.round(60 + Math.random() * 40),
}));

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Basic = () => (
  <DataGrid
    rows={ROWS}
    columns={COLUMNS}
    paginationModel={{ page: 0, pageSize: 10 }}
    pageSizeOptions={[10, 20]}
  />
);

export const WithCheckboxSelection = () => {
  const [selection, setSelection] = useState<(string | number)[]>([]);
  return (
    <View style={{ gap: 8, padding: 16 }}>
      <Text variant="bodySmall">
        Selected IDs: {selection.length > 0 ? selection.join(', ') : 'none'}
      </Text>
      <DataGrid
        rows={ROWS}
        columns={COLUMNS}
        paginationModel={{ page: 0, pageSize: 10 }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        rowSelectionModel={selection}
        onRowSelectionModelChange={setSelection}
      />
    </View>
  );
};

export const LoadingState = () => (
  <DataGrid
    rows={[]}
    columns={COLUMNS}
    loading
    paginationModel={{ page: 0, pageSize: 10 }}
    pageSizeOptions={[10]}
  />
);

export const EmptyState = () => (
  <DataGrid
    rows={[]}
    columns={COLUMNS}
    paginationModel={{ page: 0, pageSize: 10 }}
    pageSizeOptions={[10]}
  />
);

export const WithSortAndFilter = () => (
  <DataGrid
    rows={ROWS}
    columns={COLUMNS}
    paginationModel={{ page: 0, pageSize: 10 }}
    pageSizeOptions={[10, 20]}
    filterModel={{ items: [] }}
  />
);
