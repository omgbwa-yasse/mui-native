# MUI-Native → Material MUI — Plan d'alignement

> **Date**: 2026-04-06  
> **Baseline**: 78 composants implémentés · ~85% couverture (hors web-only)  
> **Objectif**: Atteindre ≥95% de parité API avec `@mui/material` tout en restant MD3-first et React Native-safe  
> **Convention de priorité**: P1 = bloquant pour l'adoption · P2 = fort impact migration · P3 = qualité / completude

---

## Sommaire des écarts identifiés

| Catégorie | Nb d'items | Specs concernées |
|-----------|-----------|-----------------|
| Props universelles manquantes | 4 | Tous les composants — livrable via 009 |
| Composants entiers manquants | 5 | 010-progress, 011-transitions |
| API divergentes à aligner | 14 | Multiples |
| Sous-composants composables absents | 8 familles | 012-composable-subcomponents |
| Renommages / aliases à ajouter | 11 | Tous les composants |
| Web-only (à documenter, non implémentable) | 6 | — |

---

## Axe 1 — Props universelles manquantes (feature 009 — en cours)

> Ces 4 props s'appliquent à la quasi-totalité des 78 composants. La feature `009-mui-config-sync` les livre.

| Prop | Statut | Action |
|------|--------|--------|
| `size?: 'small' \| 'medium' \| 'large'` | 🟡 En cours (009) | Compléter toutes les implémentations composants |
| `color?: 'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info'` | 🟡 En cours (009) | Idem |
| `sx?: SxProps` | 🟡 En cours (009) | `useSx` hook — espacements, breakpoints, aliases couleur |
| `slots` / `slotProps` | 🟡 En cours (009) | 15 composants composites ciblés |

**Critère de fermeture** : tous les tests T028–T045 passent ; T060 `touchTarget >= 48` passe.

---

## Axe 2 — Composants entiers manquants

### A2-1 · CircularProgress `P1`

**Écart** : `ActivityIndicator` couvre uniquement le spinner indéterminé natif. MUI expose `CircularProgress` avec `variant: indeterminate | determinate` et `value: 0–100`.

**Actions** :
- [ ] Créer `src/components/CircularProgress/CircularProgress.tsx`
  - Props : `variant?: 'indeterminate' | 'determinate'`, `value?: number` (0–100), `size?: SizeProp`, `color?: ColorProp`, `thickness?: number`
  - Impl : `Animated` arc via `react-native-reanimated` ; indéterminé = rotation continue
  - Garder `ActivityIndicator` comme alias RN-natif (wraps la platform native spinner)
- [ ] Ajouter export dans `src/index.ts`
- [ ] Tests : `tests/unit/components/CircularProgress.test.tsx`
- [ ] Snapshot showcase (3 exemples : indéterminé, déterminé 60%, avec label)

### A2-2 · LinearProgress `P1`

**Écart** : Absent de mui-native. MUI `LinearProgress` couvre `indeterminate | determinate | buffer | query`.

**Actions** :
- [ ] Créer `src/components/LinearProgress/LinearProgress.tsx`
  - Props : `variant?: 'indeterminate' | 'determinate' | 'buffer'`, `value?: number`, `valueBuffer?: number`, `color?: ColorProp`
  - Impl : `Animated.View` avec `useSharedValue` pour la barre + la barre buffer
  - RN-DEVIATION : pas de `query` (animation rtl — peu pertinent sans CSS)
- [ ] Ajouter export dans `src/index.ts`
- [ ] Tests + showcase

### A2-3 · Transitions exportées `P2`

**Écart** : `Fade`, `Grow`, `Slide`, `Zoom`, `Collapse` existent dans `src/components/` mais ne sont pas **exportés** depuis `src/index.ts` comme composants publics utilisables directement (MUI les exporte tous).

**Actions** :
- [ ] Vérifier les exports actuels : `grep -r "Fade\|Grow\|Slide\|Zoom\|Collapse" src/index.ts`
- [ ] Exporter publiquement chaque composant transition depuis `src/index.ts`
- [ ] Documenter les props : `in`, `timeout`, `onEnter`, `onEntered`, `onExit`, `onExited`, `unmountOnExit`, `mountOnEnter`
- [ ] Tests unitaires pour chaque transition

### A2-4 · Masonry `P2`

**Écart** : `Masonry` est dans `src/components/Masonry/` (Batch G tasks) mais absent du comparatif d'origine (noté ❌). Vérifier existence et état de complétion.

**Actions** :
- [ ] Inspecter `src/components/Masonry/` — complet ou stub ?
- [ ] Si stub : implémenter à partir de `FlatList` multi-colonnes avec hauteurs inégales
  - Props MUI : `columns`, `spacing`, `defaultHeight`, `sequential`
- [ ] Exporter depuis `src/index.ts`
- [ ] Tests + showcase

