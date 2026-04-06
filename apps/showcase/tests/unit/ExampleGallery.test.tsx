/**
 * T043 — Unit tests for ExampleGallery component
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import ExampleGallery from '../../src/components/ExampleGallery';
import {
  LayoutPreferenceProvider,
  LayoutPreferenceContext,
} from '../../src/context/LayoutPreferenceContext';
import type { ExampleConfig } from '../../src/catalogue/types';

const EXAMPLES: ExampleConfig[] = [
  { label: 'Alpha', render: () => <Text>Alpha content</Text> },
  { label: 'Beta', render: () => <Text>Beta content</Text> },
  { label: 'Gamma', render: () => <Text>Gamma content</Text> },
];

describe('ExampleGallery', () => {
  it('renders 3 example labels', () => {
    const { getByText } = render(
      <LayoutPreferenceProvider>
        <ExampleGallery examples={EXAMPLES} />
      </LayoutPreferenceProvider>,
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Beta')).toBeTruthy();
    expect(getByText('Gamma')).toBeTruthy();
  });

  it('renders ScrollView with horizontal={false} by default (vertical direction)', () => {
    const { UNSAFE_getByProps } = render(
      <LayoutPreferenceProvider>
        <ExampleGallery examples={EXAMPLES} />
      </LayoutPreferenceProvider>,
    );
    expect(UNSAFE_getByProps({ horizontal: false })).toBeTruthy();
  });

  it('renders ScrollView with horizontal={true} when direction is horizontal', () => {
    const { UNSAFE_getByProps } = render(
      <LayoutPreferenceContext.Provider
        value={{ direction: 'horizontal', toggle: jest.fn() }}
      >
        <ExampleGallery examples={EXAMPLES} />
      </LayoutPreferenceContext.Provider>,
    );
    expect(UNSAFE_getByProps({ horizontal: true })).toBeTruthy();
  });
});
