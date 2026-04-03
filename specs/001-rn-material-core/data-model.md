# Data Model: RN-Material Core Framework

**Branch**: `001-rn-material-core` | **Date**: 2026-04-02
**Source spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

---

## 1. Core Token Types

### 1.1 ColorScheme

All 30 Material Design 3 color roles (R-05). Values are hex strings.

```ts
// src/tokens/colors.ts
export interface ColorScheme {
  // Primary
  primary:              string;
  onPrimary:            string;
  primaryContainer:     string;
  onPrimaryContainer:   string;
  // Secondary
  secondary:            string;
  onSecondary:          string;
  secondaryContainer:   string;
  onSecondaryContainer: string;
  // Tertiary
  tertiary:             string;
  onTertiary:           string;
  tertiaryContainer:    string;
  onTertiaryContainer:  string;
  // Error
  error:                string;
  onError:              string;
  errorContainer:       string;
  onErrorContainer:     string;
  // Background / Surface
  background:           string;
  onBackground:         string;
  surface:              string;
  onSurface:            string;
  surfaceVariant:       string;
  onSurfaceVariant:     string;
  outline:              string;
  outlineVariant:       string;
  // Utility
  shadow:               string;
  scrim:                string;
  inverseSurface:       string;
  inverseOnSurface:     string;
  inversePrimary:       string;
  surfaceTint:          string;
}
```

### 1.2 TypeScale

All 15 MD3 typography styles (R-06). Numeric values align with MD3 spec.

```ts
// src/tokens/typography.ts
export interface TypeStyle {
  fontFamily: string;  // default: 'Roboto' (falls back to system)
  fontSize:   number;  // sp (treated as dp by React Native)
  lineHeight: number;
  fontWeight: '400' | '500' | '700';
  letterSpacing?: number;
}

export interface TypeScale {
  displayLarge:    TypeStyle;
  displayMedium:   TypeStyle;
  displaySmall:    TypeStyle;
  headlineLarge:   TypeStyle;
  headlineMedium:  TypeStyle;
  headlineSmall:   TypeStyle;
  titleLarge:      TypeStyle;
  titleMedium:     TypeStyle;
  titleSmall:      TypeStyle;
  bodyLarge:       TypeStyle;
  bodyMedium:      TypeStyle;
  bodySmall:       TypeStyle;
  labelLarge:      TypeStyle;
  labelMedium:     TypeStyle;
  labelSmall:      TypeStyle;
}
```

### 1.3 SpacingScale

Uniform 4 dp base-unit grid.

```ts
// src/tokens/spacing.ts
export interface SpacingScale {
  none:   0;
  xxs:    2;
  xs:     4;
  sm:     8;
  md:     12;
  lg:     16;
  xl:     24;
  xxl:    32;
  xxxl:   48;
  xxxxl:  64;
}
```

### 1.4 ShapeScale

MD3 corner-radius levels.

```ts
// src/tokens/shape.ts
export interface ShapeStyle {
  borderRadius: number;
}

export interface ShapeScale {
  none:       ShapeStyle;   // 0
  extraSmall: ShapeStyle;   // 4
  small:      ShapeStyle;   // 8
  medium:     ShapeStyle;   // 12
  large:      ShapeStyle;   // 16
  extraLarge: ShapeStyle;   // 28
  full:       ShapeStyle;   // 9999
}
```

### 1.5 ElevationScale

MD3 elevation levels with tint + shadow (R-07). Platform-specific shadow values.

```ts
// src/tokens/elevation.ts
export interface ElevationStyle {
  level:      0 | 1 | 2 | 3 | 4 | 5;
  tintOpacity: number;   // 0–0.14
  // Android
  elevation?: number;
  // iOS
  shadowColor?:         string;
  shadowOffset?:        { width: number; height: number };
  shadowOpacity?:       number;
  shadowRadius?:        number;
}

export interface ElevationScale {
  level0: ElevationStyle;
  level1: ElevationStyle;
  level2: ElevationStyle;
  level3: ElevationStyle;
  level4: ElevationStyle;
  level5: ElevationStyle;
}
```

### 1.6 MotionTokens

```ts
// src/tokens/motion.ts
export interface MotionTokens {
  duration: {
    short1:  50;
    short2:  100;
    short3:  150;
    short4:  200;
    medium1: 250;
    medium2: 300;
    medium3: 350;
    medium4: 400;
    long1:   450;
    long2:   500;
  };
  easing: {
    standard:         string;   // 'cubic-bezier(0.2, 0, 0, 1.0)'
    standardDecelerate: string;
    standardAccelerate: string;
    emphasized:       string;
    emphasizedDecelerate: string;
    emphasizedAccelerate: string;
  };
}
```

---

## 2. Theme Entities

### 2.1 Theme

The root theme object passed through context.

