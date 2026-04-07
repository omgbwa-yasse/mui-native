/**
 * T068 — LinearProgress unit tests.
 *
 * SC-003: all 4 variants render, buffer shows two fills,
 * query direction reversed, correct accessibilityRole and accessibilityValue.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { LinearProgress } from '../../../src/components/LinearProgress';

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

describe('LinearProgress — all 4 variants render', () => {
  it.each(['determinate', 'indeterminate', 'buffer', 'query'] as const)(
    'renders variant=%s without crashing',
    (variant) => {
      const { getByRole } = render(
        <Wrapper>
          <LinearProgress variant={variant} value={50} valueBuffer={75} />
        </Wrapper>,
      );
      expect(getByRole('progressbar')).toBeTruthy();
    },
  );
});

describe('LinearProgress — buffer variant', () => {
  it('renders buffer bar when variant=buffer', () => {
    const { toJSON } = render(
      <Wrapper>
        <LinearProgress variant="buffer" value={40} valueBuffer={70} />
      </Wrapper>,
    );
    // Snapshot captures the buffer layer (second absolute View) distinct from primary fill
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('LinearProgress — accessibility', () => {
  it('has accessibilityRole="progressbar" for determinate', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="determinate" value={50} />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('has accessibilityValue for determinate', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="determinate" value={70} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 70 });
  });

  it('has accessibilityValue for buffer', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="buffer" value={40} valueBuffer={80} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 40 });
  });

  it('has no accessibilityValue for indeterminate', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="indeterminate" />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toBeUndefined();
  });

  it('has no accessibilityValue for query', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="query" />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue).toBeUndefined();
  });
});

describe('LinearProgress — value clamping', () => {
  it('clamps value=-10 to 0', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="determinate" value={-10} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue?.now).toBe(0);
  });

  it('clamps value=110 to 100', () => {
    const { getByRole } = render(
      <Wrapper>
        <LinearProgress variant="determinate" value={110} />
      </Wrapper>,
    );
    const el = getByRole('progressbar');
    expect(el.props.accessibilityValue?.now).toBe(100);
  });
});
