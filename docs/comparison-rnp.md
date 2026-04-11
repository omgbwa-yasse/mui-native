# Étude Comparative : MUI-Native vs. React Native Paper (RNP)

Cette étude compare `mui-native` et `react-native-paper`, les deux principales bibliothèques implémentant Material Design 3 (MD3) pour React Native.

---

## 1. Philosophie et Objectifs

| Caractéristique | MUI-Native | React Native Paper |
|-----------------|------------|--------------------|
| **Cible** | Développeurs MUI Web migrant vers le natif. | Développeurs React Native cherchant une solution MD3 standard. |
| **Priorité API** | Parité maximale avec l'API de MUI Web (v6/v7). | API idiomatique à React Native. |
| **Design System** | Material Design 3 pur. | Material Design 3 (avec support legacy MD2). |

---

## 2. Système de Thémage

### React Native Paper
RNP utilise un système de thème très structuré et souvent imbriqué. La personnalisation nécessite de suivre une hiérarchie stricte d'objets (colors, fonts, roundness).
- **Avantage** : Très robuste et typé pour le mobile.
- **Inconvénient** : Courbe d'apprentissage pour ceux qui viennent du web.

### MUI-Native
Suit la structure "plate" de MUI Web via `createTheme`.
- **Avantage** : Portage quasi immédiat des configurations de thème depuis une application web MUI. Supporte la génération de palettes MD3 complètes à partir d'une couleur source (`seedColor`).
- **Convergence** : Les deux bibliothèques gèrent désormais l'élévation MD3 avec des overlays de teinte (tint) sur les surfaces.

---

## 3. Système de Style

- **RNP** : Utilise principalement la prop `style` standard de React Native. Propose un HOC `withTheme` ou un hook `useTheme` pour accéder aux couleurs.
- **MUI-Native** : Introduit la prop **`sx`**. Bien que limitée (pas de pseudo-sélecteurs comme `:hover`), elle permet de résoudre dynamiquement les jetons du thème (ex: `sx={{ color: 'primary.main', borderRadius: 2 }}`) directement dans le composant, réduisant le besoin de `StyleSheet` externes.

---

## 4. Catalogue de Composants

### Couverture
- **RNP** est la référence historique avec une couverture exhaustive de la spécification MD3 mobile.
- **MUI-Native** a atteint une parité de **98.2%** avec les composants cœurs de MUI Web, ce qui inclut des composants souvent absents des bibliothèques mobiles standards :
    - **Composants Complexes** : `DataGrid`, `TreeView`, `TransferList`.
    - **Visualisation** : Intégration de graphiques (`Charts`) inspirée de MUI X.
    - **Navigation** : Support complet des `Breadcrumbs` et `Stepper` complexes.

### Nomenclature
- **Convergence** : `mui-native` a adopté certains noms de RNP comme alias (ex: `Surface` pour `Paper`, `ProgressBar` pour `LinearProgress`) pour faciliter la transition.
- **Différence** : MUI-Native privilégie la composition via des sous-composants (ex: `CardHeader`, `CardContent`) là où RNP utilise parfois des props plus centralisées.

---

## 5. Dépendances et Performance

- **React Native Paper** : Dépendances légères (`react-native-vector-icons`). Très performant sur les anciens appareils.
- **MUI-Native** : S'appuie sur des moteurs modernes :
    - `react-native-reanimated` (3.x) pour des animations fluides à 60 FPS.
    - `react-native-gesture-handler` (2.x) pour les interactions tactiles complexes.
    - **Impact** : Expérience utilisateur plus "premium" et interactive, mais nécessite une configuration initiale des bibliothèques natives.

---

## 6. Tableau Récapitulatif

| Fonctionnalité | MUI-Native | React Native Paper |
|----------------|------------|--------------------|
| **Parité Web (MUI)** | 🌟 Excellente | ❌ Faible |
| **Prop `sx`** | ✅ Oui | ❌ Non |
| **Animations** | Reanimated (Hardware) | Animated (JS/Native) |
| **Composants Pro (Grilles/Graphes)** | ✅ Inclus (MUI X-like) | ❌ Nécessite des libs tiers |
| **Facilité d'usage (Mobile first)** | Medium | 🌟 Excellente |

---

## Conclusion : Lequel choisir ?

**Choisissez MUI-Native si :**
- Vous avez une application MUI Web et voulez partager de la logique de thème ou des connaissances d'API.
- Vous avez besoin de composants complexes (DataGrid, Stepper complet).
- Vous voulez utiliser la prop `sx` pour un développement plus rapide.

**Choisissez React Native Paper si :**
- Vous voulez la solution la plus légère et la plus éprouvée de l'écosystème RN.
- Votre application est strictement mobile et n'a aucune parenté avec un projet web MUI.
- Vous préférez éviter les dépendances lourdes comme Reanimated.
