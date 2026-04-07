/**
 * catalogue/examples.dataDisplay.tsx
 * ExampleConfig tuples for all DATA_DISPLAY-category components (20 total).
 * Phase 0: 3 migrated priority components with code stubs.
 * Phases 2+: Filled in by T029–T046.
 */

import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  Chip,
  DataGrid,
  DataTable,
  HumanizationScoreBar,
  Icon,
  ImageList,
  ImageListItem,
  InvitationStatusBadge,
  LineChart,
  List,
  ListAccordion,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSection,
  ListSubheader,
  Masonry,
  MaterialIcon,
  SimpleTreeView,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  Tooltip,
  TreeItem,
  WorkerAgentRow,
  materialIconSource,
} from '@mui-native';
import type { ChartSeries } from '@mui-native';
import { View, Image } from 'react-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Text (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const textExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Heading',
    description: 'h4 display heading',
    code: `<Text variant="headlineLarge">Headline Large</Text>`,
    render: () => <Text variant="headlineLarge">Headline Large</Text>,
  },
  {
    label: 'Body',
    description: 'body1 paragraph text',
    code: `<Text variant="bodyLarge">
  Body text — the quick brown fox jumps over the lazy dog.
</Text>`,
    render: () => (
      <Text variant="bodyLarge">
        Body text — the quick brown fox jumps over the lazy dog.
      </Text>
    ),
  },
  {
    label: 'Caption',
    description: 'caption small text',
    code: `<Text variant="labelSmall">Label small caption</Text>`,
    render: () => <Text variant="labelSmall">Label small caption</Text>,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Avatar (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const avatarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Image',
    description: 'Avatar with image source',
    code: `<Avatar
  source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
  accessibilityLabel="User avatar"
/>`,
    render: () => (
      <Avatar
        source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
        accessibilityLabel="User avatar"
      />
    ),
  },
  {
    label: 'Initials',
    description: 'Avatar with initials string',
    code: `<Avatar label="JD" accessibilityLabel="JD initials avatar" />`,
    render: () => (
      <Avatar label="JD" accessibilityLabel="JD initials avatar" />
    ),
  },
  {
    label: 'Icon',
    description: 'Avatar with icon child',
    code: `<Avatar
  icon={materialIconSource('person')}
  accessibilityLabel="Person icon avatar"
/>`,
    render: () => (
      <Avatar
        icon={materialIconSource('person')}
        accessibilityLabel="Person icon avatar"
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AvatarGroup
// ─────────────────────────────────────────────────────────────────────────────

export const avatarGroupExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Three overlapping avatars',
    code: `<AvatarGroup>
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
</AvatarGroup>`,
    render: () => (
      <AvatarGroup>
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
      </AvatarGroup>
    ),
  },
  {
    label: 'Max Overflow',
    description: 'Shows surplus count badge after max is reached',
    code: `<AvatarGroup max={3}>
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=4' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=5' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=6' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=7' }} />
  <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=8' }} />
</AvatarGroup>`,
    render: () => (
      <AvatarGroup max={3}>
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=4' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=5' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=6' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=7' }} />
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=8' }} />
      </AvatarGroup>
    ),
  },
  {
    label: 'Small Spacing',
    description: 'Tighter overlap with small spacing variant',
    code: `<AvatarGroup spacing="small">
  <Avatar label="A" />
  <Avatar label="B" />
  <Avatar label="C" />
</AvatarGroup>`,
    render: () => (
      <AvatarGroup spacing="small">
        <Avatar label="A" />
        <Avatar label="B" />
        <Avatar label="C" />
      </AvatarGroup>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Chip (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const chipExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Filled',
    description: 'Default filled chip',
    code: `<Chip label="React Native" variant="assist" />`,
    render: () => <Chip label="React Native" variant="assist" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined chip variant',
    code: `<Chip label="Selected Filter" variant="filter" selected />`,
    render: () => <Chip label="Selected Filter" variant="filter" selected />,
  },
  {
    label: 'Deletable',
    description: 'Chip with onDelete handler',
    code: `<Chip label="Removable" variant="input" onRemove={() => {}} />`,
    render: () => (
      <Chip label="Removable" variant="input" onRemove={() => {}} />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────────────────────────────────────

export const badgeExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Numeric',
    description: 'Badge with a numeric count',
    code: `<Badge content={5}>
  <MaterialIcon name="notifications" size={28} />
</Badge>`,
    render: () => (
      <Badge content={5}>
        <MaterialIcon name="notifications" size={28} />
      </Badge>
    ),
  },
  {
    label: 'Dot',
    description: 'Dot badge without content',
    code: `<Badge>
  <MaterialIcon name="mail" size={28} />
</Badge>`,
    render: () => (
      <Badge>
        <MaterialIcon name="mail" size={28} />
      </Badge>
    ),
  },
  {
    label: 'Max Count',
    description: 'Badge capped at max value',
    code: `<Badge content={120} max={99}>
  <MaterialIcon name="forum" size={28} />
</Badge>`,
    render: () => (
      <Badge content={120} max={99}>
        <MaterialIcon name="forum" size={28} />
      </Badge>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Charts
// ─────────────────────────────────────────────────────────────────────────────

const barData: ChartSeries[] = [
  { name: 'Q1', data: [{ value: 40 }, { value: 25 }, { value: 60 }] },
  { name: 'Q2', data: [{ value: 55 }, { value: 30 }, { value: 45 }] },
];

const lineData: ChartSeries[] = [
  { name: 'Revenue', data: [{ value: 20 }, { value: 45 }, { value: 30 }, { value: 65 }] },
];

export const chartsExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Bar Chart',
    description: 'Grouped bar chart',
    code: `const data: ChartSeries[] = [
  { name: 'Q1', data: [{ value: 40 }, { value: 25 }, { value: 60 }] },
  { name: 'Q2', data: [{ value: 55 }, { value: 30 }, { value: 45 }] },
];
<BarChart data={data} height={200} />`,
    render: () => <BarChart data={barData} height={200} />,
  },
  {
    label: 'Line Chart',
    description: 'Simple line chart',
    code: `const data: ChartSeries[] = [
  { name: 'Revenue', data: [{ value: 20 }, { value: 45 }, { value: 30 }, { value: 65 }] },
];
<LineChart data={data} height={200} />`,
    render: () => <LineChart data={lineData} height={200} />,
  },
  {
    label: 'Curved Line',
    description: 'Line chart with curved interpolation',
    code: `<LineChart
  data={[{ name: 'Sales', data: [{ value: 10 }, { value: 50 }, { value: 20 }, { value: 80 }] }]}
  curved
  height={200}
/>`,
    render: () => (
      <LineChart
        data={[{ name: 'Sales', data: [{ value: 10 }, { value: 50 }, { value: 20 }, { value: 80 }] }]}
        curved
        height={200}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DataGrid
// ─────────────────────────────────────────────────────────────────────────────

export const dataGridExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Grid',
    description: 'Simple data table with rows and columns',
    code: `<DataGrid
  rows={[
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
  ]}
  columns={[
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', width: 80 },
  ]}
/>`,
    render: () => (
      <DataGrid
        rows={[
          { id: 1, name: 'Alice', age: 30 },
          { id: 2, name: 'Bob', age: 25 },
        ]}
        columns={[
          { field: 'id', headerName: 'ID', width: 60 },
          { field: 'name', headerName: 'Name', flex: 1 },
          { field: 'age', headerName: 'Age', width: 80 },
        ]}
      />
    ),
  },
  {
    label: 'With Checkbox',
    description: 'Data grid with row selection checkboxes',
    code: `<DataGrid
  rows={[{ id: 1, role: 'Admin' }, { id: 2, role: 'User' }]}
  columns={[
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'role', headerName: 'Role', flex: 1 },
  ]}
  checkboxSelection
/>`,
    render: () => (
      <DataGrid
        rows={[
          { id: 1, role: 'Admin' },
          { id: 2, role: 'User' },
        ]}
        columns={[
          { field: 'id', headerName: 'ID', width: 60 },
          { field: 'role', headerName: 'Role', flex: 1 },
        ]}
        checkboxSelection
      />
    ),
  },
  {
    label: 'Loading',
    description: 'Grid in loading state',
    code: `<DataGrid
  rows={[]}
  columns={[
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ]}
  loading
/>`,
    render: () => (
      <DataGrid
        rows={[]}
        columns={[
          { field: 'id', headerName: 'ID' },
          { field: 'name', headerName: 'Name' },
        ]}
        loading
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DataTable
// ─────────────────────────────────────────────────────────────────────────────

export const dataTableExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple sortable data table',
    code: `<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score', sortable: true },
  ]}
  rows={[
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 87 },
  ]}
  keyExtractor={row => row.name}
/>`,
    render: () => (
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'score', label: 'Score', sortable: true },
        ]}
        rows={[
          { name: 'Alice', score: 95 },
          { name: 'Bob', score: 87 },
        ]}
        keyExtractor={row => (row as { name: string }).name}
      />
    ),
  },
  {
    label: 'Sorted',
    description: 'Table with sort direction applied',
    code: `<DataTable
  columns={[
    { key: 'city', label: 'City', sortable: true },
    { key: 'pop', label: 'Population', sortable: true },
  ]}
  rows={[
    { city: 'Berlin', pop: 3600000 },
    { city: 'Amsterdam', pop: 900000 },
    { city: 'Madrid', pop: 3300000 },
  ]}
  keyExtractor={row => row.city}
  sortColumn="city"
  sortDirection="asc"
/>`,
    render: () => (
      <DataTable
        columns={[
          { key: 'city', label: 'City', sortable: true },
          { key: 'pop', label: 'Population', sortable: true },
        ]}
        rows={[
          { city: 'Berlin', pop: 3600000 },
          { city: 'Amsterdam', pop: 900000 },
          { city: 'Madrid', pop: 3300000 },
        ]}
        keyExtractor={row => (row as { city: string }).city}
        sortColumn="city"
        sortDirection="asc"
      />
    ),
  },
  {
    label: 'Custom Cell',
    description: 'Table with custom cell renderer',
    code: `<DataTable
  columns={[
    { key: 'label', label: 'Item' },
    {
      key: 'active',
      label: 'Status',
      renderCell: (val) => (
        <MaterialIcon name={val ? 'check_circle' : 'cancel'} />
      ),
    },
  ]}
  rows={[{ label: 'Feature A', active: true }, { label: 'Feature B', active: false }]}
  keyExtractor={row => row.label}
/>`,
    render: () => (
      <DataTable
        columns={[
          { key: 'label', label: 'Item' },
          {
            key: 'active',
            label: 'Status',
            renderCell: (val) => (
              <MaterialIcon name={val ? 'check_circle' : 'cancel'} />
            ),
          },
        ]}
        rows={[{ label: 'Feature A', active: true }, { label: 'Feature B', active: false }]}
        keyExtractor={row => (row as { label: string }).label}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HumanizationScoreBar
// ─────────────────────────────────────────────────────────────────────────────

export const humanizationScoreBarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Improved',
    description: 'Score bar showing improvement',
    code: `<HumanizationScoreBar
  fleschKincaidBefore={30}
  fleschKincaidAfter={72}
/>`,
    render: () => (
      <HumanizationScoreBar
        fleschKincaidBefore={30}
        fleschKincaidAfter={72}
      />
    ),
  },
  {
    label: 'High Score',
    description: 'Near-perfect humanization score',
    code: `<HumanizationScoreBar
  fleschKincaidBefore={60}
  fleschKincaidAfter={95}
/>`,
    render: () => (
      <HumanizationScoreBar
        fleschKincaidBefore={60}
        fleschKincaidAfter={95}
      />
    ),
  },
  {
    label: 'No Change',
    description: 'Score bar with equal before/after values',
    code: `<HumanizationScoreBar
  fleschKincaidBefore={50}
  fleschKincaidAfter={50}
/>`,
    render: () => (
      <HumanizationScoreBar
        fleschKincaidBefore={50}
        fleschKincaidAfter={50}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Icon
// ─────────────────────────────────────────────────────────────────────────────

export const iconExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Material Icon Source',
    description: 'Icon using materialIconSource helper',
    code: `<Icon source={materialIconSource('home')} size={32} />`,
    render: () => <Icon source={materialIconSource('home')} size={32} />,
  },
  {
    label: 'Custom Source',
    description: 'Icon using a custom render-prop source',
    code: `<Icon source={materialIconSource('photo_library')} size={32} />`,
    render: () => <Icon source={materialIconSource('photo_library')} size={32} />,
  },
  {
    label: 'Custom Colour',
    description: 'Icon with explicit color override',
    code: `<Icon source={materialIconSource('star')} size={32} color="#f59e0b" />`,
    render: () => (
      <Icon source={materialIconSource('star')} size={32} color="#f59e0b" />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ImageList
// ─────────────────────────────────────────────────────────────────────────────

export const imageListExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Grid 2-Col',
    description: '2-column image grid',
    code: `<ImageList cols={2} rowHeight={120}>
  <ImageListItem img={{ uri: 'https://picsum.photos/200/120?random=1' }} />
  <ImageListItem img={{ uri: 'https://picsum.photos/200/120?random=2' }} />
</ImageList>`,
    render: () => (
      <ImageList cols={2} rowHeight={120}>
        <ImageListItem img={{ uri: 'https://picsum.photos/200/120?random=1' }} />
        <ImageListItem img={{ uri: 'https://picsum.photos/200/120?random=2' }} />
      </ImageList>
    ),
  },
  {
    label: 'Grid 3-Col',
    description: '3-column image grid',
    code: `<ImageList cols={3} rowHeight={100}>
  <ImageListItem img={{ uri: 'https://picsum.photos/100?random=3' }} />
  <ImageListItem img={{ uri: 'https://picsum.photos/100?random=4' }} />
  <ImageListItem img={{ uri: 'https://picsum.photos/100?random=5' }} />
</ImageList>`,
    render: () => (
      <ImageList cols={3} rowHeight={100}>
        <ImageListItem img={{ uri: 'https://picsum.photos/100?random=3' }} />
        <ImageListItem img={{ uri: 'https://picsum.photos/100?random=4' }} />
        <ImageListItem img={{ uri: 'https://picsum.photos/100?random=5' }} />
      </ImageList>
    ),
  },
  {
    label: 'Masonry Variant',
    description: 'Masonry-style image list',
    code: `<ImageList variant="masonry" cols={2}>
  <ImageListItem img={{ uri: 'https://picsum.photos/200/150?random=6' }} />
  <ImageListItem img={{ uri: 'https://picsum.photos/200/100?random=7' }} />
</ImageList>`,
    render: () => (
      <ImageList variant="masonry" cols={2}>
        <ImageListItem img={{ uri: 'https://picsum.photos/200/150?random=6' }} />
        <ImageListItem img={{ uri: 'https://picsum.photos/200/100?random=7' }} />
      </ImageList>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// InvitationStatusBadge
// ─────────────────────────────────────────────────────────────────────────────

export const invitationStatusBadgeExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Active',
    description: 'Active invitation status',
    code: `<InvitationStatusBadge status="active" />`,
    render: () => <InvitationStatusBadge status="active" />,
  },
  {
    label: 'Expired',
    description: 'Expired invitation status',
    code: `<InvitationStatusBadge status="expired" />`,
    render: () => <InvitationStatusBadge status="expired" />,
  },
  {
    label: 'Revoked',
    description: 'Revoked invitation status',
    code: `<InvitationStatusBadge status="revoked" />`,
    render: () => <InvitationStatusBadge status="revoked" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// List
// ─────────────────────────────────────────────────────────────────────────────

export const listExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Simple List',
    description: 'List with basic text items',
    code: `<List>
  <ListItem title="Inbox" />
  <ListItem title="Sent" />
  <ListItem title="Trash" />
</List>`,
    render: () => (
      <List>
        <ListItem title="Inbox" />
        <ListItem title="Sent" />
        <ListItem title="Trash" />
      </List>
    ),
  },
  {
    label: 'With Section',
    description: 'List grouped under a section header',
    code: `<List>
  <ListSection title="Account">
    <ListItem title="Profile" description="Edit your profile" />
    <ListItem title="Security" description="Password and 2FA" />
  </ListSection>
</List>`,
    render: () => (
      <List>
        <ListSection title="Account">
          <ListItem title="Profile" description="Edit your profile" />
          <ListItem title="Security" description="Password and 2FA" />
        </ListSection>
      </List>
    ),
  },
  {
    label: 'Sub-components',
    description: 'MUI-style ListItemButton, ListItemText and ListSubheader',
    code: `<List>
  <ListSubheader>Recent</ListSubheader>
  <ListItemButton onPress={() => {}}>
    <ListItemText primary="Inbox" secondary="3 unread messages" />
  </ListItemButton>
  <ListItemButton onPress={() => {}} selected>
    <ListItemText primary="Starred" secondary="2 items" />
  </ListItemButton>
</List>`,
    render: () => (
      <List>
        <ListSubheader>Recent</ListSubheader>
        <ListItemButton onPress={() => {}}>
          <ListItemText primary="Inbox" secondary="3 unread messages" />
        </ListItemButton>
        <ListItemButton onPress={() => {}} selected>
          <ListItemText primary="Starred" secondary="2 items" />
        </ListItemButton>
      </List>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Masonry
// ─────────────────────────────────────────────────────────────────────────────

export const masonryExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: '2 Columns',
    description: 'Masonry grid with 2 columns',
    code: `<Masonry columns={2} spacing={8}>
  <View style={{ height: 80, backgroundColor: '#90caf9', borderRadius: 4 }} />
  <View style={{ height: 120, backgroundColor: '#a5d6a7', borderRadius: 4 }} />
  <View style={{ height: 60, backgroundColor: '#ffcc80', borderRadius: 4 }} />
  <View style={{ height: 100, backgroundColor: '#ce93d8', borderRadius: 4 }} />
</Masonry>`,
    render: () => (
      <Masonry columns={2} spacing={8}>
        <View style={{ height: 80, backgroundColor: '#90caf9', borderRadius: 4 }} />
        <View style={{ height: 120, backgroundColor: '#a5d6a7', borderRadius: 4 }} />
        <View style={{ height: 60, backgroundColor: '#ffcc80', borderRadius: 4 }} />
        <View style={{ height: 100, backgroundColor: '#ce93d8', borderRadius: 4 }} />
      </Masonry>
    ),
  },
  {
    label: '3 Columns',
    description: 'Masonry grid with 3 columns',
    code: `<Masonry columns={3} spacing={4}>
  <View style={{ height: 60, backgroundColor: '#ef9a9a', borderRadius: 4 }} />
  <View style={{ height: 90, backgroundColor: '#80cbc4', borderRadius: 4 }} />
  <View style={{ height: 50, backgroundColor: '#ffe082', borderRadius: 4 }} />
</Masonry>`,
    render: () => (
      <Masonry columns={3} spacing={4}>
        <View style={{ height: 60, backgroundColor: '#ef9a9a', borderRadius: 4 }} />
        <View style={{ height: 90, backgroundColor: '#80cbc4', borderRadius: 4 }} />
        <View style={{ height: 50, backgroundColor: '#ffe082', borderRadius: 4 }} />
      </Masonry>
    ),
  },
  {
    label: 'With Spacing',
    description: 'Masonry with generous item spacing',
    code: `<Masonry columns={2} spacing={16}>
  <View style={{ height: 70, backgroundColor: '#b39ddb', borderRadius: 8 }} />
  <View style={{ height: 110, backgroundColor: '#80deea', borderRadius: 8 }} />
</Masonry>`,
    render: () => (
      <Masonry columns={2} spacing={16}>
        <View style={{ height: 70, backgroundColor: '#b39ddb', borderRadius: 8 }} />
        <View style={{ height: 110, backgroundColor: '#80deea', borderRadius: 8 }} />
      </Masonry>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Table
// ─────────────────────────────────────────────────────────────────────────────

export const tableExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple table with head and body rows',
    code: `<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell variant="head">Name</TableCell>
        <TableCell variant="head">Role</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Alice</TableCell>
        <TableCell>Admin</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Editor</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>`,
    render: () => (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Name</TableCell>
              <TableCell variant="head">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Alice</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>Editor</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ),
  },
  {
    label: 'Dense',
    description: 'Compact table with size="small"',
    code: `<TableContainer>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell variant="head">City</TableCell>
        <TableCell variant="head" align="right">Population</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Paris</TableCell>
        <TableCell align="right">2.1M</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>London</TableCell>
        <TableCell align="right">8.9M</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Tokyo</TableCell>
        <TableCell align="right">13.9M</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>`,
    render: () => (
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head">City</TableCell>
              <TableCell variant="head" align="right">Population</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Paris</TableCell>
              <TableCell align="right">2.1M</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>London</TableCell>
              <TableCell align="right">8.9M</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tokyo</TableCell>
              <TableCell align="right">13.9M</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ),
  },
  {
    label: 'Aligned Columns',
    description: 'Table with mixed column alignments',
    code: `<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell variant="head">Product</TableCell>
        <TableCell variant="head" align="center">Qty</TableCell>
        <TableCell variant="head" align="right">Price</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Widget A</TableCell>
        <TableCell align="center">12</TableCell>
        <TableCell align="right">$4.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Widget B</TableCell>
        <TableCell align="center">7</TableCell>
        <TableCell align="right">$9.99</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>`,
    render: () => (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Product</TableCell>
              <TableCell variant="head" align="center">Qty</TableCell>
              <TableCell variant="head" align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Widget A</TableCell>
              <TableCell align="center">12</TableCell>
              <TableCell align="right">$4.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Widget B</TableCell>
              <TableCell align="center">7</TableCell>
              <TableCell align="right">$9.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MaterialIcon
// ─────────────────────────────────────────────────────────────────────────────

export const materialIconExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Filled',
    description: 'Default filled Material Symbol',
    code: `<MaterialIcon name="favorite" size={32} />`,
    render: () => <MaterialIcon name="favorite" size={32} />,
  },
  {
    label: 'Outlined',
    description: 'Outlined icon variant',
    code: `<MaterialIcon name="favorite" variant="outlined" size={32} />`,
    render: () => <MaterialIcon name="favorite" variant="outlined" size={32} />,
  },
  {
    label: 'Custom Colour',
    description: 'Icon with a custom color',
    code: `<MaterialIcon name="star" size={32} color="#f59e0b" />`,
    render: () => <MaterialIcon name="star" size={32} color="#f59e0b" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Timeline
// ─────────────────────────────────────────────────────────────────────────────

export const timelineExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Vertical timeline with events',
    code: `<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>Order placed</TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot />
    </TimelineSeparator>
    <TimelineContent>Delivered</TimelineContent>
  </TimelineItem>
</Timeline>`,
    render: () => (
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Order placed</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Delivered</TimelineContent>
        </TimelineItem>
      </Timeline>
    ),
  },
  {
    label: 'Colored Dots',
    description: 'Timeline with colored dot variants',
    code: `<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="success" />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>Completed</TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="warning" />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>In Progress</TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="error" />
    </TimelineSeparator>
    <TimelineContent>Failed</TimelineContent>
  </TimelineItem>
</Timeline>`,
    render: () => (
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Completed</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="warning" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>In Progress</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Failed</TimelineContent>
        </TimelineItem>
      </Timeline>
    ),
  },
  {
    label: 'With Icons',
    description: 'Timeline dots containing icons',
    code: `<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot><MaterialIcon name="shopping_cart" size={16} /></TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>Cart</TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot><MaterialIcon name="local_shipping" size={16} /></TimelineDot>
    </TimelineSeparator>
    <TimelineContent>Shipped</TimelineContent>
  </TimelineItem>
</Timeline>`,
    render: () => (
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot><MaterialIcon name="shopping_cart" size={16} /></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Cart</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot><MaterialIcon name="local_shipping" size={16} /></TimelineDot>
          </TimelineSeparator>
          <TimelineContent>Shipped</TimelineContent>
        </TimelineItem>
      </Timeline>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip
// ─────────────────────────────────────────────────────────────────────────────

export const tooltipExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Tooltip shown on long-press',
    code: `<Tooltip title="This is a helpful tooltip">
  <MaterialIcon name="info" size={28} accessibilityLabel="Info" />
</Tooltip>`,
    render: () => (
      <Tooltip title="This is a helpful tooltip">
        <MaterialIcon name="info" size={28} accessibilityLabel="Info" />
      </Tooltip>
    ),
  },
  {
    label: 'Bottom',
    description: 'Tooltip anchored below the element',
    code: `<Tooltip title="Bottom tooltip" placement="bottom">
  <MaterialIcon name="help" size={28} accessibilityLabel="Help" />
</Tooltip>`,
    render: () => (
      <Tooltip title="Bottom tooltip" placement="bottom">
        <MaterialIcon name="help" size={28} accessibilityLabel="Help" />
      </Tooltip>
    ),
  },
  {
    label: 'On Button',
    description: 'Tooltip wrapping a button element',
    code: `<Tooltip title="Save your work">
  <MaterialIcon name="save" size={28} accessibilityLabel="Save" />
</Tooltip>`,
    render: () => (
      <Tooltip title="Save your work">
        <MaterialIcon name="save" size={28} accessibilityLabel="Save" />
      </Tooltip>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TreeView (SimpleTreeView + TreeItem)
// ─────────────────────────────────────────────────────────────────────────────

export const treeViewExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Tree',
    description: 'Collapsible tree hierarchy',
    code: `<SimpleTreeView>
  <TreeItem itemId="1" label="Documents">
    <TreeItem itemId="1-1" label="Report.pdf" />
    <TreeItem itemId="1-2" label="Notes.txt" />
  </TreeItem>
  <TreeItem itemId="2" label="Images">
    <TreeItem itemId="2-1" label="photo.jpg" />
  </TreeItem>
</SimpleTreeView>`,
    render: () => (
      <SimpleTreeView>
        <TreeItem itemId="1" label="Documents">
          <TreeItem itemId="1-1" label="Report.pdf" />
          <TreeItem itemId="1-2" label="Notes.txt" />
        </TreeItem>
        <TreeItem itemId="2" label="Images">
          <TreeItem itemId="2-1" label="photo.jpg" />
        </TreeItem>
      </SimpleTreeView>
    ),
  },
  {
    label: 'Multi-Select',
    description: 'Tree with multiple node selection',
    code: `<SimpleTreeView multiSelect>
  <TreeItem itemId="a" label="Frontend">
    <TreeItem itemId="a-1" label="React" />
    <TreeItem itemId="a-2" label="Vue" />
  </TreeItem>
  <TreeItem itemId="b" label="Backend">
    <TreeItem itemId="b-1" label="Node.js" />
  </TreeItem>
</SimpleTreeView>`,
    render: () => (
      <SimpleTreeView multiSelect>
        <TreeItem itemId="a" label="Frontend">
          <TreeItem itemId="a-1" label="React" />
          <TreeItem itemId="a-2" label="Vue" />
        </TreeItem>
        <TreeItem itemId="b" label="Backend">
          <TreeItem itemId="b-1" label="Node.js" />
        </TreeItem>
      </SimpleTreeView>
    ),
  },
  {
    label: 'With Checkboxes',
    description: 'Tree with checkbox indicators',
    code: `<SimpleTreeView checkboxSelection>
  <TreeItem itemId="x" label="Project">
    <TreeItem itemId="x-1" label="src/" />
    <TreeItem itemId="x-2" label="tests/" />
  </TreeItem>
</SimpleTreeView>`,
    render: () => (
      <SimpleTreeView checkboxSelection>
        <TreeItem itemId="x" label="Project">
          <TreeItem itemId="x-1" label="src/" />
          <TreeItem itemId="x-2" label="tests/" />
        </TreeItem>
      </SimpleTreeView>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WorkerAgentRow
// ─────────────────────────────────────────────────────────────────────────────

export const workerAgentRowExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Running',
    description: 'Worker row in running state',
    code: `<WorkerAgentRow
  workerId="worker-1"
  sectionIndex={0}
  status="running"
  progressPercent={65}
  label="Processing document"
/>`,
    render: () => (
      <WorkerAgentRow
        workerId="worker-1"
        sectionIndex={0}
        status="running"
        progressPercent={65}
        label="Processing document"
      />
    ),
  },
  {
    label: 'Completed',
    description: 'Worker row in completed state',
    code: `<WorkerAgentRow
  workerId="worker-2"
  sectionIndex={1}
  status="completed"
  progressPercent={100}
  label="Analysis complete"
/>`,
    render: () => (
      <WorkerAgentRow
        workerId="worker-2"
        sectionIndex={1}
        status="completed"
        progressPercent={100}
        label="Analysis complete"
      />
    ),
  },
  {
    label: 'Failed',
    description: 'Worker row in failed state',
    code: `<WorkerAgentRow
  workerId="worker-3"
  sectionIndex={2}
  status="failed"
  progressPercent={40}
  label="Timeout error"
/>`,
    render: () => (
      <WorkerAgentRow
        workerId="worker-3"
        sectionIndex={2}
        status="failed"
        progressPercent={40}
        label="Timeout error"
      />
    ),
  },
];
