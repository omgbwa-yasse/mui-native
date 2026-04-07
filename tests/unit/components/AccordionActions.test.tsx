/**
 * T030 — AccordionActions unit tests.
 *
 * Verifies: renders children, disableSpacing prop, testID.
 */
import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { AccordionActions } from '../../../src/components/Accordion/AccordionActions';

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

describe('AccordionActions', () => {
  it('renders action buttons', () => {
    const { getByText } = render(
      <Wrapper>
        <AccordionActions>
          <Text>Cancel</Text>
          <Text>Confirm</Text>
        </AccordionActions>
      </Wrapper>,
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('renders with disableSpacing', () => {
    const { getByTestId } = render(
      <Wrapper>
        <AccordionActions disableSpacing testID="actions-no-space">
          <Text>Action</Text>
        </AccordionActions>
      </Wrapper>,
    );
    expect(getByTestId('actions-no-space')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <AccordionActions testID="accordion-actions">
          <Text>Action</Text>
        </AccordionActions>
      </Wrapper>,
    );
    expect(getByTestId('accordion-actions')).toBeTruthy();
  });
});
