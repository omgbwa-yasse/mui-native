/**
 * T019 — CircularProgress unit tests.
 *
 * SC-002: snapshot at values 0/25/50/75/100 for determinate,
 * thickness / enableTrackSlot / disableShrink props,
 * value clamping, accessibility.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { CircularProgress } from '../../../src/components/CircularProgress';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest
    .spyOn(AccessibilityInfo, 'addEventListener')
    .mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CircularProgress — determinate snapshots', () => {
  it.each([0, 25, 50, 75, 100])(
    'matches snapshot at value=%i',
    (value) => {
      const { toJSON } = render(
        <Wrapper>
          <CircularProgress variant="determinate" value={value} />
        </Wrapper>,
      );
      expect(toJSON()).toMatchSnapshot();
    },
  );
});

describe('CircularProgress — indeterminate', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="indeterminate" />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('renders progress-arc testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CircularProgress variant="indeterminate" />
      </Wrapper>,
    );
    expect(getByTestId('progress-arc')).toBeTruthy();
  });
});

describe('CircularProgress — enableTrackSlot', () => {
  it('does not render progress-track by default', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={50} />
      </Wrapper>,
    );
    expect(queryByTestId('progress-track')).toBeNull();
  });

  it('renders progress-track when enableTrackSlot=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={50} enableTrackSlot />
      </Wrapper>,
    );
    expect(getByTestId('progress-track')).toBeTruthy();
    expect(getByTestId('progress-arc')).toBeTruthy();
  });
});

describe('CircularProgress — disableShrink', () => {
  it('renders indeterminate without crashing when disableShrink=true', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="indeterminate" disableShrink />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });
});

describe('CircularProgress — thickness', () => {
  it('accepts custom thickness without crashing', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={40} thickness={6} />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });
});

describe('CircularProgress — value clamping', () => {
  it('clamps value -5 to 0 (accessibilityValue.now=0)', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={-5} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue?.now).toBe(0);
  });

  it('clamps value 105 to 100 (accessibilityValue.now=100)', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={105} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue?.now).toBe(100);
  });

  it('passes through value=75 unchanged', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={75} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue?.now).toBe(75);
  });
});

describe('CircularProgress — accessibility', () => {
  it('has accessibilityRole="progressbar" for determinate', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={50} />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('has accessibilityValue min/max/now for determinate', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="determinate" value={60} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 60 });
  });

  it('has no accessibilityValue for indeterminate', () => {
    const { getByRole } = render(
      <Wrapper>
        <CircularProgress variant="indeterminate" />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    // accessibilityValue should be undefined or omitted for indeterminate
    expect(el.props.accessibilityValue).toBeUndefined();
  });
});
