import { BeautifulTheme } from '../../../src/theme/presets/BeautifulTheme';

describe('BeautifulTheme', () => {
  it('has mode light', () => {
    expect(BeautifulTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(BeautifulTheme.colorScheme.primary).toBe('#E95420');
  });

  it('has correct secondary color', () => {
    expect(BeautifulTheme.colorScheme.secondary).toBe('#772953');
  });

  it('has correct background color', () => {
    expect(BeautifulTheme.colorScheme.background).toBe('#FFFFFF');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(BeautifulTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(BeautifulTheme.darkColorScheme).toBeDefined();
    expect(BeautifulTheme.darkColorScheme?.background).toBe('#300A24');
    expect(BeautifulTheme.darkColorScheme?.surface).toBe('#1F0A1A');
  });

  it('uses Ubuntu typography', () => {
    expect(BeautifulTheme.typography.bodyLarge.fontFamily).toContain('Ubuntu');
  });

  it('has correct shape scale', () => {
    expect(BeautifulTheme.shape.medium).toBe(8);
    expect(BeautifulTheme.shape.large).toBe(12);
    expect(BeautifulTheme.shape.extraLarge).toBe(28);
    expect(BeautifulTheme.shape.full).toBe(9999);
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
      expect(BeautifulTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((BeautifulTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

