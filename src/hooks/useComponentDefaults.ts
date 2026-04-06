/**
 * useComponentDefaults — reads theme.components[name].defaultProps and merges
 * them with instance props so that instance-provided values always win.
 *
 * This hook is called as the first statement inside every component function:
 * ```tsx
 * const Button = (rawProps: ButtonProps) => {
 *   const props = useComponentDefaults('Button', rawProps);
 *   // ... rest of component uses `props`
 * };
 * ```
 *
 * Merge semantics:
 *  1. Start from `defaultProps` (from theme.components[name]).
 *  2. For each key in `instanceProps`, overwrite the default **only when the
 *     value is not `undefined`**. This preserves the defaultProp for a prop
 *     that was never passed (not passed ≠ passed as `undefined`).
 *
 * Zero-allocations fast path:
 *  - When `theme.components` is absent, or has no entry for `name`, the
 *    original `instanceProps` reference is returned unchanged.
 *  - When `defaultProps` is present but all instance props are defined,
 *    a new object is returned (unavoidable; still O(n) in prop count).
 */

import { useTheme } from '../theme/ThemeContext';
import type { ComponentPropsMap } from '../theme/componentsDefs';

/**
 * Merges theme-level `defaultProps` for `name` with `instanceProps`.
 * Instance props take precedence: a defined instance value is never overridden.
 */
export function useComponentDefaults<K extends keyof ComponentPropsMap>(
  name: K,
  instanceProps: ComponentPropsMap[K],
): ComponentPropsMap[K] {
  const { theme } = useTheme();

  const defaultProps = theme.components?.[name]?.defaultProps;

  // Fast path: no theme entry for this component
  if (!defaultProps) {
    return instanceProps;
  }

  // Merge: defaultProps first, then per-key overwrite with defined instance values
  const merged = { ...defaultProps } as ComponentPropsMap[K];
  const keys = Object.keys(instanceProps as object) as (keyof ComponentPropsMap[K])[];
  for (const key of keys) {
    const instValue = (instanceProps as ComponentPropsMap[K])[key];
    if (instValue !== undefined) {
      (merged as Record<keyof ComponentPropsMap[K], unknown>)[key] = instValue;
    }
  }
  return merged;
}
