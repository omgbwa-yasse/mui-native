import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { SxProps } from '../../types/shared';

/**
 * Props for the ActivityIndicator component.
 */
export interface ActivityIndicatorProps {
  /** Size variant. Defaults to 'medium'. */
  size?: SizeProp;
  /** Color override. Defaults to `theme.colorScheme.primary`. */
  color?: string;
  /** Whether the indicator is animating. Defaults to true. */
  animating?: boolean;
  /** When true, hides the view when not animating. Defaults to true. */
  hidesWhenStopped?: boolean;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
