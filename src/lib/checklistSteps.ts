import type { ChecklistFormValues, ProjectGoal } from './checklistFormSchema';

/**
 * Nur die Schritte, die bereits gebaut sind (Block G2, erster Durchgang:
 * Was soll entstehen / Umfang / Bausteine). Schritte 4–7 (Funktionen,
 * Sichtbarkeit & Recht, Was ist vorhanden, Kontakt & Anmerkungen) sowie die
 * bedingten Schritte 07/08 (Telegram-Bot, Webanwendung) folgen im nächsten
 * Durchgang — siehe `ChecklistWizard.tsx`, das die letzte hier gelistete
 * Stufe entsprechend als "weitere Schritte folgen" markiert.
 */
export type ChecklistStepId = 'goals' | 'scope' | 'blocks';

export interface ChecklistStepDefinition {
  id: ChecklistStepId;
  /** Feldnamen für die partielle Validierung vor "Weiter" (react-hook-form `trigger`). */
  fields: (keyof ChecklistFormValues)[];
  /** Website · Umfang/Bausteine (PDF §03/§04) betreffen nur Website-Ziele. */
  isVisible: (goals: ProjectGoal[]) => boolean;
}

const hasWebsiteGoal = (goals: ProjectGoal[]) =>
  goals.includes('newWebsite') || goals.includes('websiteRelaunch');

export const checklistSteps: ChecklistStepDefinition[] = [
  { id: 'goals', fields: ['goals'], isVisible: () => true },
  {
    id: 'scope',
    fields: ['pageCount', 'languageCount', 'additionalSections'],
    isVisible: hasWebsiteGoal,
  },
  { id: 'blocks', fields: ['blocks'], isVisible: hasWebsiteGoal },
];