### A2-5 · AvatarGroup `P2`

**Écart** : Absent de mui-native. MUI expose un composant d'empilement d'avatars avec `max`.

**Actions** :
- [ ] Créer `src/components/Avatar/AvatarGroup.tsx` (co-localisé dans le répertoire Avatar)
  - Props : `max?: number`, `total?: number`, `spacing?: 'small' | 'medium' | number`
  - Impl : `View` avec `zIndex` décroissant et `marginLeft` négatif par enfant ; badge "+N" si overflow
- [ ] Export depuis `src/index.ts`
- [ ] Tests + showcase

---

## Axe 3 — API divergentes à aligner

### A3-1 · TextField `P1`

| Gap | Action |
|-----|--------|
| `supportingText` → `helperText` | Ajouter `helperText` comme alias de `supportingText` (déprécier `supportingText` dans JSDoc) |
| `error: string` → `error: boolean` | Ajouter surcharge `error?: boolean` ; si `boolean` → afficher `helperText` en rouge |
| Pas de `multiline` | Ajouter `multiline?: boolean`, `rows?: number`, `minRows?: number`, `maxRows?: number` — passe à `TextInput multiline` |
| Pas de `standard` variant | Ajouter `variant="standard"` (underline only) — RN-specific adaptation |
| Pas de `required` | Ajouter `required?: boolean` (astérisque dans le label) |
| Pas de `fullWidth` | Ajouter `fullWidth?: boolean` (= `width: '100%'`) |
| `InputAdornment` absent | Remplacer `leadingIcon`/`trailingIcon` par `startAdornment`/`endAdornment` (aliases) |

### A3-2 · Checkbox `P2`

| Gap | Action |
|-----|--------|
| `status: 'checked'` | Ajouter `checked?: boolean` + `indeterminate?: boolean` comme aliases de `status` |
| `onChange` absent | Ajouter `onChange?: (event: { target: { checked: boolean } }) => void` comme alias de `onPress` |

### A3-3 · Dialog `P2`

| Gap | Action |
|-----|--------|
| `visible` → `open` | Ajouter `open` comme alias de `visible` |
| `maxWidth` absent | Ajouter `maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false` |
| `fullWidth` absent | Ajouter `fullWidth?: boolean` |
| `fullScreen` absent | Ajouter `fullScreen?: boolean` |

### A3-4 · Snackbar `P2`

| Gap | Action |
|-----|--------|
| Pas de `open` contrôlé | Ajouter `open?: boolean` + `onClose` sur `<Snackbar>` pour mode direct (compatible MUI) en parallèle du système `SnackbarHost` |
| `anchorOrigin` absent | Ajouter `anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }` |
| `message` prop | Ajouter `message?: string` (raccourci sans children) |

### A3-5 · Avatar `P2`

| Gap | Action |
|-----|--------|
| `source` vs `src` | Ajouter `src?: string` comme alias de `source` pour les URI simples |
| `variant` absent | Ajouter `variant?: 'circular' | 'rounded' | 'square'` (remplace `borderRadius` explicite) |

### A3-6 · Badge `P2`

| Gap | Action |
|-----|--------|
| `content` → `badgeContent` | Ajouter `badgeContent` comme alias de `content` |
| `visible: boolean` inversé | Ajouter `invisible?: boolean` comme alias de `!visible` |
| Pas de `variant="dot"` | Ajouter `variant?: 'standard' | 'dot'` |

### A3-7 · Menu / MenuItem `P3`

| Gap | Action |
|-----|--------|
| `visible` → `open` | Ajouter `open` comme alias de `visible` |
| `onDismiss` → `onClose` | Ajouter `onClose` comme alias de `onDismiss` |
| `anchorOrigin` absent | Ajouter `anchorOrigin` + `transformOrigin` pour positionnement fin |

### A3-8 · Tabs `P3`

| Gap | Action |
|-----|--------|
| `orientation` absent | Ajouter `orientation?: 'horizontal' | 'vertical'` |
| `centered` absent | Ajouter `centered?: boolean` |
| `scrollButtons` | Ajouter `scrollButtons?: 'auto' | true | false` |

### A3-9 · Drawer `P3`

| Gap | Action |
|-----|--------|
| `anchor` top/bottom absent | Ajouter `anchor='top'` et `anchor='bottom'` (slide from top/bottom via `Animated`) |

### A3-10 · Accordion `P3`

| Gap | Action |
|-----|--------|
| `onChange` signature | Uniformiser : `onChange?: (event: null, expanded: boolean) => void` (compatible MUI) |
| `disableGutters` | Ajouter `disableGutters?: boolean` |
| `square` | Ajouter `square?: boolean` |

### A3-11 · Slider `P3`

