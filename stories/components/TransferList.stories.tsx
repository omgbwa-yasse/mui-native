import React, { useState } from 'react';
import { View } from 'react-native';
import { TransferList } from '../../src/components/TransferList';
import type { TransferItem } from '../../src/components/TransferList';

const initialLeft: TransferItem[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date' },
  { id: '5', label: 'Elderberry' },
];

export default {
  title: 'Form/TransferList',
  component: TransferList,
};

export const Default = () => {
  const [left, setLeft] = useState<TransferItem[]>(initialLeft);
  const [right, setRight] = useState<TransferItem[]>([]);
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <TransferList
        left={left}
        right={right}
        onTransfer={(l, r) => {
          setLeft(l);
          setRight(r);
        }}
        leftTitle="Available"
        rightTitle="Selected"
      />
    </View>
  );
};

export const WithPreselected = () => {
  const [left, setLeft] = useState<TransferItem[]>([
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
    { id: '3', label: 'Cherry' },
  ]);
  const [right, setRight] = useState<TransferItem[]>([
    { id: '4', label: 'Date' },
    { id: '5', label: 'Elderberry' },
  ]);
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <TransferList
        left={left}
        right={right}
        onTransfer={(l, r) => {
          setLeft(l);
          setRight(r);
        }}
      />
    </View>
  );
};
