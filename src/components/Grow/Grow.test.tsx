import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Grow } from './Grow';

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

describe('Grow', () => {
  it('mounts child when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Grow in testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('child is mounted by default when in=false (unmountOnExit=false)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Grow testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
    // Opacity should be 0 and scale starts at interpolated value (0.75)
    expect(getByTestId('grow')).toHaveStyle({ opacity: 0 });
  });

  it('opacity and scale apply on in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Grow in testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    expect(getByTestId('grow')).toHaveStyle({ opacity: 1 });
  });

  it('accepts a custom timeout prop', () => {
    expect(() =>
      render(
        <Wrapper>
          <Grow in timeout={500} testID="grow">
            <View testID="child" />
          </Grow>
        </Wrapper>,
      ),
    ).not.toThrow();
  });

  it('unmountOnExit removes child after exit animation completes', () => {
    jest.useFakeTimers();
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Grow in unmountOnExit testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Grow in={false} unmountOnExit testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    // EXITING — still mounted
    expect(queryByTestId('child')).toBeTruthy();

    act(() => { jest.runAllTimers(); });
    expect(queryByTestId('child')).toBeNull();
    jest.useRealTimers();
  });

  it('reduceMotion=true produces instant transition (Principle V)', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Grow in={false} unmountOnExit testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    await act(async () => {});

    rerender(
      <Wrapper>
        <Grow in unmountOnExit testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Grow in={false} unmountOnExit testID="grow">
          <View testID="child" />
        </Grow>
      </Wrapper>,
    );
    // Instant unmount — no timer advance required
    expect(queryByTestId('child')).toBeNull();
  });
});
