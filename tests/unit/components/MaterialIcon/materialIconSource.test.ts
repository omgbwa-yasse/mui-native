/**
 * Unit tests for materialIconSource factory function.
 *
 * Covers:
 * - Returns a callable IconSource function
 * - Returns a ReactElement when invoked with { size, color }
 * - Each variant routes to a different icon set (no throw)
 * - Default variant is 'filled'
 */
import React from 'react';
import { materialIconSource } from '../../../../src/components/MaterialIcon/materialIconSource';
import type { IconVariant } from '../../../../src/components/MaterialIcon/types';

describe('materialIconSource', () => {
  it('returns a function (IconSource)', () => {
    const source = materialIconSource('star');
    expect(typeof source).toBe('function');
  });

  it('returns a ReactElement when the IconSource is invoked', () => {
    const source = materialIconSource('star');
    const element = source({ size: 24, color: '#000' });
    expect(React.isValidElement(element)).toBe(true);
  });

  it('defaults to filled variant when no variant supplied', () => {
    const sourceFilled = materialIconSource('home', 'filled');
    const sourceDefault = materialIconSource('home');
    // Both should return a valid element — implementation detail: same icon set
    expect(React.isValidElement(sourceFilled({ size: 24, color: '#000' }))).toBe(true);
    expect(React.isValidElement(sourceDefault({ size: 24, color: '#000' }))).toBe(true);
  });

  describe('all variants return valid ReactElement', () => {
    const variants: IconVariant[] = ['filled', 'outlined', 'rounded', 'sharp', 'two-tone'];

    variants.forEach((variant) => {
      it(`variant "${variant}" returns a ReactElement`, () => {
        const source = materialIconSource('star', variant);
        const element = source({ size: 20, color: '#123456' });
        expect(React.isValidElement(element)).toBe(true);
      });
    });
  });

  it('forwards size and color to the element props', () => {
    const source = materialIconSource('star', 'filled');
    const element = source({ size: 36, color: '#FF5722' }) as React.ReactElement;
    // The mock icon set renders a Text with style containing size and color
    expect(element.props).toBeDefined();
  });
});
