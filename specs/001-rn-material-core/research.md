# Research: RN-Material Core Framework

**Branch**: `001-rn-material-core` | **Date**: 2026-04-02
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## R-01 Dynamic Color Algorithm (MD3 Tonal Palette from Seed)

**Decision**: Use the `@material/material-color-utilities` npm package
(Google's official TypeScript implementation).

**Rationale**:
- Same algorithm that powers Material You on Android; Google-maintained with a stable
  API surface (`themeFromSourceColor(argb)`).
- Produces all 30 MD3 color roles for both light and dark schemes in one call.
- Pure TypeScript, no native module, works in any RN environment.
- Bundle contribution: ~18 kB minified, tree-shakeable.

**Usage pattern**:
```ts
import { themeFromSourceColor, argbFromHex } from '@material/material-color-utilities';
const scheme = themeFromSourceColor(argbFromHex(seedHex));
// scheme.schemes.light / scheme.schemes.dark contain all MD3 roles as ARGB integers
```

**Alternatives considered**:
- Hand-rolling the HCT color space conversion — rejected; incorrect result risk,
  maintenance burden, not aligned with the official Google spec.
- `chroma.js` — rejected; does not implement the HCT color space required by MD3.

---

## R-02 @react-native-material/core Theme Shape

**Decision**: Map RN-Material's `Theme` to the `RNMaterialCoreTheme` interface by
extracting the subset of color roles that `@react-native-material/core ≥ 1.x` reads
from its `ThemeContext`.

**Findings** (from package source inspection):
`@react-native-material/core` exposes its own `ThemeContext` and reads the following
keys from it:
```ts
{
  colorScheme:     'light' | 'dark',
  palette: {
    primary:       string,   // hex
    onPrimary:     string,
    primaryContainer: string,
    onPrimaryContainer: string,
    secondary:     string,
    onSecondary:   string,
    surface:       string,
    onSurface:     string,
    background:    string,
    onBackground:  string,
    error:         string,
    onError:       string,
  }
}
```

**Adapter strategy** (`src/adapters/rnm-core-adapter.ts`):
- Wrap `@react-native-material/core`'s `ThemeProvider` as a child of RN-Material's
  `ThemeProvider`.
- Derive the `palette` object from `useTheme()` via a simple key-mapping function.
- Guard with `try { require('@react-native-material/core') }` so the adapter is a no-op
  when the peer is absent (prevents crashing on missing optional dep).

**Alternatives considered**:
- Patching `@react-native-material/core`'s theme manually per use site — rejected;
  violates DRY and forces consumers to repeat the mapping.

---

## R-03 RTL Logical Properties in React Native

**Decision**: Use `start`/`end` (logical) instead of `left`/`right` (physical) for all
horizontal positioning in `StyleSheet.create` blocks.

**Findings**:
- React Native supports `marginStart`, `marginEnd`, `paddingStart`, `paddingEnd`,
  `borderStartWidth`, `borderEndWidth`, `start`, `end` as first-class style props on
  all platforms from RN 0.62+.
- I18nManager.isRTL flips the resolved direction automatically; components need zero
  branching logic.
- `flexDirection: 'row'` already reverses with RTL; icons and text slots in components
  like `TextField` should be sequenced with `start`/`end` margin, not `left`/`right`.
- `writingDirection: 'auto'` on Text nodes covers inline RTL text embedding.

**Rule established**: Every `.styles.ts` file undergoes a lint rule:
`eslint-plugin-react-native` `no-raw-text` and a custom rule banning the string
literals `'left'` and `'right'` as style values (allowed only in `// RN-DEVIATION:`
annotated exceptions).

**Alternatives considered**:
- Per-component `I18nManager.isRTL` ternaries — rejected; verbose, error-prone,
  violates Component Fidelity principle.

---

## R-04 Gesture-Driven BottomSheet with Reanimated

**Decision**: Implement `BottomSheet` as a pan-gesture-driven translated
`Animated.View` using `GestureDetector` + `Gesture.Pan()` (RNGK v2 API) with
Reanimated 3 `useAnimatedStyle`.

**Pattern** (RNGK v2 `GestureDetector` + `Gesture.Pan()`):
```ts
const translateY = useSharedValue(SHEET_HEIGHT);
const startY = useSharedValue(0);

const panGesture = Gesture.Pan()
  .onStart(() => { startY.value = translateY.value; })
  .onUpdate((event) => {
    translateY.value = Math.max(0, startY.value + event.translationY);
  })
  .onEnd((event) => {
    const shouldClose = event.velocityY > 500 || translateY.value > SHEET_HEIGHT / 2;
    translateY.value = withSpring(shouldClose ? SHEET_HEIGHT : 0, SPRING_CONFIG);
    if (shouldClose) runOnJS(onClose)();
  });
// Usage: <GestureDetector gesture={panGesture}><Animated.View style={animatedStyle} /></GestureDetector>
```

All work runs on the UI thread via RNGK v2; `runOnJS` bridges back to React only for the `onClose`
callback. `SPRING_CONFIG` values derived from MD3 motion tokens
(`duration.medium2 = 300 ms`, `easing.emphasized`).

**Alternatives considered**:
- `react-native-bottom-sheet` library — rejected; third-party dependency adds lock-in
  and bundle weight; the gesture pattern is well-understood and ours to maintain.
- `Animated` (legacy) API — rejected; runs on JS thread, violates Principle VI.

---

## R-05 Complete MD3 Color Roles (TypeScript Interface)

**Decision**: Model all 30 MD3 color roles as a TypeScript interface `ColorScheme`.

**Complete role list** (from https://m3.material.io/styles/color/roles):
```ts
export interface ColorScheme {
  primary:              string;
  onPrimary:            string;
  primaryContainer:     string;
  onPrimaryContainer:   string;
  secondary:            string;
  onSecondary:          string;
  secondaryContainer:   string;
  onSecondaryContainer: string;
  tertiary:             string;
  onTertiary:           string;
  tertiaryContainer:    string;
  onTertiaryContainer:  string;
  error:                string;
  onError:              string;
  errorContainer:       string;
  onErrorContainer:     string;
  background:           string;
  onBackground:         string;
  surface:              string;
  onSurface:            string;
  surfaceVariant:       string;
  onSurfaceVariant:     string;
  outline:              string;
  outlineVariant:       string;
  shadow:               string;
  scrim:                string;
  inverseSurface:       string;
  inverseOnSurface:     string;
  inversePrimary:       string;
  surfaceTint:          string;
}
```

All values are hex strings (`#RRGGBB`). The `generatePalette` function converts ARGB
integers from `@material/material-color-utilities` to hex via a helper.

**Alternatives considered**: Using ARGB integers natively — rejected; StyleSheet expects
hex or rgba strings.

---

## R-06 MD3 Type Scale (Typography Tokens)

**Decision**: Implement all 15 MD3 type styles as named tokens:

| Token name            | Size (sp) | Line-height | Weight   |
|-----------------------|-----------|-------------|----------|
| `displayLarge`        | 57        | 64          | 400      |
| `displayMedium`       | 45        | 52          | 400      |
| `displaySmall`        | 36        | 44          | 400      |
| `headlineLarge`       | 32        | 40          | 400      |
| `headlineMedium`      | 28        | 36          | 400      |
| `headlineSmall`       | 24        | 32          | 400      |
| `titleLarge`          | 22        | 28          | 400      |
| `titleMedium`         | 16        | 24          | 500      |
| `titleSmall`          | 14        | 20          | 500      |
| `bodyLarge`           | 16        | 24          | 400      |
| `bodyMedium`          | 14        | 20          | 400      |
| `bodySmall`           | 12        | 16          | 400      |
| `labelLarge`          | 14        | 20          | 500      |
| `labelMedium`         | 12        | 16          | 500      |
| `labelSmall`          | 11        | 16          | 500      |

Font sizes are specified as `sp` values; React Native treats `fontSize` as scale-
independent by default only when the host app respects `allowFontScaling`. All
Text-rendering components MUST pass `allowFontScaling={true}` (the RN default) and
MUST NOT clamp font size — this fulfils the font-scale edge case from the spec.

---

## R-07 MD3 Elevation (Surface Tint + Shadow)

**Decision**: Implement elevation via MD3's "tint overlay" model (surface + primary
tint opacity) rather than classic shadow-only approach. Shadows are additive.

| Level | Tint opacity | Shadow (dp) | Usage                    |
|-------|-------------|-------------|--------------------------|
| 0     | 0 %         | none        | Flat surface             |
| 1     | 5 %         | 1           | Card (filled)            |
| 2     | 8 %         | 3           | Card (elevated), FAB     |
| 3     | 11 %        | 6           | Dialog, BottomSheet      |
| 4     | 12 %        | 8           | AppBar scrolled          |
| 5     | 14 %        | 12          | Navigation Drawer        |

`// RN-DEVIATION: Android shadow via elevation prop; iOS shadow via shadowRadius/
shadowOffset/shadowColor — implemented in elevation.ts with platform-specific values.`

---

## Constitution Re-check (post-research)

All six principles remain satisfied:
- **I**: All 9 component MD3 spec URLs added to data-model.md. ✅
- **II**: R-01 through R-07 produce zero hardcoded literal requirements. ✅
- **III**: `@material/material-color-utilities` feeds `generatePalette` → `ThemeProvider`; no static palette access in render. ✅
- **IV**: Logical-property rule (R-03) and platform adapter (R-05/elevation) cover cross-platform. ✅
- **V**: No new accessibility gaps found in research. ✅
- **VI**: Reanimated worklet pattern (R-04) confirmed. ✅

**Gate result**: ✅ ALL PASS — proceeding to Phase 1 design.
