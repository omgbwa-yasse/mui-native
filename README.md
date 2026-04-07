# mui-native

**Material Design 3 component library for React Native**

A comprehensive, themeable UI component library implementing [Material Design 3](https://m3.material.io/) for React Native — built with TypeScript 5 strict mode, `react-native-reanimated` 3.x, and `react-native-gesture-handler` 2.x.

---

## Installation

```bash
npm install mui-native
```

### Peer dependencies

```bash
npm install react-native react-native-reanimated react-native-gesture-handler
```

---

## Quick start

```tsx
import { ThemeProvider, Button, Text } from 'mui-native';

export default function App() {
  return (
    <ThemeProvider>
      <Button onPress={() => console.log('pressed')}>
        <Text>Hello mui-native</Text>
      </Button>
    </ThemeProvider>
  );
}
```

---

## Components

| Category | Components |
|----------|-----------|
| **Layout** | `Box`, `Container`, `Grid`, `GridItem`, `Stack`, `Paper`, `Divider` |
| **Navigation** | `AppBar`, `Drawer`, `NavigationBar`, `Tabs`, `TabPanel`, `Breadcrumbs` |
| **Inputs** | `Button`, `ButtonGroup`, `IconButton`, `Checkbox`, `RadioButton`, `RadioGroup`, `Switch`, `Slider`, `Select`, `NumberField`, `Searchbar`, `ToggleButton`, `ToggleButtonGroup` |
| **Display** | `Text`, `Typography`†, `Avatar`, `AvatarGroup`, `Badge`, `Icon`, `Chip`, `Rating`, `Skeleton`, `Tooltip`, `ImageList` |
| **Card** | `Card`, `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea` |
| **Feedback** | `ActivityIndicator`, `Alert`, `Backdrop`, `Banner`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`, `Modal`, `Snackbar`, `SnackbarHost`, `SpeedDial` |
| **Data** | `DataTable`, `Table`, `TableContainer`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableSortLabel`, `TablePagination`, `List`, `ListItem`, `Accordion`, `Stepper`, `Pagination`, `TransferList`, `Autocomplete`, `SegmentedButtons` |
| **Utility** | `Portal`, `PortalHost`, `FAB`, `Link`, `HelperText`, `Menu`, `MenuItem` |

> † `Typography` is an alias for `Text` — both imports are equivalent and provided for MUI Web naming compatibility.

---

## Theming

```tsx
import { ThemeProvider, createTheme } from 'mui-native';

const theme = createTheme({
  mode: 'dark',
  colorScheme: {
    primary: '#6750A4',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* ... */}
    </ThemeProvider>
  );
}
```

---

## Requirements

- React Native ≥ 0.73
- React ≥ 18
- react-native-reanimated ≥ 3.0
- react-native-gesture-handler ≥ 2.0
- TypeScript ≥ 5.0 (recommended)

---

## License

MIT
