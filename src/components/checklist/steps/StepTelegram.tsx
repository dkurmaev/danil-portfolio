import {
  Controller,
  type Control,
  type UseFormRegister,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import { Input } from '@/components/ui/Input';
import {
  TELEGRAM_FEATURES,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepTelegramProps {
  control: Control<ChecklistFormValues>;
  register: UseFormRegister<ChecklistFormValues>;
}

/**
 * Telegram-Bot (docs/Projekt-Checkliste.pdf §07). Nur sichtbar, wenn
 * "Telegram-Bot" auf Schritt 1 gewählt wurde — siehe `checklistSteps.ts`.
 * `bot-auto-message` ist "pro_event" im Katalog und läuft deshalb als
 * eigenes Mengenfeld statt als Checkbox.
 */
export function StepTelegram({ control, register }: StepTelegramProps) {
  const t = useTranslations('Checkliste.steps.telegram');

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-fg text-xl font-semibold">{t('title')}</legend>

      <Controller
        control={control}
        name="telegramFeatures"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TELEGRAM_FEATURES.map((feature) => {
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
          label={t('autoMessageCount.label')}
          {...register('telegramAutoMessageCount', { valueAsNumber: true })}
        />
        <p className="text-fg-muted mt-2 text-sm">
          {t('autoMessageCount.description')}
        </p>
      </div>
    </fieldset>
  );
}
