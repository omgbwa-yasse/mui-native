/**
 * @jest-environment jsdom
 */
import { createTheme } from '../../src/theme/createTheme';
import { buildRnmCoreTheme } from '../../src/adapters/rnm-core-adapter';

describe('US4 – rnm-core adapter', () => {
  it('maps rn-material light theme colors to rnm-core palette', () => {
    const theme = createTheme({ mode: 'light' });
    const rnmTheme = buildRnmCoreTheme(theme);

    expect(rnmTheme.palette.primary).toBe(theme.colorScheme.primary);
    expect(rnmTheme.palette.onPrimary).toBe(theme.colorScheme.onPrimary);
    expect(rnmTheme.palette.secondary).toBe(theme.colorScheme.secondary);
    expect(rnmTheme.palette.background).toBe(theme.colorScheme.background);
    expect(rnmTheme.palette.surface).toBe(theme.colorScheme.surface);
    expect(rnmTheme.palette.error).toBe(theme.colorScheme.error);
  });

  it('maps rn-material dark theme colors to rnm-core palette', () => {
    const theme = createTheme({ mode: 'dark' });
    const rnmTheme = buildRnmCoreTheme(theme);

    expect(rnmTheme.palette.primary).toBe(theme.colorScheme.primary);
    expect(rnmTheme.palette.background).toBe(theme.colorScheme.background);
  });

  it('preserves rn-material typography in rnm-core theme', () => {
    const theme = createTheme();
    const rnmTheme = buildRnmCoreTheme(theme);

    expect(rnmTheme.typography).toBe(theme.typography);
  });

  it('produces distinct palette for light vs dark mode', () => {
    const lightTheme = createTheme({ mode: 'light' });
    const darkTheme = createTheme({ mode: 'dark' });

    const lightRnm = buildRnmCoreTheme(lightTheme);
    const darkRnm = buildRnmCoreTheme(darkTheme);

    expect(lightRnm.palette.background).not.toBe(darkRnm.palette.background);
    expect(lightRnm.palette.primary).not.toBe(darkRnm.palette.primary);
  });

  it('palette does not include undefined values', () => {
    const theme = createTheme();
    const { palette } = buildRnmCoreTheme(theme);

    const values = Object.values(palette);
    values.forEach(v => expect(v).toBeDefined());
  });
});
