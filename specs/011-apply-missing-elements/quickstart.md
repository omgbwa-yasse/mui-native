# Quickstart: Feature 011 — Apply Missing MUI-Aligned Components

**Branch**: `011-apply-missing-elements`  
**Generated**: 2026-04-06 by speckit.plan

---

## Installation

No new dependencies required. All new components are part of the existing `mui-native` library package.

```bash
# Already installed as part of the library
# No additional packages needed
```

---

## 1. Composable List

### Basic settings list with icons and sub-headings

```tsx
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Icon,
} from 'mui-native';

function SettingsScreen() {
  return (
    <List>
      <ListSubheader>Account</ListSubheader>

      <ListItemButton onPress={() => navigate('Profile')}>
        <ListItemIcon>
          <Icon name="person" />
        </ListItemIcon>
        <ListItemText primary="Profile" secondary="Edit your name and photo" />
      </ListItemButton>

      <ListItemButton onPress={() => navigate('Security')} selected>
        <ListItemIcon>
          <Icon name="lock" />
        </ListItemIcon>
        <ListItemText primary="Security" />
      </ListItemButton>

      <ListSubheader>Preferences</ListSubheader>

      <ListItemButton disabled>
        <ListItemAvatar>
          <Avatar>N</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Notifications" secondary="Unavailable in your region" />
      </ListItemButton>
    </List>
  );
}
```

### Dense list

```tsx
<List>
  {items.map((item) => (
    <ListItemButton key={item.id} dense onPress={() => select(item.id)}>
      <ListItemText primary={item.label} />
    </ListItemButton>
  ))}
</List>
```

---

## 2. Composable Accordion

### FAQ accordion

```tsx
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Icon } from 'mui-native';

function FaqScreen() {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<Icon name="expand-more" />}>
          What payment methods do you accept?
        </AccordionSummary>
        <AccordionDetails>
          We accept Visa, Mastercard, and PayPal.
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<Icon name="expand-more" />}>
          How do I cancel my subscription?
        </AccordionSummary>
        <AccordionDetails>
          Go to Settings → Subscription → Cancel.
        </AccordionDetails>
        <AccordionActions>
          <Button variant="text" onPress={openChat}>Contact Support</Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}
```

### Controlled accordion

```tsx
const [expanded, setExpanded] = React.useState<string | false>(false);

const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
  setExpanded(isExpanded ? panel : false);
};

<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
  <AccordionSummary expandIcon={<Icon name="expand-more" />}>
    Panel 1
  </AccordionSummary>
  <AccordionDetails>Content for panel 1</AccordionDetails>
</Accordion>
```

### Data-driven Accordion (existing API — unchanged)

```tsx
// The existing data-driven API continues to work exactly as before:
<Accordion
  title="Legacy item"
  expanded={open}
  onToggle={setOpen}
  right={(expanded) => <Icon name={expanded ? 'minus' : 'plus'} />}
>
  Legacy body content here
</Accordion>
```

---

## 3. Composable Stepper

### Linear checkout flow

```tsx
import { Stepper, Step, StepLabel, StepContent, Button } from 'mui-native';

function CheckoutFlow() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Shipping address</StepLabel>
        <StepContent>
          <AddressForm />
          <Button onPress={() => setActiveStep(1)}>Next</Button>
        </StepContent>
      </Step>

      <Step>
        <StepLabel>Payment details</StepLabel>
        <StepContent>
          <PaymentForm />
          <Button onPress={() => setActiveStep(2)}>Next</Button>
          <Button variant="text" onPress={() => setActiveStep(0)}>Back</Button>
        </StepContent>
      </Step>

      <Step>
        <StepLabel>Review your order</StepLabel>
        <StepContent>
          <OrderSummary />
          <Button onPress={placeOrder}>Place Order</Button>
        </StepContent>
      </Step>
    </Stepper>
  );
}
```

### MobileStepper (dots variant)

```tsx
import { MobileStepper, Button, Icon } from 'mui-native';

function OnboardingFlow() {
  const [step, setStep] = React.useState(0);
  const maxSteps = 5;

  return (
    <MobileStepper
      steps={maxSteps}
      activeStep={step}
      variant="dots"
      backButton={
        <Button size="small" onPress={() => setStep(step - 1)} disabled={step === 0}>
          <Icon name="chevron-left" /> Back
        </Button>
      }
      nextButton={
        <Button size="small" onPress={() => setStep(step + 1)} disabled={step === maxSteps - 1}>
          Next <Icon name="chevron-right" />
        </Button>
      }
    />
  );
}
```

### MobileStepper (progress variant)

```tsx
<MobileStepper steps={5} activeStep={2} variant="progress" />
```

---

## 4. RadioGroup

### Controlled form field

```tsx
import { RadioGroup, Radio } from 'mui-native';

function PlanSelector() {
  const [plan, setPlan] = React.useState('free');

  return (
    <RadioGroup
      name="plan"
      value={plan}
      onChange={(_, value) => setPlan(value)}
    >
      <Radio value="free" />
      <Radio value="pro" />
      <Radio value="enterprise" />
    </RadioGroup>
  );
}
```

### Horizontal layout

```tsx
<RadioGroup name="rating" value={rating} onChange={(_, v) => setRating(v)} row>
  {[1, 2, 3, 4, 5].map((n) => (
    <Radio key={n} value={String(n)} accessibilityLabel={`${n} star`} />
  ))}
</RadioGroup>
```

### Uncontrolled with defaultValue

```tsx
<RadioGroup name="theme" defaultValue="light" onValueChange={handleThemeChange}>
  <Radio value="light" />
  <Radio value="dark" />
  <Radio value="system" />
</RadioGroup>
```

---

## 5. `useMediaQuery`

### Named breakpoints

```tsx
import { useMediaQuery } from 'mui-native';

function ResponsiveLayout() {
  const isDesktop = useMediaQuery('lg');   // width >= 1200
  const isTablet = useMediaQuery('md');   // width >= 900

  if (isDesktop) return <DesktopLayout />;
  if (isTablet) return <TabletLayout />;
  return <MobileLayout />;
}
```

### Raw query string

```tsx
const isNarrow = useMediaQuery('(max-width: 599px)');
const isWide   = useMediaQuery('(min-width: 1200px)');

return (
  <View style={{ flexDirection: isWide ? 'row' : 'column' }}>
    <Sidebar hidden={isNarrow} />
    <Content />
  </View>
);
```

### Orientation-aware layout (using Dimensions)

```tsx
// useMediaQuery handles width; for orientation detection use useWindowDimensions directly:
import { useWindowDimensions } from 'react-native';

function OrientationAwareLayout() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isMdBreakpoint = useMediaQuery('md');

  // ...
}
```

---

## Testing Patterns

### Testing ListItemButton accessibility

```tsx
const { getByRole } = render(<ListItemButton onPress={jest.fn()}>Action</ListItemButton>);
// Works because accessible={true} + role="button" are set by default:
getByRole('button');
```

### Testing AccordionSummary toggle

```tsx
const { getByRole, queryByText } = render(
  <Accordion>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionDetails>Content</AccordionDetails>
  </Accordion>
);
expect(queryByText('Content')).not.toBeVisible();
fireEvent.press(getByRole('button', { name: 'Title' }));
expect(queryByText('Content')).toBeVisible();
```

### Testing useMediaQuery

```tsx
import { useWindowDimensions } from 'react-native';

jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  useWindowDimensions: jest.fn().mockReturnValue({ width: 1024, height: 768 }),
}));

const { result } = renderHook(() => useMediaQuery('md'));
expect(result.current).toBe(true);  // 1024 >= 900
```
