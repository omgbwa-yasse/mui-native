import { PulseTheme } from '../../../src/theme/presets/PulseTheme';

describe('PulseTheme', () => {
  it('has mode light', () => {
    expect(PulseTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(PulseTheme.colorScheme.primary).toBe('#FE2C55');
  });

  it('has correct secondary color', () => {
    expect(PulseTheme.colorScheme.secondary).toBe('#25F4EE');
  });

  it('has correct background color', () => {
    expect(PulseTheme.colorScheme.background).toBe('#FFFFFF');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(PulseTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(PulseTheme.darkColorScheme).toBeDefined();
    expect(PulseTheme.darkColorScheme?.background).toBe('#121212');
    expect(PulseTheme.darkColorScheme?.surface).toBe('#1E1E1E');
    expect(PulseTheme.darkColorScheme?.onBackground).toBe('#FFFFFF');
  });

  it('uses ProximaNova typography', () => {
    expect(PulseTheme.typography.bodyLarge.fontFamily).toContain('ProximaNova');
  });

  it('has correct shape scale', () => {
    expect(PulseTheme.shape.medium).toBe(20);
    expect(PulseTheme.shape.large).toBe(24);
    expect(PulseTheme.shape.extraLarge).toBe(32);
    expect(PulseTheme.shape.full).toBe(9999);
  });

  it('has all required typography styles', () => {
    const styles = [
      'displayLarge', 'displayMedium', 'displaySmall',
      'headlineLarge', 'headlineMedium', 'headlineSmall',
      'titleLarge', 'titleMedium', 'titleSmall',
      'bodyLarge', 'bodyMedium', 'bodySmall',
      'labelLarge', 'labelMedium', 'labelSmall',
    ] as const;
    styles.forEach((s) => {
      expect(PulseTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((PulseTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

