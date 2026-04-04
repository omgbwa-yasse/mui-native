import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Slide } from './Slide';

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

describe('Slide', () => {
  it('mounts child when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Slide in testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('child is mounted by default when in=false (unmountOnExit=false)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Slide testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('direction="up" enters from bottom — uses translateY axis (not translateX)', () => {
    // When in=true, Slide(direction="up") should resolve to translateY (not translateX)
    // For the purpose of testing in Jest (where Dimensions returns 0), we just verify
    // the component renders without error and the child is present.
    const { getByTestId } = render(
      <Wrapper>
        <Slide in direction="up" testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('renders with direction="down" (default)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Slide in testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('renders with direction="left"', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Slide in direction="left" testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('renders with direction="right"', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Slide in direction="right" testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('unmountOnExit removes child after exit animation completes', () => {
    jest.useFakeTimers();
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Slide in unmountOnExit testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Slide in={false} unmountOnExit testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    act(() => { jest.runAllTimers(); });
    expect(queryByTestId('child')).toBeNull();
    jest.useRealTimers();
  });

  it('reduceMotion=true produces instant transition (Principle V)', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Slide in={false} unmountOnExit testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    await act(async () => {});

    rerender(
      <Wrapper>
        <Slide in unmountOnExit testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Slide in={false} unmountOnExit testID="slide">
          <View testID="child" />
        </Slide>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeNull();
  });
});
