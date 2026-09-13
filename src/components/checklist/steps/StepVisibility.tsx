import { Controller, type Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import {
  VISIBILITY_ITEMS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepVisibilityProps {
  control: Control<ChecklistFormValues>;
}

/** Sichtbarkeit, Recht und Auswertung (docs/Projekt-Checkliste.pdf §06). */
export function StepVisibility({ control }: StepVisibilityProps) {
  const t = useTranslations('Checkliste.steps.visibility');

  return (
    <fieldset className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <legend className="text-fg text-xl font-semibold">{t('title')}</legend>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <Controller
        control={control}
        name="visibilityItems"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VISIBILITY_ITEMS.map((item) => (
              <CheckboxCard
                key={item}
                label={t(`options.${item}.label`)}
                description={t(`options.${item}.description`)}
                checked={field.value.includes(item)}
                onChange={(checked) =>
                  field.onChange(
                    checked
                      ? [...field.value, item]
                      : field.value.filter((value) => value !== item),
                  )
                }
              />
            ))}
          </div>
        )}
      />
    </fieldset>
  );
}
