import { z } from 'zod';

/**
 * Payload für POST /api/estimate. Nur Codes + Mengen — der Client wählt
 * keine Preisstufe und sieht keine Positionspreise (CLAUDE.md §4
 * "Ценовые данные"). Dieselbe Schema wird später vom Rechner-Formular
 * (Block G2) zur Client-Validierung wiederverwendet.
 */
export const estimateRequestSchema = z.object({
  items: z
    .array(
      z.object({
        code: z.string().trim().min(1).max(60),
        quantity: z.number().int().positive().max(50),
      }),
    )
    .min(1)
    .max(40),
});

export type EstimateRequest = z.infer<typeof estimateRequestSchema>;
