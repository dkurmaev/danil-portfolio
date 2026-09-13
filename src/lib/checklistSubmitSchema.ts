import { z } from 'zod';

import { checklistFormSchema } from './checklistFormSchema';
import { locales } from '@/i18n/routing';

/**
 * Payload für POST /api/checklist-submit. `locale` steuert nur die Sprache
 * der Kunden-Bestätigungsmail — die interne Mail an den Betreiber ist immer
 * Deutsch, siehe `checklistEmail.ts`. `values` ist exakt das Wizard-Formular
 * (`checklistFormSchema`), keine separate Schema-Pflege nötig.
 */
export const checklistSubmitRequestSchema = z.object({
  locale: z.enum(locales),
  values: checklistFormSchema,
});

export type ChecklistSubmitRequest = z.infer<
  typeof checklistSubmitRequestSchema
>;
