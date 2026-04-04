import React from 'react';
import { View } from 'react-native';
import { SimpleTreeView } from '../../src/components/TreeView/SimpleTreeView';
import { TreeItem } from '../../src/components/TreeView/TreeItem';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Advanced/TreeView',
};

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Basic = () => (
  <View style={{ padding: 16 }}>
    <SimpleTreeView>
      <TreeItem itemId="continents" label="Continents">
        <TreeItem itemId="africa" label="Africa">
          <TreeItem itemId="eg" label="Egypt" />
          <TreeItem itemId="ng" label="Nigeria" />
          <TreeItem itemId="za" label="South Africa" />
        </TreeItem>
        <TreeItem itemId="americas" label="Americas">
          <TreeItem itemId="br" label="Brazil" />
          <TreeItem itemId="ca" label="Canada" />
          <TreeItem itemId="us" label="United States" />
        </TreeItem>
        <TreeItem itemId="asia" label="Asia">
          <TreeItem itemId="cn" label="China" />
          <TreeItem itemId="in" label="India" />
          <TreeItem itemId="jp" label="Japan" />
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  </View>
);

export const MultiSelectWithCheckboxes = () => (
  <View style={{ padding: 16 }}>
    <Text variant="bodySmall" style={{ marginBottom: 8 }}>
      Multi-select with checkbox controls
    </Text>
    <SimpleTreeView multiSelect checkboxSelection defaultExpandedItems={['fruits']}>
      <TreeItem itemId="fruits" label="Fruits">
        <TreeItem itemId="citrus" label="Citrus">
          <TreeItem itemId="lemon" label="Lemon" />
          <TreeItem itemId="orange" label="Orange" />
          <TreeItem itemId="lime" label="Lime" />
        </TreeItem>
        <TreeItem itemId="berries" label="Berries">
          <TreeItem itemId="strawberry" label="Strawberry" />
          <TreeItem itemId="blueberry" label="Blueberry" />
        </TreeItem>
      </TreeItem>
      <TreeItem itemId="vegetables" label="Vegetables">
        <TreeItem itemId="carrot" label="Carrot" />
        <TreeItem itemId="broccoli" label="Broccoli" disabled />
        <TreeItem itemId="spinach" label="Spinach" />
      </TreeItem>
    </SimpleTreeView>
  </View>
);

export const WithDisabledNodes = () => (
  <View style={{ padding: 16 }}>
    <Text variant="bodySmall" style={{ marginBottom: 8 }}>
      Disabled nodes are shown at 38% opacity and ignore presses
    </Text>
    <SimpleTreeView disabledItems={['node2', 'node4']}>
      <TreeItem itemId="node1" label="Active Node 1">
        <TreeItem itemId="node1a" label="Child 1A" />
        <TreeItem itemId="node1b" label="Child 1B" />
      </TreeItem>
      <TreeItem itemId="node2" label="Disabled Node 2 (parent)">
        <TreeItem itemId="node2a" label="Child 2A" />
      </TreeItem>
      <TreeItem itemId="node3" label="Active Node 3" />
      <TreeItem itemId="node4" label="Disabled Leaf 4" />
    </SimpleTreeView>
  </View>
);

export const PreExpanded = () => (
  <View style={{ padding: 16 }}>
    <Text variant="bodySmall" style={{ marginBottom: 8 }}>
      Expanded by default via defaultExpandedItems
    </Text>
    <SimpleTreeView defaultExpandedItems={['level1', 'level2']}>
      <TreeItem itemId="level1" label="Level 1">
        <TreeItem itemId="level2" label="Level 2">
          <TreeItem itemId="level3a" label="Level 3a" />
          <TreeItem itemId="level3b" label="Level 3b" />
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  </View>
);