```ts
// src/theme/types.ts
export interface Theme {
  colorScheme:  ColorScheme;
  typography:   TypeScale;
  spacing:      SpacingScale;
  shape:        ShapeScale;
  elevation:    ElevationScale;
  motion:       MotionTokens;
  mode:         'light' | 'dark';
  seedColor?:   string;   // hex; when provided → dynamic color via R-01
}
```

### 2.2 ThemeContext

React context value type. The `setMode` function allows in-tree mode switching.

```ts
// src/theme/ThemeContext.ts
export interface ThemeContextValue {
  theme:    Theme;
  setMode:  (mode: 'light' | 'dark' | 'system') => void;
}

// Default context value (throws if used outside ThemeProvider)
export const ThemeContext = createContext<ThemeContextValue | null>(null);
```

### 2.3 ThemeProvider Props

```ts
// src/theme/ThemeProvider.tsx
export interface ThemeProviderProps {
  /** Override any or all default theme values */
  theme?:     Partial<DeepPartial<Theme>>;
  /** Seed hex color for dynamic color generation (R-01) */
  seedColor?: string;
  /** Controlled light/dark mode; defaults to 'system' */
  mode?:      'light' | 'dark' | 'system';
  children:   ReactNode;
}
```

### 2.4 generatePalette

Pure function; never called in render. Called during `ThemeProvider` mount and
when `seedColor` or `mode` change.

```ts
// src/theme/generatePalette.ts
export function generatePalette(
  seedHex: string,
  mode: 'light' | 'dark'
): ColorScheme
```

---

## 3. Component Prop Interfaces

All components share a common `RNMBaseProps` base that forwards `testID`,
`accessible`, `accessibilityLabel`, and `style` overrides.

```ts
// src/components/_base/types.ts
export interface RNMBaseProps {
  testID?:              string;
  accessible?:          boolean;
  accessibilityLabel?:  string;
  style?:               StyleProp<ViewStyle>;
}
```

### 3.1 Button (FR-005)

```ts
// src/components/Button/types.ts
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';

export interface ButtonProps extends RNMBaseProps {
  variant?:              ButtonVariant;        // default: 'filled'
  label:                 string;
  icon?:                 ReactNode;
  iconPosition?:         'start' | 'end';      // default: 'start'
  onPress?:              (e: GestureResponderEvent) => void;
  onLongPress?:          (e: GestureResponderEvent) => void;
  disabled?:             boolean;
  loading?:              boolean;
  /** Override button-level color roles only */
  color?:                Partial<Pick<ColorScheme, 'primary' | 'onPrimary'>>;
  accessibilityRole?:    'button';
  accessibilityState?:   AccessibilityState;
}
```

### 3.2 TextField (FR-006)

```ts
// src/components/TextField/types.ts
export type TextFieldVariant = 'filled' | 'outlined';

export interface TextFieldProps extends RNMBaseProps {
  variant?:            TextFieldVariant;       // default: 'filled'
  label:               string;
  value?:              string;
  defaultValue?:       string;
  onChangeText?:       (text: string) => void;
  placeholder?:        string;
  helperText?:         string;
  errorText?:          string;
  /** When truthy errorText is shown instead of helperText */
  error?:              boolean;
  leadingIcon?:        ReactNode;
  trailingIcon?:       ReactNode;
  multiline?:          boolean;
  maxLength?:          number;
  keyboardType?:       TextInputProps['keyboardType'];
  secureTextEntry?:    boolean;
  disabled?:           boolean;
}
```

### 3.3 Card (FR-007)

```ts
// src/components/Card/types.ts
export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps extends RNMBaseProps {
  variant?:    CardVariant;    // default: 'elevated'
  onPress?:    (e: GestureResponderEvent) => void;
  children:    ReactNode;
}
```

### 3.4 AppBar (FR-007)

```ts
// src/components/AppBar/types.ts
export type AppBarVariant = 'small' | 'medium' | 'large' | 'center';

export interface AppBarProps extends RNMBaseProps {
  variant?:          AppBarVariant;    // default: 'small'
  title:             string;
  subtitle?:         string;
  leadingIcon?:      ReactNode;
  trailingIcons?:    ReactNode[];      // max 3 per MD3 spec
  /** ScrollView ref; enables elevation-on-scroll (Principle VI) */
  scrollRef?:        RefObject<ScrollView>;
  /** Controlled elevated state (overrides scrollRef auto-detect) */
  elevated?:         boolean;
}
```

### 3.5 FAB (Floating Action Button) (FR-007)

```ts
// src/components/FAB/types.ts
export type FABSize    = 'small' | 'medium' | 'large';
export type FABVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

export interface FABProps extends RNMBaseProps {
  icon:         ReactNode;
  label?:        string;             // when provided renders extended FAB
  size?:         FABSize;            // default: 'medium'
  variant?:      FABVariant;         // default: 'primary'
  onPress?:      (e: GestureResponderEvent) => void;
  onLongPress?:  (e: GestureResponderEvent) => void;
  lowered?:      boolean;            // reduces elevation to level1 (e.g. collapsed)
}
```

