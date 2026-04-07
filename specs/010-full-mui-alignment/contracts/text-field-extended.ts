/**
 * Extended TextField Props Contract
 * Feature: 010-full-mui-alignment
 * FR-005 / FR-016 / FR-017 / FR-018 / FR-019 / FR-020
 *
 * Extends the existing TextField component by:
 *   - Adding 'standard' variant (underline-only, no border-box)
 *   - Adding helperText / error aliases (FR-005)
 *   - Adding multiline / rows / minRows / maxRows (FR-017)
 *   - Adding fullWidth (FR-018)
 *   - Adding required (FR-019)
 *   - Adding select (FR-020)
 *
 * Standard variant implementation (see research.md Decision 4):
 *   borderBottomWidth: 1 (inactive) / 2 (focused)
 *   No top/left/right borders; no background fill; no border-radius.
 *   Focus animated via Reanimated shared value on borderBottomWidth/Color.
 */
import type { ReactNode } from 'react';

export type TextFieldVariant = 'filled' | 'outlined' | 'standard';

export interface TextFieldExtendedProps {
  /**
   * Visual style of the input.
   * 'filled'   → Material filled input with background fill
   * 'outlined' → Input with full border box (existing default)
   * 'standard' → Underline-only input with no border box or background fill
   * Default: 'outlined'
   */
  variant?: TextFieldVariant;

  // ── Aliases (FR-005) ──────────────────────────────────────────────────────

  /** MUI-idiomatic alias for `supportingText`. Takes precedence over `supportingText` when both are given. */
  helperText?: ReactNode;
  /**
   * Error state for the input.
   * `true`   → Error styling (border/text in error color); helper text renders normally.
   * `string` → Error styling + auto-renders the string as helper text if no `helperText` prop is provided.
   *            When both `error` (string) and `helperText` are given, `helperText` takes precedence for display.
   * `false`  → No error styling (explicit false).
   */
  error?: boolean | string;

  // ── Multiline (FR-017) ─────────────────────────────────────────────────────

  /** Enable multiline input. Default: false */
  multiline?: boolean;
  /** Fixed number of visible text rows. Overrides minRows/maxRows when set. */
  rows?: number;
  /** Minimum visible rows for auto-grow multiline input. */
  minRows?: number;
  /** Maximum visible rows for auto-grow multiline input. */
  maxRows?: number;

  // ── Layout (FR-018) ────────────────────────────────────────────────────────

  /** Stretch the input to fill its parent container width. Default: false */
  fullWidth?: boolean;

  // ── Required indicator (FR-019) ────────────────────────────────────────────

  /**
   * Mark the field as required.
   * Renders an asterisk (*) alongside the label when true.
   * Default: false
   */
  required?: boolean;

  // ── Select mode (FR-020) ───────────────────────────────────────────────────

  /**
   * Render a Select component inside the text field.
   * When true, children of TextField are passed as Select options — matching MUI's composition pattern.
   * Default: false
   */
  select?: boolean;
}
