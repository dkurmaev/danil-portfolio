'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  checklistFormDefaultValues,
  checklistFormSchema,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';
import { checklistSteps, type ChecklistStepId } from '@/lib/checklistSteps';

import { StepBlocks } from './steps/StepBlocks';
import { StepContact } from './steps/StepContact';
import { StepExisting } from './steps/StepExisting';
import { StepFunctions } from './steps/StepFunctions';
import { StepGoals } from './steps/StepGoals';
import { StepScope } from './steps/StepScope';
import { StepSupport } from './steps/StepSupport';
import { StepTelegram } from './steps/StepTelegram';
import { StepVisibility } from './steps/StepVisibility';
import { StepWebapp } from './steps/StepWebapp';
import { ChecklistProgress } from './ChecklistProgress';
import { ChecklistResult } from './ChecklistResult';

type WizardPhase = 'form' | 'result';

/**
 * Alle 10 Schritte aus `checklistSteps.ts` sind gebaut. "Weiter" auf dem
 * letzten Schritt ("contact") validiert wie jeder andere Schritt und
 * wechselt danach in die `result`-Phase (Wilka + Versand,
 * `ChecklistResult.tsx`) statt zu blockieren.
 */
export function ChecklistWizard() {
  const t = useTranslations('Checkliste');
  const [currentStepId, setCurrentStepId] = useState<ChecklistStepId>('goals');
  const [phase, setPhase] = useState<WizardPhase>('form');
  const [submissionValues, setSubmissionValues] =
    useState<ChecklistFormValues | null>(null);

  const {
    register,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: checklistFormDefaultValues,
    mode: 'onSubmit',
  });

  const goals = useWatch({ control, name: 'goals' });
  const visibleSteps = checklistSteps.filter((step) => step.isVisible(goals));
  // Fällt auf Schritt 0 ("goals", immer sichtbar) zurück, wenn Website-Ziele
  // abgewählt wurden und `currentStepId` gerade auf scope/blocks zeigt.
  const currentIndex = Math.max(
    visibleSteps.findIndex((step) => step.id === currentStepId),
    0,
  );
  const currentStep = visibleSteps[currentIndex];
  const isLastStep = currentIndex === visibleSteps.length - 1;
  const nextLabel = isLastStep ? t('calculateCta') : t('next');

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentStepId(visibleSteps[currentIndex - 1].id);
    }
  };

  const goToNext = async () => {
    const isValid = await trigger(currentStep.fields);
    if (!isValid) return;

    if (currentIndex < visibleSteps.length - 1) {
      setCurrentStepId(visibleSteps[currentIndex + 1].id);
      return;
    }

    // Letzter Schritt ("contact") validiert erfolgreich → Ergebnis-Screen.
    setSubmissionValues(getValues());
    setPhase('result');
  };

  const handleReset = () => {
    reset(checklistFormDefaultValues);
    setSubmissionValues(null);
    setPhase('form');
    setCurrentStepId('goals');
  };

  if (phase === 'result' && submissionValues) {
    return (
      <Card className="p-6 sm:p-8">
        <ChecklistResult
          values={submissionValues}
          onEdit={() => setPhase('form')}
          onReset={handleReset}
        />
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <ChecklistProgress
        current={currentIndex + 1}
        total={visibleSteps.length}
        label={t('progress', {
          current: currentIndex + 1,
          total: visibleSteps.length,
        })}
      />

      <div className="mt-8">
        {currentStep.id === 'goals' && (
          <StepGoals control={control} errors={errors} />
        )}
        {currentStep.id === 'scope' && <StepScope register={register} />}
        {currentStep.id === 'blocks' && <StepBlocks control={control} />}
        {currentStep.id === 'functions' && <StepFunctions control={control} />}
        {currentStep.id === 'visibility' && (
          <StepVisibility control={control} />
        )}
        {currentStep.id === 'telegram' && (
          <StepTelegram control={control} register={register} />
        )}
        {currentStep.id === 'webapp' && (
          <StepWebapp control={control} register={register} />
        )}
        {currentStep.id === 'existing' && <StepExisting register={register} />}
        {currentStep.id === 'support' && <StepSupport register={register} />}
        {currentStep.id === 'contact' && (
          <StepContact register={register} errors={errors} />
        )}
      </div>

      <div className="border-border mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('back')}
        </Button>

        <Button type="button" onClick={goToNext}>
          {nextLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}
