import React, { createRef } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { PortalHost } from '../Portal/PortalHost';
import { Popover } from './Popover';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Popover', () => {
  it('renders nothing when open={false}', () => {
    const anchorRef = createRef<View>();
    const { queryByTestId } = render(
      <Wrapper>
        <Popover open={false} anchorRef={anchorRef} testID="popover">
          <View testID="popover-content" />
        </Popover>
      </Wrapper>,
    );
    expect(queryByTestId('popover-content')).toBeNull();
  });

  it('renders content when open={true}', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popover open anchorRef={anchorRef} testID="popover">
          <View testID="popover-content" />
        </Popover>
      </Wrapper>,
    );
    expect(getByTestId('popover-content')).toBeTruthy();
  });

  it('calls onClose when backdrop is pressed', () => {
    const anchorRef = createRef<View>();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <Popover open anchorRef={anchorRef} onClose={onClose} testID="popover">
          <View testID="popover-content" />
        </Popover>
      </Wrapper>,
    );
    const backdrop = getByTestId('popover-backdrop');
    fireEvent.press(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('null anchorRef does not throw', () => {
    // createRef with null attached ref (no View mounted)
    const anchorRef = createRef<View>();
    expect(() =>
      render(
        <Wrapper>
          <Popover open anchorRef={anchorRef} testID="popover">
            <View testID="popover-content" />
          </Popover>
        </Wrapper>,
      ),
    ).not.toThrow();
  });

  it('backdrop is accessible (Principle V)', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popover open anchorRef={anchorRef} testID="popover">
          <View testID="popover-content" />
        </Popover>
      </Wrapper>,
    );
    const backdrop = getByTestId('popover-backdrop');
    expect(backdrop.props.accessibilityRole).toBe('button');
    expect(backdrop.props.accessible).toBe(true);
  });

  it('renders inline when disablePortal={true}', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popover open disablePortal anchorRef={anchorRef} testID="popover">
          <View testID="popover-inline-content" />
        </Popover>
      </Wrapper>,
    );
    expect(getByTestId('popover-inline-content')).toBeTruthy();
  });

  it('does not render onClose when prop is not provided', () => {
    const anchorRef = createRef<View>();
    // Should not throw when pressing backdrop with no onClose handler
    const { getByTestId } = render(
      <Wrapper>
        <Popover open anchorRef={anchorRef} testID="popover">
          <View testID="popover-content" />
        </Popover>
      </Wrapper>,
    );
    const backdrop = getByTestId('popover-backdrop');
    expect(() => fireEvent.press(backdrop)).not.toThrow();
  });
});
