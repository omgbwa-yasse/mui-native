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
- **Incohérence des Slots** : MUI utilise un pattern `slots` et `slotProps` de manière systématique. Dans `mui-native`, ce pattern est présent dans `TextField` ou `Card`, mais absent de `Button` ou `FAB`.
- **Prop `children` vs `label`** : Le composant `Button` utilise une prop `label` (string) au lieu de `children`. Cela limite la composition (ex: mettre une icône personnalisée et du texte complexe à l'intérieur).
- **Variantes** : Certaines variantes MD3 ne sont pas totalement implémentées pour chaque composant (ex: variantes de boutons 'tonal', 'elevated' sont là, mais d'autres composants sont plus limités).

---

## 3. Thémage et Design Tokens

- **createTheme** : L'implémentation est simplifiée. Il manque le support pour `augmentColor`, les `breakpoints` personnalisables (bien que présents dans `useSx`, ils ne sont pas facilement modifiables via le thème), et les `mixins`.
- **Espacement (Spacing)** : Utilise une table de correspondance statique au lieu d'une fonction génératrice flexible.
- **Design Tokens** : Bien que MD3 soit la cible, la synchronisation avec les jetons officiels de Material Design pourrait être renforcée (notamment pour les animations et les durées).

---

## 4. Infrastructure et Tests

- **Couverture de Tests** : De nombreux composants de base (`Button`, `AppBar`, `Alert`) n'ont pas de tests unitaires dans `tests/unit/components`.
- **Documentation** : Le README est succinct. Il manque une documentation détaillée par composant avec la liste des props (API Reference) similaire à ce que propose MUI.
- **Accessibilité (A11y)** : Bien que des props d'accessibilité soient présentes, une validation systématique (ex: via `jest-axe` ou équivalent RN) manque pour garantir la conformité MD3.
- **Qualité du Code (TypeScript)** : Le projet présente actuellement de nombreuses erreurs de compilation TypeScript (ex: variables `bg`, `fg`, `color` utilisées mais non définies dans plusieurs composants comme `Button`, `ActivityIndicator`, `Badge`). Cela indique un manque de rigueur dans la gestion des props et des types.

---

## 5. Composants de Domaine (Spécifiques)

Les composants comme `WorkerAgentRow` et `HumanizationScoreBar` sont des extensions spécifiques :
- **Cohérence** : Ils ne suivent pas strictement le pattern `slots`/`slotProps` des autres composants "MUI-like".
- **Intégration** : Ils devraient être documentés séparément ou intégrés comme des "MUI X" (composants complexes).

---

## Recommandations Prioritaires

1. **Standardiser le pattern `slots`/`slotProps`** sur tous les composants pour permettre une personnalisation profonde.
2. **Migrer `Button` vers un modèle `children`** pour une meilleure parité avec MUI Web.
3. **Étendre la couverture de tests unitaires** pour les composants fondamentaux.
4. **Enrichir le hook `useSx`** pour supporter plus de jetons du thème.
