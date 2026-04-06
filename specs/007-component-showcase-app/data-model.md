# Data Model: MUI-Native Component Showcase Application

**Feature Branch**: `007-component-showcase-app`  
**Date**: 2026-04-04

---

## Overview

The showcase is a **read-only display application**. There is no persistence layer, no
server calls, and no user accounts. All data is static and defined at build time or
session time (layout preference).

---

## Core Entities

### 1. `CategoryId` (Enumeration)

Identifies one of the 5 canonical component categories.

```
INPUTS         → 22 components
DATA_DISPLAY   → 18 components
FEEDBACK       → 11 components
NAVIGATION     → 10 components
LAYOUT         → 17 components
```

> **Verified**: counts reflect `src/components/` directory contents as of 2026-04-05 (78 total).
> Note: `TouchableRipple` is categorised under `INPUTS`, not `LAYOUT`.

**Invariants**:
- Exactly 5 values — no additions or removals in v1
- Machine-readable identifiers; localised display labels are separate

---

### 2. `Category`

A logical group of related components shown on the home screen.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `CategoryId` | Primary key |
| `label` | `string` | Human-readable display name (e.g., "Data Display") |
| `description` | `string` | One-line description shown on the home card |
| `icon` | `string` (icon name) | MaterialIcon name used on the category card |
| `components` | `ComponentEntry[]` | Ordered list of components in this category |

**Invariants**:
- `components` is non-empty (every category has ≥ 1 component)
- `id` is unique across the registry

---

### 3. `ComponentEntry`

A single component registered in the catalogue. Every component in `src/components/`
has exactly one `ComponentEntry`.

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Component display name (e.g., `"Button"`) |
| `componentKey` | `string` | Unique key matching directory name (e.g., `"Button"`) |
| `categoryId` | `CategoryId` | Parent category |
| `description` | `string` | One-line description shown on the component list |
| `sourceCode` | `string` | Raw source from `registry.generated.ts`; may be empty string if generation was skipped |
| `examples` | `ExampleConfig[] \| null` | Exactly 3 items OR null (placeholder mode) |
| `hasFullExamples` | `boolean` | `true` if `examples` is a complete array of 3; `false` otherwise |

**Invariants**:
- `componentKey` is unique across the registry
- `examples` is either `null` (placeholder mode) or an array of exactly 3 `ExampleConfig`
- `hasFullExamples === (examples !== null && examples.length === 3)`

---

### 4. `ExampleConfig`

Represents one of the 3 live usage examples for a component.

| Field | Type | Notes |
|-------|------|-------|
| `label` | `string` | Short title shown above the rendered example (e.g., "Primary", "Outlined", "Disabled") |
| `description` | `string \| null` | Optional additional context shown beneath the label |
| `render` | `() => React.ReactElement` | Render function producing the live component preview |

**Invariants**:
- `label` is non-empty
- `render` is a stable function reference (defined at module level, not inline)
- Each of the 3 examples within one `ComponentEntry` MUST have a distinct `label`

---

### 5. `LayoutPreference` (Session State)

Governs how the 3 `ExampleConfig` renders are arranged on the component detail screen.

| Value | Behaviour |
|-------|-----------|
| `vertical` | Examples stacked top-to-bottom in a `ScrollView` |
| `horizontal` | Examples laid out side-by-side in a horizontal `ScrollView` |

**Persistence**: React Context (`LayoutPreferenceContext`) — session only; reset to
`vertical` on cold app start. No `AsyncStorage` involved.

---

## Entity Relationships

```
HomeScreen
  └── displays many ──► Category
                            └── lists many ──► ComponentEntry
                                                    ├── has one ──► sourceCode: string
                                                    └── has 0..3 ──► ExampleConfig

App root
  └── provides ──► LayoutPreferenceContext
                        └── consumed by ──► ComponentDetailScreen
                                                └── controls ──► ExampleGallery
```

---

## Registry Composition

The registry is built from two files combined at import time:

```
registry.generated.ts         registry.ts
─────────────────────         ──────────────
sourceCodeMap:                categories: Category[]
  Button → "import ..."         each Category.components[*] merges
  TextField → "import ..."      → sourceCode from sourceCodeMap
  ...                           → examples from authored registry entries
  (all 77)
```

**Merge rule**: `ComponentEntry.sourceCode = sourceCodeMap[componentKey] ?? ''`

---

## State Transitions

### Navigation state machine

```
HOME ──tap category──► CATEGORY_LIST ──tap component──► COMPONENT_DETAIL
HOME ◄──back/gesture── CATEGORY_LIST ◄──back/gesture── COMPONENT_DETAIL
```

### Layout toggle state machine

```
[vertical] ──tap toggle──► [horizontal]
[horizontal] ──tap toggle──► [vertical]
```

No other state transitions. The app is stateless beyond navigation position and layout preference.

---

## Validation Rules

| Entity | Rule |
|--------|------|
| `Category.components` | Must be non-empty; components assigned to exactly one category |
| `ComponentEntry.examples` | Either null or exactly 3 elements |
| `ComponentEntry.componentKey` | Must match a directory name under `src/components/` |
| `ExampleConfig.render` | Must not throw during render; tested in unit suite |
| `LayoutPreference` | Default value is `vertical`; only two valid values |
