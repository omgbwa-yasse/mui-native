/**
 * T045 — Integration tests: navigation flow
 *
 * Tests the three-screen navigation path:
 *   HomeScreen → CategoryListScreen → ComponentDetailScreen
 *
 * Screens are rendered with mock navigation props to avoid the full
 * native-stack infrastructure. Each screen's navigation intent is
 * verified via the mocked `navigate` / `setOptions` callbacks.
 */

// ── Mock @mui-native (useTheme, spacing, MaterialIcon used by all screens) ──
jest.mock('@mui-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const mockColors = {
    surface: '#ffffff',
    background: '#fafafa',
    onSurface: '#000000',
    onSurfaceVariant: '#666666',
    primaryContainer: '#e8eaf6',
    primary: '#6200ee',
    shadow: '#000000',
  };
  const noop = () => React.createElement(View);
  return {
    useTheme: () => ({ theme: { colorScheme: mockColors } }),
    spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24 },
    MaterialIcon: noop,
    IconButton: noop,
    materialIconSource: () => noop,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

// ── Mock syntax highlighter (used transitively by CodeBlock) ──
jest.mock('react-native-syntax-highlighter', () => () => null);
jest.mock('react-syntax-highlighter/styles/hljs', () => ({ atomOneDark: {} }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import CategoryListScreen from '../../src/screens/CategoryListScreen';
import ComponentDetailScreen from '../../src/screens/ComponentDetailScreen';
import { LayoutPreferenceProvider } from '../../src/context/LayoutPreferenceContext';

/** Wraps children in the LayoutPreferenceProvider required by all screens. */
function wrap(element: React.ReactElement) {
  return <LayoutPreferenceProvider>{element}</LayoutPreferenceProvider>;
}

// ────────────────────────────────────────────────────────────────────────────
// HomeScreen
// ────────────────────────────────────────────────────────────────────────────
describe('HomeScreen', () => {
  const navigate = jest.fn();

  beforeEach(() => navigate.mockClear());

  it('renders all 5 category labels', () => {
    const { getByText } = render(
      wrap(<HomeScreen navigation={{ navigate } as any} route={{} as any} />),
    );
    expect(getByText('Inputs')).toBeTruthy();
    expect(getByText('Data Display')).toBeTruthy();
    expect(getByText('Feedback')).toBeTruthy();
    expect(getByText('Navigation')).toBeTruthy();
    expect(getByText('Layout')).toBeTruthy();
  });

  it('navigates to CategoryList with correct categoryId when a category is pressed', () => {
    const { getByText } = render(
      wrap(<HomeScreen navigation={{ navigate } as any} route={{} as any} />),
    );
    fireEvent.press(getByText('Inputs'));
    expect(navigate).toHaveBeenCalledWith('CategoryList', { categoryId: 'INPUTS' });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// CategoryListScreen
// ────────────────────────────────────────────────────────────────────────────
describe('CategoryListScreen', () => {
  const navigate = jest.fn();

  beforeEach(() => navigate.mockClear());

  it('lists components belonging to the given category', () => {
    const { getByText } = render(
      wrap(
        <CategoryListScreen
          navigation={{ navigate } as any}
          route={{ params: { categoryId: 'INPUTS' } } as any}
        />,
      ),
    );
    // Button is always the first priority entry in the INPUTS category
    expect(getByText('Button')).toBeTruthy();
  });

  it('navigates to ComponentDetail with correct params when a component is pressed', () => {
    const { getByText } = render(
      wrap(
        <CategoryListScreen
          navigation={{ navigate } as any}
          route={{ params: { categoryId: 'INPUTS' } } as any}
        />,
      ),
    );
    fireEvent.press(getByText('Button'));
    expect(navigate).toHaveBeenCalledWith('ComponentDetail', {
      categoryId: 'INPUTS',
      componentKey: 'Button',
    });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// ComponentDetailScreen
// ────────────────────────────────────────────────────────────────────────────
describe('ComponentDetailScreen', () => {
  it('renders the component name for a known componentKey', () => {
    const setOptions = jest.fn();
    const { getByText } = render(
      wrap(
        <ComponentDetailScreen
          navigation={{ setOptions } as any}
          route={{ params: { componentKey: 'Accordion' } } as any}
        />,
      ),
    );
    expect(getByText('Accordion')).toBeTruthy();
  });

  it('renders a not-found message for an unknown componentKey', () => {
    const setOptions = jest.fn();
    const { getByText } = render(
      wrap(
        <ComponentDetailScreen
          navigation={{ setOptions } as any}
          route={{ params: { componentKey: '__nonexistent__' } } as any}
        />,
      ),
    );
    expect(getByText(/Component not found/)).toBeTruthy();
  });

  it('calls navigation.setOptions with the component name as title', () => {
    const setOptions = jest.fn();
    render(
      wrap(
        <ComponentDetailScreen
          navigation={{ setOptions } as any}
          route={{ params: { componentKey: 'Accordion' } } as any}
        />,
      ),
    );
    expect(setOptions).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Accordion' }),
    );
  });
});
