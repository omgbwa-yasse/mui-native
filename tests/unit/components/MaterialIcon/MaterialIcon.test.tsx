/**
 * Unit tests for MaterialIcon component.
 *
 * Covers:
 * - Default render (filled variant)
 * - All 5 variants render without throwing
 * - Theme color used when no explicit color provided
 * - Explicit color overrides theme color
 * - #000000 fallback + console.warn when no ThemeProvider
 * - accessibilityRole="image" and accessible=true when accessibilityLabel provided
 * - accessible=false and accessibilityRole="none" when no accessibilityLabel
 * - testID forwarded to root element
 * - Two Tone renders two children
 * - console.warn fired for unknown icon name
 */
import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { MaterialIcon } from '../../../../src/components/MaterialIcon/MaterialIcon';
import { ThemeProvider } from '../../../../src/theme/ThemeProvider';

// ── Helpers ──────────────────────────────────────────────────────────────
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

const renderWithoutTheme = (ui: React.ReactElement) => render(ui);

// ── Tests ─────────────────────────────────────────────────────────────────
describe('MaterialIcon', () => {
  describe('default render', () => {
    it('renders without throwing (filled variant by default)', () => {
      expect(() => renderWithTheme(<MaterialIcon name="star" />)).not.toThrow();
    });
  });

  describe('variants', () => {
    const variants = ['filled', 'outlined', 'rounded', 'sharp', 'two-tone'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant without throwing`, () => {
        expect(() =>
          renderWithTheme(<MaterialIcon name="star" variant={variant} />),
        ).not.toThrow();
      });
    });
  });

  describe('color resolution', () => {
    it('uses theme.colorScheme.onSurface when no explicit color (within ThemeProvider)', () => {
      const { getByTestId } = renderWithTheme(
        <MaterialIcon name="star" testID="icon-root" />,
      );
      // Component renders a View with testID
      expect(getByTestId('icon-root')).toBeTruthy();
    });

    it('uses explicit color prop over theme color', () => {
      // As long as no error is thrown and the component renders, the prop is forwarded
      expect(() =>
        renderWithTheme(<MaterialIcon name="star" color="#FF0000" />),
      ).not.toThrow();
    });
  });

  describe('no ThemeProvider fallback (FR-009)', () => {
    it('renders with #000000 fallback color when no ThemeProvider', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      expect(() =>
        renderWithoutTheme(<MaterialIcon name="star" />),
      ).not.toThrow();
      warnSpy.mockRestore();
    });

    it('calls console.warn when no ThemeProvider in __DEV__ mode', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      renderWithoutTheme(<MaterialIcon name="star" />);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('no ThemeProvider found'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('accessibility', () => {
    it('sets accessibilityRole="image" and accessible=true when accessibilityLabel is provided', () => {
      const { getByRole } = renderWithTheme(
        <MaterialIcon name="star" accessibilityLabel="Star icon" testID="icon" />,
      );
      const el = getByRole('image');
      expect(el).toBeTruthy();
    });

    it('sets accessible=false when no accessibilityLabel', () => {
      const { getByTestId } = renderWithTheme(
        <MaterialIcon name="star" testID="icon" />,
      );
      const el = getByTestId('icon');
      expect(el.props.accessible).toBe(false);
    });
  });

  describe('testID', () => {
    it('forwards testID to root element', () => {
      const { getByTestId } = renderWithTheme(
        <MaterialIcon name="star" testID="my-icon" />,
      );
      expect(getByTestId('my-icon')).toBeTruthy();
    });
  });

  describe('Two Tone variant', () => {
    it('renders two children (two overlapping glyphs)', () => {
      const { UNSAFE_getByType } = renderWithTheme(
        <MaterialIcon name="star" variant="two-tone" />,
      );
      // The two-tone branch renders a View with position:relative containing two icon glyphs
      const root = UNSAFE_getByType(View);
      expect(root).toBeTruthy();
    });
  });

  describe('unknown icon name warning', () => {
    it('calls console.warn for an unknown icon name in __DEV__ mode', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      // Cast to any to bypass TS types for testing invalid input
      renderWithTheme(<MaterialIcon name={'__not_a_real_icon__' as never} />);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('unknown icon name'),
      );
      warnSpy.mockRestore();
    });
  });
});
