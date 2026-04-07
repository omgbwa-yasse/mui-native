/**
 * Card Sub-Component Props Contracts
 * Feature: 010-full-mui-alignment
 * FR-021 / FR-022 / FR-023 / FR-024
 *
 * Sub-components co-located in src/components/Card/ alongside Card.tsx.
 * All sub-components are exported as named top-level exports from src/index.ts.
 */
import type { ComponentType, ReactNode } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';

// ─── CardHeader (FR-022) ─────────────────────────────────────────────────────

export interface CardHeaderProps {
  /** Avatar element displayed on the left of the header. */
  avatar?: ReactNode;
  /** Main title. Accepts any ReactNode (string, Text, icon + text). */
  title?: ReactNode;
  /** Secondary line below the title. */
  subheader?: ReactNode;
  /** Action element anchored to the top-right of the header (e.g., IconButton). */
  action?: ReactNode;
  style?: ViewStyle;
}

// ─── CardMedia (FR-023) ──────────────────────────────────────────────────────

export interface CardMediaProps {
  /** Image URI string rendered via react-native Image. */
  image?: string;
  /** Override the content component. Receives `source`, `style`, `alt` as props. Default: react-native Image */
  component?: string | ComponentType<{ source?: { uri: string }; style?: ImageStyle; accessibilityLabel?: string }>;
  /** Accessible description of the media. Passed as accessibilityLabel. */
  alt?: string;
  /** Height of the media area in dp (or '100%' / '50%' etc.). */
  height?: number | string;
  style?: ImageStyle;
}

// ─── CardContent ─────────────────────────────────────────────────────────────

export interface CardContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// ─── CardActions (FR-024) ────────────────────────────────────────────────────

export interface CardActionsProps {
  children?: ReactNode;
  /**
   * When true, suppresses default horizontal spacing between action buttons.
   * Default: false
   */
  disableSpacing?: boolean;
  style?: ViewStyle;
}

// ─── CardActionArea ──────────────────────────────────────────────────────────

export interface CardActionAreaProps {
  children?: ReactNode;
  /** Called when the action area is pressed. */
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}
