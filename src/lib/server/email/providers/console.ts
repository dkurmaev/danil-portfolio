import 'server-only';

import type { EmailMessage, EmailProvider } from '../types';

/**
 * Dev-Fallback: loggt statt zu versenden. Standard, solange `EMAIL_PROVIDER`
 * nicht gesetzt ist — `npm run dev`/Tests brauchen so keine echten Zugangsdaten.
 */
export function createConsoleProvider(): EmailProvider {
  return {
    async send(message: EmailMessage) {
      console.log(
        '[email:console] Kein EMAIL_PROVIDER gesetzt — E-Mail wird nur geloggt:\n' +
          JSON.stringify(message, null, 2),
      );
    },
  };
}
