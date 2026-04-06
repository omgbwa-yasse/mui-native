/**
 * T046 — Integration tests: registry completeness
 *
 * Validates structural invariants of the hand-authored catalogue registry:
 *   • All expected component keys are present
 *   • Every entry with examples has exactly 3 items
 *   • Exactly 15 entries carry hasFullExamples: true
 *
 * @mui-native is mocked so that importing the registry (which transitively
 * imports examples.tsx) does not trigger the full native-library load path.
 */

// ── Mock @mui-native to prevent loading the full library tree ──
jest.mock('@mui-native', () => {
  const React = require('react');
  const noop = () => null;
  return {
    Alert: noop,
    AppBar: noop,
    Avatar: noop,
    Button: noop,
    Card: noop,
    Chip: noop,
    CircularProgress: noop,
    Divider: noop,
    Drawer: noop,
    IconButton: noop,
    MaterialIcon: noop,
    Select: noop,
    Snackbar: noop,
    Stack: ({ children }: { children: React.ReactNode }) => children,
    Tabs: noop,
    Text: noop,
    TextField: noop,
    materialIconSource: () => noop,
    useTheme: () => ({ theme: { colorScheme: {} } }),
    spacing: new Proxy({} as Record<number, number>, { get: () => 4 }),
  };
});

import { registry } from '../../src/catalogue/registry';

describe('Registry completeness', () => {
  const allComponents = registry.categories.flatMap(c => c.components);

  it('contains exactly 78 component entries across all 5 categories', () => {
    expect(allComponents).toHaveLength(78);
  });

  it('every componentKey is unique', () => {
    const keys = allComponents.map(c => c.componentKey);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(allComponents.length);
  });

  it('each entry with examples has exactly 3 items', () => {
    for (const entry of allComponents) {
      if (entry.examples !== null) {
        expect(entry.examples).toHaveLength(3);
      }
    }
  });

  it('exactly 78 entries have hasFullExamples === true', () => {
    const fullCount = allComponents.filter(e => e.hasFullExamples).length;
    expect(fullCount).toBe(78);
  });

  it('hasFullExamples is true only when examples is non-null', () => {
    for (const entry of allComponents) {
      if (entry.hasFullExamples) {
        expect(entry.examples).not.toBeNull();
      } else {
        expect(entry.examples).toBeNull();
      }
    }
  });

  it('all 5 expected categories are present', () => {
    const categoryIds = registry.categories.map(c => c.id);
    expect(categoryIds).toEqual(
      expect.arrayContaining(['INPUTS', 'DATA_DISPLAY', 'FEEDBACK', 'NAVIGATION', 'LAYOUT']),
    );
    expect(categoryIds).toHaveLength(5);
  });
});
