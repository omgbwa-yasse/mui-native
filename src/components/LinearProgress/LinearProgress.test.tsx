import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LinearProgress } from './LinearProgress';

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

describe('LinearProgress', () => {
  it('renders without error (default indeterminate)', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress /></Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('indeterminate variant renders with accessibilityRole="progressbar"', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="indeterminate" /></Wrapper>,
    );
    // Accessibility assertion (Principle V): element has correct role
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('determinate variant renders with accessibilityRole="progressbar"', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="determinate" value={40} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el).toBeTruthy();
  });

  it('determinate variant exposes accessibilityValue', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="determinate" value={40} /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 40 });
  });

  it('buffer variant renders with value and valueBuffer', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="buffer" value={60} valueBuffer={80} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el).toBeTruthy();
    expect(el.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 60 });
  });

  it('buffer variant handles valueBuffer < value edge case (clamps buffer to value)', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="buffer" value={70} valueBuffer={40} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el).toBeTruthy();
    // Should not throw; buffer clamped to at least value
    expect(el.props.accessibilityValue.now).toBe(70);
  });

  it('query variant renders', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="query" /></Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('clamps value above 100 to 100', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="determinate" value={200} /></Wrapper>,
    );
    expect(getByRole('progressbar').props.accessibilityValue.now).toBe(100);
  });

  it('clamps value below 0 to 0', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="determinate" value={-5} /></Wrapper>,
    );
    expect(getByRole('progressbar').props.accessibilityValue.now).toBe(0);
  });

  it('indeterminate variant does not expose accessibilityValue.now', () => {
    const { getByRole } = render(
      <Wrapper><LinearProgress variant="indeterminate" /></Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toBeUndefined();
  });
});
