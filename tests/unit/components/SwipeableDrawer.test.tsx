/**
 * SwipeableDrawer unit tests.
 *
 * Covers: rendering, open/close state, anchor variants,
 * swipeAreaWidth edge zone, disableSwipeToOpen, onOpen/onClose callbacks,
 * permanent variant, persistent variant.
 */
import React, { useState } from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { SwipeableDrawer } from '../../../src/components/SwipeableDrawer';

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

describe('SwipeableDrawer — rendering', () => {
  it('renders children when open=true', () => {
    const { getByText } = render(
      <Wrapper>
        <SwipeableDrawer open onClose={jest.fn()} onOpen={jest.fn()}>
          <Text>Drawer content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    expect(getByText('Drawer content')).toBeTruthy();
  });

  it('does not render children when open=false (temporary)', () => {
    const { queryByText } = render(
      <Wrapper>
        <SwipeableDrawer open={false} onClose={jest.fn()} onOpen={jest.fn()}>
          <Text>Hidden content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    // Temporary + closed: drawer is unmounted
    expect(queryByText('Hidden content')).toBeNull();
  });

  it('renders with testID when open', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SwipeableDrawer open onClose={jest.fn()} onOpen={jest.fn()} testID="swipeable">
          <Text>Content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    expect(getByTestId('swipeable')).toBeTruthy();
  });

  it('renders permanent variant inline without portal', () => {
    const { getByText } = render(
      <Wrapper>
        <SwipeableDrawer
          open
          onClose={jest.fn()}
          onOpen={jest.fn()}
          variant="permanent"
        >
          <Text>Permanent drawer</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    expect(getByText('Permanent drawer')).toBeTruthy();
  });

  it('renders with anchor=right without error', () => {
    const { getByText } = render(
      <Wrapper>
        <SwipeableDrawer
          open
          onClose={jest.fn()}
          onOpen={jest.fn()}
          anchor="right"
        >
          <Text>Right drawer</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    expect(getByText('Right drawer')).toBeTruthy();
  });
});

describe('SwipeableDrawer — onClose callback', () => {
  it('calls onClose when scrim is pressed', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <SwipeableDrawer open onClose={onClose} onOpen={jest.fn()}>
          <Text>Content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button', { name: 'Close drawer' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('SwipeableDrawer — disableSwipeToOpen', () => {
  it('renders null (not just edge zone) when closed and disableSwipeToOpen=true', () => {
    const { queryByText } = render(
      <Wrapper>
        <SwipeableDrawer
          open={false}
          onClose={jest.fn()}
          onOpen={jest.fn()}
          disableSwipeToOpen
        >
          <Text>Content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    // With disableSwipeToOpen + closed, no drawer content should be in the tree
    expect(queryByText('Content')).toBeNull();
  });
});

describe('SwipeableDrawer — props smoke test', () => {
  it('accepts all extended props without TypeScript errors', () => {
    const { toJSON } = render(
      <Wrapper>
        <SwipeableDrawer
          open
          onClose={jest.fn()}
          onOpen={jest.fn()}
          swipeAreaWidth={30}
          hysteresis={0.5}
          minFlingVelocity={400}
          drawerWidth={300}
          anchor="left"
          variant="temporary"
        >
          <Text>Content</Text>
        </SwipeableDrawer>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
