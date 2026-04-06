/**
 * catalogue/examples.muiApiProps.tsx
 *
 * MUI API prop showcase examples for all 78 library components.
 * Each component gets 3 examples: Sizes, Colors, Sx Styling.
 * The 15 slot-enabled composites get a 4th Slot Customization example.
 *
 * Merged into component entries at registry construction time.
 */

import React from 'react';
import { View } from 'react-native';
import {
  // INPUTS
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  CodeInput,
  DatePicker,
  DateTimePicker,
  FAB,
  IconButton,
  MaterialIcon,
  NumberField,
  RadioButton,
  RadioGroup,
  Rating,
  Searchbar,
  SegmentedButtons,
  Select,
  Slider,
  Switch,
  TextField,
  TimePicker,
  ToggleButton,
  ToggleButtonGroup,
  TouchableRipple,
  TransferList,
  materialIconSource,
  // DATA_DISPLAY
  Avatar,
  Badge,
  BarChart,
  LineChart,
  Chip,
  DataGrid,
  DataTable,
  Icon,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Masonry,
  Text,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Tooltip,
  SimpleTreeView,
  TreeItem,
  // FEEDBACK
  ActivityIndicator,
  Alert,
  Backdrop,
  Banner,
  CircularProgress,
  Dialog,
  LinearProgress,
  Modal,
  Skeleton,
  Snackbar,
  SpeedDial,
  // NAVIGATION
  AppBar,
  BottomSheet,
  Breadcrumbs,
  Drawer,
  Link,
  Menu,
  MenuItem,
  NavigationBar,
  Pagination,
  Stepper,
  Tabs,
  // LAYOUT
  Accordion,
  Box,
  Card,
  Collapse,
  Container,
  Divider,
  Fade,
  Grid,
  GridItem,
  Grow,
  HelperText,
  Paper,
  Popover,
  Popper,
  Portal,
  PortalHost,
  Slide,
  Stack,
  Zoom,
} from '@mui-native';
import type { ExampleConfig } from './types';

// Domain components — default exports
import HumanizationScoreBar from '../../../../src/components/HumanizationScoreBar/HumanizationScoreBar';
import { InvitationStatusBadge } from '../../../../src/components/InvitationStatusBadge/InvitationStatusBadge';
import WorkerAgentRow from '../../../../src/components/WorkerAgentRow/WorkerAgentRow';

// ---------------------------------------------------------------------------
// Shared layout styles
// ---------------------------------------------------------------------------

const row: import('react-native').ViewStyle = { flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' };
const col: import('react-native').ViewStyle = { gap: 12 };

// ---------------------------------------------------------------------------
// Shared data constants
// ---------------------------------------------------------------------------

const chartData = [{ name: 'Series', data: [{ value: 20 }, { value: 45 }, { value: 30 }] }];
const gridCols = [{ field: 'id', headerName: 'ID', width: 60 }, { field: 'name', headerName: 'Name', width: 120 }];
const gridRows = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const tableCols = [{ key: 'name' as const, title: 'Name' }, { key: 'age' as const, title: 'Age' }];
const tableRows = [{ name: 'Alice', age: '30' }, { name: 'Bob', age: '25' }];

// ---------------------------------------------------------------------------
// Stateful wrappers — accept size/color/sx/slotProps as pass-through
// ---------------------------------------------------------------------------

type ApiProps = { size?: any; color?: any; sx?: any; slotProps?: any; label?: string };

// SegmentedButtons
const SegBtnApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [v, setV] = React.useState('a');
  return (
    <SegmentedButtons
      size={size} color={color} sx={sx}
      value={v} onValueChange={setV}
      buttons={[{ value: 'a', label: 'One' }, { value: 'b', label: 'Two' }, { value: 'c', label: 'Three' }]}
    />
  );
};

// ToggleButton (in ToggleButtonGroup)
const ToggleBtnApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [v, setV] = React.useState('bold');
  return (
    <ToggleButtonGroup value={v} onValueChange={setV}>
      <ToggleButton size={size} color={color} sx={sx} value="bold"><Text>B</Text></ToggleButton>
      <ToggleButton size={size} color={color} sx={sx} value="italic"><Text>I</Text></ToggleButton>
      <ToggleButton size={size} color={color} sx={sx} value="underline"><Text>U</Text></ToggleButton>
    </ToggleButtonGroup>
  );
};

// SpeedDial
const SpeedDialApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ height: 160, position: 'relative' }}>
      <SpeedDial
        size={size} color={color} sx={sx}
        open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}
        icon={<MaterialIcon name="add" />}
        actions={[
          { icon: materialIconSource('edit'), label: 'Edit', onPress: () => setOpen(false) },
          { icon: materialIconSource('share'), label: 'Share', onPress: () => setOpen(false) },
        ]}
      />
    </View>
  );
};

// Select
const SelectApi: React.FC<ApiProps> = ({ size, color, sx, slotProps }) => {
  const [v, setV] = React.useState('');
  return (
    <Select
      size={size} color={color} sx={sx} slotProps={slotProps}
      label="Fruit" value={v} onValueChange={val => setV(val as string)}
      options={[{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]}
    />
  );
};

// Autocomplete
const AutocompleteApi: React.FC<ApiProps> = ({ size, color, sx, slotProps }) => {
  const [v, setV] = React.useState('');
  return (
    <Autocomplete
      size={size} color={color} sx={sx} slotProps={slotProps}
      label="Country" value={v} onValueChange={val => setV(val)}
      options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]}
    />
  );
};

// Searchbar
const SearchbarApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [v, setV] = React.useState('');
  return <Searchbar size={size} color={color} sx={sx} value={v} onChangeText={setV} />;
};

// CodeInput
const CodeInputApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [v, setV] = React.useState('');
  return <CodeInput size={size} color={color} sx={sx} value={v} onChange={setV} length={4} />;
};

// NumberField
const NumberFieldApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [v, setV] = React.useState(0);
  return <NumberField size={size} color={color} sx={sx} value={v} onValueChange={setV} />;
};

// TransferList
const TransferApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [left, setLeft] = React.useState([{ id: '1', label: 'Item A' }, { id: '2', label: 'Item B' }]);
  const [right, setRight] = React.useState([{ id: '3', label: 'Item C' }]);
  return (
    <TransferList
      size={size} color={color} sx={sx}
      left={left} right={right} onTransfer={(l, r) => { setLeft(l); setRight(r); }}
    />
  );
};

// Tabs
const TabsApi: React.FC<ApiProps> = ({ size, color, sx, slotProps }) => {
  const [v, setV] = React.useState('tab1');
  return (
    <Tabs
      size={size} color={color} sx={sx} slotProps={slotProps}
      value={v} onValueChange={setV}
      items={[{ value: 'tab1', label: 'Tab 1' }, { value: 'tab2', label: 'Tab 2' }, { value: 'tab3', label: 'Tab 3' }]}
    />
  );
};

// Pagination
const PaginationApi: React.FC<ApiProps> = ({ size, color, sx }) => {
  const [p, setP] = React.useState(1);
  return <Pagination size={size} color={color} sx={sx} count={10} page={p} onPageChange={setP} />;
};

// Dialog
const DialogApi: React.FC<ApiProps> = ({ size, color, sx, slotProps, label = 'Open Dialog' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <Dialog
        size={size} color={color} sx={sx} slotProps={slotProps}
        visible={v} onDismiss={() => setV(false)} title="Example"
        actions={[{ label: 'Close', onPress: () => setV(false) }]}
      >
        <Text variant="bodyMedium">Dialog content</Text>
      </Dialog>
    </>
  );
};

// Modal
const ModalApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Open Modal' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <Modal size={size} color={color} sx={sx} visible={v} onDismiss={() => setV(false)}>
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, margin: 32 }}>
          <Text variant="bodyMedium">Modal content</Text>
          <Button label="Close" onPress={() => setV(false)} />
        </View>
      </Modal>
    </>
  );
};

// Snackbar
const SnackbarApi: React.FC<ApiProps> = ({ size, color, sx, slotProps, label = 'Show Snackbar' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <Snackbar
        size={size} color={color} sx={sx} slotProps={slotProps}
        visible={v} onDismiss={() => setV(false)} duration={2000}
      >
        Snackbar message
      </Snackbar>
    </>
  );
};

// Menu
const MenuApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Open Menu' }) => {
  const [v, setV] = React.useState(false);
  const anchor = React.useRef<View>(null);
  return (
    <View ref={anchor}>
      <Button label={label} onPress={() => setV(true)} />
      <Menu size={size} color={color} sx={sx} visible={v} anchor={anchor} onDismiss={() => setV(false)}>
        <MenuItem label="Edit" onPress={() => setV(false)} />
        <MenuItem label="Delete" onPress={() => setV(false)} />
      </Menu>
    </View>
  );
};

// Backdrop
const BackdropApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Show Backdrop' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <Backdrop size={size} color={color} sx={sx} visible={v} onPress={() => setV(false)} />
    </>
  );
};

// BottomSheet
const BottomSheetApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Open Sheet' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <BottomSheet size={size} color={color} sx={sx} visible={v} onDismiss={() => setV(false)}>
        <View style={{ padding: 24 }}>
          <Text variant="bodyMedium">Bottom sheet content</Text>
        </View>
      </BottomSheet>
    </>
  );
};

// Drawer
const DrawerApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Open Drawer' }) => {
  const [v, setV] = React.useState(false);
  return (
    <>
      <Button label={label} onPress={() => setV(true)} />
      <Drawer size={size} color={color} sx={sx} open={v} onClose={() => setV(false)}>
        <Text variant="bodyMedium">Drawer content</Text>
      </Drawer>
    </>
  );
};

// Popover
const PopoverApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Show Popover' }) => {
  const [v, setV] = React.useState(false);
  const anchor = React.useRef<View>(null);
  return (
    <View ref={anchor}>
      <Button label={label} onPress={() => setV(true)} />
      <Popover size={size} color={color} sx={sx} open={v} anchorRef={anchor} onClose={() => setV(false)}>
        <View style={{ padding: 16 }}>
          <Text variant="bodySmall">Popover content</Text>
        </View>
      </Popover>
    </View>
  );
};

// Popper
const PopperApi: React.FC<ApiProps> = ({ size, color, sx, label = 'Show Popper' }) => {
  const [v, setV] = React.useState(false);
  const anchor = React.useRef<View>(null);
  return (
    <View ref={anchor}>
      <Button label={label} onPress={() => setV(!v)} />
      <Popper size={size} color={color} sx={sx} open={v} anchorRef={anchor}>
        <Paper sx={{ p: 2 }}><Text variant="bodySmall">Popper content</Text></Paper>
      </Popper>
    </View>
  );
};

