# Quickstart: Platform-Inspired Themes (`012-platform-themes`)

## Overview

`mui-native` ships 7 ready-made platform theme presets. Each preset is a standalone `Theme` object that includes both a light-mode palette and a `darkColorScheme` partial for automatic dark-mode support.

---

## Installation

No additional packages required. All theme presets are part of the `mui-native` library.

---

## Basic Usage: Apply a Platform Theme

```tsx
import React from 'react';
import { ThemeProvider } from 'mui-native';
import { iPhoneTheme } from 'mui-native';

export default function App() {
  return (
    <ThemeProvider theme={iPhoneTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

## Auto Dark-Mode Detection

When the `mode` prop is **not** provided, `ThemeProvider` automatically detects the device theme using `Appearance.getColorScheme()` and switches between light and dark palettes when the user changes their system setting:

```tsx
import { iPhoneTheme } from 'mui-native';

// No `mode` prop → auto-detects system setting
<ThemeProvider theme={iPhoneTheme}>
  <App />
</ThemeProvider>
```

---

## Manually Controlling the Mode

Pass the `mode` prop to override system detection:

```tsx
import { Windows11Theme } from 'mui-native';

// Always dark
<ThemeProvider theme={Windows11Theme} mode="dark">
  <App />
</ThemeProvider>
```

---

## Runtime Mode Switching

Use `useTheme()` to access `setMode()` for a toggle button:

```tsx
import { useTheme } from 'mui-native';
import { Switch } from 'react-native';

function DarkModeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <Switch
      value={mode === 'dark'}
      onValueChange={(val) => setMode(val ? 'dark' : 'light')}
    />
  );
}
```

---

## Available Theme Presets

| Import Name | Platform/Brand |
|---|---|
| `iPhoneTheme` | Apple iOS / iPhone |
| `UbuntuTheme` | Canonical Ubuntu Linux |
| `MAUITheme` | Microsoft .NET MAUI |
| `Windows11Theme` | Microsoft Fluent 2 / Windows 11 |
| `macOSTheme` | Apple macOS |
| `FacebookTheme` | Meta / Facebook |
| `TikTokTheme` | TikTok / ByteDance |

---

## Composing with Custom Overrides

Platform themes can be spread with `createTheme()` overrides for fine-grained customization:

```tsx
import { createTheme, iPhoneTheme } from 'mui-native';

const myTheme = createTheme({
  overrides: {
    ...iPhoneTheme,
    colorScheme: {
      ...iPhoneTheme.colorScheme,
      primary: '#FF6B00',  // custom brand orange instead of iOS blue
    },
  },
});

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

---

## Reading the Active Palette

```tsx
import { useTheme } from 'mui-native';
import { View, Text, StyleSheet } from 'react-native';

function ThemedCard() {
  const { theme } = useTheme();
  const { colorScheme } = theme;

  return (
    <View style={{ backgroundColor: colorScheme.surface }}>
      <Text style={{ color: colorScheme.onSurface }}>
        Hello World
      </Text>
    </View>
  );
}
```

`colorScheme` always reflects the currently-active palette — dark roles are automatically applied when mode is `'dark'` without any additional logic in your component.
