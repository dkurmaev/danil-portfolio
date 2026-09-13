import type { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  SUPPORT_LEVELS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepSupportProps {
  register: UseFormRegister<ChecklistFormValues>;
}

/**
 * Nach dem Start (docs/Projekt-Checkliste.pdf §10). Einfach-Auswahl (Radio),
 * anders als goals/blocks — die vier Betreuungsstufen schließen sich
 * gegenseitig aus, "none" (keine Betreuung) ist ein gültiger Default.
 */
export function StepSupport({ register }: StepSupportProps) {
  const t = useTranslations('Checkliste.steps.support');

  return (
    <fieldset className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <legend className="text-fg text-xl font-semibold">{t('title')}</legend>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SUPPORT_LEVELS.map((level) => (
          <label key={level} className="cursor-pointer">
            <input
              type="radio"
              value={level}
              className="peer sr-only"
              {...register('supportLevel')}
            />
            <span className="rounded-card border-border bg-bg-card peer-checked:border-accent peer-checked:bg-accent/5 peer-focus-visible:ring-accent/30 flex flex-col gap-1 border p-4 transition-colors duration-200 peer-focus-visible:ring-2">
              <span className="text-fg text-sm font-medium">
                {t(`options.${level}.label`)}
              </span>
              <span className="text-fg-secondary text-sm">
                {t(`options.${level}.description`)}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
