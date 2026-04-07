import React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { MobileStepper } from '../../../src/components/Stepper/MobileStepper';

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

describe('MobileStepper', () => {
  it('renders dots variant with correct container testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <MobileStepper variant="dots" steps={5} activeStep={2} />
      </Wrapper>,
    );
    expect(getByTestId('mobile-stepper-dots')).toBeTruthy();
  });

  it('renders progress variant with correct container testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <MobileStepper variant="progress" steps={5} activeStep={2} />
      </Wrapper>,
    );
    expect(getByTestId('mobile-stepper-progress')).toBeTruthy();
  });

  it('renders text variant with step count', () => {
    const { getByText } = render(
      <Wrapper>
        <MobileStepper variant="text" steps={5} activeStep={2} />
      </Wrapper>,
    );
    expect(getByText('3 / 5')).toBeTruthy();
  });

  it('renders backButton and nextButton', () => {
    const { getByText } = render(
      <Wrapper>
        <MobileStepper
          variant="dots"
          steps={3}
          activeStep={1}
          backButton={<Text>Back</Text>}
          nextButton={<Text>Next</Text>}
        />
      </Wrapper>,
    );
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('accepts testID on root', () => {
    const { getByTestId } = render(
      <Wrapper>
        <MobileStepper variant="dots" steps={3} activeStep={0} testID="mobile-nav" />
      </Wrapper>,
    );
    expect(getByTestId('mobile-nav')).toBeTruthy();
  });
});
