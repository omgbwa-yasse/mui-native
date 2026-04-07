import { renderHook } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { useMediaQuery } from '../../../src/hooks/useMediaQuery';

let dimSpy: jest.SpyInstance;

beforeEach(() => {
  dimSpy = jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 375, height: 800, scale: 1, fontScale: 1 });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const mockWidth = (w: number) => {
  dimSpy.mockReturnValue({ width: w, height: 800, scale: 1, fontScale: 1 });
};

describe('useMediaQuery — named breakpoints', () => {
  it('xs (0) matches any width', () => {
    mockWidth(320);
    const { result } = renderHook(() => useMediaQuery('xs'));
    expect(result.current).toBe(true);
  });

  it('sm (600) true at 600', () => {
    mockWidth(600);
    const { result } = renderHook(() => useMediaQuery('sm'));
    expect(result.current).toBe(true);
  });

  it('sm (600) false at 599', () => {
    mockWidth(599);
    const { result } = renderHook(() => useMediaQuery('sm'));
    expect(result.current).toBe(false);
  });

  it('md (900) true at 900', () => {
    mockWidth(900);
    const { result } = renderHook(() => useMediaQuery('md'));
    expect(result.current).toBe(true);
  });

  it('lg (1200) false at 1199', () => {
    mockWidth(1199);
    const { result } = renderHook(() => useMediaQuery('lg'));
    expect(result.current).toBe(false);
  });

  it('xl (1536) true at 1536', () => {
    mockWidth(1536);
    const { result } = renderHook(() => useMediaQuery('xl'));
    expect(result.current).toBe(true);
  });
});

describe('useMediaQuery — min-width queries', () => {
  it('(min-width: 600px) true at 600', () => {
    mockWidth(600);
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('(min-width: 600px) false at 599', () => {
    mockWidth(599);
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
    expect(result.current).toBe(false);
  });
});

describe('useMediaQuery — max-width queries', () => {
  it('(max-width: 899px) true at 899', () => {
    mockWidth(899);
    const { result } = renderHook(() => useMediaQuery('(max-width: 899px)'));
    expect(result.current).toBe(true);
  });

  it('(max-width: 899px) false at 900', () => {
    mockWidth(900);
    const { result } = renderHook(() => useMediaQuery('(max-width: 899px)'));
    expect(result.current).toBe(false);
  });
});

describe('useMediaQuery — unknown query', () => {
  it('returns false for unrecognised query string', () => {
    mockWidth(1000);
    const { result } = renderHook(() => useMediaQuery('(orientation: landscape)'));
    expect(result.current).toBe(false);
  });
});
