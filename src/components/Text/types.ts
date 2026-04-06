import type React from 'react';
import type { AccessibilityRole, StyleProp, TextProps as RNTextProps, TextStyle } from 'react-native';
import type { TypographyScale } from '../../tokens/typography';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

/** All 15 MD3 type-scale roles */
export type TypeScaleVariant = keyof TypographyScale;

/**
 * Props for the MD3 Text component.
 */
export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Style override — merged after the variant style. */
  style?: StyleProp<TextStyle>;
  /** MD3 type-scale variant. Controls font size, weight, line-height, etc. */
  variant: TypeScaleVariant;
  /** Text color override. Defaults to `theme.colorScheme.onSurface`. */
  color?: string;
  /** Size variant. */
  size?: SizeProp;
  /** Extended style system. */
  sx?: SxProps;
  /** Text alignment. */
  align?: TextStyle['textAlign'];
  /** Content */
  children?: React.ReactNode;
  /** Accessibility role. Defaults to `'text'`. */
  accessibilityRole?: AccessibilityRole;
  /** Test id for automated queries. */
  testID?: string;
}
