import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { StepperContext } from '../../../src/components/Stepper/StepperContext';
import { StepConnector } from '../../../src/components/Stepper/StepConnector';

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

describe('StepConnector', () => {
  it('renders with testID step-connector in horizontal mode', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 3 }}>
          <StepConnector />
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('step-connector')).toBeTruthy();
  });

  it('renders with testID step-connector in vertical mode', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'vertical', totalSteps: 3 }}>
          <StepConnector />
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('step-connector')).toBeTruthy();
  });

  it('accepts testID override', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepperContext.Provider value={{ activeStep: 0, orientation: 'horizontal', totalSteps: 2 }}>
          <StepConnector testID="custom-connector" />
        </StepperContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('custom-connector')).toBeTruthy();
  });
});
