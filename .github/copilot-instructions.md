# Design Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-03

## Active Technologies
- TypeScript 5.x (strict mode � inherited from `001-mui-native-core`) + `react-native` = 0.73, `react-native-reanimated` = 3.x, `react-native-gesture-handler` = 2.x (all peer deps � pre-installed; not bundled) (002-add-missing-components)
- N/A � stateless UI library; no persistence layer (002-add-missing-components)
- TypeScript 5.x — `"strict": true` is mandatory across all source files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled) (003-add-missing-mui-components)
- N/A — stateless UI component library (003-add-missing-mui-components)

- TypeScript 5.x (strict mode) + `react-native` = 0.73, `react-native-reanimated` = 3.x, `react-native-gesture-handler` = 2.x (all peer deps � not bundled) (001-mui-native-core)

## Project Structure

```text
src/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.x (strict mode): Follow standard conventions

## Recent Changes
- 003-add-missing-mui-components: Added TypeScript 5.x — `"strict": true` is mandatory across all source files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled)
- 002-add-missing-components: Added TypeScript 5.x (strict mode � inherited from `001-mui-native-core`) + `react-native` = 0.73, `react-native-reanimated` = 3.x, `react-native-gesture-handler` = 2.x (all peer deps � pre-installed; not bundled)

- 001-mui-native-core: Added TypeScript 5.x (strict mode) + `react-native` = 0.73, `react-native-reanimated` = 3.x, `react-native-gesture-handler` = 2.x (all peer deps � not bundled)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
