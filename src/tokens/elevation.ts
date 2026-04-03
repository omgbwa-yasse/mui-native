/**
 * MD3 Elevation tokens — shadow levels 0–5.
 * Each level maps to a shadow style configuration.
 * Reference: R-07 — MD3 Elevation
 * https://m3.material.io/styles/elevation/tokens
 */

export interface ElevationLevel {
  /** Shadow offset X */
  shadowOffsetX: number;
  /** Shadow offset Y */
  shadowOffsetY: number;
  /** Shadow blur radius */
  shadowRadius: number;
  /** Shadow opacity */
  shadowOpacity: number;
  /** React Native elevation (Android) */
  elevation: number;
}

export interface ElevationScale {
  /** Level 0 — No shadow (resting surface) */
  level0: ElevationLevel;
  /** Level 1 — Cards, menus */
  level1: ElevationLevel;
  /** Level 2 — FAB resting */
  level2: ElevationLevel;
  /** Level 3 — FAB pressed, Dialogs */
  level3: ElevationLevel;
  /** Level 4 — Navigation drawer */
  level4: ElevationLevel;
  /** Level 5 — Navigation bar */
  level5: ElevationLevel;
}

export const elevation: ElevationScale = {
  level0: {
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  level1: {
    shadowOffsetX: 0,
    shadowOffsetY: 1,
    shadowRadius: 2,
    shadowOpacity: 0.15,
    elevation: 1,
  },
  level2: {
    shadowOffsetX: 0,
    shadowOffsetY: 2,
    shadowRadius: 4,
    shadowOpacity: 0.15,
    elevation: 3,
  },
  level3: {
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowRadius: 8,
    shadowOpacity: 0.15,
    elevation: 6,
  },
  level4: {
    shadowOffsetX: 0,
    shadowOffsetY: 6,
    shadowRadius: 10,
    shadowOpacity: 0.15,
    elevation: 8,
  },
  level5: {
    shadowOffsetX: 0,
    shadowOffsetY: 8,
    shadowRadius: 12,
    shadowOpacity: 0.15,
    elevation: 12,
  },
};
