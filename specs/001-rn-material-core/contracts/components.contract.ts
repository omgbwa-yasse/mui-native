/**
 * RN-Material Public Component API Contract
 *
 * This file defines the stable prop type signatures for all 9 components.
 * Any change to a prop marked @required or to an existing prop type is
 * a breaking change (semver major).
 *
 * @packageDocumentation
 */
import type { ReactNode } from 'react';
import type {
  AccessibilityState,
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  ViewStyle,
  RefObject,
  ScrollView,
} from 'react-native';

// ─── Shared Base ─────────────────────────────────────────────────────────────

export interface RNMBaseProps {
  testID?:             string;
  accessible?:         boolean;
  accessibilityLabel?: string;
  style?:              StyleProp<ViewStyle>;
}

// ─── Button ──────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/buttons */
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';

export interface ButtonProps extends RNMBaseProps {
  /** @required Visible label text */
  label:              string;
  variant?:           ButtonVariant;        // default: 'filled'
  icon?:              ReactNode;
  iconPosition?:      'start' | 'end';      // default: 'start'
  onPress?:           (e: GestureResponderEvent) => void;
  onLongPress?:       (e: GestureResponderEvent) => void;
  disabled?:          boolean;
  loading?:           boolean;
  accessibilityRole?: 'button';
  accessibilityState?: AccessibilityState;
}

// ─── TextField ───────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/text-fields */
export type TextFieldVariant = 'filled' | 'outlined';

export interface TextFieldProps extends RNMBaseProps {
  /** @required Floating label */
  label:            string;
  variant?:         TextFieldVariant;  // default: 'filled'
  value?:           string;
  defaultValue?:    string;
  onChangeText?:    (text: string) => void;
  placeholder?:     string;
  helperText?:      string;
  errorText?:       string;
  error?:           boolean;
  leadingIcon?:     ReactNode;
  trailingIcon?:    ReactNode;
  multiline?:       boolean;
  maxLength?:       number;
  keyboardType?:    TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  disabled?:        boolean;
}

// ─── Card ────────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/cards */
export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps extends RNMBaseProps {
  /** @required Card content */
  children:  ReactNode;
  variant?:  CardVariant;  // default: 'elevated'
  onPress?:  (e: GestureResponderEvent) => void;
}

// ─── AppBar ──────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/top-app-bar */
export type AppBarVariant = 'small' | 'medium' | 'large' | 'center';

export interface AppBarProps extends RNMBaseProps {
  /** @required Title string */
  title:          string;
  variant?:       AppBarVariant;    // default: 'small'
  subtitle?:      string;
  leadingIcon?:   ReactNode;
  trailingIcons?: ReactNode[];      // max 3 per MD3 spec
  scrollRef?:     RefObject<ScrollView>;
  elevated?:      boolean;
}

// ─── FAB ─────────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/floating-action-button */
export type FABSize    = 'small' | 'medium' | 'large';
export type FABVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

export interface FABProps extends RNMBaseProps {
  /** @required Icon node */
  icon:          ReactNode;
  label?:        string;            // present → extended FAB
  size?:         FABSize;           // default: 'medium'
  variant?:      FABVariant;        // default: 'primary'
  onPress?:      (e: GestureResponderEvent) => void;
  onLongPress?:  (e: GestureResponderEvent) => void;
  lowered?:      boolean;
}

// ─── Chip ────────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/chips */
export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps extends RNMBaseProps {
  /** @required Chip label */
  label:          string;
  variant?:       ChipVariant;      // default: 'assist'
  leadingIcon?:   ReactNode;
  trailingIcon?:  ReactNode;
  selected?:      boolean;
  onPress?:       (e: GestureResponderEvent) => void;
  onDelete?:      () => void;
  disabled?:      boolean;
}

// ─── Dialog ──────────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/dialogs */
export interface DialogProps extends RNMBaseProps {
  /** @required Controlled visibility */
  visible:        boolean;
  /** @required Dismiss callback */
  onDismiss:      () => void;
  title?:         string;
  icon?:          ReactNode;
  children?:      ReactNode;
  confirmLabel?:  string;
  onConfirm?:     () => void;
  cancelLabel?:   string;
  onCancel?:      () => void;
  dismissible?:   boolean;          // default: true
}

// ─── BottomSheet ─────────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/bottom-sheets */
export interface BottomSheetProps extends RNMBaseProps {
  /** @required Controlled visibility */
  visible:      boolean;
  /** @required Dismiss callback */
  onDismiss:    () => void;
  /** @required Sheet content */
  children:     ReactNode;
  maxHeight?:   number;
  snapPoints?:  number[];           // ascending values 0–1; default: [0.5, 1.0]
  dismissible?: boolean;            // default: true
}

// ─── NavigationBar ───────────────────────────────────────────────────────────

/** @see https://m3.material.io/components/navigation-bar */
export interface NavigationBarItem {
  /** @required Unique key matching onSelect argument */
  key:         string;
  /** @required Icon (inactive state) */
  icon:        ReactNode;
  activeIcon?: ReactNode;
  /** @required Visible label */
  label:       string;
  badge?:      number | string;
}

export interface NavigationBarProps extends RNMBaseProps {
  /** @required 3–5 items per MD3 spec */
  items:       NavigationBarItem[];
  /** @required Currently selected item key */
  activeKey:   string;
  /** @required Selection handler */
  onSelect:    (key: string) => void;
  showLabels?: boolean;             // default: true
}
