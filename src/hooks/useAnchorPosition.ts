import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import type { View } from 'react-native';

export interface AnchorPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Measures a `View` ref and returns its page-relative bounding rect.
 *
 * Pattern mirrors `src/components/Menu/Menu.tsx`.
 *
 * @param ref   - A ref attached to the anchor View
 * @param open  - Re-measures only when `open` transitions to true
 * @returns `{ top, left, width, height }` or `null` while un-measured
 */
export function useAnchorPosition(
  ref: RefObject<View | null>,
  open: boolean,
): AnchorPosition | null {
  const [position, setPosition] = useState<AnchorPosition | null>(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    const wasOpen = prevOpen.current;
    prevOpen.current = open;

    if (!open) {
      if (!wasOpen) return undefined;
      // Closing: keep the position until the next open to avoid layout jump during exit anim
      return undefined;
    }

    // Opening: measure the anchor
    ref.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPosition({ top: pageY, left: pageX, width, height });
    });

    return undefined;
  }, [open, ref]);

  return position;
}
