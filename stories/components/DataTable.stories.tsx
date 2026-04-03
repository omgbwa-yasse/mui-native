import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable } from '../../src/components/DataTable/DataTable';
import type { DataTableColumn } from '../../src/components/DataTable/types';

type NutritionRow = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

const COLUMNS: DataTableColumn<NutritionRow>[] = [
  { key: 'name', label: 'Dessert', sortable: true },
  { key: 'calories', label: 'Calories', numeric: true, sortable: true, width: 100 },
  { key: 'fat', label: 'Fat (g)', numeric: true, width: 80 },
  { key: 'carbs', label: 'Carbs (g)', numeric: true, width: 90 },
  { key: 'protein', label: 'Protein (g)', numeric: true, width: 100 },
];

const ROWS: NutritionRow[] = [
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: 'Frozen yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

export default {
  title: 'Components/DataTable',
};

export const Default = () => (
  <DataTable
    columns={COLUMNS}
    rows={ROWS}
    keyExtractor={(r) => r.name}
  />
);

export const Sortable = () => {
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedRows = [...ROWS].sort((a, b) => {
    const key = sortColumn as keyof NutritionRow;
    const aVal = a[key];
    const bVal = b[key];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDirection === 'asc' ? cmp : -cmp;
  });

  return (
    <DataTable
      columns={COLUMNS}
      rows={sortedRows}
      keyExtractor={(r) => r.name}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={(col, dir) => {
        setSortColumn(col);
        setSortDirection(dir);
      }}
    />
  );
};

export const Selectable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <View>
      <Text style={{ padding: 8 }}>
        Selected: {selectedRows.join(', ') || 'none'}
      </Text>
      <DataTable
        columns={COLUMNS}
        rows={ROWS}
        keyExtractor={(r) => r.name}
        selectedRows={selectedRows}
        onRowSelect={setSelectedRows}
      />
    </View>
  );
};

export const EmptyState = () => (
  <DataTable
    columns={COLUMNS}
    rows={[]}
    keyExtractor={(r) => r.name}
    emptyState={
      <View style={{ padding: 32, alignItems: 'center' }}>
        <Text>No records found.</Text>
      </View>
    }
  />
);

export const CustomCellRenderer = () => {
  const customColumns: DataTableColumn<NutritionRow>[] = [
    { key: 'name', label: 'Dessert' },
    {
      key: 'calories',
      label: 'Calories',
      numeric: true,
      width: 110,
      renderCell: (row) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text>{row.calories}</Text>
          {row.calories > 300 && (
            <Text style={{ color: '#d32f2f', fontSize: 10 }}>HIGH</Text>
          )}
        </View>
      ),
    },
  ];

  return (
    <DataTable
      columns={customColumns}
      rows={ROWS}
      keyExtractor={(r) => r.name}
    />
  );
};
