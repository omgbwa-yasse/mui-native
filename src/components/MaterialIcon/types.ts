import type { MaterialIconName } from './catalogue';

/** The five Google Fonts Material Icon style variants. */
export type IconVariant =
  | 'filled'    // default — MaterialIcons.ttf
  | 'outlined'  // MaterialIconsOutlined-Regular.otf
  | 'rounded'   // MaterialIconsRound-Regular.otf
  | 'sharp'     // MaterialIconsSharp-Regular.otf
  | 'two-tone'; // MaterialIconsTwoTone-Regular.otf

/** Props for the MaterialIcon component. */
export interface MaterialIconProps {
  /** Icon name from the Google Fonts Material Icons catalogue. */
  name: MaterialIconName;
  /** Icon style variant. Defaults to 'filled'. */
  variant?: IconVariant;
  /** Icon size in dp. Defaults to 24. */
  size?: number;
  /** Icon color. Defaults to theme `colorScheme.onSurface`. */
  color?: string;
  /** Accessible label. Sets `accessibilityRole="image"` when provided. */
  accessibilityLabel?: string;
  /** Test id for automated queries. */
  testID?: string;
}
