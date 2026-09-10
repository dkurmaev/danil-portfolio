import { NextResponse } from 'next/server';

import { estimateRequestSchema } from '@/lib/estimateRequestSchema';
import {
  calculateEstimate,
  katalog,
  UnknownCodeError,
} from '@/lib/server/pricing';
import { getClientKey, isRateLimited } from '@/lib/server/rateLimit';

/**
 * Nimmt nur Positionscodes + Mengen entgegen und gibt ausschließlich die
 * standard-Wilka zurück — keine Positionspreise, keine anderen Preisstufen
 * (CLAUDE.md §4 "Ценовые данные"). Formular/UI folgen in Block G2.
 */
export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  const payload: unknown = await request.json().catch(() => null);
  const parsed = estimateRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  try {
    const result = calculateEstimate(katalog, parsed.data.items);
    return NextResponse.json({ ok: true, range: result.standardRange });
  } catch (error) {
    if (error instanceof UnknownCodeError) {
      return NextResponse.json(
        { ok: false, error: 'unknown_code' },
        { status: 400 },
      );
    }
    throw error;
  }
}
