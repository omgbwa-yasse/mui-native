/**
 * catalogue/examples.inputs.tsx
 * ExampleConfig tuples for all INPUTS-category components (22 total).
 */

import React from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  CodeInput,
  DatePicker,
  DateTimePicker,
  FAB,
  IconButton,
  MaterialIcon,
  NumberField,
  Radio,
  RadioButton,
  RadioGroup,
  Rating,
  Searchbar,
  SegmentedButtons,
  Select,
  Slider,
  Switch,
  TextField,
  TimePicker,
  ToggleButton,
  ToggleButtonGroup,
  TouchableRipple,
  TransferList,
  materialIconSource,
} from '@mui-native';
import { View, Text as RNText } from 'react-native';
import type { ExampleConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Stateful wrappers
// ─────────────────────────────────────────────────────────────────────────────

const SelectSingleExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Select
      label="Fruit"
      value={value}
      onValueChange={v => setValue(v as string)}
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]}
    />
  );
};

const SelectMultipleExample: React.FC = () => {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <Select
      label="Fruits"
      value={values}
      multiple
      onValueChange={v => setValues(v as string[])}
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Button (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const buttonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Contained',
    description: 'Primary contained button',
    code: `<Button variant="filled" label="Click me" />`,
    render: () => <Button variant="filled" label="Click me" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined button variant',
    code: `<Button variant="outlined" label="Click me" />`,
    render: () => <Button variant="outlined" label="Click me" />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled state',
    code: `<Button variant="filled" label="Disabled" disabled />`,
    render: () => <Button variant="filled" label="Disabled" disabled />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TextField (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const textFieldExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Filled',
    description: 'Default filled variant',
    code: `<TextField label="Email address" variant="filled" />`,
    render: () => <TextField label="Email address" variant="filled" />,
  },
  {
    label: 'Outlined',
    description: 'Outlined border variant',
    code: `<TextField label="Email address" variant="outlined" />`,
    render: () => <TextField label="Email address" variant="outlined" />,
  },
  {
    label: 'Error',
    description: 'Field with validation error',
    code: `<TextField label="Email address" error="Invalid email address" />`,
    render: () => (
      <TextField label="Email address" error="Invalid email address" />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Select (migrated from examples.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const selectExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single',
    description: 'Single item selection',
    code: `const [value, setValue] = React.useState('');
<Select
  label="Fruit"
  value={value}
  onValueChange={v => setValue(v as string)}
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
/>`,
    render: () => <SelectSingleExample />,
  },
  {
    label: 'Multiple',
    description: 'Multi-item selection',
    code: `const [values, setValues] = React.useState<string[]>([]);
<Select
  label="Fruits"
  value={values}
  multiple
  onValueChange={v => setValues(v as string[])}
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
/>`,
    render: () => <SelectMultipleExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled state',
    code: `<Select
  label="Select option"
  value={null}
  onValueChange={() => {}}
  options={[{ value: 'a', label: 'Option A' }]}
  disabled
/>`,
    render: () => (
      <Select
        label="Select option"
        value={null}
        onValueChange={() => {}}
        options={[{ value: 'a', label: 'Option A' }]}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Autocomplete
// ─────────────────────────────────────────────────────────────────────────────

const AutocompleteSingleExample: React.FC = () => {
  const [value, setValue] = React.useState<string | null>(null);
  return (
    <Autocomplete
      label="Country"
      value={value}
      onValueChange={v => setValue(v as string | null)}
      options={[
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
      ]}
    />
  );
};

const AutocompleteMultiExample: React.FC = () => {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <Autocomplete
      label="Skills"
      value={values}
      multiple
      onValueChange={v => setValues(v as string[])}
      options={[
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'rn', label: 'React Native' },
        { value: 'py', label: 'Python' },
      ]}
    />
  );
};

const AutocompleteFreeSoloExample: React.FC = () => {
  const [value, setValue] = React.useState<string | null>(null);
  return (
    <Autocomplete
      label="City"
      value={value}
      freeSolo
      onValueChange={v => setValue(v as string | null)}
      options={[
        { value: 'nyc', label: 'New York' },
        { value: 'la', label: 'Los Angeles' },
        { value: 'chi', label: 'Chicago' },
      ]}
    />
  );
};

export const autocompleteExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single Select',
    description: 'Autocomplete with single selection',
    code: `const [value, setValue] = React.useState<string | null>(null);
<Autocomplete
  label="Country"
  value={value}
  onValueChange={v => setValue(v as string | null)}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>`,
    render: () => <AutocompleteSingleExample />,
  },
  {
    label: 'Multi Select',
    description: 'Autocomplete with multiple selections',
    code: `const [values, setValues] = React.useState<string[]>([]);
<Autocomplete
  label="Skills"
  value={values}
  multiple
  onValueChange={v => setValues(v as string[])}
  options={[
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'rn', label: 'React Native' },
  ]}
/>`,
    render: () => <AutocompleteMultiExample />,
  },
  {
    label: 'Free Solo',
    description: 'Allows custom values not in the options list',
    code: `const [value, setValue] = React.useState<string | null>(null);
<Autocomplete
  label="City"
  value={value}
  freeSolo
  onValueChange={v => setValue(v as string | null)}
  options={[
    { value: 'nyc', label: 'New York' },
    { value: 'la', label: 'Los Angeles' },
  ]}
/>`,
    render: () => <AutocompleteFreeSoloExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ButtonGroup
// ─────────────────────────────────────────────────────────────────────────────

export const buttonGroupExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Horizontal',
    description: 'Grouped buttons in a row',
    code: `<ButtonGroup>
  <Button variant="outlined" label="One" />
  <Button variant="outlined" label="Two" />
  <Button variant="outlined" label="Three" />
</ButtonGroup>`,
    render: () => (
      <ButtonGroup>
        <Button variant="outlined" label="One" />
        <Button variant="outlined" label="Two" />
        <Button variant="outlined" label="Three" />
      </ButtonGroup>
    ),
  },
  {
    label: 'Vertical',
    description: 'Buttons stacked vertically',
    code: `<ButtonGroup orientation="vertical">
  <Button variant="outlined" label="Top" />
  <Button variant="outlined" label="Middle" />
  <Button variant="outlined" label="Bottom" />
</ButtonGroup>`,
    render: () => (
      <ButtonGroup orientation="vertical">
        <Button variant="outlined" label="Top" />
        <Button variant="outlined" label="Middle" />
        <Button variant="outlined" label="Bottom" />
      </ButtonGroup>
    ),
  },
  {
    label: 'Disabled',
    description: 'All buttons disabled via group prop',
    code: `<ButtonGroup disabled>
  <Button variant="outlined" label="A" />
  <Button variant="outlined" label="B" />
  <Button variant="outlined" label="C" />
</ButtonGroup>`,
    render: () => (
      <ButtonGroup disabled>
        <Button variant="outlined" label="A" />
        <Button variant="outlined" label="B" />
        <Button variant="outlined" label="C" />
      </ButtonGroup>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────────────────────────────────────

const CheckboxBasicExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => setChecked(v => !v)}
      accessibilityLabel="Basic checkbox"
    />
  );
};

const CheckboxIndeterminateExample: React.FC = () => {
  const [status, setStatus] = React.useState<'checked' | 'unchecked' | 'indeterminate'>('indeterminate');
  return (
    <Checkbox
      status={status}
      onPress={() => setStatus(s => s === 'checked' ? 'unchecked' : 'checked')}
      accessibilityLabel="Indeterminate checkbox"
    />
  );
};

export const checkboxExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Toggles between checked and unchecked',
    code: `const [checked, setChecked] = React.useState(false);
<Checkbox
  status={checked ? 'checked' : 'unchecked'}
  onPress={() => setChecked(v => !v)}
  accessibilityLabel="Basic checkbox"
/>`,
    render: () => <CheckboxBasicExample />,
  },
  {
    label: 'Indeterminate',
    description: 'Indeterminate (mixed) state',
    code: `const [status, setStatus] = React.useState('indeterminate');
<Checkbox
  status={status}
  onPress={() => setStatus(s => s === 'checked' ? 'unchecked' : 'checked')}
  accessibilityLabel="Indeterminate checkbox"
/>`,
    render: () => <CheckboxIndeterminateExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled checkbox',
    code: `<Checkbox
  status="checked"
  disabled
  accessibilityLabel="Disabled checkbox"
/>`,
    render: () => (
      <Checkbox
        status="checked"
        disabled
        accessibilityLabel="Disabled checkbox"
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CodeInput
// ─────────────────────────────────────────────────────────────────────────────

const CodeInputBasicExample: React.FC = () => {
  const [code, setCode] = React.useState('');
  return (
    <CodeInput
      value={code}
      onChange={setCode}
    />
  );
};

const CodeInputFilledExample: React.FC = () => {
  const [code, setCode] = React.useState('123456');
  return (
    <CodeInput
      value={code}
      onChange={setCode}
    />
  );
};

export const codeInputExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Empty',
    description: 'OTP code input — empty state',
    code: `const [code, setCode] = React.useState('');
<CodeInput value={code} onChange={setCode} />`,
    render: () => <CodeInputBasicExample />,
  },
  {
    label: 'Pre-filled',
    description: 'Code input with initial value',
    code: `const [code, setCode] = React.useState('123456');
<CodeInput value={code} onChange={setCode} />`,
    render: () => <CodeInputFilledExample />,
  },
  {
    label: 'Disabled',
    description: 'Code input in non-interactive state',
    code: `<CodeInput value="000000" onChange={() => {}} disabled />`,
    render: () => (
      <CodeInput
        value="000000"
        onChange={() => {}}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DatePicker
// ─────────────────────────────────────────────────────────────────────────────

const DatePickerBasicExample: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  return (
    <DatePicker
      label="Birth date"
      value={date}
      onChange={setDate}
    />
  );
};

const DatePickerConstrainedExample: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const minDate = new Date('2024-01-01');
  const maxDate = new Date('2024-12-31');
  return (
    <DatePicker
      label="Event date (2024)"
      value={date}
      onChange={setDate}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export const datePickerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Calendar date picker',
    code: `const [date, setDate] = React.useState<Date | null>(null);
<DatePicker
  label="Birth date"
  value={date}
  onChange={setDate}
/>`,
    render: () => <DatePickerBasicExample />,
  },
  {
    label: 'Constrained',
    description: 'Date picker with min/max bounds',
    code: `const [date, setDate] = React.useState<Date | null>(null);
<DatePicker
  label="Event date (2024)"
  value={date}
  onChange={setDate}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
/>`,
    render: () => <DatePickerConstrainedExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled date picker',
    code: `<DatePicker
  label="Closed date"
  value={new Date('2024-06-15')}
  onChange={() => {}}
  disabled
/>`,
    render: () => (
      <DatePicker
        label="Closed date"
        value={new Date('2024-06-15')}
        onChange={() => {}}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DateTimePicker
// ─────────────────────────────────────────────────────────────────────────────

const DateTimePickerBasicExample: React.FC = () => {
  const [dt, setDt] = React.useState<Date | null>(null);
  return (
    <DateTimePicker
      label="Meeting time"
      value={dt}
      onChange={setDt}
    />
  );
};

const DateTimePickerSecondsExample: React.FC = () => {
  const [dt, setDt] = React.useState<Date | null>(null);
  return (
    <DateTimePicker
      label="Precise timestamp"
      value={dt}
      onChange={setDt}
      views={['year', 'month', 'day', 'hours', 'minutes']}
    />
  );
};

export const dateTimePickerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Combined date and time picker',
    code: `const [dt, setDt] = React.useState<Date | null>(null);
<DateTimePicker
  label="Meeting time"
  value={dt}
  onChange={setDt}
/>`,
    render: () => <DateTimePickerBasicExample />,
  },
  {
    label: 'With Seconds',
    description: 'Date-time picker with seconds precision',
    code: `const [dt, setDt] = React.useState<Date | null>(null);
<DateTimePicker
  label="Precise timestamp"
  value={dt}
  onChange={setDt}
  views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
/>`,
    render: () => <DateTimePickerSecondsExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled date-time picker',
    code: `<DateTimePicker
  label="Locked datetime"
  value={new Date()}
  onChange={() => {}}
  disabled
/>`,
    render: () => (
      <DateTimePicker
        label="Locked datetime"
        value={new Date()}
        onChange={() => {}}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAB
// ─────────────────────────────────────────────────────────────────────────────

export const fabExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Floating action button with icon',
    code: `<FAB
  icon={<MaterialIcon name="add" />}
  accessibilityLabel="Add item"
  onPress={() => {}}
/>`,
    render: () => (
      <FAB
        icon={<MaterialIcon name="add" />}
        accessibilityLabel="Add item"
        onPress={() => {}}
      />
    ),
  },
  {
    label: 'Extended',
    description: 'Extended FAB with label text',
    code: `<FAB
  icon={<MaterialIcon name="edit" />}
  label="Compose"
  accessibilityLabel="Compose message"
  onPress={() => {}}
/>`,
    render: () => (
      <FAB
        icon={<MaterialIcon name="edit" />}
        label="Compose"
        accessibilityLabel="Compose message"
        onPress={() => {}}
      />
    ),
  },
  {
    label: 'Small',
    description: 'Mini-size FAB variant',
    code: `<FAB
  icon={<MaterialIcon name="add" size={18} />}
  size="small"
  accessibilityLabel="Quick add"
  onPress={() => {}}
/>`,
    render: () => (
      <FAB
        icon={<MaterialIcon name="add" size={18} />}
        size="small"
        accessibilityLabel="Quick add"
        onPress={() => {}}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// IconButton
// ─────────────────────────────────────────────────────────────────────────────

export const iconButtonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default',
    description: 'Standard icon button',
    code: `<IconButton
  icon={materialIconSource('favorite')}
  accessibilityLabel="Like"
  onPress={() => {}}
/>`,
    render: () => (
      <IconButton
        icon={materialIconSource('favorite')}
        accessibilityLabel="Like"
        onPress={() => {}}
      />
    ),
  },
  {
    label: 'Selected',
    description: 'Icon button in selected/active state',
    code: `<IconButton
  icon={materialIconSource('bookmark')}
  selected
  accessibilityLabel="Bookmarked"
  onPress={() => {}}
/>`,
    render: () => (
      <IconButton
        icon={materialIconSource('bookmark')}
        selected
        accessibilityLabel="Bookmarked"
        onPress={() => {}}
      />
    ),
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled icon button',
    code: `<IconButton
  icon={materialIconSource('delete')}
  disabled
  accessibilityLabel="Delete (disabled)"
/>`,
    render: () => (
      <IconButton
        icon={materialIconSource('delete')}
        disabled
        accessibilityLabel="Delete (disabled)"
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NumberField
// ─────────────────────────────────────────────────────────────────────────────

const NumberFieldBasicExample: React.FC = () => {
  const [val, setVal] = React.useState(0);
  return (
    <NumberField
      label="Quantity"
      value={val}
      onValueChange={setVal}
    />
  );
};

const NumberFieldConstrainedExample: React.FC = () => {
  const [val, setVal] = React.useState(5);
  return (
    <NumberField
      label="Rating (1–10)"
      value={val}
      onValueChange={setVal}
      min={1}
      max={10}
      step={1}
    />
  );
};

const NumberFieldCurrencyExample: React.FC = () => {
  const [val, setVal] = React.useState(9.99);
  return (
    <NumberField
      label="Price"
      value={val}
      onValueChange={setVal}
      prefix="$"
      step={0.01}
    />
  );
};

export const numberFieldExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Integer number input with stepper',
    code: `const [val, setVal] = React.useState(0);
<NumberField label="Quantity" value={val} onValueChange={setVal} />`,
    render: () => <NumberFieldBasicExample />,
  },
  {
    label: 'Min / Max',
    description: 'Number field with min, max, and step constraints',
    code: `const [val, setVal] = React.useState(5);
<NumberField
  label="Rating (1–10)"
  value={val}
  onValueChange={setVal}
  min={1}
  max={10}
  step={1}
/>`,
    render: () => <NumberFieldConstrainedExample />,
  },
  {
    label: 'Currency',
    description: 'Formatted currency field with prefix',
    code: `const [val, setVal] = React.useState(9.99);
<NumberField
  label="Price"
  value={val}
  onValueChange={setVal}
  prefix="$"
  step={0.01}
/>`,
    render: () => <NumberFieldCurrencyExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// RadioButton
// ─────────────────────────────────────────────────────────────────────────────

const RadioGroupBasicExample: React.FC = () => {
  const [selected, setSelected] = React.useState('a');
  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      <RadioButton value="a" />
      <RadioButton value="b" />
      <RadioButton value="c" />
    </RadioGroup>
  );
};

const RadioGroupDisabledExample: React.FC = () => {
  const [selected, setSelected] = React.useState('x');
  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      <RadioButton value="x" />
      <RadioButton value="y" disabled />
      <RadioButton value="z" />
    </RadioGroup>
  );
};

const RadioRowExample: React.FC = () => {
  const [val, setVal] = React.useState('a');
  return (
    <RadioGroup row value={val} onChange={(_e, v) => setVal(v)}>
      <Radio value="a" />
      <Radio value="b" />
      <Radio value="c" />
    </RadioGroup>
  );
};

export const radioButtonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Row Layout',
    description: 'Radio alias with row layout and onChange handler',
    code: `const [val, setVal] = React.useState('a');
<RadioGroup row value={val} onChange={(_e, v) => setVal(v)}>
  <Radio value="a" />
  <Radio value="b" />
  <Radio value="c" />
</RadioGroup>`,
    render: () => <RadioRowExample />,
  },
  {
    label: 'Group',
    description: 'Exclusive radio group selection',
    code: `const [selected, setSelected] = React.useState('a');
<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioButton value="a" />
  <RadioButton value="b" />
  <RadioButton value="c" />
</RadioGroup>`,
    render: () => <RadioGroupBasicExample />,
  },
  {
    label: 'With Disabled',
    description: 'Group with one disabled option',
    code: `const [selected, setSelected] = React.useState('x');
<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioButton value="x" />
  <RadioButton value="y" disabled />
  <RadioButton value="z" />
</RadioGroup>`,
    render: () => <RadioGroupDisabledExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Rating
// ─────────────────────────────────────────────────────────────────────────────

const RatingBasicExample: React.FC = () => {
  const [val, setVal] = React.useState(3);
  return <Rating value={val} onValueChange={setVal} />;
};

const RatingHalfExample: React.FC = () => {
  const [val, setVal] = React.useState(2.5);
  return <Rating value={val} onValueChange={setVal} precision={0.5} />;
};

export const ratingExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: '5-star rating input',
    code: `const [val, setVal] = React.useState(3);
<Rating value={val} onValueChange={setVal} />`,
    render: () => <RatingBasicExample />,
  },
  {
    label: 'Half Stars',
    description: 'Half-star precision rating',
    code: `const [val, setVal] = React.useState(2.5);
<Rating value={val} onValueChange={setVal} precision={0.5} />`,
    render: () => <RatingHalfExample />,
  },
  {
    label: 'Read Only',
    description: 'Display-only rating component',
    code: `<Rating value={4} readOnly />`,
    render: () => <Rating value={4} readOnly />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Searchbar
// ─────────────────────────────────────────────────────────────────────────────

const SearchbarBasicExample: React.FC = () => {
  const [query, setQuery] = React.useState('');
  return (
    <Searchbar
      value={query}
      onChangeText={setQuery}
      placeholder="Search..."
    />
  );
};

const SearchbarClearExample: React.FC = () => {
  const [query, setQuery] = React.useState('Hello');
  return (
    <Searchbar
      value={query}
      onChangeText={setQuery}
      onClearIconPress={() => setQuery('')}
      placeholder="Search..."
    />
  );
};

export const searchbarExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple search input field',
    code: `const [query, setQuery] = React.useState('');
<Searchbar
  value={query}
  onChangeText={setQuery}
  placeholder="Search..."
/>`,
    render: () => <SearchbarBasicExample />,
  },
  {
    label: 'With Clear',
    description: 'Search input with clear icon button',
    code: `const [query, setQuery] = React.useState('Hello');
<Searchbar
  value={query}
  onChangeText={setQuery}
  onClearIconPress={() => setQuery('')}
  placeholder="Search..."
/>`,
    render: () => <SearchbarClearExample />,
  },
  {
    label: 'Loading',
    description: 'Search bar with loading indicator',
    code: `<Searchbar
  value="react native"
  onChangeText={() => {}}
  loading
  placeholder="Search..."
/>`,
    render: () => (
      <Searchbar
        value="react native"
        onChangeText={() => {}}
        loading
        placeholder="Search..."
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SegmentedButtons
// ─────────────────────────────────────────────────────────────────────────────

const SegmentedButtonsSingleExample: React.FC = () => {
  const [val, setVal] = React.useState('day');
  return (
    <SegmentedButtons
      value={val}
      onValueChange={v => setVal(Array.isArray(v) ? v[0] ?? '' : v)}
      buttons={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  );
};

const SegmentedButtonsMultiExample: React.FC = () => {
  const [vals, setVals] = React.useState<string[]>(['bold']);
  return (
    <SegmentedButtons
      value={vals.join(',')}
      onValueChange={v => setVals(Array.isArray(v) ? v : v ? v.split(',') : [])}
      multiSelect
      buttons={[
        { value: 'bold', label: 'B' },
        { value: 'italic', label: 'I' },
        { value: 'underline', label: 'U' },
      ]}
    />
  );
};

export const segmentedButtonsExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single Select',
    description: 'Mutually exclusive selection',
    code: `const [val, setVal] = React.useState('day');
<SegmentedButtons
  value={val}
  onValueChange={setVal}
  buttons={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
/>`,
    render: () => <SegmentedButtonsSingleExample />,
  },
  {
    label: 'Multi Select',
    description: 'Multiple selections allowed',
    code: `const [vals, setVals] = React.useState<string[]>(['bold']);
<SegmentedButtons
  value={vals.join(',')}
  onValueChange={v => setVals(v ? v.split(',') : [])}
  multiSelect
  buttons={[
    { value: 'bold', label: 'B' },
    { value: 'italic', label: 'I' },
    { value: 'underline', label: 'U' },
  ]}
/>`,
    render: () => <SegmentedButtonsMultiExample />,
  },
  {
    label: 'With Icons',
    description: 'Segmented buttons with icon elements',
    code: `<SegmentedButtons
  value="list"
  onValueChange={() => {}}
  buttons={[
    { value: 'list', label: 'List', icon: <MaterialIcon name="list" /> },
    { value: 'grid', label: 'Grid', icon: <MaterialIcon name="grid_view" /> },
  ]}
/>`,
    render: () => (
      <SegmentedButtons
        value="list"
        onValueChange={() => {}}
        buttons={[
          { value: 'list', label: 'List', icon: <MaterialIcon name="list" /> },
          { value: 'grid', label: 'Grid', icon: <MaterialIcon name="grid_view" /> },
        ]}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Slider
// ─────────────────────────────────────────────────────────────────────────────

const SliderContinuousExample: React.FC = () => {
  const [val, setVal] = React.useState(40);
  return <Slider value={val} onValueChange={setVal} />;
};

const SliderDiscreteExample: React.FC = () => {
  const [val, setVal] = React.useState(20);
  return (
    <Slider
      value={val}
      onValueChange={setVal}
      min={0}
      max={100}
      step={20}
      marks
    />
  );
};

export const sliderExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Continuous',
    description: 'Smooth continuous value slider',
    code: `const [val, setVal] = React.useState(40);
<Slider value={val} onValueChange={setVal} />`,
    render: () => <SliderContinuousExample />,
  },
  {
    label: 'Discrete',
    description: 'Slider with step marks',
    code: `const [val, setVal] = React.useState(20);
<Slider
  value={val}
  onValueChange={setVal}
  min={0}
  max={100}
  step={20}
  marks
/>`,
    render: () => <SliderDiscreteExample />,
  },
  {
    label: 'Min / Max',
    description: 'Slider with constrained range',
    code: `<Slider
  value={75}
  onValueChange={() => {}}
  min={50}
  max={200}
/>`,
    render: () => (
      <Slider
        value={75}
        onValueChange={() => {}}
        min={50}
        max={200}
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Switch
// ─────────────────────────────────────────────────────────────────────────────

const SwitchBasicExample: React.FC = () => {
  const [on, setOn] = React.useState(false);
  return (
    <Switch
      value={on}
      onValueChange={setOn}
      accessibilityLabel="Toggle feature"
    />
  );
};

const SwitchLabelledExample: React.FC = () => {
  const [on, setOn] = React.useState(true);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <RNText>Notifications</RNText>
      <Switch
        value={on}
        onValueChange={setOn}
        accessibilityLabel="Toggle notifications"
      />
    </View>
  );
};

export const switchExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Simple on/off toggle',
    code: `const [on, setOn] = React.useState(false);
<Switch
  value={on}
  onValueChange={setOn}
  accessibilityLabel="Toggle feature"
/>`,
    render: () => <SwitchBasicExample />,
  },
  {
    label: 'With Label',
    description: 'Switch with descriptive label',
    code: `const [on, setOn] = React.useState(true);
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Text>Notifications</Text>
  <Switch
    value={on}
    onValueChange={setOn}
    accessibilityLabel="Toggle notifications"
  />
</View>`,
    render: () => <SwitchLabelledExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled switch',
    code: `<Switch
  value={true}
  onValueChange={() => {}}
  disabled
  accessibilityLabel="Disabled switch"
/>`,
    render: () => (
      <Switch
        value={true}
        onValueChange={() => {}}
        disabled
        accessibilityLabel="Disabled switch"
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TimePicker
// ─────────────────────────────────────────────────────────────────────────────

const TimePickerBasicExample: React.FC = () => {
  const [time, setTime] = React.useState<Date | null>(null);
  return <TimePicker label="Alarm time" value={time} onChange={setTime} />;
};

const TimePickerWithSecondsExample: React.FC = () => {
  const [time, setTime] = React.useState<Date | null>(null);
  return (
    <TimePicker
      label="Precise time"
      value={time}
      onChange={setTime}
      views={['hours', 'minutes', 'seconds']}
    />
  );
};

export const timePickerExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Hours and minutes time picker',
    code: `const [time, setTime] = React.useState<Date | null>(null);
<TimePicker label="Alarm time" value={time} onChange={setTime} />`,
    render: () => <TimePickerBasicExample />,
  },
  {
    label: 'With Seconds',
    description: 'Time picker showing seconds field',
    code: `const [time, setTime] = React.useState<Date | null>(null);
<TimePicker
  label="Precise time"
  value={time}
  onChange={setTime}
  views={['hours', 'minutes', 'seconds']}
/>`,
    render: () => <TimePickerWithSecondsExample />,
  },
  {
    label: 'Disabled',
    description: 'Non-interactive disabled time picker',
    code: `<TimePicker
  label="Locked time"
  value={new Date()}
  onChange={() => {}}
  disabled
/>`,
    render: () => (
      <TimePicker
        label="Locked time"
        value={new Date()}
        onChange={() => {}}
        disabled
      />
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ToggleButton
// ─────────────────────────────────────────────────────────────────────────────

const ToggleButtonSingleExample: React.FC = () => {
  const [val, setVal] = React.useState<string | null>(null);
  return (
    <ToggleButtonGroup value={val} onValueChange={v => setVal(v as string | null)}>
      <ToggleButton value="bold">
        <MaterialIcon name="format_bold" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const ToggleButtonExclusiveExample: React.FC = () => {
  const [align, setAlign] = React.useState<string | null>('left');
  return (
    <ToggleButtonGroup value={align} onValueChange={v => setAlign(v as string | null)}>
      <ToggleButton value="left">
        <MaterialIcon name="format_align_left" />
      </ToggleButton>
      <ToggleButton value="center">
        <MaterialIcon name="format_align_center" />
      </ToggleButton>
      <ToggleButton value="right">
        <MaterialIcon name="format_align_right" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const ToggleButtonMultiExample: React.FC = () => {
  const [formats, setFormats] = React.useState<string[]>([]);
  return (
    <ToggleButtonGroup value={formats} multiple onValueChange={v => setFormats(v as string[])}>
      <ToggleButton value="bold">
        <MaterialIcon name="format_bold" />
      </ToggleButton>
      <ToggleButton value="italic">
        <MaterialIcon name="format_italic" />
      </ToggleButton>
      <ToggleButton value="underline">
        <MaterialIcon name="format_underlined" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const toggleButtonExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Single Toggle',
    description: 'Single on/off toggle button',
    code: `const [val, setVal] = React.useState<string | null>(null);
<ToggleButtonGroup value={val} onValueChange={setVal}>
  <ToggleButton value="bold">
    <MaterialIcon name="format_bold" />
  </ToggleButton>
</ToggleButtonGroup>`,
    render: () => <ToggleButtonSingleExample />,
  },
  {
    label: 'Exclusive Group',
    description: 'Only one button can be active at a time',
    code: `const [align, setAlign] = React.useState<string | null>('left');
<ToggleButtonGroup value={align} onValueChange={setAlign}>
  <ToggleButton value="left"><MaterialIcon name="format_align_left" /></ToggleButton>
  <ToggleButton value="center"><MaterialIcon name="format_align_center" /></ToggleButton>
  <ToggleButton value="right"><MaterialIcon name="format_align_right" /></ToggleButton>
</ToggleButtonGroup>`,
    render: () => <ToggleButtonExclusiveExample />,
  },
  {
    label: 'Multi-Select',
    description: 'Multiple buttons can be active simultaneously',
    code: `const [formats, setFormats] = React.useState<string[]>([]);
<ToggleButtonGroup value={formats} multiple onValueChange={v => setFormats(v as string[])}>
  <ToggleButton value="bold"><MaterialIcon name="format_bold" /></ToggleButton>
  <ToggleButton value="italic"><MaterialIcon name="format_italic" /></ToggleButton>
  <ToggleButton value="underline"><MaterialIcon name="format_underlined" /></ToggleButton>
</ToggleButtonGroup>`,
    render: () => <ToggleButtonMultiExample />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TouchableRipple
// ─────────────────────────────────────────────────────────────────────────────

export const touchableRippleExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Default Ripple',
    description: 'Material ripple effect on press',
    code: `<TouchableRipple
  onPress={() => {}}
  accessibilityRole="button"
>
  <View style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
    <Text>Press me</Text>
  </View>
</TouchableRipple>`,
    render: () => (
      <TouchableRipple
        onPress={() => {}}
        accessibilityRole="button"
      >
        <View style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
          <RNText>Press me</RNText>
        </View>
      </TouchableRipple>
    ),
  },
  {
    label: 'Custom Colour',
    description: 'Ripple with custom color override',
    code: `<TouchableRipple
  onPress={() => {}}
  rippleColor="rgba(33, 150, 243, 0.3)"
  accessibilityRole="button"
>
  <View style={{ padding: 16, backgroundColor: '#bbdefb' }}>
    <Text>Blue ripple</Text>
  </View>
</TouchableRipple>`,
    render: () => (
      <TouchableRipple
        onPress={() => {}}
        rippleColor="rgba(33, 150, 243, 0.3)"
        accessibilityRole="button"
      >
        <View style={{ padding: 16, backgroundColor: '#bbdefb' }}>
          <RNText>Blue ripple</RNText>
        </View>
      </TouchableRipple>
    ),
  },
  {
    label: 'Borderless',
    description: 'Borderless ripple on icon',
    code: `<TouchableRipple
  onPress={() => {}}
  borderless
  accessibilityRole="button"
>
  <MaterialIcon name="star" size={32} />
</TouchableRipple>`,
    render: () => (
      <TouchableRipple
        onPress={() => {}}
        borderless
        accessibilityRole="button"
      >
        <MaterialIcon name="star" size={32} />
      </TouchableRipple>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TransferList
// ─────────────────────────────────────────────────────────────────────────────

const TransferListBasicExample: React.FC = () => {
  const [left, setLeft] = React.useState([
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
    { id: '3', label: 'Cherry' },
  ]);
  const [right, setRight] = React.useState([
    { id: '4', label: 'Mango' },
  ]);
  return (
    <TransferList
      left={left}
      right={right}
      leftTitle="Available"
      rightTitle="Selected"
      onTransfer={(newLeft, newRight) => {
        setLeft(newLeft);
        setRight(newRight);
      }}
    />
  );
};

const TransferListEmptyExample: React.FC = () => {
  const [left] = React.useState([
    { id: 'a', label: 'Option A' },
    { id: 'b', label: 'Option B' },
  ]);
  const [right] = React.useState<{ id: string; label: string }[]>([]);
  return (
    <TransferList
      left={left}
      right={right}
      leftTitle="Options"
      rightTitle="Selected (empty)"
      onTransfer={() => {}}
    />
  );
};

export const transferListExamples: [ExampleConfig, ExampleConfig, ExampleConfig] = [
  {
    label: 'Basic',
    description: 'Two-column transfer list',
    code: `const [left, setLeft] = React.useState([
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
]);
const [right, setRight] = React.useState([{ id: '3', label: 'Mango' }]);
<TransferList
  left={left}
  right={right}
  leftTitle="Available"
  rightTitle="Selected"
  onTransfer={(newLeft, newRight) => {
    setLeft(newLeft);
    setRight(newRight);
  }}
/>`,
    render: () => <TransferListBasicExample />,
  },
  {
    label: 'Empty Right',
    description: 'Transfer list with empty right panel',
    code: `<TransferList
  left={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]}
  right={[]}
  leftTitle="Options"
  rightTitle="Selected"
  onTransfer={() => {}}
/>`,
    render: () => <TransferListEmptyExample />,
  },
  {
    label: 'Pre-transferred',
    description: 'Both panels with items',
    code: `<TransferList
  left={[{ id: '1', label: 'One' }, { id: '2', label: 'Two' }]}
  right={[{ id: '3', label: 'Three' }, { id: '4', label: 'Four' }]}
  leftTitle="Source"
  rightTitle="Target"
  onTransfer={() => {}}
/>`,
    render: () => (
      <TransferList
        left={[{ id: '1', label: 'One' }, { id: '2', label: 'Two' }]}
        right={[{ id: '3', label: 'Three' }, { id: '4', label: 'Four' }]}
        leftTitle="Source"
        rightTitle="Target"
        onTransfer={() => {}}
      />
    ),
  },
];
