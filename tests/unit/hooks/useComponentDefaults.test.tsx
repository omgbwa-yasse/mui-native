import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { useComponentDefaults } from '../../../src/hooks/useComponentDefaults';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';

// Helper that wraps with a ThemeProvider containing component config
function createWrapper(components?: Record<string, unknown>) {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={components ? { components } : undefined}>
      {children}
    </ThemeProvider>
  );
}

describe('useComponentDefaults', () => {
  it('returns instanceProps unchanged when theme has no component entry', () => {
    const wrapper = createWrapper();
    const instanceProps = { label: 'Test', variant: 'filled' as const };
    const { result } = renderHook(
      () => useComponentDefaults('Button', instanceProps),
      { wrapper },
    );
    expect(result.current).toBe(instanceProps); // same reference
  });

  it('uses defaultProps value when instance prop is undefined', () => {
    const wrapper = createWrapper({
      Button: { defaultProps: { variant: 'tonal' } },
    });
    const { result } = renderHook(
      () => useComponentDefaults('Button', { label: 'Test' } as any),
      { wrapper },
    );
    expect(result.current.variant).toBe('tonal');
    expect((result.current as any).label).toBe('Test');
  });

  it('instance prop wins over defaultProps when both are defined', () => {
    const wrapper = createWrapper({
      Button: { defaultProps: { variant: 'tonal' } },
    });
    const { result } = renderHook(
      () => useComponentDefaults('Button', { label: 'Test', variant: 'filled' } as any),
      { wrapper },
    );
    expect(result.current.variant).toBe('filled');
  });
});
