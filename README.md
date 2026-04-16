# mui-native

Material Design 3 component library for React Native.

mui-native fournit une base UI complete, themeable, et orientee production pour React Native, avec TypeScript strict, tests unitaires, et composants Material + wrappers RN.

![mui-native hero](docs/illustrations/hero-overview.svg)

---

## Sommaire

- [Pourquoi mui-native](#pourquoi-mui-native)
- [Nouveautes avril 2026](#nouveautes-avril-2026)
- [Illustration architecture](#illustration-architecture)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Theming](#theming)
- [Exemples de code](#exemples-de-code)
- [Exemples View](#exemples-view)
- [Catalogue des composants](#catalogue-des-composants)
- [Developpement local](#developpement-local)
- [Qualite](#qualite)
- [Requirements](#requirements)
- [License](#license)

---

## Pourquoi mui-native

- Material Design 3 pour React Native, pret a l'emploi.
- API centralisee et stable exposee depuis le package.
- Presets de themes multiplateformes (Android / iOS / Web).
- Couverture de tests unitaires sur les composants critiques.
- Integration avec `react-native-reanimated` et `react-native-gesture-handler`.

---

## Nouveautes avril 2026

- Ajout de composants RN manquants: `View`, `Pressable`, `TextInput`, `Image`, `ImageBackground`, `ScrollView`, `FlatList`, `SectionList`, `VirtualizedList`, `RefreshControl`, `SafeAreaView`, `KeyboardAvoidingView`, `DrawerLayoutAndroid`, `TouchableOpacity`, `TouchableHighlight`.
- Ajout de composants Material complementaires: `NavigationRail`, `SwipeableDrawer`.
- Ajout de presets de themes avec synchronisation des tokens.
- Renforcement des tests unitaires et des scenarios d'accessibilite.

---

## Illustration architecture

![mui-native architecture](docs/illustrations/architecture-map.svg)

---

## Installation

![installation flow](docs/illustrations/install-flow.svg)

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

## Theming

![theme presets](docs/illustrations/theme-presets.svg)

```tsx
import { ThemeProvider, createTheme, NovaTheme } from 'mui-native';

const theme = createTheme({
  ...NovaTheme,
  mode: 'dark',
  colorScheme: {
    primary: '#6750A4',
  },
});

export default function App() {
  return <ThemeProvider theme={theme}>{/* app */}</ThemeProvider>;
}
```

### Presets disponibles

`PureTheme`, `BeautifulTheme`, `PencilTheme`, `AuroraTheme`, `BreezeTheme`, `NovaTheme`, `PulseTheme`

---

## Exemples de code

![code examples](docs/illustrations/code-examples.svg)

### NavigationRail controlee

```tsx
import { useState } from 'react';
import { NavigationRail } from 'mui-native';

const items = [
  { value: 'home', label: 'Home', icon: 'home' },
  { value: 'search', label: 'Search', icon: 'search' },
  { value: 'settings', label: 'Settings', icon: 'settings' },
];

export function RailExample() {
  const [value, setValue] = useState('home');

  return (
    <NavigationRail
      items={items}
      value={value}
      onChange={setValue}
      ariaLabel="Main navigation"
    />
  );
}
```

### SwipeableDrawer temporaire

```tsx
import { useState } from 'react';
import { Button, SwipeableDrawer, Text, Box } from 'mui-native';

export function DrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <Text>Open drawer</Text>
      </Button>

      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="left"
      >
        <Box sx={{ p: 2 }}>
          <Text>Drawer content</Text>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
```

### Formulaire simple avec TextInput

```tsx
import { useState } from 'react';
import { Box, Button, Text, TextInput } from 'mui-native';

export function FormExample() {
  const [email, setEmail] = useState('');

  return (
    <Box sx={{ gap: 2, p: 2 }}>
      <TextInput
        placeholder="name@company.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button disabled={!email.includes('@')}>
        <Text>Submit</Text>
      </Button>
    </Box>
  );
}
```

### Snackbar via hook

```tsx
import { Button, SnackbarHost, Text, useSnackbar } from 'mui-native';

function SaveButton() {
  const { showSnackbar } = useSnackbar();

  return (
    <Button onPress={() => showSnackbar('Settings saved')}>
      <Text>Save</Text>
    </Button>
  );
}

export function SnackbarExample() {
  return (
    <>
      <SaveButton />
      <SnackbarHost />
    </>
  );
}
```

---

## Exemples View

![view layout](docs/illustrations/view-component-layout.svg)

### Layout de page avec View

```tsx
import { View, Text } from 'mui-native';

export function ViewLayoutExample() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <View style={{ height: 64, borderRadius: 12, backgroundColor: '#1d4ed8', justifyContent: 'center', paddingHorizontal: 12 }}>
        <Text style={{ color: 'white' }}>Header</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
        <View style={{ flex: 2, borderRadius: 12, backgroundColor: '#0f172a', padding: 12 }}>
          <Text style={{ color: 'white' }}>Content area</Text>
        </View>
        <View style={{ flex: 1, borderRadius: 12, backgroundColor: '#334155', padding: 12 }}>
          <Text style={{ color: 'white' }}>Aside</Text>
        </View>
      </View>
    </View>
  );
}
```

![view cards](docs/illustrations/view-card-pattern.svg)

### Card pattern compose avec View

```tsx
import { View, Text, Button } from 'mui-native';

export function ViewCardExample() {
  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: '#0f172a',
          padding: 16,
          gap: 10,
        }}
      >
        <Text style={{ color: '#93c5fd', fontSize: 18 }}>Analytics card</Text>
        <Text style={{ color: '#cbd5e1' }}>A lightweight card built only with View blocks.</Text>
        <Button>
          <Text>Open details</Text>
        </Button>
      </View>
    </View>
  );
}
```

---

## Catalogue des composants

### Layout et structure

`Box`, `View`, `Container`, `Stack`, `Grid`, `GridItem`, `Paper`, `Surface`, `Divider`, `ScrollView`, `FlatList`, `SectionList`, `VirtualizedList`, `SafeAreaView`, `KeyboardAvoidingView`, `RefreshControl`

### Navigation

`AppBar`, `NavigationBar`, `NavigationRail`, `Tabs`, `TabPanel`, `Drawer`, `SwipeableDrawer`, `DrawerLayoutAndroid`, `BottomSheet`, `Breadcrumbs`, `Link`, `Menu`, `MenuItem`

### Actions et boutons

`Button`, `ButtonGroup`, `IconButton`, `FAB`, `ToggleButton`, `ToggleButtonGroup`, `SpeedDial`, `Pressable`, `TouchableRipple`, `TouchableOpacity`, `TouchableHighlight`

### Saisie et formulaires

`TextField`, `TextInput`, `NumberField`, `Searchbar`, `Select`, `Autocomplete`, `Checkbox`, `RadioButton`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `SegmentedButtons`, `DatePicker`, `TimePicker`, `DateTimePicker`, `LocalizationProvider`, `IntlDateAdapter`, `useLocalization`

### Affichage et media

`Text`, `Typography`, `HelperText`, `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Icon`, `MaterialIcon`, `materialIconSource`, `Image`, `ImageBackground`, `ImageList`, `ImageListItem`, `Skeleton`, `Rating`, `ActivityIndicator`

### Data, overlays et utilitaires

`DataTable`, `DataGrid`, `useGridApiRef`, `Snackbar`, `SnackbarHost`, `useSnackbar`, `Dialog`, `Modal`, `Portal`, `PortalHost`, `Popover`, `Popper`, `Tooltip`, `Accordion`, `Stepper`, `Pagination`, `Timeline`, `SimpleTreeView`, `BarChart`, `LineChart`, `Masonry`

### Exemple import global

```tsx
import {
  ThemeProvider,
  NovaTheme,
  Button,
  Text,
  DataGrid,
  DatePicker,
  Snackbar,
  NavigationRail,
  SwipeableDrawer,
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

## Qualite

![quality pipeline](docs/illustrations/quality-pipeline.svg)

- TypeScript 5 strict mode sur toute la librairie.
- API publique centralisee et exportee de facon consistente.
- Tests unitaires par composant et tests de themes.
- Composants overlay testes avec `Portal` et `PortalHost`.

---

## Requirements

- React Native >= 0.73
- React >= 18
- react-native-reanimated >= 3.0
- react-native-gesture-handler >= 2.0
- TypeScript >= 5.0 (recommended)

---

## License

MIT
