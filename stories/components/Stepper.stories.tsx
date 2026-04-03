import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Stepper } from '../../src/components/Stepper';

const STEPS = [
  { label: 'Account', description: 'Enter your credentials' },
  { label: 'Profile', description: 'Complete your profile' },
  { label: 'Review', description: 'Verify your information' },
  { label: 'Done', description: 'All set!' },
];

export default {
  title: 'Navigation/Stepper',
  component: Stepper,
};

export const Horizontal = () => {
  const [active, setActive] = useState(1);
  return (
    <View style={{ padding: 16 }}>
      <Stepper steps={STEPS} activeStep={active} />
      <View style={{ flexDirection: 'row', marginTop: 16, gap: 8 }}>
        <Button title="Back" onPress={() => setActive((p) => Math.max(0, p - 1))} />
        <Button title="Next" onPress={() => setActive((p) => Math.min(STEPS.length - 1, p + 1))} />
      </View>
    </View>
  );
};

export const Vertical = () => {
  const [active, setActive] = useState(1);
  return (
    <View style={{ padding: 16 }}>
      <Stepper steps={STEPS} activeStep={active} orientation="vertical" />
      <View style={{ flexDirection: 'row', marginTop: 16, gap: 8 }}>
        <Button title="Back" onPress={() => setActive((p) => Math.max(0, p - 1))} />
        <Button title="Next" onPress={() => setActive((p) => Math.min(STEPS.length - 1, p + 1))} />
      </View>
    </View>
  );
};

export const WithErrorStep = () => (
  <View style={{ padding: 16 }}>
    <Stepper
      steps={[
        { label: 'Step 1' },
        { label: 'Step 2', state: 'error' },
        { label: 'Step 3' },
      ]}
      activeStep={1}
    />
  </View>
);

export const NonLinear = () => {
  const [active, setActive] = useState(2);
  return (
    <View style={{ padding: 16 }}>
      <Stepper
        steps={STEPS}
        activeStep={active}
        nonLinear
        onStepPress={setActive}
      />
    </View>
  );
};

export const AllCompleted = () => (
  <View style={{ padding: 16 }}>
    <Stepper steps={STEPS} activeStep={STEPS.length} />
  </View>
);
