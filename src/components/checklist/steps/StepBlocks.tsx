import { Controller, type Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { CheckboxCard } from '@/components/checklist/CheckboxCard';
import {
  WEBSITE_BLOCKS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';

interface StepBlocksProps {
  control: Control<ChecklistFormValues>;
}

/** Website · Bausteine (docs/Projekt-Checkliste.pdf §04). */
export function StepBlocks({ control }: StepBlocksProps) {
  const t = useTranslations('Checkliste.steps.blocks');

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-fg text-xl font-semibold">{t('title')}</legend>

      <Controller
        control={control}
        name="blocks"
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WEBSITE_BLOCKS.map((block) => {
              const hasDescription = t.has(`options.${block}.description`);

              return (
                <CheckboxCard
                  key={block}
                  label={t(`options.${block}.label`)}
                  description={
                    hasDescription
                      ? t(`options.${block}.description`)
                      : undefined
                  }
                  checked={field.value.includes(block)}
                  onChange={(checked) =>
                    field.onChange(
                      checked
                        ? [...field.value, block]
                        : field.value.filter((value) => value !== block),
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
