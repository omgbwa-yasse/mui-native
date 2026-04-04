import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { CircularProgress } from './CircularProgress';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CircularProgress', () => {
  it('renders without error (default indeterminate)', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress /></Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('indeterminate variant renders with accessibilityRole="progressbar"', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="indeterminate" /></Wrapper>,
    );
    // Accessibility assertion (Principle V): element has correct role
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('determinate variant renders with accessibilityRole="progressbar"', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="determinate" value={75} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el).toBeTruthy();
  });

  it('determinate variant exposes accessibilityValue', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="determinate" value={75} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 75 });
  });

  it('accepts a custom color prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CircularProgress color="red" testID="cp-color" />
      </Wrapper>,
    );
    expect(getByTestId('cp-color')).toBeTruthy();
  });

  it('accepts a custom size prop', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CircularProgress size={60} testID="cp-size" />
      </Wrapper>,
    );
    expect(getByTestId('cp-size')).toBeTruthy();
  });

  it('clamps value above 100 to 100', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="determinate" value={150} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue.now).toBe(100);
  });

  it('clamps value below 0 to 0', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="determinate" value={-10} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue.now).toBe(0);
  });

  it('indeterminate variant does not expose accessibilityValue.now', () => {
    const { getByRole } = render(
      <Wrapper><CircularProgress variant="indeterminate" /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toBeUndefined();
  });
});
