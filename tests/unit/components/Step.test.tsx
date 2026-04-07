import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Stepper } from '../../../src/components/Stepper/Stepper';
import { Step } from '../../../src/components/Stepper/Step';
import { StepperContext } from '../../../src/components/Stepper/StepperContext';
import { StepContext } from '../../../src/components/Stepper/Step';

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

describe('Step', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 1, orientation: 'horizontal', totalSteps: 3 }}>
          <Step index={0}>
            <Text>Step 0</Text>
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByText('Step 0')).toBeTruthy();
  });

  it('has accessibilityRole="listitem"', () => {
    const { getByRole } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 2 }}>
          <Step index={0}>
            <Text>Step</Text>
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByRole('listitem')).toBeTruthy();
  });

  it('derives active from StepperContext when no prop override', () => {
    let capturedActive = false;
    function Spy() {
      const ctx = React.useContext(StepContext);
      capturedActive = ctx.active;
      return <Text>Step</Text>;
    }
    render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 2, orientation: 'horizontal', totalSteps: 3 }}>
          <Step index={2}>
            <Spy />
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(capturedActive).toBe(true);
  });

  it('derives completed from StepperContext when no prop override', () => {
    let capturedCompleted = false;
    function Spy() {
      const ctx = React.useContext(StepContext);
      capturedCompleted = ctx.completed;
      return <Text>Step</Text>;
    }
    render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 2, orientation: 'horizontal', totalSteps: 3 }}>
          <Step index={0}>
            <Spy />
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(capturedCompleted).toBe(true);
  });

  it('accepts active override prop', () => {
    let capturedActive = false;
    function Spy() {
      const ctx = React.useContext(StepContext);
      capturedActive = ctx.active;
      return <Text>Step</Text>;
    }
    render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 2 }}>
          <Step index={1} active={true}>
            <Spy />
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(capturedActive).toBe(true);
  });

  it('accepts disabled prop', () => {
    let capturedDisabled = false;
    function Spy() {
      const ctx = React.useContext(StepContext);
      capturedDisabled = ctx.disabled;
      return <Text>Step</Text>;
    }
    render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 2 }}>
          <Step index={0} disabled>
            <Spy />
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(capturedDisabled).toBe(true);
  });

  it('accepts testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 1 }}>
          <Step index={0} testID="my-step">
            <Text>Step</Text>
          </Step>
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('my-step')).toBeTruthy();
  });
});
