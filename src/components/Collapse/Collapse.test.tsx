import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Collapse } from './Collapse';

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

describe('Collapse', () => {
  it('mounts child when in=true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse in testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('child is mounted by default when in=false (unmountOnExit=false)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('collapsedSize={40} baseline: height is 40 when collapsed (in=false)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse in={false} collapsedSize={40} testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    // progress.value=0 → interpolate(0,[0,1],[40,0]) = 40
    expect(getByTestId('collapse')).toHaveStyle({ height: 40 });
  });

  it('orientation="vertical" is the default — animates height (not width)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse in={false} collapsedSize={20} testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    const style = getByTestId('collapse').props.style;
    // Flatten style array and verify the animated style contains height (not width)
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style;
    expect(flatStyle).toHaveProperty('height');
    expect(flatStyle).not.toHaveProperty('width');
  });

  it('orientation="horizontal" — animates width (not height)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse in={false} orientation="horizontal" collapsedSize={20} testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    const style = getByTestId('collapse').props.style;
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style;
    expect(flatStyle).toHaveProperty('width');
    expect(flatStyle).not.toHaveProperty('height');
  });

  it('double-toggle with unmountOnExit and mountOnEnter', () => {
    jest.useFakeTimers();
    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Collapse in={false} unmountOnExit mountOnEnter testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    // Initially: mountOnEnter + not yet in=true → not mounted
    expect(queryByTestId('child')).toBeNull();

    // First toggle: in=true → mounts
    rerender(
      <Wrapper>
        <Collapse in unmountOnExit mountOnEnter testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    // Second toggle: in=false+timer → unmounts
    rerender(
      <Wrapper>
        <Collapse in={false} unmountOnExit mountOnEnter testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    act(() => { jest.runAllTimers(); });
    expect(queryByTestId('child')).toBeNull();
    jest.useRealTimers();
  });

  it('negative collapsedSize is clamped to 0', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Collapse in={false} collapsedSize={-10} testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    // Math.max(0, -10) = 0 → height = 0
    expect(getByTestId('collapse')).toHaveStyle({ height: 0 });
  });

  it('reduceMotion=true produces instant transition (Principle V)', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

    const { rerender, queryByTestId } = render(
      <Wrapper>
        <Collapse in={false} unmountOnExit testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    await act(async () => {});

    rerender(
      <Wrapper>
        <Collapse in unmountOnExit testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeTruthy();

    rerender(
      <Wrapper>
        <Collapse in={false} unmountOnExit testID="collapse">
          <View testID="child" />
        </Collapse>
      </Wrapper>,
    );
    expect(queryByTestId('child')).toBeNull();
  });
});
