#!/usr/bin/env ts-node
/**
 * generate-material-icon-names.ts
 *
 * Fetches the Google Material Design Icons codepoints file and writes
 * src/components/MaterialIcon/catalogue.ts exporting:
 *   - MaterialIconName  — TypeScript union of all valid icon name strings
 *   - VALID_ICON_NAMES  — ReadonlySet<string> for runtime validation (FR-008)
 *   - materialIconsGlyphMap — Record<string, number> for createIconSet()
 *
 * Run: npm run generate:icon-names
 */
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CODEPOINTS_URL =
  'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints';

const OUTPUT_PATH = path.resolve(
  __dirname,
  '../src/components/MaterialIcon/catalogue.ts',
);

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode ?? 'unknown'} for ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main(): Promise<void> {
  console.log('Fetching Material Icons codepoints…');
  const text = await fetchText(CODEPOINTS_URL);

  const entries: Array<[string, number]> = [];

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length !== 2) continue;
    const [name, hex] = parts as [string, string];
    const codepoint = parseInt(hex, 16);
    if (isNaN(codepoint)) continue;
    entries.push([name, codepoint]);
  }

  if (entries.length === 0) {
    throw new Error('No codepoints parsed — check the codepoints file format.');
  }

  console.log(`Parsed ${entries.length} icon names.`);

  // Build union type string (chunk into lines for readability)
  const unionLines: string[] = [];
  for (let i = 0; i < entries.length; i += 8) {
    const chunk = entries.slice(i, i + 8).map(([n]) => `'${n}'`).join(' | ');
    unionLines.push(`  | ${chunk}`);
  }
  const unionType = `export type MaterialIconName =\n${unionLines.join('\n')};`;

  // Build glyph map entries
  const glyphEntries = entries
    .map(([n, cp]) => `  '${n}': 0x${cp.toString(16).padStart(4, '0')}`)
    .join(',\n');

  // Build set entries
  const setEntries = entries.map(([n]) => `'${n}'`).join(', ');

  const output = `// AUTO-GENERATED — do not edit manually.
// Source: ${CODEPOINTS_URL}
// Run: npm run generate:icon-names
// Generated: ${new Date().toISOString()}

${unionType}

/** Runtime set of all valid icon names — used for dev-mode validation (FR-008). */
export const VALID_ICON_NAMES: ReadonlySet<string> = new Set<string>([
  ${setEntries}
]);

/** Glyph map for createIconSet — shared across all five Material Icon variants. */
export const materialIconsGlyphMap: Record<string, number> = {
${glyphEntries},
};
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Written: ${OUTPUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
