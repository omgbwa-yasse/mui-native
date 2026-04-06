import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

/**
 * Props for the Portal component.
 * Teleports children into the nearest PortalHost.
 */
export interface PortalProps {
  children: React.ReactNode;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the PortalHost component.
 * Provides the portal mounting surface; place once at the root of the tree.
 */
export interface PortalHostProps {
  children: React.ReactNode;
}

/**
 * Internal context value shared between Portal and PortalHost.
 * Not exported to consumers.
 */
export interface PortalContextValue {
  mount: (key: string, children: React.ReactNode) => void;
  unmount: (key: string) => void;
}
