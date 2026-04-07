/**
 * T029 — AccordionDetails unit tests.
 *
 * Verifies: shows content when isExpanded=true, hides (unmounts) when isExpanded=false.
 */
import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { AccordionContext } from '../../../src/components/Accordion/AccordionContext';
import { AccordionDetails } from '../../../src/components/Accordion/AccordionDetails';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

function ContextWrapper({
  isExpanded = false,
  children,
}: {
  isExpanded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AccordionContext.Provider
      value={{ isExpanded, toggle: () => {}, disabled: false }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('AccordionDetails', () => {
  it('renders children when expanded', () => {
    const { getByText } = render(
      <Wrapper>
        <ContextWrapper isExpanded>
          <AccordionDetails>
            <Text>Details content</Text>
          </AccordionDetails>
        </ContextWrapper>
      </Wrapper>,
    );
    expect(getByText('Details content')).toBeTruthy();
  });

  it('does not render children when collapsed (unmountOnExit)', () => {
    const { queryByText } = render(
      <Wrapper>
        <ContextWrapper isExpanded={false}>
          <AccordionDetails>
            <Text>Hidden content</Text>
          </AccordionDetails>
        </ContextWrapper>
      </Wrapper>,
    );
    expect(queryByText('Hidden content')).toBeNull();
  });
});
