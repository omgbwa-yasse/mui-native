import type { Response } from 'express';
import { EventEmitter } from 'events';

interface SseClient {
  res: Response;
  sessionId: string;
}

const emitter = new EventEmitter();
emitter.setMaxListeners(200); // Allow many concurrent SSE connections

const clients = new Map<string, Set<Response>>();

/**
 * Attach SSE headers and register the response as a subscriber for the session.
 * Sends a `retry:3000` directive so clients auto-reconnect within 3 seconds.
 */
export function subscribe(sessionId: string, res: Response): void {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  res.write('retry:3000\n\n');

  const set = clients.get(sessionId) ?? new Set<Response>();
  set.add(res);
  clients.set(sessionId, set);

  // Emit a keepalive comment every 25 s to prevent proxy timeouts
  const heartbeat = setInterval(() => {
    if (!res.writableEnded) {
      res.write(': heartbeat\n\n');
    } else {
      clearInterval(heartbeat);
    }
  }, 25_000);

  res.on('close', () => {
    clearInterval(heartbeat);
    unsubscribe(sessionId, res);
  });
}

/**
 * Remove a client from the subscriber set for a session.
 */
export function unsubscribe(sessionId: string, res: Response): void {
  const set = clients.get(sessionId);
  if (!set) return;
  set.delete(res);
  if (set.size === 0) {
    clients.delete(sessionId);
  }
}

/**
 * Emit a named SSE event with JSON data to all subscribers of a session.
 * Also emits on the internal EventEmitter so other server-side listeners can react.
 */
export function emit(sessionId: string, event: string, data: unknown): void {
  const payload = `event:${event}\ndata:${JSON.stringify(data)}\n\n`;
  const set = clients.get(sessionId);
  if (set) {
    for (const res of set) {
      if (!res.writableEnded) {
        res.write(payload);
      }
    }
  }
  emitter.emit(`${sessionId}:${event}`, data);
}

/**
 * Close all SSE connections for a session (e.g., after terminal state).
 */
export function closeSession(sessionId: string): void {
  const set = clients.get(sessionId);
  if (!set) return;
  for (const res of set) {
    if (!res.writableEnded) {
      res.end();
    }
  }
  clients.delete(sessionId);
}

/** Internal EventEmitter for server-side listeners. */
export { emitter };
