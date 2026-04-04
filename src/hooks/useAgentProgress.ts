import { useState, useEffect, useRef, useCallback } from 'react';
import * as agentService from '../services/agentService';
import type { HumanizationReport, WorkerStatus } from '../services/agentService';

export interface WorkerState {
  workerId: string;
  sectionIndex: number;
  status: string;
  progressPercent: number;
  partialOutput?: string;
}

export interface AgentProgressState {
  workers: WorkerState[];
  supervisorStatus: string;
  isComplete: boolean;
  isFailed: boolean;
  report: HumanizationReport | null;
  errorCode: string | null;
}

/**
 * Subscribes to SSE progress events for a given sessionId.
 * Aggregates per-worker state keyed by workerId.
 * Cleans up the EventSource on unmount.
 */
export function useAgentProgress(
  sessionId: string | null,
  userToken: string,
): AgentProgressState {
  const [workers, setWorkers] = useState<Map<string, WorkerState>>(new Map());
  const [supervisorStatus, setSupervisorStatus] = useState('pending');
  const [isComplete, setIsComplete] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [report, setReport] = useState<HumanizationReport | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const subscribe = useCallback(() => {
    if (!sessionId) return;

    const cleanup = agentService.subscribeToProgress(sessionId, userToken, {
      onWorkerProgress: (data) => {
        setWorkers((prev) => {
          const next = new Map(prev);
          const existing = next.get(data.workerId);
          next.set(data.workerId, {
            workerId: data.workerId,
            sectionIndex: data.sectionIndex,
            status: data.status,
            progressPercent: data.progressPercent,
            partialOutput: data.partialOutput ?? existing?.partialOutput,
          });
          return next;
        });
      },
      onSupervisorStatus: (data) => {
        setSupervisorStatus(data.status);
      },
      onSessionComplete: (data) => {
        setIsComplete(true);
        setSupervisorStatus('completed');
        // Fetch full report
        void agentService.getReport(data.sessionId, userToken).then((r) => setReport(r));
      },
      onSessionFailed: (data) => {
        setIsFailed(true);
        setSupervisorStatus('failed');
        setErrorCode(data.errorCode);
      },
    });

    cleanupRef.current = cleanup;
  }, [sessionId, userToken]);

  useEffect(() => {
    subscribe();
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [subscribe]);

  const workersArray: WorkerState[] = Array.from(workers.values()).sort(
    (a, b) => a.sectionIndex - b.sectionIndex,
  );

  return {
    workers: workersArray,
    supervisorStatus,
    isComplete,
    isFailed,
    report,
    errorCode,
  };
}
