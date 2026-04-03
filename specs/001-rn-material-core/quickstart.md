# Quickstart: RN-Material

Get up and running with a themed Material Design 3 button in under 5 minutes
(Success Criterion SC-001).

---

## Prerequisites

| Requirement               | Version     |
|---------------------------|-------------|
| React Native              | ≥ 0.73      |
| react-native-reanimated   | ≥ 3.x       |
| react-native-gesture-handler | ≥ 2.x    |
| TypeScript                | ≥ 5.x       |
| Node                      | ≥ 18 LTS    |

---

## Step 1 — Install rn-material

```bash
npm install rn-material
```

---

## Step 2 — Install peer dependencies

If you haven't already set them up in your project:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

Follow the platform setup for each peer:

- **Reanimated**: add `require('react-native-reanimated/plugin')` to `babel.config.js`
  ([docs](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started))
- **Gesture Handler**: wrap your root component with `<GestureHandlerRootView>`
  ([docs](https://docs.swmansion.com/react-native-gesture-handler/docs/installation))

---

## Step 3 — Wrap your app with ThemeProvider

```tsx
// App.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'rn-material';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <YourNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

---

## Step 4 — Render your first Button

```tsx
// screens/HomeScreen.tsx
import { View } from 'react-native';
import { Button } from 'rn-material';

export function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        variant="filled"
        label="Save"
        onPress={() => console.log('pressed')}
      />
    </View>
  );
}
```

You should see a purple-hued Material You filled button rendered on screen.

---

## Step 5 — Toggle dark mode

Pass `mode="dark"` on ThemeProvider (controlled), or call `setMode` from the hook:

**Static prop approach**:

```tsx
<ThemeProvider mode="dark">
  ...
</ThemeProvider>
```

**Dynamic hook approach**:

```tsx
import { useTheme } from 'rn-material';

function SettingsItem() {
  const { theme, setMode } = useTheme();
  return (
    <Button
      label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}
      variant="outlined"
      onPress={() => setMode(theme.mode === 'light' ? 'dark' : 'light')}
    />
  );
}
```

The entire component tree re-renders with the new token set in ≤ 16 ms
(Success Criterion SC-002).

---

## Step 6 — Dynamic color from a seed (Material You)

Pass a hex seed to generate a full MD3 tonal palette from your brand color:

```tsx
<ThemeProvider seedColor="#6750A4">
  ...
</ThemeProvider>
```

Under the hood this calls `@material/material-color-utilities`'s
`themeFromSourceColor` and derives all 30 color roles automatically.

---

## Step 7 (Optional) — @react-native-material/core bridge

If your app uses components from `@react-native-material/core` alongside RN-Material,
add the adapter so legacy components inherit your theme tokens:

```bash
npm install @react-native-material/core
```

```tsx
import { ThemeProvider } from 'rn-material';
import { RNMCoreAdapter } from 'rn-material/adapters';
import { Button as LegacyButton } from '@react-native-material/core';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider seedColor="#6750A4">
        {/* RN-Material components */}
        <Button label="New Button" />

        {/* Legacy component inherits the same theme */}
        <RNMCoreAdapter>
          <LegacyButton title="Legacy Button" />
        </RNMCoreAdapter>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

`RNMCoreAdapter` is a no-op if `@react-native-material/core` is not installed.

---

## What's next?

| Topic                    | Where to look                      |
|--------------------------|------------------------------------|
| All component props      | [contracts/components.contract.ts](./contracts/components.contract.ts) |
| Theme shape & tokens     | [contracts/theme.contract.ts](./contracts/theme.contract.ts)      |
| Data model & entities    | [data-model.md](./data-model.md)                 |
| Full feature spec        | [spec.md](./spec.md)                        |
| Implementation plan      | [plan.md](./plan.md)                        |
