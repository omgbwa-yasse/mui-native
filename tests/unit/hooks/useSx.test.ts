import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { useSx } from '../../../src/hooks/useSx';
import { createTheme } from '../../../src/theme/createTheme';
import { baseLightColors } from '../../../src/tokens/colors';
import type { SxProps } from '../../../src/types/shared';

// Mock useWindowDimensions
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: jest.fn(() => ({ width: 400, height: 800, scale: 1, fontScale: 1 })),
}));

const theme = createTheme();

describe('useSx', () => {
  it('returns undefined when sx is undefined (zero allocation)', () => {
    const { result } = renderHook(() => useSx(undefined, theme));
    expect(result.current).toBeUndefined();
  });

  it('returns undefined when sx is null', () => {
    const { result } = renderHook(() => useSx(null as unknown as SxProps, theme));
    expect(result.current).toBeUndefined();
  });

  it('returns undefined when sx is false', () => {
    const { result } = renderHook(() => useSx(false as unknown as SxProps, theme));
    expect(result.current).toBeUndefined();
  });

  describe('spacing shorthand expansion', () => {
    it('mt resolves to marginTop using spacing tokens', () => {
      const { result } = renderHook(() => useSx({ mt: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ marginTop: 8 }));
    });

    it('mb resolves to marginBottom', () => {
      const { result } = renderHook(() => useSx({ mb: 3 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ marginBottom: 12 }));
    });

    it('mx resolves to marginHorizontal', () => {
      const { result } = renderHook(() => useSx({ mx: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ marginHorizontal: 8 }));
    });

    it('my resolves to marginVertical', () => {
      const { result } = renderHook(() => useSx({ my: 1 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ marginVertical: 4 }));
    });

    it('p resolves to padding', () => {
      const { result } = renderHook(() => useSx({ p: 4 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ padding: 16 }));
    });

    it('pt resolves to paddingTop', () => {
      const { result } = renderHook(() => useSx({ pt: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingTop: 8 }));
    });

    it('pb resolves to paddingBottom', () => {
      const { result } = renderHook(() => useSx({ pb: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingBottom: 8 }));
    });

    it('pl resolves to paddingLeft', () => {
      const { result } = renderHook(() => useSx({ pl: 1 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingLeft: 4 }));
    });

    it('pr resolves to paddingRight', () => {
      const { result } = renderHook(() => useSx({ pr: 1 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingRight: 4 }));
    });

    it('px resolves to paddingHorizontal', () => {
      const { result } = renderHook(() => useSx({ px: 3 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingHorizontal: 12 }));
    });

    it('py resolves to paddingVertical', () => {
      const { result } = renderHook(() => useSx({ py: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ paddingVertical: 8 }));
    });

    it('m resolves to margin', () => {
      const { result } = renderHook(() => useSx({ m: 2 }, theme));
      expect(result.current).toEqual(expect.objectContaining({ margin: 8 }));
    });
  });

  describe('color alias resolution', () => {
    it('bg "primary" resolves to theme.colorScheme.primary', () => {
      const { result } = renderHook(() => useSx({ bg: 'primary' }, theme));
      expect(result.current).toEqual(
        expect.objectContaining({ backgroundColor: baseLightColors.primary }),
      );
    });
  });

  describe('array flattening', () => {
    it('merges multiple sx objects left-to-right (last wins)', () => {
      const sx: SxProps = [{ mt: 2 }, { mt: 4 }];
      const { result } = renderHook(() => useSx(sx, theme));
      expect(result.current).toEqual(expect.objectContaining({ marginTop: 16 }));
    });

    it('filters out falsy items in array', () => {
      const sx: SxProps = [{ mt: 2 }, false, null, { px: 3 }];
      const { result } = renderHook(() => useSx(sx, theme));
      expect(result.current).toEqual(
        expect.objectContaining({ marginTop: 8, paddingHorizontal: 12 }),
      );
    });
  });

  describe('responsive breakpoints', () => {
    it('selects the correct breakpoint value based on viewport width', () => {
      // viewport width is mocked to 400, so 'xs' breakpoint (0) applies
      const { result } = renderHook(() =>
        useSx({ mt: { xs: 1, sm: 2, md: 3 } }, theme),
      );
      // width=400 < 600 (sm), so xs=1 → spacing[1]=4
      expect(result.current).toEqual(expect.objectContaining({ marginTop: 4 }));
    });
  });
});
