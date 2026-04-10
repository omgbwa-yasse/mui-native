# Analyse de l'Écart (Gap Analysis) : mui-native vs Material UI

Cette analyse documente les manquements de la bibliothèque `mui-native` par rapport à l'implémentation de référence **Material UI (MUI Web)** et à la spécification **Material Design 3 (MD3)**.

## 1. Composants Manquants

Bien que `mui-native` couvre une grande partie des composants de base, plusieurs composants clés de MUI/MD3 sont absents ou partiellement implémentés :

### Navigation & Layout
- **Navigation Rail** : Essentiel pour les tablettes/desktop en MD3.
- **Side Sheet** : Manquant (variante du Drawer ou composant distinct).
- **Hidden / NoSsr** : Utilitaires de rendu conditionnel (moins critiques en RN mais utiles pour la parité).
- **SwipeableDrawer** : Version optimisée pour le geste de balayage.

### Feedback & Utilitaires
- **ClickAwayListener** : Crucial pour les menus et popovers (nécessite une implémentation spécifique RN).
- **Backdrop** : Présent mais pourrait être plus flexible pour des usages personnalisés.
- **ScopedCssBaseline** : Utile pour l'isolation des styles.

### Sélection & Saisie
- **ToggleButtonGroup** : Présent mais semble manquer de certaines fonctionnalités de gestion d'état groupé complexe.
- **Rating** : Présent, mais les variantes de précision (half-rating) sont souvent limitées en RN.

---

## 2. Écarts de Fonctionnalités (Feature Gaps)

### Système `sx` (Propriété de Style)
- **Support Limité** : L'implémentation actuelle (`useSx.ts`) ne supporte pas les pseudo-sélecteurs (`:hover`, `:active`) car ils ne sont pas natifs à React Native. Cependant, MUI Web les utilise massivement.
- **Résolution de Jetons** : Moins de clés de jetons (tokens) sont résolues automatiquement par rapport au système `sx` de MUI (ex: `borderRadius` ne semble pas pointer vers `theme.shape` de manière exhaustive).

### API des Composants (Props & Slots)
- **Pattern `slots` Généralisé** : [CORRIGÉ] Le pattern `slots` et `slotProps` a été étendu à la majorité des composants cœurs (`Button`, `FAB`, `Alert`, `AppBar`, `Chip`, `Checkbox`, `Switch`, `Avatar`, `Badge`, `Banner`) pour permettre une personnalisation profonde.
- **Prop `children` supportée** : [CORRIGÉ] Les composants comme `Button` et `Chip` supportent désormais la prop `children` en plus de `label`, permettant une meilleure composition conforme à MUI Web.
- **Variantes** : Certaines variantes MD3 spécifiques restent à affiner pour certains composants secondaires.

---

## 3. Thémage et Design Tokens

- **Système `sx` amélioré** : [AMÉLIORÉ] La prop `sx` résout maintenant les clés de `colorScheme` et les jetons de forme (`borderRadius`).
- **createTheme** : L'implémentation reste simplifiée par rapport à MUI Web (manque `augmentColor`, mixins, etc.).
- **Espacement (Spacing)** : Utilise toujours une table de correspondance statique.

---

## 4. Infrastructure et Tests

- **Couverture de Tests** : Amélioration globale de la stabilité. Les tests existants passent tous après les corrections majeures de types.
- **Qualité du Code (TypeScript)** : [CORRIGÉ] Plus de 50 erreurs de compilation ont été résolues (variables non définies, types implicites 'any').
- **Documentation** : Le README reste à enrichir avec les nouvelles possibilités offertes par les `slots`.

---

## 5. Comparaison avec React Native Paper (RNP)

Une comparaison avec `react-native-paper` (la référence MD3 pour React Native) a été effectuée :

### Convergence
- **Surface / Paper** : Les deux bibliothèques utilisent un système d'élévation MD3 avec des overlays de teinte (tint). `mui-native` propose désormais l'alias `Surface` pour faciliter la transition.
- **ProgressBar** : `mui-native` propose désormais l'alias `ProgressBar` (basé sur `LinearProgress`) pour correspondre à la nomenclature RNP.

### Différences Notables
- **Theming** : RNP utilise un système de thème très imbriqué et spécifique. `mui-native` reste plus proche de la structure plate de MUI Web, ce qui facilite le portage d'applications web.
- **Searchbar** : RNP propose une `Searchbar` très riche. `mui-native` a été améliorée pour supporter les `slots` (Root, Input) et les icônes personnalisables, atteignant une parité fonctionnelle.

---

## 6. Composants de Domaine (Spécifiques)

Les composants comme `WorkerAgentRow` et `HumanizationScoreBar` sont des extensions spécifiques :
- **Cohérence** : Ils ne suivent pas strictement le pattern `slots`/`slotProps` des autres composants "MUI-like".
- **Intégration** : Ils devraient être documentés séparément ou intégrés comme des "MUI X" (composants complexes).

---

## Recommandations Prioritaires

1. **Standardiser le pattern `slots`/`slotProps`** sur tous les composants pour permettre une personnalisation profonde.
2. **Migrer `Button` vers un modèle `children`** pour une meilleure parité avec MUI Web.
3. **Étendre la couverture de tests unitaires** pour les composants fondamentaux.
4. **Enrichir le hook `useSx`** pour supporter plus de jetons du thème.
