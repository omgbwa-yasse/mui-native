import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Fade } from './Fade';

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

describe('Fade', () => {
  it('mounts child when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Fade in testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('child is mounted but hidden (opacity=0) when in={false} (default)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Fade testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    // Default: shouldMount=true, but progress.value=0
    expect(getByTestId('child')).toBeTruthy();
    expect(getByTestId('fade')).toHaveStyle({ opacity: 0 });
  });

  it('opacity is 1 when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Fade in testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(getByTestId('fade')).toHaveStyle({ opacity: 1 });
  });

  it('unmountOnExit removes child after exit animation completes', () => {
    jest.useFakeTimers();
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Fade in unmountOnExit testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Fade in={false} unmountOnExit testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    // During EXITING phase, child is still mounted
    expect(queryByTestId('child')).toBeTruthy();

    // Advance timers so the exit timeout fires → state = 'EXITED'
    act(() => { jest.runAllTimers(); });
    expect(queryByTestId('child')).toBeNull();
    jest.useRealTimers();
  });

  it('mountOnEnter defers mount until first in=true', () => {
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Fade in={false} mountOnEnter testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    // Child not mounted before first in=true
    expect(queryByTestId('child')).toBeNull();

    rerender(
      <Wrapper>
        <Fade in mountOnEnter testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();
  });

  it('fires onEnter / onEntered / onExit / onExited callbacks', () => {
    jest.useFakeTimers();
    const onEnter = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExited = jest.fn();

    const { rerender } = render(
      <Wrapper>
        <Fade in={false} onEnter={onEnter} onEntered={onEntered}
          onExit={onExit} onExited={onExited} testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );

    rerender(
      <Wrapper>
        <Fade in onEnter={onEnter} onEntered={onEntered}
          onExit={onExit} onExited={onExited} testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(onEnter).toHaveBeenCalledTimes(1);
    act(() => { jest.runAllTimers(); });
    expect(onEntered).toHaveBeenCalledTimes(1);

    rerender(
      <Wrapper>
        <Fade in={false} onEnter={onEnter} onEntered={onEntered}
          onExit={onExit} onExited={onExited} testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(onExit).toHaveBeenCalledTimes(1);
    act(() => { jest.runAllTimers(); });
    expect(onExited).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('reduceMotion=true produces instant transition with no intermediate animation states (Principle V)', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Fade in={false} unmountOnExit testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );

    // Let the isReduceMotionEnabled promise settle → reduceMotion.value = true
    await act(async () => {});

    rerender(
      <Wrapper>
        <Fade in unmountOnExit testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    // With reduceMotion, exit should be instant — no timer advance needed
    rerender(
      <Wrapper>
        <Fade in={false} unmountOnExit testID="fade">
          <View testID="child" />
        </Fade>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeNull();
  });
});
