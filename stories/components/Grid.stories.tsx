import React from 'react';
import { View } from 'react-native';
import { Grid, GridItem } from '../../src/components/Grid/Grid';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Layout/Grid',
};

const Cell = ({ label, color = '#E3F2FD' }: { label: string; color?: string }) => (
  <View style={{ backgroundColor: color, padding: 12, borderRadius: 4, minHeight: 48 }}>
    <Text variant="bodySmall">{label}</Text>
  </View>
);

export const TwoColumns = () => (
  <Grid cols={2} spacing={2}>
    <GridItem xs={1}><Cell label="1/2" /></GridItem>
    <GridItem xs={1}><Cell label="1/2" color="#E8F5E9" /></GridItem>
    <GridItem xs={1}><Cell label="1/2" color="#FCE4EC" /></GridItem>
    <GridItem xs={1}><Cell label="1/2" color="#FFF9C4" /></GridItem>
  </Grid>
);

export const ThreeColumns = () => (
  <Grid cols={3} spacing={2}>
    <GridItem xs={1}><Cell label="1/3" /></GridItem>
    <GridItem xs={1}><Cell label="1/3" color="#E8F5E9" /></GridItem>
    <GridItem xs={1}><Cell label="1/3" color="#FCE4EC" /></GridItem>
    <GridItem xs={2}><Cell label="2/3" color="#FFF9C4" /></GridItem>
    <GridItem xs={1}><Cell label="1/3" color="#F3E5F5" /></GridItem>
  </Grid>
);

export const FourColumns = () => (
  <Grid cols={4} spacing={1}>
    <GridItem xs={1}><Cell label="1" /></GridItem>
    <GridItem xs={1}><Cell label="1" color="#E8F5E9" /></GridItem>
    <GridItem xs={1}><Cell label="1" color="#FCE4EC" /></GridItem>
    <GridItem xs={1}><Cell label="1" color="#FFF9C4" /></GridItem>
    <GridItem xs={2}><Cell label="2" color="#F3E5F5" /></GridItem>
    <GridItem xs={2}><Cell label="2" color="#E0F7FA" /></GridItem>
    <GridItem xs={4}><Cell label="4 (full width)" color="#FFECB3" /></GridItem>
  </Grid>
);

export const ColumnAndRowSpacing = () => (
  <Grid cols={3} columnSpacing={4} rowSpacing={1}>
    <GridItem xs={1}><Cell label="Col gap=4dp" /></GridItem>
    <GridItem xs={1}><Cell label="Row gap=1dp" color="#E8F5E9" /></GridItem>
    <GridItem xs={1}><Cell label="Col+Row" color="#FCE4EC" /></GridItem>
    <GridItem xs={2}><Cell label="Span 2" color="#FFF9C4" /></GridItem>
    <GridItem xs={1}><Cell label="Span 1" color="#F3E5F5" /></GridItem>
  </Grid>
);
