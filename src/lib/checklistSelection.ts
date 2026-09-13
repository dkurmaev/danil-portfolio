import type { SelectionLine } from './server/pricing/types';
import type { ChecklistFormValues } from './checklistFormSchema';

/**
 * Bildet die Wizard-Antworten auf Katalogcodes + Mengen ab — die Form, die
 * sowohl `/api/estimate` (Wilka fürs Ergebnis-Screen) als auch
 * `/api/checklist-submit` (Neuberechnung + Positionsaufschlüsselung fürs
 * interne Angebot) erwarten. Eine Stelle, damit beide Aufrufe niemals
 * auseinanderlaufen.
 *
 * `goals`, `existingAssets`, `supportLevel` und die Kontaktfelder tragen
 * keine Katalogcodes — sie steuern nur die Sichtbarkeit von Schritten bzw.
 * sind reine Intake-Angaben fürs Angebot, siehe `checklistSteps.ts`.
 */
export function buildSelectionLines(
  values: ChecklistFormValues,
): SelectionLine[] {
  const lines: SelectionLine[] = [];

  const addQuantity = (code: string, quantity: number) => {
    if (quantity > 0) {
      lines.push({ code, quantity });
    }
  };

  addQuantity('site-page', values.pageCount);
  addQuantity('site-language', values.languageCount);
  addQuantity('site-section', values.additionalSections);

  for (const code of values.blocks) {
    lines.push({ code, quantity: 1 });
  }
  for (const code of values.features) {
    lines.push({ code, quantity: 1 });
  }
  for (const code of values.visibilityItems) {
    lines.push({ code, quantity: 1 });
  }
  for (const code of values.telegramFeatures) {
    lines.push({ code, quantity: 1 });
  }
  addQuantity('bot-auto-message', values.telegramAutoMessageCount);

  for (const code of values.webappFeatures) {
    lines.push({ code, quantity: 1 });
  }
  addQuantity('webapp-data-domain', values.webappDataDomainCount);

  return lines;
}
