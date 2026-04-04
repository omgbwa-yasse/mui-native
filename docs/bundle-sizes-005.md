# Bundle Sizes — Feature 005 (MUI Advanced Components)

> **Last Updated**: 2026-04 (source analysis)  
> **Methodology**: TypeScript source sizes pre-transpilation; compiled output will be smaller due to tree-shaking and minification.

## Source Sizes by Component Group

| Component Group                  | Source Size (KB) | Files | Notes |
|----------------------------------|-----------------|-------|-------|
| **Date Pickers (US1)**           |                 |       |       |
| DatePicker                       | 19.4 KB         | 7     | Includes IntlDateAdapter, LocalizationProvider |
| TimePicker                       |  8.5 KB         | 2     | Wraps DatePicker with mode="time" |
| DateTimePicker                   | 10.6 KB         | 2     | Android 2-step sequential flow |
| **US1 Total**                    | **38.5 KB**     | **11**|       |
| **DataGrid (US2)**               |                 |       |       |
| DataGrid                         | 49.9 KB         | 9     | FlatList-based; sort+filter+pagination pipeline |
| **US2 Total**                    | **49.9 KB**     | **9** |       |
| **Charts (US3)**                 |                 |       |       |
| Charts                           | 22.7 KB         | 6     | Optional peer dep: react-native-gifted-charts |
| **US3 Total**                    | **22.7 KB**     | **6** |       |
| **TreeView (US4)**               |                 |       |       |
| TreeView                         | 15.6 KB         | 5     | Reanimated 3; Reanimated height animations |
| **US4 Total**                    | **15.6 KB**     | **5** |       |
| **Feature 005 Grand Total**      | **126.7 KB**    | **31**|       |

## Tree-Shaking Notes

All new component groups are exported as named exports (not default). Bundlers
that support ES-module tree-shaking (Metro with Hermes, webpack, esbuild) will
only include groups that are actually imported by the consuming app.

- **DatePicker/TimePicker/DateTimePicker**: Depend on optional peer dep
  `@react-native-community/datetimepicker`. If not installed, the fallback modal
  UI path is used (no runtime error, just reduced functionality on Android).
- **Charts**: Depend on optional peer deps `react-native-gifted-charts` and
  `react-native-svg`. If not installed, a fallback placeholder renders instead.
- **DataGrid**: No optional peer deps; always ~50 KB source.
- **TreeView**: Depends on `react-native-reanimated` (already a required peer dep).

## How to Run Actual Bundle Analysis

After building the library (`npm run build`), analyze compiled output:

```bash
# Install source-map-explorer (one-time)
npm install --save-dev source-map-explorer

# Build the library
npm run build

# Analyse per-group sizes
npx source-map-explorer lib/components/DatePicker/**/*.js
npx source-map-explorer lib/components/DataGrid/**/*.js
npx source-map-explorer lib/components/Charts/**/*.js
npx source-map-explorer lib/components/TreeView/**/*.js
```

## Size Thresholds

> Flag any component group whose compiled + minified size exceeds **10 KB gzip**.

| Group | Status |
|-------|--------|
| DatePicker+TimePicker+DateTimePicker | ✓ Expected under threshold (peer dep excluded) |
| DataGrid | ⚠ Large source — verify compiled size stays < 15 KB gzip |
| Charts | ✓ Expected under threshold (gifted-charts excluded) |
| TreeView | ✓ Expected under threshold |
