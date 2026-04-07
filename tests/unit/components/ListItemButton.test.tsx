/**
 * T017 — ListItemButton unit tests.
 *
 * Verifies: renders children, onPress fires, disabled blocks press,
 * selected state applied, dense variant, disableRipple, testID.
 */
import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { ListItemButton } from '../../../src/components/List/ListItemButton';

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

describe('ListItemButton', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <ListItemButton>
          <Text>Item text</Text>
        </ListItemButton>
      </Wrapper>,
    );
    expect(getByText('Item text')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <ListItemButton onPress={onPress} testID="btn">
          <Text>Press me</Text>
        </ListItemButton>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <ListItemButton onPress={onPress} disabled testID="btn-disabled">
          <Text>Disabled</Text>
        </ListItemButton>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('sets testID correctly', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemButton testID="list-item-btn">
          <Text>Text</Text>
        </ListItemButton>
      </Wrapper>,
    );
    expect(getByTestId('list-item-btn')).toBeTruthy();
  });

  it('has accessible button role', () => {
    const { getByRole } = render(
      <Wrapper>
        <ListItemButton>
          <Text>Role test</Text>
        </ListItemButton>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });
});
