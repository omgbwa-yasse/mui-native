import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { List } from '../../src/components/List/List';
import { ListItem } from '../../src/components/List/ListItem';
import { ListSection } from '../../src/components/List/ListSection';
import { ListAccordion } from '../../src/components/List/ListAccordion';

const StarIcon = ({ color }: { size: number; color: string }) => (
  <Text style={{ fontSize: 20, color }}>★</Text>
);

const InfoIcon = ({ color }: { size: number; color: string }) => (
  <Text style={{ fontSize: 20, color }}>ℹ</Text>
);

const ChevronIcon = ({ color }: { size: number; color: string }) => (
  <Text style={{ fontSize: 16, color }}>›</Text>
);

export default {
  title: 'Components/List',
};

export const SimpleItems = () => (
  <List>
    <ListItem title="Item 1" onPress={() => {}} />
    <ListItem title="Item 2" description="With a description" onPress={() => {}} />
    <ListItem title="Item 3 — disabled" disabled />
  </List>
);

export const WithIcons = () => (
  <List>
    <ListItem
      title="Starred"
      description="Your starred items"
      left={(props) => <StarIcon {...props} />}
      right={(props) => <ChevronIcon {...props} />}
      onPress={() => {}}
    />
    <ListItem
      title="Info"
      description="About this app"
      left={(props) => <InfoIcon {...props} />}
      right={(props) => <ChevronIcon {...props} />}
      onPress={() => {}}
    />
  </List>
);

export const WithSections = () => (
  <List>
    <ListSection title="Fruits">
      <ListItem title="Apple" onPress={() => {}} />
      <ListItem title="Banana" onPress={() => {}} />
      <ListItem title="Cherry" onPress={() => {}} />
    </ListSection>
    <ListSection title="Vegetables">
      <ListItem title="Carrot" onPress={() => {}} />
      <ListItem title="Broccoli" onPress={() => {}} />
    </ListSection>
  </List>
);

export const WithSelected = () => {
  const [selected, setSelected] = useState('apple');
  const items = ['Apple', 'Banana', 'Cherry', 'Mango'];
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item}
          title={item}
          selected={selected === item.toLowerCase()}
          onPress={() => setSelected(item.toLowerCase())}
        />
      ))}
    </List>
  );
};

export const WithAccordion = () => (
  <List>
    <ListAccordion title="First Group">
      <ListItem title="Child A-1" />
      <ListItem title="Child A-2" />
      <ListItem title="Child A-3" />
    </ListAccordion>
    <ListAccordion title="Second Group">
      <ListItem title="Child B-1" />
      <ListItem title="Child B-2" />
    </ListAccordion>
  </List>
);

export const ControlledAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <List>
      <ListAccordion
        title="Controlled Accordion"
        expanded={expanded}
        onPress={() => setExpanded((e) => !e)}
      >
        <ListItem title="Controlled Child 1" />
        <ListItem title="Controlled Child 2" />
      </ListAccordion>
    </List>
  );
};
