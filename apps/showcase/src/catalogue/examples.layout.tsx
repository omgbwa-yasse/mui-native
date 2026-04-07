/**
 * catalogue/examples.layout.tsx
 * ExampleConfig tuples for all LAYOUT-category components (17 total).
 * Phase 0: 3 migrated priority components with code stubs.
 * Phases 5+: Filled in by T068–T084.
 */

import React from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Divider,
  Fade,
  Grid,
  GridItem,
  Grow,
  HelperText,
  Paper,
  Popover,
  Popper,
  Portal,
  PortalHost,
  Slide,
  Stack,
  Text,
  Zoom,
} from '@mui-native';
import { View } from 'react-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Card (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const cardExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple card with content',
    code: `<Card>
  <Text variant="bodyMedium">Simple card content goes here.</Text>
</Card>`,
    render: () => (
      <Card>
        <Text variant="bodyMedium">Simple card content goes here.</Text>
      </Card>
    ),
  },
  {
    label: 'Outlined',
    description: 'Outlined border variant',
    code: `<Card variant="outlined">
  <Text variant="bodyMedium">Outlined card content.</Text>
</Card>`,
    render: () => (
      <Card variant="outlined">
        <Text variant="bodyMedium">Outlined card content.</Text>
      </Card>
    ),
  },
  {
    label: 'Composable',
    description: 'Card built from CardHeader, CardContent, and CardActions',
    code: `<Card>
  <CardHeader title="Project Alpha" subheader="Updated 2 days ago" />
  <CardContent>
    <Text variant="bodyMedium">
      Progress is on track. All milestones met for Q2.
    </Text>
  </CardContent>
  <CardActions>
    <Button variant="text" label="Details" onPress={() => {}} />
    <Button variant="text" label="Share" onPress={() => {}} />
  </CardActions>
</Card>`,
    render: () => (
      <Card>
        <CardHeader title="Project Alpha" subheader="Updated 2 days ago" />
        <CardContent>
          <Text variant="bodyMedium">
            Progress is on track. All milestones met for Q2.
          </Text>
        </CardContent>
        <CardActions>
          <Button variant="text" label="Details" onPress={() => {}} />
          <Button variant="text" label="Share" onPress={() => {}} />
        </CardActions>
      </Card>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Stack (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const stackExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Vertical',
    description: 'Default column direction',
    code: `<Stack>
  <Text variant="bodyMedium">Item One</Text>
  <Text variant="bodyMedium">Item Two</Text>
  <Text variant="bodyMedium">Item Three</Text>
</Stack>`,
    render: () => (
      <Stack>
        <Text variant="bodyMedium">Item One</Text>
        <Text variant="bodyMedium">Item Two</Text>
        <Text variant="bodyMedium">Item Three</Text>
      </Stack>
    ),
  },
  {
    label: 'Horizontal',
    description: 'Row direction',
    code: `<Stack direction="row" spacing={8}>
  <Text variant="bodyMedium">One</Text>
  <Text variant="bodyMedium">Two</Text>
  <Text variant="bodyMedium">Three</Text>
</Stack>`,
    render: () => (
      <Stack direction="row" spacing={8}>
        <Text variant="bodyMedium">One</Text>
        <Text variant="bodyMedium">Two</Text>
        <Text variant="bodyMedium">Three</Text>
      </Stack>
    ),
  },
  {
    label: 'With Gap',
    description: 'Stack with spacing gap',
    code: `<Stack spacing={16}>
  <Text variant="bodyMedium">Gapped item A</Text>
  <Text variant="bodyMedium">Gapped item B</Text>
  <Text variant="bodyMedium">Gapped item C</Text>
</Stack>`,
    render: () => (
      <Stack spacing={16}>
        <Text variant="bodyMedium">Gapped item A</Text>
        <Text variant="bodyMedium">Gapped item B</Text>
        <Text variant="bodyMedium">Gapped item C</Text>
      </Stack>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Divider (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const dividerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Horizontal',
    description: 'Full-width horizontal rule',
    code: `<Divider />`,
    render: () => <Divider />,
  },
  {
    label: 'Vertical',
    description: 'Vertical divider inside a row',
    code: `<Divider orientation="vertical" />`,
    render: () => <Divider orientation="vertical" />,
  },
  {
    label: 'With Label',
    description: 'Divider with centre label',
    code: `<Stack direction="row" alignItems="center" spacing={8}>
  <Divider />
  <Text variant="labelSmall">OR</Text>
  <Divider />
</Stack>`,
    render: () => (
      <Stack direction="row" alignItems="center" spacing={8}>
        <Divider />
        <Text variant="labelSmall">OR</Text>
        <Divider />
      </Stack>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Accordion (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const AccordionBasicExample: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Accordion expanded={expanded} onChange={setExpanded}>
      <AccordionSummary>What is React Native?</AccordionSummary>
      <AccordionDetails>
        <Text variant="bodyMedium">
          React Native lets you build mobile apps using React and JavaScript.
        </Text>
      </AccordionDetails>
    </Accordion>
  );
};

const AccordionMultipleExample: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <View style={{ gap: 4 }}>
      {['Section One', 'Section Two', 'Section Three'].map((title, i) => (
        <Accordion
          key={title}
          title={title}
          expanded={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        >
          <Text variant="bodyMedium">Content for {title}.</Text>
        </Accordion>
      ))}
    </View>
  );
};

const AccordionDisabledExample: React.FC = () => (
  <Accordion title="Disabled Section" disabled>
    <Text variant="bodyMedium">This content cannot be opened.</Text>
  </Accordion>
);

export const accordionExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Composable',
    description: 'AccordionSummary, AccordionDetails composable API',
    code: `const [expanded, setExpanded] = React.useState(false);
<Accordion expanded={expanded} onChange={setExpanded}>
  <AccordionSummary>What is React Native?</AccordionSummary>
  <AccordionDetails>
    <Text variant="bodyMedium">React Native lets you build mobile apps…</Text>
  </AccordionDetails>
</Accordion>`,
    render: () => <AccordionBasicExample />,
  },
  {
    label: 'Exclusive Group',
    description: 'Only one panel open at a time',
    code: `const [open, setOpen] = React.useState<number | null>(0);
['Section One', 'Section Two', 'Section Three'].map((title, i) => (
  <Accordion
    key={title}
    title={title}
    expanded={open === i}
    onToggle={() => setOpen(open === i ? null : i)}
  >
    <Text variant="bodyMedium">Content for {title}.</Text>
  </Accordion>
))`,
    render: () => <AccordionMultipleExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive accordion',
    code: `<Accordion title="Disabled Section" disabled>
  <Text variant="bodyMedium">This content cannot be opened.</Text>
</Accordion>`,
    render: () => <AccordionDisabledExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Box
// ─────────────────────────────────────────────────────────────────────────────

export const boxExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Padding',
    description: 'Box with uniform padding',
    code: `<Box p={4} sx={{ backgroundColor: '#E8F5E9', borderRadius: 8 }}>
  <Text variant="bodyMedium">Padded box</Text>
</Box>`,
    render: () => (
      <Box p={4} sx={{ backgroundColor: '#E8F5E9', borderRadius: 8 }}>
        <Text variant="bodyMedium">Padded box</Text>
      </Box>
    ),
  },
  {
    label: 'Horizontal Padding',
    description: 'Box with horizontal-only padding',
    code: `<Box px={6} py={2} sx={{ backgroundColor: '#E3F2FD', borderRadius: 8 }}>
  <Text variant="bodyMedium">Horizontal padding</Text>
</Box>`,
    render: () => (
      <Box px={6} py={2} sx={{ backgroundColor: '#E3F2FD', borderRadius: 8 }}>
        <Text variant="bodyMedium">Horizontal padding</Text>
      </Box>
    ),
  },
  {
    label: 'Margin',
    description: 'Box with margin applied',
    code: `<View style={{ backgroundColor: '#F3E5F5', padding: 4 }}>
  <Box m={4} sx={{ backgroundColor: '#CE93D8', borderRadius: 8, padding: 8 }}>
    <Text variant="bodyMedium">Box with margin</Text>
  </Box>
</View>`,
    render: () => (
      <View style={{ backgroundColor: '#F3E5F5', padding: 4 }}>
        <Box m={4} sx={{ backgroundColor: '#CE93D8', borderRadius: 8, padding: 8 }}>
          <Text variant="bodyMedium">Box with margin</Text>
        </Box>
      </View>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Collapse  — FR-005: Ex1 MUST use toggle button
// ─────────────────────────────────────────────────────────────────────────────

const CollapseToggleExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Collapse in={inProp}>
        <View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8 }}>
          <Text variant="bodyMedium">Collapsed content visible!</Text>
        </View>
      </Collapse>
    </View>
  );
};

const CollapseHorizontalExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Collapse' : 'Expand'} onPress={() => setInProp((v) => !v)} />
      <Collapse in={inProp} orientation="horizontal">
        <View style={{ backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8, width: 200 }}>
          <Text variant="bodyMedium">Horizontal collapse</Text>
        </View>
      </Collapse>
    </View>
  );
};

const CollapseMinHeightExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Collapse' : 'Expand'} onPress={() => setInProp((v) => !v)} />
      <Collapse in={inProp} collapsedSize={32}>
        <View style={{ backgroundColor: '#FFF8E1', padding: 12, borderRadius: 8 }}>
          <Text variant="bodyMedium">Partially visible when collapsed.</Text>
          <Text variant="bodySmall">Extra content revealed on expand.</Text>
        </View>
      </Collapse>
    </View>
  );
};

export const collapseExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Toggle',
    description: 'Collapse with show/hide button',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Collapse in={inProp}>
  <View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8 }}>
    <Text variant="bodyMedium">Collapsed content visible!</Text>
  </View>
</Collapse>`,
    render: () => <CollapseToggleExample />,
  },
  {
    label: 'Horizontal',
    description: 'Collapse along horizontal axis',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Collapse' : 'Expand'} onPress={() => setInProp((v) => !v)} />
<Collapse in={inProp} orientation="horizontal">
  <View style={{ backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8, width: 200 }}>
    <Text variant="bodyMedium">Horizontal collapse</Text>
  </View>
</Collapse>`,
    render: () => <CollapseHorizontalExample />,
  },
  {
    label: 'Min Height',
    description: 'Stay partially visible when collapsed',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Collapse' : 'Expand'} onPress={() => setInProp((v) => !v)} />
<Collapse in={inProp} collapsedSize={32}>
  <View style={{ backgroundColor: '#FFF8E1', padding: 12, borderRadius: 8 }}>
    <Text variant="bodyMedium">Partially visible when collapsed.</Text>
  </View>
</Collapse>`,
    render: () => <CollapseMinHeightExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Container
// ─────────────────────────────────────────────────────────────────────────────

export const containerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Container with default max-width',
    code: `<Container>
  <Text variant="bodyMedium">Content inside a Container</Text>
</Container>`,
    render: () => (
      <Container>
        <Text variant="bodyMedium">Content inside a Container</Text>
      </Container>
    ),
  },
  {
    label: 'Small Max-Width',
    description: 'Container constrained to sm breakpoint',
    code: `<Container maxWidth="sm">
  <Text variant="bodyMedium">Small max-width container</Text>
</Container>`,
    render: () => (
      <Container maxWidth="sm">
        <Text variant="bodyMedium">Small max-width container</Text>
      </Container>
    ),
  },
  {
    label: 'No Gutters',
    description: 'Container without horizontal padding',
    code: `<Container disableGutters>
  <Text variant="bodyMedium">No gutters</Text>
</Container>`,
    render: () => (
      <Container disableGutters>
        <Text variant="bodyMedium">No gutters</Text>
      </Container>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fade  — FR-005: Ex1 MUST use toggle button
// ─────────────────────────────────────────────────────────────────────────────

const FadeToggleExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Fade Out' : 'Fade In'} onPress={() => setInProp((v) => !v)} />
      <Fade in={inProp}>
        <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Faded content</Text>
        </View>
      </Fade>
    </View>
  );
};

const FadeSlowExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Fade in={inProp} timeout={1000}>
        <View style={{ backgroundColor: '#FCE4EC', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slow fade (1 s)</Text>
        </View>
      </Fade>
    </View>
  );
};

const FadeUnmountExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Fade in={inProp} unmountOnExit>
        <View style={{ backgroundColor: '#E0F7FA', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Unmounts when faded out</Text>
        </View>
      </Fade>
    </View>
  );
};

export const fadeExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Toggle',
    description: 'Fade in / out with a button',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Fade Out' : 'Fade In'} onPress={() => setInProp((v) => !v)} />
<Fade in={inProp}>
  <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Faded content</Text>
  </View>
</Fade>`,
    render: () => <FadeToggleExample />,
  },
  {
    label: 'Slow Fade',
    description: '1-second fade transition',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Fade in={inProp} timeout={1000}>
  <View style={{ backgroundColor: '#FCE4EC', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slow fade (1 s)</Text>
  </View>
</Fade>`,
    render: () => <FadeSlowExample />,
  },
  {
    label: 'Unmount on Exit',
    description: 'Component unmounts when faded out',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Fade in={inProp} unmountOnExit>
  <View style={{ backgroundColor: '#E0F7FA', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Unmounts when faded out</Text>
  </View>
</Fade>`,
    render: () => <FadeUnmountExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Grid
// ─────────────────────────────────────────────────────────────────────────────

export const gridExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Equal Columns',
    description: 'Two equal columns',
    code: `<Grid columns={2} spacing={8}>
  <GridItem xs={1}><View style={{ backgroundColor: '#E8EAF6', padding: 12, borderRadius: 6 }}><Text variant="labelSmall">Col 1</Text></View></GridItem>
  <GridItem xs={1}><View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 6 }}><Text variant="labelSmall">Col 2</Text></View></GridItem>
</Grid>`,
    render: () => (
      <Grid columns={2} spacing={8}>
        <GridItem xs={1}>
          <View style={{ backgroundColor: '#E8EAF6', padding: 12, borderRadius: 6 }}>
            <Text variant="labelSmall">Col 1</Text>
          </View>
        </GridItem>
        <GridItem xs={1}>
          <View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 6 }}>
            <Text variant="labelSmall">Col 2</Text>
          </View>
        </GridItem>
      </Grid>
    ),
  },
  {
    label: 'Three Columns',
    description: 'Three-column grid with spacing',
    code: `<Grid columns={3} spacing={8}>
  {['A', 'B', 'C'].map((label) => (
    <GridItem key={label} xs={1}>
      <View style={{ backgroundColor: '#FFF8E1', padding: 12, borderRadius: 6 }}>
        <Text variant="labelSmall">{label}</Text>
      </View>
    </GridItem>
  ))}
</Grid>`,
    render: () => (
      <Grid columns={3} spacing={8}>
        {['A', 'B', 'C'].map((label) => (
          <GridItem key={label} xs={1}>
            <View style={{ backgroundColor: '#FFF8E1', padding: 12, borderRadius: 6 }}>
              <Text variant="labelSmall">{label}</Text>
            </View>
          </GridItem>
        ))}
      </Grid>
    ),
  },
  {
    label: 'Mixed Spans',
    description: 'Items spanning different column counts',
    code: `<Grid columns={3} spacing={8}>
  <GridItem xs={2}><View style={{ backgroundColor: '#E3F2FD', padding: 12, borderRadius: 6 }}><Text variant="labelSmall">Span 2</Text></View></GridItem>
  <GridItem xs={1}><View style={{ backgroundColor: '#FCE4EC', padding: 12, borderRadius: 6 }}><Text variant="labelSmall">Span 1</Text></View></GridItem>
</Grid>`,
    render: () => (
      <Grid columns={3} spacing={8}>
        <GridItem xs={2}>
          <View style={{ backgroundColor: '#E3F2FD', padding: 12, borderRadius: 6 }}>
            <Text variant="labelSmall">Span 2</Text>
          </View>
        </GridItem>
        <GridItem xs={1}>
          <View style={{ backgroundColor: '#FCE4EC', padding: 12, borderRadius: 6 }}>
            <Text variant="labelSmall">Span 1</Text>
          </View>
        </GridItem>
      </Grid>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Grow  — FR-005: Ex1 MUST use toggle button
// ─────────────────────────────────────────────────────────────────────────────

const GrowToggleExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Shrink' : 'Grow'} onPress={() => setInProp((v) => !v)} />
      <Grow in={inProp}>
        <View style={{ backgroundColor: '#E8F5E9', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Grown content</Text>
        </View>
      </Grow>
    </View>
  );
};

const GrowSlowExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Grow in={inProp} timeout={800}>
        <View style={{ backgroundColor: '#FFF3E0', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slow grow (800 ms)</Text>
        </View>
      </Grow>
    </View>
  );
};

const GrowAutoExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Grow in={inProp} timeout={500}>
        <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Auto duration grow</Text>
        </View>
      </Grow>
    </View>
  );
};

