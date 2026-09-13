import type { Path } from 'react-hook-form';

import type { ChecklistFormValues, ProjectGoal } from './checklistFormSchema';

export type ChecklistStepId =
  | 'goals'
  | 'scope'
  | 'blocks'
  | 'functions'
  | 'visibility'
  | 'telegram'
  | 'webapp'
  | 'existing'
  | 'support'
  | 'contact';

export interface ChecklistStepDefinition {
  id: ChecklistStepId;
  /** Feldnamen für die partielle Validierung vor "Weiter" (react-hook-form `trigger`). */
  fields: Path<ChecklistFormValues>[];
  isVisible: (goals: ProjectGoal[]) => boolean;
}

const hasWebsiteGoal = (goals: ProjectGoal[]) =>
  goals.includes('newWebsite') || goals.includes('websiteRelaunch');

const alwaysVisible = () => true;

/**
 * Reihenfolge = Reihenfolge der PDF-Abschnitte (docs/Projekt-Checkliste.pdf):
 * 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 01+11. "Telegram-Bot" (§07)
 * und "Webanwendung / Portal" (§08) sind genauso bedingt wie scope/blocks —
 * sie erscheinen nur, wenn das jeweilige Ziel auf Schritt 1 gewählt wurde.
 * "existing"/"support"/"contact" sind unabhängig vom gewählten Ziel, da sie
 * projektübergreifende Angaben abfragen (Inhalte, Betreuung, Kontaktdaten).
 */
export const checklistSteps: ChecklistStepDefinition[] = [
  { id: 'goals', fields: ['goals'], isVisible: alwaysVisible },
  {
    id: 'scope',
    fields: ['pageCount', 'languageCount', 'additionalSections'],
    isVisible: hasWebsiteGoal,
  },
  { id: 'blocks', fields: ['blocks'], isVisible: hasWebsiteGoal },
  { id: 'functions', fields: ['features'], isVisible: hasWebsiteGoal },
  {
    id: 'visibility',
    fields: ['visibilityItems'],
    isVisible: hasWebsiteGoal,
  },
  {
    id: 'telegram',
    fields: ['telegramFeatures', 'telegramAutoMessageCount'],
    isVisible: (goals) => goals.includes('telegramBot'),
  },
  {
    id: 'webapp',
    fields: ['webappFeatures', 'webappDataDomainCount'],
    isVisible: (goals) => goals.includes('webApp'),
  },
  {
    id: 'existing',
    // Absichtlich leer: alle `existingAssets.*`-Felder sind optional, es
    // gibt nichts zu validieren. `trigger()` mit einem verschachtelten
    // `existingAssets.<key>`-Pfad (Radiogruppen) hängt sich in dieser
    // RHF/zodResolver-Kombination auf, statt aufzulösen — reproduziert mit
    // einem einzelnen Pfad und mit allen neun, in beiden Fällen nie
    // resolved/rejected. `trigger([])` ist der Workaround.
    fields: [],
    isVisible: alwaysVisible,
  },
  { id: 'support', fields: ['supportLevel'], isVisible: alwaysVisible },
  {
    id: 'contact',
    fields: [
      'name',
      'email',
      'company',
      'phone',
      'industry',
      'desiredDeadline',
      'existingWebsite',
      'location',
      'importantNotes',
      'likedWebsites',
      'otherNotes',
    ],
    isVisible: alwaysVisible,
  },
];
