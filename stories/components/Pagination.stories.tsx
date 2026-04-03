import React, { useState } from 'react';
import { View } from 'react-native';
import { Pagination } from '../../src/components/Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
};

export const Default = () => {
  const [page, setPage] = useState(1);
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Pagination count={10} page={page} onPageChange={setPage} />
    </View>
  );
};

export const WithFirstLastButtons = () => {
  const [page, setPage] = useState(5);
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Pagination
        count={10}
        page={page}
        onPageChange={setPage}
        showFirstButton
        showLastButton
      />
    </View>
  );
};

export const IncreasedSiblings = () => {
  const [page, setPage] = useState(6);
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Pagination count={20} page={page} onPageChange={setPage} siblingCount={2} />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 16, alignItems: 'center' }}>
    <Pagination count={10} page={3} onPageChange={() => {}} disabled />
  </View>
);

export const SmallSize = () => {
  const [page, setPage] = useState(1);
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Pagination count={10} page={page} onPageChange={setPage} size="small" />
    </View>
  );
};

export const LargeSize = () => {
  const [page, setPage] = useState(1);
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Pagination count={10} page={page} onPageChange={setPage} size="large" />
    </View>
  );
};
