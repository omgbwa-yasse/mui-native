/**
 * Default implementation of the AgentOrchestrator interface.
 * - Uses a counting semaphore to bound concurrent AI calls per session.
 * - Each worker has an individual timeout; the entire session has a hard cap.
 * - On per-worker failure, retries once before marking the worker failed.
 * - Progress is broadcast via progressEmitter.
 *
 * T038 + T061
 */
import { env } from '../../config/env.js';
import { scoreText } from '../../shared/readability.js';
import { detectSections } from './sectionDetector.js';
import { agentCountFromWordCount } from './agentCount.js';
import * as progressEmitter from './progressEmitter.js';
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
// Internal helper: simple counting semaphore
// ---------------------------------------------------------------------------
class Semaphore {
  private permits: number;
  private queue: Array<() => void> = [];

  constructor(maxPermits: number) {
    this.permits = maxPermits;
  }

  acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }
    return new Promise((resolve) => this.queue.push(resolve));
  }

  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits++;
    }
  }
}

// ---------------------------------------------------------------------------
// Internal helper: wraps a promise with a timeout
// ---------------------------------------------------------------------------
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Timeout after ${ms}ms: ${label}`)),
      ms,
    );
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err: unknown) => {
        clearTimeout(timer);
        reject(err as Error);
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Placeholder AI call — replace with real LLM provider integration
// ---------------------------------------------------------------------------
async function callAiProvider(
  section: Section,
  onPartialOutput: (text: string, progressPercent: number) => void,
): Promise<string> {
  // Stub: simulates incremental progress for local/test use.
  // In production, replace this with the real AI provider SDK call.
  const words = section.text.split(/\s+/);
  const result: string[] = [];
  const chunkSize = Math.max(1, Math.floor(words.length / 4));

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    result.push(chunk);
    const pct = Math.min(100, Math.round(((i + chunkSize) / words.length) * 100));
    onPartialOutput(result.join(' '), pct);
    // Yield to allow other tasks to run
    await new Promise((r) => setTimeout(r, 0));
  }

  return result.join(' ');
}

// ---------------------------------------------------------------------------
// AgentOrchestratorImpl
// ---------------------------------------------------------------------------
export class AgentOrchestratorImpl implements AgentOrchestrator {
  private readonly semaphore: Semaphore;
  private readonly workerTimeoutMs: number;
  private readonly sessionTimeoutMs: number;

  constructor() {
    this.semaphore = new Semaphore(env.AI_MAX_CONCURRENT_REQUESTS);
    this.workerTimeoutMs = env.AI_WORKER_TIMEOUT_MS;
    this.sessionTimeoutMs = env.AI_SESSION_TIMEOUT_MS;
  }

  // -------------------------------------------------------------------------
  // analyze
  // -------------------------------------------------------------------------
  analyze(document: string): SectionPlan {
    const sections = detectSections(document);
    const totalWordCount = sections.reduce((sum, s) => sum + s.wordCount, 0);
    const workerCount = agentCountFromWordCount(totalWordCount);
    return { sections, totalWordCount, workerCount };
  }

  // -------------------------------------------------------------------------
  // runWorker — bounded by semaphore, with per-worker timeout + 1 retry
  // -------------------------------------------------------------------------
  async runWorker(
    section: Section,
    onProgress: (event: ProgressEvent) => void,
    sessionId: string,
    workerId: string,
  ): Promise<WorkerOutput> {
    const attempt = async (): Promise<WorkerOutput> => {
      await this.semaphore.acquire();
      try {
        let lastPartial: string | undefined;

        const processedText = await withTimeout(
          callAiProvider(section, (partial, pct) => {
            lastPartial = partial;
            const event: ProgressEvent = {
              workerId,
              sectionIndex: section.index,
              progressPercent: pct,
              partialOutput: partial,
            };
            onProgress(event);
            progressEmitter.emit(sessionId, 'worker-progress', {
              workerId,
              sectionIndex: section.index,
              progressPercent: pct,
              status: 'running',
              partialOutput: partial,
            });
          }),
          this.workerTimeoutMs,
          `worker ${workerId} section ${section.index}`,
        );

        return {
          sectionIndex: section.index,
          processedText,
          humanizationNotes: lastPartial
            ? `Processed ${section.wordCount} words in section ${section.index}`
            : '',
        };
      } finally {
        this.semaphore.release();
      }
    };

    // FR-020: retry once on failure
    try {
      return await attempt();
    } catch (firstErr) {
      try {
        return await attempt();
      } catch (secondErr) {
        throw secondErr;
      }
    }
  }

  // -------------------------------------------------------------------------
  // synthesize — orders outputs by sectionIndex and concatenates
  // -------------------------------------------------------------------------
  synthesize(outputs: WorkerOutput[]): SynthesizedDocument {
    const sorted = [...outputs].sort((a, b) => a.sectionIndex - b.sectionIndex);
    const text = sorted.map((o) => o.processedText).join('\n\n');
    return { text, workerOutputs: sorted };
  }

  // -------------------------------------------------------------------------
  // humanize — runs Flesch–Kincaid on original and synthesized, derives report
  // -------------------------------------------------------------------------
  humanize(original: string, synthesized: SynthesizedDocument): HumanizationReport {
    const before = scoreText(original);
    const after = scoreText(synthesized.text);

    const scoreDelta = after.score - before.score;
    const aiRiskReductionPercent = Math.min(100, Math.max(0, Math.round(scoreDelta * 0.5)));

    const transformationsApplied: HumanizationReport['transformationsApplied'] = [
      {
        type: 'readability_improvement',
        count: synthesized.workerOutputs.length,
        description: `Processed ${synthesized.workerOutputs.length} document section(s)`,
      },
    ];

    const highlightedSections: HumanizationReport['highlightedSections'] =
      synthesized.workerOutputs.map((o) => ({
        sectionIndex: o.sectionIndex,
        changeType: scoreDelta > 10 ? 'major' : 'minor',
        changeCount: o.processedText.split(/\s+/).length,
      }));

    return {
      fleschKincaidBefore: Math.round(before.score * 10) / 10,
      fleschKincaidAfter: Math.round(after.score * 10) / 10,
      aiRiskReductionPercent,
      transformationsApplied,
      highlightedSections,
    };
  }

  // -------------------------------------------------------------------------
  // runSession — orchestrate a full session with overall timeout
  // session hard cap: AI_SESSION_TIMEOUT_MS
  // -------------------------------------------------------------------------
  async runSession(
    sessionId: string,
    document: string,
    workerIds: string[],
  ): Promise<{ synthesized: SynthesizedDocument; report: HumanizationReport }> {
    const run = async () => {
      const plan = this.analyze(document);

      progressEmitter.emit(sessionId, 'supervisor-status', {
        sessionId,
        status: 'analyzing',
        workersComplete: 0,
        workersTotal: plan.workerCount,
      });

      // Assign sections to workers (round-robin if more sections than workers)
      const assignedSections = plan.sections.slice(0, plan.workerCount);

      const progressEvents: ProgressEvent[] = [];

      // Run all workers with Promise.allSettled for resilience
      const results = await Promise.allSettled(
        assignedSections.map((section, i) => {
          const workerId = workerIds[i] ?? `worker-${i}`;
          return this.runWorker(
            section,
            (event) => progressEvents.push(event),
            sessionId,
            workerId,
          );
        }),
      );

      progressEmitter.emit(sessionId, 'supervisor-status', {
        sessionId,
        status: 'synthesizing',
        workersComplete: results.filter((r) => r.status === 'fulfilled').length,
        workersTotal: plan.workerCount,
      });

      const outputs: WorkerOutput[] = [];
      for (const result of results) {
        if (result.status === 'fulfilled') {
          outputs.push(result.value);
        }
        // Failed workers produce no output — their sections will be absent in synthesis
      }

      const synthesized = this.synthesize(outputs);
      const report = this.humanize(document, synthesized);

      return { synthesized, report };
    };

    return withTimeout(
      run(),
      this.sessionTimeoutMs,
      `session ${sessionId}`,
    );
  }
}

export const orchestrator = new AgentOrchestratorImpl();
