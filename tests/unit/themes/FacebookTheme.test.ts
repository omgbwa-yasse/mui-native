import { NovaTheme } from '../../../src/theme/presets/NovaTheme';

describe('NovaTheme', () => {
  it('has mode light', () => {
    expect(NovaTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(NovaTheme.colorScheme.primary).toBe('#1877F2');
  });

  it('has correct secondary color', () => {
    expect(NovaTheme.colorScheme.secondary).toBe('#42B72A');
  });

  it('has correct background color', () => {
    expect(NovaTheme.colorScheme.background).toBe('#FFFFFF');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(NovaTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(NovaTheme.darkColorScheme).toBeDefined();
    expect(NovaTheme.darkColorScheme?.background).toBe('#18191A');
    expect(NovaTheme.darkColorScheme?.surface).toBe('#242526');
    expect(NovaTheme.darkColorScheme?.onBackground).toBe('#E4E6EB');
  });

  it('uses Helvetica Neue typography', () => {
    expect(NovaTheme.typography.bodyLarge.fontFamily).toContain('Helvetica Neue');
  });

  it('has correct shape scale', () => {
    expect(NovaTheme.shape.medium).toBe(6);
    expect(NovaTheme.shape.large).toBe(8);
    expect(NovaTheme.shape.extraLarge).toBe(10);
    expect(NovaTheme.shape.full).toBe(9999);
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
      expect(NovaTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((NovaTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

