import type React from 'react';

export type AppBarVariant = 'center' | 'small' | 'medium' | 'large';

export interface AppBarProps {
  /** Title text. */
  title: string;
  /** Visual variant. Defaults to 'center'. */
  variant?: AppBarVariant;
  /** Leading navigation icon (e.g. back arrow). */
  navigationIcon?: React.ReactElement;
  /** Trailing action icons. */
  actions?: React.ReactElement[];
  /** Test id. */
  testID?: string;
}
