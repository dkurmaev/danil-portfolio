import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import {
  PROJECT_GOALS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepGoalsProps {
  control: Control<ChecklistFormValues>;
  errors: FieldErrors<ChecklistFormValues>;
}

/** Was soll entstehen? (docs/Projekt-Checkliste.pdf §02). */
export function StepGoals({ control, errors }: StepGoalsProps) {
  const t = useTranslations('Checkliste.steps.goals');

  return (
    <fieldset className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <legend className="text-fg text-xl font-semibold">{t('title')}</legend>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <Controller
        control={control}
        name="goals"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROJECT_GOALS.map((goal) => (
              <CheckboxCard
                key={goal}
                label={t(`options.${goal}.label`)}
                description={t(`options.${goal}.description`)}
                checked={field.value.includes(goal)}
                onChange={(checked) =>
                  field.onChange(
                    checked
                      ? [...field.value, goal]
                      : field.value.filter((value) => value !== goal),
                  )
                }
              />
            ))}
          </div>
        )}
      />

      {errors.goals && (
        <p className="text-error text-xs">
          {t(`errors.${errors.goals.message}`)}
        </p>
      )}
    </fieldset>
  );
}
