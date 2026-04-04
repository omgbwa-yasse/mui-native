/**
 * catalogue/examples.tsx
 * Live ExampleConfig tuples for the 15 priority components.
 * Each export is a fixed-length tuple of exactly 3 ExampleConfig items.
 *
 * T023–T037: Phase 7 — Author priority examples
 *
 * Stateful wrapper components are defined locally so that render()
 * functions can call hooks via a proper React function component.
 */

import React from 'react';
import {
  Alert,
  AppBar,
  Avatar,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  MaterialIcon,
  Select,
  Snackbar,
  Stack,
  Tabs,
  Text,
  TextField,
  materialIconSource,
} from '@mui-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Stateful wrapper components
// ─────────────────────────────────────────────────────────────────────────────

const SelectSingleExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Select
      label="Fruit"
      value={value}
      onValueChange={v => setValue(v as string)}
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]}
    />
  );
};

const SelectMultipleExample: React.FC = () => {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <Select
      label="Fruits"
      value={values}
      multiple
      onValueChange={v => setValues(v as string[])}
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]}
    />
  );
};

const TabsBasicExample: React.FC = () => {
  const [tab, setTab] = React.useState('home');
  return (
    <Tabs
      items={[
        { value: 'home', label: 'Home' },
        { value: 'explore', label: 'Explore' },
        { value: 'profile', label: 'Profile' },
      ]}
      value={tab}
      onValueChange={setTab}
    />
  );
};

const TabsScrollableExample: React.FC = () => {
  const [tab, setTab] = React.useState('one');
  return (
    <Tabs
      scrollable
      items={[
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' },
        { value: 'five', label: 'Five' },
      ]}
      value={tab}
      onValueChange={setTab}
    />
  );
};

const TabsIconLabelExample: React.FC = () => {
  const [tab, setTab] = React.useState('home');
  return (
    <Tabs
      items={[
        { value: 'home', label: 'Home', icon: <MaterialIcon name="home" /> },
        { value: 'explore', label: 'Explore', icon: <MaterialIcon name="explore" /> },
        { value: 'person', label: 'Profile', icon: <MaterialIcon name="person" /> },
      ]}
      value={tab}
      onValueChange={setTab}
    />
  );
};

const DrawerModalExample: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
      <Text variant="bodyMedium">Drawer item one</Text>
      <Text variant="bodyMedium">Drawer item two</Text>
    </Drawer>
  );
};

const DrawerPermanentExample: React.FC = () => (
  <Drawer open variant="permanent">
    <Text variant="bodyMedium">Always visible</Text>
    <Text variant="bodyMedium">Navigation item</Text>
  </Drawer>
);

const DrawerWithHeaderExample: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
      <Text variant="titleMedium">App Navigation</Text>
      <Text variant="bodyMedium">Home</Text>
      <Text variant="bodyMedium">Settings</Text>
    </Drawer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INPUTS — T023 Button, T024 TextField, T025 Select
// ─────────────────────────────────────────────────────────────────────────────

export const buttonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Contained',
    description: 'Primary contained button',
    render: () => <Button variant="filled" label="Click me" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined button variant',
    render: () => <Button variant="outlined" label="Click me" />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled state',
    render: () => <Button variant="filled" label="Disabled" disabled />,
  },
];

export const textFieldExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Filled',
    description: 'Default filled variant',
    render: () => <TextField label="Email address" variant="filled" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined border variant',
    render: () => <TextField label="Email address" variant="outlined" />,
  },
  {
    label: 'Error',
    description: 'Field with validation error',
    render: () => (
      <TextField label="Email address" error="Invalid email address" />
    ),
  },
];

export const selectExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single',
    description: 'Single item selection',
    render: () => <SelectSingleExample />,
  },
  {
    label: 'Multiple',
    description: 'Multi-item selection',
    render: () => <SelectMultipleExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled state',
    render: () => (
      <Select
        label="Select option"
        value={null}
        onValueChange={() => {}}
        options={[{ value: 'a', label: 'Option A' }]}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA_DISPLAY — T026 Text, T027 Avatar, T028 Chip
// ─────────────────────────────────────────────────────────────────────────────

export const textExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Heading',
    description: 'h4 display heading',
    render: () => <Text variant="headlineLarge">Headline Large</Text>,
  },
  {
    label: 'Body',
    description: 'body1 paragraph text',
    render: () => (
      <Text variant="bodyLarge">
        Body text — the quick brown fox jumps over the lazy dog.
      </Text>
    ),
  },
  {
    label: 'Caption',
    description: 'caption small text',
    render: () => <Text variant="labelSmall">Label small caption</Text>,
  },
];

export const avatarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Image',
    description: 'Avatar with image source',
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
    render: () => (
      <Avatar label="JD" accessibilityLabel="JD initials avatar" />
    ),
  },
  {
    label: 'Icon',
    description: 'Avatar with icon child',
    render: () => (
      <Avatar
        icon={materialIconSource('person')}
        accessibilityLabel="Person icon avatar"
      />
    ),
  },
];

