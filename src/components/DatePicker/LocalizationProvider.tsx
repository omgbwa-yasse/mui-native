import React, { useMemo } from 'react';
import type { LocalizationProviderProps } from './types';
import { LocalizationContext } from './useLocalization';
import { IntlDateAdapter } from './IntlDateAdapter';

const DEFAULT_LOCALE = 'en';
const DEFAULT_FORMATS = {
  fullDate: 'MM/dd/yyyy',
  fullTime: 'hh:mm a',
  fullDateTime: 'MM/dd/yyyy hh:mm a',
};

/**
 * LocalizationProvider — supplies locale and date-adapter to all
 * DatePicker / TimePicker / DateTimePicker descendants via React context.
 *
 * @example
 * ```tsx
 * <LocalizationProvider locale="fr-FR">
 *   <DatePicker value={date} onChange={setDate} />
 * </LocalizationProvider>
 * ```
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> =
  function LocalizationProvider({
    children,
    locale = DEFAULT_LOCALE,
    dateAdapter,
    dateFormats,
  }) {
    const value = useMemo(
      () => ({
        locale,
        adapter: dateAdapter ?? IntlDateAdapter,
        formats: {
          fullDate: dateFormats?.fullDate ?? DEFAULT_FORMATS.fullDate,
          fullTime: dateFormats?.fullTime ?? DEFAULT_FORMATS.fullTime,
          fullDateTime:
            dateFormats?.fullDateTime ?? DEFAULT_FORMATS.fullDateTime,
        },
      }),
      [locale, dateAdapter, dateFormats],
    );

    return (
      <LocalizationContext.Provider value={value}>
        {children}
      </LocalizationContext.Provider>
    );
  };
