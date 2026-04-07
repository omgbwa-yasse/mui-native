/**
 * T028 — AccordionSummary unit tests.
 *
 * Verifies: renders children, button role, toggles on press via context,
 * disabled state blocks toggle.
 */
import React, { useState } from 'react';
import { AccessibilityInfo, Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { AccordionContext } from '../../../src/components/Accordion/AccordionContext';
import { AccordionSummary } from '../../../src/components/Accordion/AccordionSummary';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

function ContextWrapper({
  isExpanded = false,
  disabled = false,
  onToggle = jest.fn(),
  children,
}: {
  isExpanded?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}) {
  return (
    <AccordionContext.Provider value={{ isExpanded, toggle: onToggle, disabled }}>
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

describe('AccordionSummary', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <ContextWrapper>
          <AccordionSummary>
            <Text>Summary Content</Text>
          </AccordionSummary>
        </ContextWrapper>
      </Wrapper>,
    );
    expect(getByText('Summary Content')).toBeTruthy();
  });

  it('has button accessibility role', () => {
    const { getByRole } = render(
      <Wrapper>
        <ContextWrapper>
          <AccordionSummary>
            <Text>Role test</Text>
          </AccordionSummary>
        </ContextWrapper>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('calls toggle when pressed', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <ContextWrapper onToggle={onToggle}>
          <AccordionSummary>
            <Text>Press me</Text>
          </AccordionSummary>
        </ContextWrapper>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call toggle when disabled', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <ContextWrapper disabled onToggle={onToggle}>
          <AccordionSummary>
            <Text>Disabled</Text>
          </AccordionSummary>
        </ContextWrapper>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders custom expandIcon', () => {
    const { getByTestId } = render(
      <Wrapper>
        <ContextWrapper>
          <AccordionSummary expandIcon={<View testID="custom-icon" />}>
            <Text>With icon</Text>
          </AccordionSummary>
        </ContextWrapper>
      </Wrapper>,
    );
    expect(getByTestId('custom-icon')).toBeTruthy();
  });
});
