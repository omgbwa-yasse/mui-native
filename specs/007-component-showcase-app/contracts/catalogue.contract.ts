/**
 * Showcase Application — Public Contracts
 * Feature: 007-component-showcase-app
 *
 * These TypeScript types define the stable API surface for the catalogue registry,
 * navigation params, and context values. Implementation files MUST NOT deviate
 * from the field names or nullability defined here without a spec amendment.
 */

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
  /** Machine-readable identifier. Unique across registry. */
  id: CategoryId;
  /** Human-readable display name shown on HomeScreen card, e.g. "Data Display" */
  label: string;
  /** One-line description shown beneath the category label. */
  description: string;
  /** MaterialIcon name used as the category card icon. */
  icon: string;
  /** Ordered list of components belonging to this category. Non-empty. */
  components: ComponentEntry[];
}

// ---------------------------------------------------------------------------
// 2. ComponentEntry
// ---------------------------------------------------------------------------

export interface ComponentEntry {
  /** Display name, e.g. "Button". */
  name: string;
  /**
   * Unique key matching the directory name under src/components/,
   * e.g. "Button" for src/components/Button/.
   */
  componentKey: string;
  /** Parent category identifier. */
  categoryId: CategoryId;
  /** One-line description shown in the component list. */
  description: string;
  /**
   * Raw source code string injected by the build-time generator.
   * Empty string ('') when generation was skipped for this component.
   */
  sourceCode: string;
  /**
   * Exactly 3 example configs when the component has full examples,
   * or null when in placeholder mode.
   */
  examples: [ExampleConfig, ExampleConfig, ExampleConfig] | null;
  /**
   * Derived flag. True iff examples is a non-null array of exactly 3.
   * MUST be consistent with examples field.
   */
  hasFullExamples: boolean;
}

// ---------------------------------------------------------------------------
// 3. ExampleConfig
// ---------------------------------------------------------------------------

export interface ExampleConfig {
  /**
   * Short title shown above the live rendered example.
   * Must be unique within the 3 examples of one ComponentEntry.
   * e.g. "Primary", "Outlined", "Disabled"
   */
  label: string;
  /** Optional additional context. Null if not provided. */
  description: string | null;
  /**
   * Render function that produces the live component preview.
   * Must be defined at module level (not inline) for stable reference.
   * Must not throw during render.
   */
  render: () => React.ReactElement;
}

// ---------------------------------------------------------------------------
// 4. LayoutPreference
// ---------------------------------------------------------------------------

export type LayoutDirection = 'vertical' | 'horizontal';

export interface LayoutPreferenceContextValue {
  /** Current layout direction for the examples gallery. Default: 'vertical'. */
  direction: LayoutDirection;
  /** Toggle between vertical and horizontal. */
  toggle: () => void;
}

// ---------------------------------------------------------------------------
// 5. Navigation Params
// ---------------------------------------------------------------------------

export type RootStackParamList = {
  /** Home screen — no params */
  Home: undefined;
  /**
   * Category screen — receives the selected category id.
   * The screen resolves the full Category object from the registry.
   */
  CategoryList: { categoryId: CategoryId };
  /**
   * Component detail screen — receives category + component keys.
   * The screen resolves the full ComponentEntry from the registry.
   */
  ComponentDetail: { categoryId: CategoryId; componentKey: string };
};

// ---------------------------------------------------------------------------
// 6. Registry contract
// ---------------------------------------------------------------------------

/**
 * The shape of the full catalogue registry export.
 * Imported by all screens that need catalogue data.
 */
export interface CatalogueRegistry {
  /** All 5 categories with their full component lists. */
  categories: Category[];
  /**
   * Fast lookup by componentKey.
   * Derived from categories at module init; not a separate data source.
   */
  componentMap: Record<string, ComponentEntry>;
}

// ---------------------------------------------------------------------------
// 7. Generated source map contract
// ---------------------------------------------------------------------------

/**
 * Shape of the auto-generated registry.generated.ts export.
 * Key = componentKey (directory name); value = raw source string.
 */
export type SourceCodeMap = Record<string, string>;
