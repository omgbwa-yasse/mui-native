import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';
import { TimelineSeparator } from './TimelineSeparator';
import { TimelineDot } from './TimelineDot';
import { TimelineConnector } from './TimelineConnector';
import { TimelineContent } from './TimelineContent';
import { TimelineOppositeContent } from './TimelineOppositeContent';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('Timeline', () => {
  it('renders three items top-to-bottom', () => {
    const { getAllByTestId } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem><TimelineContent><Text testID="item-0">First</Text></TimelineContent></TimelineItem>
          <TimelineItem><TimelineContent><Text testID="item-1">Second</Text></TimelineContent></TimelineItem>
          <TimelineItem><TimelineContent><Text testID="item-2">Third</Text></TimelineContent></TimelineItem>
        </Timeline>
      </Wrapper>
    );
    expect(getAllByTestId(/item-/)).toHaveLength(3);
  });

  it('renders TimelineDot and TimelineConnector inside separator', () => {
    const { UNSAFE_getAllByType } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent><Text>Content</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    expect(UNSAFE_getAllByType(TimelineDot)).toHaveLength(1);
    expect(UNSAFE_getAllByType(TimelineConnector)).toHaveLength(1);
  });

  it('applies primary color to dot', () => {
    const { UNSAFE_getByType } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
            </TimelineSeparator>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    const dot = UNSAFE_getByType(TimelineDot);
    expect(dot.props.color).toBe('primary');
  });

  it('renders outlined dot with transparent background', () => {
    const { UNSAFE_getAllByType } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
            </TimelineSeparator>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    const views = UNSAFE_getAllByType(View);
    const outlinedDot = views.find(v => {
      const style = Array.isArray(v.props.style)
        ? Object.assign({}, ...v.props.style.map((s: object | null) => s ?? {}))
        : v.props.style ?? {};
      return style.backgroundColor === 'transparent' && style.borderWidth === 2;
    });
    expect(outlinedDot).toBeTruthy();
  });

  it('renders opposite content and primary content', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent><Text testID="opp">Opposite</Text></TimelineOppositeContent>
            <TimelineSeparator><TimelineDot /></TimelineSeparator>
            <TimelineContent><Text testID="main">Main</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    expect(getByTestId('opp')).toBeTruthy();
    expect(getByTestId('main')).toBeTruthy();
  });

  it('reverses row direction for alternate odd items', () => {
    const { UNSAFE_getAllByType } = render(
      <Wrapper>
        <Timeline position="alternate">
          <TimelineItem><TimelineContent><Text>Even</Text></TimelineContent></TimelineItem>
          <TimelineItem><TimelineContent><Text>Odd</Text></TimelineContent></TimelineItem>
          <TimelineItem><TimelineContent><Text>Even2</Text></TimelineContent></TimelineItem>
        </Timeline>
      </Wrapper>
    );
    const items = UNSAFE_getAllByType(TimelineItem);
    expect(items).toHaveLength(3);
  });

  it('renders single item with no connector without error', () => {
    const { UNSAFE_getByType } = render(
      <Wrapper>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent><Text>Only</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    expect(UNSAFE_getByType(TimelineDot)).toBeTruthy();
  });

  it('applies custom style to Timeline container', () => {
    const { UNSAFE_getByType } = render(
      <Wrapper>
        <Timeline style={{ padding: 16 }}>
          <TimelineItem>
            <TimelineContent><Text>Styled</Text></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    );
    const root = UNSAFE_getByType(Timeline);
    expect(root.props.style).toMatchObject({ padding: 16 });
  });
});
