import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import type { ChecklistFormValues } from '@/lib/checklistFormSchema';

interface StepContactProps {
  register: UseFormRegister<ChecklistFormValues>;
  errors: FieldErrors<ChecklistFormValues>;
}

/** Kontakt (docs/Projekt-Checkliste.pdf §01) + Anmerkungen (§11), letzter Schritt. */
export function StepContact({ register, errors }: StepContactProps) {
  const t = useTranslations('Checkliste.steps.contact');

  const fieldError = (key?: string) => (key ? t(`errors.${key}`) : undefined);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-fg text-xl font-semibold">{t('title')}</h3>
          <p className="text-fg-muted text-sm">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label={t('fields.name')}
            error={fieldError(errors.name?.message)}
            {...register('name')}
          />
          <Input label={t('fields.company')} {...register('company')} />
          <Input
            type="email"
            label={t('fields.email')}
            error={fieldError(errors.email?.message)}
            {...register('email')}
          />
          <Input type="tel" label={t('fields.phone')} {...register('phone')} />
          <Input label={t('fields.industry')} {...register('industry')} />
          <Input
            label={t('fields.desiredDeadline')}
            {...register('desiredDeadline')}
          />
          <Input
            label={t('fields.existingWebsite')}
            {...register('existingWebsite')}
          />
          <Input label={t('fields.location')} {...register('location')} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-fg text-xl font-semibold">{t('notesTitle')}</h3>

        <div className="flex flex-col gap-5">
          <Textarea
            label={t('notesFields.importantNotes')}
            rows={3}
            {...register('importantNotes')}
          />
          <Textarea
            label={t('notesFields.likedWebsites')}
            rows={3}
            {...register('likedWebsites')}
          />
          <Textarea
            label={t('notesFields.otherNotes')}
            rows={3}
            {...register('otherNotes')}
          />
        </div>
      </div>
    </div>
  );
}
