# Quickstart: 3 Usage Examples for All Components

**Feature Branch**: `008-3-examples-all-components`

---

## Prerequisites

Same as feature 007 — the showcase app must already build and run. If you haven't already:

```powershell
# Install root workspace deps
npm install

# Install showcase app deps
cd apps/showcase
npm install
```

---

## Environment Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 20 LTS |
| React Native | 0.73 |
| Metro | auto (via showcase) |
| Android SDK | API 33+ |
| Xcode | 14+ (macOS only) |

---

## Feature-Specific Dependency

The **Charts** examples use `react-native-gifted-charts`. Before writing Charts examples, add it to the showcase:

```bash
cd apps/showcase
npm install react-native-gifted-charts
```

Then pod-install on iOS:

```bash
cd ios && pod install && cd ..
```

This dep is **only required for Charts examples**. All other examples use only `@mui-native` components already available.

---

## Running the Showcase App

```bash
# From apps/showcase/
npm run android   # Android
npm run ios       # iOS (macOS only)
```

To verify a specific example renders, open the app, navigate to the category section, and tap the component card.

---

## Authoring Examples

All examples live in per-category files under `apps/showcase/src/catalogue/`:

| File | Category | Components |
|------|----------|------------|
| `examples.inputs.tsx` | INPUTS | 22 total (19 new + 3 migrated) |
| `examples.dataDisplay.tsx` | DATA_DISPLAY | 18 total (15 new + 3 migrated) |
| `examples.feedback.tsx` | FEEDBACK | 11 total (8 new + 3 migrated) |
| `examples.navigation.tsx` | NAVIGATION | 10 total (7 new + 3 migrated) |
| `examples.layout.tsx` | LAYOUT | 17 total (14 new + 3 migrated) |

### Example tuple shape

```typescript
import type { ExampleConfig } from '../types';

const code1 = `<Button variant="contained" onPress={() => {}}>Save</Button>`;

export const buttonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Contained',
    description: 'Primary action button using contained variant.',
    code: code1,
    render: () => <Button variant="contained" onPress={() => {}}>Save</Button>,
  },
  // ...
];
```

**Rules for `code`**:
- Must match what `render()` returns, simplified for clarity
- JSX string only — no imports, no function wrappers
- Language is `'tsx'` (handled by CodeBlock automatically)

**Rules for `render`**:
- Must not call React hooks directly — use a wrapper component for controlled state
- Must return a `React.ReactElement`

---

## Running Tests

T046 (automated gate) checks that every component in the registry has `examples !== null`:

```bash
# From repo root
npm test -- --testPathPattern="registry"
```

All 78 entries must pass. The test name pattern is:
```
Component registry — <ComponentKey> has examples
```

---

## Lint

```bash
npm run lint
```

TypeScript strict mode is enforced. All new code must compile with `"strict": true`.

---

## Common Errors

| Error | Fix |
|-------|-----|
| `TS2322: Property 'code' missing` | Add `code: string` to the ExampleConfig entry |
| `TS2304: Cannot find name 'CodeInput'` | Run Phase 0 — add export to `src/index.ts` |
| `Module react-native-gifted-charts not found` | `npm install react-native-gifted-charts` in `apps/showcase/` |
| Animation example not toggling | Wrap with a stateful functional component (see Pattern C in data-model.md) |
| CodeBlock renders blank | `code` prop was passed as empty string — set a real snippet |
