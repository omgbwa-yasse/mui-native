import React, { useState } from 'react';
import { View } from 'react-native';
import { Accordion } from '../../src/components/Accordion/Accordion';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Accordion',
};

const Body = ({ text }: { text: string }) => (
  <View style={{ padding: 16 }}>
    <Text variant="bodyMedium">{text}</Text>
  </View>
);

export const SingleExpand = () => (
  <Accordion title="What is React Native?">
    <Body text="React Native is a framework for building native mobile apps using React and JavaScript." />
  </Accordion>
);

export const MultipleAccordions = () => (
  <View style={{ gap: 1 }}>
    <Accordion title="Section 1">
      <Body text="Content for section 1." />
    </Accordion>
    <Accordion title="Section 2">
      <Body text="Content for section 2." />
    </Accordion>
    <Accordion title="Section 3">
      <Body text="Content for section 3." />
    </Accordion>
  </View>
);

export const Controlled = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Text variant="bodySmall">expanded: {String(expanded)}</Text>
      <Accordion
        title="Controlled accordion"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Body text="This accordion is controlled externally via state." />
      </Accordion>
    </View>
  );
};

export const StartExpanded = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      title="Starts expanded"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Body text="This accordion starts in the expanded state." />
    </Accordion>
  );
};

export const Disabled = () => (
  <Accordion title="Disabled accordion" disabled>
    <Body text="This content is inaccessible when disabled." />
  </Accordion>
);
