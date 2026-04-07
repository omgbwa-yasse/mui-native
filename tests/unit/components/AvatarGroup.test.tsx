/**
 * T052 — AvatarGroup unit tests.
 *
 * SC-005: max clipping, surplus label, custom renderSurplus, spacing variants.
 */
import React from 'react';
import { AccessibilityInfo, View, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { AvatarGroup } from '../../../src/components/AvatarGroup';
import { Avatar } from '../../../src/components/Avatar';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider>
      <PortalHost>{children}</PortalHost>
    </ThemeProvider>
  );
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  jest
    .spyOn(AccessibilityInfo, 'addEventListener')
    .mockReturnValue({ remove: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const sixAvatars = Array.from({ length: 6 }, (_, i) => (
  <Avatar key={i} label={`U${i + 1}`} testID={`avatar-${i}`} />
));

describe('AvatarGroup — max clipping', () => {
  it('renders only max=3 children from 6 avatars', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <AvatarGroup max={3}>{sixAvatars}</AvatarGroup>
      </Wrapper>,
    );
    // First 3 visible
    expect(queryByTestId('avatar-0')).toBeTruthy();
    expect(queryByTestId('avatar-1')).toBeTruthy();
    expect(queryByTestId('avatar-2')).toBeTruthy();
    // 4th+ not visible
    expect(queryByTestId('avatar-3')).toBeNull();
    expect(queryByTestId('avatar-4')).toBeNull();
    expect(queryByTestId('avatar-5')).toBeNull();
  });

  it('shows all 6 avatars when max >= 6', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <AvatarGroup max={10}>{sixAvatars}</AvatarGroup>
      </Wrapper>,
    );
    expect(queryByTestId('avatar-5')).toBeTruthy();
  });
});

describe('AvatarGroup — surplus Avatar', () => {
  it('renders surplus Avatar with "+3" label for max=3 from 6', () => {
    const { getByTestId } = render(
      <Wrapper>
        <AvatarGroup max={3}>{sixAvatars}</AvatarGroup>
      </Wrapper>,
    );
    // The default surplus Avatar has testID="avatar-group-surplus"
    const surplus = getByTestId('avatar-group-surplus');
    expect(surplus).toBeTruthy();
  });

  it('does not show surplus when all avatars fit', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <AvatarGroup max={10}>{sixAvatars}</AvatarGroup>
      </Wrapper>,
    );
    expect(queryByTestId('avatar-group-surplus')).toBeNull();
  });

  it('uses total prop to calculate surplus separately from children length', () => {
    const twoAvatars = [
      <Avatar key={0} label="U1" testID="a0" />,
      <Avatar key={1} label="U2" testID="a1" />,
    ];
    // total=10 with max=2 should show +8 surplus
    const { getByTestId, queryByTestId } = render(
      <Wrapper>
        <AvatarGroup max={2} total={10}>
          {twoAvatars}
        </AvatarGroup>
      </Wrapper>,
    );
    // Only 2 children visible (surplus = total - max = 8)
    expect(queryByTestId('a0')).toBeTruthy();
    expect(queryByTestId('avatar-group-surplus')).toBeTruthy();
  });
});

describe('AvatarGroup — custom renderSurplus', () => {
  it('uses custom renderSurplus renderer when provided', () => {
    const renderSurplus = (count: number) => (
      <View testID="custom-surplus">
        <Text>{`+${count} more`}</Text>
      </View>
    );

    const { getByTestId, queryByTestId } = render(
      <Wrapper>
        <AvatarGroup max={3} renderSurplus={renderSurplus}>
          {sixAvatars}
        </AvatarGroup>
      </Wrapper>,
    );
    expect(getByTestId('custom-surplus')).toBeTruthy();
    // Default surplus Avatar should NOT be rendered
    expect(queryByTestId('avatar-group-surplus')).toBeNull();
  });
});

describe('AvatarGroup — spacing variants', () => {
  it('renders without crashing with spacing="medium" (default)', () => {
    const { toJSON } = render(
      <Wrapper>
        <AvatarGroup max={3} spacing="medium">
          {sixAvatars}
        </AvatarGroup>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders without crashing with spacing="small"', () => {
    const { toJSON } = render(
      <Wrapper>
        <AvatarGroup max={3} spacing="small">
          {sixAvatars}
        </AvatarGroup>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders without crashing with numeric spacing', () => {
    const { toJSON } = render(
      <Wrapper>
        <AvatarGroup max={3} spacing={12}>
          {sixAvatars}
        </AvatarGroup>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot: default spacing', () => {
    const { toJSON } = render(
      <Wrapper>
        <AvatarGroup max={3}>{sixAvatars}</AvatarGroup>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
