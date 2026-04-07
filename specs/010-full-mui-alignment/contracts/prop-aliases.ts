/**
 * Prop Alias Contract: Full MUI-Native ↔ Material UI Alignment
 * Feature: 010-full-mui-alignment
 * FR-001 / FR-002 / FR-003 / FR-004 / FR-005 / FR-006
 *
 * Documents the additive alias strategy for all 7 affected components.
 * Actual implementations inline-resolve aliases within each component file.
 *
 * Resolution rule (all components):
 *   const resolvedProp = muiAlias ?? internalProp;
 *   if (__DEV__ && muiAlias !== undefined && internalProp !== undefined) {
 *     console.warn(`[mui-native] Both "${muiName}" and "${internalName}" were supplied to <ComponentName>. "${muiName}" takes precedence.`);
 *   }
 */

import type { ReactNode } from 'react';

// ─── Dialog ──────────────────────────────────────────────────────────────────

// RN-DEVIATION: MUI Web uses 'backdropClick' | 'escapeKeyDown'
export type DialogOnCloseReason = 'backdropPress' | 'hardwareBackPress';

export interface DialogAliasProps {
  /** MUI-idiomatic alias for `visible`. Takes precedence when both are supplied. */
  open?: boolean;
  /** MUI-idiomatic alias for `onDismiss`. Receives a reason string for the close event. */
  onClose?: (reason: DialogOnCloseReason) => void;
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export interface ModalAliasProps {
  /** MUI-idiomatic alias for `visible`. */
  open?: boolean;
  /** MUI-idiomatic alias for `onDismiss`. */
  onClose?: () => void;
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export interface MenuAliasProps {
  /** MUI-idiomatic alias for `visible`. */
  open?: boolean;
  /** MUI-idiomatic alias for `onDismiss`. */
  onClose?: () => void;
}

// ─── Snackbar ────────────────────────────────────────────────────────────────

export interface SnackbarAliasProps {
  /** MUI-idiomatic alias for `visible`. */
  open?: boolean;
}

// ─── BottomSheet ─────────────────────────────────────────────────────────────

export interface BottomSheetAliasProps {
  /** MUI-idiomatic alias for `visible`. */
  open?: boolean;
}

// ─── Switch ──────────────────────────────────────────────────────────────────

export interface SwitchAliasProps {
  /** MUI-idiomatic alias for the boolean value prop. */
  checked?: boolean;
  /** MUI-idiomatic alias for `onValueChange`. */
  onChange?: (event: { target: { checked: boolean } }) => void;
}

// ─── Rating ──────────────────────────────────────────────────────────────────
// NOTE: `checked` is NOT applicable to Rating (FR-003 clarification).
// Rating is a numeric 0–5 picker; `checked: boolean` has semantic incompatibility.

export interface RatingAliasProps {
  value?: number | null;
  onChange?: (event: React.SyntheticEvent | null, value: number | null) => void;
}

// ─── Slider ──────────────────────────────────────────────────────────────────

export interface SliderAliasProps {
  /** MUI-idiomatic onChange with standard MUI callback signature. */
  onChange?: (event: unknown, value: number | number[]) => void;
}

// ─── TextField ───────────────────────────────────────────────────────────────

export interface TextFieldAliasProps {
  /** MUI-idiomatic alias for `supportingText`. */
  helperText?: ReactNode;
  /**
   * Boolean `true` → error styling only.
   * Non-empty string → error styling + auto-renders as helperText if no `helperText` prop is provided.
   * When both `error` (string) and `helperText` are given, `helperText` takes precedence for display.
   */
  error?: boolean | string;
}

// ─── Badge ───────────────────────────────────────────────────────────────────

export interface BadgeAliasProps {
  /** MUI-idiomatic alias for `content`. */
  badgeContent?: ReactNode;
  /** When `true`, hides the badge. Inverse of existing `visible` prop. */
  invisible?: boolean;
}

// ─── Shared resolution note ──────────────────────────────────────────────────

/**
 * Documents alias resolution precedence across all aliased components.
 * MUI-idiomatic alias always wins; `__DEV__` warning fires when both are supplied.
 */
export type AliasResolutionNote =
  'MUI-idiomatic alias takes precedence; __DEV__ console.warn on conflict; no production overhead';
