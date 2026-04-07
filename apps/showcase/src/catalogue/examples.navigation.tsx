/**
 * catalogue/examples.navigation.tsx
 * ExampleConfig tuples for all NAVIGATION-category components (10 total).
 * Phase 0: 3 migrated priority components with code stubs.
 * Phases 4+: Filled in by T058–T067.
 */

import React from 'react';
import {
  AppBar,
  BottomSheet,
  Breadcrumbs,
  Button,
  Drawer,
  IconButton,
  Link,
  MaterialIcon,
  Menu,
  MenuItem,
  MobileStepper,
  NavigationBar,
  Pagination,
  Step,
  StepLabel,
  Stepper,
  Tabs,
  Text,
  materialIconSource,
} from '@mui-native';
import { View } from 'react-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Stateful wrappers
// ─────────────────────────────────────────────────────────────────────────────

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
// AppBar (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const appBarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Standard top app bar',
    code: `<AppBar title="My App" />`,
    render: () => <AppBar title="My App" />,
  },
  {
    label: 'With Actions',
    description: 'App bar with icon action buttons',
    code: `<AppBar
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
/>`,
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
    code: `<AppBar title="Large Heading" variant="large" />`,
    render: () => <AppBar title="Large Heading" variant="large" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tabs (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const tabsExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Three-tab basic setup',
    code: `const [tab, setTab] = React.useState('home');
<Tabs
  items={[
    { value: 'home', label: 'Home' },
    { value: 'explore', label: 'Explore' },
    { value: 'profile', label: 'Profile' },
  ]}
  value={tab}
  onValueChange={setTab}
/>`,
    render: () => <TabsBasicExample />,
  },
  {
    label: 'Scrollable',
    description: 'Horizontally scrollable tabs',
    code: `const [tab, setTab] = React.useState('one');
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
/>`,
    render: () => <TabsScrollableExample />,
  },
  {
    label: 'Icon + Label',
    description: 'Tabs with icons and labels',
    code: `const [tab, setTab] = React.useState('home');
<Tabs
  items={[
    { value: 'home', label: 'Home', icon: <MaterialIcon name="home" /> },
    { value: 'explore', label: 'Explore', icon: <MaterialIcon name="explore" /> },
    { value: 'person', label: 'Profile', icon: <MaterialIcon name="person" /> },
  ]}
  value={tab}
  onValueChange={setTab}
/>`,
    render: () => <TabsIconLabelExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Drawer (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const drawerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Modal',
    description: 'Overlay modal drawer',
    code: `const [open, setOpen] = React.useState(true);
<Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
  <Text variant="bodyMedium">Drawer item one</Text>
  <Text variant="bodyMedium">Drawer item two</Text>
</Drawer>`,
    render: () => <DrawerModalExample />,
  },
  {
    label: 'Permanent',
    description: 'Always-visible side drawer',
    code: `<Drawer open variant="permanent">
  <Text variant="bodyMedium">Always visible</Text>
  <Text variant="bodyMedium">Navigation item</Text>
</Drawer>`,
    render: () => <DrawerPermanentExample />,
  },
  {
    label: 'With Header',
    description: 'Drawer with header section',
    code: `const [open, setOpen] = React.useState(true);
<Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
  <Text variant="titleMedium">App Navigation</Text>
  <Text variant="bodyMedium">Home</Text>
  <Text variant="bodyMedium">Settings</Text>
</Drawer>`,
    render: () => <DrawerWithHeaderExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BottomSheet (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const BottomSheetBasicExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Bottom Sheet" onPress={() => setVisible(true)} />
      <BottomSheet visible={visible} onDismiss={() => setVisible(false)}>
        <View style={{ padding: 24 }}>
          <Text variant="titleMedium">Sheet Title</Text>
          <Text variant="bodyMedium">Bottom sheet content here.</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const BottomSheetSnappingExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Snapping Sheet" onPress={() => setVisible(true)} />
      <BottomSheet
        visible={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={[200, 400, 700]}
      >
        <View style={{ padding: 24 }}>
          <Text variant="bodyMedium">Drag to snap between points.</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const BottomSheetNoHandleExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open (no handle)" onPress={() => setVisible(true)} />
      <BottomSheet visible={visible} onDismiss={() => setVisible(false)} showHandle={false}>
        <View style={{ padding: 24 }}>
          <Text variant="bodyMedium">No drag handle shown.</Text>
          <Button label="Close" onPress={() => setVisible(false)} />
        </View>
      </BottomSheet>
    </>
  );
};

export const bottomSheetExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Bottom sheet with simple content',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Bottom Sheet" onPress={() => setVisible(true)} />
<BottomSheet visible={visible} onDismiss={() => setVisible(false)}>
  <View style={{ padding: 24 }}>
    <Text variant="titleMedium">Sheet Title</Text>
    <Text variant="bodyMedium">Bottom sheet content here.</Text>
  </View>
</BottomSheet>`,
    render: () => <BottomSheetBasicExample />,
  },
  {
    label: 'Snap Points',
    description: 'Sheet with multiple snap positions',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Snapping Sheet" onPress={() => setVisible(true)} />
<BottomSheet
  visible={visible}
  onDismiss={() => setVisible(false)}
  snapPoints={['25%', '50%', '90%']}
>
  <View style={{ padding: 24 }}>
    <Text variant="bodyMedium">Drag to snap between points.</Text>
  </View>
</BottomSheet>`,
    render: () => <BottomSheetSnappingExample />,
  },
  {
    label: 'No Handle',
    description: 'Sheet without drag handle indicator',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open (no handle)" onPress={() => setVisible(true)} />
<BottomSheet visible={visible} onDismiss={() => setVisible(false)} showHandle={false}>
  <View style={{ padding: 24 }}>
    <Text variant="bodyMedium">No drag handle shown.</Text>
    <Button label="Close" onPress={() => setVisible(false)} />
  </View>
</BottomSheet>`,
    render: () => <BottomSheetNoHandleExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────────────────────────────────────

export const breadcrumbsExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple three-level breadcrumb trail',
    code: `<Breadcrumbs
  items={[
    { label: 'Home' },
    { label: 'Category' },
    { label: 'Current Page' },
  ]}
/>`,
    render: () => (
      <Breadcrumbs
        items={[
          { label: 'Home' },
          { label: 'Category' },
          { label: 'Current Page' },
        ]}
      />
    ),
  },
  {
    label: 'Custom Separator',
    description: 'Breadcrumbs with an arrow separator',
    code: `<Breadcrumbs
  items={[{ label: 'Docs' }, { label: 'Guide' }, { label: 'Setup' }]}
  separator=">"
/>`,
    render: () => (
      <Breadcrumbs
        items={[{ label: 'Docs' }, { label: 'Guide' }, { label: 'Setup' }]}
        separator=">"
      />
    ),
  },
  {
    label: 'Max Items',
    description: 'Collapsed breadcrumbs beyond maxItems',
    code: `<Breadcrumbs
  items={[
    { label: 'Home' },
    { label: 'Products' },
    { label: 'Electronics' },
    { label: 'Phones' },
    { label: 'Current' },
  ]}
  maxItems={3}
/>`,
    render: () => (
      <Breadcrumbs
        items={[
          { label: 'Home' },
          { label: 'Products' },
          { label: 'Electronics' },
          { label: 'Phones' },
          { label: 'Current' },
        ]}
        maxItems={3}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Link
// ─────────────────────────────────────────────────────────────────────────────

export const linkExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Inline hyperlink',
    code: `<Link href="https://example.com">Visit example.com</Link>`,
    render: () => <Link href="https://example.com">Visit example.com</Link>,
  },
  {
    label: 'No Underline',
    description: 'Link without underline decoration',
    code: `<Link href="https://example.com" underline="none">No underline</Link>`,
    render: () => (
      <Link href="https://example.com" underline="none">
        No underline
      </Link>
    ),
  },
  {
    label: 'Coloured',
    description: 'Link with a custom colour',
    code: `<Link href="https://example.com" color="#8B5CF6">Purple link</Link>`,
    render: () => (
      <Link href="https://example.com" color="#8B5CF6">
        Purple link
      </Link>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Menu (stateful wrappers — requires anchor ref)
// ─────────────────────────────────────────────────────────────────────────────

const MenuBasicExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Menu" onPress={() => setVisible(true)} />
      </View>
      <Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
        <MenuItem label="Edit" onPress={() => setVisible(false)} />
        <MenuItem label="Share" onPress={() => setVisible(false)} />
        <MenuItem label="Delete" onPress={() => setVisible(false)} />
      </Menu>
    </>
  );
};

const MenuWithIconsExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Menu" onPress={() => setVisible(true)} />
      </View>
      <Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
        <MenuItem
          label="Edit"
          leadingIcon={<MaterialIcon name="edit" size={20} />}
          onPress={() => setVisible(false)}
        />
        <MenuItem
          label="Delete"
          leadingIcon={<MaterialIcon name="delete" size={20} />}
          onPress={() => setVisible(false)}
        />
      </Menu>
    </>
  );
};

const MenuDisabledItemExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Menu" onPress={() => setVisible(true)} />
      </View>
      <Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
        <MenuItem label="Undo" onPress={() => setVisible(false)} />
        <MenuItem label="Redo" disabled onPress={() => setVisible(false)} />
        <MenuItem label="Cut" onPress={() => setVisible(false)} />
      </Menu>
    </>
  );
};

export const menuExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Context menu with three items',
    code: `const anchorRef = React.useRef<View>(null);
const [visible, setVisible] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Menu" onPress={() => setVisible(true)} />
</View>
<Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
  <MenuItem label="Edit" onPress={() => setVisible(false)} />
  <MenuItem label="Share" onPress={() => setVisible(false)} />
  <MenuItem label="Delete" onPress={() => setVisible(false)} />
</Menu>`,
    render: () => <MenuBasicExample />,
  },
  {
    label: 'With Icons',
    description: 'Menu items with leading icons',
    code: `const anchorRef = React.useRef<View>(null);
const [visible, setVisible] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Menu" onPress={() => setVisible(true)} />
</View>
<Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
  <MenuItem label="Edit" leadingIcon={materialIconSource('edit')} onPress={() => setVisible(false)} />
  <MenuItem label="Delete" leadingIcon={materialIconSource('delete')} onPress={() => setVisible(false)} />
</Menu>`,
    render: () => <MenuWithIconsExample />,
  },
  {
    label: 'Disabled Item',
    description: 'Menu with a disabled non-interactive item',
    code: `const anchorRef = React.useRef<View>(null);
const [visible, setVisible] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Menu" onPress={() => setVisible(true)} />
</View>
<Menu visible={visible} anchor={anchorRef} onDismiss={() => setVisible(false)}>
  <MenuItem label="Undo" onPress={() => setVisible(false)} />
  <MenuItem label="Redo" disabled onPress={() => setVisible(false)} />
  <MenuItem label="Cut" onPress={() => setVisible(false)} />
</Menu>`,
    render: () => <MenuDisabledItemExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavigationBar (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const NavigationBarExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <NavigationBar
      activeIndex={activeIndex}
      items={[
        { icon: <MaterialIcon name="home" />, label: 'Home', onPress: () => setActiveIndex(0) },
        { icon: <MaterialIcon name="search" />, label: 'Search', onPress: () => setActiveIndex(1) },
        { icon: <MaterialIcon name="person" />, label: 'Profile', onPress: () => setActiveIndex(2) },
      ]}
    />
  );
};

const NavigationBarFourItemsExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <NavigationBar
      activeIndex={activeIndex}
      items={[
        { icon: <MaterialIcon name="home" />, label: 'Home', onPress: () => setActiveIndex(0) },
        { icon: <MaterialIcon name="explore" />, label: 'Explore', onPress: () => setActiveIndex(1) },
        { icon: <MaterialIcon name="notifications" />, label: 'Alerts', onPress: () => setActiveIndex(2) },
        { icon: <MaterialIcon name="person" />, label: 'Profile', onPress: () => setActiveIndex(3) },
      ]}
    />
  );
};

const NavigationBarNoLabelsExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <NavigationBar
      activeIndex={activeIndex}
      items={[
        { icon: <MaterialIcon name="home" />, label: '', onPress: () => setActiveIndex(0) },
        { icon: <MaterialIcon name="search" />, label: '', onPress: () => setActiveIndex(1) },
        { icon: <MaterialIcon name="settings" />, label: '', onPress: () => setActiveIndex(2) },
      ]}
    />
  );
};

export const navigationBarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Three Items',
    description: 'Bottom navigation bar with 3 tabs',
    code: `const [activeIndex, setActiveIndex] = React.useState(0);
<NavigationBar
  activeIndex={activeIndex}
  items={[
    { icon: <MaterialIcon name="home" />, label: 'Home', onPress: () => setActiveIndex(0) },
    { icon: <MaterialIcon name="search" />, label: 'Search', onPress: () => setActiveIndex(1) },
    { icon: <MaterialIcon name="person" />, label: 'Profile', onPress: () => setActiveIndex(2) },
  ]}
/>`,
    render: () => <NavigationBarExample />,
  },
  {
    label: 'Four Items',
    description: 'Bottom navigation bar with 4 destinations',
    code: `const [activeIndex, setActiveIndex] = React.useState(0);
<NavigationBar
  activeIndex={activeIndex}
  items={[
    { icon: <MaterialIcon name="home" />, label: 'Home', onPress: () => setActiveIndex(0) },
    { icon: <MaterialIcon name="explore" />, label: 'Explore', onPress: () => setActiveIndex(1) },
    { icon: <MaterialIcon name="notifications" />, label: 'Alerts', onPress: () => setActiveIndex(2) },
    { icon: <MaterialIcon name="person" />, label: 'Profile', onPress: () => setActiveIndex(3) },
  ]}
/>`,
    render: () => <NavigationBarFourItemsExample />,
  },
  {
    label: 'Icons Only',
    description: 'Navigation bar with empty labels',
    code: `const [activeIndex, setActiveIndex] = React.useState(0);
<NavigationBar
  activeIndex={activeIndex}
  items={[
    { icon: <MaterialIcon name="home" />, label: '', onPress: () => setActiveIndex(0) },
    { icon: <MaterialIcon name="search" />, label: '', onPress: () => setActiveIndex(1) },
    { icon: <MaterialIcon name="settings" />, label: '', onPress: () => setActiveIndex(2) },
  ]}
/>`,
    render: () => <NavigationBarNoLabelsExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pagination (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const PaginationBasicExample: React.FC = () => {
  const [page, setPage] = React.useState(1);
  return <Pagination count={10} page={page} onPageChange={(p) => setPage(p)} />;
};

const PaginationSmallExample: React.FC = () => {
  const [page, setPage] = React.useState(1);
  return <Pagination count={5} page={page} onPageChange={(p) => setPage(p)} size="small" />;
};

const PaginationDisabledExample: React.FC = () => {
  return <Pagination count={10} page={3} onPageChange={() => {}} disabled />;
};

export const paginationExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: '10-page pagination control',
    code: `const [page, setPage] = React.useState(1);
<Pagination count={10} page={page} onPageChange={(p) => setPage(p)} />`,
    render: () => <PaginationBasicExample />,
  },
  {
    label: 'Small',
    description: 'Compact pagination variant',
    code: `const [page, setPage] = React.useState(1);
<Pagination count={5} page={page} onPageChange={(p) => setPage(p)} size="small" />`,
    render: () => <PaginationSmallExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive pagination',
    code: `<Pagination count={10} page={3} onPageChange={() => {}} disabled />`,
    render: () => <PaginationDisabledExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Stepper (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const StepperHorizontalExample: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <View style={{ gap: 12 }}>
      <Stepper activeStep={activeStep}>
        <Step><StepLabel>Account</StepLabel></Step>
        <Step><StepLabel>Profile</StepLabel></Step>
        <Step><StepLabel>Review</StepLabel></Step>
      </Stepper>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button label="Back" onPress={() => setActiveStep((s) => Math.max(0, s - 1))} />
        <Button label="Next" onPress={() => setActiveStep((s) => Math.min(2, s + 1))} />
      </View>
    </View>
  );
};

const StepperVerticalExample: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        steps={[
          { label: 'Select plan', description: 'Choose a subscription tier' },
          { label: 'Add payment', description: 'Enter card details' },
          { label: 'Confirm', description: 'Review and submit' },
        ]}
      />
      <Button label="Next" onPress={() => setActiveStep((s) => Math.min(2, s + 1))} />
    </View>
  );
};

const StepperMobileExample: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <MobileStepper
      variant="dots"
      steps={4}
      activeStep={activeStep}
      backButton={
        <Button label="Back" variant="text" onPress={() => setActiveStep((s) => Math.max(0, s - 1))} />
      }
      nextButton={
        <Button label="Next" variant="text" onPress={() => setActiveStep((s) => Math.min(3, s + 1))} />
      }
    />
  );
};

export const stepperExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Composable',
    description: 'Step and StepLabel composable API',
    code: `const [activeStep, setActiveStep] = React.useState(1);
<Stepper activeStep={activeStep}>
  <Step><StepLabel>Account</StepLabel></Step>
  <Step><StepLabel>Profile</StepLabel></Step>
  <Step><StepLabel>Review</StepLabel></Step>
</Stepper>`,
    render: () => <StepperHorizontalExample />,
  },
  {
    label: 'Vertical',
    description: 'Vertical stepper with descriptions',
    code: `const [activeStep, setActiveStep] = React.useState(0);
<Stepper
  activeStep={activeStep}
  orientation="vertical"
  steps={[
    { label: 'Select plan', description: 'Choose a subscription tier' },
    { label: 'Add payment', description: 'Enter card details' },
    { label: 'Confirm', description: 'Review and submit' },
  ]}
/>`,
    render: () => <StepperVerticalExample />,
  },
  {
    label: 'Mobile Stepper',
    description: 'Dot-variant mobile stepper with back/next buttons',
    code: `const [activeStep, setActiveStep] = React.useState(1);
<MobileStepper
  variant="dots"
  steps={4}
  activeStep={activeStep}
  backButton={<Button label="Back" variant="text" onPress={() => {}} />}
  nextButton={<Button label="Next" variant="text" onPress={() => {}} />}
/>`,
    render: () => <StepperMobileExample />,
  },
];
