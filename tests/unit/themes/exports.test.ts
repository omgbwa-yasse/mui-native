/**
 * Library-root theme exports test (T024 – US5).
 * Verifies that all 7 platform themes are discoverable and properly typed
 * when exported from the presets module.
 */
import { PureTheme } from '../../../src/theme/presets/PureTheme';
import { BeautifulTheme } from '../../../src/theme/presets/BeautifulTheme';
import { PencilTheme } from '../../../src/theme/presets/PencilTheme';
import { AuroraTheme } from '../../../src/theme/presets/AuroraTheme';
import { BreezeTheme } from '../../../src/theme/presets/BreezeTheme';
import { NovaTheme } from '../../../src/theme/presets/NovaTheme';
import { PulseTheme } from '../../../src/theme/presets/PulseTheme';
import type { Theme } from '../../../src/theme/types';

// ─── helpers ────────────────────────────────────────────────────────────────

function assertValidTheme(theme: unknown, name: string): asserts theme is Theme {
  expect(theme).toBeTruthy();
  if (typeof theme !== 'object' || theme === null) {
    throw new Error(`${name} is not an object`);
  }
  const t = theme as Record<string, unknown>;
  expect(t.colorScheme).toBeDefined();
  expect(t.darkColorScheme).toBeDefined();
  expect(t.typography).toBeDefined();
  expect(t.shape).toBeDefined();
  expect(t.elevation).toBeDefined();
  expect(t.mode).toBeDefined();
}

// ─── US5: all 7 themes are discoverable from library root ──────────────────

describe('Platform themes – library-root exports (T024 – US5)', () => {
  it('PureTheme is exported and has all required fields', () => {
    assertValidTheme(PureTheme, 'PureTheme');
  });

  it('BeautifulTheme is exported and has all required fields', () => {
    assertValidTheme(BeautifulTheme, 'BeautifulTheme');
  });

  it('PencilTheme is exported and has all required fields', () => {
    assertValidTheme(PencilTheme, 'PencilTheme');
  });

  it('AuroraTheme is exported and has all required fields', () => {
    assertValidTheme(AuroraTheme, 'AuroraTheme');
  });

  it('BreezeTheme is exported and has all required fields', () => {
    assertValidTheme(BreezeTheme, 'BreezeTheme');
  });

  it('NovaTheme is exported and has all required fields', () => {
    assertValidTheme(NovaTheme, 'NovaTheme');
  });

  it('PulseTheme is exported and has all required fields', () => {
    assertValidTheme(PulseTheme, 'PulseTheme');
  });

  // ─── SC-003: TypeScript strict mode (no `any` types) ──────────────────

  it('passes TypeScript strict-mode type checking (FR-009, SC-003)', () => {
    // This test verifies that all exports satisfy the Theme interface
    // Type checking happens at compile-time; if this file type-checks,
    // SC-003 is satisfied.
    const themes: Theme[] = [
      PureTheme,
      BeautifulTheme,
      PencilTheme,
      AuroraTheme,
      BreezeTheme,
      NovaTheme,
      PulseTheme,
    ];

    // Each theme has all required fields
    themes.forEach((theme) => {
      expect(theme.colorScheme).toBeDefined();
      expect(theme.typography).toBeDefined();
      expect(theme.shape).toBeDefined();
      expect(theme.elevation).toBeDefined();
      expect(theme.mode).toBe('light'); // All presets default to light mode
    });
  });

  // ─── all 7 themes are the correct objects ──────────────────────────────

  it('PureTheme has iOS-specific primary color', () => {
    expect(PureTheme.colorScheme.primary).toBe('#007AFF');
  });

  it('BeautifulTheme has Ubuntu-specific primary color', () => {
    expect(BeautifulTheme.colorScheme.primary).toBe('#E95420');
  });

  it('PencilTheme has Microsoft-specific primary color', () => {
    expect(PencilTheme.colorScheme.primary).toBe('#0078D4');
  });

  it('AuroraTheme has Fluent Design primary color', () => {
    expect(AuroraTheme.colorScheme.primary).toBe('#0078D4');
  });

  it('BreezeTheme has Aqua-specific primary color', () => {
    expect(BreezeTheme.colorScheme.primary).toBe('#007AFF');
  });

  it('NovaTheme has Meta-specific primary color', () => {
    expect(NovaTheme.colorScheme.primary).toBe('#1877F2');
  });

  it('PulseTheme has TikTok-specific primary color', () => {
    expect(PulseTheme.colorScheme.primary).toBe('#FE2C55');
  });
});

