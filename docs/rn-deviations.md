# React Native Deviations from MUI Web

This document lists MUI Web components or features that cannot be implemented
identically in React Native. Each entry explains why and provides the
recommended alternative.

---

## TransferList

**MUI Web**: A pair of lists with checkboxes and move-all/move-selected buttons.

**RN status**: Not implemented.

**Reason**: Relies on HTML `<ul>` semantics and complex drag-and-drop interactions
that are not directly portable to React Native.

**Alternative**: Compose `List`, `Checkbox`, and `Button` components to build a
custom transfer UI. For drag-and-drop reordering, integrate
`react-native-draggable-flatlist`.

---

## TextareaAutosize

**MUI Web**: `<textarea>` element that grows vertically as content increases.

**RN status**: Not implemented as a standalone component.

**Reason**: React Native's `TextInput` does not support CSS `resize` and
`min-height / max-height` CSS properties directly.

**Alternative**: Use `<TextField multiline minRows={2} maxRows={6} />` which
achieves auto-grow via `onContentSizeChange` and `minRows`/`maxRows` props.

---

## Popper

**MUI Web**: Portaled overlay positioned relative to an anchor element using
`Popper.js` / floating-ui.

**RN status**: Partial implementation at `src/components/Popper/`.
`// RN-DEVIATION: CSS position:fixed unavailable in RN — overlay is portaled via
Modal and positioned with onLayout measurements.`

**Reason**: No CSS `position: fixed` or `overflow: visible` across parent
boundaries in React Native. View hierarchies clip child content.

**Alternative**: Use the `Popover` component or the `Menu` component (which
opens an absolute-positioned overlay via React Native `Modal`).

---

## Portal

**MUI Web**: Renders children into a DOM node outside the current React tree.

**RN status**: Implemented at `src/components/Portal/` using a custom React
context — `PortalHost` renders at the root and `Portal` teleports content there.

**Reason**: React Native has no equivalent of `ReactDOM.createPortal`. The
context-based approach achieves the same visual result (overlay above all
content).

**Alternative**: Wrap your app root with `<PortalHost>`. Use `<Portal>` to
render overlays outside the component hierarchy.

---

## NoSsr

**MUI Web**: Prevents server-side rendering of children; renders only
on the client.

**RN status**: Not applicable / not provided.

**Reason**: React Native has no server-side rendering phase. All rendering
occurs on the device.

**Alternative**: No wrapper is needed. All components render on-device.
If conditional rendering based on platform is required, use `Platform.select`
from `react-native`.

---

## Typography (public) → Text (internal)

The source component is `src/components/Text/` but it is exported as both
`Text` and `Typography` for MUI Web naming compatibility.

```ts
// Both imports are valid:
import { Text }       from 'mui-native';
import { Typography } from 'mui-native';
```

`Typography` accepts all 15 MD3 type-scale variant names as well as all 13 MD2
legacy names (mapped via `typographyVariantMap` from `src/tokens/typography.ts`).
