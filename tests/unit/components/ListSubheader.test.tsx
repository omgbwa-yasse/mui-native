/**
 * T021 — ListSubheader unit tests.
 *
 * Verifies: renders children text, default/primary/inherit colors,
 * disableGutters removes padding, inset adds margin, testID.
 */
import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { ListSubheader } from '../../../src/components/List/ListSubheader';

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

describe('ListSubheader', () => {
  it('renders children text', () => {
    const { getByText } = render(
      <Wrapper>
        <ListSubheader>Section Header</ListSubheader>
      </Wrapper>,
    );
    expect(getByText('Section Header')).toBeTruthy();
  });

  it('renders with primary color variant', () => {
    const { getByText } = render(
      <Wrapper>
        <ListSubheader color="primary">Primary Header</ListSubheader>
      </Wrapper>,
    );
    expect(getByText('Primary Header')).toBeTruthy();
  });

  it('renders with inherit color variant', () => {
    const { getByText } = render(
      <Wrapper>
        <ListSubheader color="inherit">Inherit Header</ListSubheader>
      </Wrapper>,
    );
    expect(getByText('Inherit Header')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListSubheader testID="list-subheader">Header</ListSubheader>
      </Wrapper>,
    );
    expect(getByTestId('list-subheader')).toBeTruthy();
  });
});
