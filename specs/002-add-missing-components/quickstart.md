# Quickstart: Add Missing UI Components

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02

This guide shows how to use every new component group in a React Native app.
All components require `ThemeProvider` and `PortalHost` at the application root.

---

## Setup

```tsx
// App.tsx
import { ThemeProvider } from '@your-org/design/theme';
import { PortalHost }    from '@your-org/design/components/Portal';

export default function App() {
  return (
    <ThemeProvider>
      <PortalHost>
        {/* your app navigation / screens */}
      </PortalHost>
    </ThemeProvider>
  );
}
```

---

## Phase 1 — Core Utilities

### TouchableRipple
```tsx
import { TouchableRipple } from '@your-org/design/components/TouchableRipple';

<TouchableRipple onPress={() => console.log('pressed')} accessibilityLabel="Tap me">
  <Text>Press me</Text>
</TouchableRipple>
```

### Icon
```tsx
import { Icon } from '@your-org/design/components/Icon';

// String-based (renderer resolved via global IconContext)
<Icon source="home" size={24} />

// ReactNode
<Icon source={<MySVGIcon />} size={24} />

// Render function
<Icon source={(size, color) => <MySVGIcon size={size} color={color} />} />
```

### Text (Typography)
```tsx
import { Text } from '@your-org/design/components/Text';

<Text variant="headlineMedium">Hello, Material 3</Text>
<Text variant="bodySmall">Supporting copy</Text>
```

---

## Phase 2 — Feedback & Overlays

### ActivityIndicator
```tsx
import { ActivityIndicator } from '@your-org/design/components/ActivityIndicator';

// Indeterminate circular
<ActivityIndicator animating />

// Determinate linear
<ActivityIndicator variant="linear" progress={0.6} />
```

### Skeleton
```tsx
import { Skeleton } from '@your-org/design/components/Skeleton';

<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="text"        lines={3} />
<Skeleton variant="rectangular" width="100%" height={200} />
```

### Alert
```tsx
import { Alert } from '@your-org/design/components/Alert';

<Alert severity="error"   onClose={() => {}}>Something went wrong.</Alert>
<Alert severity="success">Your changes were saved.</Alert>
<Alert severity="info"    title="FYI">A new update is available.</Alert>
```

### Backdrop
```tsx
import { Backdrop } from '@your-org/design/components/Backdrop';

const [open, setOpen] = React.useState(false);

<Backdrop visible={open} onDismiss={() => setOpen(false)} />
```

### Snackbar
```tsx
import { Snackbar } from '@your-org/design/components/Snackbar';

const [visible, setVisible] = React.useState(false);

<Snackbar
  visible={visible}
  onDismiss={() => setVisible(false)}
  action={{ label: 'Undo', onPress: () => {} }}
>
  Item deleted
</Snackbar>
```

### Modal
```tsx
import { Modal } from '@your-org/design/components/Modal';

const [visible, setVisible] = React.useState(false);

<Modal visible={visible} onDismiss={() => setVisible(false)}>
  <View style={{ padding: 24 }}>
    <Text variant="titleMedium">Modal title</Text>
  </View>
</Modal>
```

---

## Phase 3 — Form Controls

### Checkbox
```tsx
import { Checkbox } from '@your-org/design/components/Checkbox';

const [checked, setChecked] = React.useState(false);

<Checkbox
  status={checked ? 'checked' : 'unchecked'}
  onValueChange={setChecked}
  label="Accept terms"
/>
```

### RadioButton
```tsx
import { RadioButton, RadioGroup } from '@your-org/design/components/RadioButton';

const [value, setValue] = React.useState('a');

<RadioGroup value={value} onValueChange={setValue}>
  <RadioButton value="a" label="Option A" />
  <RadioButton value="b" label="Option B" />
</RadioGroup>
```

### Switch
```tsx
import { Switch } from '@your-org/design/components/Switch';

const [on, setOn] = React.useState(false);

<Switch value={on} onValueChange={setOn} label="Dark mode" />
```

### Slider
```tsx
import { Slider } from '@your-org/design/components/Slider';

const [val, setVal] = React.useState(50);

<Slider
  value={val}
  onValueChange={setVal}
  minimumValue={0}
  maximumValue={100}
  step={5}
/>
```

### Select
```tsx
import { Select } from '@your-org/design/components/Select';

const [lang, setLang] = React.useState('en');

<Select
  label="Language"
  options={[
    { label: 'English', value: 'en' },
    { label: 'French',  value: 'fr' },
  ]}
  value={lang}
  onValueChange={setLang}
/>
```

