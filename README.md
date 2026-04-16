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

## Nouveautes (avril 2026)

- Ajout de composants RN manquants: `View`, `Pressable`, `TextInput`, `Image`, `ImageBackground`, `ScrollView`, `FlatList`, `SectionList`, `VirtualizedList`, `RefreshControl`, `SafeAreaView`, `KeyboardAvoidingView`, `DrawerLayoutAndroid`, `TouchableOpacity`, `TouchableHighlight`.
- Ajout de composants Material complementaires: `NavigationRail`, `SwipeableDrawer`.
- Ajout de presets de themes multiplateformes (Android / iOS / Web) avec synchronisation des tokens.
- Couverture de tests unitaires et integration showcase renforcees sur les nouveaux composants et les comportements d'accessibilite.

---

## API npm complete (catalogue detaille)

Cette section documente les exports publics disponibles depuis `mui-native`.

### 1) Theming

- `ThemeProvider`, `useTheme`, `createTheme`, `generatePalette`
- Presets de themes: `PureTheme`, `BeautifulTheme`, `PencilTheme`, `AuroraTheme`, `BreezeTheme`, `NovaTheme`, `PulseTheme`

### 2) Layout et structure

- `Box`, `View`, `Container`, `Stack`, `Grid`, `GridItem`, `Paper`, `Surface`, `Divider`
- `ScrollView`, `FlatList`, `SectionList`, `VirtualizedList`, `SafeAreaView`, `KeyboardAvoidingView`, `RefreshControl`

### 3) Navigation

- `AppBar`, `NavigationBar`, `Tabs`, `TabPanel`, `Drawer`, `DrawerLayoutAndroid`, `BottomSheet`, `Breadcrumbs`, `Link`
- `Menu`, `MenuItem`

### 4) Actions et boutons

- `Button`, `ButtonGroup`, `IconButton`, `FAB`, `ToggleButton`, `ToggleButtonGroup`, `SpeedDial`
- `Pressable`, `TouchableRipple`, `TouchableOpacity`, `TouchableHighlight`

### 5) Saisie et formulaires

- `TextField`, `TextInput`, `NumberField`, `Searchbar`, `Select`, `Autocomplete`
- `Checkbox`, `RadioButton`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `SegmentedButtons`
- Date/heure: `DatePicker`, `TimePicker`, `DateTimePicker`, `LocalizationProvider`, `IntlDateAdapter`, `useLocalization`

### 6) Affichage et media

- `Text`, `Typography` (alias), `HelperText`
- `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Icon`, `MaterialIcon`, `materialIconSource`
- `Image`, `ImageBackground`, `ImageList`, `ImageListItem`
- `Skeleton`, `Rating`, `ActivityIndicator`

### 7) Cards

- `Card`, `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`

### 8) Feedback, overlays et modales

- `Alert`, `Banner`, `Backdrop`
- `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`
- `Modal`, `Portal`, `PortalHost`, `Popover`, `Popper`, `Tooltip`
- `Snackbar`, `SnackbarHost`, `useSnackbar`

### 9) Donnees et tableaux

- `DataTable`, `DataGrid`, `useGridApiRef`
- Table HTML-like: `TableContainer`, `Table`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TableSortLabel`, `TablePagination`
- Listes: `List`, `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemAvatar`, `ListItemText`, `ListSubheader`, `ListSection`, `ListAccordion`
- Accordion: `Accordion`, `AccordionSummary`, `AccordionDetails`, `AccordionActions`
- Stepper: `Stepper`, `Step`, `StepLabel`, `StepContent`, `StepConnector`, `MobileStepper`
- `TransferList`, `Pagination`

### 10) Arbres, timelines, charts

- `SimpleTreeView`, `TreeItem`
- `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, `TimelineOppositeContent`
- `BarChart`, `LineChart`, `ChartLegend`, `ChartLoadingOverlay`, `seriesAdapter`
- `Masonry`

### 11) Progression et transitions

- Progress: `CircularProgress`, `LinearProgress`, `ProgressBar`
- Transitions: `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse`

### 12) Domain components

- `CodeInput`, `HumanizationScoreBar`, `InvitationStatusBadge`, `WorkerAgentRow`

### 13) Tokens et helpers style

- Colors: `baseLightColors`, `baseDarkColors`
- Typo: `typography`, `typographyVariantMap`
- Echelle: `spacing`, `getSpacing`, `shape`, `elevation`, `motion`, `motionDuration`, `motionEasing`, `SIZE_SCALE`
- Helpers: `isColorProp`, `colorRoleMap`

### 14) Hooks publics

- `useTheme`, `useMediaQuery`, `useSnackbar`, `useLocalization`, `useGridApiRef`

### 15) Utilitaires React Native re-exportes

- `StyleSheet`, `Dimensions`, `Platform`, `Animated`, `LayoutAnimation`, `Linking`, `Vibration`
- `AppState`, `Keyboard`, `useColorScheme`, `StatusBar`, `NativeAlert`
- `BackHandler`, `PermissionsAndroid`, `ToastAndroid`, `ActionSheetIOS`
- `PixelRatio`, `AccessibilityInfo`, `AppRegistry`, `Easing`, `InteractionManager`, `NativeEventEmitter`, `NativeModules`, `PanResponder`, `PlatformColor`, `Share`, `useWindowDimensions`, `useAnimatedValue`

### 16) Exemple d'import global

```tsx
import {
  ThemeProvider,
  PureTheme,
  Button,
  Text,
  DataGrid,
  DatePicker,
  Snackbar,
  CircularProgress,
} from 'mui-native';
```

---

## Developpement local

```bash
npm install
npm run lint
npm test
```

Pour executer uniquement certains tests:

```bash
npx jest --testPathPattern="NavigationRail|SwipeableDrawer" --no-coverage
```

---

## Qualite et conventions

- TypeScript 5 strict mode sur toute la librairie.
- API publique centralisee via `src/index.ts`.
- Tests unitaires par composant dans `tests/unit/components`.
- Les composants d'overlay sont testes avec `Portal`/`PortalHost` pour refléter le comportement runtime.

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
