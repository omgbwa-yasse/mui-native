/** Pluggable AI orchestration interface for the multi-agent document processing pipeline. */

export interface Section {
  index: number;
  heading: string | null;
  text: string;
  wordCount: number;
}

export interface SectionPlan {
  sections: Section[];
  totalWordCount: number;
  workerCount: number;
}

export interface ProgressEvent {
  workerId: string;
  sectionIndex: number;
  progressPercent: number;
  partialOutput?: string;
}

export interface WorkerOutput {
  sectionIndex: number;
  processedText: string;
  humanizationNotes: string[];
}

export interface SynthesizedDocument {
  text: string;
  workerOutputs: WorkerOutput[];
}

export interface TransformationType {
  type: string;
  count: number;
  description: string;
}

export interface HumanizationReport {
  fleschKincaidBefore: number;
  fleschKincaidAfter: number;
  aiRiskReductionPercent: number;
  transformationsApplied: TransformationType[];
  highlightedSections: Array<{
    sectionIndex: number;
    label: string;
    excerpt: string;
  }>;
}

export interface AgentOrchestrator {
  /**
   * Analyze a document, detect sections, and determine the worker plan.
   */
  analyze(document: string, complexityBoost?: boolean): Promise<SectionPlan>;

  /**
   * Run a single worker agent on a section. Calls onProgress repeatedly with updates.
   */
  runWorker(
    section: Section,
    sessionId: string,
    onProgress: (event: ProgressEvent) => void,
  ): Promise<WorkerOutput>;

  /**
   * Synthesize worker outputs into a coherent final document.
   */
  synthesize(plan: SectionPlan, outputs: WorkerOutput[]): Promise<SynthesizedDocument>;

  /**
   * Produce a humanization report comparing the original and synthesized document.
   */
  humanize(original: string, synthesized: SynthesizedDocument): Promise<HumanizationReport>;
}
