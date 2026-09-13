import { NextResponse } from 'next/server';

import { socialLinks } from '@/config/social';
import { buildSelectionLines } from '@/lib/checklistSelection';
import { checklistSubmitRequestSchema } from '@/lib/checklistSubmitSchema';
import {
  buildClientConfirmationEmail,
  buildInternalEmail,
} from '@/lib/server/checklistEmail';
import { getEmailProvider } from '@/lib/server/email';
import {
  calculateEstimate,
  calculateLineBreakdown,
  katalog,
  UnknownCodeError,
} from '@/lib/server/pricing';
import { getClientKey, isRateLimited } from '@/lib/server/rateLimit';

const INTERNAL_RECIPIENT = socialLinks.email.replace(/^mailto:/, '');

/**
 * Engeres Limit als `/api/estimate` — dieser Endpoint verschickt echte
 * E-Mails (Kosten + Spam-Risiko), nicht nur eine Berechnung.
 */
const SUBMIT_RATE_LIMIT = { windowMs: 10 * 60_000, maxRequests: 3 };

/**
 * Nimmt das vollständige Wizard-Formular entgegen, berechnet die
 * Positionsaufschlüsselung serverseitig neu (nie dem Client vertrauen),
 * verschickt die volle Smeta an den Betreiber (alle drei Preisstufen) und
 * eine zahlenfreie Eingangsbestätigung an den Kunden (CLAUDE.md §4). Die
 * Antwort an den Client enthält nur `ok` — die Wilka hat er bereits über
 * `/api/estimate` gesehen (docs/Projekt-Checkliste.pdf §42 Disclaimer).
 */
export async function POST(request: Request) {
  if (
    isRateLimited(
      `checklist-submit:${getClientKey(request)}`,
      SUBMIT_RATE_LIMIT,
    )
  ) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  const payload: unknown = await request.json().catch(() => null);
  const parsed = checklistSubmitRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  const { locale, values } = parsed.data;
  const selection = buildSelectionLines(values);

  let breakdown;
  let result;
  try {
    breakdown = calculateLineBreakdown(katalog, selection);
    result = calculateEstimate(katalog, selection);
  } catch (error) {
    if (error instanceof UnknownCodeError) {
      return NextResponse.json(
        { ok: false, error: 'unknown_code' },
        { status: 400 },
      );
    }
    throw error;
  }

  const provider = getEmailProvider();

  try {
    const internalEmail = await buildInternalEmail({
      values,
      breakdown,
      result,
      recipient: INTERNAL_RECIPIENT,
    });
    await provider.send(internalEmail);
  } catch (error) {
    console.error('[checklist-submit] Interne Mail fehlgeschlagen:', error);
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 502 },
    );
  }

  try {
    const clientEmail = await buildClientConfirmationEmail({
      values,
      locale,
    });
    await provider.send(clientEmail);
  } catch (error) {
    // Lead ist bereits beim Betreiber angekommen (siehe oben) — eine
    // fehlgeschlagene Bestätigungsmail ist ärgerlich, aber kein Grund, dem
    // Kunden einen Fehler zu zeigen oder ihn zum erneuten Absenden (und
    // damit einer zweiten internen Mail) zu verleiten.
    console.error(
      '[checklist-submit] Kunden-Bestätigung fehlgeschlagen:',
      error,
    );
  }

  return NextResponse.json({ ok: true });
}
