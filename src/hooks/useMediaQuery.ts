import { useWindowDimensions } from 'react-native';

/** Named breakpoint aliases (MUI default values in px) */
const BREAKPOINTS: Record<string, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * A hook that evaluates a CSS-media-style query against the current window width.
 *
 * Supported syntaxes:
 *  - Named breakpoints:   `"sm"`, `"md"`, etc.  → true when width >= breakpoint
 *  - min-width queries:   `"(min-width: 600px)"` → true when width >= 600
 *  - max-width queries:   `"(max-width: 899px)"` → true when width <= 899
 *
 * @example
 *   const isMd = useMediaQuery('md');
 *   const isWide = useMediaQuery('(min-width: 900px)');
 */
function useMediaQuery(query: string): boolean {
  const { width } = useWindowDimensions();

  // Named breakpoint (e.g. "sm", "md")
  if (Object.prototype.hasOwnProperty.call(BREAKPOINTS, query)) {
    return width >= BREAKPOINTS[query]!;
  }

  // (min-width: Npx)
  const minMatch = /\(\s*min-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/.exec(query);
  if (minMatch) {
    return width >= parseFloat(minMatch[1]!);
  }

  // (max-width: Npx)
  const maxMatch = /\(\s*max-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/.exec(query);
  if (maxMatch) {
    return width <= parseFloat(maxMatch[1]!);
  }

  return false;
}

export { useMediaQuery };
