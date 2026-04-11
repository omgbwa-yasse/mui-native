/**
 * catalogue/examples.feedback.tsx
 * ExampleConfig tuples for all FEEDBACK-category components (11 total).
 * Phase 0: 3 migrated priority components with code stubs.
 * Phases 3+: Filled in by T047–T057.
 */

import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Backdrop,
  Banner,
  Button,
  CircularProgress,
  Dialog,
  LinearProgress,
  ProgressBar,
  MaterialIcon,
  Modal,
  Skeleton,
  Snackbar,
  SpeedDial,
  Text,
  materialIconSource,
} from '@mui-native';
import { View } from 'react-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Alert (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const alertExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Success',
    description: 'Positive confirmation alert',
    code: `<Alert severity="success" title="Success">
  Operation completed successfully.
</Alert>`,
    render: () => (
      <Alert severity="success" title="Success">
        Operation completed successfully.
      </Alert>
    ),
  },
  {
    label: 'Warning',
    description: 'Cautionary warning alert',
    code: `<Alert severity="warning" title="Warning">
  This action may not be reversible.
</Alert>`,
    render: () => (
      <Alert severity="warning" title="Warning">
        This action may not be reversible.
      </Alert>
    ),
  },
  {
    label: 'Error',
    description: 'Error or destructive alert',
    code: `<Alert severity="error" title="Error">
  Something went wrong. Please try again.
</Alert>`,
    render: () => (
      <Alert severity="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CircularProgress (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const circularProgressExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Indeterminate',
    description: 'Spinning indefinitely',
    code: `<CircularProgress />`,
    render: () => <CircularProgress />,
  },
  {
    label: 'Determinate',
    description: '60% progress value',
    code: `<CircularProgress variant="determinate" value={60} />`,
    render: () => <CircularProgress variant="determinate" value={60} />,
  },
  {
    label: 'Coloured',
    description: 'Custom colour override',
    code: `<CircularProgress color="#8B5CF6" />`,
    render: () => <CircularProgress color="#8B5CF6" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Snackbar (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const snackbarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Info',
    description: 'Informational message',
    code: `<Snackbar
  item={{ id: '1', message: 'File saved successfully.' }}
  onDismiss={() => {}}
/>`,
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
    code: `<Snackbar
  item={{
    id: '2',
    message: 'Item deleted.',
    action: { label: 'Undo', onPress: () => {} },
  }}
  onDismiss={() => {}}
/>`,
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
    code: `<Snackbar
  item={{
    id: '3',
    message: 'This is a longer notification message that wraps across multiple lines on narrow screens.',
  }}
  onDismiss={() => {}}
/>`,
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
// ActivityIndicator
// ─────────────────────────────────────────────────────────────────────────────

export const activityIndicatorExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Medium-sized spinning indicator',
    code: `<ActivityIndicator />`,
    render: () => <ActivityIndicator />,
  },
  {
    label: 'Large Coloured',
    description: 'Large indicator with a custom colour',
    code: `<ActivityIndicator size="large" color="#8B5CF6" />`,
    render: () => <ActivityIndicator size="large" color="#8B5CF6" />,
  },
  {
    label: 'Small Inline',
    description: 'Small spinner alongside label text',
    code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <ActivityIndicator size="small" />
  <Text variant="bodyMedium">Loading…</Text>
</View>`,
    render: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <ActivityIndicator size="small" />
        <Text variant="bodyMedium">Loading…</Text>
      </View>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Backdrop (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const BackdropBasicExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Show Backdrop" onPress={() => setVisible(true)} />
      <Backdrop visible={visible} onDismiss={() => setVisible(false)} />
    </>
  );
};

const BackdropWithSpinnerExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Show with Spinner" onPress={() => setVisible(true)} />
      <Backdrop visible={visible} onDismiss={() => setVisible(false)} />
    </>
  );
};

const BackdropHighOpacityExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open (tap to close)" onPress={() => setVisible(true)} />
      <Backdrop visible={visible} onDismiss={() => setVisible(false)} opacity={0.7} />
    </>
  );
};

export const backdropExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Dark backdrop scrim',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Show Backdrop" onPress={() => setVisible(true)} />
<Backdrop visible={visible} onDismiss={() => setVisible(false)} />`,
    render: () => <BackdropBasicExample />,
  },
  {
    label: 'With Spinner',
    description: 'Backdrop overlay with loading spinner',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Show with Spinner" onPress={() => setVisible(true)} />
<Backdrop visible={visible} onDismiss={() => setVisible(false)}>
  <ActivityIndicator size="large" color="#fff" />
</Backdrop>`,
    render: () => <BackdropWithSpinnerExample />,
  },
  {
    label: 'High Opacity',
    description: 'Dismiss by tapping the backdrop',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open (tap to close)" onPress={() => setVisible(true)} />
<Backdrop visible={visible} onDismiss={() => setVisible(false)} opacity={0.7} />`,
    render: () => <BackdropHighOpacityExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Banner (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const BannerOneActionExample: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Banner
      visible={visible}
      actions={[{ label: 'Dismiss', onPress: () => setVisible(false) }]}
    >
      Your connection is slow.
    </Banner>
  );
};

const BannerTwoActionsExample: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Banner
      visible={visible}
      actions={[
        { label: 'Retry', onPress: () => {} },
        { label: 'Dismiss', onPress: () => setVisible(false) },
      ]}
    >
      Failed to load content. Check your connection.
    </Banner>
  );
};

