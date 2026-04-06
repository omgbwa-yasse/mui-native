/**
 * SizeContext for Tabs.
 *
 * Allows Tabs to propagate its `size` prop to child Tab components without
 * requiring each Tab to receive an explicit `size` prop.
 *
 * Usage (in Tabs.tsx):
 * ```tsx
 * import { SizeProvider } from './SizeContext';
 * <SizeProvider value={size}>{children}</SizeProvider>
 * ```
 *
 * Usage (in individual Tab child):
 * ```tsx
 * import { useGroupSize } from '../Tabs/SizeContext';
 * const groupSize = useGroupSize();
 * const resolvedSize = groupSize ?? size ?? 'medium';
 * ```
 */

import React from 'react';
import type { SizeProp } from '../../tokens/size';

/** Context carrying the size propagated from a Tabs parent. */
export const SizeContext = React.createContext<SizeProp | undefined>(undefined);
SizeContext.displayName = 'TabsSizeContext';

/** Provider component wrapping Tabs children. */
export const SizeProvider = SizeContext.Provider;

/**
 * Reads the size value propagated by an ancestor Tabs component.
 * Returns `undefined` when the component is not inside a Tabs — callers
 * should fall back to their own `size` prop or `'medium'`.
 */
export function useGroupSize(): SizeProp | undefined {
  return React.useContext(SizeContext);
}
