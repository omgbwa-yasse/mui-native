import React, { useState } from 'react';
import { View } from 'react-native';
import { DatePicker } from '../../src/components/DatePicker/DatePicker';
import { TimePicker } from '../../src/components/TimePicker/TimePicker';
import { DateTimePicker } from '../../src/components/DateTimePicker/DateTimePicker';
import { LocalizationProvider } from '../../src/components/DatePicker/LocalizationProvider';
import { IntlDateAdapter } from '../../src/components/DatePicker/IntlDateAdapter';
import { Text } from '../../src/components/Text/Text';

export default {
  title: 'Advanced/DatePicker',
};

const adapter = new IntlDateAdapter();

export const DatePickerBasic = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <LocalizationProvider dateAdapter={adapter}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="bodySmall">Selected: {value ? value.toDateString() : 'none'}</Text>
        <DatePicker
          label="Birth date"
          value={value}
          onChange={setValue}
        />
      </View>
    </LocalizationProvider>
  );
};

export const TimePickerBasic = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <LocalizationProvider dateAdapter={adapter}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="bodySmall">Selected: {value ? value.toTimeString() : 'none'}</Text>
        <TimePicker
          label="Appointment time"
          value={value}
          onChange={setValue}
        />
      </View>
    </LocalizationProvider>
  );
};

export const DateTimePickerBasic = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <LocalizationProvider dateAdapter={adapter}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="bodySmall">
          Selected: {value ? value.toLocaleString() : 'none'}
        </Text>
        <DateTimePicker
          label="Event date & time"
          value={value}
          onChange={setValue}
        />
      </View>
    </LocalizationProvider>
  );
};

export const DatePickerWithConstraints = () => {
  const [value, setValue] = useState<Date | null>(null);
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  return (
    <LocalizationProvider dateAdapter={adapter}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="bodySmall">Only allows dates within the next 30 days</Text>
        <DatePicker
          label="Event date"
          value={value}
          onChange={setValue}
          minDate={today}
          maxDate={maxDate}
        />
      </View>
    </LocalizationProvider>
  );
};

export const DatePickerDisabled = () => (
  <LocalizationProvider dateAdapter={adapter}>
    <View style={{ padding: 16 }}>
      <DatePicker
        label="Disabled picker"
        value={new Date()}
        onChange={() => undefined}
        disabled
      />
    </View>
  </LocalizationProvider>
);
