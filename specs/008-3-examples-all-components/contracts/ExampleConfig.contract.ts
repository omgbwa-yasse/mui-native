/**
 * CONTRACT: ExampleConfig
 *
 * Canonical interface for a single component usage example in the showcase app.
 * Lives at: apps/showcase/src/catalogue/types.ts
 *
 * Any change to this interface is a BREAKING CHANGE for all example catalogue files.
 */

import type React from 'react';

export interface ExampleConfig {
  /**
   * Short human-readable label for this variant.
   * Must be unique within the 3-example tuple for a given component.
   * @example "Default", "Outlined", "Disabled"
   */
  label: string;

  /**
   * Optional prose description explaining what this example demonstrates.
   * Null is permitted; rendered as nothing in ExampleGallery when null.
   */
  description: string | null;

  /**
   * JSX source code snippet shown above the live preview via CodeBlock.
   * - Must be non-empty for all 63 newly-authored tuples (SC-006).
   * - For the 15 priority-component stub entries, '' is temporarily permitted.
   * - Language is always 'tsx'; handled by ExampleGallery automatically.
   * - Should contain only the JSX markup, not imports or wrapper functions.
   * @example "<Button variant='contained' onPress={() => {}}>Save</Button>"
   */
  code: string;

  /**
   * Factory function that returns the live rendered preview.
   * MUST NOT call React hooks directly at the top level.
   * For controlled/stateful examples, define a wrapper component and call it here.
   */
  render: () => React.ReactElement;
}

/**
 * Exactly 3 ExampleConfig entries per component.
 * - All 3 labels must be distinct within the tuple.
 * - At least 2 of 3 must produce visually or behaviourally distinct output.
 */
export type ExampleTuple = [ExampleConfig, ExampleConfig, ExampleConfig];
