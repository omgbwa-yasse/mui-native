# Quickstart: MUI X Advanced Components (React Native)

**Feature**: `005-mui-advanced-components`
**Package**: `mui-native`

> These components are **React Native implementations** with MUI X-compatible prop APIs.
> They DO NOT depend on `@mui/x-*` packages.

---

## Installation

### Base library (already installed)
```sh
npm install mui-native
```

### Optional peer dependencies

Install only the packages for the component groups you use:

| Component group | Peer dependency to install |
|-----------------|---------------------------|
| DatePicker / TimePicker / DateTimePicker | `@react-native-community/datetimepicker` |
| BarChart / LineChart | `react-native-gifted-charts react-native-svg` |
| DataGrid | *(no extra dep — uses FlatList)* |
| SimpleTreeView | *(no extra dep — uses Reanimated)* |

```sh
# Date pickers
npm install @react-native-community/datetimepicker

# Charts
npm install react-native-gifted-charts react-native-svg
# iOS: run `cd ios && pod install`
```

---

## Setup

Wrap your application root with `ThemeProvider` and optionally `LocalizationProvider`:

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider } from 'mui-native';
import { LocalizationProvider } from 'mui-native/date-pickers';

export default function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider locale="en-US">
        {/* your navigation / screens */}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
```

`LocalizationProvider` is optional. DatePickers work without it using the device locale.

---

## Date Pickers

### DatePicker — basic controlled usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { DatePicker } from 'mui-native/date-pickers';

export function BirthDateForm() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View>
      <DatePicker
        label="Date of birth"
        value={date}
        onChange={setDate}
        maxDate={new Date()}
        disableFuture
      />
    </View>
  );
}
```

### DatePicker — with validation message

```tsx
<DatePicker
  label="Check-in"
  value={checkIn}
  onChange={setCheckIn}
  minDate={new Date()}
  slotProps={{
    textField: {
      error: checkIn === null,
      helperText: checkIn === null ? 'Please select a date' : undefined,
    },
  }}
/>
```

### TimePicker

```tsx
import { TimePicker } from 'mui-native/date-pickers';

<TimePicker
  label="Alarm time"
  value={alarmTime}
  onChange={setAlarmTime}
  ampm={false}          // 24-hour format
/>
```

### DateTimePicker

```tsx
import { DateTimePicker } from 'mui-native/date-pickers';

<DateTimePicker
  label="Meeting start"
  value={meeting}
  onChange={setMeeting}
  minDateTime={new Date()}
/>
```

### Custom date adapter (dayjs)

```tsx
import dayjs from 'dayjs';
import { LocalizationProvider } from 'mui-native/date-pickers';
import type { DateAdapter } from 'mui-native/date-pickers';

const dayjsAdapter: DateAdapter = {
  format: (date, fmt) => dayjs(date).format(fmt),
  parse:  (val, fmt)  => { const d = dayjs(val, fmt); return d.isValid() ? d.toDate() : null; },
  isValid: (d) => d !== null && !isNaN(d!.getTime()),
  isBefore: (a, b) => dayjs(a).isBefore(b),
  isAfter:  (a, b) => dayjs(a).isAfter(b),
};

<LocalizationProvider dateAdapter={dayjsAdapter} dateFormats={{ fullDate: 'DD/MM/YYYY' }}>
  <DatePicker value={date} onChange={setDate} />
</LocalizationProvider>
```

---

## DataGrid

```tsx
import React, { useState } from 'react';
import { DataGrid } from 'mui-native';
import type { GridColDef, GridPaginationModel } from 'mui-native';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

const columns: GridColDef<User>[] = [
  { field: 'id',     headerName: 'ID',     width: 60, sortable: false },
  { field: 'name',   headerName: 'Name',   flex: 1 },
  { field: 'email',  headerName: 'Email',  flex: 2, filterable: true },
  { field: 'age',    headerName: 'Age',    width: 80,  type: 'number' },
  {
    field: 'active',
    headerName: 'Status',
    width: 100,
    renderCell: ({ value }) => (
      <Text style={{ color: value ? 'green' : 'red' }}>
        {value ? 'Active' : 'Inactive'}
      </Text>
    ),
  },
];

export function UserTable({ users }: { users: User[] }) {
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  return (
    <DataGrid
      rows={users}
      columns={columns}
      paginationModel={pagination}
      onPaginationModelChange={setPagination}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
    />
  );
}
```

### DataGrid — server-side pagination + sorting