const BannerWithIconExample: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Banner
      visible={visible}
      icon={materialIconSource('warning')}
      actions={[{ label: 'Got it', onPress: () => setVisible(false) }]}
    >
      Storage is almost full.
    </Banner>
  );
};

export const bannerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single Action',
    description: 'Banner with one dismissal action',
    code: `const [visible, setVisible] = React.useState(true);
<Banner
  visible={visible}
  actions={[{ label: 'Dismiss', onPress: () => setVisible(false) }]}
>
  Your connection is slow.
</Banner>`,
    render: () => <BannerOneActionExample />,
  },
  {
    label: 'Two Actions',
    description: 'Banner with retry and dismiss buttons',
    code: `const [visible, setVisible] = React.useState(true);
<Banner
  visible={visible}
  actions={[
    { label: 'Retry', onPress: () => {} },
    { label: 'Dismiss', onPress: () => setVisible(false) },
  ]}
>
  Failed to load content. Check your connection.
</Banner>`,
    render: () => <BannerTwoActionsExample />,
  },
  {
    label: 'With Icon',
    description: 'Banner with a leading icon',
    code: `const [visible, setVisible] = React.useState(true);
<Banner
  visible={visible}
  icon={materialIconSource('warning')}
  actions={[{ label: 'Got it', onPress: () => setVisible(false) }]}
>
  Storage is almost full.
</Banner>`,
    render: () => <BannerWithIconExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Dialog (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const DialogBasicExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Dialog" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="Alert"
        actions={[{ label: 'OK', onPress: () => setVisible(false) }]}
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

const DialogWithContentExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Dialog" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="Delete item?"
        actions={[
          { label: 'Cancel', onPress: () => setVisible(false) },
          { label: 'Delete', onPress: () => setVisible(false) },
        ]}
        onDismiss={() => setVisible(false)}
      >
        <Text variant="bodyMedium">This action cannot be undone.</Text>
      </Dialog>
    </>
  );
};

const DialogFormExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Form Dialog" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="Subscribe"
        actions={[
          { label: 'Cancel', onPress: () => setVisible(false) },
          { label: 'Subscribe', onPress: () => setVisible(false) },
        ]}
        onDismiss={() => setVisible(false)}
      >
        <Text variant="bodyMedium">Enter your email to receive updates.</Text>
      </Dialog>
    </>
  );
};

