# 🎨 React Native Material Design Framework — Master Prompt

> **Objectif** : Répliquer fidèlement le design system Material UI (MUI v5/v6) dans React Native.
> Chaque composant, token, et comportement doit être une copie stricte du langage visuel Material Design 3 (M3).

---

## 🧠 IDENTITÉ DU FRAMEWORK

```
Nom         : RN-Material (ou ton alias projet)
Base        : Material Design 3 (Google) — https://m3.material.io
Référence   : MUI v6 (React) — https://mui.com
Cible       : React Native (iOS + Android)
Style layer : StyleSheet + react-native-reanimated + react-native-gesture-handler
Thème       : Dynamic Color System (light + dark)
```

---

## 🎨 1. DESIGN TOKENS — SYSTÈME DE COULEURS

### Palette primaire (copie exacte MUI defaults)
```js
// tokens/colors.js
export const palette = {
  primary: {
    main:        '#1976D2',   // MUI blue[700]
    light:       '#42A5F5',   // MUI blue[400]
    dark:        '#1565C0',   // MUI blue[800]
    contrastText:'#FFFFFF',
  },
  secondary: {
    main:        '#9C27B0',
    light:       '#BA68C8',
    dark:        '#7B1FA2',
    contrastText:'#FFFFFF',
  },
  error: {
    main:        '#D32F2F',
    light:       '#EF5350',
    dark:        '#C62828',
    contrastText:'#FFFFFF',
  },
  warning: {
    main:        '#ED6C02',
    light:       '#FF9800',
    dark:        '#E65100',
    contrastText:'#FFFFFF',
  },
  info: {
    main:        '#0288D1',
    light:       '#03A9F4',
    dark:        '#01579B',
    contrastText:'#FFFFFF',
  },
  success: {
    main:        '#2E7D32',
    light:       '#4CAF50',
    dark:        '#1B5E20',
    contrastText:'#FFFFFF',
  },
  grey: {
    50:  '#FAFAFA', 100: '#F5F5F5', 200: '#EEEEEE',
    300: '#E0E0E0', 400: '#BDBDBD', 500: '#9E9E9E',
    600: '#757575', 700: '#616161', 800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#FFFFFF',
    paper:   '#F5F5F5',
  },
  text: {
    primary:   'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled:  'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  action: {
    active:           'rgba(0, 0, 0, 0.54)',
    hover:            'rgba(0, 0, 0, 0.04)',
    selected:         'rgba(0, 0, 0, 0.08)',
    disabled:         'rgba(0, 0, 0, 0.26)',
    disabledBackground:'rgba(0, 0, 0, 0.12)',
    focus:            'rgba(0, 0, 0, 0.12)',
  },
};
```

---

## 📐 2. TYPOGRAPHIE — COPIE STRICTE MUI

```js
// tokens/typography.js
// Police : Roboto (identique MUI)
// import { useFonts } from 'expo-font' → 'Roboto_400Regular', 'Roboto_500Medium', 'Roboto_700Bold'

export const typography = {
  fontFamily:       'Roboto',

  h1: { fontSize: 96, fontWeight: '300', letterSpacing: -1.5, lineHeight: 112 },
  h2: { fontSize: 60, fontWeight: '300', letterSpacing: -0.5, lineHeight: 72  },
  h3: { fontSize: 48, fontWeight: '400', letterSpacing: 0,    lineHeight: 56  },
  h4: { fontSize: 34, fontWeight: '400', letterSpacing: 0.25, lineHeight: 42  },
  h5: { fontSize: 24, fontWeight: '400', letterSpacing: 0,    lineHeight: 32  },
  h6: { fontSize: 20, fontWeight: '500', letterSpacing: 0.15, lineHeight: 28  },

  subtitle1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.15, lineHeight: 28 },
  subtitle2: { fontSize: 14, fontWeight: '500', letterSpacing: 0.1,  lineHeight: 22 },

  body1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.5,  lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: '400', letterSpacing: 0.25, lineHeight: 20 },

  button:    { fontSize: 14, fontWeight: '500', letterSpacing: 1.25, lineHeight: 16, textTransform: 'uppercase' },
  caption:   { fontSize: 12, fontWeight: '400', letterSpacing: 0.4,  lineHeight: 20 },
  overline:  { fontSize: 10, fontWeight: '400', letterSpacing: 1.5,  lineHeight: 16, textTransform: 'uppercase' },
};
```

