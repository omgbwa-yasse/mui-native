# Quickstart: MUI API Alignment — `009-mui-config-sync`

**Feature**: Global component config, `size`, `color`, `sx`, `slots`/`slotProps`
**Branch**: `009-mui-config-sync`

---

## Quick reference

| Story | What changed | Where |
|-------|-------------|-------|
| P1 — Global defaults | `createTheme({ components: { Button: { defaultProps: { variant: 'outlined' } } } })` | All 78 components |
| P2 — Size prop | `<Button size="small" />` `<TextField size="large" />` | All 78 components |
| P3 — Color prop + semantic roles | `<Alert color="success" />` `<Chip color="warning" />` | All 78 components; 12 new roles in `colorScheme` |
| P4 — sx prop | `<Box sx={{ mt: 2, color: 'primary' }} />` | All 78 components |
| P5 — slots / slotProps | `<Chip slots={{ DeleteIcon: CustomIcon }} />` | 15 composite components |

---

## P1 — Set global component defaults via `createTheme`

**Use case**: All `TextField`s in the app should default to `variant="outlined"` and `size="small"` without passing them to every instance.

```ts
// app/theme.ts
import { createTheme } from '@mui-native/core';

export const appTheme = createTheme({
  mode: 'light',
  components: {
    // Every TextField in the app defaults to variant=outlined, size=small
    TextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    // Every primary Button gets extra border radius
    Button: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    // All chips default to outlined
    Chip: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

```tsx
// Usage — no size/variant needed; theme fills them in
<ThemeProvider theme={appTheme}>
  <TextField label="Email" />     {/* renders as outlined small */}
  <Button>Submit</Button>          {/* renders as contained, borderRadius=24 */}
  <Chip label="React Native" />   {/* renders as outlined */}
</ThemeProvider>
```

**Instance props always win**:
```tsx
{/* This renders as variant="filled" despite the theme default */}
<TextField variant="filled" label="Override" />
```

---

## P2 — Use the `size` prop

**Use case**: Show a compact form on a small screen by shrinking all inputs to `'small'`.

```tsx
import { TextField, Button, Select, Slider } from '@mui-native/core';

// Compact form
function CompactForm() {
  return (
    <View style={{ gap: 12 }}>
      <TextField size="small" label="Name" />
      <TextField size="small" label="Email" />
      <Select
        size="small"
        value="option1"
        options={[{ value: 'option1', label: 'Option 1' }]}
      />
      <Slider size="small" min={0} max={100} />
      <Button size="small">Submit</Button>
    </View>
  );
}

// Standard form
function StandardForm() {
  return (
    <View style={{ gap: 16 }}>
      <TextField size="medium" label="Name" />   {/* 56dp height */}
      <Button size="large">Submit</Button>         {/* 48dp height */}
    </View>
  );
}
```

**Size propagation** — `ButtonGroup`, `ToggleButtonGroup`, and `Tabs` propagate `size` to children:
```tsx
{/* All Buttons inside inherit size="small" */}
<ButtonGroup size="small">
  <Button>Cut</Button>
  <Button>Copy</Button>
  <Button>Paste</Button>
</ButtonGroup>
```

---

## P3 — Semantic `color` prop and new colorScheme roles

**Use case**: Show contextual feedback with proper semantic colors (success, warning, info).

```tsx
import { Alert, Button, Chip, Badge, CircularProgress } from '@mui-native/core';

