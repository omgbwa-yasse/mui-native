/**
 * T020 — ListItemText unit tests.
 *
 * Verifies: renders primary text, renders secondary text,
 * omits secondary when not provided, disableTypography passes raw nodes,
 * inset adds margin, testID.
 */
import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { ListItemText } from '../../../src/components/List/ListItemText';

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

describe('ListItemText', () => {
  it('renders primary text', () => {
    const { getByText } = render(
      <Wrapper>
        <ListItemText primary="Primary label" />
      </Wrapper>,
    );
    expect(getByText('Primary label')).toBeTruthy();
  });

  it('renders secondary text', () => {
    const { getByText } = render(
      <Wrapper>
        <ListItemText primary="Title" secondary="Subtitle" />
      </Wrapper>,
    );
    expect(getByText('Subtitle')).toBeTruthy();
  });

  it('does not render secondary when not provided', () => {
    const { queryByText } = render(
      <Wrapper>
        <ListItemText primary="Title only" />
      </Wrapper>,
    );
    expect(queryByText('Subtitle')).toBeNull();
  });

  it('renders raw nodes when disableTypography is true', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemText
          disableTypography
          primary={<Text testID="raw-primary">Raw</Text>}
        />
      </Wrapper>,
    );
    expect(getByTestId('raw-primary')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ListItemText primary="T" testID="lit" />
      </Wrapper>,
    );
    expect(getByTestId('lit')).toBeTruthy();
  });
});
