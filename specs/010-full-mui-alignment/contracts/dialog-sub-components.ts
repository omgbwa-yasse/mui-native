/**
 * Dialog Sub-Component Props Contracts + Extended Dialog Props
 * Feature: 010-full-mui-alignment
 * FR-025 / FR-026 / FR-027
 *
 * Sub-components co-located in src/components/Dialog/ alongside Dialog.tsx.
 * All sub-components are exported as named top-level exports from src/index.ts.
 *
 * RN-DEVIATION (FR-027): onClose reason values differ from MUI Web.
 *   MUI Web: 'backdropClick' | 'escapeKeyDown'
 *   mui-native: 'backdropPress' | 'hardwareBackPress'
 */
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

// ─── Extended Dialog props (additions to existing Dialog) ────────────────────

// RN-DEVIATION: MUI Web uses 'backdropClick' | 'escapeKeyDown'
export type DialogOnCloseReason = 'backdropPress' | 'hardwareBackPress';

export interface DialogExtendedProps {
  /** MUI-idiomatic alias for `visible`. Takes precedence when both are supplied. */
  open?: boolean;
  /**
   * MUI-idiomatic alias for `onDismiss`.
   * RN-DEVIATION: reason values are 'backdropPress' | 'hardwareBackPress'
   * instead of MUI Web's 'backdropClick' | 'escapeKeyDown'.
   */
  onClose?: (reason: DialogOnCloseReason) => void;
  /**
   * Widened from `string` to `ReactNode` for MUI compositional parity.
   * Backward-compatible: existing `title="string"` continues to work.
   * When using DialogTitle sub-component, this prop is typically omitted.
   */
  title?: ReactNode;
  /** Render dialog as full-screen overlay. Default: false */
  fullScreen?: boolean;
  /** Stretch dialog to its maxWidth. Default: false */
  fullWidth?: boolean;
  /**
   * Maximum width of the dialog.
   * 'xs' = 444 dp equivalent, 'sm' = 600 dp, 'md' = 960 dp, 'lg' = 1280 dp, 'xl' = 1920 dp, false = no max.
   * Default: 'sm'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /**
   * Scroll behavior.
   * 'paper' = DialogContent scrolls; 'body' = entire dialog container scrolls.
   * Default: 'paper'
   */
  scroll?: 'body' | 'paper';
}

// ─── DialogTitle (FR-025) ────────────────────────────────────────────────────

export interface DialogTitleProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── DialogContent (FR-025) ──────────────────────────────────────────────────

export interface DialogContentProps {
  children?: ReactNode;
  /**
   * Display top and bottom dividers separating the content from title and actions.
   * Default: false
   */
  dividers?: boolean;
  style?: ViewStyle;
}

// ─── DialogContentText (FR-025) ──────────────────────────────────────────────

export interface DialogContentTextProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── DialogActions (FR-025) ──────────────────────────────────────────────────

export interface DialogActionsProps {
  children?: ReactNode;
  /**
   * Suppress default spacing between action buttons.
   * Default: false
   */
  disableSpacing?: boolean;
  style?: ViewStyle;
}