```tsx
export function ServerTable() {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 25 });
  const [sortModel, setSortModel] = useState([]);
  const { data, total, loading } = useServerData({ pagination, sortModel });

  return (
    <DataGrid
      rows={data}
      columns={columns}
      rowCount={total}
      loading={loading}
      paginationModel={pagination}
      onPaginationModelChange={setPagination}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
    />
  );
}
```

### DataGrid — inline editing

```tsx
<DataGrid
  rows={rows}
  columns={[
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'qty',  headerName: 'Qty',  width: 80, type: 'number', editable: true },
  ]}
  editMode="cell"
  processRowUpdate={(newRow, _oldRow) => saveRow(newRow)}
  onProcessRowUpdateError={(err) => console.error('Save failed:', err)}
/>
```

---

## Charts

### BarChart

```tsx
import { BarChart } from 'mui-native/charts';

<BarChart
  series={[
    { data: [40, 60, 80, 50], label: 'Q1', color: '#1976D2' },
    { data: [30, 45, 70, 55], label: 'Q2', color: '#388E3C' },
  ]}
  xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}
  height={280}
/>
```

### BarChart — stacked

```tsx
<BarChart
  series={[
    { data: [10, 20, 30], label: 'Mobile',  stack: 'total', color: '#1976D2' },
    { data: [20, 15, 25], label: 'Desktop', stack: 'total', color: '#42A5F5' },
  ]}
  xAxis={[{ data: ['Week 1', 'Week 2', 'Week 3'] }]}
  height={260}
/>
```

### LineChart

```tsx
import { LineChart } from 'mui-native/charts';

<LineChart
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      label: 'Series A',
      area: true,
      curve: 'monotoneX',
    },
  ]}
  xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
  height={280}
/>
```

---

## TreeView

```tsx
import { SimpleTreeView, TreeItem } from 'mui-native';

export function FileExplorer() {
  return (
    <SimpleTreeView defaultExpandedItems={['src']}>
      <TreeItem itemId="src" label="src/">
        <TreeItem itemId="components" label="components/">
          <TreeItem itemId="btn"  label="Button.tsx" />
          <TreeItem itemId="card" label="Card.tsx" />
        </TreeItem>
        <TreeItem itemId="index" label="index.ts" />
      </TreeItem>
      <TreeItem itemId="tests" label="tests/">
        <TreeItem itemId="unit" label="unit/" />
      </TreeItem>
    </SimpleTreeView>
  );
}
```

### TreeView — controlled selection

```tsx
const [selected, setSelected] = useState<string | null>(null);

<SimpleTreeView
  selectedItems={selected}
  onSelectedItemsChange={setSelected}
  checkboxSelection
>
  <TreeItem itemId="a" label="Option A" />
  <TreeItem itemId="b" label="Option B" />
  <TreeItem itemId="c" label="Option C" disabled />
</SimpleTreeView>
```

### TreeView — multi-select

```tsx
const [selected, setSelected] = useState<string[]>([]);

<SimpleTreeView
  multiSelect
  selectedItems={selected}
  onSelectedItemsChange={(items) => setSelected(items as string[])}
>
  <TreeItem itemId="x" label="Item X" />
  <TreeItem itemId="y" label="Item Y" />
</SimpleTreeView>
```

---

## Accessibility Notes

| Component | Behaviour |
|-----------|-----------|
| DatePicker | Modal has `accessibilityViewIsModal`; trigger has `accessibilityRole="button"` |
| DataGrid | FlatList with `accessibilityRole="grid"`; cells have `accessibilityRole="gridcell"` |
| DataGrid header | `accessibilityRole="columnheader"`, sort state via `accessibilityState` |
| TreeItem | `accessibilityRole="menuitem"`; expand/collapse via `onAccessibilityAction` |
| Charts | `accessibilityLabel` summarising the data set required (passed to container) |

All interactive elements meet the 48 dp minimum touch-target size required by MD3.

---

## RN-DEVIATION Summary

| Feature | MUI X behaviour | React Native behaviour |
|---------|----------------|------------------------|
| Date picker view | Inline calendar grid | Native OS modal/dialog |
| `shouldDisableDate` | Supported | Not supported — use `minDate`/`maxDate` |
| Chart hover tooltip | On mouse hover | On press/long-press |
| `ChartsContainer` | Composition API | Not in v1 |
| DataGrid column resize | Drag handles | Not supported |
| TreeView arrow keys | All platforms | iOS hardware keyboard only |
| `TreeView.apiRef` | Full API | `setPage`, `setSortModel`, `getSelectedRows`, `scrollToRow` only |
