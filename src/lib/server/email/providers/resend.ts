import 'server-only';

import type { EmailMessage, EmailProvider } from '../types';

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Direkter `fetch` auf die Resend-REST-API — kein SDK, um für einen
 * einzelnen Endpoint keine zusätzliche Abhängigkeit einzuführen.
 */
export function createResendProvider(
  apiKey: string,
  from: string,
): EmailProvider {
  return {
    async send(message: EmailMessage) {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: message.to,
          subject: message.subject,
          text: message.text,
          reply_to: message.replyTo,
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
          `Resend-Versand fehlgeschlagen (${response.status}): ${body}`,
        );
      }
    },
  };
}