---

## 📏 3. SPACING & SHAPE — SYSTÈME 8PT

```js
// tokens/spacing.js
// MUI utilise un système de 8pt par défaut : spacing(n) = n * 8px
export const spacing = (n) => n * 8;

// Raccourcis fréquents
export const space = {
  xs:  4,   // 0.5 * 8
  sm:  8,   // 1 * 8
  md:  16,  // 2 * 8
  lg:  24,  // 3 * 8
  xl:  32,  // 4 * 8
  xxl: 48,  // 6 * 8
};

// tokens/shape.js
export const shape = {
  borderRadius: 4,       // MUI default = 4
  borderRadiusMd: 8,
  borderRadiusLg: 12,
  borderRadiusFull: 9999,
};
```

---

## 🌑 4. ÉLÉVATION & OMBRES (Shadow System)

```js
// tokens/shadows.js
// MUI a 25 niveaux d'élévation (0-24). Voici les principaux :
export const shadows = {
  0:  'none',
  1:  { shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.20, shadowRadius:1,   elevation:1 },
  2:  { shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.22, shadowRadius:2.2, elevation:2 },
  3:  { shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.23, shadowRadius:2.6, elevation:3 },
  4:  { shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.25, shadowRadius:3.8, elevation:4 },
  6:  { shadowColor:'#000', shadowOffset:{width:0,height:3}, shadowOpacity:0.27, shadowRadius:4.6, elevation:6 },
  8:  { shadowColor:'#000', shadowOffset:{width:0,height:4}, shadowOpacity:0.30, shadowRadius:4.6, elevation:8 },
  12: { shadowColor:'#000', shadowOffset:{width:0,height:6}, shadowOpacity:0.37, shadowRadius:7.5, elevation:12 },
  16: { shadowColor:'#000', shadowOffset:{width:0,height:8}, shadowOpacity:0.44, shadowRadius:10,  elevation:16 },
  24: { shadowColor:'#000', shadowOffset:{width:0,height:12},shadowOpacity:0.58, shadowRadius:16,  elevation:24 },
};
```

---

## ⚡ 5. COMPOSANTS — SPECS PRÉCISES

### 5.1 Button
```
Variants    : contained | outlined | text
Heights     : 36dp (dense) | 42dp (standard)
Padding H   : 16dp (text/outlined) | 16dp (contained)
Border      : 1px outlined → palette.primary.main
Radius      : 4dp
Label       : typography.button (uppercase, 500, 14sp, tracking 1.25)
Elevation   : contained → 2dp (rest), 8dp (pressed)
Ripple      : palette.primary.main avec opacity 0.12

Disabled    : opacity 0.38 (texte), background rgba(0,0,0,0.12)
Loading     : CircularProgress size=20 centré
Icon        : 18dp, gap 8dp avant le label
```

### 5.2 TextField
```
Variants    : filled | outlined | standard
Height      : 56dp
Label       : flottant — body1 (au repos), caption (focus/filled)
Padding H   : 12dp
Border focus: 2px → primary.main
Helper text : caption, 12sp, margin-top 4dp
Error state : color = error.main partout
Adornments  : 24dp icônes, padding 12dp
Dense       : height 48dp
```

### 5.3 Card
```
Radius      : 4dp
Elevation   : 1dp (rest) → 8dp (hover/press)
Padding     : 16dp (CardContent)
Actions     : padding 8dp, gap entre boutons 8dp
Media       : ratio 16:9 par défaut
Header      : avatar 40dp, title subtitle2, subheader body2
```

### 5.4 AppBar / TopAppBar
```
Height      : 56dp (mobile) | 64dp (desktop)
Elevation   : 4dp
Background  : primary.main
Color texte : primary.contrastText
Titre       : h6 (20sp, 500)
Leading icon: 24dp, padding 12dp
Actions     : 24dp, gap 8dp, trailing padding 4dp
```

