/**
 * Minimal ambient type declarations for react-native-svg (optional peer dep).
 * Covers only the shapes used by CircularProgress.
 */
declare module 'react-native-svg' {
  import type * as React from 'react';
  import type { ViewStyle } from 'react-native';

  export interface CommonSvgProps {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeOpacity?: number;
    fillOpacity?: number;
    opacity?: number;
    testID?: string;
  }

  export interface SvgProps extends CommonSvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    style?: ViewStyle;
    children?: React.ReactNode;
  }

  export interface CircleProps extends CommonSvgProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    strokeDasharray?: number | string;
    strokeDashoffset?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    rotation?: number;
    origin?: string;
  }

  export interface PathProps extends CommonSvgProps {
    d?: string;
  }

  const Svg: React.ComponentType<SvgProps>;
  export const Circle: React.ComponentType<CircleProps>;
  export const Path: React.ComponentType<PathProps>;
  export const G: React.ComponentType<{ children?: React.ReactNode } & CommonSvgProps>;
  export const ClipPath: React.ComponentType<{ id?: string; children?: React.ReactNode }>;
  export const Defs: React.ComponentType<{ children?: React.ReactNode }>;
  export default Svg;
}
