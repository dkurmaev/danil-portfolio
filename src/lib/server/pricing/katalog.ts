import 'server-only';

import { z } from 'zod';

import katalogData from '../katalog.json';
import type { Katalog } from './types';

const itemUnitSchema = z.enum([
  'einmalig',
  'monatlich',
  'pro_seite',
  'pro_sprache',
  'pro_abschnitt',
  'pro_event',
  'pro_bereich',
]);

const katalogSchema = z.object({
  hourlyRate: z.number().positive(),
  levelMultipliers: z.object({
    standard: z.number().positive(),
    bekanntschaft: z.number().positive(),
    familie: z.number().positive(),
  }),
  items: z.array(
    z.object({
      code: z.string().min(1),
      category: z.string().min(1),
      unit: itemUnitSchema,
      hours: z.number().positive(),
    }),
  ),
  packages: z.array(
    z.object({
      code: z.string().min(1),
      category: z.string().min(1),
      includes: z
        .array(
          z.object({
            itemCode: z.string().min(1),
            quantity: z.number().int().positive(),
          }),
        )
        .min(1),
      discountHours: z.number().nonnegative(),
    }),
  ),
});

/**
 * katalog.json ist gitignored (echte Stundensätze/Koeffizienten, siehe
 * CLAUDE.md §4 "Ценовые данные"). Lokal aus katalog.example.json kopieren
 * und mit echten Zahlen füllen — ohne die Datei schlägt bereits `next build`
 * fehl (statischer Import unten), nicht erst die Laufzeit.
 */
const parsed = katalogSchema.safeParse(katalogData);

if (!parsed.success) {
  throw new Error(`katalog.json ist ungültig: ${parsed.error.message}`);
}

export const katalog: Katalog = parsed.data;
