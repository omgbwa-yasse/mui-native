import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { FlatList } from '../../../src/components/FlatList';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

const DATA = [
  { id: '1', label: 'Alpha' },
  { id: '2', label: 'Beta' },
];

describe('FlatList', () => {
  it('renders list items', () => {
    const { getByText } = render(
      <Wrapper>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.label}</Text>}
        />
      </Wrapper>,
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Beta')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Wrapper>
        <FlatList
          testID="fl-root"
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.label}</Text>}
        />
      </Wrapper>,
    );
    expect(getByTestId('fl-root')).toBeTruthy();
  });

  it('applies sx style', () => {
    const { getByTestId } = render(
      <Wrapper>
        <FlatList
          testID="fl-sx"
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.label}</Text>}
          sx={{ backgroundColor: 'red' }}
        />
      </Wrapper>,
    );
    const el = getByTestId('fl-sx');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'red' })]),
    );
  });
});
