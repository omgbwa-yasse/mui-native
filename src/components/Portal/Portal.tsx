import { useContext, useEffect, useId } from 'react';
import { PortalContext } from './PortalContext';
import type { PortalProps } from './types';

/**
 * Portal — teleports its children into the nearest PortalHost.
 *
 * Mount Portal anywhere in the tree; it renders its children above all sibling
 * views inside the root PortalHost (z-order: overlay).
 *
 * @example
 * <Portal>
 *   <View style={StyleSheet.absoluteFill}>{...}</View>
 * </Portal>
 */
export function Portal({ children }: PortalProps): null {
  const ctx = useContext(PortalContext);
  const key = useId();

  useEffect(() => {
    if (ctx === null) return;
    ctx.mount(key, children);
    return () => {
      ctx.unmount(key);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, children, ctx]);

  if (ctx === null) {
    if (__DEV__) {
      console.warn(
        '[rn-material] <Portal> was rendered outside a <PortalHost>. ' +
          'Wrap your root with <PortalHost> so portals have a mount target.',
      );
    }
    return null;
  }

  return null;
}
