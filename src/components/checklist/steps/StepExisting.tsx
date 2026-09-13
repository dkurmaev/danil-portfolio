import type { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { TriStateField } from '@/components/checklist/TriStateField';
import {
  EXISTING_ASSETS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepExistingProps {
  register: UseFormRegister<ChecklistFormValues>;
}

/** Was ist bereits vorhanden? (docs/Projekt-Checkliste.pdf §09). */
export function StepExisting({ register }: StepExistingProps) {
  const t = useTranslations('Checkliste.steps.existing');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-fg text-xl font-semibold">{t('title')}</h3>
        <p className="text-fg-muted text-sm">{t('description')}</p>
      </div>

      <div className="flex flex-col">
        {EXISTING_ASSETS.map((asset) => (
          <TriStateField key={asset} asset={asset} register={register} />
        ))}
      </div>
    </div>
  );
}
