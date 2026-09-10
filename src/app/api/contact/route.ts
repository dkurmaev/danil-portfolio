import { NextResponse } from 'next/server';

import { contactFormSchema } from '@/lib/contactFormSchema';

/**
 * Mock contact handler (docs/technical-spec.md §53). Validates the payload
 * server-side and returns success — no email provider is wired up yet.
 * Swap the body of the try block for Resend/SMTP/Telegram/CRM later; the
 * request contract (fields, validation, response shape) stays the same.
 */
export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
