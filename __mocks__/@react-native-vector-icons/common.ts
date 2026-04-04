/**
 * Manual Jest mock for @react-native-vector-icons/common.
 *
 * createIconSet returns a lightweight React component that renders a Text
 * element with testID="mock-icon-{name}" so tests can assert rendering
 * without requiring native font registration.
 */
import React from 'react';
import { Text } from 'react-native';

export function createIconSet(
  _glyphMap: Record<string, number>,
  _fontFamily: string,
  _fontFile: string,
) {
  const IconSet = ({
    name,
    size,
    color,
    testID,
    style,
  }: {
    name: string;
    size?: number;
    color?: string;
    testID?: string;
    style?: object;
  }) =>
    React.createElement(Text, {
      testID: testID ?? `mock-icon-${name}`,
      style: [{ fontSize: size, color }, style],
    });

  IconSet.displayName = 'MockIconSet';
  return IconSet;
}
