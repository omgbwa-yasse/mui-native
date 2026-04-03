# Contract: Overlay API

**Branch**: `002-add-missing-components` | **Date**: 2026-04-02  
**Scope**: Components that render above the normal view hierarchy via Portal

---

## Components Covered

`Portal`, `Backdrop`, `Modal`, `Snackbar`, `Tooltip`, `Menu`

---

## PortalHost & Portal

```ts
// src/components/Portal/PortalHost.tsx — SINGLE required instance at app root
export function PortalHost(props: PortalHostProps): JSX.Element;

// src/components/Portal/Portal.tsx — teleports children into PortalHost
export function Portal(props: PortalProps): null;

// Context — internal, not exported to consumers
export const PortalContext: React.Context<PortalContextValue>;
```

**Invariants**:
- Exactly one `PortalHost` must be present in the tree
- Multiple `Portal` instances are supported simultaneously
- Portal renders children AFTER the main component tree (z-order: overlay)

---

## Backdrop

```ts
export function Backdrop(props: BackdropProps): JSX.Element;

// Required contract
interface BackdropContract {
  visible:    boolean;         // controls visibility
  onDismiss?: () => void;      // called on press (if provided)
  opacity?:   number;          // default: 0.5
}
```

**Invariants**:
- Renders via `Portal` — always above all other views
- Fade animation: 200 ms (Motion token `short2`)
- Does NOT block back-button on Android unless `onDismiss` is wired to navigation

---

## Modal

```ts
export function Modal(props: ModalProps): JSX.Element;

// Required contract
interface ModalContract {
  visible:      boolean;
  onDismiss?:   () => void;   // called on backdrop press when dismissable=true
  children:     React.ReactNode;
  dismissable?: boolean;      // default: true
}
```

**Invariants**:
- Renders `Backdrop` + content surface via `Portal`
- `dismissable={false}` traps focus inside modal (SC-001 requirement for Dialog parity)
- Content surface receives `elevation={3}` Paper background

---

## Snackbar

```ts
export function Snackbar(props: SnackbarProps): JSX.Element;

// Required contract
interface SnackbarContract {
  visible:     boolean;
  onDismiss:   () => void;    // MUST be called after duration elapses
  children:    React.ReactNode;
  action?:     { label: string; onPress: () => void };
  duration?:   'short' | 'long' | number;  // short=4000ms, long=10000ms
}
```

**Invariants**:
- Renders via `Portal` at bottom of screen
- Auto-dismisses after `duration` — `onDismiss` callback is mandatory
- Queue: when multiple Snackbars are triggered, they show FIFO; only one visible at a time
- Action CTA rendered right-aligned; `onDismiss` is called when action is pressed

---

## Tooltip

```ts
export function Tooltip(props: TooltipProps): JSX.Element;

// Required contract
interface TooltipContract {
  title:      string;
  children:   React.ReactElement;  // must be a single, pressable element
  placement?: 'top' | 'bottom' | 'left' | 'right';  // default: 'top'
}
```

**Invariants**:
- Renders via `Portal` to avoid clipping from parent overflow:hidden
- Position computed via `measure()` on the anchor; clamped to screen edges
- Shown on long-press (≥ 500 ms) on touch devices; hides on pointer leave
- Background matches `MD3 inverseSurface` token

---

## Menu

```ts
export function Menu(props: MenuProps): JSX.Element;
export function MenuItem(props: MenuItemProps): JSX.Element;

// Required contract
interface MenuContract {
  visible:     boolean;
  onDismiss:   () => void;
  anchor:      React.ReactNode | { x: number; y: number };
  children:    React.ReactNode;   // expects MenuItem children
}

interface MenuItemContract {
  title:       string;
  onPress?:    () => void;
  disabled?:   boolean;
}
```

**Invariants**:
- Renders via `Portal`; position computed via `measure()` on anchor node
- Pressing outside the menu surface calls `onDismiss`
- Disabled `MenuItem` is non-interactive; visually dimmed (opacity 0.38 per MD3 state)
- Max height: 40% of screen height; scrollable when content exceeds

---

## Shared Overlay Behaviours

| Behaviour | Backdrop | Modal | Snackbar | Tooltip | Menu |
|-----------|----------|-------|----------|---------|------|
| Portal    | ✅        | ✅     | ✅        | ✅       | ✅    |
| Fade-in   | 200 ms   | 200 ms | 200 ms  | 150 ms  | 150 ms |
| Back-button dismiss | optional | optional | optional | ✅ | ✅ |
| A11y role | none | dialog | status | tooltip | menu |