| Gap | Action |
|-----|--------|
| Range slider absent | Ajouter `value: [number, number]` pour mode range (2 thumbs) |
| `orientation` absent | Ajouter `orientation?: 'horizontal' | 'vertical'` |
| `valueLabelDisplay` absent | Ajouter `valueLabelDisplay?: 'auto' | 'on' | 'off'` |

### A3-12 · AppBar `P3`

| Gap | Action |
|-----|--------|
| `position` absent | Documenter `position` comme RN-DEVIATION (layout fixe/sticky géré par navigation native) ; ajouter `elevation?: number` |
| `color` absent | Ajouter `color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent'` |

### A3-13 · Tooltip `P3`

| Gap | Action |
|-----|--------|
| `arrow` absent | Ajouter `arrow?: boolean` (triangle SVG pointant vers l'enfant) |
| `open` contrôlé absent | Ajouter `open?: boolean` + `onOpen` + `onClose` |
| Placements limités | Étendre à 6 placements RN-safe : `top | top-start | top-end | bottom | bottom-start | bottom-end` |

### A3-14 · Pagination `P3`

| Gap | Action |
|-----|--------|
| `color` absent | Ajouter `color?: 'primary' | 'secondary' | 'standard'` |
| `variant` absent | Ajouter `variant?: 'text' | 'outlined'` |
| `shape` absent | Ajouter `shape?: 'circular' | 'rounded'` |
| `renderItem` absent | Ajouter `renderItem?: (item: PaginationItemProps) => ReactNode` |

---

## Axe 4 — Sous-composants composables manquants

> MUI adopte un pattern de composition via des sous-composants nommés. mui-native est monolithique. Cet axe ajoute les sous-composants sans casser les APIs monolithiques existantes.

### A4-1 · Card sub-components `P2`

- [ ] `CardHeader` — `title`, `subheader`, `avatar`, `action`
- [ ] `CardMedia` — `component`, `image`, `height`
- [ ] `CardContent` — wrapper avec padding standard
- [ ] `CardActions` — `disableSpacing`, aligne les boutons en bas
- [ ] `CardActionArea` — zone pressable couvrant tout le card

### A4-2 · Dialog sub-components `P2`

- [ ] `DialogTitle` — titre avec bouton close optionnel
- [ ] `DialogContent` — zone scrollable avec `dividers` optionnel
- [ ] `DialogContentText` — texte secondaire dans le contenu
- [ ] `DialogActions` — rangée de boutons en bas

### A4-3 · Accordion sub-components `P3`

- [ ] `AccordionSummary` — `expandIcon`, gestion du focus
- [ ] `AccordionDetails` — zone de contenu
- [ ] `AccordionActions` — actions dans l'accordéon

### A4-4 · Table sub-components `P3`

- [ ] `TableContainer` — wrapper avec scroll horizontal
- [ ] `TableHead` / `TableBody` / `TableFooter`
- [ ] `TableRow` — `selected`, `hover`
- [ ] `TableCell` — `align`, `padding`, `sortDirection`
- [ ] `TableSortLabel` — header cliquable avec icône de tri
- [ ] `TablePagination` — pagination intégrée dans le footer

### A4-5 · Input sub-components (FormControl family) `P3`

- [ ] `FormControl` — wrapper avec contexte `error`, `disabled`, `required`
- [ ] `InputLabel` — label flottant
- [ ] `FormHelperText` — message d'aide/erreur standalone
- [ ] `InputAdornment` — composant pour les icônes/textes en préfixe/suffixe

### A4-6 · List composable `P3`

MUI expose : `List`, `ListSubheader`, `ListItem`, `ListItemAvatar`, `ListItemButton`, `ListItemIcon`, `ListItemSecondaryAction`, `ListItemText`

- [ ] Vérifier les exports actuels de `src/components/List/`
- [ ] Aligner les noms d'export sur la convention MUI

### A4-7 · AppBar / Toolbar `P3`

- [ ] Ajouter `Toolbar` comme sous-composant de `AppBar` pour accepter des enfants arbitraires (compatibilité MUI full-flexibility)

### A4-8 · Breadcrumbs `P3`

- [ ] Vérifier `separator` prop, `maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse` (MUI les expose)
- [ ] Ajouter si manquants

---

## Axe 5 — Renommages / aliases de props

> Ajouter des aliases de props MUI sur les composants existants sans supprimer les props natives actuelles. Utilise le pattern `prop ?? alias`.

| Composant | Prop mui-native actuelle | Alias MUI à ajouter | Notes |
|-----------|------------------------|---------------------|-------|
| `Modal` | `visible` | `open` | Deprecate `visible` à terme |
| `Modal` | `onDismiss` | `onClose` | |
| `Menu` | `visible` | `open` | |
| `Menu` | `onDismiss` | `onClose` | |
| `Dialog` | `visible` | `open` | |
| `Switch` | `value` | `checked` | |
| `Switch` | `onValueChange` | `onChange` | Wrapper `(e) => onValueChange(e.target.checked)` |
| `Rating` | `onValueChange` | `onChange` | |
| `Slider` | `onValueChange` | `onChange` | |
| `Badge` | `content` | `badgeContent` | |
| `Badge` | `visible` | `invisible` inversé | |

**Approche d'implémentation** — pattern recommandé dans le composant :
```tsx
// Compat MUI alias
const resolvedOpen = open ?? visible ?? false;
const resolvedOnClose = onClose ?? onDismiss;
```

---

## Axe 6 — Documentation des déviations RN (RN-DEVIATION)

> Ces features MUI n'ont pas d'équivalent React Native. Documenter explicitement pour éviter toute confusion lors d'une migration MUI → mui-native.

| Feature MUI | Raison d'absence | Documentation à ajouter |
|-------------|-----------------|------------------------|
| `href` sur Button/Link | Pas de `<a>` en RN | `// RN-DEVIATION: use onPress + Linking.openURL()` |
| `position` sur AppBar (`fixed`/`sticky`) | Le layout est géré par le navigateur | `// RN-DEVIATION: use React Navigation header config` |
| `useMediaQuery` | `window.matchMedia` absent | Pointer vers `useWindowDimensions` + `useDimensions` hook |
| `ClickAwayListener` | Pas de click-outside en RN | `// RN-DEVIATION: use Modal onDismiss or Pressable` |
| `CssBaseline` | Pas de CSS en RN | `// RN-DEVIATION: use ThemeProvider reset via theme tokens` |
| `TextareaAutosize` | Géré par `TextInput multiline` | `// RN-DEVIATION: set multiline={true} on TextField` |
| `sx={{ display: 'grid' }}` | RN ne supporte pas CSS Grid | `// RN-DEVIATION: use Grid component` |
| `component` prop | Pas de semantic HTML en RN | `// RN-DEVIATION: use accessibilityRole` |

---

## Axe 7 — Text (Typography) : table de mapping MD2 → MD3

> Ajouter un helper `typographyVariantMap` et un alias `variant` qui accepte les noms MUI MD2.

- [ ] Créer `src/tokens/typographyVariantMap.ts` :
```ts
export const MUI_TO_MD3_VARIANT: Record<string, TypeScaleVariant> = {
  h1: 'displayLarge',
  h2: 'displayMedium',
  h3: 'headlineLarge',
  h4: 'headlineMedium',
  h5: 'titleLarge',
  h6: 'titleMedium',
  subtitle1: 'titleSmall',
  subtitle2: 'labelLarge',
  body1: 'bodyLarge',
  body2: 'bodyMedium',
  caption: 'labelSmall',
  overline: 'labelMedium',
  button: 'labelLarge',
};
```
- [ ] Mettre à jour `Text` pour accepter les deux vocabulaires :
  ```tsx
  const resolvedVariant = MUI_TO_MD3_VARIANT[variant] ?? variant;
  ```
- [ ] Ajouter `noWrap?: boolean`, `gutterBottom?: boolean` sur `Text`
- [ ] Exporter `typographyVariantMap` pour les utilisateurs qui migrent

---

## Planning proposé

| Phase | Features | Composants ciblés | Priorité |
|-------|----------|------------------|---------|
| **009** (en cours) | `size`, `color`, `sx`, `slots` | 78 composants | P1 |
| **010** | CircularProgress + LinearProgress | 2 nouveaux | P1 |
| **011** | Transitions publiques + AvatarGroup + Masonry (si stub) | 5 | P2 |
| **012** | Aliases props universels (open/onClose/checked/onChange) | 11 composants | P2 |
| **013** | Card + Dialog sub-components + FormControl family | 12 sous-composants | P2 |
| **014** | TextField multiline + standard variant + helperText alias | TextField | P2 |
| **015** | Typography MD2→MD3 map + noWrap + gutterBottom | Text | P2 |
| **016** | Table sub-components + DataTable composable | Table | P3 |
| **017** | Accordion/AppBar/Tabs/Drawer/Tooltip améliorations | 5 | P3 |
| **018** | Slider range + Rating a11y + Badge dot + Pagination renderItem | 4 | P3 |
| **019** | RN-DEVIATION docs générées dans Storybook/showcase | — | P3 |

---

## Métriques cibles à l'issue de ce plan

| Métrique | Aujourd'hui | Cible |
|----------|------------|-------|
| Composants couverts (excl. web-only) | ~85% | **≥ 95%** |
| Props MUI avec alias compatible | ~30% | **≥ 90%** |
| Sous-composants composables | 0% | **~70%** |
| RN-DEVIATION documentées | ~0 | **100%** |
| Tests de non-régression API | partiel | **tous composants** |
