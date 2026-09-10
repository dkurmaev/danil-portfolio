'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Database,
  Folder,
  Monitor,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Link } from '@/i18n/navigation';
import {
  contactFormDefaultValues,
  contactFormSchema,
  PROJECT_TYPES,
  type ContactFormValues,
  type ProjectType,
} from '@/lib/contactFormSchema';

const PROJECT_TYPE_ICONS: Record<ProjectType, typeof Monitor> = {
  webApp: Monitor,
  apiBackend: Database,
  saasMvp: Box,
  automation: Settings,
  existingProject: Folder,
};

type SubmitStatus = 'idle' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
  });

  const fieldError = (key?: string) =>
    key ? t(`form.errors.${key}`) : undefined;

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('request_failed');

      reset(contactFormDefaultValues);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border-border bg-bg-card rounded-card flex flex-col items-start gap-4 border p-8">
        <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
        <h3 className="text-fg text-xl font-semibold">
          {t('form.successTitle')}
        </h3>
        <p className="text-fg-secondary text-sm leading-6">
          {t('form.successMessage')}
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          {t('form.successReset')}
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label={t('form.nameLabel')}
          placeholder={t('form.namePlaceholder')}
          error={fieldError(errors.name?.message)}
          {...register('name')}
        />
        <Input
          label={t('form.emailLabel')}
          type="email"
          placeholder={t('form.emailPlaceholder')}
          error={fieldError(errors.email?.message)}
          {...register('email')}
        />
      </div>

      <fieldset>
        <legend className="text-fg mb-3 text-sm font-medium">
          {t('form.projectTypeLabel')}
        </legend>
        <div className="flex flex-wrap gap-3">
          {PROJECT_TYPES.map((type) => {
            const Icon = PROJECT_TYPE_ICONS[type];

            return (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  value={type}
                  className="peer sr-only"
                  {...register('projectType')}
                />
                <span className="rounded-chip border-border bg-bg-card text-fg-secondary peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-fg peer-focus-visible:ring-accent/30 flex items-center gap-2 border px-4 py-2.5 text-sm font-medium transition-colors duration-200 peer-focus-visible:ring-2">
                  <Icon size={16} aria-hidden="true" />
                  {t(`form.projectTypes.${type}`)}
                </span>
              </label>
            );
          })}
        </div>
        {errors.projectType && (
          <p className="text-error mt-2 text-xs">
            {fieldError(errors.projectType.message)}
          </p>
        )}
      </fieldset>

      <Textarea
        label={t('form.messageLabel')}
        placeholder={t('form.messagePlaceholder')}
        error={fieldError(errors.message?.message)}
        {...register('message')}
      />

      <Input
        label={t('form.websiteLabel')}
        placeholder={t('form.websitePlaceholder')}
        error={fieldError(errors.website?.message)}
        {...register('website')}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="border-border accent-accent focus-visible:ring-accent/30 mt-0.5 h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2"
            {...register('privacyConsent')}
          />
          <span className="text-fg-secondary text-sm leading-6">
            {t.rich('form.privacyLabel', {
              link: (chunks) => (
                <Link
                  href="/datenschutz"
                  className="text-accent hover:text-accent-secondary underline underline-offset-2"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-error mt-2 text-xs">
            {fieldError(errors.privacyConsent.message)}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-error text-sm">{t('form.errorMessage')}</p>
      )}

      <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('form.submitPending') : t('form.submit')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <span className="text-fg-muted flex items-center gap-2 text-sm">
          <ShieldCheck size={16} className="shrink-0" aria-hidden="true" />
          {t('form.trustNote')}
        </span>
      </div>
    </form>
  );
}
