import { API_BASE } from './config';

export interface AgentSessionSummary {
  sessionId: string;
  wordCount: number;
  workerCount: number;
  status: string;
  startedAt: string;
  progressStreamUrl: string;
}

export interface WorkerStatus {
  workerId: string;
  sectionIndex: number;
  status: string;
  progressPercent: number;
  partialOutput?: string;
}

export interface AgentSessionDetail {
  sessionId: string;
  wordCount: number;
  workerCount: number;
  status: string;
  startedAt: string;
  completedAt: string | null;
  workers: WorkerStatus[];
}

export interface TransformationRecord {
  type: string;
  count: number;
  description: string;
}

export interface HighlightedSection {
  sectionIndex: number;
  changeType: string;
  changeCount: number;
}

export interface HumanizationReport {
  reportId: string;
  sessionId: string;
  synthesizedDocument: string;
  fleschKincaidBefore: number;
  fleschKincaidAfter: number;
  readabilityLabel: string;
  aiRiskReductionPercent: number;
  transformationsApplied: TransformationRecord[];
  highlightedSections: HighlightedSection[];
  generatedAt: string;
}

export interface ProgressHandlers {
  onWorkerProgress?: (data: {
    workerId: string;
    sectionIndex: number;
    progressPercent: number;
    status: string;
    partialOutput?: string;
  }) => void;
  onSupervisorStatus?: (data: {
    sessionId: string;
    status: string;
    workersComplete: number;
    workersTotal: number;
  }) => void;
  onSessionComplete?: (data: {
    sessionId: string;
    reportId: string;
    synthesizedDocument: string;
  }) => void;
  onSessionFailed?: (data: {
    sessionId: string;
    errorCode: string;
    message: string;
  }) => void;
  onError?: (err: Event) => void;
}

/**
 * Submit a document for multi-agent processing.
 */
export async function submitDocument(
  document: string,
  userToken: string,
): Promise<AgentSessionSummary> {
  const resp = await fetch(`${API_BASE}/agent/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ document }),
  });

  if (!resp.ok) {
    const body = (await resp.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `HTTP ${resp.status}`);
  }

  return resp.json() as Promise<AgentSessionSummary>;
}

/**
 * Open an SSE connection for real-time progress updates.
 * Returns a cleanup function — call it to close the EventSource.
 */
export function subscribeToProgress(
  sessionId: string,
  userToken: string,
  handlers: ProgressHandlers,
): () => void {
  // React Native does not include a built-in EventSource.
  // Use the polyfill from `react-native-event-source` or `react-native-sse`.
  // We cast to `any` here to avoid bundling the dependency — the host app
  // must provide globalThis.EventSource (or the polyfill must be imported) before
  // calling this function.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const EventSourceCtor: typeof EventSource = (globalThis as any).EventSource as typeof EventSource;
  if (!EventSourceCtor) {
    console.error(
      'agentService.subscribeToProgress: EventSource not available. ' +
        'Install and import a React Native EventSource polyfill.',
    );
    return () => undefined;
  }

  const url = `${API_BASE}/agent/sessions/${sessionId}/progress`;

  // Note: EventSource does not support custom headers natively.
  // Pass the token via query param (the backend should accept ?token=).
  const fullUrl = `${url}?token=${encodeURIComponent(userToken)}`;
  const es = new EventSourceCtor(fullUrl);

  es.addEventListener('worker-progress', (e) => {
    if (handlers.onWorkerProgress) {
      try {
        handlers.onWorkerProgress(JSON.parse((e as MessageEvent).data));
      } catch { /* ignore parse errors */ }
    }
  });

  es.addEventListener('supervisor-status', (e) => {
    if (handlers.onSupervisorStatus) {
      try {
        handlers.onSupervisorStatus(JSON.parse((e as MessageEvent).data));
      } catch { /* ignore */ }
    }
  });

  es.addEventListener('session-complete', (e) => {
    if (handlers.onSessionComplete) {
      try {
        handlers.onSessionComplete(JSON.parse((e as MessageEvent).data));
      } catch { /* ignore */ }
    }
  });

  es.addEventListener('session-failed', (e) => {
    if (handlers.onSessionFailed) {
      try {
        handlers.onSessionFailed(JSON.parse((e as MessageEvent).data));
      } catch { /* ignore */ }
    }
  });

  if (handlers.onError) {
    es.addEventListener('error', handlers.onError);
  }

  return () => es.close();
}

/**
 * Poll the current status of an agent session.
 */
export async function getSession(
  sessionId: string,
  userToken: string,
): Promise<AgentSessionDetail> {
  const resp = await fetch(`${API_BASE}/agent/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!resp.ok) {
    const body = (await resp.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `HTTP ${resp.status}`);
  }
  return resp.json() as Promise<AgentSessionDetail>;
}

/**
 * Fetch the humanization report for a completed session.
 */
export async function getReport(
  sessionId: string,
  userToken: string,
): Promise<HumanizationReport> {
  const resp = await fetch(`${API_BASE}/agent/sessions/${sessionId}/report`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!resp.ok) {
    const body = (await resp.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `HTTP ${resp.status}`);
  }
  return resp.json() as Promise<HumanizationReport>;
}
