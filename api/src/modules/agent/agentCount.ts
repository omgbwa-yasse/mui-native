/**
 * Determine the number of worker agents to spawn for a document.
 *
 * Word-count bands (FR-015):
 *   ≤500        → 1
 *   501–2000    → 2 (default) / 3 (complexityBoost)
 *   2001–5000   → 4 (default) / 5 (complexityBoost)
 *   >5000       → 6
 *
 * Agent count is hard-capped at 6.
 */
export function agentCountFromWordCount(
  wordCount: number,
  complexityBoost = false,
): number {
  if (wordCount <= 500) return 1;
  if (wordCount <= 2000) return complexityBoost ? 3 : 2;
  if (wordCount <= 5000) return complexityBoost ? 5 : 4;
  return 6;
}