function FeedbackExamples() {
  return (
    <View style={{ gap: 12 }}>
      {/* Semantic color roles */}
      <Alert severity="success" color="success">
        Changes saved successfully.
      </Alert>
      <Alert severity="warning" color="warning">
        Your session expires in 5 minutes.
      </Alert>
      <Alert severity="info" color="info">
        A new version is available.
      </Alert>
      <Alert severity="error">
        Failed to save. Please try again.
      </Alert>

      {/* Color on interactive components */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button color="success">Approve</Button>
        <Button color="error">Reject</Button>
        <Button color="warning">Escalate</Button>
      </View>

      {/* Color on display components */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip label="Online" color="success" />
        <Chip label="Away" color="warning" />
        <Chip label="Offline" color="error" />
      </View>

      {/* Badge with color */}
      <Badge badgeContent={3} color="success">
        <IconButton>
          <Icon name="notifications" />
        </IconButton>
      </Badge>
    </View>
  );
}
```

**Access theme colors directly** (advanced use):
```ts
import { useTheme } from '@mui-native/core';

function MyComponent() {
  const { theme } = useTheme();
  // New roles are on colorScheme:
  const successGreen = theme.colorScheme.success;         // '#2e7d32'
  const successContainer = theme.colorScheme.successContainer; // '#c8e6c9'
  // ...
}
```

---

## P4 — `sx` prop for layout adjustments

**Use case**: Apply contextual spacing, colors, and layout without creating additional StyleSheets.

```tsx
import { Box, Typography, Button, View as MuiView } from '@mui-native/core';

function SxExamples() {
  const [selected, setSelected] = React.useState(false);

  return (
    <Box sx={{ p: 2, flex: 1, backgroundColor: 'surface' }}>

      {/* Spacing shorthands */}
      <Typography sx={{ mb: 2, mt: 1 }}>Hello World</Typography>

      {/* Color aliases */}
      <Typography sx={{ color: 'primary' }}>Primary text</Typography>
      <Typography sx={{ color: 'success' }}>Success text</Typography>
      <Typography sx={{ color: '#ff5722' }}>Raw hex color</Typography>

      {/* Responsive width */}
      <Box sx={{ width: { xs: '100%', md: 480 }, mx: 'auto' }}>
        <TextField label="Name" sx={{ mb: 1 }} />
        <TextField label="Email" sx={{ mb: 2 }} />
        <Button sx={{ width: '100%' }}>Submit</Button>
      </Box>

      {/* Array notation with conditions */}
      <Card
        sx={[
          { p: 2, borderRadius: 12 },
          selected && { borderWidth: 2, borderColor: 'primary' },
        ]}
        onPress={() => setSelected(s => !s)}
      >
        <Typography>Selectable card</Typography>
      </Card>

      {/* sx + style: style always wins */}
      <Button
        sx={{ mt: 2, px: 3 }}
        style={{ backgroundColor: 'red' }}  {/* overrides sx backgroundColor */}
      >
        Custom
      </Button>
    </Box>
  );
}
```

**Current limitations** (RN deviations — silently ignored):
```tsx
{/* These sx keys have no effect in React Native (logged in DEV mode): */}
<Box sx={{
  ':hover': { backgroundColor: '#eee' },  // no hover in RN
  '@media print': { display: 'none' },     // no print media in RN
}} />
```

---

## P5 — `slots` and `slotProps` for composite customization

**Use case**: Replace a `Chip`'s delete icon with a custom one, or customize `TextField`'s label component.

```tsx
import { Chip, TextField, Alert } from '@mui-native/core';
import { Feather } from '@react-native-vector-icons/feather';

// Custom delete icon for Chip
function ChipWithCustomIcon() {
  return (
    <Chip
      label="Deletable"
      onDelete={() => console.log('deleted')}
      slots={{
        DeleteIcon: ({ onPress }) => (
          <Feather name="x-circle" size={18} onPress={onPress} />
        ),
      }}
      slotProps={{
        DeleteIcon: {
          size: 20,  // extra prop forwarded to replacement component
        },
      }}
    />
  );
}

// Custom input for TextField (e.g., masked input)
import MaskInput from 'react-native-mask-input';

function PhoneField() {
  return (
    <TextField
      label="Phone"
      slots={{ input: MaskInput }}
      slotProps={{
        input: {
          mask: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d{3}/, '-', /\d{4}/],
        },
      }}
    />
  );
}

// Custom Alert icon
function CustomAlert() {
  return (
    <Alert
      severity="info"
      slots={{
        icon: () => <Feather name="info" size={20} color="#0288d1" />,
      }}
    >
      Navigation updated.
    </Alert>
  );
}
```

**Using `slotProps` without `slots`** (forward extra props to the default sub-component):
```tsx
<Chip
  label="Accessibility enhanced"
  slotProps={{
    Label: {
      accessibilityRole: 'text',
      accessibilityLabel: 'Accessibility enhanced chip label',
    },
  }}
/>
```

---

## Combining all features

```tsx
const appTheme = createTheme({
  components: {
    Button: { defaultProps: { size: 'medium', variant: 'contained' } },
  },
});

function CombinedExample() {
  return (
    <ThemeProvider theme={appTheme}>
      {/* Global default from theme + sx override + explicit size */}
      <Button
        size="small"           /* overrides theme default */
        color="success"
        sx={{ mt: 2, px: 4 }}
      >
        Approve
      </Button>

      {/* Chip with all new features */}
      <Chip
        label="Production"
        color="success"
        size="small"
        sx={{ mx: 1 }}
        slots={{ DeleteIcon: MyDeleteIcon }}
      />
    </ThemeProvider>
  );
}
```

---

## Migration from pre-009 patterns

| Before | After |
|--------|-------|
| `style={{ marginTop: 8 }}` | `sx={{ mt: 1 }}` (or keep style) |
| Pass `variant="outlined"` to every `TextField` | Set once in `createTheme({ components: { TextField: { defaultProps: { variant: 'outlined' } } } })` |
| `color="#2e7d32"` hardcoded | `color="success"` or `sx={{ color: 'success' }}` |
| Manual theme.colorScheme.primary comparison for sizing | `size="small" \| "medium" \| "large"` prop |
| Custom sub-component via render prop `renderDeleteIcon` | `slots={{ DeleteIcon: MyIcon }}` |
