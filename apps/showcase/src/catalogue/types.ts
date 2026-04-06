/**
 * catalogue/types.ts
 * Canonical type definitions for the showcase catalogue.
 * Derived from specs/007-component-showcase-app/contracts/catalogue.contract.ts —
 * all field names and nullability are authoritative from that contract.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// 1. Category
// ---------------------------------------------------------------------------

export type CategoryId =
  | 'INPUTS'
  | 'DATA_DISPLAY'
  | 'FEEDBACK'
  | 'NAVIGATION'
  | 'LAYOUT';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  components: ComponentEntry[];
}

// ---------------------------------------------------------------------------
// 2. ComponentEntry
// ---------------------------------------------------------------------------

export interface ComponentEntry {
  name: string;
  componentKey: string;
  categoryId: CategoryId;
  description: string;
  icon: string;
  sourceCode: string;
  examples: ExampleConfig[] | null;
  hasFullExamples: boolean;
}

// ---------------------------------------------------------------------------
// 3. ExampleConfig
// ---------------------------------------------------------------------------

export interface ExampleConfig {
  label: string;
  description: string | null;
  code: string;
  render: () => React.ReactElement;
}

// ---------------------------------------------------------------------------
// 4. LayoutPreference
// ---------------------------------------------------------------------------

export type LayoutDirection = 'vertical' | 'horizontal';

export interface LayoutPreferenceContextValue {
  direction: LayoutDirection;
  toggle: () => void;
}

// ---------------------------------------------------------------------------
// 5. Navigation Params
// ---------------------------------------------------------------------------

export type RootStackParamList = {
  Home: undefined;
  CategoryList: { categoryId: CategoryId };
  ComponentDetail: { categoryId: CategoryId; componentKey: string };
};

// ---------------------------------------------------------------------------
// 6. CatalogueRegistry
// ---------------------------------------------------------------------------

export interface CatalogueRegistry {
  categories: Category[];
  getComponent: (componentKey: string) => ComponentEntry | undefined;
  getCategory: (categoryId: CategoryId) => Category | undefined;
}
