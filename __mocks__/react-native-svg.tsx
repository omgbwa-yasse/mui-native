/**
 * Manual Jest mock for react-native-svg (optional peer dep — not installed in dev).
 *
 * Each SVG primitive renders a plain View so RNTL queries work.
 * testID is forwarded so tests can find specific elements by ID.
 */
import React from 'react';
import { View } from 'react-native';

type SvgProps = { children?: React.ReactNode; testID?: string; width?: number; height?: number };
type ShapeProps = Record<string, unknown> & { testID?: string; children?: React.ReactNode };

function Svg({ children, testID }: SvgProps): React.ReactElement {
  return React.createElement(View, { testID }, children);
}

const Circle = React.forwardRef<View, ShapeProps>(function Circle({ testID }, _ref) {
  return React.createElement(View, { testID });
});

function Path({ testID }: ShapeProps): React.ReactElement {
  return React.createElement(View, { testID });
}

function G({ children, testID }: ShapeProps): React.ReactElement {
  return React.createElement(View, { testID }, children as React.ReactNode);
}

function ClipPath({ children, testID }: ShapeProps): React.ReactElement {
  return React.createElement(View, { testID }, children as React.ReactNode);
}

function Defs({ children }: ShapeProps): React.ReactElement {
  return React.createElement(View, {}, children as React.ReactNode);
}

export { Svg, Circle, Path, G, ClipPath, Defs };
export default Svg;
