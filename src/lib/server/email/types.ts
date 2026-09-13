import 'server-only';

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  /** Für den Kunden-Reply beim internen Angebot — Antworten landen direkt beim Kunden. */
  replyTo?: string;
}

/**
 * Provider-Abstraktion (docs/technical-spec.md §53 "Frontend/Route-Code
 * nicht an einen Provider gebunden"). Route-Code kennt nur dieses
 * Interface, nie einen konkreten Anbieter — siehe `index.ts` für die
 * Provider-Wahl über `EMAIL_PROVIDER` (.env).
 */
export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}
