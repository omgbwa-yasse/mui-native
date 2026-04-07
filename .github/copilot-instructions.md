# Design Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-06

## Active Technologies
- TypeScript 5.x (strict mode � inherited from `001-mui-native-core`) + `react-native` = 0.73, `react-native-reanimated` = 3.x, `react-native-gesture-handler` = 2.x (all peer deps � pre-installed; not bundled) (002-add-missing-components)
- N/A � stateless UI library; no persistence layer (002-add-missing-components)
- TypeScript 5.x — `"strict": true` is mandatory across all source files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled) (003-add-missing-mui-components)
- N/A — stateless UI component library (003-add-missing-mui-components)
- TypeScript 5.x strict — frontend (React Native 0.73) + backend (Node.js 20 LTS) (004-invitation-multiagent)
- PostgreSQL (relational — invitations, guest sessions, subscriptions, agent sessions); Redis (rate-limit counters + TTLs) (004-invitation-multiagent)
- TypeScript 5.x — `"strict": true` mandatory + `react-native` ≥ 0.73, `react-native-vector-icons` ≥ 10.0.0 (new peer dep), `@react-native-vector-icons/common` (createIconSet API) (006-google-fonts-icons)
- N/A — stateless UI library (006-google-fonts-icons)
- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (007-component-showcase-app)
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (007-component-showcase-app)
- TypeScript 5.x — `"strict": true` is mandatory; same constraint as library (007-component-showcase-app)
- N/A — stateless display app; no AsyncStorage, no database (007-component-showcase-app)
- TypeScript 5.x — `"strict": true` + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x, `react-native-syntax-highlighter` (CodeBlock), `react-native-gifted-charts` (Charts examples only — added to `apps/showcase/package.json`) (008-3-examples-all-components)
- N/A — stateless showcase; no persistence layer (008-3-examples-all-components)
- TypeScript 5.x — `"strict": true` mandatory + `react-native` 0.73, `react-native-reanimated` 3.x, `react-native-gesture-handler` 2.x, `react-native-syntax-highlighter` (showcase only), `react-native-gifted-charts` (Charts examples only) (008-3-examples-all-components)
- N/A — stateless showcase app; no persistence layer (008-3-examples-all-components)
- TypeScript 5.x — `"strict": true` mandatory across all source and test files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled by this library) (009-mui-config-sync)
- TypeScript 5.x — `"strict": true` mandatory across all source and test files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x, `react-native-svg` ≥ 15.0.0 — all already declared peer deps; no new peer deps required (010-full-mui-alignment)

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
- 011-apply-missing-elements: Added TypeScript 5.x — `"strict": true` mandatory across all source and test files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled by this library)
- 010-full-mui-alignment: Added TypeScript 5.x — `"strict": true` mandatory across all source and test files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x, `react-native-svg` ≥ 15.0.0 — all already declared peer deps; no new peer deps required
- 009-mui-config-sync: Added TypeScript 5.x — `"strict": true` mandatory across all source and test files + `react-native` ≥ 0.73, `react-native-reanimated` ≥ 3.x, `react-native-gesture-handler` ≥ 2.x (all existing peer deps — not bundled by this library)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
