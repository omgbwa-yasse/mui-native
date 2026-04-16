import { PureTheme } from '../../../src/theme/presets/PureTheme';

describe('PureTheme', () => {
  it('has mode light', () => {
    expect(PureTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(PureTheme.colorScheme.primary).toBe('#007AFF');
  });

  it('has correct secondary color', () => {
    expect(PureTheme.colorScheme.secondary).toBe('#34C759');
  });

  it('has correct background color', () => {
    expect(PureTheme.colorScheme.background).toBe('#F2F2F7');
  });

  it('has correct surface color', () => {
    expect(PureTheme.colorScheme.surface).toBe('#FFFFFF');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(PureTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(PureTheme.darkColorScheme).toBeDefined();
    expect(PureTheme.darkColorScheme?.background).toBe('#000000');
    expect(PureTheme.darkColorScheme?.surface).toBe('#1C1C1E');
    expect(PureTheme.darkColorScheme?.onBackground).toBe('#FFFFFF');
  });

  it('uses SF Pro typography', () => {
    expect(PureTheme.typography.bodyLarge.fontFamily).toContain('SF Pro');
  });

  it('has correct shape scale', () => {
    expect(PureTheme.shape.medium).toBe(14);
    expect(PureTheme.shape.large).toBe(18);
    expect(PureTheme.shape.extraLarge).toBe(22);
    expect(PureTheme.shape.full).toBe(9999);
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
      expect(PureTheme.typography[s]).toBeDefined();
      expect(typeof PureTheme.typography[s].fontSize).toBe('number');
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((PureTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

