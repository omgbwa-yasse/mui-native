import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { SectionList } from '../../../src/components/SectionList';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

const SECTIONS = [
  { title: 'Fruits', data: ['Apple', 'Banana'] },
  { title: 'Veggies', data: ['Carrot', 'Pea'] },
];

describe('SectionList', () => {
  it('renders section items', () => {
    const { getByText } = render(
      <Wrapper>
        <SectionList
          sections={SECTIONS}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text>{item}</Text>}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        />
      </Wrapper>,
    );
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Fruits')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SectionList
          testID="sl-root"
          sections={SECTIONS}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </Wrapper>,
    );
    expect(getByTestId('sl-root')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <SectionList
          testID="sl-sx"
          sections={SECTIONS}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text>{item}</Text>}
          sx={{ backgroundColor: 'yellow' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('sl-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'yellow' })]),
    );
  });
});
