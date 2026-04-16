/**
 * Dark mode composition test (T022):
 * Verifies that ThemeProvider merges `darkColorScheme` over `colorScheme`
 * when `mode="dark"` is set and a platform preset supplies `darkColorScheme`.
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { Appearance } from 'react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { useTheme } from '../../../src/theme/ThemeContext';
import { PureTheme } from '../../../src/theme/presets/PureTheme';
import { BeautifulTheme } from '../../../src/theme/presets/BeautifulTheme';
import { PulseTheme } from '../../../src/theme/presets/PulseTheme';
import type { ThemeContextValue } from '../../../src/theme/types';

// ─── helpers ────────────────────────────────────────────────────────────────

function ThemeCapture({
  onRender,
}: {
  onRender: (ctx: ThemeContextValue) => void;
}) {
  const ctx = useTheme();
  onRender(ctx);
  return null;
}

function renderDark(preset: object): ThemeContextValue {
  let captured!: ThemeContextValue;
  render(
    <ThemeProvider mode="dark" theme={preset as never}>
      <ThemeCapture onRender={(ctx) => { captured = ctx; }} />
    </ThemeProvider>,
  );
  return captured;
}

function renderLight(preset: object): ThemeContextValue {
  let captured!: ThemeContextValue;
  render(
    <ThemeProvider mode="light" theme={preset as never}>
      <ThemeCapture onRender={(ctx) => { captured = ctx; }} />
    </ThemeProvider>,
  );
  return captured;
}

// ─── setup: stub Appearance so ThemeProvider doesn't read native API ─────────

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

// ─── iPhone – dark mode merges dark overrides ────────────────────────────────

describe('PureTheme dark mode composition', () => {
  it('background switches to dark value (#000000) in dark mode', () => {
    const ctx = renderDark(PureTheme);
    expect(ctx.theme.colorScheme.background).toBe('#000000');
  });

  it('surface switches to dark value (#1C1C1E) in dark mode', () => {
    const ctx = renderDark(PureTheme);
    expect(ctx.theme.colorScheme.surface).toBe('#1C1C1E');
  });

  it('primary switches to #0A84FF in dark mode', () => {
    const ctx = renderDark(PureTheme);
    expect(ctx.theme.colorScheme.primary).toBe('#0A84FF');
  });

  it('retains light background (#F2F2F7) in light mode', () => {
    const ctx = renderLight(PureTheme);
    expect(ctx.theme.colorScheme.background).toBe('#F2F2F7');
  });

  it('retains light surface (#FFFFFF) in light mode', () => {
    const ctx = renderLight(PureTheme);
    expect(ctx.theme.colorScheme.surface).toBe('#FFFFFF');
  });
});

// ─── Ubuntu – dark background is distinct from light ─────────────────────────

describe('BeautifulTheme dark mode composition', () => {
  it('applies dark background override in dark mode', () => {
    const ctx = renderDark(BeautifulTheme);
    const darkBg = BeautifulTheme.darkColorScheme?.background;
    expect(ctx.theme.colorScheme.background).toBe(darkBg);
  });

  it('retains light background in light mode', () => {
    const ctx = renderLight(BeautifulTheme);
    expect(ctx.theme.colorScheme.background).toBe('#FFFFFF');
  });
});

// ─── TikTok – dark mode surface differs from light ───────────────────────────

describe('PulseTheme dark mode composition', () => {
  it('applies dark surface override in dark mode', () => {
    const ctx = renderDark(PulseTheme);
    const darkSurface = PulseTheme.darkColorScheme?.surface;
    expect(ctx.theme.colorScheme.surface).toBe(darkSurface);
  });
});

// ─── theme.mode reflects mode prop ───────────────────────────────────────────

describe('theme.mode in context', () => {
  it('is "dark" when mode="dark"', () => {
    const ctx = renderDark(PureTheme);
    expect(ctx.theme.mode).toBe('dark');
    expect(ctx.mode).toBe('dark');
  });

  it('is "light" when mode="light"', () => {
    const ctx = renderLight(PureTheme);
    expect(ctx.theme.mode).toBe('light');
    expect(ctx.mode).toBe('light');
  });
});

