import type { DateAdapter } from './types';

const FORMAT_TOKENS: Record<string, (d: Date, locale: string) => string> = {
  yyyy: (d) => String(d.getFullYear()),
  MM: (d) => String(d.getMonth() + 1).padStart(2, '0'),
  M: (d) => String(d.getMonth() + 1),
  dd: (d) => String(d.getDate()).padStart(2, '0'),
  d: (d) => String(d.getDate()),
  HH: (d) => String(d.getHours()).padStart(2, '0'),
  hh: (d) => String(d.getHours() % 12 || 12).padStart(2, '0'),
  mm: (d) => String(d.getMinutes()).padStart(2, '0'),
  ss: (d) => String(d.getSeconds()).padStart(2, '0'),
  a: (d) => (d.getHours() < 12 ? 'AM' : 'PM'),
};

function formatDate(date: Date, formatStr: string): string {
  const locale = 'en';
  // Replace tokens longest-first to avoid partial matches
  const sortedTokens = Object.keys(FORMAT_TOKENS).sort(
    (a, b) => b.length - a.length,
  );
  let result = formatStr;
  for (const token of sortedTokens) {
    if (result.includes(token)) {
      result = result.split(token).join(FORMAT_TOKENS[token](date, locale));
    }
  }
  return result;
}

function parseDate(value: string, formatStr: string): Date | null {
  try {
    // Simple ISO parse fallback — consumers may provide a richer adapter
    const candidate = new Date(value);
    if (!isNaN(candidate.getTime())) {
      return candidate;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Built-in DateAdapter backed by the native Intl API.
 * Supports basic format/parse operations suitable for the native pickers.
 */
export const IntlDateAdapter: DateAdapter<Date> = {
  format(date: Date, formatStr: string): string {
    return formatDate(date, formatStr);
  },

  parse(value: string, formatStr: string): Date | null {
    return parseDate(value, formatStr);
  },

  isValid(value: Date | null): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  },

  isBefore(a: Date, b: Date): boolean {
    return a.getTime() < b.getTime();
  },

  isAfter(a: Date, b: Date): boolean {
    return a.getTime() > b.getTime();
  },
};
