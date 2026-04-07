import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { StepContext } from '../../../src/components/Stepper/Step';
import { StepContent } from '../../../src/components/Stepper/StepContent';

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

describe('StepContent', () => {
  it('hides content when step is not active (unmountOnExit)', () => {
    const { queryByText } = render(
      <Wrapper>
        <StepContext.Provider value={{ active: false, completed: false, disabled: false, index: 0, last: false }}>
          <StepContent>
            <Text>Step body</Text>
          </StepContent>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(queryByText('Step body')).toBeNull();
  });

  it('shows content when step is active', () => {
    const { getByText } = render(
      <Wrapper>
        <StepContext.Provider value={{ active: true, completed: false, disabled: false, index: 0, last: false }}>
          <StepContent>
            <Text>Step body</Text>
          </StepContent>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByText('Step body')).toBeTruthy();
  });

  it('accepts testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <StepContext.Provider value={{ active: true, completed: false, disabled: false, index: 0, last: false }}>
          <StepContent testID="step-content">
            <Text>Content</Text>
          </StepContent>
        </StepContext.Provider>
      </Wrapper>,
    );
    expect(getByTestId('step-content')).toBeTruthy();
  });
});
