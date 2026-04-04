import React, { createRef } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { PortalHost } from '../Portal/PortalHost';
import { Popper } from './Popper';

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

describe('Popper', () => {
  it('renders nothing when open={false}', () => {
    const anchorRef = createRef<View>();
    const { queryByTestId } = render(
      <Wrapper>
        <Popper open={false} anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    expect(queryByTestId('popper-content')).toBeNull();
  });

  it('renders content when open={true}', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popper open anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    expect(getByTestId('popper-content')).toBeTruthy();
  });

  it('placement="bottom" renders without error', () => {
    const anchorRef = createRef<View>();
    expect(() =>
      render(
        <Wrapper>
          <Popper open placement="bottom" anchorRef={anchorRef} testID="popper">
            <View testID="popper-content" />
          </Popper>
        </Wrapper>,
      ),
    ).not.toThrow();
  });

  it('placement="top" renders without error', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popper open placement="top" anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    expect(getByTestId('popper-content')).toBeTruthy();
  });

  it('placement="bottom-start" renders without error', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popper open placement="bottom-start" anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    expect(getByTestId('popper-content')).toBeTruthy();
  });

  it('disablePortal={true} renders inline (not in portal)', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popper open disablePortal anchorRef={anchorRef} testID="popper">
          <View testID="popper-inline-content" />
        </Popper>
      </Wrapper>,
    );
    expect(getByTestId('popper-inline-content')).toBeTruthy();
  });

  it('null anchorRef does not throw', () => {
    const anchorRef = createRef<View>();
    expect(() =>
      render(
        <Wrapper>
          <Popper open anchorRef={anchorRef} testID="popper">
            <View testID="popper-content" />
          </Popper>
        </Wrapper>,
      ),
    ).not.toThrow();
  });

  it('does not render a backdrop — is not blocked by any backdrop pressable', () => {
    const anchorRef = createRef<View>();
    const { queryByTestId } = render(
      <Wrapper>
        <Popper open anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    // Popper has no backdrop — testID "popper-backdrop" should not exist
    expect(queryByTestId('popper-backdrop')).toBeNull();
  });

  it('keepMounted keeps content in tree when open={false}', () => {
    const anchorRef = createRef<View>();
    const { rerender, getByTestId } = render(
      <Wrapper>
        <Popper open keepMounted anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    expect(getByTestId('popper-content')).toBeTruthy();

    rerender(
      <Wrapper>
        <Popper open={false} keepMounted anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" />
        </Popper>
      </Wrapper>,
    );
    // keepMounted keeps content in tree
    expect(getByTestId('popper-content')).toBeTruthy();
  });

  it('content is accessible in the tree (Principle V)', () => {
    const anchorRef = createRef<View>();
    const { getByTestId } = render(
      <Wrapper>
        <Popper open anchorRef={anchorRef} testID="popper">
          <View testID="popper-content" accessible accessibilityRole="tooltip" />
        </Popper>
      </Wrapper>,
    );
    const content = getByTestId('popper-content');
    expect(content.props.accessibilityRole).toBe('tooltip');
  });
});
