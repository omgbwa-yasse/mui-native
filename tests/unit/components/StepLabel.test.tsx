import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { StepContext } from '../../../src/components/Stepper/Step';
import { StepLabel } from '../../../src/components/Stepper/StepLabel';

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

function makeCtx(overrides?: Partial<React.ContextType<typeof StepContext>>) {
  return { active: false, completed: false, disabled: false, index: 0, last: false, ...overrides };
}

describe('StepLabel', () => {
  it('renders step number for inactive step', () => {
    const { getByText } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx({ index: 2 })}>
          <StepLabel>Step Title</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByText('3')).toBeTruthy(); // index 2 → label "3"
    expect(getByText('Step Title')).toBeTruthy();
  });

  it('renders checkmark for completed step', () => {
    const { getByText } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx({ completed: true })}>
          <StepLabel>Done</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('renders exclamation for error step', () => {
    const { getByText } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx()}>
          <StepLabel error>Error Step</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByText('!')).toBeTruthy();
  });

  it('renders custom icon when provided', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx({ active: true })}>
          <StepLabel icon={<Text testID="custom-icon">★</Text>}>Label</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('custom-icon')).toBeTruthy();
  });

  it('renders optional sub-label', () => {
    const { getByText } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx()}>
          <StepLabel optional="Optional">Main Label</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByText('Optional')).toBeTruthy();
    expect(getByText('Main Label')).toBeTruthy();
  });

  it('accepts testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepContext.Provider value={makeCtx()}>
          <StepLabel testID="step-label">Label</StepLabel>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('step-label')).toBeTruthy();
  });
});
