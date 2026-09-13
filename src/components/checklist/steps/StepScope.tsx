import type { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';
import type { ChecklistFormValues } from '@/lib/checklistFormSchema';

interface StepScopeProps {
  register: UseFormRegister<ChecklistFormValues>;
}

/** Website · Umfang (docs/Projekt-Checkliste.pdf §03). */
export function StepScope({ register }: StepScopeProps) {
  const t = useTranslations('Checkliste.steps.scope');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-fg text-xl font-semibold">{t('title')}</h3>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Input
          type="number"
          min={0}
          label={t('fields.pageCount')}
          {...register('pageCount', { valueAsNumber: true })}
        />
        <Input
          type="number"
          min={0}
          label={t('fields.languageCount')}
          {...register('languageCount', { valueAsNumber: true })}
        />
        <Input
          type="number"
          min={0}
          label={t('fields.additionalSections')}
          {...register('additionalSections', { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