### 3.6 Chip (FR-007)

```ts
// src/components/Chip/types.ts
export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps extends RNMBaseProps {
  variant?:      ChipVariant;        // default: 'assist'
  label:         string;
  leadingIcon?:  ReactNode;
  trailingIcon?: ReactNode;
  selected?:     boolean;            // for filter/input chips
  onPress?:      (e: GestureResponderEvent) => void;
  onDelete?:     () => void;         // presents trailing ✕; for input chips
  disabled?:     boolean;
}
```

### 3.7 Dialog (FR-007)

```ts
// src/components/Dialog/types.ts
export interface DialogProps extends RNMBaseProps {
  visible:            boolean;
  onDismiss:          () => void;
  title?:             string;
  icon?:              ReactNode;
  children?:          ReactNode;    // body content
  /** Primary action button */
  confirmLabel?:      string;
  onConfirm?:         () => void;
  /** Secondary/dismiss action */
  cancelLabel?:       string;
  onCancel?:          () => void;
  /** Whether tapping the scrim dismisses dialog */
  dismissible?:       boolean;      // default: true
}
```

### 3.8 BottomSheet (FR-007)

```ts
// src/components/BottomSheet/types.ts
export interface BottomSheetProps extends RNMBaseProps {
  visible:        boolean;
  onDismiss:      () => void;
  /** Fixed max-height; undefined = 60% screen height */
  maxHeight?:     number;
  /** Snap point anchors (relative 0–1) */
  snapPoints?:    number[];          // default: [0.5, 1.0]
  /** Whether dragging the sheet past 0 triggers dismiss */
  dismissible?:   boolean;           // default: true
  children:       ReactNode;
}
```

### 3.9 NavigationBar (FR-007)

```ts
// src/components/NavigationBar/types.ts
export interface NavigationBarItem {
  key:              string;
  icon:             ReactNode;
  activeIcon?:      ReactNode;       // MD3 filled vs outlined icon pattern
  label:            string;
  badge?:           number | string; // numeric count or dot when string is empty
}

export interface NavigationBarProps extends RNMBaseProps {
  items:            NavigationBarItem[];
  activeKey:        string;
  onSelect:         (key: string) => void;
  /** Show/hide all item labels; default: true */
  showLabels?:      boolean;
}
```

---

## 4. Adapter Entity

### 4.1 RNMCoreAdapter (FR-009)

```ts
// src/adapters/types.ts
export interface RNMCoreAdapterProps {
  children: ReactNode;
}

/**
 * Wraps @react-native-material/core ThemeProvider as a child of
 * RN-Material ThemeProvider, mapping color tokens to the rnm-core palette shape.
 * No-op when @react-native-material/core is not installed.
 */
export interface RNMCoreAdapterComponent
  extends React.FC<RNMCoreAdapterProps> {}
```

---

## 5. State Transitions

### 5.1 ThemeProvider Mode Switch

```
'system' ──►  OS reports 'dark'  ──►  mode resolves to 'dark'
           └► OS reports 'light' ──►  mode resolves to 'light'
'light'   ──►  always light
'dark'    ──►  always dark

setMode('system') / setMode('light') / setMode('dark')
  └─► triggers generatePalette(seedColor, resolvedMode)
  └─► new Theme object pushed through ThemeContext
  └─► all subscribed useTheme() callers re-render
```

Constraint: `generatePalette` must complete in ≤ 16 ms on a Pixel 4 (SC-003). If
`seedColor` is absent the static baseLight / baseDark token sets are used directly
(no computation path).

### 5.2 Button Press States

```
idle ──► pressed (ripple start, scale to 0.97) ──► released (ripple end, scale back)
     └► long-pressed ──► released
     └► disabled (opacity 0.38, no ripple, no scale)
```

All transitions run on the UI thread via Reanimated worklets (Principle VI).

---

## 6. Validation Rules

| Entity          | Rule                                                                  |
|-----------------|-----------------------------------------------------------------------|
| `ThemeProvider` | Must be present as an ancestor of any RN-Material component; missing → `useTheme` throws with clear error message. |
| `Token deletion`| TypeScript strict mode makes use of deleted token key a compile error.|
| `seedColor`     | Must be a valid 6-digit hex string (`#[0-9A-Fa-f]{6}`); invalid → falls back to default palette, logs warning. |
| `Button.label`  | Non-empty string required; empty string renders accessible but visually blank (not an error). |
| `NavigationBar.items` | 3–5 items per MD3 spec; fewer or more logs a console.warn in dev builds. |
| `BottomSheet.snapPoints` | Values must be in ascending order 0–1; out-of-order array throws in dev, silently sorted in production. |
