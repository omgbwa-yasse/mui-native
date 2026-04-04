# Quickstart: MUI-Native Component Showcase App

**Feature Branch**: `007-component-showcase-app`  
**Date**: 2026-04-04

---

## What this is

A standalone React Native CLI application (`apps/showcase/`) that displays every
MUI-Native component grouped by category. Each component shows its library source code
and up to 3 live usage examples.

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 20 LTS |
| React Native CLI | Latest (`npx react-native`) |
| Android Studio / Xcode | For emulator/simulator |
| JDK | 17 (Android) |
| CocoaPods | Latest (iOS) |

---

## Initial Setup

```bash
# From the repo root
cd apps/showcase

# Install JS dependencies
npm install

# iOS only — install CocoaPods
cd ios && pod install && cd ..

# Generate the source code registry (must run before first start)
npm run generate
```

---

## Running the App

```bash
# Start Metro bundler + regenerate registry
npm start

# In a second terminal — launch on Android
npm run android

# In a second terminal — launch on iOS
npm run ios
```

---

## Regenerating the Source Registry

The source code displayed in the app is generated at build time from the library source.
Run the generator any time you add a new component or change a source file:

```bash
npm run generate
```

This reads every `src/components/*/index.ts{x}` file and writes
`apps/showcase/src/catalogue/registry.generated.ts`.

---

## Project Structure

```
apps/showcase/
├── android/                    ← RN CLI Android project
├── ios/                        ← RN CLI iOS project
├── scripts/
│   └── generate-registry.ts    ← Build-time source code extractor
├── src/
│   ├── App.tsx                 ← Root component + navigation + providers
│   ├── catalogue/
│   │   ├── types.ts            ← Category, ComponentEntry, ExampleConfig types
│   │   ├── registry.generated.ts ← AUTO-GENERATED — do not edit by hand
│   │   └── registry.ts         ← Hand-authored: categories, examples, metadata
│   ├── components/
│   │   ├── CodeBlock.tsx       ← Syntax-highlighted source viewer
│   │   ├── ExampleGallery.tsx  ← Displays 3 examples vertical/horizontal
│   │   ├── LayoutToggle.tsx    ← Toggle button for layout direction
│   │   └── ExamplesPlaceholder.tsx ← "Examples coming soon" placeholder
│   ├── context/
│   │   └── LayoutPreferenceContext.tsx ← Session layout toggle context
│   └── screens/
│       ├── HomeScreen.tsx         ← Category grid
│       ├── CategoryListScreen.tsx ← Component list within a category
│       └── ComponentDetailScreen.tsx ← Source code + examples
├── package.json
└── tsconfig.json
```

---

## Adding Full Examples for a Component

1. Open `apps/showcase/src/catalogue/registry.ts`
2. Find the `ComponentEntry` for your component (identified by `componentKey`)
3. Replace `examples: null` with an array of 3 `ExampleConfig` objects:

```ts
{
  componentKey: 'Button',
  name: 'Button',
  categoryId: 'INPUTS',
  description: 'Trigger actions and events',
  sourceCode: sourceCodeMap['Button'] ?? '',
  hasFullExamples: true,
  examples: [
    {
      label: 'Primary',
      description: null,
      render: () => <Button variant="contained">Click me</Button>,
    },
    {
      label: 'Outlined',
      description: null,
      render: () => <Button variant="outlined">Outlined</Button>,
    },
    {
      label: 'Disabled',
      description: null,
      render: () => <Button variant="contained" disabled>Disabled</Button>,
    },
  ],
},
```

4. Run `npm run generate` to ensure the source code is up to date

---

## Running Tests

```bash
# From apps/showcase/
npm test
```

Tests cover: `CodeBlock`, `ExampleGallery`, `LayoutToggle`, navigation flows, and registry completeness.

---

## Dependencies Installed in the Showcase App

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` v7 | Navigation container |
| `@react-navigation/native-stack` | Stack navigator |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-syntax-highlighter` | Syntax-highlighted code blocks |
| `react-native-gesture-handler` | Gesture support (navigation swipes) |
| `mui-native` (local workspace) | The library itself |
