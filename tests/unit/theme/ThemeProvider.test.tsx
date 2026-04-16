/**
 * ThemeProvider – Appearance auto-detect (T020) and controlled mode (T021) tests.
 */
import React from 'react';
import { act, render, renderHook } from '@testing-library/react-native';
import { Appearance } from 'react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { useTheme } from '../../../src/theme/ThemeContext';
import type { ColorMode, ThemeContextValue } from '../../../src/theme/types';

// ─── helpers ────────────────────────────────────────────────────────────────

const mockRemove = jest.fn();

function buildWrapper(mode?: ColorMode) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider mode={mode}>{children}</ThemeProvider>;
  };
}

// Consumer component for render()-based tests
function ThemeCapture({
  onRender,
}: {
  onRender: (ctx: ThemeContextValue) => void;
}) {
  const ctx = useTheme();
  React.useEffect(() => {
    onRender(ctx);
  });
  return null;
}

// ─── T020: auto-detect mode via Appearance ──────────────────────────────────

describe('ThemeProvider – auto-detect mode (T020)', () => {
  beforeEach(() => {
    mockRemove.mockReset();
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('light');
    jest
      .spyOn(Appearance, 'addChangeListener')
      .mockReturnValue({ remove: mockRemove } as ReturnType<
        typeof Appearance.addChangeListener
      >);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('defaults to light when Appearance returns light', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper(),
    });
    expect(result.current.mode).toBe('light');
  });

  it('defaults to dark when Appearance returns dark', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper(),
    });
    expect(result.current.mode).toBe('dark');
  });

  it('updates mode when OS appearance changes to dark', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper(),
    });
    expect(result.current.mode).toBe('light');

    // Grab the listener registered by the useEffect
    const listener = (Appearance.addChangeListener as jest.Mock).mock
      .calls[0][0] as (event: { colorScheme: string | null }) => void;

    act(() => {
      listener({ colorScheme: 'dark' });
    });

    expect(result.current.mode).toBe('dark');
  });

  it('updates mode when OS appearance changes back to light', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper(),
    });
    expect(result.current.mode).toBe('dark');

    const listener = (Appearance.addChangeListener as jest.Mock).mock
      .calls[0][0] as (event: { colorScheme: string | null }) => void;

    act(() => {
      listener({ colorScheme: 'light' });
    });

    expect(result.current.mode).toBe('light');
  });

  it('removes the Appearance listener on unmount', () => {
    const { unmount } = renderHook(() => useTheme(), {
      wrapper: buildWrapper(),
    });
    unmount();
    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it('subscribes to Appearance when no mode prop is provided', () => {
    renderHook(() => useTheme(), { wrapper: buildWrapper() });
    expect(Appearance.addChangeListener).toHaveBeenCalledTimes(1);
  });
});

// ─── T021: controlled mode prop ─────────────────────────────────────────────

describe('ThemeProvider – controlled mode (T021)', () => {
  beforeEach(() => {
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('light');
    jest
      .spyOn(Appearance, 'addChangeListener')
      .mockReturnValue({ remove: jest.fn() } as ReturnType<
        typeof Appearance.addChangeListener
      >);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the provided dark mode prop', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper('dark'),
    });
    expect(result.current.mode).toBe('dark');
  });

  it('uses the provided light mode prop', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper('light'),
    });
    expect(result.current.mode).toBe('light');
  });

  it('does NOT subscribe to Appearance when mode prop is provided', () => {
    renderHook(() => useTheme(), { wrapper: buildWrapper('dark') });
    expect(Appearance.addChangeListener).not.toHaveBeenCalled();
  });

  it('theme.mode reflects the controlled mode prop', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: buildWrapper('dark'),
    });
    expect(result.current.theme.mode).toBe('dark');
  });

  it('follows mode prop changes via re-render', () => {
    let capturedMode: ColorMode = 'light';
    const onRender = (ctx: ThemeContextValue) => {
      capturedMode = ctx.mode;
    };

    const { rerender } = render(
      <ThemeProvider mode="dark">
        <ThemeCapture onRender={onRender} />
      </ThemeProvider>,
    );
    expect(capturedMode).toBe('dark');

    rerender(
      <ThemeProvider mode="light">
        <ThemeCapture onRender={onRender} />
      </ThemeProvider>,
    );
    expect(capturedMode).toBe('light');
  });
});
