import { PencilTheme } from '../../../src/theme/presets/PencilTheme';

describe('PencilTheme', () => {
  it('has mode light', () => {
    expect(PencilTheme.mode).toBe('light');
  });

  it('has correct primary color', () => {
    expect(PencilTheme.colorScheme.primary).toBe('#0078D4');
  });

  it('has correct secondary color', () => {
    expect(PencilTheme.colorScheme.secondary).toBe('#2B88D8');
  });

  it('has correct surface color', () => {
    expect(PencilTheme.colorScheme.surface).toBe('#F5F5F5');
  });

  it('provides full colorScheme with all required roles', () => {
    expect(Object.keys(PencilTheme.colorScheme).length).toBeGreaterThanOrEqual(42);
  });

  it('provides darkColorScheme overrides', () => {
    expect(PencilTheme.darkColorScheme).toBeDefined();
    expect(PencilTheme.darkColorScheme?.background).toBe('#1F1F1F');
    expect(PencilTheme.darkColorScheme?.surface).toBe('#2D2D2D');
    expect(PencilTheme.darkColorScheme?.primary).toBe('#2B88D8');
  });

  it('uses Segoe UI typography', () => {
    expect(PencilTheme.typography.bodyLarge.fontFamily).toContain('Segoe UI');
  });

  it('has correct shape scale', () => {
    expect(PencilTheme.shape.medium).toBe(4);
    expect(PencilTheme.shape.large).toBe(6);
    expect(PencilTheme.shape.extraLarge).toBe(8);
    expect(PencilTheme.shape.full).toBe(9999);
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
      expect(PencilTheme.typography[s]).toBeDefined();
    });
  });

  it('has all elevation levels', () => {
    ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'].forEach((lvl) => {
      expect((PencilTheme.elevation as Record<string, unknown>)[lvl]).toBeDefined();
    });
  });
});

