import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { useColorRole } from '../../../src/hooks/useColorRole';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { baseLightColors } from '../../../src/tokens/colors';
import { colorRoleMap } from '../../../src/types/shared';
import type { ColorProp } from '../../../src/types/shared';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useColorRole', () => {
  const ALL_COLORS: ColorProp[] = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'info'];

  it.each(ALL_COLORS)('maps "%s" to the correct 4 colorScheme keys', (color) => {
    const { result } = renderHook(() => useColorRole(color), { wrapper });
    const roles = colorRoleMap[color];
    expect(result.current.bg).toBe(baseLightColors[roles.bg]);
    expect(result.current.fg).toBe(baseLightColors[roles.fg]);
    expect(result.current.container).toBe(baseLightColors[roles.container]);
    expect(result.current.onContainer).toBe(baseLightColors[roles.onContainer]);
  });

  it('defaults to "primary" when color is undefined', () => {
    const { result } = renderHook(() => useColorRole(undefined), { wrapper });
    const roles = colorRoleMap['primary'];
    expect(result.current.bg).toBe(baseLightColors[roles.bg]);
    expect(result.current.fg).toBe(baseLightColors[roles.fg]);
    expect(result.current.container).toBe(baseLightColors[roles.container]);
    expect(result.current.onContainer).toBe(baseLightColors[roles.onContainer]);
  });
});