// ---------------------------------------------------------------------------
// MUI API examples record
// ---------------------------------------------------------------------------

const muiApiExamples: Record<string, ExampleConfig[]> = {

  // =========================================================================
  // BATCH A – INPUTS + FEEDBACK (7 components)
  // =========================================================================

  Button: [
    {
      label: 'Sizes',
      description: 'Small and large size variants',
      code: `<Button size="small" label="Small" />\n<Button size="large" label="Large" />`,
      render: () => (
        <View style={row}>
          <Button size="small" label="Small" />
          <Button size="large" label="Large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error color variants',
      code: `<Button color="success" label="Success" />\n<Button color="error" label="Error" />`,
      render: () => (
        <View style={row}>
          <Button color="success" label="Success" />
          <Button color="error" label="Error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Button sx={{ mt: 2, px: 3 }} label="Styled" />`,
      render: () => <Button sx={{ mt: 2, px: 3 }} label="Styled" />,
    },
  ],

  ButtonGroup: [
    {
      label: 'Sizes',
      description: 'Small and large button groups',
      code: `<ButtonGroup size="small"><Button label="A" /><Button label="B" /></ButtonGroup>\n<ButtonGroup size="large"><Button label="A" /><Button label="B" /></ButtonGroup>`,
      render: () => (
        <View style={col}>
          <ButtonGroup size="small"><Button label="A" /><Button label="B" /></ButtonGroup>
          <ButtonGroup size="large"><Button label="A" /><Button label="B" /></ButtonGroup>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error button groups',
      code: `<ButtonGroup color="success"><Button label="OK" /><Button label="Go" /></ButtonGroup>`,
      render: () => (
        <View style={col}>
          <ButtonGroup color="success"><Button label="OK" /><Button label="Go" /></ButtonGroup>
          <ButtonGroup color="error"><Button label="Cancel" /><Button label="Remove" /></ButtonGroup>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<ButtonGroup sx={{ mt: 2, px: 1 }}><Button label="A" /><Button label="B" /></ButtonGroup>`,
      render: () => (
        <ButtonGroup sx={{ mt: 2, px: 1 }}><Button label="A" /><Button label="B" /></ButtonGroup>
      ),
    },
  ],

  FAB: [
    {
      label: 'Sizes',
      description: 'Small and large FABs',
      code: `<FAB size="small" icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />\n<FAB size="large" icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />`,
      render: () => (
        <View style={row}>
          <FAB size="small" icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />
          <FAB size="large" icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error FABs',
      code: `<FAB color="success" icon={<MaterialIcon name="check" />} accessibilityLabel="Done" />\n<FAB color="error" icon={<MaterialIcon name="close" />} accessibilityLabel="Cancel" />`,
      render: () => (
        <View style={row}>
          <FAB color="success" icon={<MaterialIcon name="check" />} accessibilityLabel="Done" />
          <FAB color="error" icon={<MaterialIcon name="close" />} accessibilityLabel="Cancel" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<FAB sx={{ mt: 2 }} icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />`,
      render: () => <FAB sx={{ mt: 2 }} icon={<MaterialIcon name="add" />} accessibilityLabel="Add" />,
    },
  ],

  IconButton: [
    {
      label: 'Sizes',
      description: 'Small and large icon buttons',
      code: `<IconButton size="small" icon={materialIconSource('settings')} accessibilityLabel="Settings" />\n<IconButton size="large" icon={materialIconSource('settings')} accessibilityLabel="Settings" />`,
      render: () => (
        <View style={row}>
          <IconButton size="small" icon={materialIconSource('settings')} accessibilityLabel="Settings" />
          <IconButton size="large" icon={materialIconSource('settings')} accessibilityLabel="Settings" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error icon buttons',
      code: `<IconButton color="success" icon={materialIconSource('check')} accessibilityLabel="OK" />\n<IconButton color="error" icon={materialIconSource('delete')} accessibilityLabel="Delete" />`,
      render: () => (
        <View style={row}>
          <IconButton color="success" icon={materialIconSource('check')} accessibilityLabel="OK" />
          <IconButton color="error" icon={materialIconSource('delete')} accessibilityLabel="Delete" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<IconButton sx={{ mt: 1, mx: 2 }} icon={materialIconSource('settings')} accessibilityLabel="Settings" />`,
      render: () => <IconButton sx={{ mt: 1, mx: 2 }} icon={materialIconSource('settings')} accessibilityLabel="Settings" />,
    },
  ],

  SegmentedButtons: [
    {
      label: 'Sizes',
      description: 'Small and large segmented buttons',
      code: `<SegmentedButtons size="small" value="a" onValueChange={...} buttons={[...]} />\n<SegmentedButtons size="large" ... />`,
      render: () => (
        <View style={col}>
          <SegBtnApi size="small" />
          <SegBtnApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error segmented buttons',
      code: `<SegmentedButtons color="success" value="a" onValueChange={...} buttons={[...]} />`,
      render: () => (
        <View style={col}>
          <SegBtnApi color="success" />
          <SegBtnApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<SegmentedButtons sx={{ mt: 2 }} value="a" onValueChange={...} buttons={[...]} />`,
      render: () => <SegBtnApi sx={{ mt: 2, px: 1 }} />,
    },
  ],

  SpeedDial: [
    {
      label: 'Sizes',
      description: 'Small and large speed dials',
      code: `<SpeedDial size="small" open={...} icon={<MaterialIcon name="add" />} actions={[...]} />`,
      render: () => <SpeedDialApi size="small" />,
    },
    {
      label: 'Colors',
      description: 'Success color speed dial',
      code: `<SpeedDial color="success" open={...} icon={<MaterialIcon name="add" />} actions={[...]} />`,
      render: () => <SpeedDialApi color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<SpeedDial sx={{ mb: 4 }} open={...} icon={<MaterialIcon name="add" />} actions={[...]} />`,
      render: () => <SpeedDialApi sx={{ mb: 4 }} />,
    },
  ],

  ToggleButton: [
    {
      label: 'Sizes',
      description: 'Small and large toggle buttons',
      code: `<ToggleButtonGroup value="bold" onValueChange={...}>\n  <ToggleButton size="small" value="bold"><Text>B</Text></ToggleButton>\n</ToggleButtonGroup>`,
      render: () => (
        <View style={col}>
          <ToggleBtnApi size="small" />
          <ToggleBtnApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error toggle buttons',
      code: `<ToggleButton color="success" value="bold"><Text>B</Text></ToggleButton>`,
      render: () => (
        <View style={col}>
          <ToggleBtnApi color="success" />
          <ToggleBtnApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<ToggleButton sx={{ px: 3 }} value="bold"><Text>B</Text></ToggleButton>`,
      render: () => <ToggleBtnApi sx={{ px: 3, mt: 1 }} />,
    },
  ],

  // =========================================================================
  // BATCH B – INPUTS (6 components)
  // =========================================================================

  Checkbox: [
    {
      label: 'Sizes',
      description: 'Small and large checkboxes',
      code: `<Checkbox size="small" status="checked" />\n<Checkbox size="large" status="checked" />`,
      render: () => (
        <View style={row}>
          <Checkbox size="small" status="checked" />
          <Checkbox size="large" status="checked" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error checkboxes',
      code: `<Checkbox color="success" status="checked" />\n<Checkbox color="error" status="checked" />`,
      render: () => (
        <View style={row}>
          <Checkbox color="success" status="checked" />
          <Checkbox color="error" status="checked" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Checkbox sx={{ ml: 2 }} status="checked" />`,
      render: () => <Checkbox sx={{ ml: 2 }} status="checked" />,
    },
  ],

  CodeInput: [
    {
      label: 'Sizes',
      description: 'Small and large code inputs',
      code: `<CodeInput size="small" value="" onChange={...} length={4} />\n<CodeInput size="large" value="" onChange={...} length={4} />`,
      render: () => (
        <View style={col}>
          <CodeInputApi size="small" />
          <CodeInputApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error code inputs',
      code: `<CodeInput color="success" value="" onChange={...} length={4} />`,
      render: () => (
        <View style={col}>
          <CodeInputApi color="success" />
          <CodeInputApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<CodeInput sx={{ mt: 2 }} value="" onChange={...} length={4} />`,
      render: () => <CodeInputApi sx={{ mt: 2 }} />,
    },
  ],

  RadioButton: [
    {
      label: 'Sizes',
      description: 'Small and large radio buttons',
      code: `<RadioGroup value="a" onValueChange={() => {}}>\n  <RadioButton size="small" value="a" />\n  <RadioButton size="large" value="b" />\n</RadioGroup>`,
      render: () => (
        <RadioGroup value="a" onValueChange={() => {}}>
          <View style={row}>
            <RadioButton size="small" value="a" />
            <RadioButton size="large" value="b" />
          </View>
        </RadioGroup>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error radio buttons',
      code: `<RadioGroup value="a" onValueChange={() => {}}>\n  <RadioButton color="success" value="a" />\n  <RadioButton color="error" value="b" />\n</RadioGroup>`,
      render: () => (
        <RadioGroup value="a" onValueChange={() => {}}>
          <View style={row}>
            <RadioButton color="success" value="a" />
            <RadioButton color="error" value="b" />
          </View>
        </RadioGroup>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<RadioButton sx={{ ml: 2, mt: 1 }} value="a" />`,
      render: () => (
        <RadioGroup value="a" onValueChange={() => {}}>
          <RadioButton sx={{ ml: 2, mt: 1 }} value="a" />
        </RadioGroup>
      ),
    },
  ],

  Slider: [
    {
      label: 'Sizes',
      description: 'Small and large sliders',
      code: `<Slider size="small" value={50} onValueChange={() => {}} />\n<Slider size="large" value={50} onValueChange={() => {}} />`,
      render: () => (
        <View style={col}>
          <Slider size="small" value={50} onValueChange={() => {}} />
          <Slider size="large" value={50} onValueChange={() => {}} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error sliders',
      code: `<Slider color="success" value={60} onValueChange={() => {}} />\n<Slider color="error" value={40} onValueChange={() => {}} />`,
      render: () => (
        <View style={col}>
          <Slider color="success" value={60} onValueChange={() => {}} />
          <Slider color="error" value={40} onValueChange={() => {}} />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Slider sx={{ mx: 3, mt: 2 }} value={50} onValueChange={() => {}} />`,
      render: () => <Slider sx={{ mx: 3, mt: 2 }} value={50} onValueChange={() => {}} />,
    },
  ],

  Switch: [
    {
      label: 'Sizes',
      description: 'Small and large switches',
      code: `<Switch size="small" value={true} onValueChange={() => {}} />\n<Switch size="large" value={true} onValueChange={() => {}} />`,
      render: () => (
        <View style={row}>
          <Switch size="small" value={true} onValueChange={() => {}} />
          <Switch size="large" value={true} onValueChange={() => {}} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error switches',
      code: `<Switch color="success" value={true} onValueChange={() => {}} />\n<Switch color="error" value={true} onValueChange={() => {}} />`,
      render: () => (
        <View style={row}>
          <Switch color="success" value={true} onValueChange={() => {}} />
          <Switch color="error" value={true} onValueChange={() => {}} />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Switch sx={{ ml: 2 }} value={true} onValueChange={() => {}} />`,
      render: () => <Switch sx={{ ml: 2 }} value={true} onValueChange={() => {}} />,
    },
  ],

  TouchableRipple: [
    {
      label: 'Sizes',
      description: 'Small and large ripple containers',
      code: `<TouchableRipple size="small" onPress={() => {}}><Text>Small</Text></TouchableRipple>\n<TouchableRipple size="large" onPress={() => {}}><Text>Large</Text></TouchableRipple>`,
      render: () => (
        <View style={row}>
          <TouchableRipple size="small" onPress={() => {}}><Text>Small</Text></TouchableRipple>
          <TouchableRipple size="large" onPress={() => {}}><Text>Large</Text></TouchableRipple>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error ripple colors',
      code: `<TouchableRipple color="success" onPress={() => {}}><Text>Success</Text></TouchableRipple>`,
      render: () => (
        <View style={row}>
          <TouchableRipple color="success" onPress={() => {}}><Text>Success</Text></TouchableRipple>
          <TouchableRipple color="error" onPress={() => {}}><Text>Error</Text></TouchableRipple>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<TouchableRipple sx={{ p: 2, mt: 1 }} onPress={() => {}}><Text>Styled</Text></TouchableRipple>`,
      render: () => <TouchableRipple sx={{ p: 2, mt: 1 }} onPress={() => {}}><Text>Styled</Text></TouchableRipple>,
    },
  ],

  // =========================================================================
  // BATCH C – INPUTS (5 components)
  // =========================================================================

  Autocomplete: [
    {
      label: 'Sizes',
      description: 'Small and large autocomplete fields',
      code: `<Autocomplete size="small" label="Country" value="" onValueChange={...} options={[...]} />\n<Autocomplete size="large" ... />`,
      render: () => (
        <View style={col}>
          <AutocompleteApi size="small" />
          <AutocompleteApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error autocomplete fields',
      code: `<Autocomplete color="success" label="Country" ... />`,
      render: () => (
        <View style={col}>
          <AutocompleteApi color="success" />
          <AutocompleteApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Autocomplete sx={{ mt: 2, mx: 1 }} label="Country" ... />`,
      render: () => <AutocompleteApi sx={{ mt: 2, mx: 1 }} />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Root and Input slots',
      code: `<Autocomplete slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#4caf50' } } }} ... />`,
      render: () => <AutocompleteApi slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#4caf50' } } }} />,
    },
  ],

  NumberField: [
    {
      label: 'Sizes',
      description: 'Small and large number fields',
      code: `<NumberField size="small" value={0} onValueChange={...} />\n<NumberField size="large" ... />`,
      render: () => (
        <View style={col}>
          <NumberFieldApi size="small" />
          <NumberFieldApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error number fields',
      code: `<NumberField color="success" value={0} onValueChange={...} />`,
      render: () => (
        <View style={col}>
          <NumberFieldApi color="success" />
          <NumberFieldApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<NumberField sx={{ mt: 2 }} value={0} onValueChange={...} />`,
      render: () => <NumberFieldApi sx={{ mt: 2, px: 1 }} />,
    },
  ],

  Searchbar: [
    {
      label: 'Sizes',
      description: 'Small and large search bars',
      code: `<Searchbar size="small" value="" onChangeText={...} />\n<Searchbar size="large" ... />`,
      render: () => (
        <View style={col}>
          <SearchbarApi size="small" />
          <SearchbarApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error search bars',
      code: `<Searchbar color="success" value="" onChangeText={...} />`,
      render: () => (
        <View style={col}>
          <SearchbarApi color="success" />
          <SearchbarApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Searchbar sx={{ mt: 2 }} value="" onChangeText={...} />`,
      render: () => <SearchbarApi sx={{ mt: 2 }} />,
    },
  ],

  Select: [
    {
      label: 'Sizes',
      description: 'Small and large select fields',
      code: `<Select size="small" label="Fruit" value="" onValueChange={...} options={[...]} />\n<Select size="large" ... />`,
      render: () => (
        <View style={col}>
          <SelectApi size="small" />
          <SelectApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error select fields',
      code: `<Select color="success" label="Fruit" ... />`,
      render: () => (
        <View style={col}>
          <SelectApi color="success" />
          <SelectApi color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Select sx={{ mt: 2 }} label="Fruit" ... />`,
      render: () => <SelectApi sx={{ mt: 2 }} />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Trigger slot',
      code: `<Select slotProps={{ Trigger: { style: { borderWidth: 2, borderColor: '#1976d2' } } }} ... />`,
      render: () => <SelectApi slotProps={{ Trigger: { style: { borderWidth: 2, borderColor: '#1976d2' } } }} />,
    },
  ],

  TextField: [
    {
      label: 'Sizes',
      description: 'Small and large text fields',
      code: `<TextField size="small" label="Small" />\n<TextField size="large" label="Large" />`,
      render: () => (
        <View style={col}>
          <TextField size="small" label="Small" />
          <TextField size="large" label="Large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error text fields',
      code: `<TextField color="success" label="Success" />\n<TextField color="error" label="Error" />`,
      render: () => (
        <View style={col}>
          <TextField color="success" label="Success" />
          <TextField color="error" label="Error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<TextField sx={{ mt: 2, mx: 1 }} label="Styled" />`,
      render: () => <TextField sx={{ mt: 2, mx: 1 }} label="Styled" />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Label and Input slots',
      code: `<TextField slotProps={{ Label: { style: { fontWeight: 'bold' } }, Input: { style: { letterSpacing: 2 } } }} label="Custom" />`,
      render: () => <TextField slotProps={{ Label: { style: { fontWeight: 'bold' } }, Input: { style: { letterSpacing: 2 } } }} label="Custom" />,
    },
  ],

  // =========================================================================
  // BATCH D – INPUTS (5 components)
  // =========================================================================

  DatePicker: [
    {
      label: 'Sizes',
      description: 'Small and large date pickers',
      code: `<DatePicker size="small" />\n<DatePicker size="large" />`,
      render: () => (
        <View style={col}>
          <DatePicker size="small" />
          <DatePicker size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error date pickers',
      code: `<DatePicker color="success" />\n<DatePicker color="error" />`,
      render: () => (
        <View style={col}>
          <DatePicker color="success" />
          <DatePicker color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<DatePicker sx={{ mt: 2 }} />`,
      render: () => <DatePicker sx={{ mt: 2 }} />,
    },
  ],

  DateTimePicker: [
    {
      label: 'Sizes',
      description: 'Small and large date-time pickers',
      code: `<DateTimePicker size="small" />\n<DateTimePicker size="large" />`,
      render: () => (
        <View style={col}>
          <DateTimePicker size="small" />
          <DateTimePicker size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error date-time pickers',
      code: `<DateTimePicker color="success" />\n<DateTimePicker color="error" />`,
      render: () => (
        <View style={col}>
          <DateTimePicker color="success" />
          <DateTimePicker color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<DateTimePicker sx={{ mt: 2 }} />`,
      render: () => <DateTimePicker sx={{ mt: 2 }} />,
    },
  ],

  Rating: [
    {
      label: 'Sizes',
      description: 'Small and large ratings',
      code: `<Rating size="small" value={3} />\n<Rating size="large" value={3} />`,
      render: () => (
        <View style={row}>
          <Rating size="small" value={3} />
          <Rating size="large" value={3} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error ratings',
      code: `<Rating color="success" value={4} />\n<Rating color="error" value={2} />`,
      render: () => (
        <View style={row}>
          <Rating color="success" value={4} />
          <Rating color="error" value={2} />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Rating sx={{ mt: 1, ml: 2 }} value={3} />`,
      render: () => <Rating sx={{ mt: 1, ml: 2 }} value={3} />,
    },
  ],

  TimePicker: [
    {
      label: 'Sizes',
      description: 'Small and large time pickers',
      code: `<TimePicker size="small" />\n<TimePicker size="large" />`,
      render: () => (
        <View style={col}>
          <TimePicker size="small" />
          <TimePicker size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error time pickers',
      code: `<TimePicker color="success" />\n<TimePicker color="error" />`,
      render: () => (
        <View style={col}>
          <TimePicker color="success" />
          <TimePicker color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<TimePicker sx={{ mt: 2 }} />`,
      render: () => <TimePicker sx={{ mt: 2 }} />,
    },
  ],

  TransferList: [
    {
      label: 'Sizes',
      description: 'Small transfer list',
      code: `<TransferList size="small" left={[...]} right={[...]} onTransfer={...} />`,
      render: () => <TransferApi size="small" />,
    },
    {
      label: 'Colors',
      description: 'Success color transfer list',
      code: `<TransferList color="success" left={[...]} right={[...]} onTransfer={...} />`,
      render: () => <TransferApi color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<TransferList sx={{ mt: 2 }} left={[...]} right={[...]} onTransfer={...} />`,
      render: () => <TransferApi sx={{ mt: 2 }} />,
    },
  ],

  // =========================================================================
  // BATCH E – FEEDBACK (15 components)
  // =========================================================================

  Alert: [
    {
      label: 'Sizes',
      description: 'Small and large alerts',
      code: `<Alert size="small" severity="info">Small alert</Alert>\n<Alert size="large" severity="info">Large alert</Alert>`,
      render: () => (
        <View style={col}>
          <Alert size="small" severity="info">Small alert</Alert>
          <Alert size="large" severity="info">Large alert</Alert>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error alert colors',
      code: `<Alert color="success" severity="success">Success</Alert>\n<Alert color="error" severity="error">Error</Alert>`,
      render: () => (
        <View style={col}>
          <Alert color="success" severity="success">Success</Alert>
          <Alert color="error" severity="error">Error</Alert>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Alert sx={{ mt: 2, px: 3 }} severity="info">Styled alert</Alert>`,
      render: () => <Alert sx={{ mt: 2, px: 3 }} severity="info">Styled alert</Alert>,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Root slot',
      code: `<Alert slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#2196f3' } } }} severity="info">Slot styled</Alert>`,
      render: () => <Alert slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#2196f3' } } }} severity="info">Slot styled</Alert>,
    },
  ],

  Backdrop: [
    {
      label: 'Sizes',
      description: 'Small backdrop',
      code: `<Backdrop size="small" visible={true} onPress={() => {}} />`,
      render: () => <BackdropApi size="small" />,
    },
    {
      label: 'Colors',
      description: 'Error color backdrop',
      code: `<Backdrop color="error" visible={true} onPress={() => {}} />`,
      render: () => <BackdropApi color="error" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Backdrop sx={{ bg: 'secondary' }} visible={true} onPress={() => {}} />`,
      render: () => <BackdropApi sx={{ bg: 'secondary' }} />,
    },
  ],

  Badge: [
    {
      label: 'Sizes',
      description: 'Small and large badges',
      code: `<Badge size="small"><MaterialIcon name="mail" /></Badge>\n<Badge size="large"><MaterialIcon name="mail" /></Badge>`,
      render: () => (
        <View style={row}>
          <Badge size="small"><MaterialIcon name="mail" /></Badge>
          <Badge size="large"><MaterialIcon name="mail" /></Badge>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error badges',
      code: `<Badge color="success"><MaterialIcon name="mail" /></Badge>\n<Badge color="error"><MaterialIcon name="mail" /></Badge>`,
      render: () => (
        <View style={row}>
          <Badge color="success"><MaterialIcon name="mail" /></Badge>
          <Badge color="error"><MaterialIcon name="mail" /></Badge>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Badge sx={{ mr: 2 }}><MaterialIcon name="mail" /></Badge>`,
      render: () => <Badge sx={{ mr: 2 }}><MaterialIcon name="mail" /></Badge>,
    },
  ],

  Banner: [
    {
      label: 'Sizes',
      description: 'Small banner',
      code: `<Banner size="small" visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Small banner</Banner>`,
      render: () => <Banner size="small" visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Small banner</Banner>,
    },
    {
      label: 'Colors',
      description: 'Success color banner',
      code: `<Banner color="success" visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Success</Banner>`,
      render: () => <Banner color="success" visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Success</Banner>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Banner sx={{ mt: 2, px: 3 }} visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Styled</Banner>`,
      render: () => <Banner sx={{ mt: 2, px: 3 }} visible={true} actions={[{ label: 'OK', onPress: () => {} }]}>Styled</Banner>,
    },
  ],

  BottomSheet: [
    {
      label: 'Sizes',
      description: 'Small bottom sheet',
      code: `<BottomSheet size="small" visible={...} onDismiss={...}>...</BottomSheet>`,
      render: () => <BottomSheetApi size="small" />,
    },
    {
      label: 'Colors',
      description: 'Success color bottom sheet',
      code: `<BottomSheet color="success" visible={...} onDismiss={...}>...</BottomSheet>`,
      render: () => <BottomSheetApi color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<BottomSheet sx={{ p: 3 }} visible={...} onDismiss={...}>...</BottomSheet>`,
      render: () => <BottomSheetApi sx={{ p: 3 }} />,
    },
  ],

  CircularProgress: [
    {
      label: 'Sizes',
      description: 'Small and large circular progress',
      code: `<CircularProgress size="small" />\n<CircularProgress size="large" />`,
      render: () => (
        <View style={row}>
          <CircularProgress size="small" />
          <CircularProgress size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error progress',
      code: `<CircularProgress color="success" />\n<CircularProgress color="error" />`,
      render: () => (
        <View style={row}>
          <CircularProgress color="success" />
          <CircularProgress color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<CircularProgress sx={{ ml: 3 }} />`,
      render: () => <CircularProgress sx={{ ml: 3 }} />,
    },
  ],

  Dialog: [
    {
      label: 'Sizes',
      description: 'Small dialog',
      code: `<Dialog size="small" visible={...} onDismiss={...} title="Small" actions={[...]}>...</Dialog>`,
      render: () => <DialogApi size="small" label="Small Dialog" />,
    },
    {
      label: 'Colors',
      description: 'Success color dialog',
      code: `<Dialog color="success" visible={...} onDismiss={...} title="Success" actions={[...]}>...</Dialog>`,
      render: () => <DialogApi color="success" label="Success Dialog" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Dialog sx={{ p: 3 }} visible={...} onDismiss={...} title="Styled" actions={[...]}>...</Dialog>`,
      render: () => <DialogApi sx={{ p: 3 }} label="Styled Dialog" />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Title and Actions slots',
      code: `<Dialog slotProps={{ Title: { style: { color: '#1976d2' } }, Actions: { style: { gap: 16 } } }} ... />`,
      render: () => <DialogApi slotProps={{ Title: { style: { color: '#1976d2' } }, Actions: { style: { gap: 16 } } }} label="Slot Dialog" />,
    },
  ],

  LinearProgress: [
    {
      label: 'Sizes',
      description: 'Small and large progress bars',
      code: `<LinearProgress size="small" variant="determinate" value={50} />\n<LinearProgress size="large" variant="determinate" value={50} />`,
      render: () => (
        <View style={col}>
          <LinearProgress size="small" variant="determinate" value={50} />
          <LinearProgress size="large" variant="determinate" value={50} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error progress bars',
      code: `<LinearProgress color="success" variant="determinate" value={70} />\n<LinearProgress color="error" variant="determinate" value={30} />`,
      render: () => (
        <View style={col}>
          <LinearProgress color="success" variant="determinate" value={70} />
          <LinearProgress color="error" variant="determinate" value={30} />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<LinearProgress sx={{ mt: 2, mx: 1 }} />`,
      render: () => <LinearProgress sx={{ mt: 2, mx: 1 }} />,
    },
  ],

  Menu: [
    {
      label: 'Sizes',
      description: 'Small menu',
      code: `<Menu size="small" visible={...} anchor={ref}><MenuItem label="Edit" /></Menu>`,
      render: () => <MenuApi size="small" label="Small Menu" />,
    },
    {
      label: 'Colors',
      description: 'Success color menu',
      code: `<Menu color="success" visible={...} anchor={ref}><MenuItem label="Edit" /></Menu>`,
      render: () => <MenuApi color="success" label="Success Menu" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Menu sx={{ p: 2 }} visible={...} anchor={ref}><MenuItem label="Edit" /></Menu>`,
      render: () => <MenuApi sx={{ p: 2 }} label="Styled Menu" />,
    },
  ],

  Modal: [
    {
      label: 'Sizes',
      description: 'Small modal',
      code: `<Modal size="small" visible={...} onDismiss={...}>...</Modal>`,
      render: () => <ModalApi size="small" label="Small Modal" />,
    },
    {
      label: 'Colors',
      description: 'Success color modal',
      code: `<Modal color="success" visible={...} onDismiss={...}>...</Modal>`,
      render: () => <ModalApi color="success" label="Success Modal" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Modal sx={{ p: 4 }} visible={...} onDismiss={...}>...</Modal>`,
      render: () => <ModalApi sx={{ p: 4 }} label="Styled Modal" />,
    },
  ],

  Popover: [
    {
      label: 'Sizes',
      description: 'Small popover',
      code: `<Popover size="small" open={...} anchorRef={ref}>...</Popover>`,
      render: () => <PopoverApi size="small" label="Small Popover" />,
    },
    {
      label: 'Colors',
      description: 'Success color popover',
      code: `<Popover color="success" open={...} anchorRef={ref}>...</Popover>`,
      render: () => <PopoverApi color="success" label="Success Popover" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Popover sx={{ p: 2 }} open={...} anchorRef={ref}>...</Popover>`,
      render: () => <PopoverApi sx={{ p: 2 }} label="Styled Popover" />,
    },
  ],

  Popper: [
    {
      label: 'Sizes',
      description: 'Small popper',
      code: `<Popper size="small" open={...} anchorRef={ref}>...</Popper>`,
      render: () => <PopperApi size="small" label="Small Popper" />,
    },
    {
      label: 'Colors',
      description: 'Success color popper',
      code: `<Popper color="success" open={...} anchorRef={ref}>...</Popper>`,
      render: () => <PopperApi color="success" label="Success Popper" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Popper sx={{ p: 2 }} open={...} anchorRef={ref}>...</Popper>`,
      render: () => <PopperApi sx={{ p: 2 }} label="Styled Popper" />,
    },
  ],

  Skeleton: [
    {
      label: 'Sizes',
      description: 'Small and large skeletons',
      code: `<Skeleton size="small" />\n<Skeleton size="large" />`,
      render: () => (
        <View style={col}>
          <Skeleton size="small" />
          <Skeleton size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color skeleton',
      code: `<Skeleton color="success" />`,
      render: () => <Skeleton color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Skeleton sx={{ mt: 2, mx: 3 }} />`,
      render: () => <Skeleton sx={{ mt: 2, mx: 3 }} />,
    },
  ],

  Snackbar: [
    {
      label: 'Sizes',
      description: 'Small snackbar',
      code: `<Snackbar size="small" visible={...} onDismiss={...}>Small snackbar</Snackbar>`,
      render: () => <SnackbarApi size="small" label="Small Snackbar" />,
    },
    {
      label: 'Colors',
      description: 'Success color snackbar',
      code: `<Snackbar color="success" visible={...} onDismiss={...}>Success</Snackbar>`,
      render: () => <SnackbarApi color="success" label="Success Snackbar" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Snackbar sx={{ mb: 4 }} visible={...} onDismiss={...}>Styled</Snackbar>`,
      render: () => <SnackbarApi sx={{ mb: 4 }} label="Styled Snackbar" />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Message slot',
      code: `<Snackbar slotProps={{ Message: { style: { fontWeight: 'bold' } } }} ... />`,
      render: () => <SnackbarApi slotProps={{ Message: { style: { fontWeight: 'bold' } } }} label="Slot Snackbar" />,
    },
  ],

  Tooltip: [
    {
      label: 'Sizes',
      description: 'Small and large tooltips',
      code: `<Tooltip size="small" title="Small tip"><Text>Hover me</Text></Tooltip>\n<Tooltip size="large" title="Large tip"><Text>Hover me</Text></Tooltip>`,
      render: () => (
        <View style={row}>
          <Tooltip size="small" title="Small tip"><Text>Hover S</Text></Tooltip>
          <Tooltip size="large" title="Large tip"><Text>Hover L</Text></Tooltip>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error tooltips',
      code: `<Tooltip color="success" title="Success"><Text>Hover</Text></Tooltip>`,
      render: () => (
        <View style={row}>
          <Tooltip color="success" title="Success"><Text>Success</Text></Tooltip>
          <Tooltip color="error" title="Error"><Text>Error</Text></Tooltip>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Tooltip sx={{ ml: 2 }} title="Styled"><Text>Hover</Text></Tooltip>`,
      render: () => <Tooltip sx={{ ml: 2 }} title="Styled"><Text>Styled</Text></Tooltip>,
    },
  ],

  // =========================================================================
  // BATCH F – NAVIGATION (10 components)
  // =========================================================================

  AppBar: [
    {
      label: 'Sizes',
      description: 'Small and large app bars',
      code: `<AppBar size="small" title="Small Bar" />\n<AppBar size="large" title="Large Bar" />`,
      render: () => (
        <View style={col}>
          <AppBar size="small" title="Small Bar" />
          <AppBar size="large" title="Large Bar" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error app bars',
      code: `<AppBar color="success" title="Success" />\n<AppBar color="error" title="Error" />`,
      render: () => (
        <View style={col}>
          <AppBar color="success" title="Success" />
          <AppBar color="error" title="Error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<AppBar sx={{ mb: 2, px: 3 }} title="Styled" />`,
      render: () => <AppBar sx={{ mb: 2, px: 3 }} title="Styled" />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Title slot',
      code: `<AppBar slotProps={{ Title: { style: { letterSpacing: 3 } } }} title="Custom" />`,
      render: () => <AppBar slotProps={{ Title: { style: { letterSpacing: 3 } } }} title="Custom" />,
    },
  ],

  Breadcrumbs: [
    {
      label: 'Sizes',
      description: 'Small and large breadcrumbs',
      code: `<Breadcrumbs size="small"><Link href="#">Home</Link><Link href="#">Docs</Link><Text>Page</Text></Breadcrumbs>`,
      render: () => (
        <View style={col}>
          <Breadcrumbs size="small"><Link href="#">Home</Link><Link href="#">Docs</Link><Text>Page</Text></Breadcrumbs>
          <Breadcrumbs size="large"><Link href="#">Home</Link><Link href="#">Docs</Link><Text>Page</Text></Breadcrumbs>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color breadcrumbs',
      code: `<Breadcrumbs color="success"><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>`,
      render: () => <Breadcrumbs color="success"><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Breadcrumbs sx={{ mt: 2, px: 1 }}><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>`,
      render: () => <Breadcrumbs sx={{ mt: 2, px: 1 }}><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Separator slot',
      code: `<Breadcrumbs slotProps={{ Separator: { style: { marginHorizontal: 12 } } }}><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>`,
      render: () => <Breadcrumbs slotProps={{ Separator: { style: { marginHorizontal: 12 } } }}><Link href="#">Home</Link><Text>Page</Text></Breadcrumbs>,
    },
  ],

  Drawer: [
    {
      label: 'Sizes',
      description: 'Small drawer',
      code: `<Drawer size="small" open={...} onClose={...}>...</Drawer>`,
      render: () => <DrawerApi size="small" label="Small Drawer" />,
    },
    {
      label: 'Colors',
      description: 'Success color drawer',
      code: `<Drawer color="success" open={...} onClose={...}>...</Drawer>`,
      render: () => <DrawerApi color="success" label="Success Drawer" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Drawer sx={{ p: 3 }} open={...} onClose={...}>...</Drawer>`,
      render: () => <DrawerApi sx={{ p: 3 }} label="Styled Drawer" />,
    },
  ],

  Link: [
    {
      label: 'Sizes',
      description: 'Small and large links',
      code: `<Link size="small" href="#">Small Link</Link>\n<Link size="large" href="#">Large Link</Link>`,
      render: () => (
        <View style={row}>
          <Link size="small" href="#">Small Link</Link>
          <Link size="large" href="#">Large Link</Link>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error links',
      code: `<Link color="success" href="#">Success</Link>\n<Link color="error" href="#">Error</Link>`,
      render: () => (
        <View style={row}>
          <Link color="success" href="#">Success</Link>
          <Link color="error" href="#">Error</Link>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Link sx={{ ml: 2, mt: 1 }} href="#">Styled</Link>`,
      render: () => <Link sx={{ ml: 2, mt: 1 }} href="#">Styled</Link>,
    },
  ],

  NavigationBar: [
    {
      label: 'Sizes',
      description: 'Small navigation bar',
      code: `<NavigationBar size="small" activeIndex={0} items={[{ icon: materialIconSource('home'), label: 'Home', onPress: () => {} }]} />`,
      render: () => (
        <View style={col}>
          <NavigationBar size="small" activeIndex={0} items={[
            { icon: materialIconSource('home'), label: 'Home', onPress: () => {} },
            { icon: materialIconSource('search'), label: 'Search', onPress: () => {} },
          ]} />
          <NavigationBar size="large" activeIndex={0} items={[
            { icon: materialIconSource('home'), label: 'Home', onPress: () => {} },
            { icon: materialIconSource('search'), label: 'Search', onPress: () => {} },
          ]} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color navigation bar',
      code: `<NavigationBar color="success" activeIndex={0} items={[...]} />`,
      render: () => (
        <NavigationBar color="success" activeIndex={0} items={[
          { icon: materialIconSource('home'), label: 'Home', onPress: () => {} },
          { icon: materialIconSource('search'), label: 'Search', onPress: () => {} },
        ]} />
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<NavigationBar sx={{ mt: 2 }} activeIndex={0} items={[...]} />`,
      render: () => (
        <NavigationBar sx={{ mt: 2 }} activeIndex={0} items={[
          { icon: materialIconSource('home'), label: 'Home', onPress: () => {} },
          { icon: materialIconSource('search'), label: 'Search', onPress: () => {} },
        ]} />
      ),
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Item slot',
      code: `<NavigationBar slotProps={{ Item: { style: { paddingVertical: 12 } } }} activeIndex={0} items={[...]} />`,
      render: () => (
        <NavigationBar slotProps={{ Item: { style: { paddingVertical: 12 } } }} activeIndex={0} items={[
          { icon: materialIconSource('home'), label: 'Home', onPress: () => {} },
          { icon: materialIconSource('search'), label: 'Search', onPress: () => {} },
        ]} />
      ),
    },
  ],

  Pagination: [
    {
      label: 'Sizes',
      description: 'Small and large pagination',
      code: `<Pagination size="small" count={10} page={1} onPageChange={...} />\n<Pagination size="large" ... />`,
      render: () => (
        <View style={col}>
          <PaginationApi size="small" />
          <PaginationApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color pagination',
      code: `<Pagination color="success" count={10} page={1} onPageChange={...} />`,
      render: () => <PaginationApi color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Pagination sx={{ mt: 2 }} count={10} page={1} onPageChange={...} />`,
      render: () => <PaginationApi sx={{ mt: 2 }} />,
    },
  ],

  Stepper: [
    {
      label: 'Sizes',
      description: 'Small and large steppers',
      code: `<Stepper size="small" activeStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />`,
      render: () => (
        <View style={col}>
          <Stepper size="small" activeStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
          <Stepper size="large" activeStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color stepper',
      code: `<Stepper color="success" activeStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }]} />`,
      render: () => <Stepper color="success" activeStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Done' }]} />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Stepper sx={{ mt: 2 }} activeStep={0} steps={[{ label: 'Step 1' }, { label: 'Step 2' }]} />`,
      render: () => <Stepper sx={{ mt: 2 }} activeStep={0} steps={[{ label: 'Step 1' }, { label: 'Step 2' }]} />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for StepIndicator and Connector slots',
      code: `<Stepper slotProps={{ StepIndicator: { style: { borderWidth: 2 } }, Connector: { style: { borderStyle: 'dashed' } } }} ... />`,
      render: () => (
        <Stepper
          slotProps={{ StepIndicator: { style: { borderWidth: 2 } }, Connector: { style: { borderStyle: 'dashed' as const } } }}
          activeStep={1}
          steps={[{ label: 'A' }, { label: 'B' }, { label: 'C' }]}
        />
      ),
    },
  ],

  Tabs: [
    {
      label: 'Sizes',
      description: 'Small and large tabs',
      code: `<Tabs size="small" value="tab1" onValueChange={...} items={[{ value: 'tab1', label: 'Tab 1' }, ...]} />`,
      render: () => (
        <View style={col}>
          <TabsApi size="small" />
          <TabsApi size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color tabs',
      code: `<Tabs color="success" value="tab1" onValueChange={...} items={[...]} />`,
      render: () => <TabsApi color="success" />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Tabs sx={{ mt: 2 }} value="tab1" onValueChange={...} items={[...]} />`,
      render: () => <TabsApi sx={{ mt: 2 }} />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for TabBar and Indicator',
      code: `<Tabs slotProps={{ TabBar: { style: { borderBottomWidth: 2 } }, Indicator: { style: { height: 4 } } }} ... />`,
      render: () => <TabsApi slotProps={{ TabBar: { style: { borderBottomWidth: 2 } }, Indicator: { style: { height: 4 } } }} />,
    },
  ],

  // =========================================================================
  // BATCH G – DATA_DISPLAY (18 components)
  // =========================================================================

  Avatar: [
    {
      label: 'Sizes',
      description: 'Small and large avatars',
      code: `<Avatar size="small" label="SM" />\n<Avatar size="large" label="LG" />`,
      render: () => (
        <View style={row}>
          <Avatar size="small" label="SM" />
          <Avatar size="large" label="LG" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error avatars',
      code: `<Avatar color="success" label="OK" />\n<Avatar color="error" label="NO" />`,
      render: () => (
        <View style={row}>
          <Avatar color="success" label="OK" />
          <Avatar color="error" label="NO" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Avatar sx={{ mr: 2 }} label="SX" />`,
      render: () => <Avatar sx={{ mr: 2 }} label="SX" />,
    },
  ],

  Charts: [
    {
      label: 'Sizes',
      description: 'Small bar chart',
      code: `<BarChart size="small" data={[...]} height={150} />`,
      render: () => <BarChart size="small" data={chartData} height={150} />,
    },
    {
      label: 'Colors',
      description: 'Success color chart',
      code: `<BarChart color="success" data={[...]} height={150} />`,
      render: () => <BarChart color="success" data={chartData} height={150} />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<BarChart sx={{ mt: 2, p: 1 }} data={[...]} height={150} />`,
      render: () => <BarChart sx={{ mt: 2, p: 1 }} data={chartData} height={150} />,
    },
  ],

  Chip: [
    {
      label: 'Sizes',
      description: 'Small and large chips',
      code: `<Chip size="small" label="Small" />\n<Chip size="large" label="Large" />`,
      render: () => (
        <View style={row}>
          <Chip size="small" label="Small" />
          <Chip size="large" label="Large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error chips',
      code: `<Chip color="success" label="Success" />\n<Chip color="error" label="Error" />`,
      render: () => (
        <View style={row}>
          <Chip color="success" label="Success" />
          <Chip color="error" label="Error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Chip sx={{ mr: 1, mt: 1 }} label="Styled" />`,
      render: () => <Chip sx={{ mr: 1, mt: 1 }} label="Styled" />,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Label slot',
      code: `<Chip slotProps={{ Label: { style: { letterSpacing: 2 } } }} label="Custom" />`,
      render: () => <Chip slotProps={{ Label: { style: { letterSpacing: 2 } } }} label="Custom" />,
    },
  ],

  DataGrid: [
    {
      label: 'Sizes',
      description: 'Small data grid',
      code: `<DataGrid size="small" columns={[...]} rows={[...]} />`,
      render: () => <DataGrid size="small" columns={gridCols} rows={gridRows} />,
    },
    {
      label: 'Colors',
      description: 'Success color data grid',
      code: `<DataGrid color="success" columns={[...]} rows={[...]} />`,
      render: () => <DataGrid color="success" columns={gridCols} rows={gridRows} />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<DataGrid sx={{ mt: 2, p: 1 }} columns={[...]} rows={[...]} />`,
      render: () => <DataGrid sx={{ mt: 2, p: 1 }} columns={gridCols} rows={gridRows} />,
    },
  ],

  DataTable: [
    {
      label: 'Sizes',
      description: 'Small data table',
      code: `<DataTable size="small" columns={[...]} rows={[...]} keyExtractor={r => r.name} />`,
      render: () => <DataTable size="small" columns={tableCols} rows={tableRows} keyExtractor={(r: { name: string }) => r.name} />,
    },
    {
      label: 'Colors',
      description: 'Success color data table',
      code: `<DataTable color="success" columns={[...]} rows={[...]} keyExtractor={r => r.name} />`,
      render: () => <DataTable color="success" columns={tableCols} rows={tableRows} keyExtractor={(r: { name: string }) => r.name} />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<DataTable sx={{ mt: 2 }} columns={[...]} rows={[...]} keyExtractor={r => r.name} />`,
      render: () => <DataTable sx={{ mt: 2 }} columns={tableCols} rows={tableRows} keyExtractor={(r: { name: string }) => r.name} />,
    },
  ],

  HumanizationScoreBar: [
    {
      label: 'Sizes',
      description: 'Small and large score bars',
      code: `<HumanizationScoreBar size="small" fleschKincaidBefore={30} fleschKincaidAfter={70} />\n<HumanizationScoreBar size="large" fleschKincaidBefore={30} fleschKincaidAfter={70} />`,
      render: () => (
        <View style={col}>
          <HumanizationScoreBar size="small" fleschKincaidBefore={30} fleschKincaidAfter={70} />
          <HumanizationScoreBar size="large" fleschKincaidBefore={30} fleschKincaidAfter={70} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color score bar',
      code: `<HumanizationScoreBar color="success" fleschKincaidBefore={30} fleschKincaidAfter={70} />`,
      render: () => <HumanizationScoreBar color="success" fleschKincaidBefore={30} fleschKincaidAfter={70} />,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<HumanizationScoreBar sx={{ mt: 2 }} fleschKincaidBefore={30} fleschKincaidAfter={70} />`,
      render: () => <HumanizationScoreBar sx={{ mt: 2 }} fleschKincaidBefore={30} fleschKincaidAfter={70} />,
    },
  ],

  Icon: [
    {
      label: 'Sizes',
      description: 'Small and large icons',
      code: `<Icon size="small" name="home" />\n<Icon size="large" name="home" />`,
      render: () => (
        <View style={row}>
          <Icon size="small" name="home" />
          <Icon size="large" name="home" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error icons',
      code: `<Icon color="success" name="check" />\n<Icon color="error" name="close" />`,
      render: () => (
        <View style={row}>
          <Icon color="success" name="check" />
          <Icon color="error" name="close" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Icon sx={{ ml: 2 }} name="settings" />`,
      render: () => <Icon sx={{ ml: 2 }} name="settings" />,
    },
  ],

  ImageList: [
    {
      label: 'Sizes',
      description: 'Small image list',
      code: `<ImageList size="small" cols={2}><ImageListItem img={{ uri: '...' }} /></ImageList>`,
      render: () => (
        <ImageList size="small" cols={2}>
          <ImageListItem img={{ uri: 'https://via.placeholder.com/100' }} />
          <ImageListItem img={{ uri: 'https://via.placeholder.com/100' }} />
        </ImageList>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color image list',
      code: `<ImageList color="success"><ImageListItem img={{ uri: '...' }} /></ImageList>`,
      render: () => (
        <ImageList color="success" cols={2}>
          <ImageListItem img={{ uri: 'https://via.placeholder.com/100' }} />
        </ImageList>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<ImageList sx={{ p: 1 }} cols={2}><ImageListItem img={{ uri: '...' }} /></ImageList>`,
      render: () => (
        <ImageList sx={{ p: 1 }} cols={2}>
          <ImageListItem img={{ uri: 'https://via.placeholder.com/100' }} />
        </ImageList>
      ),
    },
  ],

  InvitationStatusBadge: [
    {
      label: 'Sizes',
      description: 'Small and large status badges',
      code: `<InvitationStatusBadge size="small" status="active" />\n<InvitationStatusBadge size="large" status="active" />`,
      render: () => (
        <View style={row}>
          <InvitationStatusBadge size="small" status="active" />
          <InvitationStatusBadge size="large" status="active" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error status badges',
      code: `<InvitationStatusBadge color="success" status="active" />\n<InvitationStatusBadge color="error" status="revoked" />`,
      render: () => (
        <View style={row}>
          <InvitationStatusBadge color="success" status="active" />
          <InvitationStatusBadge color="error" status="revoked" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<InvitationStatusBadge sx={{ ml: 2 }} status="active" />`,
      render: () => <InvitationStatusBadge sx={{ ml: 2 }} status="active" />,
    },
  ],

  List: [
    {
      label: 'Sizes',
      description: 'Small and large list items',
      code: `<List size="small"><ListItem title="Item A" /><ListItem title="Item B" /></List>`,
      render: () => (
        <View style={col}>
          <List size="small"><ListItem title="Small A" /><ListItem title="Small B" /></List>
          <List size="large"><ListItem title="Large A" /><ListItem title="Large B" /></List>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color list',
      code: `<List color="success"><ListItem title="Item A" /></List>`,
      render: () => <List color="success"><ListItem title="A" /><ListItem title="B" /></List>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<List sx={{ mt: 2, p: 1 }}><ListItem title="Item" /></List>`,
      render: () => <List sx={{ mt: 2, p: 1 }}><ListItem title="Styled" /></List>,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Root slot',
      code: `<List slotProps={{ Root: { style: { borderWidth: 1, borderColor: '#ccc' } } }}><ListItem title="Item" /></List>`,
      render: () => <List slotProps={{ Root: { style: { borderWidth: 1, borderColor: '#ccc' } } }}><ListItem title="Slot Styled" /></List>,
    },
  ],

  Masonry: [
    {
      label: 'Sizes',
      description: 'Small masonry layout',
      code: `<Masonry size="small" columns={2}><Paper sx={{ p: 1 }}><Text>A</Text></Paper><Paper sx={{ p: 1 }}><Text>B</Text></Paper></Masonry>`,
      render: () => (
        <Masonry size="small" columns={2}>
          <Paper sx={{ p: 1 }}><Text>A</Text></Paper>
          <Paper sx={{ p: 1 }}><Text>B</Text></Paper>
        </Masonry>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color masonry',
      code: `<Masonry color="success" columns={2}><Paper sx={{ p: 1 }}><Text>A</Text></Paper></Masonry>`,
      render: () => (
        <Masonry color="success" columns={2}>
          <Paper sx={{ p: 1 }}><Text>A</Text></Paper>
          <Paper sx={{ p: 1 }}><Text>B</Text></Paper>
        </Masonry>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Masonry sx={{ mt: 2, p: 1 }} columns={2}><Paper sx={{ p: 1 }}><Text>A</Text></Paper></Masonry>`,
      render: () => (
        <Masonry sx={{ mt: 2, p: 1 }} columns={2}>
          <Paper sx={{ p: 1 }}><Text>A</Text></Paper>
        </Masonry>
      ),
    },
  ],

  MaterialIcon: [
    {
      label: 'Sizes',
      description: 'Small and large material icons',
      code: `<MaterialIcon size="small" name="home" />\n<MaterialIcon size="large" name="home" />`,
      render: () => (
        <View style={row}>
          <MaterialIcon size="small" name="home" />
          <MaterialIcon size="large" name="home" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error material icons',
      code: `<MaterialIcon color="success" name="check_circle" />\n<MaterialIcon color="error" name="cancel" />`,
      render: () => (
        <View style={row}>
          <MaterialIcon color="success" name="check_circle" />
          <MaterialIcon color="error" name="cancel" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<MaterialIcon sx={{ ml: 2, mt: 1 }} name="star" />`,
      render: () => <MaterialIcon sx={{ ml: 2, mt: 1 }} name="star" />,
    },
  ],

  Text: [
    {
      label: 'Sizes',
      description: 'Small and large text variants',
      code: `<Text size="small" variant="bodyMedium">Small text</Text>\n<Text size="large" variant="bodyMedium">Large text</Text>`,
      render: () => (
        <View style={col}>
          <Text size="small" variant="bodyMedium">Small text</Text>
          <Text size="large" variant="bodyMedium">Large text</Text>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error text',
      code: `<Text color="success">Success text</Text>\n<Text color="error">Error text</Text>`,
      render: () => (
        <View style={col}>
          <Text color="success">Success text</Text>
          <Text color="error">Error text</Text>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Text sx={{ mt: 2, px: 3, bg: 'secondary' }}>Styled text</Text>`,
      render: () => <Text sx={{ mt: 2, px: 3, bg: 'secondary' }}>Styled text</Text>,
    },
  ],

  Timeline: [
    {
      label: 'Sizes',
      description: 'Small timeline',
      code: `<Timeline size="small"><TimelineItem><TimelineSeparator><TimelineDot /><TimelineConnector /></TimelineSeparator><TimelineContent><Text>Step 1</Text></TimelineContent></TimelineItem></Timeline>`,
      render: () => (
        <Timeline size="small">
          <TimelineItem>
            <TimelineSeparator><TimelineDot /><TimelineConnector /></TimelineSeparator>
            <TimelineContent><Text>Step 1</Text></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator><TimelineDot /></TimelineSeparator>
            <TimelineContent><Text>Step 2</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color timeline',
      code: `<Timeline color="success">...</Timeline>`,
      render: () => (
        <Timeline color="success">
          <TimelineItem>
            <TimelineSeparator><TimelineDot /><TimelineConnector /></TimelineSeparator>
            <TimelineContent><Text>Done</Text></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator><TimelineDot /></TimelineSeparator>
            <TimelineContent><Text>Complete</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Timeline sx={{ mt: 2, pl: 1 }}>...</Timeline>`,
      render: () => (
        <Timeline sx={{ mt: 2, pl: 1 }}>
          <TimelineItem>
            <TimelineSeparator><TimelineDot /></TimelineSeparator>
            <TimelineContent><Text>Styled</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      ),
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Root slot',
      code: `<Timeline slotProps={{ Root: { style: { paddingLeft: 16 } } }}>...</Timeline>`,
      render: () => (
        <Timeline slotProps={{ Root: { style: { paddingLeft: 16 } } }}>
          <TimelineItem>
            <TimelineSeparator><TimelineDot /></TimelineSeparator>
            <TimelineContent><Text>Custom</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      ),
    },
  ],

  TreeView: [
    {
      label: 'Sizes',
      description: 'Small tree view',
      code: `<SimpleTreeView size="small"><TreeItem itemId="1" label="Files"><TreeItem itemId="1-1" label="doc.txt" /></TreeItem></SimpleTreeView>`,
      render: () => (
        <View style={col}>
          <SimpleTreeView size="small">
            <TreeItem itemId="1" label="Files"><TreeItem itemId="1-1" label="doc.txt" /></TreeItem>
          </SimpleTreeView>
          <SimpleTreeView size="large">
            <TreeItem itemId="1" label="Files"><TreeItem itemId="1-1" label="doc.txt" /></TreeItem>
          </SimpleTreeView>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color tree view',
      code: `<SimpleTreeView color="success"><TreeItem itemId="1" label="Files" /></SimpleTreeView>`,
      render: () => (
        <SimpleTreeView color="success">
          <TreeItem itemId="1" label="Files"><TreeItem itemId="1-1" label="doc.txt" /></TreeItem>
        </SimpleTreeView>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<SimpleTreeView sx={{ mt: 2, pl: 1 }}><TreeItem itemId="1" label="Files" /></SimpleTreeView>`,
      render: () => (
        <SimpleTreeView sx={{ mt: 2, pl: 1 }}>
          <TreeItem itemId="1" label="Files"><TreeItem itemId="1-1" label="doc.txt" /></TreeItem>
        </SimpleTreeView>
      ),
    },
  ],

  WorkerAgentRow: [
    {
      label: 'Sizes',
      description: 'Small and large worker rows',
      code: `<WorkerAgentRow size="small" workerId="w1" sectionIndex={0} status="active" progressPercent={75} />\n<WorkerAgentRow size="large" workerId="w1" sectionIndex={0} status="active" progressPercent={75} />`,
      render: () => (
        <View style={col}>
          <WorkerAgentRow size="small" workerId="w1" sectionIndex={0} status="active" progressPercent={75} />
          <WorkerAgentRow size="large" workerId="w1" sectionIndex={0} status="active" progressPercent={75} />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error worker rows',
      code: `<WorkerAgentRow color="success" workerId="w1" sectionIndex={0} status="active" progressPercent={90} />`,
      render: () => (
        <View style={col}>
          <WorkerAgentRow color="success" workerId="w1" sectionIndex={0} status="done" progressPercent={100} />
          <WorkerAgentRow color="error" workerId="w2" sectionIndex={1} status="failed" progressPercent={30} />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<WorkerAgentRow sx={{ mt: 1 }} workerId="w1" sectionIndex={0} status="active" progressPercent={50} />`,
      render: () => <WorkerAgentRow sx={{ mt: 1 }} workerId="w1" sectionIndex={0} status="active" progressPercent={50} />,
    },
  ],

  // =========================================================================
  // BATCH H – LAYOUT (17 components) + FEEDBACK (1)
  // =========================================================================

  ActivityIndicator: [
    {
      label: 'Sizes',
      description: 'Small and large activity indicators',
      code: `<ActivityIndicator size="small" />\n<ActivityIndicator size="large" />`,
      render: () => (
        <View style={row}>
          <ActivityIndicator size="small" />
          <ActivityIndicator size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error activity indicators',
      code: `<ActivityIndicator color="success" />\n<ActivityIndicator color="error" />`,
      render: () => (
        <View style={row}>
          <ActivityIndicator color="success" />
          <ActivityIndicator color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<ActivityIndicator sx={{ ml: 3, mt: 2 }} />`,
      render: () => <ActivityIndicator sx={{ ml: 3, mt: 2 }} />,
    },
  ],

  Accordion: [
    {
      label: 'Sizes',
      description: 'Small and large accordions',
      code: `<Accordion size="small" title="Small"><Text>Content</Text></Accordion>\n<Accordion size="large" title="Large"><Text>Content</Text></Accordion>`,
      render: () => (
        <View style={col}>
          <Accordion size="small" title="Small"><Text>Content</Text></Accordion>
          <Accordion size="large" title="Large"><Text>Content</Text></Accordion>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error accordions',
      code: `<Accordion color="success" title="Success"><Text>Content</Text></Accordion>`,
      render: () => (
        <View style={col}>
          <Accordion color="success" title="Success"><Text>Content</Text></Accordion>
          <Accordion color="error" title="Error"><Text>Content</Text></Accordion>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Accordion sx={{ mt: 2, px: 1 }} title="Styled"><Text>Content</Text></Accordion>`,
      render: () => <Accordion sx={{ mt: 2, px: 1 }} title="Styled"><Text>Content</Text></Accordion>,
    },
  ],

  Box: [
    {
      label: 'Sizes',
      description: 'Small and large boxes',
      code: `<Box size="small" sx={{ bg: 'primary', p: 1 }}><Text>Small</Text></Box>\n<Box size="large" sx={{ bg: 'primary', p: 1 }}><Text>Large</Text></Box>`,
      render: () => (
        <View style={row}>
          <Box size="small" sx={{ bg: 'primary', p: 1 }}><Text>Small</Text></Box>
          <Box size="large" sx={{ bg: 'primary', p: 1 }}><Text>Large</Text></Box>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error boxes',
      code: `<Box color="success" sx={{ p: 2 }}><Text>Success</Text></Box>`,
      render: () => (
        <View style={row}>
          <Box color="success" sx={{ p: 2 }}><Text>Success</Text></Box>
          <Box color="error" sx={{ p: 2 }}><Text>Error</Text></Box>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Box sx={{ mt: 2, px: 3, py: 2, bg: 'secondary' }}><Text>Styled</Text></Box>`,
      render: () => <Box sx={{ mt: 2, px: 3, py: 2, bg: 'secondary' }}><Text>Styled</Text></Box>,
    },
  ],

  Card: [
    {
      label: 'Sizes',
      description: 'Small and large cards',
      code: `<Card size="small"><Text>Small card</Text></Card>\n<Card size="large"><Text>Large card</Text></Card>`,
      render: () => (
        <View style={col}>
          <Card size="small"><Text variant="bodyMedium">Small card</Text></Card>
          <Card size="large"><Text variant="bodyMedium">Large card</Text></Card>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error cards',
      code: `<Card color="success"><Text>Success card</Text></Card>`,
      render: () => (
        <View style={col}>
          <Card color="success"><Text variant="bodyMedium">Success card</Text></Card>
          <Card color="error"><Text variant="bodyMedium">Error card</Text></Card>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Card sx={{ mt: 2, p: 3 }}><Text>Styled card</Text></Card>`,
      render: () => <Card sx={{ mt: 2, p: 3 }}><Text variant="bodyMedium">Styled card</Text></Card>,
    },
    {
      label: 'Slot Customization',
      description: 'Custom slotProps for Root slot',
      code: `<Card slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#e91e63' } } }}><Text>Slot styled</Text></Card>`,
      render: () => <Card slotProps={{ Root: { style: { borderWidth: 2, borderColor: '#e91e63' } } }}><Text variant="bodyMedium">Slot styled</Text></Card>,
    },
  ],

  Collapse: [
    {
      label: 'Sizes',
      description: 'Small collapse',
      code: `<Collapse size="small" in={true}><Paper sx={{ p: 2 }}><Text>Small</Text></Paper></Collapse>`,
      render: () => (
        <View style={col}>
          <Collapse size="small" in={true}><Paper sx={{ p: 2 }}><Text>Small</Text></Paper></Collapse>
          <Collapse size="large" in={true}><Paper sx={{ p: 2 }}><Text>Large</Text></Paper></Collapse>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color collapse',
      code: `<Collapse color="success" in={true}><Text>Success</Text></Collapse>`,
      render: () => <Collapse color="success" in={true}><Paper sx={{ p: 2 }}><Text>Success</Text></Paper></Collapse>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Collapse sx={{ mt: 2 }} in={true}><Text>Styled</Text></Collapse>`,
      render: () => <Collapse sx={{ mt: 2 }} in={true}><Paper sx={{ p: 2 }}><Text>Styled</Text></Paper></Collapse>,
    },
  ],

  Container: [
    {
      label: 'Sizes',
      description: 'Small and large containers',
      code: `<Container size="small"><Text>Small</Text></Container>\n<Container size="large"><Text>Large</Text></Container>`,
      render: () => (
        <View style={col}>
          <Container size="small"><Text variant="bodyMedium">Small container</Text></Container>
          <Container size="large"><Text variant="bodyMedium">Large container</Text></Container>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color container',
      code: `<Container color="success"><Text>Success</Text></Container>`,
      render: () => <Container color="success"><Text variant="bodyMedium">Success container</Text></Container>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Container sx={{ mt: 2, px: 3 }}><Text>Styled</Text></Container>`,
      render: () => <Container sx={{ mt: 2, px: 3 }}><Text variant="bodyMedium">Styled container</Text></Container>,
    },
  ],

  Divider: [
    {
      label: 'Sizes',
      description: 'Small and large dividers',
      code: `<Divider size="small" />\n<Divider size="large" />`,
      render: () => (
        <View style={col}>
          <Divider size="small" />
          <Divider size="large" />
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error dividers',
      code: `<Divider color="success" />\n<Divider color="error" />`,
      render: () => (
        <View style={col}>
          <Divider color="success" />
          <Divider color="error" />
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Divider sx={{ my: 2 }} />`,
      render: () => <Divider sx={{ my: 2 }} />,
    },
  ],

  Fade: [
    {
      label: 'Sizes',
      description: 'Small fade transition',
      code: `<Fade size="small" in={true}><Paper sx={{ p: 2 }}><Text>Fade</Text></Paper></Fade>`,
      render: () => <Fade size="small" in={true}><Paper sx={{ p: 2 }}><Text>Fade</Text></Paper></Fade>,
    },
    {
      label: 'Colors',
      description: 'Success color fade',
      code: `<Fade color="success" in={true}><Text>Success</Text></Fade>`,
      render: () => <Fade color="success" in={true}><Paper sx={{ p: 2 }}><Text>Success</Text></Paper></Fade>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Fade sx={{ mt: 2 }} in={true}><Text>Styled</Text></Fade>`,
      render: () => <Fade sx={{ mt: 2 }} in={true}><Paper sx={{ p: 2 }}><Text>Styled</Text></Paper></Fade>,
    },
  ],

  Grid: [
    {
      label: 'Sizes',
      description: 'Small grid',
      code: `<Grid size="small" container spacing={1}><GridItem xs={6}><Paper sx={{ p: 1 }}><Text>A</Text></Paper></GridItem><GridItem xs={6}><Paper sx={{ p: 1 }}><Text>B</Text></Paper></GridItem></Grid>`,
      render: () => (
        <Grid size="small" container spacing={1}>
          <GridItem xs={6}><Paper sx={{ p: 1 }}><Text>A</Text></Paper></GridItem>
          <GridItem xs={6}><Paper sx={{ p: 1 }}><Text>B</Text></Paper></GridItem>
        </Grid>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color grid',
      code: `<Grid color="success" container spacing={1}>...</Grid>`,
      render: () => (
        <Grid color="success" container spacing={1}>
          <GridItem xs={6}><Paper sx={{ p: 1 }}><Text>A</Text></Paper></GridItem>
          <GridItem xs={6}><Paper sx={{ p: 1 }}><Text>B</Text></Paper></GridItem>
        </Grid>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Grid sx={{ mt: 2, p: 1 }} container spacing={1}>...</Grid>`,
      render: () => (
        <Grid sx={{ mt: 2, p: 1 }} container spacing={1}>
          <GridItem xs={12}><Paper sx={{ p: 1 }}><Text>Full width</Text></Paper></GridItem>
        </Grid>
      ),
    },
  ],

  Grow: [
    {
      label: 'Sizes',
      description: 'Small grow transition',
      code: `<Grow size="small" in={true}><Paper sx={{ p: 2 }}><Text>Grow</Text></Paper></Grow>`,
      render: () => <Grow size="small" in={true}><Paper sx={{ p: 2 }}><Text>Grow</Text></Paper></Grow>,
    },
    {
      label: 'Colors',
      description: 'Success color grow',
      code: `<Grow color="success" in={true}><Text>Success</Text></Grow>`,
      render: () => <Grow color="success" in={true}><Paper sx={{ p: 2 }}><Text>Success</Text></Paper></Grow>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Grow sx={{ mt: 2 }} in={true}><Text>Styled</Text></Grow>`,
      render: () => <Grow sx={{ mt: 2 }} in={true}><Paper sx={{ p: 2 }}><Text>Styled</Text></Paper></Grow>,
    },
  ],

  HelperText: [
    {
      label: 'Sizes',
      description: 'Small and large helper text',
      code: `<HelperText size="small">Small helper</HelperText>\n<HelperText size="large">Large helper</HelperText>`,
      render: () => (
        <View style={col}>
          <HelperText size="small">Small helper</HelperText>
          <HelperText size="large">Large helper</HelperText>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error helper text',
      code: `<HelperText color="success">Valid input</HelperText>\n<HelperText color="error">Invalid input</HelperText>`,
      render: () => (
        <View style={col}>
          <HelperText color="success">Valid input</HelperText>
          <HelperText color="error">Invalid input</HelperText>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<HelperText sx={{ ml: 2, mt: 1 }}>Styled helper</HelperText>`,
      render: () => <HelperText sx={{ ml: 2, mt: 1 }}>Styled helper</HelperText>,
    },
  ],

  Paper: [
    {
      label: 'Sizes',
      description: 'Small and large paper surfaces',
      code: `<Paper size="small" sx={{ p: 2 }}><Text>Small</Text></Paper>\n<Paper size="large" sx={{ p: 2 }}><Text>Large</Text></Paper>`,
      render: () => (
        <View style={col}>
          <Paper size="small" sx={{ p: 2 }}><Text>Small surface</Text></Paper>
          <Paper size="large" sx={{ p: 2 }}><Text>Large surface</Text></Paper>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success and error papers',
      code: `<Paper color="success" sx={{ p: 2 }}><Text>Success</Text></Paper>`,
      render: () => (
        <View style={row}>
          <Paper color="success" sx={{ p: 2 }}><Text>Success</Text></Paper>
          <Paper color="error" sx={{ p: 2 }}><Text>Error</Text></Paper>
        </View>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Paper sx={{ mt: 2, p: 3, bg: 'secondary' }}><Text>Styled</Text></Paper>`,
      render: () => <Paper sx={{ mt: 2, p: 3, bg: 'secondary' }}><Text>Styled surface</Text></Paper>,
    },
  ],

  Portal: [
    {
      label: 'Sizes',
      description: 'Small portal',
      code: `<PortalHost><Portal size="small"><Text>Small portal</Text></Portal></PortalHost>`,
      render: () => (
        <PortalHost>
          <Portal size="small"><Text>Small portal</Text></Portal>
        </PortalHost>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color portal',
      code: `<PortalHost><Portal color="success"><Text>Success</Text></Portal></PortalHost>`,
      render: () => (
        <PortalHost>
          <Portal color="success"><Text>Success</Text></Portal>
        </PortalHost>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<PortalHost><Portal sx={{ p: 2 }}><Text>Styled</Text></Portal></PortalHost>`,
      render: () => (
        <PortalHost>
          <Portal sx={{ p: 2 }}><Text>Styled</Text></Portal>
        </PortalHost>
      ),
    },
  ],

  Slide: [
    {
      label: 'Sizes',
      description: 'Small slide transition',
      code: `<Slide size="small" in={true} direction="right"><Paper sx={{ p: 2 }}><Text>Slide</Text></Paper></Slide>`,
      render: () => <Slide size="small" in={true} direction="right"><Paper sx={{ p: 2 }}><Text>Slide</Text></Paper></Slide>,
    },
    {
      label: 'Colors',
      description: 'Success color slide',
      code: `<Slide color="success" in={true} direction="right"><Text>Success</Text></Slide>`,
      render: () => <Slide color="success" in={true} direction="right"><Paper sx={{ p: 2 }}><Text>Success</Text></Paper></Slide>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Slide sx={{ mt: 2 }} in={true} direction="right"><Text>Styled</Text></Slide>`,
      render: () => <Slide sx={{ mt: 2 }} in={true} direction="right"><Paper sx={{ p: 2 }}><Text>Styled</Text></Paper></Slide>,
    },
  ],

  Stack: [
    {
      label: 'Sizes',
      description: 'Small and large stacks',
      code: `<Stack size="small" spacing={1}><Paper sx={{ p: 1 }}><Text>A</Text></Paper><Paper sx={{ p: 1 }}><Text>B</Text></Paper></Stack>`,
      render: () => (
        <View style={col}>
          <Stack size="small" spacing={1}>
            <Paper sx={{ p: 1 }}><Text>Small A</Text></Paper>
            <Paper sx={{ p: 1 }}><Text>Small B</Text></Paper>
          </Stack>
          <Stack size="large" spacing={1}>
            <Paper sx={{ p: 1 }}><Text>Large A</Text></Paper>
            <Paper sx={{ p: 1 }}><Text>Large B</Text></Paper>
          </Stack>
        </View>
      ),
    },
    {
      label: 'Colors',
      description: 'Success color stack',
      code: `<Stack color="success" spacing={1}><Text>A</Text><Text>B</Text></Stack>`,
      render: () => (
        <Stack color="success" spacing={1}>
          <Paper sx={{ p: 1 }}><Text>A</Text></Paper>
          <Paper sx={{ p: 1 }}><Text>B</Text></Paper>
        </Stack>
      ),
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Stack sx={{ mt: 2, p: 1, bg: 'secondary' }} spacing={1}><Text>A</Text><Text>B</Text></Stack>`,
      render: () => (
        <Stack sx={{ mt: 2, p: 1, bg: 'secondary' }} spacing={1}>
          <Paper sx={{ p: 1 }}><Text>A</Text></Paper>
          <Paper sx={{ p: 1 }}><Text>B</Text></Paper>
        </Stack>
      ),
    },
  ],

  Zoom: [
    {
      label: 'Sizes',
      description: 'Small zoom transition',
      code: `<Zoom size="small" in={true}><Paper sx={{ p: 2 }}><Text>Zoom</Text></Paper></Zoom>`,
      render: () => <Zoom size="small" in={true}><Paper sx={{ p: 2 }}><Text>Zoom</Text></Paper></Zoom>,
    },
    {
      label: 'Colors',
      description: 'Success color zoom',
      code: `<Zoom color="success" in={true}><Text>Success</Text></Zoom>`,
      render: () => <Zoom color="success" in={true}><Paper sx={{ p: 2 }}><Text>Success</Text></Paper></Zoom>,
    },
    {
      label: 'Sx Styling',
      description: 'Custom spacing via sx prop',
      code: `<Zoom sx={{ mt: 2 }} in={true}><Text>Styled</Text></Zoom>`,
      render: () => <Zoom sx={{ mt: 2 }} in={true}><Paper sx={{ p: 2 }}><Text>Styled</Text></Paper></Zoom>,
    },
  ],
};

export default muiApiExamples;
