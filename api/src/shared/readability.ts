/**
 * Flesch–Kincaid readability scorer.
 * Provides scoreText() → { score, label } and syllableCount() helper.
 *
 * Formula: FK Reading Ease = 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words)
 * Scores range 0–100; higher = easier to read.
 */

export interface ReadabilityResult {
  score: number;
  label: string;
}

/**
 * Counts syllables in a single word using a heuristic approach.
 * - Count vowel groups (consecutive vowels = 1 syllable)
 * - Subtract silent trailing 'e'
 * - Minimum 1 syllable per word
 */
export function syllableCount(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  if (cleaned.length === 0) return 0;
  if (cleaned.length <= 3) return 1;

  // Remove silent trailing 'e' (but not 'le' endings like "table")
  const normalized = cleaned.replace(/(?<=[aeiou])e$/, '');

  const vowelGroups = normalized.match(/[aeiou]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Adjustments for common patterns
  if (normalized.endsWith('le') && normalized.length > 2) count += 1;
  if (normalized.endsWith('ion')) count += 1;
  if (normalized.endsWith('es') && normalized.length > 3) count -= 1;
  if (normalized.endsWith('ed') && normalized.length > 4) count -= 1;

  return Math.max(1, count);
}

/**
 * Derives a readability label from a Flesch–Kincaid Reading Ease score.
 * Based on R-009 label table.
 */
function getLabel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Confusing';
}

/**
 * Scores a text block using the Flesch–Kincaid Reading Ease formula.
 */
export function scoreText(text: string): ReadabilityResult {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = Math.max(sentences.length, 1);

  const words = text
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z'-]/g, ''))
    .filter((w) => w.length > 0);
  const wordCount = Math.max(words.length, 1);

  const totalSyllables = words.reduce((sum, w) => sum + syllableCount(w), 0);

  const score =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (totalSyllables / wordCount);

  const clamped = Math.min(100, Math.max(0, Math.round(score * 10) / 10));

  return { score: clamped, label: getLabel(clamped) };
}
