import { Controller, type Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import {
  WEBSITE_FEATURES,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepFunctionsProps {
  control: Control<ChecklistFormValues>;
}

/** Website · Funktionen (docs/Projekt-Checkliste.pdf §05). */
export function StepFunctions({ control }: StepFunctionsProps) {
  const t = useTranslations('Checkliste.steps.functions');

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-fg text-xl font-semibold">{t('title')}</legend>

      <Controller
        control={control}
        name="features"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WEBSITE_FEATURES.map((feature) => {
              const hasDescription = t.has(`options.${feature}.description`);

              return (
                <CheckboxCard
                  key={feature}
                  label={t(`options.${feature}.label`)}
                  description={
                    hasDescription
                      ? t(`options.${feature}.description`)
                      : undefined
                  }
                  checked={field.value.includes(feature)}
                  onChange={(checked) =>
                    field.onChange(
                      checked
                        ? [...field.value, feature]
                        : field.value.filter((value) => value !== feature),
                    )
                  }
                />
              );
            })}
          </div>
        )}
      />
    </fieldset>
  );
}
