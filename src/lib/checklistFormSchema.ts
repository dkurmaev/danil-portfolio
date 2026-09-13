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
 * Website · Funktionen (PDF §05). Codes der Kategorie "website-features".
 */
export const WEBSITE_FEATURES = [
  'feature-contact-form',
  'feature-multistep-form',
  'feature-file-upload',
  'feature-simple-calculator',
  'feature-multistep-calculator',
  'feature-online-booking',
  'feature-telegram-notification',
  'feature-whatsapp-button',
  'feature-newsletter-signup',
  'feature-google-reviews',
  'feature-social-feed',
] as const;

export type WebsiteFeature = (typeof WEBSITE_FEATURES)[number];

/**
 * Sichtbarkeit, Recht und Auswertung (PDF §06). Codes der Kategorie
 * "seo-legal".
 */
export const VISIBILITY_ITEMS = [
  'seo-technical',
  'seo-structured-data',
  'legal-cookie-banner',
  'analytics-setup',
  'google-business-profile',
  'accessibility-check',
  'accessibility-full',
] as const;

export type VisibilityItem = (typeof VISIBILITY_ITEMS)[number];

/**
 * Telegram-Bot (PDF §07, nur sichtbar bei `goals` enthält "telegramBot").
 * `bot-auto-message` ist im Katalog "pro_event" (Menge) statt boolesch und
 * wird deshalb separat als `telegramAutoMessageCount` geführt, nicht hier.
 */
export const TELEGRAM_FEATURES = [
  'bot-setup',
  'bot-guided-dialog',
  'bot-data-storage',
  'bot-admin',
  'bot-booking',
  'bot-payments',
  'bot-integration',
  'bot-mini-app',
  'bot-hosting',
] as const;

export type TelegramFeature = (typeof TELEGRAM_FEATURES)[number];

/**
 * Webanwendung / Portal (PDF §08, nur sichtbar bei `goals` enthält
 * "webApp"). `webapp-data-domain` ist "pro_bereich" (Menge) und wird
 * separat als `webappDataDomainCount` geführt, nicht hier.
 */
export const WEBAPP_FEATURES = [
  'webapp-user-auth',
  'webapp-roles',
  'webapp-admin-panel',
  'webapp-payments',
  'webapp-subscriptions',
  'webapp-notifications',
  'webapp-live-updates',
  'webapp-excel-export',
  'webapp-audit-log',
  'webapp-data-migration',
] as const;

export type WebappFeature = (typeof WEBAPP_FEATURES)[number];

/**
 * Was ist bereits vorhanden? (PDF §09). Keine Katalogcodes — reine
 * Intake-Angaben für das spätere Angebot, fließen nicht in die
 * Stundenberechnung ein. Tri-State pro Punkt statt Checkbox.
 */
export const EXISTING_ASSETS = [
  'texts',
  'photos',
  'logoVector',
  'legalDocs',
  'domain',
  'hosting',
  'businessEmail',
  'googleProfile',
  'decisionMaker',
] as const;

export type ExistingAsset = (typeof EXISTING_ASSETS)[number];

export const ASSET_STATUSES = ['yes', 'partial', 'no'] as const;

export type AssetStatus = (typeof ASSET_STATUSES)[number];

// react-hook-form liefert für nicht angeklickte Radiogruppen `null`
// (Standardwert `{}` bleibt beim ersten `getValues()` nicht `undefined`,
// sondern wird zu `null` aufgelöst) — `.optional()` allein akzeptiert das
// nicht, `.nullish()` deckt beide "nicht beantwortet"-Formen ab.
const assetStatusSchema = z.enum(ASSET_STATUSES).nullish();

/**
 * Nach dem Start (PDF §10). "none" ("Vorerst keine Betreuung") hat keinen
 * Katalogcode — es bedeutet schlicht keine Auswahl aus `support-*`.
 */
export const SUPPORT_LEVELS = [
  'support-full',
  'support-small',
  'support-biannual-check',
  'none',
] as const;

export type SupportLevel = (typeof SUPPORT_LEVELS)[number];

/**
 * Field-level `message` values sind keine Anzeigetexte, sondern Keys in
 * `Checkliste.steps.*.errors.*` — analog zu `contactFormSchema.ts`.
 */
export const checklistFormSchema = z.object({
  // Schritt 1 — Was soll entstehen (§02)
  goals: z.array(z.enum(PROJECT_GOALS)).min(1, 'required'),

  // Schritt 2 — Website · Umfang (§03, nur bei Website-Ziel)
  pageCount: z.number().int().min(0).max(50),
  languageCount: z.number().int().min(0).max(10),
  additionalSections: z.number().int().min(0).max(50),

  // Schritt 3 — Website · Bausteine (§04, nur bei Website-Ziel)
  blocks: z.array(z.enum(WEBSITE_BLOCKS)),

  // Schritt 4 — Website · Funktionen (§05, nur bei Website-Ziel)
  features: z.array(z.enum(WEBSITE_FEATURES)),

  // Schritt 5 — Sichtbarkeit, Recht und Auswertung (§06, nur bei Website-Ziel)
  visibilityItems: z.array(z.enum(VISIBILITY_ITEMS)),

  // Schritt 6 — Telegram-Bot (§07, nur bei goals: telegramBot)
  telegramFeatures: z.array(z.enum(TELEGRAM_FEATURES)),
  telegramAutoMessageCount: z.number().int().min(0).max(20),

  // Schritt 7 — Webanwendung / Portal (§08, nur bei goals: webApp)
  webappFeatures: z.array(z.enum(WEBAPP_FEATURES)),
  webappDataDomainCount: z.number().int().min(0).max(20),

  // Schritt 8 — Was ist bereits vorhanden (§09, immer)
  existingAssets: z.object({
    texts: assetStatusSchema,
    photos: assetStatusSchema,
    logoVector: assetStatusSchema,
    legalDocs: assetStatusSchema,
    domain: assetStatusSchema,
    hosting: assetStatusSchema,
    businessEmail: assetStatusSchema,
    googleProfile: assetStatusSchema,
    decisionMaker: assetStatusSchema,
  }),

  // Schritt 9 — Nach dem Start (§10, immer)
  supportLevel: z.enum(SUPPORT_LEVELS),

  // Schritt 10 — Kontakt (§01) + Anmerkungen (§11, immer, letzter Schritt)
  name: z.string().trim().min(2, 'name').max(120, 'name'),
  email: z.string().trim().min(1, 'email').email('email').max(200, 'email'),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().max(50).optional(),
  industry: z.string().trim().max(150).optional(),
  desiredDeadline: z.string().trim().max(100).optional(),
  existingWebsite: z.string().trim().max(300).optional(),
  location: z.string().trim().max(150).optional(),
  importantNotes: z.string().trim().max(1000).optional(),
  likedWebsites: z.string().trim().max(1000).optional(),
  otherNotes: z.string().trim().max(1000).optional(),
});

export type ChecklistFormValues = z.infer<typeof checklistFormSchema>;

export const checklistFormDefaultValues: ChecklistFormValues = {
  goals: [],
  pageCount: 0,
  languageCount: 0,
  additionalSections: 0,
  blocks: [],
  features: [],
  visibilityItems: [],
  telegramFeatures: [],
  telegramAutoMessageCount: 0,
  webappFeatures: [],
  webappDataDomainCount: 0,
  existingAssets: {},
  supportLevel: 'none',
  name: '',
  email: '',
  company: '',
  phone: '',
  industry: '',
  desiredDeadline: '',
  existingWebsite: '',
  location: '',
  importantNotes: '',
  likedWebsites: '',
  otherNotes: '',
};
