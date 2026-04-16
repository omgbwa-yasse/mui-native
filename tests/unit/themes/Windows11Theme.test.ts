import { AuroraTheme } from '../../../src/theme/presets/AuroraTheme';

describe('AuroraTheme', () => {
  it('has mode light', () => {
    expect(AuroraTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(AuroraTheme.colorScheme.primary).toBe('#0078D4');
  });

  it('has correct secondary color', () => {
    expect(AuroraTheme.colorScheme.secondary).toBe('#8764B8');
  });

  it('has correct background color', () => {
    expect(AuroraTheme.colorScheme.background).toBe('#F3F3F3');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(AuroraTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(AuroraTheme.darkColorScheme).toBeDefined();
    expect(AuroraTheme.darkColorScheme?.background).toBe('#202020');
    expect(AuroraTheme.darkColorScheme?.surface).toBe('#2C2C2C');
  });

  it('uses Segoe UI Variable typography', () => {
    expect(AuroraTheme.typography.bodyLarge.fontFamily).toContain('Segoe UI Variable');
  });

  it('has correct shape scale', () => {
    expect(AuroraTheme.shape.medium).toBe(4);
    expect(AuroraTheme.shape.large).toBe(8);
    expect(AuroraTheme.shape.extraLarge).toBe(8);
    expect(AuroraTheme.shape.full).toBe(9999);
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
      expect(AuroraTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((AuroraTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

