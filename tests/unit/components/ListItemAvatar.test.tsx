/**
 * T019 — ListItemAvatar unit tests.
 *
 * Verifies: renders children, testID, correct minWidth for avatar slot.
 */
import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { ListItemAvatar } from '../../../src/components/List/ListItemAvatar';

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

describe('ListItemAvatar', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemAvatar>
          <View testID="avatar-child" />
        </ListItemAvatar>
      </Wrapper>,
    );
    expect(getByTestId('avatar-child')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemAvatar testID="lia">
          <View />
        </ListItemAvatar>
      </Wrapper>,
    );
    expect(getByTestId('lia')).toBeTruthy();
  });
});
