import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PortalContext } from './PortalContext';
import type { PortalHostProps } from './types';

type PortalEntry = { key: string; children: React.ReactNode };

/**
 * PortalHost — place once at the root of your application tree.
 *
 * Provides the portal context + renders all mounted portals in a full-screen
 * View layered above the normal content (z-order overlay).
 *
 * @example
 * <PortalHost>
 *   <App />
 * </PortalHost>
 */
export function PortalHost({ children }: PortalHostProps): React.ReactElement {
  const [portals, setPortals] = useState<PortalEntry[]>([]);

  const mount = useCallback((key: string, node: React.ReactNode) => {
    setPortals(prev => {
      const exists = prev.findIndex(p => p.key === key);
      if (exists !== -1) {
        const next = [...prev];
        next[exists] = { key, children: node };
        return next;
      }
      return [...prev, { key, children: node }];
    });
  }, []);

  const unmount = useCallback((key: string) => {
    setPortals(prev => prev.filter(p => p.key !== key));
  }, []);

  const ctx = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <PortalContext.Provider value={ctx}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {portals.map(({ key, children: node }) => (
          <React.Fragment key={key}>{node}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
}
