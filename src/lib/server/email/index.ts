import 'server-only';

import { createConsoleProvider } from './providers/console';
import { createResendProvider } from './providers/resend';
import type { EmailProvider } from './types';

export type { EmailMessage, EmailProvider } from './types';

let cachedProvider: EmailProvider | undefined;

/**
 * Provider-Wahl über `EMAIL_PROVIDER` (.env) — Route-Code importiert nie
 * einen konkreten Provider direkt, siehe `types.ts`. Ohne Angabe: `console`
 * (loggt statt zu versenden, sicherer Default für lokale Entwicklung).
 */
export function getEmailProvider(): EmailProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  const provider = process.env.EMAIL_PROVIDER ?? 'console';

  switch (provider) {
    case 'resend': {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.EMAIL_FROM;
      if (!apiKey || !from) {
        throw new Error(
          'RESEND_API_KEY und EMAIL_FROM müssen gesetzt sein, wenn EMAIL_PROVIDER=resend.',
        );
      }
      cachedProvider = createResendProvider(apiKey, from);
      break;
    }
    case 'console':
      cachedProvider = createConsoleProvider();
      break;
    default:
      throw new Error(`Unbekannter EMAIL_PROVIDER: "${provider}"`);
  }

  return cachedProvider;
}