export const chipExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Filled',
    description: 'Default filled chip',
    render: () => <Chip label="React Native" variant="assist" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined chip variant',
    render: () => <Chip label="Selected Filter" variant="filter" selected />,
  },
  {
    label: 'Deletable',
    description: 'Chip with onDelete handler',
    render: () => (
      <Chip label="Removable" variant="input" onRemove={() => {}} />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FEEDBACK — T029 Alert, T030 CircularProgress, T031 Snackbar
// ─────────────────────────────────────────────────────────────────────────────

export const alertExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Success',
    description: 'Positive confirmation alert',
    render: () => (
      <Alert severity="success" title="Success">
        Operation completed successfully.
      </Alert>
    ),
  },
  {
    label: 'Warning',
    description: 'Cautionary warning alert',
    render: () => (
      <Alert severity="warning" title="Warning">
        This action may not be reversible.
      </Alert>
    ),
  },
  {
    label: 'Error',
    description: 'Error or destructive alert',
    render: () => (
      <Alert severity="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    ),
  },
];

export const circularProgressExamples: [
  ExampleConfig,
  ExampleConfig,
  ExampleConfig,
] = [
  {
    label: 'Indeterminate',
    description: 'Spinning indefinitely',
    render: () => <CircularProgress />,
  },
  {
    label: 'Determinate',
    description: '60% progress value',
    render: () => <CircularProgress variant="determinate" value={60} />,
  },
  {
    label: 'Coloured',
    description: 'Custom colour override',
    render: () => <CircularProgress color="#8B5CF6" />,
  },
];

export const snackbarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Info',
    description: 'Informational message',
    render: () => (
      <Snackbar
        item={{ id: '1', message: 'File saved successfully.' }}
        onDismiss={() => {}}
      />
    ),
  },
  {
    label: 'With Action',
    description: 'Snackbar with action button',
    render: () => (
      <Snackbar
        item={{
          id: '2',
          message: 'Item deleted.',
          action: { label: 'Undo', onPress: () => {} },
        }}
        onDismiss={() => {}}
      />
    ),
  },
  {
    label: 'Long Message',
    description: 'Multi-line wrapping message',
    render: () => (
      <Snackbar
        item={{
          id: '3',
          message:
            'This is a longer notification message that wraps across multiple lines on narrow screens.',
        }}
        onDismiss={() => {}}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION — T032 AppBar, T033 Tabs, T034 Drawer
// ─────────────────────────────────────────────────────────────────────────────

export const appBarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Standard top app bar',
    render: () => <AppBar title="My App" />,
  },
  {
    label: 'With Actions',
    description: 'App bar with icon action buttons',
    render: () => (
      <AppBar
        title="My App"
        actions={[
          <IconButton
            key="search"
            icon={materialIconSource('search')}
            accessibilityLabel="Search"
          />,
          <IconButton
            key="more"
            icon={materialIconSource('more_vert')}
            accessibilityLabel="More options"
          />,
        ]}
      />
    ),
  },
  {
    label: 'Elevated',
    description: 'Elevated shadow variant',
    render: () => <AppBar title="Large Heading" variant="large" />,
  },
];

export const tabsExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Three-tab basic setup',
    render: () => <TabsBasicExample />,
  },
  {
    label: 'Scrollable',
    description: 'Horizontally scrollable tabs',
    render: () => <TabsScrollableExample />,
  },
  {
    label: 'Icon + Label',
    description: 'Tabs with icons and labels',
    render: () => <TabsIconLabelExample />,
  },
];

export const drawerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Modal',
    description: 'Overlay modal drawer',
    render: () => <DrawerModalExample />,
  },
  {
    label: 'Permanent',
    description: 'Always-visible side drawer',
    render: () => <DrawerPermanentExample />,
  },
  {
    label: 'With Header',
    description: 'Drawer with header section',
    render: () => <DrawerWithHeaderExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT — T035 Card, T036 Stack, T037 Divider
// ─────────────────────────────────────────────────────────────────────────────

export const cardExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple card with content',
    render: () => (
      <Card>
        <Text variant="bodyMedium">Simple card content goes here.</Text>
      </Card>
    ),
  },
  {
    label: 'Outlined',
    description: 'Outlined border variant',
    render: () => (
      <Card variant="outlined">
        <Text variant="bodyMedium">Outlined card content.</Text>
      </Card>
    ),
  },
  {
    label: 'With Actions',
    description: 'Card with action button',
    render: () => (
      <Card>
        <Text variant="bodyMedium">Card with action button.</Text>
        <Button variant="text" label="Learn More" />
      </Card>
    ),
  },
];

export const stackExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Vertical',
    description: 'Default column direction',
    render: () => (
      <Stack>
        <Text variant="bodyMedium">Item One</Text>
        <Text variant="bodyMedium">Item Two</Text>
        <Text variant="bodyMedium">Item Three</Text>
      </Stack>
    ),
  },
  {
    label: 'Horizontal',
    description: 'Row direction',
    render: () => (
      <Stack direction="row" spacing={8}>
        <Text variant="bodyMedium">One</Text>
        <Text variant="bodyMedium">Two</Text>
        <Text variant="bodyMedium">Three</Text>
      </Stack>
    ),
  },
  {
    label: 'With Gap',
    description: 'Stack with spacing gap',
    render: () => (
      <Stack spacing={16}>
        <Text variant="bodyMedium">Gapped item A</Text>
        <Text variant="bodyMedium">Gapped item B</Text>
        <Text variant="bodyMedium">Gapped item C</Text>
      </Stack>
    ),
  },
];

export const dividerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Horizontal',
    description: 'Full-width horizontal rule',
    render: () => <Divider />,
  },
  {
    label: 'Vertical',
    description: 'Vertical divider inside a row',
    render: () => <Divider orientation="vertical" />,
  },
  {
    label: 'With Label',
    description: 'Divider with centre label',
    render: () => (
      <Stack direction="row" alignItems="center" spacing={8}>
        <Divider />
        <Text variant="labelSmall">OR</Text>
        <Divider />
      </Stack>
    ),
  },
];
