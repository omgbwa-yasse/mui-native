/**
 * SizeContext for ButtonGroup / ToggleButtonGroup.
 *
 * Allows ButtonGroup and ToggleButtonGroup to propagate their `size` prop
 * downward to child Button and ToggleButton components without requiring
 * each child to receive an explicit `size` prop.
 *
 * Usage (in ButtonGroup.tsx):
 * ```tsx
 * import { SizeProvider } from './SizeContext';
 * <SizeProvider value={size}>{children}</SizeProvider>
 * ```
 *
 * Usage (in Button.tsx):
 * ```tsx
 * import { useGroupSize } from '../ButtonGroup/SizeContext';
 * const groupSize = useGroupSize();
 * const resolvedSize = groupSize ?? size ?? 'medium';
 * ```
 */

import React from 'react';
import type { SizeProp } from '../../tokens/size';

/** Context carrying the size propagated from a ButtonGroup / ToggleButtonGroup parent. */
export const SizeContext = React.createContext<SizeProp | undefined>(undefined);
SizeContext.displayName = 'ButtonGroupSizeContext';

/** Provider component wrapping ButtonGroup / ToggleButtonGroup children. */
export const SizeProvider = SizeContext.Provider;

/**
 * Reads the size value propagated by an ancestor ButtonGroup or ToggleButtonGroup.
 * Returns `undefined` when the component is not inside such a group — callers
 * should fall back to their own `size` prop or `'medium'`.
 */
export function useGroupSize(): SizeProp | undefined {
  return React.useContext(SizeContext);
}
