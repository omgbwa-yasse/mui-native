/**
 * useColorRole — resolves a semantic `ColorProp` value to the four concrete
 * `colorScheme` hex strings expected by component renderers:
 *
 *  - `bg`          → the primary fill for this color role
 *  - `fg`          → the on-color used for content drawn on top of `bg`
 *  - `container`   → the surface variant for softer backgrounds
 *  - `onContainer` → the on-color for content drawn on `container`
 *
 * When `color` is `undefined`, falls back to `'primary'`.
 *
 * Usage:
 * ```tsx
 * const { bg, fg } = useColorRole(props.color);
 * return <View style={{ backgroundColor: bg }}>
 *   <Text style={{ color: fg }}>{label}</Text>
 * </View>;
 * ```
 */

import { useTheme } from '../theme/ThemeContext';
import { colorRoleMap } from '../types/shared';
import type { ColorProp } from '../types/shared';

export interface ColorRoleResult {
  bg: string;
  fg: string;
  container: string;
  onContainer: string;
}

/**
 * Reads `colorRoleMap[color ?? 'primary']` to obtain ColorScheme key names,
 * then resolves each against the current `theme.colorScheme`.
 */
export function useColorRole(color: ColorProp | undefined): ColorRoleResult {
  const { theme } = useTheme();
  const roles = colorRoleMap[color ?? 'primary'];
  return {
    bg: theme.colorScheme[roles.bg],
    fg: theme.colorScheme[roles.fg],
    container: theme.colorScheme[roles.container],
    onContainer: theme.colorScheme[roles.onContainer],
  };
}
