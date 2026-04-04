import type { Section } from './orchestrator.interface.js';

const HEADING_RE = /^#{1,3}\s+(.+)$/m;
const HEADING_BLOCK_RE = /^#{1,3}\s+/m;
const MIN_WORDS_PER_SECTION = 50;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function snapToSentenceBoundary(text: string, targetIndex: number): number {
  const sentenceEnd = /[.!?]\s/g;
  let match: RegExpExecArray | null;
  let bestIndex = targetIndex;

  sentenceEnd.lastIndex = Math.max(0, targetIndex - 200);
  while ((match = sentenceEnd.exec(text)) !== null) {
    if (match.index + 2 >= targetIndex) {
      bestIndex = match.index + 2;
      break;
    }
    bestIndex = match.index + 2;
    if (match.index + 2 > targetIndex + 200) break;
  }
  return bestIndex;
}

/**
 * Detect section boundaries in a document.
 *
 * Strategy:
 * 1. Heading-first pass: split on `#`, `##`, `###` headings.
 * 2. Word-count chunking fallback if no headings found or a chunk is too small.
 * 3. Merge chunks below MIN_WORDS_PER_SECTION with the previous chunk.
 */
export function detectSections(document: string): Section[] {
  const lines = document.split('\n');
  const headingIndices: number[] = [];

  // Build character offsets for heading-based splits
  let charOffset = 0;
  const lineOffsets: number[] = lines.map((line) => {
    const offset = charOffset;
    charOffset += line.length + 1; // +1 for '\n'
    return offset;
  });

  lines.forEach((line, i) => {
    if (HEADING_BLOCK_RE.test(line)) {
      headingIndices.push(lineOffsets[i]!);
    }
  });

  let rawChunks: string[];

  if (headingIndices.length >= 2) {
    // Split on headings
    rawChunks = [];
    for (let i = 0; i < headingIndices.length; i++) {
      const start = headingIndices[i]!;
      const end = i + 1 < headingIndices.length ? headingIndices[i + 1]! : document.length;
      rawChunks.push(document.slice(start, end).trim());
    }
  } else {
    // Word-count chunking fallback (~500 words per chunk, sentence-snapped)
    const CHUNK_WORDS = 500;
    const words = document.split(/\s+/);
    rawChunks = [];
    let idx = 0;
    while (idx < words.length) {
      const slice = words.slice(idx, idx + CHUNK_WORDS).join(' ');
      // Snap to sentence boundary
      const snapIdx = snapToSentenceBoundary(document, document.indexOf(words[idx + CHUNK_WORDS - 1] ?? ''));
      rawChunks.push(slice);
      idx += CHUNK_WORDS;
    }
  }

  // Merge chunks below minimum word count into previous
  const merged: string[] = [];
  for (const chunk of rawChunks) {
    if (countWords(chunk) < MIN_WORDS_PER_SECTION && merged.length > 0) {
      merged[merged.length - 1] += '\n\n' + chunk;
    } else {
      merged.push(chunk);
    }
  }

  return merged.map((text, index): Section => {
    const headingMatch = HEADING_RE.exec(text);
    return {
      index,
      heading: headingMatch ? headingMatch[1]!.trim() : null,
      text: text.trim(),
      wordCount: countWords(text),
    };
  });
}
