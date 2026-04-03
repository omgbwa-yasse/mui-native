import React from 'react';
import { View } from 'react-native';
import { Box } from '../../src/components/Box/Box';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Box',
};

const CellStyle = { backgroundColor: '#E3F2FD', borderRadius: 4 };

export const PaddingShorthands = () => (
  <View style={{ gap: 8 }}>
    <Box p={2} style={CellStyle}>
      <Text variant="bodyMedium">p={2} (8dp padding all sides)</Text>
    </Box>
    <Box px={4} py={2} style={CellStyle}>
      <Text variant="bodyMedium">px={4} py={2}</Text>
    </Box>
    <Box pt={4} pb={2} pl={3} pr={1} style={CellStyle}>
      <Text variant="bodyMedium">pt={4} pb={2} pl={3} pr={1}</Text>
    </Box>
  </View>
);

export const MarginShorthands = () => (
  <View style={{ backgroundColor: '#FFF9C4', padding: 4 }}>
    <Box m={4} style={{ backgroundColor: '#FFECB3', padding: 8 }}>
      <Text variant="bodyMedium">m={4} (16dp margin all sides)</Text>
    </Box>
    <Box mx={6} my={2} style={{ backgroundColor: '#FFE0B2', padding: 8 }}>
      <Text variant="bodyMedium">mx={6} my={2}</Text>
    </Box>
  </View>
);

export const SxEscapeHatch = () => (
  <Box
    p={3}
    sx={{ backgroundColor: '#F3E5F5', borderRadius: 12, borderWidth: 2, borderColor: '#AB47BC' }}
  >
    <Text variant="bodyMedium">sx escape hatch — custom border + background</Text>
  </Box>
);

export const Nesting = () => (
  <Box p={4} style={{ backgroundColor: '#E8F5E9' }}>
    <Text variant="titleSmall">Outer box (p=4)</Text>
    <Box p={2} mt={2} style={{ backgroundColor: '#C8E6C9' }}>
      <Text variant="bodyMedium">Inner box (p=2, mt=2)</Text>
    </Box>
  </Box>
);
