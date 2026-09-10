import 'server-only';

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
/** Sicherheitsnetz gegen unbegrenztes Wachstum der Map bei vielen unterschiedlichen IPs. */
const MAX_TRACKED_KEYS = 10_000;

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

/**
 * In-memory, pro Serverinstanz. Übersteht keinen Cold-Start und wird bei
 * mehreren Instanzen (Serverless) nicht geteilt — für das MVP ohne externen
 * Store (Upstash/Redis) ausreichend, bei echtem Traffic ersetzen.
 */
const hits = new Map<string, RateLimitEntry>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (hits.size >= MAX_TRACKED_KEYS) {
    for (const [trackedKey, trackedEntry] of hits) {
      if (now - trackedEntry.windowStart >= WINDOW_MS) {
        hits.delete(trackedKey);
      }
    }
  }

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

/** Bester verfügbarer Client-Identifier hinter Proxys/CDN — kein Next.js `request.ip` mehr in Next 16. */
export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}
