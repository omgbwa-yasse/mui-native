import { createContext } from 'react';
import type { PortalContextValue } from './types';

/**
 * Internal context for Portal/PortalHost communication.
 * Defaults to null — throws clear error via usePortalContext() if misused.
 */
export const PortalContext = createContext<PortalContextValue | null>(null);