### 5.5 Chip
```
Height      : 32dp
Radius      : 16dp (pill)
Padding H   : 12dp | 4dp si avatar/icon
Label       : body2 (14sp)
Variants    : filled | outlined
States      : default | clickable | deletable | selected
Delete icon : 18dp, margin-left 4dp
```

### 5.6 Avatar
```
Sizes       : 40dp (standard) | 56dp (large) | 32dp (small)
Radius      : 50% (circle)
Font        : h5 pour initiales
Couleurs    : orange[500] | purple[500] | green[500] (rotation auto)
```

### 5.7 Dialog
```
Radius      : 4dp
Max-width   : 560dp | 80vw sur mobile
Padding     : 24dp (title+content) | 8dp (actions)
Title       : h6 (20sp, 500)
Content     : body1
Actions     : text buttons, alignés à droite, gap 8dp
Overlay     : rgba(0,0,0,0.50)
Animation   : fade + scale 0.9→1.0, 225ms ease-out
```

### 5.8 Snackbar
```
Position    : bottom-center | bottom-left
Min-width   : 288dp | Max-width : 568dp
Height      : 48dp | 68dp (multiline)
Radius      : 4dp
Background  : grey[800] (dark surface)
Texte       : body2, blanc
Action      : text button, primary.light
Auto-hide   : 4000ms (default) | 6000ms (long)
Animation   : slide-up + fade, 250ms
```

### 5.9 List / ListItem
```
Height      : 48dp (single) | 64dp (two-line) | 88dp (three-line)
Padding H   : 16dp
Leading     : avatar 40dp | icon 24dp, margin-right 16dp
Divider     : 1px, palette.divider, inset 72dp si leading
Ripple      : feedback au press
```

### 5.10 Switch
```
Track       : 34x14dp, radius 7dp
Thumb       : 20dp circle, elevation 2
Couleur ON  : primary.main (track opacity 0.5)
Couleur OFF : grey[400] (track), grey[50] (thumb)
```

---

## 🌊 6. ANIMATIONS & TRANSITIONS

```js
// tokens/transitions.js
// Copie exacte des durées et easings MUI

export const transitions = {
  duration: {
    shortest:        150,
    shorter:         200,
    short:           250,
    standard:        300,
    complex:         375,
    enteringScreen:  225,
    leavingScreen:   195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Standard — éléments qui bougent
    easeOut:   'cubic-bezier(0.0, 0, 0.2, 1)',  // Decelerate — entrée d'éléments
    easeIn:    'cubic-bezier(0.4, 0, 1, 1)',    // Accelerate — sortie d'éléments
    sharp:     'cubic-bezier(0.4, 0, 0.6, 1)', // Éléments qui peuvent rouvrir
  },
};

// En React Native avec Reanimated :
// withTiming(value, { duration: 300, easing: Easing.bezier(0.4, 0, 0.2, 1) })
```

---

## 🔘 7. RIPPLE EFFECT (Feedback tactile)

```js
// Remplace TouchableHighlight / TouchableOpacity par :
import { Pressable } from 'react-native';
// ou react-native-gesture-handler + react-native-reanimated pour ripple natif Android

// Specs ripple :
// - Color : theme.palette.action.active (rgba(0,0,0,0.54)) ou primary si surface colorée
// - Opacity ripple : 0.12
// - Radius : illimité (spread total) pour contained, borné pour icon buttons
// - Duration : 550ms (MUI default)
```

---

## 🌗 8. DARK MODE — THÈME SOMBRE

```js
// tokens/darkPalette.js
export const darkPalette = {
  background: {
    default: '#121212',
    paper:   '#1E1E1E',   // elevation 1dp
  },
  text: {
    primary:   'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.60)',
    disabled:  'rgba(255, 255, 255, 0.38)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  action: {
    active:    'rgba(255, 255, 255, 0.54)',
    hover:     'rgba(255, 255, 255, 0.04)',
    selected:  'rgba(255, 255, 255, 0.08)',
    disabled:  'rgba(255, 255, 255, 0.26)',
  },
  // Overlay d'élévation en dark mode (M3) :
  // elevation 1dp → rgba(255,255,255, 0.05)
  // elevation 8dp → rgba(255,255,255, 0.12)
  // elevation 24dp → rgba(255,255,255, 0.16)
};
```

