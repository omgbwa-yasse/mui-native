import { BreezeTheme } from '../../../src/theme/presets/BreezeTheme';

describe('BreezeTheme', () => {
  it('has mode light', () => {
    expect(BreezeTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(BreezeTheme.colorScheme.primary).toBe('#007AFF');
  });

  it('has correct secondary color', () => {
    expect(BreezeTheme.colorScheme.secondary).toBe('#5856D6');
  });

  it('has correct background color', () => {
    expect(BreezeTheme.colorScheme.background).toBe('#ECECEC');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(BreezeTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(BreezeTheme.darkColorScheme).toBeDefined();
    expect(BreezeTheme.darkColorScheme?.background).toBe('#1E1E1E');
    expect(BreezeTheme.darkColorScheme?.surface).toBe('#2A2A2A');
    expect(BreezeTheme.darkColorScheme?.onBackground).toBe('#FFFFFF');
  });

  it('uses SF Pro typography', () => {
    expect(BreezeTheme.typography.bodyLarge.fontFamily).toContain('SF Pro');
  });

  it('has correct shape scale', () => {
    expect(BreezeTheme.shape.medium).toBe(6);
    expect(BreezeTheme.shape.large).toBe(10);
    expect(BreezeTheme.shape.extraLarge).toBe(16);
    expect(BreezeTheme.shape.full).toBe(9999);
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
      expect(BreezeTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((BreezeTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

