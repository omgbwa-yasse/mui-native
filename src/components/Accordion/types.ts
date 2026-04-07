import type React from 'react';
import type { ViewProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

// ─── Data-driven shape (existing) ────────────────────────────────────────────
export interface AccordionDataDrivenProps extends ViewProps {
  /** Header label — presence signals data-driven mode */
  title: string;
  /** Accordion body content */
  children?: React.ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Called when header is pressed with new expanded value */
  onToggle?: (expanded: boolean) => void;
  /** Prevents any interaction. Default: false */
  disabled?: boolean;
  /** Leading element rendered before title */
  left?: React.ReactNode;
  /** Trailing element — receives current expanded state */
  right?: (expanded: boolean) => React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}

// ─── Composable shape (new) ───────────────────────────────────────────────────
export interface AccordionComposableProps extends ViewProps {
  /** title must be absent to trigger composable mode */
  title?: never;
  /** AccordionSummary / AccordionDetails / AccordionActions children */
  children: React.ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Uncontrolled initial expanded state */
  defaultExpanded?: boolean;
  /** Called when expand/collapse toggles */
  onChange?: (expanded: boolean) => void;
  /** Prevents any interaction. Default: false */
  disabled?: boolean;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
}

/** Discriminated union — TypeScript prevents mixing both shapes */
export type AccordionProps = AccordionDataDrivenProps | AccordionComposableProps;

// ─── Sub-component prop types (new) ──────────────────────────────────────────
export interface AccordionSummaryProps extends ViewProps {
  /** Icon displayed at the end of the row; rotates 180° when expanded */
  expandIcon?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps;
}

export interface AccordionDetailsProps extends ViewProps {
  children?: React.ReactNode;
  sx?: SxProps;
}

export interface AccordionActionsProps extends ViewProps {
  children?: React.ReactNode;
  /** Removes padding between action buttons */
  disableSpacing?: boolean;
  sx?: SxProps;
}
