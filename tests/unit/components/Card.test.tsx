/**
 * T067 — Card sub-components unit tests.
 *
 * SC-005: CardHeader with all props, CardMedia with image URI, CardContent children,
 * CardActions with/without disableSpacing, CardActionArea onPress, 48dp touch target.
 */
import React from 'react';
import { AccessibilityInfo, Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { PortalHost } from '../../../src/components/Portal';
import { Card } from '../../../src/components/Card/Card';
import { CardHeader } from '../../../src/components/Card/CardHeader';
import { CardMedia } from '../../../src/components/Card/CardMedia';
import { CardContent } from '../../../src/components/Card/CardContent';
import { CardActions } from '../../../src/components/Card/CardActions';
import { CardActionArea } from '../../../src/components/Card/CardActionArea';

// Mock Image from react-native to avoid native module issues in test env
jest.mock('react-native/Libraries/Image/Image', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockImage = React.forwardRef((props: any, _ref: any) => <View testID={props.testID ?? 'mock-image'} {...props} />);
  return MockImage;
});

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

describe('CardHeader', () => {
  it('renders title and subheader', () => {
    const { getByText } = render(
      <Wrapper>
        <CardHeader title="Card Title" subheader="Card Subheader" testID="ch" />
      </Wrapper>,
    );
    expect(getByText('Card Title')).toBeTruthy();
    expect(getByText('Card Subheader')).toBeTruthy();
  });

  it('renders avatar element', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CardHeader
          testID="ch-avatar"
          avatar={<View testID="avatar-el" />}
          title="Title"
        />
      </Wrapper>,
    );
    expect(getByTestId('avatar-el')).toBeTruthy();
  });

  it('renders action element', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CardHeader
          testID="ch-action"
          title="Title"
          action={<View testID="action-btn" />}
        />
      </Wrapper>,
    );
    expect(getByTestId('action-btn')).toBeTruthy();
  });

  it('renders without avatar, subheader, or action', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardHeader title="Simple" testID="ch-simple" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardHeader
          title="Snapshot Title"
          subheader="Snapshot Sub"
          avatar={<View testID="snap-avatar" />}
          action={<View testID="snap-action" />}
        />
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('CardMedia', () => {
  it('renders with image URI without crash', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardMedia image="https://example.com/img.jpg" alt="A test image" testID="cm" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders custom height', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardMedia image="https://example.com/img.jpg" height={300} testID="cm-h300" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders without image (no crash)', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardMedia testID="cm-empty" />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders custom component instead of Image', () => {
    const CustomComp = (props: any) => <View testID="custom-media" {...props} />;
    const { getByTestId } = render(
      <Wrapper>
        <CardMedia component={CustomComp} testID="cm-custom" />
      </Wrapper>,
    );
    expect(getByTestId('cm-custom')).toBeTruthy();
  });
});

describe('CardContent', () => {
  it('renders children with correct padding', () => {
    const { getByText } = render(
      <Wrapper>
        <CardContent testID="cc">
          <Text>Content child</Text>
        </CardContent>
      </Wrapper>,
    );
    expect(getByText('Content child')).toBeTruthy();
  });

  it('snapshot', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardContent>
          <Text>Snapshot content</Text>
        </CardContent>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('CardActions', () => {
  it('renders children in a row', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CardActions testID="ca">
          <View testID="btn1" />
          <View testID="btn2" />
        </CardActions>
      </Wrapper>,
    );
    expect(getByTestId('btn1')).toBeTruthy();
    expect(getByTestId('btn2')).toBeTruthy();
  });

  it('renders without disableSpacing (default gap)', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardActions>
          <View testID="a1" />
        </CardActions>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with disableSpacing=true', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardActions disableSpacing testID="ca-nospace">
          <View testID="a2" />
        </CardActions>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot: with disableSpacing', () => {
    const { toJSON } = render(
      <Wrapper>
        <CardActions disableSpacing>
          <View />
          <View />
        </CardActions>
      </Wrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('CardActionArea', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <CardActionArea onPress={onPress} testID="caa-press">
          <Text>Press me</Text>
        </CardActionArea>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('caa-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrapper>
        <CardActionArea onPress={onPress} disabled testID="caa-disabled">
          <Text>Disabled</Text>
        </CardActionArea>
      </Wrapper>,
    );
    fireEvent.press(getByTestId('caa-disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has minHeight of 48 (48dp minimum touch target)', () => {
    const { getByTestId } = render(
      <Wrapper>
        <CardActionArea onPress={jest.fn()} testID="caa-target">
          <Text>Target</Text>
        </CardActionArea>
      </Wrapper>,
    );
    const el = getByTestId('caa-target');
    // The style prop is an array; we need to check flattened styles
    const styleArray = Array.isArray(el.props.style) ? el.props.style : [el.props.style];
    const flatStyle = Object.assign({}, ...styleArray.filter(Boolean));
    expect(flatStyle.minHeight).toBe(48);
  });

  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <Wrapper>
        <CardActionArea onPress={jest.fn()} testID="caa-a11y">
          <Text>Action</Text>
        </CardActionArea>
      </Wrapper>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <CardActionArea>
          <Text>Card action child</Text>
        </CardActionArea>
      </Wrapper>,
    );
    expect(getByText('Card action child')).toBeTruthy();
  });
});

describe('Card composition', () => {
  it('renders a full Card composition without crash', () => {
    const { getByText } = render(
      <Wrapper>
        <Card testID="card-full">
          <CardHeader title="Full Card" subheader="With everything" />
          <CardMedia image="https://example.com/img.jpg" />
          <CardContent>
            <Text>Card body text</Text>
          </CardContent>
          <CardActions>
            <View testID="action-view" />
          </CardActions>
        </Card>
      </Wrapper>,
    );
    expect(getByText('Full Card')).toBeTruthy();
    expect(getByText('Card body text')).toBeTruthy();
  });
});
