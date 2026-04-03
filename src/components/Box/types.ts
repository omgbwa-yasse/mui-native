import type { ViewProps, ViewStyle } from 'react-native';
import type { SpacingKey } from '../../tokens/spacing';

export interface BoxProps extends ViewProps {
  /** Padding all sides */
  p?: SpacingKey;
  /** Padding top */
  pt?: SpacingKey;
  /** Padding bottom */
  pb?: SpacingKey;
  /** Padding left */
  pl?: SpacingKey;
  /** Padding right */
  pr?: SpacingKey;
  /** Padding horizontal */
  px?: SpacingKey;
  /** Padding vertical */
  py?: SpacingKey;
  /** Margin all sides */
  m?: SpacingKey;
  /** Margin top */
  mt?: SpacingKey;
  /** Margin bottom */
  mb?: SpacingKey;
  /** Margin left */
  ml?: SpacingKey;
  /** Margin right */
  mr?: SpacingKey;
  /** Margin horizontal */
  mx?: SpacingKey;
  /** Margin vertical */
  my?: SpacingKey;
  /** Escape hatch — merged last (highest specificity) */
  sx?: ViewStyle;
}
