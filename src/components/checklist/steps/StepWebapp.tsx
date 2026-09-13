import {
  Controller,
  type Control,
  type UseFormRegister,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import { Input } from '@/components/ui/Input';
import {
  WEBAPP_FEATURES,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepWebappProps {
  control: Control<ChecklistFormValues>;
  register: UseFormRegister<ChecklistFormValues>;
}

/**
 * Webanwendung / Portal (docs/Projekt-Checkliste.pdf §08). Nur sichtbar,
 * wenn "Webanwendung / Portal" auf Schritt 1 gewählt wurde. Der PDF-Hinweis
 * zur bezahlten Konzeptphase steht als Schritt-Beschreibung.
 * `webapp-data-domain` ist "pro_bereich" im Katalog und läuft deshalb als
 * eigenes Mengenfeld statt als Checkbox.
 */
export function StepWebapp({ control, register }: StepWebappProps) {
  const t = useTranslations('Checkliste.steps.webapp');

  return (
    <fieldset className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <legend className="text-fg text-xl font-semibold">{t('title')}</legend>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <Controller
        control={control}
        name="webappFeatures"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WEBAPP_FEATURES.map((feature) => {
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

      <div className="max-w-xs">
        <Input
          type="number"
          min={0}
          label={t('dataDomainCount.label')}
          {...register('webappDataDomainCount', { valueAsNumber: true })}
        />
        <p className="text-fg-muted mt-2 text-sm">
          {t('dataDomainCount.description')}
        </p>
      </div>
    </fieldset>
  );
}
