import 'server-only';

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 10;
/** Sicherheitsnetz gegen unbegrenztes Wachstum der Map bei vielen unterschiedlichen IPs. */
const MAX_TRACKED_KEYS = 10_000;

interface RateLimitEntry {
  count: number;
  windowStart: number;
  windowMs: number;
}

export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

/**
 * In-memory, pro Serverinstanz. Übersteht keinen Cold-Start und wird bei
 * mehreren Instanzen (Serverless) nicht geteilt — für das MVP ohne externen
 * Store (Upstash/Redis) ausreichend, bei echtem Traffic ersetzen.
 */
const hits = new Map<string, RateLimitEntry>();

/**
 * `windowMs`/`maxRequests` sind pro Aufruf überschreibbar — Endpoints mit
 * echten Kosten (E-Mail-Versand) bekommen ein engeres Limit als z. B.
 * `/api/estimate`, ohne die Map zwischen ihnen zu teilen (Keys werden vom
 * Aufrufer bereits eindeutig präfixiert, z. B. "checklist-submit:<ip>").
 */
export function isRateLimited(
  key: string,
  options: RateLimitOptions = {},
): boolean {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const now = Date.now();
  const entry = hits.get(key);

  if (hits.size >= MAX_TRACKED_KEYS) {
    for (const [trackedKey, trackedEntry] of hits) {
      if (now - trackedEntry.windowStart >= trackedEntry.windowMs) {
        hits.delete(trackedKey);
      }
    }
  }

  if (!entry || now - entry.windowStart >= windowMs) {
    hits.set(key, { count: 1, windowStart: now, windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > maxRequests;
}

/** Bester verfügbarer Client-Identifier hinter Proxys/CDN — kein Next.js `request.ip` mehr in Next 16. */
export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}
