/**
 * Dark-mode integration test (T028 / US2).
 *
 * Verifies that ThemeProvider exposes setMode and correctly switches
 * the active ColorScheme from light to dark.
 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/theme/ThemeProvider';
import { useTheme } from '../../src/theme/ThemeContext';
import { baseLightColors, baseDarkColors } from '../../src/tokens/colors';

function ThemeToggle(): React.ReactElement {
  const { theme, mode, setMode } = useTheme();
  return (
    <>
      <Text testID="mode">{mode}</Text>
      <Text testID="primary">{theme.colorScheme.primary}</Text>
      <TouchableOpacity
        testID="toggle"
        onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        <Text>Toggle</Text>
      </TouchableOpacity>
    </>
  );
}

describe('ThemeProvider — dark mode (US2)', () => {
  it('starts in light mode with the default primary color', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(getByTestId('mode').props.children).toBe('light');
    expect(getByTestId('primary').props.children).toBe(baseLightColors.primary);
  });

  it('switches to dark mode when setMode("dark") is called', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId('toggle'));
    expect(getByTestId('mode').props.children).toBe('dark');
    expect(getByTestId('primary').props.children).toBe(baseDarkColors.primary);
  });

  it('initialises directly in dark mode when mode="dark" is passed', () => {
    const { getByTestId } = render(
      <ThemeProvider mode="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(getByTestId('mode').props.children).toBe('dark');
    expect(getByTestId('primary').props.children).toBe(baseDarkColors.primary);
  });

  it('can toggle back from dark to light', () => {
    const { getByTestId } = render(
      <ThemeProvider mode="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId('toggle'));
    expect(getByTestId('mode').props.children).toBe('light');
  });
});