---

## 🏗️ 9. ARCHITECTURE DU PROJET

```
/src
  /theme
    index.js          ← ThemeProvider central
    palette.js        ← couleurs light + dark
    typography.js     ← scale typographique
    spacing.js        ← système 8pt
    shadows.js        ← 25 niveaux
    transitions.js    ← durées + easings
    shape.js          ← border radius

  /components
    /Button
      Button.jsx
      Button.styles.js
      Button.test.js
    /TextField
    /Card
    /AppBar
    /Chip
    /Dialog
    /Snackbar
    /List
    /Avatar
    /Switch
    /Divider
    /Badge
    /Tooltip
    /CircularProgress
    /LinearProgress
    /Skeleton
    /Fab             ← Floating Action Button

  /hooks
    useTheme.js      ← accès au thème courant
    useMediaQuery.js ← breakpoints responsive

  /utils
    createTheme.js   ← override du thème
    alpha.js         ← rgba helpers
```

---

## 📋 10. RÈGLES ABSOLUES DU FRAMEWORK

```
✅ TOUJOURS utiliser les tokens du thème — jamais de valeurs hardcodées
✅ TOUJOURS respecter les hauteurs minimales MUI (touch target 48dp minimum)
✅ TOUJOURS implémenter les états : default | hover | focus | active | disabled
✅ TOUJOURS supporter light ET dark mode via ThemeProvider
✅ TOUJOURS utiliser Roboto comme police principale
✅ TOUJOURS aligner sur la grille 8pt

❌ JAMAIS de couleurs hors palette (sauf override explicite via createTheme)
❌ JAMAIS de border-radius hors des tokens shape
❌ JAMAIS d'ombres inventées — utiliser uniquement les 25 niveaux définis
❌ JAMAIS de fontSize hors de la scale typographique
❌ JAMAIS de spacing hors du système 8pt
```

---

## 🚀 11. PROMPT D'UTILISATION — COMMENT GÉNÉRER UN COMPOSANT

Utilise ce template pour prompter la création de chaque composant :

```
Crée le composant [NOM_COMPOSANT] pour React Native en respectant STRICTEMENT
les specs Material UI suivantes :

DESIGN TOKENS (à importer depuis /theme) :
- Couleurs : palette.[couleur]
- Typographie : typography.[variant]
- Espacement : spacing(n) = n * 8dp
- Ombres : shadows.[niveau]
- Shape : shape.borderRadius = 4dp

SPECS VISUELLES EXACTES :
[coller les specs du composant depuis la section 5 ci-dessus]

ÉTATS À IMPLÉMENTER :
- default / hover (opacity overlay 0.04) / focus (0.12) / active (0.24) / disabled (0.38)

ANIMATIONS :
- Utiliser react-native-reanimated
- Duration : transitions.duration.short (250ms)
- Easing : transitions.easing.easeInOut

DARK MODE :
- Conditionnel via useTheme() hook

ACCESSIBILITÉ :
- accessibilityRole approprié
- accessibilityLabel
- accessibilityState (disabled, selected, checked)
- Touch target minimum 48x48dp

OUTPUT :
- Fichier JSX + StyleSheet séparé
- Props identiques à MUI (variant, color, size, disabled, onClick→onPress)
- TypeScript PropTypes documentés
```

---

## 📦 12. DÉPENDANCES RECOMMANDÉES

```json
{
  "dependencies": {
    "react-native-reanimated":        "^3.x",
    "react-native-gesture-handler":   "^2.x",
    "@expo-google-fonts/roboto":      "latest",
    "react-native-vector-icons":      "^10.x",
    "@react-native-community/slider": "latest"
  }
}
```

---

*Framework basé sur Material Design 3 — https://m3.material.io*
*Référence implémentation web : MUI v6 — https://mui.com*