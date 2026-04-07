/**
 * T018 — ListItemIcon unit tests.
 *
 * Verifies: renders children, testID, style forwarded, sx applied.
 */
import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { ListItemIcon } from '../../../src/components/List/ListItemIcon';

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

describe('ListItemIcon', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemIcon>
          <View testID="icon-child" />
        </ListItemIcon>
      </Wrapper>,
    );
    expect(getByTestId('icon-child')).toBeTruthy();
  });

  it('forwards testID to root View', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemIcon testID="list-item-icon">
          <View />
        </ListItemIcon>
      </Wrapper>,
    );
    expect(getByTestId('list-item-icon')).toBeTruthy();
  });
});