export const dialogExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Alert Dialog',
    description: 'Simple confirmation dialog',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Dialog" onPress={() => setVisible(true)} />
<Dialog
  visible={visible}
  title="Alert"
  actions={[{ label: 'OK', onPress: () => setVisible(false) }]}
  onDismiss={() => setVisible(false)}
/>`,
    render: () => <DialogBasicExample />,
  },
  {
    label: 'With Content',
    description: 'Dialog with body text and two actions',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Dialog" onPress={() => setVisible(true)} />
<Dialog
  visible={visible}
  title="Delete item?"
  actions={[
    { label: 'Cancel', onPress: () => setVisible(false) },
    { label: 'Delete', onPress: () => setVisible(false) },
  ]}
  onDismiss={() => setVisible(false)}
>
  <Text variant="bodyMedium">This action cannot be undone.</Text>
</Dialog>`,
    render: () => <DialogWithContentExample />,
  },
  {
    label: 'Form Dialog',
    description: 'Dialog for collecting user input',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Form Dialog" onPress={() => setVisible(true)} />
<Dialog
  visible={visible}
  title="Subscribe"
  actions={[
    { label: 'Cancel', onPress: () => setVisible(false) },
    { label: 'Subscribe', onPress: () => setVisible(false) },
  ]}
  onDismiss={() => setVisible(false)}
>
  <Text variant="bodyMedium">Enter your email to receive updates.</Text>
</Dialog>`,
    render: () => <DialogFormExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LinearProgress
// ─────────────────────────────────────────────────────────────────────────────

export const linearProgressExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Indeterminate',
    description: 'Animated indeterminate progress bar',
    code: `<LinearProgress />`,
    render: () => <LinearProgress />,
  },
  {
    label: 'Determinate',
    description: 'Progress bar at 65%',
    code: `<LinearProgress variant="determinate" value={65} />`,
    render: () => <LinearProgress variant="determinate" value={65} />,
  },
  {
    label: 'ProgressBar alias',
    description: 'ProgressBar is an alias for LinearProgress (React Native Paper compatibility)',
    code: `<ProgressBar value={50} variant="determinate" />`,
    render: () => <ProgressBar value={50} variant="determinate" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Modal (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const ModalBasicExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Modal" onPress={() => setVisible(true)} />
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
          <Text variant="titleMedium">Modal Title</Text>
          <Text variant="bodyMedium">Modal content goes here.</Text>
          <Button label="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

const ModalDismissibleExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Modal" onPress={() => setVisible(true)} />
      <Modal visible={visible} onDismiss={() => setVisible(false)} dismissible>
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
          <Text variant="bodyMedium">Tap outside to dismiss.</Text>
        </View>
      </Modal>
    </>
  );
};

const ModalNonDismissibleExample: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button label="Open Modal" onPress={() => setVisible(true)} />
      <Modal visible={visible} dismissible={false}>
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
          <Text variant="bodyMedium">Must press Close button.</Text>
          <Button label="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

export const modalExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Centred modal with close button',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Modal" onPress={() => setVisible(true)} />
<Modal visible={visible} onDismiss={() => setVisible(false)}>
  <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
    <Text variant="titleMedium">Modal Title</Text>
    <Text variant="bodyMedium">Modal content goes here.</Text>
    <Button label="Close" onPress={() => setVisible(false)} />
  </View>
</Modal>`,
    render: () => <ModalBasicExample />,
  },
  {
    label: 'Backdrop Dismiss',
    description: 'Modal dismissed by tapping the backdrop',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Modal" onPress={() => setVisible(true)} />
<Modal visible={visible} onDismiss={() => setVisible(false)} dismissible>
  <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
    <Text variant="bodyMedium">Tap outside to dismiss.</Text>
  </View>
</Modal>`,
    render: () => <ModalDismissibleExample />,
  },
  {
    label: 'Non-Dismissible',
    description: 'Modal requiring an explicit close action',
    code: `const [visible, setVisible] = React.useState(false);
<Button label="Open Modal" onPress={() => setVisible(true)} />
<Modal visible={visible} dismissible={false}>
  <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
    <Text variant="bodyMedium">Must press Close button.</Text>
    <Button label="Close" onPress={() => setVisible(false)} />
  </View>
</Modal>`,
    render: () => <ModalNonDismissibleExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────

export const skeletonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Text Lines',
    description: 'Placeholder for text content',
    code: `<View style={{ gap: 6 }}>
  <Skeleton variant="text" width="80%" height={16} />
  <Skeleton variant="text" width="60%" height={16} />
  <Skeleton variant="text" width="70%" height={16} />
</View>`,
    render: () => (
      <View style={{ gap: 6 }}>
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
        <Skeleton variant="text" width="70%" height={16} />
      </View>
    ),
  },
  {
    label: 'Rectangular',
    description: 'Image placeholder skeleton',
    code: `<Skeleton variant="rectangular" width="100%" height={120} />`,
    render: () => <Skeleton variant="rectangular" width="100%" height={120} />,
  },
  {
    label: 'Avatar + Text',
    description: 'Composite skeleton loading state',
    code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Skeleton variant="circular" width={40} height={40} />
  <View style={{ flex: 1, gap: 6 }}>
    <Skeleton variant="text" width="70%" height={14} />
    <Skeleton variant="text" width="50%" height={12} />
  </View>
</View>`,
    render: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton variant="text" width="70%" height={14} />
          <Skeleton variant="text" width="50%" height={12} />
        </View>
      </View>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SpeedDial (stateful wrappers)
// ─────────────────────────────────────────────────────────────────────────────

const SpeedDialBasicExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      actions={[
        { key: 'edit', icon: <MaterialIcon name="edit" />, label: 'Edit' },
        { key: 'share', icon: <MaterialIcon name="share" />, label: 'Share' },
      ]}
    />
  );
};

const SpeedDialThreeActionsExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      actions={[
        { key: 'copy', icon: <MaterialIcon name="content_copy" />, label: 'Copy' },
        { key: 'print', icon: <MaterialIcon name="print" />, label: 'Print' },
        { key: 'download', icon: <MaterialIcon name="download" />, label: 'Download' },
      ]}
    />
  );
};

const SpeedDialDirectionExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      direction="right"
      actions={[
        { key: 'add', icon: <MaterialIcon name="add" />, label: 'Add' },
        { key: 'star', icon: <MaterialIcon name="star" />, label: 'Star' },
      ]}
    />
  );
};

export const speedDialExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Speed dial with 2 action items',
    code: `const [open, setOpen] = React.useState(false);
<SpeedDial
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  actions={[
    { key: 'edit', icon: <MaterialIcon name="edit" />, label: 'Edit' },
    { key: 'share', icon: <MaterialIcon name="share" />, label: 'Share' },
  ]}
/>`,
    render: () => <SpeedDialBasicExample />,
  },
  {
    label: 'Three Actions',
    description: 'Speed dial with 3 action items',
    code: `const [open, setOpen] = React.useState(false);
<SpeedDial
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  actions={[
    { key: 'copy', icon: <MaterialIcon name="content_copy" />, label: 'Copy' },
    { key: 'print', icon: <MaterialIcon name="print" />, label: 'Print' },
    { key: 'download', icon: <MaterialIcon name="download" />, label: 'Download' },
  ]}
/>`,
    render: () => <SpeedDialThreeActionsExample />,
  },
  {
    label: 'Right Direction',
    description: 'Speed dial expanding to the right',
    code: `const [open, setOpen] = React.useState(false);
<SpeedDial
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  direction="right"
  actions={[
    { key: 'add', icon: <MaterialIcon name="add" />, label: 'Add' },
    { key: 'star', icon: <MaterialIcon name="star" />, label: 'Star' },
  ]}
/>`,
    render: () => <SpeedDialDirectionExample />,
  },
];
