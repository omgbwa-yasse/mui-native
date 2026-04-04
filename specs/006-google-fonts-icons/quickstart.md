# Quickstart: Google Fonts Material Icons Integration

**Feature**: 006-google-fonts-icons  
**Target**: Developers building React Native apps with `mui-native`

---

## 1. Install the peer dependency

```bash
npm install react-native-vector-icons
# or
yarn add react-native-vector-icons
```

---

## 2. Link icon fonts

### iOS (CocoaPods)

Add to your `Podfile`:

```ruby
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

Then run:

```bash
cd ios && pod install
```

### Android

Ensure `android/app/build.gradle` includes the font assets:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

---

## 3. Use `MaterialIcon` in your app

```tsx
import { MaterialIcon, ThemeProvider } from 'mui-native';

export default function App() {
  return (
    <ThemeProvider>
      {/* Default filled variant, size 24, theme color */}
      <MaterialIcon name="home" />

      {/* Outlined variant, custom size */}
      <MaterialIcon name="star" variant="outlined" size={32} />

      {/* Explicit color */}
      <MaterialIcon name="settings" color="#E91E63" />

      {/* With accessibility label */}
      <MaterialIcon name="notifications" accessibilityLabel="Notifications" />

      {/* Two-tone */}
      <MaterialIcon name="favorite" variant="two-tone" />
    </ThemeProvider>
  );
}
```

---

## 4. Compose with the existing `Icon` component

```tsx
import { Icon, materialIconSource } from 'mui-native';

const source = materialIconSource('search', 'rounded');

export const SearchButton = () => (
  <Icon source={source} size={24} accessibilityLabel="Search" />
);
```

---

## 5. TypeScript auto-complete

Icon names are fully typed. Your IDE will auto-complete from the ~2,500+ icon catalogue:

```ts
import type { MaterialIconName } from 'mui-native';

const icon: MaterialIconName = 'hom'; // ← TypeScript error: did you mean 'home'?
```

---

## All 5 variants at a glance

| Prop value | Style |
|------------|-------|
| `"filled"` (default) | Solid filled glyphs |
| `"outlined"` | Line-art outlined glyphs |
| `"rounded"` | Rounded corners |
| `"sharp"` | Sharp square corners |
| `"two-tone"` | Filled with secondary layer at 40% opacity |

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `[Error: Unrecognized font family 'MaterialIcons']` | Fonts not linked | Run `pod install` (iOS) or add `fonts.gradle` (Android) |
| Icon shows `?` placeholder | Icon name valid in type but glyph absent in variant | Use `"filled"` variant which has the fullest glyph set |
| `[mui-native] useTheme() must be called inside a <ThemeProvider>` | No `ThemeProvider` wrapping | Wrap app root — or `MaterialIcon` falls back to `#000000` |