### Searchbar
```tsx
import { Searchbar } from '@your-org/design/components/Searchbar';

const [query, setQuery] = React.useState('');

<Searchbar
  placeholder="Search..."
  value={query}
  onChangeText={setQuery}
  onClearIconPress={() => setQuery('')}
/>
```

### SegmentedButtons
```tsx
import { SegmentedButtons } from '@your-org/design/components/SegmentedButtons';

const [view, setView] = React.useState('list');

<SegmentedButtons
  value={view}
  onValueChange={setView}
  buttons={[
    { value: 'list',  label: 'List',  icon: 'view-list' },
    { value: 'grid',  label: 'Grid',  icon: 'view-grid' },
  ]}
/>
```

### Autocomplete
```tsx
import { Autocomplete } from '@your-org/design/components/Autocomplete';

<Autocomplete
  label="Country"
  options={[
    { label: 'France',  value: 'fr' },
    { label: 'Germany', value: 'de' },
  ]}
  onValueChange={(v) => console.log(v)}
/>
```

### NumberField
```tsx
import { NumberField } from '@your-org/design/components/NumberField';

const [qty, setQty] = React.useState(1);

<NumberField
  label="Quantity"
  value={qty}
  onValueChange={setQty}
  min={1}
  max={99}
/>
```

---

## Phase 4 — Navigation & Structure

### Tabs
```tsx
import { Tabs } from '@your-org/design/components/Tabs';

const [tab, setTab] = React.useState('home');

<Tabs
  value={tab}
  onValueChange={setTab}
  items={[
    { value: 'home',    label: 'Home',    icon: 'home' },
    { value: 'search',  label: 'Search',  icon: 'magnify' },
    { value: 'profile', label: 'Profile', icon: 'account' },
  ]}
>
  {(active) => <MyTabContent tab={active} />}
</Tabs>
```

### Drawer
```tsx
import { Drawer } from '@your-org/design/components/Drawer';

const [open, setOpen] = React.useState(false);

<Drawer open={open} onClose={() => setOpen(false)}>
  <Text variant="titleMedium" style={{ padding: 16 }}>Navigation</Text>
  {/* nav items */}
</Drawer>
```

### Stepper
```tsx
import { Stepper } from '@your-org/design/components/Stepper';

<Stepper
  activeStep={1}
  steps={[
    { label: 'Cart' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Confirm' },
  ]}
/>
```

### Pagination
```tsx
import { Pagination } from '@your-org/design/components/Pagination';

const [page, setPage] = React.useState(1);

<Pagination count={10} page={page} onPageChange={setPage} />
```

### Breadcrumbs
```tsx
import { Breadcrumbs } from '@your-org/design/components/Breadcrumbs';

<Breadcrumbs
  items={[
    { label: 'Home',     onPress: () => {} },
    { label: 'Products', onPress: () => {} },
    { label: 'Details' },
  ]}
/>
```

### SpeedDial
```tsx
import { SpeedDial } from '@your-org/design/components/SpeedDial';

<SpeedDial
  icon="plus"
  actions={[
    { key: 'copy',  icon: 'content-copy',  label: 'Copy',  onPress: () => {} },
    { key: 'share', icon: 'share-variant',  label: 'Share', onPress: () => {} },
  ]}
/>
```

---

## Phase 5 — Display & Content

### Avatar
```tsx
import { Avatar } from '@your-org/design/components/Avatar';

// Image
<Avatar source={{ uri: 'https://example.com/photo.jpg' }} size={48} />

// Initials fallback
<Avatar label="Jane Doe" size={48} />

// Icon fallback
<Avatar icon="account" size={48} />
```

### Badge
```tsx
import { Badge } from '@your-org/design/components/Badge';

// Dot badge
<Badge><IconButton icon="bell" accessibilityLabel="Notifications" /></Badge>

// Count badge (capped at 99)
<Badge content={105} max={99}>
  <IconButton icon="bell" accessibilityLabel="Notifications" />
</Badge>
```

### List
```tsx
import { List, ListItem, ListSection } from '@your-org/design/components/List';

<List>
  <ListSection title="Recent">
    <ListItem
      title="Inbox"
      description="3 new messages"
      left={(p) => <Icon source="inbox" color={p.color} />}
      onPress={() => {}}
    />
  </ListSection>
</List>
```

### DataTable
```tsx
import { DataTable } from '@your-org/design/components/DataTable';

<DataTable
  columns={[
    { key: 'name',   header: 'Name',   sortable: true },
    { key: 'status', header: 'Status' },
  ]}
  rows={[
    { id: '1', name: 'Alice', status: 'Active' },
    { id: '2', name: 'Bob',   status: 'Inactive' },
  ]}
  keyExtractor={(row) => row.id}
/>
```

