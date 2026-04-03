import type { ReactElement } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  title: string;
  children: ReactElement;
  placement?: TooltipPlacement;
  enterDelay?: number;
  leaveDelay?: number;
  testID?: string;
}
