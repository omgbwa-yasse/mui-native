import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Zoom } from './Zoom';

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

describe('Zoom', () => {
  it('mounts child when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Zoom in testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('child is mounted by default when in=false (unmountOnExit=false)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Zoom testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('in=true shows child (scale approaches 1)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Zoom in testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    // progress.value = 1 when in=true, so scale = 1
    expect(getByTestId('zoom')).toHaveStyle({ transform: [{ scale: 1 }] });
  });

  it('scale is 0 when in=false', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Zoom testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    // progress.value = 0 when in=false
    expect(getByTestId('zoom')).toHaveStyle({ transform: [{ scale: 0 }] });
  });

  it('unmountOnExit removes child after exit animation completes', () => {
    jest.useFakeTimers();
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Zoom in unmountOnExit testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Zoom in={false} unmountOnExit testID="zoom">
          <View testID="child" />
        </Zoom>
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
        <Zoom in={false} unmountOnExit testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    await act(async () => {});

    rerender(
      <Wrapper>
        <Zoom in unmountOnExit testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Zoom in={false} unmountOnExit testID="zoom">
          <View testID="child" />
        </Zoom>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeNull();
  });
});
