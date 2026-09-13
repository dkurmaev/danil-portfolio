import { z } from 'zod';

/**
 * Was soll entstehen? (docs/Projekt-Checkliste.pdf §02). Bestimmt, welche
 * weiteren Schritte im Wizard sichtbar sind — siehe `checklistSteps.ts`.
 * Keys spiegeln `Checkliste.steps.goals.options.*` in messages/*.json.
 */
export const PROJECT_GOALS = [
  'newWebsite',
  'websiteRelaunch',
  'telegramBot',
  'webApp',
] as const;

export type ProjectGoal = (typeof PROJECT_GOALS)[number];

/**
 * Website · Bausteine (PDF §04). Werte sind identisch mit den
 * `code`-Feldern der Kategorie "website-blocks" in
 * `src/lib/server/katalog.json` / `katalog.example.json` — das Formular
 * sendet später genau diese Codes an `/api/estimate`. Reine Bezeichner,
 * keine Preisdaten — CLAUDE.md §4 "Ценовые данные" betrifft das nicht.
 */
export const WEBSITE_BLOCKS = [
  'block-hero-startbereich',
  'block-services-overview',
  'block-testimonials',
  'block-gallery',
  'block-before-after',
  'block-team',
  'block-process-steps',
  'block-pricing-overview',
  'block-faq',
  'block-map',
  'block-partner-logos',
  'block-scroll-animations',
  'block-hero-video',
] as const;

export type WebsiteBlock = (typeof WEBSITE_BLOCKS)[number];

/**
 * Field-level `message` values sind keine Anzeigetexte, sondern Keys in
 * `Checkliste.steps.*.errors.*` — analog zu `contactFormSchema.ts`.
 */
export const checklistFormSchema = z.object({
  goals: z.array(z.enum(PROJECT_GOALS)).min(1, 'required'),
  pageCount: z.number().int().min(0).max(50),
  languageCount: z.number().int().min(0).max(10),
  additionalSections: z.number().int().min(0).max(50),
  blocks: z.array(z.enum(WEBSITE_BLOCKS)),
});

export type ChecklistFormValues = z.infer<typeof checklistFormSchema>;

export const checklistFormDefaultValues: ChecklistFormValues = {
  goals: [],
  pageCount: 0,
  languageCount: 0,
  additionalSections: 0,
  blocks: [],
};
