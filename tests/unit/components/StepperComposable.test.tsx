import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Stepper } from '../../../src/components/Stepper/Stepper';
import { Step } from '../../../src/components/Stepper/Step';
import { StepLabel } from '../../../src/components/Stepper/StepLabel';
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

describe('Stepper composable mode', () => {
  it('renders composable tree without error', () => {
    const { getByRole } = render(
      <Wrapper>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step One</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step Two</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step Three</StepLabel>
          </Step>
        </Stepper>
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('shows StepContent for the active step', () => {
    const { getByText } = render(
      <Wrapper>
        <Stepper activeStep={1} orientation="vertical">
          <Step>
            <StepLabel>Step One</StepLabel>
            <StepContent><Text>Content One</Text></StepContent>
          </Step>
          <Step>
            <StepLabel>Step Two</StepLabel>
            <StepContent><Text>Content Two</Text></StepContent>
          </Step>
        </Stepper>
      </Wrapper>,
    );
    expect(getByText('Content Two')).toBeTruthy();
  });

  it('hides StepContent for inactive steps (unmountOnExit)', () => {
    const { queryByText } = render(
      <Wrapper>
        <Stepper activeStep={1} orientation="vertical">
          <Step>
            <StepLabel>Step One</StepLabel>
            <StepContent><Text>Content One</Text></StepContent>
          </Step>
          <Step>
            <StepLabel>Step Two</StepLabel>
            <StepContent><Text>Content Two</Text></StepContent>
          </Step>
        </Stepper>
      </Wrapper>,
    );
    expect(queryByText('Content One')).toBeNull();
  });
});

describe('Stepper data-driven regression', () => {
  it('renders data-driven Stepper with progressbar role', () => {
    const steps = [
      { label: 'First', description: 'Do first' },
      { label: 'Second', description: 'Do second' },
      { label: 'Third', description: 'Do third' },
    ];
    const { getByRole } = render(
      <Wrapper>
        <Stepper steps={steps} activeStep={1} />
      </Wrapper>,
    );
    expect(getByRole('progressbar')).toBeTruthy();
  });
});
