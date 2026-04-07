/**
 * T031 — Accordion composable mode integration + data-driven regression test.
 *
 * Composable: Accordion+Summary+Details+Actions work together.
 * Regression: existing data-driven API (title prop) still works.
 */
import React, { useState } from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Accordion } from '../../../src/components/Accordion/Accordion';
import { AccordionSummary } from '../../../src/components/Accordion/AccordionSummary';
import { AccordionDetails } from '../../../src/components/Accordion/AccordionDetails';
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

describe('Accordion composable mode', () => {
  it('initially collapsed — details not visible', () => {
    const { queryByText } = render(
      <Wrapper>
        <Accordion>
          <AccordionSummary>
            <Text>Summary</Text>
          </AccordionSummary>
          <AccordionDetails>
            <Text>Details body</Text>
          </AccordionDetails>
        </Accordion>
      </Wrapper>,
    );
    expect(queryByText('Details body')).toBeNull();
  });

  it('expands when summary is pressed', () => {
    const { getByRole, getByText } = render(
      <Wrapper>
        <Accordion>
          <AccordionSummary>
            <Text>Summary</Text>
          </AccordionSummary>
          <AccordionDetails>
            <Text>Details body</Text>
          </AccordionDetails>
        </Accordion>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Details body')).toBeTruthy();
  });

  it('calls onChange when toggled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <Accordion onChange={onChange}>
          <AccordionSummary>
            <Text>Summary</Text>
          </AccordionSummary>
          <AccordionDetails>
            <Text>Details</Text>
          </AccordionDetails>
        </Accordion>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders AccordionActions', () => {
    const { getByRole, getByText } = render(
      <Wrapper>
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Text>Summary</Text>
          </AccordionSummary>
          <AccordionDetails>
            <Text>Body</Text>
          </AccordionDetails>
          <AccordionActions>
            <Text>Action</Text>
          </AccordionActions>
        </Accordion>
      </Wrapper>,
    );
    expect(getByText('Action')).toBeTruthy();
  });
});

describe('Accordion data-driven (regression)', () => {
  it('renders with title prop', () => {
    const { getByText } = render(
      <Wrapper>
        <Accordion title="Accordion Title">
          <Text>Content</Text>
        </Accordion>
      </Wrapper>,
    );
    expect(getByText('Accordion Title')).toBeTruthy();
  });

  it('expands on press in data-driven mode', () => {
    const { getByRole, getByText } = render(
      <Wrapper>
        <Accordion title="Title">
          <Text>Body content</Text>
        </Accordion>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Body content')).toBeTruthy();
  });

  it('calls onToggle callback', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <Accordion title="Title" onToggle={onToggle}>
          <Text>Content</Text>
        </Accordion>
      </Wrapper>,
    );
    fireEvent.press(getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
