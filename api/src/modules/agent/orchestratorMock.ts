/**
 * Mock implementation of AgentOrchestrator for local dev / testing.
 * Returns deterministic canned responses; simulates per-worker progress
 * events with 500 ms delays between steps (0 → 25 → 50 → 75 → 100).
 *
 * T058
 */
import type {
  AgentOrchestrator,
  Section,
  SectionPlan,
  WorkerOutput,
  SynthesizedDocument,
  HumanizationReport,
  ProgressEvent,
} from './orchestrator.interface.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Mock orchestrator
// ---------------------------------------------------------------------------
export class AgentOrchestratorMock implements AgentOrchestrator {
  async analyze(document: string): Promise<SectionPlan> {
    const words = document.trim().split(/\s+/).filter(Boolean);
    const totalWordCount = words.length;
    const workerCount = Math.min(3, Math.max(1, Math.floor(totalWordCount / 100)));

    const chunkSize = Math.ceil(words.length / workerCount);
    const sections: Section[] = [];
    for (let i = 0; i < workerCount; i++) {
      const chunk = words.slice(i * chunkSize, (i + 1) * chunkSize);
      sections.push({
        index: i,
        heading: i === 0 ? 'Introduction' : `Section ${i + 1}`,
        text: chunk.join(' '),
        wordCount: chunk.length,
      });
    }

    return { sections, totalWordCount, workerCount };
  }

  async runWorker(
    section: Section,
    sessionId: string,
    onProgress: (event: ProgressEvent) => void,
  ): Promise<WorkerOutput> {
    const workerId = `mock-worker-${section.index}`;

    for (const pct of [0, 25, 50, 75, 100]) {
      onProgress({
        workerId,
        sectionIndex: section.index,
        progressPercent: pct,
        partialOutput: pct === 100 ? section.text : undefined,
      });
      if (pct < 100) {
        await sleep(500);
      }
    }

    return {
      sectionIndex: section.index,
      processedText: section.text,
      humanizationNotes: ['Simplified sentence structure', 'Reduced passive voice'],
    };
  }

  async synthesize(_plan: SectionPlan, outputs: WorkerOutput[]): Promise<SynthesizedDocument> {
    const sorted = [...outputs].sort((a, b) => a.sectionIndex - b.sectionIndex);
    const text = sorted.map((o) => o.processedText).join('\n\n');
    return { text, workerOutputs: sorted };
  }

  async humanize(_original: string, synthesized: SynthesizedDocument): Promise<HumanizationReport> {
    return {
      fleschKincaidBefore: 52.4,
      fleschKincaidAfter: 71.2,
      aiRiskReductionPercent: 37,
      transformationsApplied: [
        { type: 'passive_to_active', count: 4, description: 'Converted passive constructs to active voice' },
        { type: 'sentence_split', count: 6, description: 'Split long sentences for clarity' },
        { type: 'word_simplification', count: 12, description: 'Replaced complex words with simpler synonyms' },
      ],
      highlightedSections: synthesized.workerOutputs.map((o) => ({
        sectionIndex: o.sectionIndex,
        label: 'humanized',
        excerpt: o.processedText.slice(0, 100),
      })),
    };
  }
}

/** Singleton mock instance — import this in local dev / tests. */
export const orchestratorMock: AgentOrchestrator = new AgentOrchestratorMock();
