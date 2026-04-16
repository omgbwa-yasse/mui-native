/**
 * Theme composition and override test (T023 – US4).
 * Verifies that platform themes can be composed with custom overrides via createTheme(),
 * and that overridden themes work correctly when passed to ThemeProvider.
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { useTheme } from '../../../src/theme/ThemeContext';
import { createTheme } from '../../../src/theme/createTheme';
import { PureTheme } from '../../../src/theme/presets/PureTheme';
import { AuroraTheme } from '../../../src/theme/presets/AuroraTheme';
import type { ColorMode, ThemeContextValue } from '../../../src/theme/types';

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

function renderWithTheme(theme: object, mode?: ColorMode): ThemeContextValue {
  let captured!: ThemeContextValue;
  render(
    <ThemeProvider theme={theme as never} mode={mode}>
      <ThemeCapture onRender={(ctx) => { captured = ctx; }} />
    </ThemeProvider>,
  );
  return captured;
}

// ─── US4: override primary color ─────────────────────────────────────────────

describe('override primary color on PureTheme', () => {
  it('changes only primary; all other roles unchanged', () => {
    const overridden = createTheme({
      overrides: {
        ...PureTheme,
        colorScheme: {
          ...PureTheme.colorScheme,
          primary: '#FF0000', // red override
        },
      },
    });

    // Primary is changed
    expect(overridden.colorScheme.primary).toBe('#FF0000');
    // Other values preserved from PureTheme
    expect(overridden.colorScheme.secondary).toBe('#34C759');
    expect(overridden.colorScheme.background).toBe('#F2F2F7');
    expect(overridden.colorScheme.surface).toBe('#FFFFFF');
  });
});

// ─── override shape levels ──────────────────────────────────────────────────

describe('override shape.medium on AuroraTheme', () => {
  it('changes only specified shape level; others unchanged', () => {
    const overridden = createTheme({
      overrides: {
        ...AuroraTheme,
        shape: {
          ...AuroraTheme.shape,
          medium: 99, // override medium
        },
      },
    });

    // Medium is changed
    expect(overridden.shape.medium).toBe(99);
    // Other shape levels preserved from AuroraTheme
    expect(overridden.shape.small).toBe(AuroraTheme.shape.small);
    expect(overridden.shape.large).toBe(AuroraTheme.shape.large);
    expect(overridden.shape.full).toBe(AuroraTheme.shape.full);
  });
});

// ─── pass overridden theme to ThemeProvider ────────────────────────────────

describe('pass overridden theme to ThemeProvider', () => {
  it('reflects merged values in context', () => {
    const overridden = createTheme({
      overrides: {
        ...PureTheme,
        colorScheme: {
          ...PureTheme.colorScheme,
          primary: '#00FF00', // green override
        },
      },
    });

    const ctx = renderWithTheme(overridden);

    // Override is reflected in context
    expect(ctx.theme.colorScheme.primary).toBe('#00FF00');
    // Other preset values are intact
    expect(ctx.theme.colorScheme.secondary).toBe('#34C759');
    expect(ctx.theme.typography.displayLarge).toBeDefined();
    expect(ctx.theme.shape).toBeDefined();
  });

  it('works with both light and dark mode', () => {
    const overridden = createTheme({
      overrides: {
        ...PureTheme,
        colorScheme: {
          ...PureTheme.colorScheme,
          primary: '#00FF00', // green override
        },
      },
    });

    // Light mode — override is reflected
    const ctxLight = renderWithTheme(overridden, 'light');
    expect(ctxLight.theme.colorScheme.primary).toBe('#00FF00');
    expect(ctxLight.theme.mode).toBe('light');

    // Dark mode — when spreading a preset with overrides, the preset's darkColorScheme
    // still applies (merge happens in ThemeProvider after createTheme merges overrides).
    // This is expected behavior: use darkColorScheme to customize dark mode if needed.
    const ctxDark = renderWithTheme(overridden, 'dark');
    expect(ctxDark.theme.mode).toBe('dark');
    // In dark mode, darkColorScheme.primary from PureTheme applies
    expect(ctxDark.theme.colorScheme.primary).toBe(PureTheme.darkColorScheme?.primary);
  });
});

// ─── regression: existing tests unaffected ──────────────────────────────────

describe('composition does not cause regressions', () => {
  it('original preset is unmodified', () => {
    const original = PureTheme;
    const _ = createTheme({
      overrides: {
        ...original,
        colorScheme: {
          ...original.colorScheme,
          primary: '#AABBCC',
        },
      },
    });

    // Original still has its original value
    expect(original.colorScheme.primary).toBe('#007AFF');
  });
});