### Tooltip
```tsx
import { Tooltip } from '@your-org/design/components/Tooltip';

<Tooltip title="Delete item" placement="bottom">
  <IconButton icon="delete" accessibilityLabel="Delete" />
</Tooltip>
```

### Rating
```tsx
import { Rating } from '@your-org/design/components/Rating';

const [stars, setStars] = React.useState(3);

<Rating value={stars} onValueChange={setStars} max={5} />
```

### Banner
```tsx
import { Banner } from '@your-org/design/components/Banner';

<Banner
  visible={true}
  icon="wifi-off"
  actions={[
    { label: 'Retry',   onPress: () => {} },
    { label: 'Dismiss', onPress: () => {} },
  ]}
>
  You're offline. Connect to the internet to continue.
</Banner>
```

### IconButton
```tsx
import { IconButton } from '@your-org/design/components/IconButton';

<IconButton icon="heart" accessibilityLabel="Like" onPress={() => {}} />

// Filled toggle
<IconButton
  icon="heart"
  variant="filled"
  selected={liked}
  accessibilityLabel="Like"
  onPress={() => setLiked((v) => !v)}
/>
```

---

## Phase 6 — Layout Primitives

### Box
```tsx
import { Box } from '@your-org/design/components/Box';

<Box p="md" mx="sm">
  <Text>Padded content</Text>
</Box>
```

### Container
```tsx
import { Container } from '@your-org/design/components/Container';

<Container maxWidth="md">
  <Text>Centered, max-width content</Text>
</Container>
```

### Grid
```tsx
import { Grid, GridItem } from '@your-org/design/components/Grid';

<Grid columns={12} spacing={2}>
  <GridItem xs={12} sm={6}><Card /></GridItem>
  <GridItem xs={12} sm={6}><Card /></GridItem>
</Grid>
```

### Stack
```tsx
import { Stack } from '@your-org/design/components/Stack';

<Stack direction="row" spacing="sm" alignItems="center">
  <Avatar label="JD" />
  <Text variant="titleMedium">Jane Doe</Text>
</Stack>
```

### Paper
```tsx
import { Paper } from '@your-org/design/components/Paper';

<Paper elevation={2} style={{ padding: 16 }}>
  <Text>Elevated surface</Text>
</Paper>
```

### Accordion
```tsx
import { Accordion } from '@your-org/design/components/Accordion';

<Accordion title="Shipping information">
  <Text>Your order ships within 3–5 business days.</Text>
</Accordion>
```

### ImageList
```tsx
import { ImageList } from '@your-org/design/components/ImageList';

<ImageList
  variant="quilted"
  cols={3}
  items={photos.map((p) => ({ key: p.id, source: { uri: p.url }, title: p.title }))}
/>
```

---

## Phase 7 — Specialized Utilities

### Menu
```tsx
import { Menu, MenuItem } from '@your-org/design/components/Menu';

const [visible, setVisible] = React.useState(false);

<Menu
  visible={visible}
  onDismiss={() => setVisible(false)}
  anchor={<IconButton icon="dots-vertical" accessibilityLabel="More" onPress={() => setVisible(true)} />}
>
  <MenuItem title="Edit"   onPress={() => {}} />
  <MenuItem title="Delete" onPress={() => {}} />
</Menu>
```

### ButtonGroup
```tsx
import { ButtonGroup }       from '@your-org/design/components/ButtonGroup';
import { Button }            from '@your-org/design/components/Button';

<ButtonGroup variant="outlined">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
```

### HelperText
```tsx
import { HelperText } from '@your-org/design/components/HelperText';

<HelperText type="error" visible={hasError}>
  Invalid email address.
</HelperText>
```

### Link
```tsx
import { Link } from '@your-org/design/components/Link';

<Link onPress={() => Linking.openURL('https://example.com')}>
  Visit our website
</Link>
```

### TransferList
```tsx
import { TransferList } from '@your-org/design/components/TransferList';

const [available, setAvailable] = React.useState(itemsLeft);
const [selected,  setSelected]  = React.useState(itemsRight);

<TransferList
  available={available}
  selected={selected}
  onAvailableChange={setAvailable}
  onSelectedChange={setSelected}
  availableLabel="Choices"
  selectedLabel="Selected"
/>
```

---

## Accessibility Checklist

Every component in this library:
- exposes `testID` for E2E targeting
- exposes `accessibilityLabel` (required on `IconButton`)
- uses `AccessibilityRole` appropriate to its semantic role
- ships zero warnings under `@testing-library/react-native` a11y query