export const growExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Toggle',
    description: 'Grow in / shrink out with a button',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Shrink' : 'Grow'} onPress={() => setInProp((v) => !v)} />
<Grow in={inProp}>
  <View style={{ backgroundColor: '#E8F5E9', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Grown content</Text>
  </View>
</Grow>`,
    render: () => <GrowToggleExample />,
  },
  {
    label: 'Custom Duration',
    description: '800 ms grow transition',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Grow in={inProp} timeout={800}>
  <View style={{ backgroundColor: '#FFF3E0', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slow grow (800 ms)</Text>
  </View>
</Grow>`,
    render: () => <GrowSlowExample />,
  },
  {
    label: 'Auto Timeout',
    description: 'Duration computed automatically',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Grow in={inProp} timeout="auto">
  <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Auto duration grow</Text>
  </View>
</Grow>`,
    render: () => <GrowAutoExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HelperText
// ─────────────────────────────────────────────────────────────────────────────

export const helperTextExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Normal',
    description: 'Informational helper text',
    code: `<HelperText type="normal">Enter your full name.</HelperText>`,
    render: () => <HelperText type="normal">Enter your full name.</HelperText>,
  },
  {
    label: 'Error',
    description: 'Error helper text in red',
    code: `<HelperText type="error">This field is required.</HelperText>`,
    render: () => <HelperText type="error">This field is required.</HelperText>,
  },
  {
    label: 'Info',
    description: 'Info variant with blue colour',
    code: `<HelperText type="info">Password must be at least 8 characters.</HelperText>`,
    render: () => (
      <HelperText type="info">Password must be at least 8 characters.</HelperText>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Paper
// ─────────────────────────────────────────────────────────────────────────────

export const paperExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Paper surface with default elevation',
    code: `<Paper>
  <Text variant="bodyMedium" style={{ padding: 16 }}>Paper content</Text>
</Paper>`,
    render: () => (
      <Paper>
        <Text variant="bodyMedium" style={{ padding: 16 }}>Paper content</Text>
      </Paper>
    ),
  },
  {
    label: 'High Elevation',
    description: 'Paper with elevation 4',
    code: `<Paper elevation={4}>
  <Text variant="bodyMedium" style={{ padding: 16 }}>Elevated paper</Text>
</Paper>`,
    render: () => (
      <Paper elevation={4}>
        <Text variant="bodyMedium" style={{ padding: 16 }}>Elevated paper</Text>
      </Paper>
    ),
  },
  {
    label: 'Square',
    description: 'Paper without rounded corners',
    code: `<Paper square>
  <Text variant="bodyMedium" style={{ padding: 16 }}>Square paper</Text>
</Paper>`,
    render: () => (
      <Paper square>
        <Text variant="bodyMedium" style={{ padding: 16 }}>Square paper</Text>
      </Paper>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Popover (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const PopoverBasicExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Popover" onPress={() => setOpen(true)} />
      </View>
      <Popover open={open} anchorRef={anchorRef} onClose={() => setOpen(false)}>
        <View style={{ padding: 16 }}>
          <Text variant="bodyMedium">Popover content</Text>
        </View>
      </Popover>
    </>
  );
};

const PopoverTopExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Popover (top)" onPress={() => setOpen(true)} />
      </View>
      <Popover
        open={open}
        anchorRef={anchorRef}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <View style={{ padding: 16 }}>
          <Text variant="bodyMedium">Anchored from top</Text>
        </View>
      </Popover>
    </>
  );
};

const PopoverElevatedExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Open Elevated Popover" onPress={() => setOpen(true)} />
      </View>
      <Popover open={open} anchorRef={anchorRef} onClose={() => setOpen(false)} elevation={4}>
        <View style={{ padding: 16 }}>
          <Text variant="bodyMedium">High elevation popover</Text>
        </View>
      </Popover>
    </>
  );
};

export const popoverExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Popover anchored below button',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Popover" onPress={() => setOpen(true)} />
</View>
<Popover open={open} anchorRef={anchorRef} onClose={() => setOpen(false)}>
  <View style={{ padding: 16 }}>
    <Text variant="bodyMedium">Popover content</Text>
  </View>
</Popover>`,
    render: () => <PopoverBasicExample />,
  },
  {
    label: 'Top Anchor',
    description: 'Popover opening from the top edge',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Popover (top)" onPress={() => setOpen(true)} />
</View>
<Popover
  open={open}
  anchorRef={anchorRef}
  onClose={() => setOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <View style={{ padding: 16 }}>
    <Text variant="bodyMedium">Anchored from top</Text>
  </View>
</Popover>`,
    render: () => <PopoverTopExample />,
  },
  {
    label: 'Elevated',
    description: 'Popover with custom shadow elevation',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Open Elevated Popover" onPress={() => setOpen(true)} />
</View>
<Popover open={open} anchorRef={anchorRef} onClose={() => setOpen(false)} elevation={4}>
  <View style={{ padding: 16 }}>
    <Text variant="bodyMedium">High elevation popover</Text>
  </View>
</Popover>`,
    render: () => <PopoverElevatedExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Popper (stateful wrapper)
// ─────────────────────────────────────────────────────────────────────────────

const PopperBasicExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Toggle Popper" onPress={() => setOpen((v) => !v)} />
      </View>
      <Popper open={open} anchorRef={anchorRef}>
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
          <Text variant="bodySmall">Popper content</Text>
        </View>
      </Popper>
    </>
  );
};

const PopperTopExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Toggle Popper (top)" onPress={() => setOpen((v) => !v)} />
      </View>
      <Popper open={open} anchorRef={anchorRef} placement="top">
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
          <Text variant="bodySmall">Popper above</Text>
        </View>
      </Popper>
    </>
  );
};

const PopperKeepMountedExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <View ref={anchorRef}>
        <Button label="Toggle Popper" onPress={() => setOpen((v) => !v)} />
      </View>
      <Popper open={open} anchorRef={anchorRef} keepMounted>
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
          <Text variant="bodySmall">Kept in DOM when hidden</Text>
        </View>
      </Popper>
    </>
  );
};

export const popperExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Popper anchored below its trigger',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Toggle Popper" onPress={() => setOpen((v) => !v)} />
</View>
<Popper open={open} anchorRef={anchorRef}>
  <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
    <Text variant="bodySmall">Popper content</Text>
  </View>
</Popper>`,
    render: () => <PopperBasicExample />,
  },
  {
    label: 'Top Placement',
    description: 'Popper appearing above its anchor',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Toggle Popper (top)" onPress={() => setOpen((v) => !v)} />
</View>
<Popper open={open} anchorRef={anchorRef} placement="top">
  <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
    <Text variant="bodySmall">Popper above</Text>
  </View>
</Popper>`,
    render: () => <PopperTopExample />,
  },
  {
    label: 'Keep Mounted',
    description: 'Popper kept in DOM when closed',
    code: `const anchorRef = React.useRef<View | null>(null);
const [open, setOpen] = React.useState(false);
<View ref={anchorRef}>
  <Button label="Toggle Popper" onPress={() => setOpen((v) => !v)} />
</View>
<Popper open={open} anchorRef={anchorRef} keepMounted>
  <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 4 }}>
    <Text variant="bodySmall">Kept in DOM when hidden</Text>
  </View>
</Popper>`,
    render: () => <PopperKeepMountedExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Portal
// ─────────────────────────────────────────────────────────────────────────────

export const portalExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Content teleported via Portal into PortalHost',
    code: `<PortalHost>
  <Text variant="bodyMedium">Host area</Text>
  <Portal>
    <Text variant="labelSmall">Rendered inside PortalHost</Text>
  </Portal>
</PortalHost>`,
    render: () => (
      <PortalHost>
        <Text variant="bodyMedium">Host area</Text>
        <Portal>
          <Text variant="labelSmall">Rendered inside PortalHost</Text>
        </Portal>
      </PortalHost>
    ),
  },
  {
    label: 'Multiple Portals',
    description: 'Two portals teleporting into the same host',
    code: `<PortalHost>
  <Portal><Text variant="labelSmall">Portal A content</Text></Portal>
  <Portal><Text variant="labelSmall">Portal B content</Text></Portal>
</PortalHost>`,
    render: () => (
      <PortalHost>
        <Portal>
          <Text variant="labelSmall">Portal A content</Text>
        </Portal>
        <Portal>
          <Text variant="labelSmall">Portal B content</Text>
        </Portal>
      </PortalHost>
    ),
  },
  {
    label: 'Overlay Use-Case',
    description: 'Portal used to render an overlay above siblings',
    code: `<PortalHost>
  <Text variant="bodyMedium">Regular content</Text>
  <Portal>
    <View style={{ position: 'absolute', top: 0, right: 0 }}>
      <Text variant="labelSmall">Floating badge</Text>
    </View>
  </Portal>
</PortalHost>`,
    render: () => (
      <PortalHost>
        <Text variant="bodyMedium">Regular content</Text>
        <Portal>
          <View style={{ position: 'absolute', top: 0, right: 0 }}>
            <Text variant="labelSmall">Floating badge</Text>
          </View>
        </Portal>
      </PortalHost>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Slide  — FR-005: Ex1 MUST use toggle button
// ─────────────────────────────────────────────────────────────────────────────

const SlideToggleExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Slide Out' : 'Slide In'} onPress={() => setInProp((v) => !v)} />
      <Slide in={inProp} direction="up">
        <View style={{ backgroundColor: '#E8F5E9', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slides up</Text>
        </View>
      </Slide>
    </View>
  );
};

const SlideLeftExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Slide in={inProp} direction="left">
        <View style={{ backgroundColor: '#E3F2FD', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slides from right</Text>
        </View>
      </Slide>
    </View>
  );
};

const SlideDownExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Slide in={inProp} direction="down">
        <View style={{ backgroundColor: '#FFF3E0', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slides down</Text>
        </View>
      </Slide>
    </View>
  );
};

export const slideExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Slide Up',
    description: 'Content sliding up into view',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Slide Out' : 'Slide In'} onPress={() => setInProp((v) => !v)} />
<Slide in={inProp} direction="up">
  <View style={{ backgroundColor: '#E8F5E9', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slides up</Text>
  </View>
</Slide>`,
    render: () => <SlideToggleExample />,
  },
  {
    label: 'Slide Left',
    description: 'Content sliding from the right',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Slide in={inProp} direction="left">
  <View style={{ backgroundColor: '#E3F2FD', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slides from right</Text>
  </View>
</Slide>`,
    render: () => <SlideLeftExample />,
  },
  {
    label: 'Slide Down',
    description: 'Content sliding downward',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Slide in={inProp} direction="down">
  <View style={{ backgroundColor: '#FFF3E0', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slides down</Text>
  </View>
</Slide>`,
    render: () => <SlideDownExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Zoom  — FR-005: Ex1 MUST use toggle button
// ─────────────────────────────────────────────────────────────────────────────

const ZoomToggleExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Zoom Out' : 'Zoom In'} onPress={() => setInProp((v) => !v)} />
      <Zoom in={inProp}>
        <View style={{ backgroundColor: '#FCE4EC', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Zoomed content</Text>
        </View>
      </Zoom>
    </View>
  );
};

const ZoomSlowExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Zoom in={inProp} timeout={700}>
        <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Slow zoom (700 ms)</Text>
        </View>
      </Zoom>
    </View>
  );
};

const ZoomUnmountExample: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);
  return (
    <View style={{ gap: 8 }}>
      <Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
      <Zoom in={inProp} unmountOnExit>
        <View style={{ backgroundColor: '#E0F7FA', padding: 16, borderRadius: 8 }}>
          <Text variant="bodyMedium">Unmounts when zoomed out</Text>
        </View>
      </Zoom>
    </View>
  );
};

export const zoomExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic Toggle',
    description: 'Zoom in / out with a button',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Zoom Out' : 'Zoom In'} onPress={() => setInProp((v) => !v)} />
<Zoom in={inProp}>
  <View style={{ backgroundColor: '#FCE4EC', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Zoomed content</Text>
  </View>
</Zoom>`,
    render: () => <ZoomToggleExample />,
  },
  {
    label: 'Custom Duration',
    description: '700 ms zoom transition',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Zoom in={inProp} timeout={700}>
  <View style={{ backgroundColor: '#E8EAF6', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Slow zoom (700 ms)</Text>
  </View>
</Zoom>`,
    render: () => <ZoomSlowExample />,
  },
  {
    label: 'Unmount on Exit',
    description: 'Component unmounts after zoom-out',
    code: `const [inProp, setInProp] = React.useState(false);
<Button label={inProp ? 'Hide' : 'Show'} onPress={() => setInProp((v) => !v)} />
<Zoom in={inProp} unmountOnExit>
  <View style={{ backgroundColor: '#E0F7FA', padding: 16, borderRadius: 8 }}>
    <Text variant="bodyMedium">Unmounts when zoomed out</Text>
  </View>
</Zoom>`,
    render: () => <ZoomUnmountExample />,
  },
];
